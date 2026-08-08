-- Seed Data for Nearby Places & RLS Setup

-- Ensure the public can read the places
ALTER TABLE nearby_places ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on places" ON nearby_places;
CREATE POLICY "Allow public read access on places" ON nearby_places FOR SELECT USING (true);

-- Fix the schema to match the React frontend (we originally created place_type, but we need category and description)
ALTER TABLE nearby_places RENAME COLUMN place_type TO category;
ALTER TABLE nearby_places ADD COLUMN IF NOT EXISTS description text;

-- Insert places using subqueries to find the right waterfall ID
INSERT INTO nearby_places (waterfall_id, category, name, description, distance_miles)
VALUES 
(
    (SELECT id FROM waterfalls WHERE name = 'Miners Falls' LIMIT 1),
    'Breakfast',
    'Falling Rock Cafe & Bookstore',
    'Amazing locally roasted coffee, breakfast sandwiches, and thousands of books.',
    5.2
),
(
    (SELECT id FROM waterfalls WHERE name = 'Miners Falls' LIMIT 1),
    'Lunch',
    'Muldoons Pasties & Gifts',
    'Award-winning traditional Cornish pasties in Munising.',
    6.1
),
(
    (SELECT id FROM waterfalls WHERE name = 'Miners Falls' LIMIT 1),
    'Dinner',
    'Tracey''s at Roam Inn',
    'Upscale rustic dining with fresh Great Lakes fish.',
    6.5
),
(
    (SELECT id FROM waterfalls WHERE name = 'Miners Falls' LIMIT 1),
    'Lodging',
    'Pictured Rocks Inn & Suites',
    'Comfortable lodging right in downtown Munising.',
    6.0
),
(
    (SELECT id FROM waterfalls WHERE name = 'Tahquamenon Falls (Upper)' LIMIT 1),
    'Lunch',
    'Tahquamenon Falls Brewery & Pub',
    'Microbrewery and pub food located right at the Upper Falls.',
    0.1
),
(
    (SELECT id FROM waterfalls WHERE name = 'Tahquamenon Falls (Upper)' LIMIT 1),
    'Dinner',
    'Pine Stump Junction',
    'Classic UP roadside tavern with burgers and pizza.',
    22.0
),
(
    (SELECT id FROM waterfalls WHERE name = 'Bond Falls' LIMIT 1),
    'Lunch',
    'Agate Cross B&B',
    'Quaint local lodging nearby.',
    12.0
),
(
    (SELECT id FROM waterfalls WHERE name = 'Hungarian Falls' LIMIT 1),
    'Breakfast',
    'Suomi Home Bakery & Restaurant',
    'Legendary Finnish breakfasts in Houghton (Pannukakku!).',
    10.5
),
(
    (SELECT id FROM waterfalls WHERE name = 'Hungarian Falls' LIMIT 1),
    'Dinner',
    'Keweenaw Brewing Company',
    'Grab a Widow Maker Black Ale and order in local pizza.',
    10.6
);
