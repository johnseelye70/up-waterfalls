BEGIN;

-- 1. Append alternative hike distances to the description of the primary waterfall record
UPDATE waterfalls w
SET description = w.description || ' (Alternative hike distances: ' || dupes.distances || ' miles.)'
FROM (
  SELECT primary_id, string_agg(trail_length_miles::text, ', ') as distances
  FROM (
    SELECT 
      first_value(id) OVER(PARTITION BY name, county ORDER BY trail_length_miles ASC, id ASC) as primary_id,
      trail_length_miles,
      ROW_NUMBER() OVER(PARTITION BY name, county ORDER BY trail_length_miles ASC, id ASC) as row_num
    FROM waterfalls
  ) sub
  WHERE row_num > 1 AND trail_length_miles IS NOT NULL
  GROUP BY primary_id
) dupes
WHERE w.id = dupes.primary_id;

-- 2. Reassign all photos from the duplicate records to the primary record so we don't lose them
UPDATE waterfall_photos
SET waterfall_id = primary_falls.primary_id
FROM (
  SELECT id,
         first_value(id) OVER(PARTITION BY name, county ORDER BY trail_length_miles ASC, id ASC) as primary_id,
         ROW_NUMBER() OVER(PARTITION BY name, county ORDER BY trail_length_miles ASC, id ASC) as row_num
  FROM waterfalls
) primary_falls
WHERE waterfall_photos.waterfall_id = primary_falls.id
  AND primary_falls.row_num > 1;

-- 3. Delete the duplicate waterfall records (which no longer have photos)
DELETE FROM waterfalls
WHERE id IN (
  SELECT id
  FROM (
    SELECT id,
    ROW_NUMBER() OVER(PARTITION BY name, county ORDER BY trail_length_miles ASC, id ASC) as row_num
    FROM waterfalls
  ) t
  WHERE t.row_num > 1
);

COMMIT;
