-- Seed Data for Waterfall Photos (Authentic Wikimedia Commons Images) & RLS Setup

-- Ensure the public can read the photos
ALTER TABLE waterfall_photos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on photos" ON waterfall_photos;
CREATE POLICY "Allow public read access on photos" ON waterfall_photos FOR SELECT USING (true);

-- Clear existing photos so we don't duplicate on re-runs
TRUNCATE TABLE waterfall_photos;

INSERT INTO waterfall_photos (waterfall_id, image_url, caption, credit_name, is_hero)
VALUES 
-- Miners Falls
(
    (SELECT id FROM waterfalls WHERE name = 'Miners Falls' LIMIT 1),
    'https://upload.wikimedia.org/wikipedia/commons/f/f9/Miners''_Falls,_Michigan1.jpg',
    'Miners Falls dropping over the sandstone ledge',
    'Wikimedia Commons (MJCdetroit)',
    true
),
(
    (SELECT id FROM waterfalls WHERE name = 'Miners Falls' LIMIT 1),
    'https://upload.wikimedia.org/wikipedia/commons/b/ba/Miners_Falls_(Miners_River,_Pictured_Rocks_National_Lakeshore,_Upper_Peninsula_of_Michigan,_USA)_3_(21476941185).jpg',
    'Close up of the rushing water',
    'Wikimedia Commons (James St. John)',
    false
),
(
    (SELECT id FROM waterfalls WHERE name = 'Miners Falls' LIMIT 1),
    'https://upload.wikimedia.org/wikipedia/commons/1/1a/Gfp-michigan-pictured-rocks-national-lakeshore-top-of-miners-falls.jpg',
    'Top of Miners Falls view',
    'Wikimedia Commons (Yinan Chen)',
    false
),

-- Tahquamenon Falls (Upper)
(
    (SELECT id FROM waterfalls WHERE name = 'Tahquamenon Falls (Upper)' LIMIT 1),
    'https://upload.wikimedia.org/wikipedia/commons/9/9f/Upper_Tahquamenon_Falls.jpg',
    'The Upper Falls showing its famous rootbeer color',
    'Wikimedia Commons',
    true
),
(
    (SELECT id FROM waterfalls WHERE name = 'Tahquamenon Falls (Upper)' LIMIT 1),
    'https://upload.wikimedia.org/wikipedia/commons/4/40/Upper_Tahquamenon_falls_Panoramic_view.jpg',
    'Panoramic view of the falls in early spring',
    'Wikimedia Commons',
    false
),
(
    (SELECT id FROM waterfalls WHERE name = 'Tahquamenon Falls (Upper)' LIMIT 1),
    'https://upload.wikimedia.org/wikipedia/commons/e/e5/Tahquamenon_falls_upper.jpg',
    'Close up of the amber water',
    'Wikimedia Commons',
    false
),

-- Bond Falls
(
    (SELECT id FROM waterfalls WHERE name = 'Bond Falls' LIMIT 1),
    'https://upload.wikimedia.org/wikipedia/commons/b/bb/Bond_falls.jpg',
    'Bond Falls wide cascading flow',
    'Wikimedia Commons (Mr.Z-man)',
    true
),
(
    (SELECT id FROM waterfalls WHERE name = 'Bond Falls' LIMIT 1),
    'https://upload.wikimedia.org/wikipedia/commons/7/77/Ontonagon_River_downstream_of_Bond_Falls_1.jpg',
    'Ontonagon River downstream of Bond Falls',
    'Wikimedia Commons',
    false
),

-- Hungarian Falls
(
    (SELECT id FROM waterfalls WHERE name = 'Hungarian Falls' LIMIT 1),
    'https://upload.wikimedia.org/wikipedia/commons/e/e2/Hungarian_Falls,_Middle_Falls.png',
    'The middle drop at Hungarian Falls',
    'Wikimedia Commons',
    true
),
(
    (SELECT id FROM waterfalls WHERE name = 'Hungarian Falls' LIMIT 1),
    'https://upload.wikimedia.org/wikipedia/commons/3/37/Hungarian_Falls,_Upper_Falls.png',
    'The upper drop at Hungarian Falls',
    'Wikimedia Commons',
    false
),
(
    (SELECT id FROM waterfalls WHERE name = 'Hungarian Falls' LIMIT 1),
    'https://upload.wikimedia.org/wikipedia/commons/7/74/Lower_falls.jpg',
    'The lower waterfalls',
    'Wikimedia Commons',
    false
);
