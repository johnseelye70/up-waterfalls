-- Run this in your Supabase SQL Editor to ensure the frontend can read the waterfalls data
ALTER TABLE waterfalls ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON waterfalls FOR SELECT USING (true);
