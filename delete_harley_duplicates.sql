-- Consolidation Script for Harley Falls in Baraga County
-- Removes redundant #2, #3, and #4 entries and renames Harley Falls #1 to "Harley Falls"

BEGIN;

-- 1. Remove photos associated with Harley Falls #2, #3, #4 (if any)
DELETE FROM waterfall_photos WHERE waterfall_id IN (
  'f01905c5-54dd-4d9f-9cfb-960e19e889a0', -- Harley Falls #2
  'd4e9aa92-d5cf-4593-ad73-d66a9000e921', -- Harley Falls #3
  'f0a4c8f7-6897-40cf-b967-d21127cf5ba7'  -- Harley Falls #4
);

-- 2. Remove blogs associated with Harley Falls #2, #3, #4 (if any)
DELETE FROM waterfall_blogs WHERE waterfall_id IN (
  'f01905c5-54dd-4d9f-9cfb-960e19e889a0', -- Harley Falls #2
  'd4e9aa92-d5cf-4593-ad73-d66a9000e921', -- Harley Falls #3
  'f0a4c8f7-6897-40cf-b967-d21127cf5ba7'  -- Harley Falls #4
);

-- 3. Delete Harley Falls #2, #3, and #4 from waterfalls
DELETE FROM waterfalls WHERE id IN (
  'f01905c5-54dd-4d9f-9cfb-960e19e889a0', -- Harley Falls #2
  'd4e9aa92-d5cf-4593-ad73-d66a9000e921', -- Harley Falls #3
  'f0a4c8f7-6897-40cf-b967-d21127cf5ba7'  -- Harley Falls #4
);

-- 4. Rename Harley Falls #1 to Harley Falls
UPDATE waterfalls 
SET name = 'Harley Falls' 
WHERE id = '677041e5-cfa4-4cdd-8755-c2e8528f0ff2';

COMMIT;
