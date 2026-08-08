-- Seed Data for Waterfall Photos & RLS Setup

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
    'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
    'Miners Falls dropping over the sandstone ledge',
    'Unsplash',
    true
),
(
    (SELECT id FROM waterfalls WHERE name = 'Miners Falls' LIMIT 1),
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    'The boardwalk trail leading up to the falls',
    'Unsplash',
    false
),
(
    (SELECT id FROM waterfalls WHERE name = 'Miners Falls' LIMIT 1),
    'https://images.unsplash.com/photo-1511497584788-876761c11969?auto=format&fit=crop&w=1200&q=80',
    'Close up of the rushing water',
    'Unsplash',
    false
),

-- Tahquamenon Falls (Upper)
(
    (SELECT id FROM waterfalls WHERE name = 'Tahquamenon Falls (Upper)' LIMIT 1),
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    'The Upper Falls showing its famous rootbeer color',
    'Unsplash',
    true
),
(
    (SELECT id FROM waterfalls WHERE name = 'Tahquamenon Falls (Upper)' LIMIT 1),
    'https://images.unsplash.com/photo-1469122312224-c5846569feb1?auto=format&fit=crop&w=1200&q=80',
    'Looking down river from the viewing deck',
    'Unsplash',
    false
),

-- Bond Falls
(
    (SELECT id FROM waterfalls WHERE name = 'Bond Falls' LIMIT 1),
    'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80',
    'Bond Falls wide cascading flow',
    'Unsplash',
    true
),
(
    (SELECT id FROM waterfalls WHERE name = 'Bond Falls' LIMIT 1),
    'https://images.unsplash.com/photo-1444492417251-9c84a5fa18e0?auto=format&fit=crop&w=1200&q=80',
    'Autumn colors surrounding Bond Falls',
    'Unsplash',
    false
),

-- Hungarian Falls
(
    (SELECT id FROM waterfalls WHERE name = 'Hungarian Falls' LIMIT 1),
    'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80',
    'The upper drop at Hungarian Falls',
    'Unsplash',
    true
),
(
    (SELECT id FROM waterfalls WHERE name = 'Hungarian Falls' LIMIT 1),
    'https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?auto=format&fit=crop&w=1200&q=80',
    'Hiking trail alongside the gorge',
    'Unsplash',
    false
);
