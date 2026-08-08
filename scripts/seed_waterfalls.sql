-- Seed Data for UP Waterfalls

INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
VALUES 
(
    'Hungarian Falls',
    'Houghton',
    'Keweenaw Peninsula',
    '47.1912',
    '-88.4231',
    '50 ft',
    'Moderate',
    '1.5',
    'Roadside',
    'No',
    'Site of historic copper mining dams.',
    'Three distinct cascading drops over ancient red sandstone in Dover Creek.'
),
(
    'Miners Falls',
    'Alger',
    'Munising Area',
    '46.4522',
    '-86.5367',
    '50 ft',
    'Easy',
    '1.2',
    'Paved Lot',
    'NPS Pass',
    'Part of Pictured Rocks National Lakeshore.',
    'A powerful 50-foot waterfall plunging over sandstone ledges into a lush ravine near Lake Superior.'
),
(
    'Bond Falls',
    'Ontonagon',
    'Western UP',
    '46.4069',
    '-89.1307',
    '50 ft',
    'Easy',
    '0.5',
    'Paved Lot',
    'Michigan Recreation Passport',
    'Created by a dam built by the Upper Peninsula Power Company.',
    'Large 50-foot wide cascading waterfall over fractured volcanic rock with extensive wooden boardwalks.'
),
(
    'Tahquamenon Falls (Upper)',
    'Luce',
    'Eastern UP',
    '46.5746',
    '-85.2575',
    '50 ft',
    'Easy',
    '0.8',
    'Large Paved Lot',
    'Michigan Recreation Passport',
    'The amber color comes from tannins leached from cedar, spruce and hemlock swamps.',
    'One of the largest waterfalls east of the Mississippi, known for its distinctive amber colored water.'
),
(
    'Wagner Falls',
    'Alger',
    'Munising Area',
    '46.3861',
    '-86.6343',
    '20 ft',
    'Very Easy',
    '0.2',
    'Small Gravel Lot',
    'Michigan Recreation Passport',
    'A designated Michigan State Scenic Site.',
    'A picturesque, easily accessible cascade over dolomite rock formations.'
);
