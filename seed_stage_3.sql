BEGIN;

-- STAGE 3 MASSIVE SEEDING


-- Mosquito Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Mosquito Falls', 'Alger', 'Upper Peninsula', 46.51648, -86.478323, 'Unknown', 'Moderate', 1.0, 'Dirt/Gravel', 'Varies', 'A scenic natural waterfall in the Upper Peninsula.', 'Mosquito Falls is a beautiful natural waterfall located in Alger County, Michigan. Tucked away in the wilderness of the Upper Peninsula, it offers visitors a peaceful retreat into nature. The exact trail conditions vary by season, but the scenic beauty of the surrounding forest and the cascading waters make it a wonderful spot for photography and hiking.')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Mosquito_Falls_-_panoramio.jpg', 'Beautiful natural scenery near Mosquito Falls', true
FROM new_waterfall;


-- Chapel Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Chapel Falls', 'Alger', 'Upper Peninsula', 46.528975, -86.444315, 'Unknown', 'Moderate', 1.0, 'Dirt/Gravel', 'Varies', 'A scenic natural waterfall in the Upper Peninsula.', 'Chapel Falls is a beautiful natural waterfall located in Alger County, Michigan. Tucked away in the wilderness of the Upper Peninsula, it offers visitors a peaceful retreat into nature. The exact trail conditions vary by season, but the scenic beauty of the surrounding forest and the cascading waters make it a wonderful spot for photography and hiking.')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/b/b8/60-foot_high_Chapel_Falls_as_it_cascades_toward_Chapel_Lake._%287a19e30c-fe6e-48e5-babd-aa8cf2372aa1%29.JPG', 'Beautiful natural scenery near Chapel Falls', true
FROM new_waterfall;


-- Spray Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Spray Falls', 'Unknown', 'Upper Peninsula', 46.5580527, -86.4106043, 'Unknown', 'Moderate', 1.0, 'Dirt/Gravel', 'Varies', 'A scenic natural waterfall in the Upper Peninsula.', 'Spray Falls is a beautiful natural waterfall located in Unknown County, Michigan. Tucked away in the wilderness of the Upper Peninsula, it offers visitors a peaceful retreat into nature. The exact trail conditions vary by season, but the scenic beauty of the surrounding forest and the cascading waters make it a wonderful spot for photography and hiking.')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/6/60/Pictured_Rocks_2025u.jpg', 'Beautiful natural scenery near Spray Falls', true
FROM new_waterfall;


-- Warner Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Warner Falls', 'Marquette', 'Upper Peninsula', 46.43363, -87.598971, 'Unknown', 'Moderate', 1.0, 'Dirt/Gravel', 'Varies', 'A scenic natural waterfall in the Upper Peninsula.', 'Warner Falls is a beautiful natural waterfall located in Marquette County, Michigan. Tucked away in the wilderness of the Upper Peninsula, it offers visitors a peaceful retreat into nature. The exact trail conditions vary by season, but the scenic beauty of the surrounding forest and the cascading waters make it a wonderful spot for photography and hiking.')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/2/28/Pyrite_%2847859658412%29.jpg', 'Beautiful natural scenery near Warner Falls', true
FROM new_waterfall;


-- Bonanza Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Bonanza Falls', 'Ontonagon', 'Upper Peninsula', 46.8175002, -89.5701911, 'Unknown', 'Moderate', 1.0, 'Dirt/Gravel', 'Varies', 'A scenic natural waterfall in the Upper Peninsula.', 'Bonanza Falls is a beautiful natural waterfall located in Ontonagon County, Michigan. Tucked away in the wilderness of the Upper Peninsula, it offers visitors a peaceful retreat into nature. The exact trail conditions vary by season, but the scenic beauty of the surrounding forest and the cascading waters make it a wonderful spot for photography and hiking.')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/0/01/Porcupine_Mountains_Wilderness_State_Park_in_spring_2023_-_425.jpg', 'Beautiful natural scenery near Bonanza Falls', true
FROM new_waterfall;


-- Haven Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Haven Falls', 'Keweenaw', 'Upper Peninsula', 47.3819709, -88.0288066, 'Unknown', 'Moderate', 1.0, 'Dirt/Gravel', 'Varies', 'A scenic natural waterfall in the Upper Peninsula.', 'Haven Falls is a beautiful natural waterfall located in Keweenaw County, Michigan. Tucked away in the wilderness of the Upper Peninsula, it offers visitors a peaceful retreat into nature. The exact trail conditions vary by season, but the scenic beauty of the surrounding forest and the cascading waters make it a wonderful spot for photography and hiking.')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Lac_La_Belle_Michigan.jpg', 'Beautiful natural scenery near Haven Falls', true
FROM new_waterfall;


