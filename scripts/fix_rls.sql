-- Run this in your Supabase SQL Editor to ensure the frontend can read the waterfalls data
ALTER TABLE waterfalls ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access" ON waterfalls;
CREATE POLICY "Allow public read access" ON waterfalls FOR SELECT USING (true);

-- Ensure public read access for waterfall_photos
ALTER TABLE waterfall_photos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on photos" ON waterfall_photos;
CREATE POLICY "Allow public read access on photos" ON waterfall_photos FOR SELECT USING (true);

-- Ensure public read access for waterfall_blogs
ALTER TABLE waterfall_blogs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on waterfall_blogs" ON waterfall_blogs;
CREATE POLICY "Allow public read access on waterfall_blogs" ON waterfall_blogs FOR SELECT USING (true);
GRANT SELECT ON waterfall_blogs TO anon, authenticated;

