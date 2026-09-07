const fs = require('fs');

const SUPABASE_URL = 'https://nucgskdkumlpldrkxxye.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ixyzKq96XXpktJIU_6Jsrw_bgs3del-';

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json'
};

const WIKI_HEADERS = {
  'User-Agent': 'UPWaterfallsCurator/1.0 (contact@seelye.info)'
};

const BAD_KEYWORDS = [
  'sign', 'marker', 'plaque', 'map', 'diagram', 'flag', 'logo',
  'pyrite', 'mineral', 'specimen', 'crystal', 'road', 'highway',
  'bridge', 'building', 'trolley', 'boat', 'post', 'trail_map',
  'parking', 'restroom', 'campsite', 'tent', 'car', 'license', 'panoramio'
];

function isValidTitle(title, wfName) {
  const lower = title.toLowerCase();
  for (const bad of BAD_KEYWORDS) {
    if (lower.includes(bad)) return false;
  }
  return true;
}

async function getCategoryPhotos(categoryName, wfName, limit = 4) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=categorymembers&gcmtitle=${encodeURIComponent(categoryName)}&gcmtype=file&gcmlimit=25&prop=imageinfo&iiprop=url|extmetadata|dimensions`;
  try {
    const res = await fetch(url, { headers: WIKI_HEADERS });
    const data = await res.json();
    if (!data.query || !data.query.pages) return [];

    const photos = [];
    for (const page of Object.values(data.query.pages)) {
      const title = page.title || '';
      if (!isValidTitle(title, wfName)) continue;
      const info = page.imageinfo && page.imageinfo[0];
      if (!info || !info.url) continue;
      if (info.url.endsWith('.svg') || (info.width && info.width < 600)) continue;

      const ext = info.extmetadata || {};
      const artist = (ext.Artist && ext.Artist.value) || 'Wikimedia Commons';
      const cleanArtist = artist.replace(/<[^>]+>/g, '').trim() || 'Wikimedia Commons';
      const desc = (ext.ImageDescription && ext.ImageDescription.value) || '';
      const cleanDesc = desc.replace(/<[^>]+>/g, '').trim();
      const caption = cleanDesc.slice(0, 120) || `Scenic view of ${wfName}`;

      photos.push({
        image_url: info.url,
        credit_name: cleanArtist.slice(0, 100),
        caption: caption
      });

      if (photos.length >= limit) break;
    }
    return photos;
  } catch (err) {
    console.error(`Error in category ${categoryName}:`, err.message);
    return [];
  }
}

async function searchWikiPhotos(wfName, county, limit = 3) {
  const searchQueries = [
    `"${wfName}" Michigan`,
    `"${wfName}" waterfall`,
    `"${wfName}"`
  ];
  const photos = [];
  const seen = new Set();

  for (const q of searchQueries) {
    if (photos.length >= limit) break;
    const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(q + ' -sign -map -pyrite -plaque')}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|extmetadata|dimensions`;
    try {
      const res = await fetch(url, { headers: WIKI_HEADERS });
      const data = await res.json();
      if (data.query && data.query.pages) {
        for (const page of Object.values(data.query.pages)) {
          const title = page.title || '';
          if (!isValidTitle(title, wfName)) continue;
          const lower = title.toLowerCase();
          const cleanName = wfName.toLowerCase().replace(/waterfall|falls/g, '').trim();
          if (cleanName && !lower.includes(cleanName) && !lower.includes('fall')) continue;

          const info = page.imageinfo && page.imageinfo[0];
          if (!info || !info.url || seen.has(info.url)) continue;
          if (info.url.endsWith('.svg') || (info.width && info.width < 600)) continue;

          seen.add(info.url);
          const ext = info.extmetadata || {};
          const artist = (ext.Artist && ext.Artist.value) || 'Wikimedia Commons';
          const cleanArtist = artist.replace(/<[^>]+>/g, '').trim() || 'Wikimedia Commons';
          const desc = (ext.ImageDescription && ext.ImageDescription.value) || '';
          const cleanDesc = desc.replace(/<[^>]+>/g, '').trim();
          const caption = cleanDesc.slice(0, 120) || `Scenic view of ${wfName}`;

          photos.push({
            image_url: info.url,
            credit_name: cleanArtist.slice(0, 100),
            caption: caption
          });

          if (photos.length >= limit) break;
        }
      }
    } catch (err) {}
    await new Promise(r => setTimeout(r, 200));
  }
  return photos;
}