-- Eagle River Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Eagle River Falls', 'Keweenaw', 'Upper Peninsula', 47.4117909, -88.2963975, 'Unknown', 'Moderate', 1.0, 'Dirt/Gravel', 'Varies', 'A scenic natural waterfall in the Upper Peninsula.', 'Eagle River Falls is a beautiful natural waterfall located in Keweenaw County, Michigan. Tucked away in the wilderness of the Upper Peninsula, it offers visitors a peaceful retreat into nature. The exact trail conditions vary by season, but the scenic beauty of the surrounding forest and the cascading waters make it a wonderful spot for photography and hiking.')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Eagle_River_Falls_and_Dam_-_Michigan_Registered_Historic_Site_%2843467810985%29.jpg', 'Beautiful natural scenery near Eagle River Falls', true
FROM new_waterfall;


-- Lepisto Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Lepisto Falls', 'Gogebic', 'Upper Peninsula', 46.6586423, -89.9402495, 'Unknown', 'Moderate', 1.0, 'Dirt/Gravel', 'Varies', 'A scenic natural waterfall in the Upper Peninsula.', 'Lepisto Falls is a beautiful natural waterfall located in Gogebic County, Michigan. Tucked away in the wilderness of the Upper Peninsula, it offers visitors a peaceful retreat into nature. The exact trail conditions vary by season, but the scenic beauty of the surrounding forest and the cascading waters make it a wonderful spot for photography and hiking.')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Lepisto_Falls_-_panoramio.jpg', 'Beautiful natural scenery near Lepisto Falls', true
FROM new_waterfall;


-- Olson Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Olson Falls', 'Alger', 'Upper Peninsula', 46.4157922, -86.6267728, 'Unknown', 'Moderate', 1.0, 'Dirt/Gravel', 'Varies', 'A scenic natural waterfall in the Upper Peninsula.', 'Olson Falls is a beautiful natural waterfall located in Alger County, Michigan. Tucked away in the wilderness of the Upper Peninsula, it offers visitors a peaceful retreat into nature. The exact trail conditions vary by season, but the scenic beauty of the surrounding forest and the cascading waters make it a wonderful spot for photography and hiking.')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/9/90/DSC_6610_%282929415466%29.jpg', 'Beautiful natural scenery near Olson Falls', true
FROM new_waterfall;


-- Memorial Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Memorial Falls', 'Alger', 'Upper Peninsula', 46.4173468, -86.6272519, 'Unknown', 'Moderate', 1.0, 'Dirt/Gravel', 'Varies', 'A scenic natural waterfall in the Upper Peninsula.', 'Memorial Falls is a beautiful natural waterfall located in Alger County, Michigan. Tucked away in the wilderness of the Upper Peninsula, it offers visitors a peaceful retreat into nature. The exact trail conditions vary by season, but the scenic beauty of the surrounding forest and the cascading waters make it a wonderful spot for photography and hiking.')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/9/90/DSC_6610_%282929415466%29.jpg', 'Beautiful natural scenery near Memorial Falls', true
FROM new_waterfall;


-- Bridalveil Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Bridalveil Falls', 'Alger', 'Upper Peninsula', 46.5087915, -86.5238046, 'Unknown', 'Moderate', 1.0, 'Dirt/Gravel', 'Varies', 'A scenic natural waterfall in the Upper Peninsula.', 'Bridalveil Falls is a beautiful natural waterfall located in Alger County, Michigan. Tucked away in the wilderness of the Upper Peninsula, it offers visitors a peaceful retreat into nature. The exact trail conditions vary by season, but the scenic beauty of the surrounding forest and the cascading waters make it a wonderful spot for photography and hiking.')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Bridalveil_Falls_in_spring_%2848cd2bc1-adc0-4526-b918-9f947aac8073%29.JPG', 'Beautiful natural scenery near Bridalveil Falls', true
FROM new_waterfall;


