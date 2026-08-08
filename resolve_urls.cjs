const https = require('https');

const urls = [
  "https://commons.wikimedia.org/wiki/Special:FilePath/Miners'_Falls,_Michigan1.jpg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Miners_Falls_(Miners_River,_Pictured_Rocks_National_Lakeshore,_Upper_Peninsula_of_Michigan,_USA)_3_(21476941185).jpg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Gfp-michigan-pictured-rocks-national-lakeshore-top-of-miners-falls.jpg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Upper_Tahquamenon_Falls.jpg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Upper_Tahquamenon_falls_Panoramic_view.jpg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Tahquamenon_falls_upper.jpg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Bond_falls.jpg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Ontonagon_River_downstream_of_Bond_Falls_1.jpg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Hungarian_Falls,_Middle_Falls.png",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Hungarian_Falls,_Upper_Falls.png",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Lower_falls.jpg"
];

function fetchLocation(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let loc = res.headers.location;
        if (!loc.startsWith('http')) {
           loc = 'https://commons.wikimedia.org' + loc;
        }
        fetchLocation(loc).then(resolve).catch(reject);
      } else {
        // Drop the ?utm_source stuff from the url if present
        let finalUrl = url.split('?')[0];
        resolve(finalUrl);
      }
    }).on('error', reject);
  });
}

async function run() {
  for (const url of urls) {
    const finalUrl = await fetchLocation(url);
    console.log(finalUrl);
  }
}

run();
