-- Seed sample travel blogs for a few known waterfalls

WITH wfs AS (
    SELECT id, name FROM waterfalls WHERE name IN ('Mosquito Falls', 'Chapel Falls', 'Tahquamenon Falls', 'Bond Falls')
)
INSERT INTO waterfall_blogs (waterfall_id, title, source_site, url, cover_image_url, snippet, published_date)
VALUES
-- Mosquito Falls Sample
((SELECT id FROM wfs WHERE name = 'Mosquito Falls' LIMIT 1),
 'Exploring Mosquito Falls in Pictured Rocks',
 'Mitten State Wanderer',
 'https://example.com/mosquito-falls-hike',
 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
 'Mosquito Falls is one of the most accessible and beautiful drops in the Pictured Rocks National Lakeshore. Here is everything you need to know about the trail.',
 '2025-05-12'),

-- Chapel Falls Sample
((SELECT id FROM wfs WHERE name = 'Chapel Falls' LIMIT 1),
 'The Ultimate Guide to the Chapel Loop',
 'Pure Michigan Logs',
 'https://example.com/chapel-loop-guide',
 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
 'Hiking the Chapel Basin loop takes you past this towering 60-foot waterfall before hitting the Lake Superior shoreline.',
 '2024-09-21'),

-- Tahquamenon Falls Sample
((SELECT id FROM wfs WHERE name = 'Tahquamenon Falls' LIMIT 1),
 'Why Tahquamenon Falls is the Root Beer Falls of the North',
 'Awesome Mitten',
 'https://example.com/tahquamenon-root-beer',
 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80',
 'Discover the science behind the unique copper-brown color of Tahquamenon Falls and why it is a must-visit in every season.',
 '2023-11-04')
 
ON CONFLICT DO NOTHING;
