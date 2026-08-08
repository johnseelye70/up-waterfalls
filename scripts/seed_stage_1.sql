-- Seed Data for Stage 1 Expansion (8 New Waterfalls)

-- 1. Insert New Waterfalls (Letting Supabase generate the UUIDs automatically)
INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
VALUES 
('Munising Falls', 'Alger', 'Central UP', 46.4258, -86.6342, '50 ft', 'Easy (Paved/Boardwalk)', 0.5, 'Paved Lot', 'NPS Pass', 'Historically used by early settlers for water supply. The area was heavily logged in the 1800s.', 'A spectacular 50-foot waterfall dropping over a sandstone cliff in Pictured Rocks National Lakeshore. The trail is fully paved and accessible.'),
('Wagner Falls', 'Alger', 'Central UP', 46.3889, -86.6433, '20 ft', 'Easy', 0.2, 'Small Gravel Lot', 'Michigan Recreation Passport', 'Designated as a state scenic site.', 'A highly photogenic, cascading waterfall nestled in a dense canopy of hemlock and pine. Very easy access via a short boardwalk.'),
('Laughing Whitefish Falls', 'Alger', 'Central UP', 46.3833, -87.0667, '100 ft', 'Moderate', 1.2, 'Dirt Lot', 'Michigan Recreation Passport', 'Named by Native Americans for the shape of the river mouth resembling a laughing whitefish.', 'One of the UP''s tallest and most unique waterfalls. Water fans out over a massive 100-foot limestone escarpment.'),
('Agate Falls', 'Ontonagon', 'Western UP', 46.4788, -89.0967, '39 ft', 'Moderate', 1.0, 'Paved Lot (Joseph Oravec Roadside Park)', 'None', 'The Chicago and North Western Railway bridge passes directly over the falls.', 'Considered by many to be one of Michigan''s most picturesque waterfalls, Agate Falls features water spilling over a terraced rock face into the Middle Branch Ontonagon River.'),
('Eagle River Falls', 'Keweenaw', 'Keweenaw Peninsula', 47.4136, -88.2958, '60 ft', 'Easy', 0.1, 'Paved Roadside', 'None', 'Located next to the historic Lake Superior Fuse Company.', 'A powerful 60-foot waterfall that flows through a gorge right beneath the M-26 highway bridge in the quaint town of Eagle River.'),
('Potawatomi Falls', 'Gogebic', 'Western UP', 46.6194, -90.0433, '30 ft', 'Easy (Boardwalk)', 0.4, 'Paved Lot', 'NFS Pass', 'Part of the Black River National Forest Scenic Byway.', 'One of the most impressive waterfalls on the Black River. A fully accessible boardwalk provides a spectacular view of the 30-foot drop and 130-foot width.'),
('Gorge Falls', 'Gogebic', 'Western UP', 46.6214, -90.0436, '34 ft', 'Moderate', 0.5, 'Paved Lot', 'NFS Pass', 'The narrowest of the major Black River waterfalls.', 'Located just downstream from Potawatomi Falls, Gorge Falls forces the Black River through a deep, narrow conglomerate rock canyon, creating a violent and mesmerizing 34-foot drop.'),
('Sandstone Falls', 'Gogebic', 'Western UP', 46.6267, -90.0442, '15 ft', 'Moderate', 0.6, 'Paved Lot', 'NFS Pass', 'Known for the colorful sandstone slabs that line the riverbed.', 'A wide, terraced waterfall that drops over series of red sandstone steps. It is smaller than its upstream neighbors but offers excellent opportunities to explore the rock formations.');

