BEGIN;

-- STAGE 2 MASSIVE SEEDING


-- Munising Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Munising Falls', 'Alger', 'Central UP', 46.42278, -86.62139, 'Unknown', 'Easy', 1.0, 'Paved/Gravel Lot', 'Varies', 'Historically significant wilderness area.', 'Munising Falls is a waterfall located in Munising in the westernmost portion of the Pictured Rocks National Lakeshore in Alger County, Michigan.  The falls drops about 50 feet (15 m) over a sandstone cliff.  With the exception of the spring thaw, the amount of water falling is relatively small.  There are trails leading to multiple viewpoints around the falls. In the winter, the falls freeze formi...')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Munising_Falls.jpg', 'Beautiful view of Munising Falls', true
FROM new_waterfall;


-- Miners Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Miners Falls', 'Alger', 'Central UP', 46.47444, -86.53056, 'Unknown', 'Moderate', 1.0, 'Paved/Gravel Lot', 'Varies', 'Historically significant wilderness area.', 'Miners Falls is a waterfall located on Miners River in the western portion of the Pictured Rocks National Lakeshore in Alger County, Michigan.  The falls drops about 40 feet (12 m) over a sandstone outcrop with a 10-foot (3.0 m) crest.  The falls can be accessed by a 0.6 mile gravel path, with stairs leading to a lookout.  ...')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/9/92/Miner_Falls.jpg', 'Beautiful view of Miners Falls', true
FROM new_waterfall;


-- Sable Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Sable Falls', 'Alger', 'Central UP', 46.66888889, -86.01333333, 'Unknown', 'Moderate', 1.0, 'Paved/Gravel Lot', 'Varies', 'Historically significant wilderness area.', 'Sable Falls is a waterfall located on Sable Creek in the easternmost portion of the Pictured Rocks National Lakeshore in Alger County, Michigan. The main access road to the falls is H-58 west of Grand Marais, Michigan. The falls tumbles 75 feet over Munising and Jacobsville sandstone formations.  The waterfall is approximately one-half mile from Lake Superior. Stairs allow for relatively easy acce...')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/6/61/Sable_Falls_%282016%29.jpg', 'Beautiful view of Sable Falls', true
FROM new_waterfall;


-- Wagner Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Wagner Falls', 'Alger', 'Central UP', 46.5, -87.5, 'Unknown', 'Easy', 1.0, 'Paved/Gravel Lot', 'Varies', 'Historically significant wilderness area.', 'Wagner Falls is a waterfall on Wagner Creek near Munising, in Alger County, Upper Michigan. They are in the Wagner Falls Scenic Site, a Michigan State Park of the Michigan Department of Natural Resources. The falls are located near the junction of M-28 and M-94 and can be reached by a short trail and boardwalk. Water flowing over the falls joins the Anna River below the falls, and flows into Lake ...')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/4/49/Wagner_Falls.jpg', 'Beautiful view of Wagner Falls', true
FROM new_waterfall;


-- Alger Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Alger Falls', 'Alger', 'Central UP', 46.5, -87.5, 'Unknown', 'Easy', 1.0, 'Paved/Gravel Lot', 'Varies', 'Historically significant wilderness area.', 'Alger Falls is a waterfall located along highway M-28 (Michigan highway) in Alger County, Michigan near Munising at the junction with M-94.  The falls consist of a series of drops, the highest of which is about 15 feet (4.6 m).  The falls can be seen from the highway. The level of water coming over the falls can vary greatly depending on snow melt or rainfall....')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Alger_Falls_6.jpg', 'Beautiful view of Alger Falls', true
FROM new_waterfall;


-- Scott Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Scott Falls', 'Alger', 'Central UP', 46.5, -87.5, 'Unknown', 'Easy', 1.0, 'Paved/Gravel Lot', 'Varies', 'Historically significant wilderness area.', 'Scott Falls is a waterfall located along highway M-28 in Alger County, Michigan near the town of Au Train.  The falls drops about 10 feet (3.0 m) over a sandstone cliff into a small pool.  The falls can be seen from the highway; they are across the road from the H.J. Rathfoot State Roadside Park....')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Scott_Falls_5.jpg', 'Beautiful view of Scott Falls', true
FROM new_waterfall;