const CATEGORY_MAP = {
  'Tahquamenon Falls (Upper)': 'Category:Tahquamenon_Falls',
  'Tahquamenon Falls (Lower)': 'Category:Tahquamenon_Falls',
  'Bond Falls': 'Category:Bond_Falls',
  'Miners Falls': 'Category:Miners_Falls',
  'Munising Falls': 'Category:Munising_Falls',
  'Laughing Whitefish Falls': 'Category:Laughing_Whitefish_Falls',
  'Agate Falls': 'Category:Agate_Falls',
  'Wagner Falls': 'Category:Wagner_Falls_Scenic_Site',
  'Sable Falls': 'Category:Sable_Falls',
  'Chapel Falls': 'Category:Chapel_Falls',
  'Mosquito Falls': 'Category:Mosquito_Falls',
  'Spray Falls': 'Category:Spray_Falls_(Michigan)',
  'Au Train Falls': 'Category:Au_Train_Falls',
  'Canyon Falls': 'Category:Canyon_Falls_(Michigan)',
  'Eagle River Falls': 'Category:Eagle_River_Falls',
  'Hungarian Falls': 'Category:Hungarian_Falls',
  'Manabezho Falls': 'Category:Manabezho_Falls',
  'Manido Falls': 'Category:Manido_Falls',
  'Nawadaha Falls': 'Category:Nawadaha_Falls',
  'Gorge Falls': 'Category:Gorge_Falls',
  'Haven Falls': 'Category:Haven_Falls',
  'Memorial Falls': 'Category:Memorial_Falls',
  'Tannery Falls': 'Category:Tannery_Falls',
  'Scott Falls': 'Category:Scott_Falls',
  'Superior Falls': 'Category:Superior_Falls',
  'Bonanza Falls': 'Category:Bonanza_Falls',
  'O-Kun-de-Kun Falls': 'Category:O_Kun_de_Kun_Falls'
};

async function main() {
  console.log('Fetching waterfalls from Supabase...');
  const res = await fetch(`${SUPABASE_URL}/rest/v1/waterfalls?select=id,name,county&order=name.asc`, { headers });
  const waterfalls = await res.json();
  console.log(`Loaded ${waterfalls.length} waterfalls.`);

  const curated = [];

  // Phase 1: Direct Categories
  console.log('\n--- Phase 1: Sourcing Direct Wikimedia Categories ---');
  for (const wf of waterfalls) {
    let cat = CATEGORY_MAP[wf.name];
    if (!cat && CATEGORY_MAP[wf.name.replace(' (Upper)', '').replace(' (Lower)', '')]) {
      cat = CATEGORY_MAP[wf.name.replace(' (Upper)', '').replace(' (Lower)', '')];
    }
    if (cat) {
      const photos = await getCategoryPhotos(cat, wf.name, 4);
      if (photos.length > 0) {
        curated.push({ wfId: wf.id, name: wf.name, photos });
        console.log(`✅ ${wf.name}: ${photos.length} verified photo(s)`);
      }
    }
  }

  // Phase 2: Verified Search for Key Falls
  console.log('\n--- Phase 2: Verified Search for Additional UP Waterfalls ---');
  for (const wf of waterfalls) {
    if (curated.some(c => c.wfId === wf.id)) continue;
    // Search top falls
    const photos = await searchWikiPhotos(wf.name, wf.county, 3);
    if (photos.length > 0) {
      curated.push({ wfId: wf.id, name: wf.name, photos });
      console.log(`✅ ${wf.name}: ${photos.length} verified photo(s)`);
    }
  }

  console.log(`\nTotal Waterfalls with curated photos: ${curated.length}`);
  fs.writeFileSync('curated_photos.json', JSON.stringify(curated, null, 2));
  console.log('Saved to curated_photos.json');
}

main();
