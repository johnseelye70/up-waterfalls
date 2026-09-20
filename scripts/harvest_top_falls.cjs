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
    '&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|extmetadata|dimensions|mediatype';
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

const FALLS_TO_INVESTIGATE = [
  { id: '1c288e5a-a4b1-4882-af68-450bde588974', name: 'Sturgeon Falls', county: 'Houghton', searches: ['"Sturgeon River Gorge" waterfall', '"Sturgeon Falls" Michigan', '"Sturgeon River Gorge"'] },
  { id: '61d20f75-f700-4c17-b5aa-05e4b238c6be', name: 'Upper Sturgeon Falls', county: 'Baraga', searches: ['"Upper Falls" "Sturgeon River"', '"Sturgeon River" Baraga waterfall'] },
  { id: 'b5d5c3cd-123d-4a86-8f25-d03f70bc8fdb', name: 'Trap Falls', county: 'Ontonagon', searches: ['"Trap Falls" Michigan', '"Trap Falls" Bergland', 'Trap Falls Porcupine'] },
  { id: 'de018d3a-e31a-44c4-a72f-fc2d19323999', name: 'Lower Montreal Falls', county: 'Keweenaw', searches: ['"Montreal Falls" Keweenaw', '"Lower Montreal Falls"'] },
  { id: '03711364-a8eb-4340-97b3-daefbfee9c38', name: 'Upper Montreal Falls', county: 'Keweenaw', searches: ['"Upper Montreal Falls" Keweenaw', '"Montreal Falls" Michigan Keweenaw'] },
  { id: '480328b4-7018-4d3a-9fed-c5ac18be40da', name: 'Piers Gorge Falls', county: 'Dickinson', searches: ['"Piers Gorge" Menominee River', '"Piers Gorge" Michigan', '"Piers Gorge"'] },
  { id: '7997cb8a-fe71-4203-b33e-53178772ed96', name: 'Rock River Falls', county: 'Alger', searches: ['"Rock River Falls" Michigan', '"Rock River Canyon Wilderness"'] },
  { id: 'beafcbf2-e219-4064-bd4d-acd5f1fb8a97', name: 'Big Erick\'s Fall', county: 'Baraga', searches: ['"Big Eric" Huron River', '"Big Erick" waterfall', '"Big Eric\'s" Michigan'] },
  { id: 'af03b2a5-7399-406d-84b1-82fc74a725cd', name: 'Silver River Falls', county: 'Keweenaw', searches: ['"Silver River Falls" Keweenaw', '"Silver River" Keweenaw waterfall'] },
  { id: 'c8022732-a6ff-4b9d-a77e-13ad7fba4326', name: 'Silver Falls', county: 'Baraga', searches: ['"Silver Falls" Baraga', '"Silver River" Baraga waterfall'] },
  { id: 'e02db9f1-592d-4bb8-bceb-82ba550fbdb1', name: 'Quartzite Falls', county: 'Baraga', searches: ['"Quartzite Falls" Slate River', '"Quartzite Falls" Michigan'] },
  { id: 'dd0595dd-e79e-4204-a904-9d7528f2fae0', name: 'Slate River Falls', county: 'Baraga', searches: ['"Slate River Falls" Baraga', '"Slate River" waterfall Michigan'] },
  { id: '17eb523e-ba7a-49b4-83ea-e449f11f567a', name: 'Tioga Falls', county: 'Baraga', searches: ['"Tioga Falls" Baraga', '"Tioga River" roadside park waterfall', '"Tioga Falls" Michigan'] },
  { id: '49381d34-00c8-4325-971e-7921c3739f23', name: 'Chicagon Falls', county: 'Iron', searches: ['"Chicagon Falls" Michigan', '"Chicagon Creek" waterfall', '"Chicagon Falls"'] },
  { id: '06ebf7f5-be56-4498-883d-b8af0a1ffdaa', name: 'Rapid River Falls', county: 'Delta', searches: ['"Rapid River Falls" Delta County', '"Rapid River Falls" park Michigan', '"Rapid River" waterfall'] },
  { id: '126f80b9-e519-4085-809e-d3083e22b773', name: 'Pinnacle Falls', county: 'Marquette', searches: ['"Pinnacle Falls" Yellow Dog', '"Pinnacle Falls" Marquette', '"Pinnacle Falls" Michigan'] },
  { id: 'a729a7b6-8570-4c24-83f7-3850f720efaf', name: 'Black River Falls', county: 'Marquette', searches: ['"Black River Falls" Marquette', '"Black River" Ishpeming waterfall'] }
];

async function main() {
  const verifiedMatches = [];

  for (const item of FALLS_TO_INVESTIGATE) {
    console.log(`\n========================================`);
    console.log(`Searching for: ${item.name} (${item.county} County)...`);
    const seen = new Set();
    const candidates = [];

    for (const s of item.searches) {
      const hits = await searchCommons(s);
      for (const h of hits) {
        if (!seen.has(h.url)) {
          seen.add(h.url);
          candidates.push(h);
        }
      }
      await new Promise(r => setTimeout(r, 200));
    }

    console.log(`Found ${candidates.length} unique candidates.`);
    for (const c of candidates) {
      const cleanArtist = c.artist.replace(/<[^>]+>/g, '').trim() || 'Wikimedia Commons';
      const cleanDesc = c.desc.replace(/<[^>]+>/g, '').trim();
      console.log(`- File: ${c.title} [${c.width}x${c.height}]`);
      console.log(`  Artist: ${cleanArtist.slice(0, 50)}`);
      console.log(`  Desc: ${cleanDesc.slice(0, 100)}`);
      console.log(`  URL: ${c.url}`);
    }

    verifiedMatches.push({
      wf: item,
      candidates
    });
  }

  fs.writeFileSync('detailed_harvest.json', JSON.stringify(verifiedMatches, null, 2));
}

main();