-- 2. Insert Photos for New Waterfalls (Linking to the generated UUIDs)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, credit_name, is_hero)
VALUES 
((SELECT id FROM waterfalls WHERE name = 'Munising Falls' LIMIT 1), 'https://upload.wikimedia.org/wikipedia/commons/3/39/Munising_falls.jpg', 'Munising Falls dropping over the sandstone cliff', 'Wikimedia Commons', true),
((SELECT id FROM waterfalls WHERE name = 'Wagner Falls' LIMIT 1), 'https://upload.wikimedia.org/wikipedia/commons/4/49/Wagner_Falls.jpg', 'The main cascade of Wagner Falls', 'Wikimedia Commons', true),
((SELECT id FROM waterfalls WHERE name = 'Laughing Whitefish Falls' LIMIT 1), 'https://upload.wikimedia.org/wikipedia/commons/6/66/Laughingwhitefish013.jpg', 'Water fanning over the 100-foot limestone escarpment', 'Wikimedia Commons', true),
((SELECT id FROM waterfalls WHERE name = 'Agate Falls' LIMIT 1), 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Agate_Falls_(265409244).jpg', 'Agate Falls cascading over terraced rock', 'Wikimedia Commons', true),
((SELECT id FROM waterfalls WHERE name = 'Eagle River Falls' LIMIT 1), 'https://upload.wikimedia.org/wikipedia/commons/4/44/Eagle_River_Falls.jpg', 'Eagle River Falls cutting through the gorge', 'Wikimedia Commons', true),
((SELECT id FROM waterfalls WHERE name = 'Potawatomi Falls' LIMIT 1), 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Potawatomi_falls.jpg', 'The wide drop of Potawatomi Falls', 'Wikimedia Commons', true),
((SELECT id FROM waterfalls WHERE name = 'Gorge Falls' LIMIT 1), 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Gorge_Falls.jpg', 'Gorge Falls forcing water through the narrow canyon', 'Wikimedia Commons', true),
((SELECT id FROM waterfalls WHERE name = 'Sandstone Falls' LIMIT 1), 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Sandstone_Falls.jpg', 'Sandstone Falls flowing over red rock steps', 'Wikimedia Commons', true);

-- 3. Insert Nearby Places for the Trip Planner
INSERT INTO nearby_places (waterfall_id, category, name, description, distance_miles)
VALUES 
((SELECT id FROM waterfalls WHERE name = 'Munising Falls' LIMIT 1), 'Breakfast', 'Falling Rock Cafe', 'Books, art, and amazing coffee/breakfast sandwiches.', 2.1),
((SELECT id FROM waterfalls WHERE name = 'Munising Falls' LIMIT 1), 'Dinner', 'Eh Burger', 'Locally sourced burgers and whitefish sandwiches.', 1.8),
((SELECT id FROM waterfalls WHERE name = 'Wagner Falls' LIMIT 1), 'Lodging', 'Roam Inn', 'Boutique lodging in a historic lumber baron mansion.', 3.0),
((SELECT id FROM waterfalls WHERE name = 'Laughing Whitefish Falls' LIMIT 1), 'Lunch', 'Brownstone Inn', 'Historic log cabin tavern famous for whitefish and burgers.', 9.5),
((SELECT id FROM waterfalls WHERE name = 'Agate Falls' LIMIT 1), 'Dinner', 'Agate Falls Resort Bar', 'Local watering hole near the trail.', 1.0),
((SELECT id FROM waterfalls WHERE name = 'Eagle River Falls' LIMIT 1), 'Dinner', 'Fitzgerald''s Restaurant', 'Legendary barbecue and whiskey bar on the shores of Lake Superior.', 0.2),
((SELECT id FROM waterfalls WHERE name = 'Potawatomi Falls' LIMIT 1), 'Lodging', 'Black River Lodge', 'Rustic lodge providing access to the scenic byway.', 5.0),
((SELECT id FROM waterfalls WHERE name = 'Gorge Falls' LIMIT 1), 'Lunch', 'Copper Peak Concessions', 'Grab a quick bite after riding the ski flying hill adventure.', 4.5),
((SELECT id FROM waterfalls WHERE name = 'Sandstone Falls' LIMIT 1), 'Dinner', 'Black River Valley Pub', 'Cozy pub with hearty Northwoods meals.', 6.2);
