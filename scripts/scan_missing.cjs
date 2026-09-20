const https = require('https');
const fs = require('fs');

const SUPABASE_URL = 'https://nucgskdkumlpldrkxxye.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ixyzKq96XXpktJIU_6Jsrw_bgs3del-';
const headers = {
  apikey: SUPABASE_KEY,
  Authorization: 'Bearer ' + SUPABASE_KEY
};

function getJson(url, reqHeaders = headers) {
  return new Promise((resolve, reject) => {
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
    }).on('error', reject);
  });
}

async function main() {
  const wfs = await getJson(SUPABASE_URL + '/rest/v1/waterfalls?select=id,name,county,latitude,longitude,description&order=name.asc');
  const photos = await getJson(SUPABASE_URL + '/rest/v1/waterfall_photos?select=id,waterfall_id,image_url,is_hero');

  const photoCountByWf = {};
  for (const p of photos) {
    photoCountByWf[p.waterfall_id] = (photoCountByWf[p.waterfall_id] || 0) + 1;
  }

  const missing = wfs.filter(w => !photoCountByWf[w.id]);
  const present = wfs.filter(w => photoCountByWf[w.id] > 0);

  console.log('Total Waterfalls: ' + wfs.length);
  console.log('Total Photos: ' + photos.length);
  console.log('Waterfalls with photos: ' + present.length);
  console.log('Waterfalls missing photos: ' + missing.length);

  fs.writeFileSync('missing_waterfalls.json', JSON.stringify(missing, null, 2));
  console.log('Saved missing_waterfalls.json');
}

main();
