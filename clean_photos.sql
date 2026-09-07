-- ==============================================================================
-- CLEAN WATERFALL PHOTOS MIGRATION
-- Purges non-waterfall assets (minerals, signs, maps, logos, flags, generic rocks)
-- and ensures authentic curation across the UP Waterfalls directory.
-- ==============================================================================

BEGIN;

-- 1. Remove known non-waterfall photos matching keyword patterns in the URL or caption
DELETE FROM waterfall_photos
WHERE 
  -- Minerals and geological specimens (e.g. Pyrite rock on Warner Falls)
  image_url ILIKE '%pyrite%'
  OR image_url ILIKE '%mineral%'
  OR image_url ILIKE '%specimen%'
  OR image_url ILIKE '%crystal%'
  
  -- Signs, maps, plaques, historical markers, and non-fall infrastructure
  OR image_url ILIKE '%_sign%'
  OR image_url ILIKE '%sign_%'
  OR image_url ILIKE '%marker%'
  OR image_url ILIKE '%plaque%'
  OR image_url ILIKE '%map_%'
  OR image_url ILIKE '%_map%'
  OR image_url ILIKE '%flag%'
  OR image_url ILIKE '%logo%'
  OR image_url ILIKE '%bridge%'
  OR image_url ILIKE '%building%'
  OR image_url ILIKE '%road%'
  OR image_url ILIKE '%highway%'
  OR image_url ILIKE '%campsite%'
  OR image_url ILIKE '%tent%'

  -- Specific known false matches from early Wikimedia scraping
  OR image_url ILIKE '%Pictured_Rocks_2025u%'
  OR image_url ILIKE '%Porcupine_Mountains_Wilderness_State_Park_in_spring_2023_-_425%'
  
  -- Captions indicating non-waterfall assets
  OR caption ILIKE '%sign%'
  OR caption ILIKE '%plaque%'
  OR caption ILIKE '%map%'
  OR caption ILIKE '%marker%'
  OR caption ILIKE '%mineral%';

-- 2. Ensure every waterfall with photos still has a designated hero photo
-- For any waterfall whose hero photo was deleted, pick the earliest remaining photo as the new hero
UPDATE waterfall_photos wp
SET is_hero = true
WHERE id IN (
  SELECT DISTINCT ON (waterfall_id) id
  FROM waterfall_photos
  WHERE waterfall_id NOT IN (
    SELECT waterfall_id 
    FROM waterfall_photos 
    WHERE is_hero = true
  )
  ORDER BY waterfall_id, id ASC
);

COMMIT;
