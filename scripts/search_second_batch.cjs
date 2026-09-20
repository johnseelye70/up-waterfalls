const https = require('https');
const fs = require('fs');

function getJson(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { 'User-Agent': 'UPWaterfallsCurator/2.0 (contact@seelye.info)' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve(null); }
      });
    });
    req.on('error', () => resolve(null));
    req.setTimeout(8000, () => { req.destroy(); resolve(null); });
  });
}

async function searchCommons(q) {
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=' +
    encodeURIComponent(q + ' filetype:bitmap -sign -map -plaque -book -page -text') +
    '&gsrnamespace=6&gsrlimit=6&prop=imageinfo&iiprop=url|extmetadata|dimensions|mediatype';
  const data = await getJson(url);
  if (!data || !data.query || !data.query.pages) return [];
  return Object.values(data.query.pages).map(p => {
    const info = p.imageinfo && p.imageinfo[0];
    const ext = (info && info.extmetadata) || {};
    return {
      title: p.title,
      url: info ? info.url : '',
      width: info ? info.width : 0,
      height: info ? info.height : 0,
      artist: (ext.Artist && ext.Artist.value) || '',
      desc: (ext.ImageDescription && ext.ImageDescription.value) || ''
    };
  }).filter(p => p.url && p.width >= 700);
}

const CANDIDATES_TO_SEARCH = [
  { target: 'Cascade Falls', county: 'Ontonagon', q: '"Cascade Falls" Ontonagon OR "Cascade Falls" "Lake Gogebic"' },
  { target: 'Horseshoe Falls', county: 'Alger', q: '"Horseshoe Falls" Munising' },
  { target: 'Warner Falls', county: 'Marquette', q: '"Warner Falls" Michigan OR "Warner Falls" Palmer' },
  { target: 'Morgan Falls', county: 'Marquette', q: '"Morgan Falls" Marquette' },
  { target: 'Power House Falls', county: 'Baraga', q: '"Powerhouse Falls" OR "Power House Falls" L\'Anse' },
  { target: 'Falls River Falls', county: 'Baraga', q: '"Falls River" L\'Anse waterfall' },
  { target: 'Big Garlic Falls', county: 'Marquette', q: '"Big Garlic" waterfall OR "Big Garlic Falls"' },
  { target: 'Little Garlic Falls', county: 'Marquette', q: '"Little Garlic" waterfall OR "Little Garlic Falls"' },
  { target: 'Black Slate Falls', county: 'Baraga', q: '"Black Slate Falls" Slate River' },
  { target: 'Peterson Falls', county: 'Gogebic', q: '"Peterson Falls" Montreal River' },
  { target: 'Nonesuch Falls', county: 'Ontonagon', q: '"Nonesuch Falls" Porcupine' },
  { target: 'Mex-i-min-e Falls', county: 'Gogebic', q: '"Mex-i-min-e" OR "Meximine Falls"' },
  { target: 'Root Beer Falls', county: 'Gogebic', q: '"Root Beer Falls" Wakefield' },
  { target: 'Chapel Beach Falls', county: 'Alger', q: '"Chapel Beach Falls" OR "Chapel Beach" waterfall' },
  { target: 'Potato Patch Falls', county: 'Alger', q: '"Potato Patch Falls"' },
  { target: 'Huron Creek Falls', county: 'Houghton', q: '"Huron Creek Falls" Houghton' },
  { target: 'Ripley Falls', county: 'Houghton', q: '"Ripley Falls" Houghton OR "Ripley Falls" Hancock' },
  { target: 'Quincy Falls', county: 'Houghton', q: '"Quincy Falls" Houghton' }
];

async function main() {
  const allResults = [];
  for (const c of CANDIDATES_TO_SEARCH) {
    console.log(`Searching for: ${c.target} (${c.county} Co.) - query: ${c.q}`);
    const hits = await searchCommons(c.q);
    console.log(`  -> ${hits.length} hits`);
    for (const h of hits) {
      const cleanArtist = h.artist.replace(/<[^>]+>/g, '').trim() || 'Wikimedia Commons';
      const cleanDesc = h.desc.replace(/<[^>]+>/g, '').trim();
      console.log(`    File: ${h.title} [${h.width}x${h.height}]`);
      console.log(`    Artist: ${cleanArtist.slice(0, 50)}`);
      console.log(`    Desc: ${cleanDesc.slice(0, 100)}`);
      allResults.push({
        target: c.target,
        county: c.county,
        file: h.title,
        url: h.url,
        width: h.width,
        height: h.height,
        artist: cleanArtist.slice(0, 100),
        desc: cleanDesc.slice(0, 200)
      });
    }
    await new Promise(r => setTimeout(r, 200));
  }

  fs.writeFileSync('second_batch_results.json', JSON.stringify(allResults, null, 2));
  console.log(`Saved ${allResults.length} hits to second_batch_results.json`);
}

main();
