const fs = require('fs');

if (!fs.existsSync('curated_photos.json')) {
  console.log('curated_photos.json does not exist yet.');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync('curated_photos.json', 'utf-8'));
console.log(`Generating SQL for ${data.length} waterfalls...`);

let sql = `-- ==============================================================================
-- CURATED AUTHENTIC WATERFALL PHOTOS SEED
-- Verified photography sourced from dedicated Wikimedia Commons categories
-- Multiple authentic photos per waterfall with complete attribution
-- ==============================================================================

BEGIN;

`;

let totalPhotos = 0;

for (const entry of data) {
  const { wfId, name, photos } = entry;
  if (!photos || photos.length === 0) continue;

  sql += `-- ${name}\n`;
  photos.forEach((p, idx) => {
    totalPhotos++;
    const isHero = idx === 0;
    const cleanUrl = p.image_url.replace(/'/g, "''");
    const cleanCaption = p.caption.replace(/'/g, "''");
    const cleanCredit = (p.credit_name || 'Wikimedia Commons').replace(/'/g, "''");

    sql += `INSERT INTO waterfall_photos (waterfall_id, image_url, caption, credit_name, is_hero)
VALUES ('${wfId}', '${cleanUrl}', '${cleanCaption}', '${cleanCredit}', ${isHero});\n`;
  });
  sql += '\n';
}

sql += `COMMIT;\n`;

fs.writeFileSync('insert_curated_photos.sql', sql);
console.log(`Generated insert_curated_photos.sql with ${totalPhotos} authentic photos across ${data.length} waterfalls!`);
