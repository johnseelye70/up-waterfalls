const https = require('https');
const fs = require('fs');

const WIKI_HEADERS = {
  'User-Agent': 'UPWaterfallsCurator/2.0 (contact@seelye.info)'
};

function getJson(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: WIKI_HEADERS }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(null);
        }
      });
    });
    req.on('error', () => resolve(null));
    req.setTimeout(8000, () => {
      req.destroy();
      resolve(null);
    });
  });
}

const CATEGORIES = [
  'Category:Waterfalls of the Upper Peninsula',
  'Category:Waterfalls in Michigan',
  'Category:Waterfalls of Porcupine Mountains Wilderness State Park',
  'Category:Waterfalls in Pictured Rocks National Lakeshore',
  'Category:Black River (Gogebic County, Michigan)',
  'Category:Presque Isle River (Michigan)',
  'Category:Montreal River (Wisconsin–Michigan)',
  'Category:Sturgeon River (Delta–Houghton–Ontonagon–Baraga counties, Michigan)'
];

async function main() {
  const allFiles = [];
  const seenUrls = new Set();

  for (const cat of CATEGORIES) {
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=categorymembers&gcmtitle=' +
      encodeURIComponent(cat) +
      '&gcmtype=file&gcmlimit=500&prop=imageinfo&iiprop=url|extmetadata|dimensions|mediatype';
    const data = await getJson(url);
    if (data && data.query && data.query.pages) {
      for (const p of Object.values(data.query.pages)) {
        const info = p.imageinfo && p.imageinfo[0];
        if (!info || !info.url || info.mediatype !== 'BITMAP') continue;
        if (info.width && info.width < 600) continue;
        if (seenUrls.has(info.url)) continue;
        seenUrls.add(info.url);

        const ext = info.extmetadata || {};
        const artist = (ext.Artist && ext.Artist.value) || 'Wikimedia Commons';
        const cleanArtist = artist.replace(/<[^>]+>/g, '').trim() || 'Wikimedia Commons';
        const desc = (ext.ImageDescription && ext.ImageDescription.value) || '';
        const cleanDesc = desc.replace(/<[^>]+>/g, '').trim();

        allFiles.push({
          title: p.title,
          url: info.url,
          width: info.width,
          height: info.height,
          artist: cleanArtist.slice(0, 100),
          desc: cleanDesc.slice(0, 300),
          cat
        });
      }
    }
  }

  console.log(`Found ${allFiles.length} distinct bitmap files across categories.`);
  fs.writeFileSync('all_category_files.json', JSON.stringify(allFiles, null, 2));
}

main();