-- Laughing Whitefish Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Laughing Whitefish Falls', 'Alger', 'Central UP', 46.38388889, -87.06861111, 'Unknown', 'Moderate', 1.0, 'Paved/Gravel Lot', 'Varies', 'Historically significant wilderness area.', 'Laughing Whitefish Falls State Park is a public recreation area protecting 960 acres (390 ha) along the Laughing Whitefish River in Onota Township and Rock River Township, in far western Alger County, Michigan. Its main scenic feature is Laughing Whitefish Falls, a 100-foot fan-shaped cascade located in the southern part of the site, in Rock River Township, eight miles (13 km) south of Lake Superi...')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/6/66/Laughingwhitefish013.jpg', 'Beautiful view of Laughing Whitefish Falls', true
FROM new_waterfall;


-- Tahquamenon Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Tahquamenon Falls', 'Chippewa', 'Eastern UP', 46.574, -85.256, 'Unknown', 'Easy', 1.0, 'Paved/Gravel Lot', 'Varies', 'Historically significant wilderness area.', 'The Tahquamenon Falls ( tə-KWAH-mə-non, -⁠nən) are a series of waterfalls on the Tahquamenon River, shortly before it empties into Lake Superior, in the northeastern Upper Peninsula of Michigan. They are the largest waterfalls in Michigan and one of the largest in the eastern half of North America. The water is noticeably brown in color from the tannins leached from the cedar swamps which the rive...')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/7/74/Upper_Tahquamenon_Falls_Fall_2007.jpeg', 'Beautiful view of Tahquamenon Falls', true
FROM new_waterfall;


-- Great Conglomerate Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Great Conglomerate Falls', 'Gogebic', 'Western UP', 46.5, -87.5, 'Unknown', 'Moderate', 1.0, 'Paved/Gravel Lot', 'Varies', 'Historically significant wilderness area.', 'Great Conglomerate Falls is a 30 feet (9.1 m) waterfall on the Black River in Michigan. It is split into two drops in the summertime when water is lower. The falls takes its name from the large conglomerate outcropping in the middle of the river that forms its segmented appearance....')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/1/18/Great_Conglomerate_Falls.JPG', 'Beautiful view of Great Conglomerate Falls', true
FROM new_waterfall;


-- Manabezho Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Manabezho Falls', 'Gogebic', 'Western UP', 46.7073, -89.9718, 'Unknown', 'Easy', 1.0, 'Paved/Gravel Lot', 'Varies', 'Historically significant wilderness area.', 'Manabezho Falls is a waterfall on the Presque Isle River and is located in the Porcupine Mountains Wilderness State Park in Gogebic County, Michigan.  With a drop of approximately 25 feet and a crest of 150 feet, it is the largest of the waterfalls on the river.  It is below Manido Falls and Nawadaha Falls.  The name Manabezho refers to an Ojibway spirit god.  A view of the falls is easily accessi...')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/0/01/Manabezho_Falls.jpg', 'Beautiful view of Manabezho Falls', true
FROM new_waterfall;


-- Manido Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Manido Falls', 'Gogebic', 'Western UP', 46.705, -89.9707, 'Unknown', 'Easy', 1.0, 'Paved/Gravel Lot', 'Varies', 'Historically significant wilderness area.', 'Manido Falls is a waterfall on the Presque Isle River and is located in the Porcupine Mountains Wilderness State Park in Gogebic County, Michigan. With a drop of approximately 15 feet, it is the smallest of the waterfalls on the river. It has a crest between 50 and 150 feet, depending on the river volume. It is above Manabezho Falls and further down from Nawadaha Falls. The name Manido comes from ...')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/0/09/Manido_Falls_2_edit.jpg', 'Beautiful view of Manido Falls', true
FROM new_waterfall;


