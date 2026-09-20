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

async function searchCommons(q, limit = 20) {
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=' +
    encodeURIComponent(q + ' filetype:bitmap -sign -map -plaque') +
    '&gsrnamespace=6&gsrlimit=' + limit + '&prop=imageinfo&iiprop=url|extmetadata|dimensions|mediatype';
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

async function run() {
  const queries = [
    'Ottawa National Forest waterfall',
    'Hiawatha National Forest waterfall',
    'Pictured Rocks waterfall',
    'Baraga County waterfall',
    'Marquette County waterfall',
    'Keweenaw waterfall',
    'Ontonagon waterfall',
    'Gogebic waterfall',
    'Dickinson County Michigan waterfall',
    'Iron County Michigan waterfall'
  ];

  const allHits = [];
  const seenUrls = new Set();

  for (const q of queries) {
    const hits = await searchCommons(q, 25);
    console.log(`Query "${q}": ${hits.length} hits`);
    for (const h of hits) {
      if (!seenUrls.has(h.url)) {
        seenUrls.add(h.url);
        const cleanArtist = h.artist.replace(/<[^>]+>/g, '').trim() || 'Wikimedia Commons';
        const cleanDesc = h.desc.replace(/<[^>]+>/g, '').trim();
        allHits.push({
          title: h.title,
          url: h.url,
          width: h.width,
          height: h.height,
          artist: cleanArtist.slice(0, 100),
          desc: cleanDesc.slice(0, 300),
          query: q
        });
      }
    }
    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\nTotal unique files discovered: ${allHits.length}`);
  fs.writeFileSync('regional_waterfalls_discovered.json', JSON.stringify(allHits, null, 2));
}

run();
