const https = require('https');
const fs = require('fs');

function getJson(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { 'User-Agent': 'UPWaterfallsCurator/2.0 (contact@seelye.info)' } }, res => {
      let d = '';
      res.on('data', chunk => d += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(d)); } catch (e) { resolve(null); }
      });
    });
    req.on('error', () => resolve(null));
    req.setTimeout(8000, () => { req.destroy(); resolve(null); });
  });
}

async function searchFile(query) {
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=' +
    encodeURIComponent(query + ' filetype:bitmap -sign -map -plaque -marker') +
    '&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url|extmetadata|dimensions|mediatype';
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
  });
}

async function run() {
  const queries = [
    { target: 'Piers Gorge', q: '"Piers Gorge" Menominee' },
    { target: 'Piers Gorge 2', q: '"Piers Gorge" waterfall' },
    { target: 'Sturgeon River Gorge Falls', q: '"Sturgeon River Gorge" waterfall' },
    { target: 'Sturgeon River Gorge 2', q: '"Sturgeon River Gorge" Michigan' },
    { target: 'Rock River Falls', q: '"Rock River Falls"' },
    { target: 'Fumee Falls', q: '"Fumee Falls"' },
    { target: 'Rapid River Falls', q: '"Rapid River Falls"' },
    { target: 'Chicagon Falls', q: '"Chicagon Falls"' },
    { target: 'Pinnacle Falls', q: '"Pinnacle Falls"' },
    { target: 'Big Erick\'s Falls', q: '"Big Eric" OR "Big Erick"' },
    { target: 'Silver River Falls Keweenaw', q: '"Silver River Falls"' },
    { target: 'Quartzite Falls', q: '"Quartzite Falls"' },
    { target: 'Slate River Falls', q: '"Slate River Falls"' },
    { target: 'Tioga Falls', q: '"Tioga Falls"' },
    { target: 'Wright Street Falls', q: '"Wright Street Falls"' },
    { target: 'Redridge Dam Falls', q: '"Redridge Steel Dam"' },
    { target: 'Nokomis Falls', q: '"Nokomis Falls"' },
    { target: 'West Branch Sturgeon Falls', q: '"West Branch Sturgeon Falls"' },
    { target: 'Gabbro Falls', q: '"Gabbro Falls"' },
    { target: 'Yondota Falls', q: '"Yondota Falls"' },
    { target: 'Little Union River', q: '"Little Union River"' },
    { target: 'Presque Isle River', q: '"Presque Isle River" waterfall' },
    { target: 'Black River Marquette', q: '"Black River Falls" Marquette' },
    { target: 'Trap Falls', q: '"Trap Falls"' }
  ];

  const resultsSummary = [];

  for (const item of queries) {
    const results = await searchFile(item.q);
    console.log(`=== ${item.target} (query: ${item.q}): ${results.length} hits ===`);
    for (const r of results) {
      const cleanArtist = r.artist.replace(/<[^>]+>/g, '').trim() || 'Wikimedia Commons';
      const cleanDesc = r.desc.replace(/<[^>]+>/g, '').trim();
      console.log(`  File: ${r.title} [${r.width}x${r.height}]`);
      console.log(`  URL: ${r.url}`);
      console.log(`  Artist: ${cleanArtist.slice(0, 60)}`);
      resultsSummary.push({
        target: item.target,
        query: item.q,
        file: r.title,
        url: r.url,
        width: r.width,
        height: r.height,
        artist: cleanArtist.slice(0, 100),
        desc: cleanDesc.slice(0, 150)
      });
    }
    await new Promise(r => setTimeout(r, 200));
  }

  fs.writeFileSync('target_search_results.json', JSON.stringify(resultsSummary, null, 2));
}

run();
