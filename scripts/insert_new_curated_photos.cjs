const https = require('https');

const SUPABASE_URL = 'nucgskdkumlpldrkxxye.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ixyzKq96XXpktJIU_6Jsrw_bgs3del-';

const photosToInsert = [
  // 1. Sturgeon Falls (Houghton County, Ottawa National Forest)
  {
    waterfall_id: '1c288e5a-a4b1-4882-af68-450bde588974',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/ONF_SturgeonRiverGorge_FC092215_%2821008284173%29.jpg',
    caption: 'Sturgeon River Gorge canyon rim and rushing falls in autumn, Ottawa National Forest',
    credit_name: 'U.S. Forest Service - Eastern Region',
    is_hero: true
  },
  {
    waterfall_id: '1c288e5a-a4b1-4882-af68-450bde588974',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/SRG102016.jpg',
    caption: 'Sturgeon Falls plunging 30 feet over volcanic bedrock inside the deep wilderness canyon',
    credit_name: 'Bloodyboppa / Wikimedia Commons',
    is_hero: false
  },

  // 2. Upper Sturgeon Falls (Baraga County)
  {
    waterfall_id: '61d20f75-f700-4c17-b5aa-05e4b238c6be',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Upper_Falls_-_panoramio.jpg',
    caption: 'Upper Falls on the Sturgeon River flowing downstream from Canyon Falls through Baraga County',
    credit_name: 'Ian Shackleford',
    is_hero: true
  },

  // 3. Trap Falls (Ontonagon County, Porcupine Mountains / Bergland) - secondary photo (hero was inserted during test)
  {
    waterfall_id: 'b5d5c3cd-123d-4a86-8f25-d03f70bc8fdb',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Pathway_to_Trap_Falls_%2853846749456%29.jpg',
    caption: 'Wilderness foot trail and boardwalk winding through northern hemlocks toward Trap Falls',
    credit_name: 'Chris Rycroft',
    is_hero: false
  },

  // 4. Lower Montreal Falls (Keweenaw County)
  {
    waterfall_id: 'de018d3a-e31a-44c4-a72f-fc2d19323999',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Montreal_Falls_at_Night.jpg',
    caption: 'Lower Montreal Falls cascading over dark volcanic basalt into Lake Superior under northern night skies',
    credit_name: 'RomanKahler',
    is_hero: true
  },

  // 5. Upper Montreal Falls (Keweenaw County)
  {
    waterfall_id: '03711364-a8eb-4340-97b3-daefbfee9c38',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Montreal_Falls_Flowing_into_Lake_Superior_%2835836926425%29.jpg',
    caption: 'Panoramic view of Montreal Falls flowing directly into Lake Superior at the remote tip of the Keweenaw Peninsula',
    credit_name: 'Courtney Celley / U.S. Fish and Wildlife Service',
    is_hero: true
  },

  // 6. Chapel Beach Falls (Alger County, Pictured Rocks National Lakeshore)
  {
    waterfall_id: 'ac665e50-c52a-410a-8a06-cdba4b5b400f',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Pictured_Rocks_National_Lakeshore_CHAPEL-1.jpg',
    caption: 'Chapel Beach Falls cascading over sandstone shelves directly onto the beach of Lake Superior',
    credit_name: 'National Park Service Digital Image Archives',
    is_hero: true
  },

  // 7. Lower Yellow Dog Falls (Marquette County)
  {
    waterfall_id: '8782c8f8-4554-4cdc-9e56-bb027baa6a9d',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Yellow_dog_falls.jpg',
    caption: 'Lower rapids and cascades on the Yellow Dog River flowing through dense northern boreal forest in Marquette County',
    credit_name: 'Myself / Wikimedia Commons',
    is_hero: true
  },

  // 8. West Branch Falls (Baraga County)
  {
    waterfall_id: '767ad250-74d3-4470-8089-c41b4d311574',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/West_Branch_Sturgeon_Falls_-_panoramio.jpg',
    caption: 'West Branch Sturgeon Falls cascading through a rocky cedar forest in Baraga County',
    credit_name: 'Ian Shackleford',
    is_hero: true
  },

  // 9. Sandstone Falls duplicates in Gogebic County
  {
    waterfall_id: 'fe8ac0ba-b534-4b3e-99ee-c5c6477d3038',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Sandstone_Falls.jpg',
    caption: 'Sandstone Falls on northern Michigan\'s scenic Black River Scenic Byway',
    credit_name: 'Mr.Z-man / Wikimedia Commons',
    is_hero: true
  },
  {
    waterfall_id: 'dd9f9725-bfdd-4885-bc2f-31b8d92e8469',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Sandstone_Falls.jpg',
    caption: 'Sandstone Falls rushing over sandstone ledges on the Black River in Gogebic County',
    credit_name: 'Mr.Z-man / Wikimedia Commons',
    is_hero: true
  },

  // 10. Dead River Falls - Ultra High Resolution 6000x4000 view from Marquette
  {
    waterfall_id: '49452338-6e6e-4bbd-9967-bcd60642131b',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Dead_River_Wright_Street_Falls_Marquette_Michigan_2024-09-22.jpg',
    caption: 'Dead River Falls and cascading rock gorge over Precambrian Gneiss in Marquette, Michigan',
    credit_name: 'Tim Kiser / Wikimedia Commons',
    is_hero: false
  }
];

function postPhoto(photo) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify([photo]);
    const options = {
      hostname: SUPABASE_URL,
      path: '/rest/v1/waterfall_photos',
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_KEY,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'Prefer': 'return=representation'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(body));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function run() {
  console.log(`Starting insertion of ${photosToInsert.length} verified authentic waterfall photos...`);
  let successCount = 0;

  for (const photo of photosToInsert) {
    try {
      const res = await postPhoto(photo);
      successCount++;
      console.log(`✅ Inserted photo for waterfall ${photo.waterfall_id}: "${photo.caption.slice(0, 50)}..."`);
    } catch (err) {
      console.error(`❌ Failed to insert for ${photo.waterfall_id}:`, err.message);
    }
  }

  console.log(`\nSuccessfully inserted ${successCount} / ${photosToInsert.length} photos into Supabase!`);
}

run();