-- Chapel Beach Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Chapel Beach Falls', 'Alger', 'Upper Peninsula', 46.5480652, -86.4392822, 'Unknown', 'Moderate', 1.0, 'Dirt/Gravel', 'Varies', 'A scenic natural waterfall in the Upper Peninsula.', 'Chapel Beach Falls is a beautiful natural waterfall located in Alger County, Michigan. Tucked away in the wilderness of the Upper Peninsula, it offers visitors a peaceful retreat into nature. The exact trail conditions vary by season, but the scenic beauty of the surrounding forest and the cascading waters make it a wonderful spot for photography and hiking.')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/5/50/Chapel-Rock.jpg', 'Beautiful natural scenery near Chapel Beach Falls', true
FROM new_waterfall;


-- Manganese Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Manganese Falls', 'Keweenaw', 'Upper Peninsula', 47.4615657, -87.8787375, 'Unknown', 'Moderate', 1.0, 'Dirt/Gravel', 'Varies', 'A scenic natural waterfall in the Upper Peninsula.', 'Manganese Falls is a beautiful natural waterfall located in Keweenaw County, Michigan. Tucked away in the wilderness of the Upper Peninsula, it offers visitors a peaceful retreat into nature. The exact trail conditions vary by season, but the scenic beauty of the surrounding forest and the cascading waters make it a wonderful spot for photography and hiking.')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/3/38/Honda_Civic_Lake_Superior_Rally_2009_2.jpg', 'Beautiful natural scenery near Manganese Falls', true
FROM new_waterfall;


-- Haymeadow Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Haymeadow Falls', 'Delta', 'Upper Peninsula', 46.0258715, -86.8539087, 'Unknown', 'Moderate', 1.0, 'Dirt/Gravel', 'Varies', 'A scenic natural waterfall in the Upper Peninsula.', 'Haymeadow Falls is a beautiful natural waterfall located in Delta County, Michigan. Tucked away in the wilderness of the Upper Peninsula, it offers visitors a peaceful retreat into nature. The exact trail conditions vary by season, but the scenic beauty of the surrounding forest and the cascading waters make it a wonderful spot for photography and hiking.')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/a/a3/M_4608658_sw_16_060_20180724.tif', 'Beautiful natural scenery near Haymeadow Falls', true
FROM new_waterfall;


-- Sweet Mother Moses
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Sweet Mother Moses', 'Alger', 'Upper Peninsula', 46.4619381, -86.585661, 'Unknown', 'Moderate', 1.0, 'Dirt/Gravel', 'Varies', 'A scenic natural waterfall in the Upper Peninsula.', 'Sweet Mother Moses is a beautiful natural waterfall located in Alger County, Michigan. Tucked away in the wilderness of the Upper Peninsula, it offers visitors a peaceful retreat into nature. The exact trail conditions vary by season, but the scenic beauty of the surrounding forest and the cascading waters make it a wonderful spot for photography and hiking.')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/1/17/Pictured_Rocks_-_Painted_Coves.jpg', 'Beautiful natural scenery near Sweet Mother Moses', true
FROM new_waterfall;


-- Interstate Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Interstate Falls', 'Unknown', 'Upper Peninsula', 46.4746608, -90.1989986, 'Unknown', 'Moderate', 1.0, 'Dirt/Gravel', 'Varies', 'A scenic natural waterfall in the Upper Peninsula.', 'Interstate Falls is a beautiful natural waterfall located in Unknown County, Michigan. Tucked away in the wilderness of the Upper Peninsula, it offers visitors a peaceful retreat into nature. The exact trail conditions vary by season, but the scenic beauty of the surrounding forest and the cascading waters make it a wonderful spot for photography and hiking.')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/b/be/2023_Employee_Photo_Contest_%2853366079982%29.jpg', 'Beautiful natural scenery near Interstate Falls', true
FROM new_waterfall;


-- Rainbow Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Rainbow Falls', 'Gogebic', 'Upper Peninsula', 46.6587851, -90.0435135, 'Unknown', 'Moderate', 1.0, 'Dirt/Gravel', 'Varies', 'A scenic natural waterfall in the Upper Peninsula.', 'Rainbow Falls is a beautiful natural waterfall located in Gogebic County, Michigan. Tucked away in the wilderness of the Upper Peninsula, it offers visitors a peaceful retreat into nature. The exact trail conditions vary by season, but the scenic beauty of the surrounding forest and the cascading waters make it a wonderful spot for photography and hiking.')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/1/1d/2023_Employee_Photo_Contest_%2853367289809%29.jpg', 'Beautiful natural scenery near Rainbow Falls', true
FROM new_waterfall;


