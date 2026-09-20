const https = require('https');
const fs = require('fs');

const SUPABASE_URL = 'https://nucgskdkumlpldrkxxye.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ixyzKq96XXpktJIU_6Jsrw_bgs3del-';
const headers = {
  apikey: SUPABASE_KEY,
  Authorization: 'Bearer ' + SUPABASE_KEY
};

const WIKI_HEADERS = {
  'User-Agent': 'UPWaterfallsCurator/2.0 (contact@seelye.info)'
};

function getJson(url, reqHeaders = headers) {
  return new Promise((resolve) => {
    https.get(url, { headers: reqHeaders }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

// Subcategories under Michigan waterfalls that we know have rich photos
const KNOWN_UP_CATEGORIES = [
  'Category:Waterfalls of the Upper Peninsula',
  'Category:Waterfalls in Michigan',
  'Category:Waterfalls of Porcupine Mountains Wilderness State Park',
  'Category:Waterfalls in Pictured Rocks National Lakeshore',
  'Category:Agate Falls',
  'Category:Alger Falls',
  'Category:Au Train Falls',
  'Category:Bonanza Falls',
  'Category:Bond Falls',
  'Category:Bridalveil Falls (Michigan)',
  'Category:Canyon Falls (Michigan)',
  'Category:Chapel Falls',
  'Category:Eagle River Falls',
  'Category:Elliot Falls',
  'Category:Gorge Falls',
  'Category:Haven Falls',
  'Category:Hungarian Falls',
  'Category:Laughing Whitefish Falls',
  'Category:Manabezho Falls',
  'Category:Manido Falls',
  'Category:Memorial Falls',
  'Category:Miners Falls',
  'Category:Mosquito Falls',
  'Category:Munising Falls',
  'Category:Nawadaha Falls',
  'Category:O Kun de Kun Falls',
  'Category:Sable Falls',
  'Category:Scott Falls',
  'Category:Spray Falls (Michigan)',
  'Category:Superior Falls',
  'Category:Tahquamenon Falls',
  'Category:Tannery Falls',
  'Category:Wagner Falls Scenic Site'
];

async function getCategoryFiles(categoryName) {
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=categorymembers&gcmtitle=' +
    encodeURIComponent(categoryName) +
    '&gcmtype=file&gcmlimit=100&prop=imageinfo&iiprop=url|extmetadata|dimensions|mediatype';
  const data = await getJson(url, WIKI_HEADERS);
  if (!data || !data.query || !data.query.pages) return [];

  const files = [];
  for (const page of Object.values(data.query.pages)) {
    const info = page.imageinfo && page.imageinfo[0];
    if (!info || !info.url) continue;
    if (info.mediatype !== 'BITMAP') continue;
    if (info.width && info.width < 700) continue; // High quality threshold

    const ext = info.extmetadata || {};
    const artist = (ext.Artist && ext.Artist.value) || 'Wikimedia Commons';
    const cleanArtist = artist.replace(/<[^>]+>/g, '').trim() || 'Wikimedia Commons';
    const desc = (ext.ImageDescription && ext.ImageDescription.value) || '';
    const cleanDesc = desc.replace(/<[^>]+>/g, '').trim();

    files.push({
      pageId: page.pageid,
      title: page.title,
      url: info.url,
      width: info.width,
      height: info.height,
      artist: cleanArtist.slice(0, 100),
      description: cleanDesc.slice(0, 200)
    });
  }
  return files;
}

const BAD_KEYWORDS = [
  '.pdf', '.webm', '.djvu', '.svg', '.ogv',
  'sign', 'marker', 'plaque', 'map', 'diagram', 'flag', 'logo',
  'pyrite', 'mineral', 'specimen', 'crystal', 'road', 'highway',
  'bridge', 'building', 'trolley', 'boat', 'post', 'trail_map',
  'parking', 'restroom', 'campsite', 'tent', 'car', 'license',
  'portrait', 'stamp', 'cover', 'page', 'census', 'register', 'treatise',
  'minnesota', 'wisconsin', 'ontario', 'canada', 'new york', 'oregon', 'washington',
  'kentucky', 'tennessee', 'georgia', 'niagara', 'little falls, new york'
];

function isGoodPhoto(title, desc = '') {
  const lower = (title + ' ' + desc).toLowerCase();
  for (const bad of BAD_KEYWORDS) {
    if (lower.includes(bad)) return false;
  }
  return true;
}

async function searchCommons(query, limit = 5) {
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=' +
    encodeURIComponent(query + ' filetype:bitmap -sign -map -plaque -marker') +
    '&gsrnamespace=6&gsrlimit=' + limit + '&prop=imageinfo&iiprop=url|extmetadata|dimensions|mediatype';
  const data = await getJson(url, WIKI_HEADERS);
  if (!data || !data.query || !data.query.pages) return [];

  const files = [];
  for (const page of Object.values(data.query.pages)) {
    const info = page.imageinfo && page.imageinfo[0];
    if (!info || !info.url) continue;
    if (info.mediatype !== 'BITMAP') continue;
    if (info.width && info.width < 700) continue;

    const ext = info.extmetadata || {};
    const artist = (ext.Artist && ext.Artist.value) || 'Wikimedia Commons';
    const cleanArtist = artist.replace(/<[^>]+>/g, '').trim() || 'Wikimedia Commons';
    const desc = (ext.ImageDescription && ext.ImageDescription.value) || '';
    const cleanDesc = desc.replace(/<[^>]+>/g, '').trim();

    if (!isGoodPhoto(page.title, cleanDesc)) continue;

    files.push({
      pageId: page.pageid,
      title: page.title,
      url: info.url,
      width: info.width,
      height: info.height,
      artist: cleanArtist.slice(0, 100),
      description: cleanDesc.slice(0, 200)
    });
  }
  return files;
}

async function main() {
  console.log('--- Step 1: Loading waterfalls and existing photos ---');
  const wfs = await getJson(SUPABASE_URL + '/rest/v1/waterfalls?select=id,name,county,latitude,longitude,description&order=name.asc');
  const photos = await getJson(SUPABASE_URL + '/rest/v1/waterfall_photos?select=id,waterfall_id,image_url,is_hero');

  const photoCountByWf = {};
  for (const p of photos) {
    photoCountByWf[p.waterfall_id] = (photoCountByWf[p.waterfall_id] || 0) + 1;
  }

  const missing = wfs.filter(w => !photoCountByWf[w.id]);
  console.log(`Waterfalls missing photos: ${missing.length} / ${wfs.length}`);

  // Step 2: Harvest files from known categories
  console.log('\n--- Step 2: Harvesting files from known UP categories ---');
  const poolOfCategoryFiles = [];
  const seenUrls = new Set(photos.map(p => p.image_url));

  for (const cat of KNOWN_UP_CATEGORIES) {
    const files = await getCategoryFiles(cat);
    for (const f of files) {
      if (!seenUrls.has(f.url) && isGoodPhoto(f.title, f.description)) {
        seenUrls.add(f.url);
        poolOfCategoryFiles.push({ ...f, sourceCat: cat });
      }
    }
  }
  console.log(`Harvested ${poolOfCategoryFiles.length} candidate files from known categories.`);

  // Step 3: Match category files to missing waterfalls
  const matches = [];
  const matchedWfIds = new Set();

  for (const wf of missing) {
    const cleanName = wf.name
      .replace(/\s*\(Upper\)|\s*\(Lower\)|\s*\(Middle\)/gi, '')
      .replace(/#\d+/g, '')
      .trim();
    const nameRegex = new RegExp('\\b' + cleanName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');

    for (const file of poolOfCategoryFiles) {
      if (nameRegex.test(file.title) || nameRegex.test(file.description)) {
        matches.push({
          waterfall_id: wf.id,
          waterfall_name: wf.name,
          county: wf.county,
          file_title: file.title,
          image_url: file.url,
          width: file.width,
          height: file.height,
          artist: file.artist,
          description: file.description,
          match_type: 'category_pool'
        });
        matchedWfIds.add(wf.id);
        console.log(`[Category Match] ${wf.name} (${wf.county} Co.) -> ${file.title}`);
      }
    }
  }

  // Step 4: Targeted search for still-missing waterfalls
  console.log('\n--- Step 4: Targeted search for remaining missing waterfalls ---');
  const stillMissing = missing.filter(w => !matchedWfIds.has(w.id));
  console.log(`Attempting targeted search for ${stillMissing.length} waterfalls...`);

  let countSearched = 0;
  for (const wf of stillMissing) {
    countSearched++;
    const cleanName = wf.name
      .replace(/\s*\(Upper\)|\s*\(Lower\)|\s*\(Middle\)/gi, '')
      .replace(/#\d+/g, '')
      .trim();

    // Specific search queries targeted to Upper Peninsula / Michigan
    const searchQueries = [
      `"${cleanName}" "Michigan"`,
      `"${cleanName}" "Upper Peninsula"`
    ];

    let foundForWf = false;
    for (const q of searchQueries) {
      if (foundForWf) break;
      const results = await searchCommons(q, 3);
      for (const res of results) {
        if (seenUrls.has(res.url)) continue;
        const lower = (res.title + ' ' + res.description).toLowerCase();
        // Strict verification: title or description must mention the waterfall name AND (michigan or county or UP)
        const nameKeywords = cleanName.toLowerCase().split(/\s+/).filter(w => w !== 'falls' && w !== 'waterfall');
        const hasAllNameWords = nameKeywords.every(w => lower.includes(w));
        const hasGeoContext = lower.includes('michigan') || lower.includes(wf.county.toLowerCase()) || lower.includes('superior') || lower.includes('porcupine') || lower.includes('ottawa') || lower.includes('hiawatha') || lower.includes('upper peninsula');

        if (hasAllNameWords && hasGeoContext) {
          seenUrls.add(res.url);
          matches.push({
            waterfall_id: wf.id,
            waterfall_name: wf.name,
            county: wf.county,
            file_title: res.title,
            image_url: res.url,
            width: res.width,
            height: res.height,
            artist: res.artist,
            description: res.description,
            match_type: 'targeted_search'
          });
          matchedWfIds.add(wf.id);
          foundForWf = true;
          console.log(`[Search Match] ${wf.name} (${wf.county} Co.) -> ${res.title}`);
          break;
        }
      }
      // Be polite to Wikimedia API
      await new Promise(r => setTimeout(r, 150));
    }
    if (countSearched % 25 === 0) {
      console.log(`Progress: searched ${countSearched} / ${stillMissing.length} waterfalls, ${matches.length} total matches found so far...`);
    }
  }

  console.log(`\n===========================================`);
  console.log(`Total Verified Matches Found: ${matches.length}`);
  console.log(`Distinct Waterfalls Matched: ${matchedWfIds.size}`);
  console.log(`===========================================`);

  fs.writeFileSync('candidate_photos.json', JSON.stringify(matches, null, 2));
  console.log('Saved to candidate_photos.json');
}

main();