-- Nawadaha Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Nawadaha Falls', 'Gogebic', 'Western UP', 46.6986, -89.9747, 'Unknown', 'Easy', 1.0, 'Paved/Gravel Lot', 'Varies', 'Historically significant wilderness area.', 'Nawadaha Falls is a waterfall on the Presque Isle River and is located in the Porcupine Mountains Wilderness State Park in Gogebic County, Michigan.  The falls has a drop of approximately 15 feet and a crest of 50–150 feet.  It is above both Manido Falls and Manabezho Falls.  Access to this waterfall requires climbing some rugged trails....')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Nawadaha_Falls.jpg', 'Beautiful view of Nawadaha Falls', true
FROM new_waterfall;


-- Hungarian Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Hungarian Falls', 'Houghton', 'Keweenaw Peninsula', 46.5, -87.5, 'Unknown', 'Moderate', 1.0, 'Paved/Gravel Lot', 'Varies', 'Historically significant wilderness area.', 'Hungarian Falls is a series of waterfalls in the Dover Creek west of Hubbell, in Houghton County, Michigan. The site is near State Highway 26 in the Upper Peninsula of Michigan. There are three drops with the largest being 50 feet. The total height of the falls is 90 feet. The base of the waterfall is made up of Jacobsville Sandstone, a type of rock common in that area. Hungarian Falls is also nea...')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Middle_falls.jpg', 'Beautiful view of Hungarian Falls', true
FROM new_waterfall;


-- Houghton-Douglass Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Houghton-Douglass Falls', 'Houghton', 'Keweenaw Peninsula', 46.5, -87.5, 'Unknown', 'Hard', 1.0, 'Paved/Gravel Lot', 'Varies', 'Historically significant wilderness area.', 'Houghton-Douglass Falls (also known as Douglass Houghton Falls, Douglass Falls or Houghton Falls) is a waterfall in the U.S. state of Michigan. At 110 feet (34 m) from the top to its base, it is Michigan''s tallest waterfall. It is located in the state''s Upper Peninsula between the villages of Laurium and Lake Linden just off Highway M-26. It is designated by the state as a Scenic Site and Vetera...')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/2/24/DouglassHoughtonFallsMI.jpg', 'Beautiful view of Houghton-Douglass Falls', true
FROM new_waterfall;


-- Bond Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Bond Falls', 'Ontonagon', 'Western UP', 46.40880556, -89.13288889, 'Unknown', 'Easy', 1.0, 'Paved/Gravel Lot', 'Varies', 'Historically significant wilderness area.', 'Bond Falls is a waterfall on the middle branch of the Ontonagon River, a few miles east of Paulding in Haight Township in southern Ontonagon County, Michigan. The site is near U.S. Highway 45 in the western portion of the Upper Peninsula of Michigan. The waterfalls are listed by the state of Michigan as the Bond Falls Scenic Site. The total drop of the falls is about 50 feet (15 m). Trails lead to...')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Bond_falls.jpg', 'Beautiful view of Bond Falls', true
FROM new_waterfall;


-- Agate Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Agate Falls', 'Ontonagon', 'Western UP', 46.48083, -89.09096, 'Unknown', 'Easy', 1.0, 'Paved/Gravel Lot', 'Varies', 'Historically significant wilderness area.', 'The Agate Falls Scenic Site is a waterfall and scenic site located in Interior Township, in southeastern Ontonagon County, Michigan.  The waterfall is 7 miles (11 km) southeast of Bruce Crossing, Michigan on the state highway M-28. Agate Falls is a 39-foot-high (12 m) waterfall of the Middle Branch of the Ontonagon River. Dropping down from the highlands of the western Upper Peninsula, this river ...')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Agate_Falls_%28265409244%29.jpg', 'Beautiful view of Agate Falls', true
FROM new_waterfall;


-- O Kun de Kun Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('O Kun de Kun Falls', 'Ontonagon', 'Western UP', 46.5, -87.5, 'Unknown', 'Moderate', 1.0, 'Paved/Gravel Lot', 'Varies', 'Historically significant wilderness area.', 'O Kun de Kun Falls is a waterfall of the Baltimore River north of Bruce Crossing, in Ontonagon County, Michigan....')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/2/2e/O_Kun_de_Kun_Falls.jpg', 'Beautiful view of O Kun de Kun Falls', true
FROM new_waterfall;

COMMIT;