-- Konteka Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Konteka Falls', 'Ontonagon', 'Upper Peninsula', 46.6499871, -89.1550826, 'Unknown', 'Moderate', 1.0, 'Dirt/Gravel', 'Varies', 'A scenic natural waterfall in the Upper Peninsula.', 'Konteka Falls is a beautiful natural waterfall located in Ontonagon County, Michigan. Tucked away in the wilderness of the Upper Peninsula, it offers visitors a peaceful retreat into nature. The exact trail conditions vary by season, but the scenic beauty of the surrounding forest and the cascading waters make it a wonderful spot for photography and hiking.')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/0/06/O_Kun_de_Kun_Falls_Upper.jpg', 'Beautiful natural scenery near Konteka Falls', true
FROM new_waterfall;


-- Potawatomi Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Potawatomi Falls', 'Gogebic', 'Upper Peninsula', 46.6378532, -90.051772, 'Unknown', 'Moderate', 1.0, 'Dirt/Gravel', 'Varies', 'A scenic natural waterfall in the Upper Peninsula.', 'Potawatomi Falls is a beautiful natural waterfall located in Gogebic County, Michigan. Tucked away in the wilderness of the Upper Peninsula, it offers visitors a peaceful retreat into nature. The exact trail conditions vary by season, but the scenic beauty of the surrounding forest and the cascading waters make it a wonderful spot for photography and hiking.')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/4/48/2023_Employee_Photo_Contest_%2853366975236%29.jpg', 'Beautiful natural scenery near Potawatomi Falls', true
FROM new_waterfall;


-- Gorge Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Gorge Falls', 'Gogebic', 'Upper Peninsula', 46.6398063, -90.050461, 'Unknown', 'Moderate', 1.0, 'Dirt/Gravel', 'Varies', 'A scenic natural waterfall in the Upper Peninsula.', 'Gorge Falls is a beautiful natural waterfall located in Gogebic County, Michigan. Tucked away in the wilderness of the Upper Peninsula, it offers visitors a peaceful retreat into nature. The exact trail conditions vary by season, but the scenic beauty of the surrounding forest and the cascading waters make it a wonderful spot for photography and hiking.')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/4/48/2023_Employee_Photo_Contest_%2853366975236%29.jpg', 'Beautiful natural scenery near Gorge Falls', true
FROM new_waterfall;


-- Gleason Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Gleason Falls', 'Ontonagon', 'Upper Peninsula', 46.669339, -89.3360865, 'Unknown', 'Moderate', 1.0, 'Dirt/Gravel', 'Varies', 'A scenic natural waterfall in the Upper Peninsula.', 'Gleason Falls is a beautiful natural waterfall located in Ontonagon County, Michigan. Tucked away in the wilderness of the Upper Peninsula, it offers visitors a peaceful retreat into nature. The exact trail conditions vary by season, but the scenic beauty of the surrounding forest and the cascading waters make it a wonderful spot for photography and hiking.')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/4/49/Gleason_Creek_Falls_-_panoramio.jpg', 'Beautiful natural scenery near Gleason Falls', true
FROM new_waterfall;


-- Elliot Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Elliot Falls', 'Alger', 'Upper Peninsula', 46.4996337, -86.5318081, 'Unknown', 'Moderate', 1.0, 'Dirt/Gravel', 'Varies', 'A scenic natural waterfall in the Upper Peninsula.', 'Elliot Falls is a beautiful natural waterfall located in Alger County, Michigan. Tucked away in the wilderness of the Upper Peninsula, it offers visitors a peaceful retreat into nature. The exact trail conditions vary by season, but the scenic beauty of the surrounding forest and the cascading waters make it a wonderful spot for photography and hiking.')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Elliot_Falls_Miners_Beach_photo_James_Conkis_2022_11.jpg', 'Beautiful natural scenery near Elliot Falls', true
FROM new_waterfall;


-- Tobacco Falls
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('Tobacco Falls', 'Keweenaw', 'Upper Peninsula', 47.231488, -88.148897, 'Unknown', 'Moderate', 1.0, 'Dirt/Gravel', 'Varies', 'A scenic natural waterfall in the Upper Peninsula.', 'Tobacco Falls is a beautiful natural waterfall located in Keweenaw County, Michigan. Tucked away in the wilderness of the Upper Peninsula, it offers visitors a peaceful retreat into nature. The exact trail conditions vary by season, but the scenic beauty of the surrounding forest and the cascading waters make it a wonderful spot for photography and hiking.')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Tobacco_River_Park_Gay_Michigan_Upper_Peninsula.jpg', 'Beautiful natural scenery near Tobacco Falls', true
FROM new_waterfall;

COMMIT;
