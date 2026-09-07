-- Migration: Comprehensive Hiking Information & Config Upgrade for All 291 Waterfalls
BEGIN;

UPDATE waterfalls SET
  drop_height = '125 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel National Forest / Trailhead Lot',
  pass_required = 'Pictured Rocks Pass (NPS) or Free Forest Access',
  county = 'Alger',
  description = 'Jasper Falls is a scenic wilderness waterfall situated in Alger County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '38b5d4d1-bdb2-435e-9de5-bddf78d633e0';

UPDATE waterfalls SET
  drop_height = '110 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 1,
  parking_type = 'Gravel State Scenic Site Trailhead Lot on M-26',
  pass_required = 'Michigan Recreation Passport',
  county = 'Houghton',
  description = 'At 110 feet, Douglass Houghton Falls is officially recognized as Michigan''s tallest waterfall, plunging into a breathtaking volcanic ravine on Hammell Creek.',
  historical_notes = 'Named in honor of Douglass Houghton, Michigan''s first state geologist who surveyed the Keweenaw copper lodes in the 1840s.'
WHERE id = 'd603a7c9-385f-4519-aee0-1337975e0d26';

UPDATE waterfalls SET
  drop_height = '100 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 1.2,
  parking_type = 'Paved State Scenic Site Lot with Picnic Pavilions',
  pass_required = 'Michigan Recreation Passport',
  county = 'Alger',
  description = 'Laughing Whitefish Falls is one of the tallest waterfalls in Michigan, sliding 100 feet down an enormous 30-degree limestone escarpment in a graceful spreading fan.',
  historical_notes = 'Derived from the Native American name for the river mouth which resembled a whitefish.'
WHERE id = '926d0234-8962-4c36-be79-ce40cacb7588';

UPDATE waterfalls SET
  drop_height = '78 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.1,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Saxon Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'cc0b19c0-e2a4-41d1-9fb0-0d6beb577c74';

UPDATE waterfalls SET
  drop_height = '50 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.5,
  parking_type = 'Paved Visitor Center Lot',
  pass_required = 'Pictured Rocks National Lakeshore Pass (NPS)',
  county = 'Alger',
  description = 'Munising Falls cascades 50 feet down a sandstone amphitheater nestled in a serene shaded canyon right at the western gateway to Pictured Rocks.',
  historical_notes = 'Early 19th-century Munising iron blast furnace operations drew water from this river canyon.'
WHERE id = 'cf82a777-92dc-4c8c-a62b-93a10628ef99';

UPDATE waterfalls SET
  drop_height = '70 ft',
  hike_difficulty = 'Difficult',
  trail_length_miles = 9.6,
  parking_type = 'Little Beaver Lake Trailhead or Chapel Trailhead',
  pass_required = 'Pictured Rocks National Lakeshore Pass (NPS)',
  county = 'Alger',
  description = 'One of the most dramatic waterfalls in North America, Spray Falls plunges 70 vertical feet directly from the sheer Pictured Rocks sandstone cliff face into the turquoise waters of Lake Superior.',
  historical_notes = 'The 1856 steamship ''Superior'' wreck lies submerged directly beneath the falls in 20 feet of water.'
WHERE id = '7fb3998a-98fc-4861-be4a-51bf4e9c3735';

UPDATE waterfalls SET
  drop_height = '60 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 3,
  parking_type = 'Paved / Gravel Trailhead Lot (Fills Early by 8:30 AM)',
  pass_required = 'Pictured Rocks National Lakeshore Pass (NPS)',
  county = 'Alger',
  description = 'Chapel Falls plunges approximately 60 feet down a rugged sandstone canyon through towering old-growth white pines and hemlocks on Section 34 Creek, emptying into Chapel Lake.',
  historical_notes = 'Named for the nearby Chapel Rock formation, described by 17th-century French voyageurs and Henry Schoolcraft in 1820.'
WHERE id = '5618aa82-9fe5-460d-af26-361fcb612107';

UPDATE waterfalls SET
  drop_height = '60 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.1,
  parking_type = 'Paved Roadside Lot on M-26',
  pass_required = 'None (Free Public Access)',
  county = 'Keweenaw',
  description = 'Eagle River Falls roars over a 60-foot conglomerate rock dam and natural gorge directly beneath highway M-26 in the historic village of Eagle River.',
  historical_notes = 'Site of the Lake Superior Fuse Company, established in the 1860s to supply blasting fuses to Keweenaw copper mines.'
WHERE id = 'b89f02f1-69f0-47ee-9482-04c0bef56b25';

UPDATE waterfalls SET
  drop_height = '60 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.1,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Gabbro Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '405af946-276f-45b7-a41c-e1231190718f';

UPDATE waterfalls SET
  drop_height = '50 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 1.5,
  parking_type = 'Gravel Roadside Pull-off on Golf Course Rd',
  pass_required = 'None (Keweenaw Land Trust Nature Area)',
  county = 'Houghton',
  description = 'The crown jewel of Hungarian Falls, plunging 50 vertical feet over a sheer amphitheater of red sandstone ledges.',
  historical_notes = 'Protected by the Keweenaw Land Trust for public recreation and forest conservation.'
WHERE id = 'bf905ef2-70a4-421a-8879-7ab41457ac75';

UPDATE waterfalls SET
  drop_height = '50 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.5,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Superior Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'd3992fd5-c852-464a-b75a-869c7a034ce0';

UPDATE waterfalls SET
  drop_height = '48 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.8,
  parking_type = 'Large Paved State Park Lot',
  pass_required = 'Michigan Recreation Passport',
  county = 'Luce',
  description = 'Upper Tahquamenon Falls is one of the largest waterfalls east of the Mississippi River, spanning over 200 feet across and plunging nearly 50 feet. Its iconic golden-brown root-beer coloration is leached naturally from hemlock, cedar, and tamarack swamps upstream.',
  historical_notes = 'Celebrated in Henry Wadsworth Longfellow''s epic poem ''The Song of Hiawatha''. Historically used for log drives during the late 19th-century white pine timber boom.'
WHERE id = '2ab152d2-a814-478d-b01a-e88f7ea22719';

UPDATE waterfalls SET
  drop_height = '45 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.25,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Little Union Gorge Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'dee0c193-e32c-4e7a-8931-50f3a720e63e';

UPDATE waterfalls SET
  drop_height = '45 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.25,
  parking_type = 'Gravel Roadside Pull-off on County Two-Track',
  pass_required = 'None (Free Public Access)',
  county = 'Keweenaw',
  description = 'Manganese Gorge Falls is a scenic wilderness waterfall situated in Keweenaw County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'be9008a8-d854-4538-b261-31736a128682';

UPDATE waterfalls SET
  drop_height = '45 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Paved USFS Scenic Byway Lot (or Harbor Loop)',
  pass_required = 'USFS Forest Pass / Free Access',
  county = 'Ontonagon',
  description = 'The final and most dramatic waterfall on the Black River before it enters Lake Superior, plunging 45 feet into a churning froth that frequently casts vibrant rainbows.',
  historical_notes = 'Close to the historic Black River Harbor where commercial fishing tugs operated for over a century.'
WHERE id = '9768a31f-0db9-404f-bac7-af97b4dd7dfa';

UPDATE waterfalls SET
  drop_height = '39 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 1,
  parking_type = 'Paved Joseph Oravec Roadside Park Lot on M-28',
  pass_required = 'None (Free Public Access)',
  county = 'Ontonagon',
  description = 'Agate Falls is widely celebrated for its broad, terraced rock shelves where the Middle Branch Ontonagon River cascades nearly 40 feet in cascading ribbons.',
  historical_notes = 'The iron railroad trestle spanning high above the river was built in the late 19th century and is now part of the multi-use state trail system.'
WHERE id = '22ab77c2-ece7-428b-a547-17fe4a5af4db';

UPDATE waterfalls SET
  drop_height = '50 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.5,
  parking_type = 'Paved State Scenic Site Lot',
  pass_required = 'Michigan Recreation Passport',
  county = 'Ontonagon',
  description = 'Bond Falls is widely revered as one of the most picturesque cascades in the Midwest. The Middle Branch of the Ontonagon River spreads 100 feet wide across fractured volcanic basalt, tumbling over multiple shelves into a broad pool.',
  historical_notes = 'The flow is regulated by a reservoir dam built by the Upper Peninsula Power Company in 1937.'
WHERE id = 'da36e4f3-d295-4e09-a5d4-91ec4701d423';

UPDATE waterfalls SET
  drop_height = '40 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.1,
  parking_type = 'Paved Roadside Parking at The Jampot Bakery on M-26',
  pass_required = 'None (Free Public Access)',
  county = 'Keweenaw',
  description = 'Jacob''s Falls tumbles 40 feet over ragged copper-bearing basalt ledges directly beside coastal highway M-26 on the Keweenaw Peninsula.',
  historical_notes = 'Neighbor to the Society of Saint John the Theologian monastery and the beloved Jampot bakery.'
WHERE id = '29294467-23f9-42a4-9a09-4db99c84b104';

UPDATE waterfalls SET
  drop_height = '40 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 1.25,
  parking_type = 'Gravel National Forest / Trailhead Lot',
  pass_required = 'Pictured Rocks Pass (NPS) or Free Forest Access',
  county = 'Alger',
  description = 'Little Miners Falls is a scenic wilderness waterfall situated in Alger County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '4368e524-2556-4ff4-a7cf-70b40613c895';

UPDATE waterfalls SET
  drop_height = '30 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.4,
  parking_type = 'Paved USFS Scenic Byway Lot with Restrooms',
  pass_required = 'USFS Forest Pass / Free Access',
  county = 'Gogebic',
  description = 'Potawatomi Falls is one of the most majestic waterfalls on the Black River, cascading 30 feet over a 130-foot wide rock shelf into a deep wilderness canyon.',
  historical_notes = 'Named in honor of the Potawatomi Native American nation of the Great Lakes.'
WHERE id = 'c53947b5-f38f-4135-af73-558a45044edc';

UPDATE waterfalls SET
  drop_height = '40 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.25,
  parking_type = 'Gravel National Forest / Trailhead Lot',
  pass_required = 'Pictured Rocks Pass (NPS) or Free Forest Access',
  county = 'Alger',
  description = 'Tannery Falls is a scenic wilderness waterfall situated in Alger County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '08ebbfc4-84b9-4bfb-9ffb-790b176abed8';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.05,
  parking_type = 'Paved County Park Lot with Restrooms',
  pass_required = 'None (Free Public Access)',
  county = 'Keweenaw',
  description = 'Haven Falls is a charming 20-foot cascade tumbling over layered volcanic basalt rock directly inside Haven Park in Lac La Belle.',
  historical_notes = 'Located near the historic 19th-century Mendota copper ship canal.'
WHERE id = 'a0c6ce11-71b0-406c-a3bc-3d0c46071725';

UPDATE waterfalls SET
  drop_height = '90 ft',
  hike_difficulty = 'Difficult',
  trail_length_miles = 1.5,
  parking_type = 'Gravel Trailhead Lot off Forestville Rd',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Dead River Falls is a thrilling series of cascading waterfalls dropping more than 90 feet through a rugged rocky canyon just north of Marquette.',
  historical_notes = 'Hydroelectric power plants have operated along the Dead River since the early 1900s.'
WHERE id = '49452338-6e6e-4bbd-9967-bcd60642131b';

UPDATE waterfalls SET
  drop_height = '50 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 1.2,
  parking_type = 'Paved Trailhead Lot with Restrooms',
  pass_required = 'Pictured Rocks National Lakeshore Pass (NPS)',
  county = 'Alger',
  description = 'Miners Falls plunges 50 feet over a dramatic sheer sandstone outcrop of the Munising formation. The rushing Miners River cuts a deep, hemlock-shaded gorge below the falls.',
  historical_notes = 'Part of Pictured Rocks National Lakeshore, established in 1966 as America''s first national lakeshore.'
WHERE id = '78a26f63-e56c-4648-a3d6-250f61593596';

UPDATE waterfalls SET
  drop_height = '75 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.6,
  parking_type = 'Paved National Park Lot with Picnic Area',
  pass_required = 'Pictured Rocks National Lakeshore Pass (NPS)',
  county = 'Alger',
  description = 'Sable Falls tumbles 75 feet in a series of foaming steps over Munising and Jacobsville sandstone formations, bordered by towering red pines and dune bluffs near Grand Marais.',
  historical_notes = 'Located at the foot of the colossal Grand Sable Dunes, which rise over 300 feet above Lake Superior.'
WHERE id = 'fcd86b67-70a7-4c02-8225-e4eb1944e694';

UPDATE waterfalls SET
  drop_height = '35 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.5,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Upper Dead River Falls #1 is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'b11f37b0-f9b2-40ad-abf4-2959c018ac59';

UPDATE waterfalls SET
  drop_height = '35 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.5,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Upper Dead River Falls #2 is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '77dbca55-5eda-46e7-b897-6321d41358f8';

UPDATE waterfalls SET
  drop_height = '35 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.5,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Upper Dead River Falls #3 is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '22f1a8f3-d170-46e7-9ab8-807fb1da54db';

UPDATE waterfalls SET
  drop_height = '35 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.5,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Upper Dead River Falls #4 is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '0cc1aea4-8bf5-40f5-a6d9-2645bd3b159d';

UPDATE waterfalls SET
  drop_height = '35 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.5,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Upper Dead River Falls #5 is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '25e8ddc9-7ac7-446b-8316-659b9a96752d';

UPDATE waterfalls SET
  drop_height = '30 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.25,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Alder Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '146d68b1-e772-4804-8150-b87510054b9b';

UPDATE waterfalls SET
  drop_height = '30 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Paved USFS Scenic Byway Lot',
  pass_required = 'USFS Forest Pass / Free Access',
  county = 'Gogebic',
  description = 'The Black River is divided into two roaring channels by an enormous outcrop of ancient puddingstone conglomerate rock, plunging 30 feet into the gorge.',
  historical_notes = 'Part of the Ottawa National Forest Black River National Forest Scenic Byway.'
WHERE id = '27d5be10-9954-4bf4-96da-c17a27be8a80';

UPDATE waterfalls SET
  drop_height = '30 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.25,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Kakabika Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '01f3bdf2-2b3b-4acf-bd9b-e405a8148dce';

UPDATE waterfalls SET
  drop_height = '30 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.5,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Lower Canyon Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '42a1462b-7da0-4ae4-940c-2c0357cedc50';

UPDATE waterfalls SET
  drop_height = '30 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.5,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Middle Canyon Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'de9c01fa-fe27-4ced-acbd-68f51bd3a8dd';

UPDATE waterfalls SET
  drop_height = '30 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.1,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Powder Horn Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'bf3b608b-2429-43a2-a79d-8a72613340cc';

UPDATE waterfalls SET
  drop_height = '30 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.01,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Reany Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '61c61fb6-4c2a-41bd-ac41-9dfac9dc9cc1';

UPDATE waterfalls SET
  drop_height = '25 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.3,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Interstate Falls (Montreal Falls) is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '210dae4c-957c-4070-9b55-79a0651f9dd1';

UPDATE waterfalls SET
  drop_height = '15 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.7,
  parking_type = 'Paved State Park Lot',
  pass_required = 'Michigan Recreation Passport',
  county = 'Gogebic',
  description = 'A wide, foaming 15-foot cascade on the Presque Isle River tumbling over fractured Nonesuch shale ledges.',
  historical_notes = 'Manido translates to ''Spirit'' in the Ojibwe language.'
WHERE id = 'b5a816e7-a9fe-4e28-bf1d-30545ff3ec2f';

UPDATE waterfalls SET
  drop_height = '25 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 1.4,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Ontonagon',
  description = 'O Kun de Kun Falls is a scenic wilderness waterfall situated in Ontonagon County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '4e34904d-ccaa-486c-aaaf-826bce2ceb55';

UPDATE waterfalls SET
  drop_height = '15 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.6,
  parking_type = 'Paved USFS Scenic Byway Lot',
  pass_required = 'USFS Forest Pass / Free Access',
  county = 'Gogebic',
  description = 'A wide, terraced waterfall tumbling over a series of ancient red sandstone steps on the lower Black River.',
  historical_notes = 'Named for the distinct sandstone formations that characterize the bedrock geology near Lake Superior.'
WHERE id = 'fe8ac0ba-b534-4b3e-99ee-c5c6477d3038';

UPDATE waterfalls SET
  drop_height = '30 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 1.5,
  parking_type = 'Gravel USFS Trailhead Lot on Forest Road 2270',
  pass_required = 'USFS Forest Pass / Free Access',
  county = 'Houghton',
  description = 'Sturgeon Falls roars with tremendous power, plunging 30 feet into a volcanic basalt chasm inside Michigan''s deepest river canyon.',
  historical_notes = 'Located in the heart of the federally designated 14,000-acre Sturgeon River Gorge Wilderness.'
WHERE id = '1c288e5a-a4b1-4882-af68-450bde588974';

UPDATE waterfalls SET
  drop_height = '34 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.5,
  parking_type = 'Paved USFS Scenic Byway Lot',
  pass_required = 'USFS Forest Pass / Free Access',
  county = 'Gogebic',
  description = 'Located just downstream from Potawatomi Falls, Gorge Falls funnels the Black River through an extremely narrow 20-foot conglomerate rock canyon in a thunderous 34-foot plunge.',
  historical_notes = 'Formed along the ancient Midcontinent Rift volcanic zone over one billion years ago.'
WHERE id = 'd326788e-c027-4b39-8616-1fad3bac4c7b';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 2,
  parking_type = 'Forest Two-Track Turnout off Chicagon Mine Rd',
  pass_required = 'None (Ottawa National Forest / Free)',
  county = 'Iron',
  description = 'Chicagon Falls is a hidden 20-foot woodland cascade tumbling over bedrock ledges on Chicagon Creek in southern Iron County.',
  historical_notes = 'Near the historic Chicagon Mine which operated during Iron County''s hematite iron ore boom.'
WHERE id = '49381d34-00c8-4325-971e-7921c3739f23';

UPDATE waterfalls SET
  drop_height = '15 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.1,
  parking_type = 'Paved Highway Turnout on M-28',
  pass_required = 'None (Free Public Access)',
  county = 'Alger',
  description = 'Alger Falls is a multi-tiered roadside cascade dropping about 15 feet over moss-covered sandstone steps right beside Michigan Route 28.',
  historical_notes = 'One of the most photographed drive-by waterfalls in Michigan since the opening of the state trunkline in the 1920s.'
WHERE id = '2181f2b7-d639-46df-abca-09db2f012855';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.1,
  parking_type = 'Gravel National Forest / Trailhead Lot',
  pass_required = 'Pictured Rocks Pass (NPS) or Free Forest Access',
  county = 'Alger',
  description = 'Horseshoe Falls is a scenic wilderness waterfall situated in Alger County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'ce80985c-31d7-409d-9256-99542d798eb7';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 5,
  parking_type = 'Gravel Roadside Pull-off on County Two-Track',
  pass_required = 'None (Free Public Access)',
  county = 'Keweenaw',
  description = 'Lower Montreal Falls is a scenic wilderness waterfall situated in Keweenaw County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'de018d3a-e31a-44c4-a72f-fc2d19323999';

UPDATE waterfalls SET
  drop_height = '25 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.5,
  parking_type = 'Paved Porcupine Mountains State Park Lot',
  pass_required = 'Michigan Recreation Passport',
  county = 'Ontonagon',
  description = 'The largest and lowest drop on the Presque Isle River, Manabezho Falls spans 150 feet wide, dropping 25 feet over terraced shale bedrock into a foamy pool.',
  historical_notes = 'Named after Manabozho, the Great Hare spirit of Ojibwe mythology.'
WHERE id = 'b00b2bfa-6c37-4fce-ab53-0a52f24cf723';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 1,
  parking_type = 'Gravel Roadside Pull-off',
  pass_required = 'None (Free Public Access)',
  county = 'Houghton',
  description = 'A wide 20-foot stepped cascade spilling over several ledges of red Jacobsville sandstone.',
  historical_notes = 'Part of the historic Dover Creek copper mill water supply system.'
WHERE id = '2c5540bb-63e7-4507-a07d-658ed49d10ff';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Power House Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '778a6058-b0d2-473b-ba6c-3a44399a0dc0';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 1,
  parking_type = 'Gravel National Forest / Trailhead Lot',
  pass_required = 'Pictured Rocks Pass (NPS) or Free Forest Access',
  county = 'Alger',
  description = 'Rock River Falls is a scenic wilderness waterfall situated in Alger County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '7997cb8a-fe71-4203-b33e-53178772ed96';

UPDATE waterfalls SET
  drop_height = '15 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.6,
  parking_type = 'Paved USFS Scenic Byway Lot',
  pass_required = 'USFS Forest Pass / Free Access',
  county = 'Gogebic',
  description = 'A wide, terraced waterfall tumbling over a series of ancient red sandstone steps on the lower Black River.',
  historical_notes = 'Named for the distinct sandstone formations that characterize the bedrock geology near Lake Superior.'
WHERE id = 'dd9f9725-bfdd-4885-bc2f-31b8d92e8469';

UPDATE waterfalls SET
  drop_height = '15 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.6,
  parking_type = 'Paved USFS Scenic Byway Lot',
  pass_required = 'USFS Forest Pass / Free Access',
  county = 'Gogebic',
  description = 'A wide, terraced waterfall tumbling over a series of ancient red sandstone steps on the lower Black River.',
  historical_notes = 'Named for the distinct sandstone formations that characterize the bedrock geology near Lake Superior.'
WHERE id = '8daa2e2c-e648-48ac-9a6a-e04b68c6be96';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.5,
  parking_type = 'Gravel Roadside Pull-off',
  pass_required = 'None (Free Public Access)',
  county = 'Houghton',
  description = 'Upper Hungarian Falls cascades 20 feet over the spillway and natural rock of the historic 19th-century reservoir dam.',
  historical_notes = 'Built to supply water to the Hungarian stamp mill operations.'
WHERE id = 'bc13e687-14f7-4380-9bd8-593663afa92b';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.15,
  parking_type = 'Gravel National Forest / Trailhead Lot',
  pass_required = 'Pictured Rocks Pass (NPS) or Free Forest Access',
  county = 'Alger',
  description = 'Upper Wagner Falls 1 is a scenic wilderness waterfall situated in Alger County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '48349438-f77f-4e36-bca3-e74ab3db668c';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.15,
  parking_type = 'Gravel National Forest / Trailhead Lot',
  pass_required = 'Pictured Rocks Pass (NPS) or Free Forest Access',
  county = 'Alger',
  description = 'Upper Wagner Falls 2 is a scenic wilderness waterfall situated in Alger County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '6e51160e-243b-4423-ac78-63b138dbbc20';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.2,
  parking_type = 'Gravel State Scenic Site Lot on M-94',
  pass_required = 'Michigan Recreation Passport',
  county = 'Alger',
  description = 'Wagner Falls is a peaceful, picturesque cascade sheltered beneath an old-growth hemlock and cedar forest. Wagner Creek tumbles over stepped limestone ledges to join the Anna River.',
  historical_notes = 'Protected as a designated State Scenic Site by the Michigan DNR since 1956.'
WHERE id = '88e9a73f-9e5b-444c-a687-3e6915523d91';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.1,
  parking_type = 'Paved Roadside Pull-off on M-35 near Palmer',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Warner Falls drops 20 feet in two tiers over rugged granite and quartzite bedrock on Warner Creek in the iron mining hills.',
  historical_notes = 'Situated in the historic Marquette Iron Range, mined continuously since the 1850s.'
WHERE id = '4d721036-5878-4ed7-96a7-f8af07db9d14';

UPDATE waterfalls SET
  drop_height = '30 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 1.8,
  parking_type = 'Paved MDOT Roadside Park Lot on US-41',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Canyon Falls thunders 30 feet through a dramatic box canyon carved into dark Precambrian slate along the Sturgeon River.',
  historical_notes = 'Known among voyageurs and geologists as one of the deepest river canyons in the Upper Peninsula.'
WHERE id = '30cbe235-452e-4298-af64-30255cc4ec63';

UPDATE waterfalls SET
  drop_height = '15 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 1,
  parking_type = 'Paved State Park Lot',
  pass_required = 'Michigan Recreation Passport',
  county = 'Luce',
  description = 'Located 4 miles downstream from the Upper Falls, the Lower Falls comprise five distinctive cascades rippling around a central forested island in the amber Tahquamenon River.',
  historical_notes = 'Native Ojibwe used the lower river rapids for seasonal sturgeon fishing and portage routes.'
WHERE id = '8664d95b-2df6-4813-9439-404102b86e31';

UPDATE waterfalls SET
  drop_height = '15 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.5,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Nelson Canyon Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '54ca3c00-7018-4f49-b0e5-59cc9e803dea';

UPDATE waterfalls SET
  drop_height = '15 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Yondota Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '0fd6e446-bff7-4c8b-958a-e6b5924ce786';

UPDATE waterfalls SET
  drop_height = '13 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.1,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Ontonagon',
  description = 'Bonanza Falls is a scenic wilderness waterfall situated in Ontonagon County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '11072841-6de7-4793-bdb4-b3b0fc6eb847';

UPDATE waterfalls SET
  drop_height = '13 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.4,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Lower Falls River Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '9bc3ade8-4072-4f05-a25a-c8eb2327c9c4';

UPDATE waterfalls SET
  drop_height = '12 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.5,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Lower Dead River Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '1d0f56df-cfa4-4b31-a0c6-584b1a3530a8';

UPDATE waterfalls SET
  drop_height = '12 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.75,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Ontonagon',
  description = 'Nonesuch Falls is a scenic wilderness waterfall situated in Ontonagon County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'a07afb41-1f8f-4036-952b-7a748136b292';

UPDATE waterfalls SET
  drop_height = '12 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.4,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Unnamed Falls River Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '37520742-198a-451e-a581-a3900e63d474';

UPDATE waterfalls SET
  drop_height = '10 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.25,
  parking_type = 'Gravel National Forest / Trailhead Lot',
  pass_required = 'Pictured Rocks Pass (NPS) or Free Forest Access',
  county = 'Alger',
  description = 'Au Train Falls is a scenic wilderness waterfall situated in Alger County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '1f527517-3e39-489e-aea7-8f54052e05f7';

UPDATE waterfalls SET
  drop_height = '10 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 3,
  parking_type = 'Gravel National Forest / Trailhead Lot',
  pass_required = 'Pictured Rocks Pass (NPS) or Free Forest Access',
  county = 'Alger',
  description = 'Chapel Beach Falls is a scenic wilderness waterfall situated in Alger County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'ac665e50-c52a-410a-8a06-cdba4b5b400f';

UPDATE waterfalls SET
  drop_height = '10 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.1,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Ogemaw Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '6cb6af6d-8971-4556-96b8-1c6454a5f99c';

UPDATE waterfalls SET
  drop_height = '10 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.05,
  parking_type = 'Paved Roadside Park Turnout on M-28',
  pass_required = 'None (Free Public Access)',
  county = 'Alger',
  description = 'Scott Falls drops delicately over a 10-foot undercut sandstone overhang into a small pool. Visitors can easily step behind the cascading curtain of water.',
  historical_notes = 'Named after early lumberman and surveyor Scott who mapped the Lake Superior shoreline.'
WHERE id = '05a0a9ef-bf55-4e40-ab89-2f39479c5a7f';

UPDATE waterfalls SET
  drop_height = '10 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.1,
  parking_type = 'Gravel Roadside Pull-off on County Two-Track',
  pass_required = 'None (Free Public Access)',
  county = 'Keweenaw',
  description = 'Silver River Falls is a scenic wilderness waterfall situated in Keweenaw County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'af03b2a5-7399-406d-84b1-82fc74a725cd';

UPDATE waterfalls SET
  drop_height = '10 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 1.4,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Ontonagon',
  description = 'Upper O Kun de Kun Falls is a scenic wilderness waterfall situated in Ontonagon County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '508f7886-cee3-45ff-baeb-250e9ce7c4cc';

UPDATE waterfalls SET
  drop_height = '10 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.2,
  parking_type = 'Gravel Roadside Pull-off on County Two-Track',
  pass_required = 'None (Free Public Access)',
  county = 'Houghton',
  description = 'Wyandote Falls is a scenic wilderness waterfall situated in Houghton County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'f2b0b2d3-5c40-4674-8fe6-ef00251c2062';

UPDATE waterfalls SET
  drop_height = '15 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 3,
  parking_type = 'Chapel / Mosquito Trailhead Lot',
  pass_required = 'Pictured Rocks National Lakeshore Pass (NPS)',
  county = 'Alger',
  description = 'Mosquito Falls drops over two picturesque shelves of ancient Munising sandstone along the Mosquito River, surrounded by cedar and birch groves.',
  historical_notes = 'The Mosquito River basin was logged in the late 19th century; old cedar log ties can still be spotted in the riverbanks.'
WHERE id = 'b885b4cf-7db6-45eb-a97f-c4a706923b1e';

UPDATE waterfalls SET
  drop_height = '6 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.75,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Ontonagon',
  description = 'Greenstone Falls is a scenic wilderness waterfall situated in Ontonagon County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'c2f3c031-13d8-4d26-bd23-e00ade219c56';

UPDATE waterfalls SET
  drop_height = '10 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.2,
  parking_type = 'Gravel County Park Lot off US-41',
  pass_required = 'None (Free Public Access)',
  county = 'Delta',
  description = 'A wide, gentle series of stepping-stone falls where the Rapid River flows across smooth horizontal limestone bedrock shelves.',
  historical_notes = 'Designated as Rapid River Falls County Park, a popular local swimming and picnic destination.'
WHERE id = '06ebf7f5-be56-4498-883d-b8af0a1ffdaa';

UPDATE waterfalls SET
  drop_height = '5 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.5,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Middle Carp River Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '621a941f-eda5-46c8-80b0-9849a8f652e3';

UPDATE waterfalls SET
  drop_height = '4 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.5,
  parking_type = 'Gravel Roadside Pull-off on County Two-Track',
  pass_required = 'None (Free Public Access)',
  county = 'Keweenaw',
  description = 'Arnold Mine Falls is a scenic wilderness waterfall situated in Keweenaw County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '0ad1484e-cf6e-4316-a48b-bfe1d226ea01';

UPDATE waterfalls SET
  drop_height = '4 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.5,
  parking_type = 'Gravel Forest Road Pull-off',
  pass_required = 'None (Free Public Access)',
  county = 'Iron',
  description = 'Duppy Falls is a scenic wilderness waterfall situated in Iron County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '437d6456-b484-4351-981e-2f6f4cf9d095';

UPDATE waterfalls SET
  drop_height = '4 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 1.15,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Tibbets Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'ab06767f-eb09-4c39-86cc-4ee14afdd207';

UPDATE waterfalls SET
  drop_height = '4 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 1,
  parking_type = 'Gravel National Forest / Trailhead Lot',
  pass_required = 'Pictured Rocks Pass (NPS) or Free Forest Access',
  county = 'Alger',
  description = 'Whitefish Falls is a scenic wilderness waterfall situated in Alger County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '83d1ec61-4b65-419a-a4b6-92dce4bd7066';

UPDATE waterfalls SET
  drop_height = '3 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Roadside Pull-off on County Two-Track',
  pass_required = 'None (Free Public Access)',
  county = 'Keweenaw',
  description = 'Tobacco Falls is a scenic wilderness waterfall situated in Keweenaw County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'ab4cb630-2723-42e3-abf8-8e6b9a414b78';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.5,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Hike: 0.5 miles. Difficulty: moderate. ',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'ddeca4e7-2c5d-4780-a262-d1e26062dab9';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.02,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Hike: 0.02 miles. Difficulty: easy. ',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '3a70a7b6-55e0-44ed-b224-b6d23c19cb4a';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.25,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Hike: 0.25 miles. Difficulty: easy. ',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '5cbe572f-b9ce-4f53-9c0a-61ff59e43fed';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.1,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Hike: 0.1 miles. Difficulty: easy. ',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '928b1fa9-c0e6-4149-a126-f6e6a03c4259';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 5,
  parking_type = 'Gravel Roadside Pull-off on County Two-Track',
  pass_required = 'None (Free Public Access)',
  county = 'Keweenaw',
  description = 'Hike: 5 miles. Difficulty: moderate. ',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '17f30e96-ae7a-4dca-b6b0-e5b519742128';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.1,
  parking_type = 'Gravel National Forest / Trailhead Lot',
  pass_required = 'Pictured Rocks Pass (NPS) or Free Forest Access',
  county = 'Alger',
  description = 'Hike: 0.1 miles. Difficulty: easy. ',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'ff18d202-0c2f-4e24-9509-42245c0a4c3d';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.5,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Hike: 0.5 miles. Difficulty: moderate. ',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '126f80b9-e519-4085-809e-d3083e22b773';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Difficult',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Difficulty: difficult. ',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '5f4e1f9e-0c71-408b-8580-e97f7cf82cf0';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.25,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Hike: 0.25 miles. Difficulty: moderate. ',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'bdaf855f-8888-4284-a67c-5076985b0264';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.25,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Hike: 0.25 miles. Difficulty: moderate. ',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'a7a2834d-e7dc-4f4a-bde0-9a2c2aa0b4d0';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.02,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Hike: 0.02 miles. Difficulty: easy. ',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'ee9a64b9-bfc9-400c-9802-0e95e667f17a';

UPDATE waterfalls SET
  drop_height = '140 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel National Forest / Trailhead Lot',
  pass_required = 'Pictured Rocks Pass (NPS) or Free Forest Access',
  county = 'Alger',
  description = 'Bridal Veil Falls is a scenic wilderness waterfall situated in Alger County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '80e758c4-4a34-462e-ab4a-0388566004a2';

UPDATE waterfalls SET
  drop_height = '80 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Eighty Foot Falls (Ives Falls) is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '493931ea-9eb3-48fe-9b3a-96b8c20b3b2d';

UPDATE waterfalls SET
  drop_height = '70 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Plumbago Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'b9722e61-5264-4816-9a00-a7fb13898ba4';

UPDATE waterfalls SET
  drop_height = '60 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Rocking Chair Lakes Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'f3885980-744d-4a25-9db9-f8a0922c1286';

UPDATE waterfalls SET
  drop_height = '42 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'West Branch Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '767ad250-74d3-4470-8089-c41b4d311574';

UPDATE waterfalls SET
  drop_height = '40 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Forty Foot Falls (Cliff Falls) is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '5ceb996d-0a41-47d4-aba5-c191489b4d5a';

UPDATE waterfalls SET
  drop_height = '40 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Ontonagon',
  description = 'Little Trap Falls is a scenic wilderness waterfall situated in Ontonagon County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '795640a6-0a1a-4f87-8352-30a2e469c5c0';

UPDATE waterfalls SET
  drop_height = '40 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Roadside Pull-off on County Two-Track',
  pass_required = 'None (Free Public Access)',
  county = 'Keweenaw',
  description = 'Lower Gratiot Falls is a scenic wilderness waterfall situated in Keweenaw County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'e5ba2845-da60-4281-bfc3-6cce25878e86';

UPDATE waterfalls SET
  drop_height = '40 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel National Forest / Trailhead Lot',
  pass_required = 'Pictured Rocks Pass (NPS) or Free Forest Access',
  county = 'Alger',
  description = 'Memorial Falls (MNA) is a scenic wilderness waterfall situated in Alger County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '6b36ac3f-d7ce-4091-bd5a-a2fc3ba99d7e';

UPDATE waterfalls SET
  drop_height = '35 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Schweitzer Falls (upper) is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '4b01e448-111b-402a-a3bf-a6147578e57b';

UPDATE waterfalls SET
  drop_height = '30 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel National Forest / Trailhead Lot',
  pass_required = 'Pictured Rocks Pass (NPS) or Free Forest Access',
  county = 'Alger',
  description = 'Potato Patch Falls is a scenic wilderness waterfall situated in Alger County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '74726f11-0f2b-416d-8214-3fde4bef8a08';

UPDATE waterfalls SET
  drop_height = '30 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel National Forest / Trailhead Lot',
  pass_required = 'Pictured Rocks Pass (NPS) or Free Forest Access',
  county = 'Alger',
  description = 'Silver Bell Falls is a scenic wilderness waterfall situated in Alger County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '4a37ac5b-eff9-4db3-ad68-fdb2519654fa';

UPDATE waterfalls SET
  drop_height = '25 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Judson Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '08424ec9-ff26-431b-b027-cba07d13b615';

UPDATE waterfalls SET
  drop_height = '25 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Manakiki Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '6b6da8ee-b90b-4c7c-9a55-36a8dee0dcdc';

UPDATE waterfalls SET
  drop_height = '25 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Middle Falls River Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'd43dcc3b-70fd-4f03-9ff9-712be614f7b4';

UPDATE waterfalls SET
  drop_height = '25 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Montreal Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'b9fb03ab-7b78-428f-bd62-ac024119754b';

UPDATE waterfalls SET
  drop_height = '25 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Roadside Pull-off on County Two-Track',
  pass_required = 'None (Free Public Access)',
  county = 'Houghton',
  description = 'Ripley Falls is a scenic wilderness waterfall situated in Houghton County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '6f742e8c-2726-4af6-8ea6-fba7b618e310';

UPDATE waterfalls SET
  drop_height = '25 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Slate River Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'dd0595dd-e79e-4204-a904-9d7528f2fae0';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Big Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '9b59a965-369e-4d0d-8154-dcfe59b0b5c6';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Black River Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'a729a7b6-8570-4c24-83f7-3850f720efaf';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Roadside Pull-off on County Two-Track',
  pass_required = 'None (Free Public Access)',
  county = 'Keweenaw',
  description = 'Copper Falls is a scenic wilderness waterfall situated in Keweenaw County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '0ace99d8-0bdc-40ed-bc36-b07d4108ada5';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Daults Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '2edaefae-9522-4da3-a96f-3deee520b2a4';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 1.5,
  parking_type = 'Dirt Shoulder Pull-off on M-553 or CR 480',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Morgan Falls is a secluded 20-foot cascade tucked away in a hemlock ravine where Morgan Creek joins the Carp River near Marquette.',
  historical_notes = 'Part of the extensive Marquette multi-use trail system.'
WHERE id = '7fcdf4e3-7010-41fb-b8e2-811a9906cf31';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 2,
  parking_type = 'Gravel Forest Road Pull-off on County Road 510',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Yellow Dog Falls is a wilderness cascade dropping 20 feet around a massive granite boulder in the heart of the Yellow Dog Plains.',
  historical_notes = 'The Yellow Dog River is federally designated as a National Wild and Scenic River for its pristine wilderness qualities.'
WHERE id = '9e15a7c5-8573-4c26-8c63-ac6498830d0b';

UPDATE waterfalls SET
  drop_height = '17 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Shining Cloud Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '623ffe40-c476-47cb-9b64-c0767e11443d';

UPDATE waterfalls SET
  drop_height = '15 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Abinodji Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'd0564ece-dee1-4327-ba81-e508b77ac562';

UPDATE waterfalls SET
  drop_height = '15 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Ajibikika Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '2eb106a8-9259-4a39-9564-4f0edafa1258';

UPDATE waterfalls SET
  drop_height = '15 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Bull Dog Falls #1 is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '5ee2f18e-04a4-4e40-9d71-1c4cabb56fab';

UPDATE waterfalls SET
  drop_height = '15 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Roadside Pull-off on County Two-Track',
  pass_required = 'None (Free Public Access)',
  county = 'Houghton',
  description = 'Gooseneck Creek Falls is a scenic wilderness waterfall situated in Houghton County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'ddc93103-d929-465a-b58f-4dfc51c6ea51';

UPDATE waterfalls SET
  drop_height = '15 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.9,
  parking_type = 'Paved State Park Lot',
  pass_required = 'Michigan Recreation Passport',
  county = 'Gogebic',
  description = 'A wide, powerful 15-foot step waterfall over dark shale on the Presque Isle River in the Porcupine Mountains Wilderness.',
  historical_notes = 'Named after Nawadaha, the sweet singer and musician of Ojibwe lore.'
WHERE id = '43097673-73c6-45cf-a169-001240128d58';

UPDATE waterfalls SET
  drop_height = '15 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Ontonagon',
  description = 'Nimikon Falls is a scenic wilderness waterfall situated in Ontonagon County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'ec00659b-f7ac-418d-991c-eb9d24fc870b';

UPDATE waterfalls SET
  drop_height = '15 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Ogimakwe Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'd11d8afb-2f8c-440e-a0ac-21564d82c37c';

UPDATE waterfalls SET
  drop_height = '15 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Peterson Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'a2f73fbd-a3cc-43a3-ab46-242bbfd0f3ae';

UPDATE waterfalls SET
  drop_height = '15 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Peterson Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '5be32ab0-6e99-4012-8c1b-f21d6d8f23ef';

UPDATE waterfalls SET
  drop_height = '15 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Roadside Pull-off on County Two-Track',
  pass_required = 'None (Free Public Access)',
  county = 'Keweenaw',
  description = 'Upper Gratiot Falls is a scenic wilderness waterfall situated in Keweenaw County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '3c695af2-4cf4-4584-9d9b-7a4f6b320c62';

UPDATE waterfalls SET
  drop_height = '12 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Explorers Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '634e5684-d375-406b-9a50-635280831846';

UPDATE waterfalls SET
  drop_height = '10 ft',
  hike_difficulty = 'Easy',
  trail_length_miles = 0.2,
  parking_type = 'Gravel County Park Lot off US-41',
  pass_required = 'None (Free Public Access)',
  county = 'Ontonagon',
  description = 'A wide, gentle series of stepping-stone falls where the Rapid River flows across smooth horizontal limestone bedrock shelves.',
  historical_notes = 'Designated as Rapid River Falls County Park, a popular local swimming and picnic destination.'
WHERE id = '6ba331f5-e170-4da0-adfb-2b196bd8128f';

UPDATE waterfalls SET
  drop_height = '12 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Upper Falls River Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '1dec96fa-058c-4e1f-ba21-8e84f2624cf9';

UPDATE waterfalls SET
  drop_height = '12 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'White City Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '444f2529-e475-4238-8da1-0432dbb3c684';

UPDATE waterfalls SET
  drop_height = '10 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel National Forest / Trailhead Lot',
  pass_required = 'Pictured Rocks Pass (NPS) or Free Forest Access',
  county = 'Alger',
  description = 'Carpenter Creek Falls is a scenic wilderness waterfall situated in Alger County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '3690bfe9-be57-4305-bcf7-323078a6ca1d';

UPDATE waterfalls SET
  drop_height = '10 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Chippewa Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '2e0c2a5b-c359-4e38-8a11-769c20b4d361';

UPDATE waterfalls SET
  drop_height = '10 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Roadside Pull-off on County Two-Track',
  pass_required = 'None (Free Public Access)',
  county = 'Keweenaw',
  description = 'Eister Falls is a scenic wilderness waterfall situated in Keweenaw County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '8ac3a47b-89f9-4a92-b2c3-1becb1f61ee8';

UPDATE waterfalls SET
  drop_height = '10 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Gomanche falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'a84fb54c-8ae7-4185-a8d0-eef02c3c9575';

UPDATE waterfalls SET
  drop_height = '10 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Marshall Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '052a854a-9714-4238-8777-6d3e57780d71';

UPDATE waterfalls SET
  drop_height = '10 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Ogima Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'cbf02035-d883-4ee6-8345-f747084599ec';

UPDATE waterfalls SET
  drop_height = '10 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Pinkerton Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '1d9cc721-74b1-43c1-b2c8-acb74cf38a51';

UPDATE waterfalls SET
  drop_height = '10 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Roadside Pull-off on County Two-Track',
  pass_required = 'None (Free Public Access)',
  county = 'Keweenaw',
  description = 'Ten Foot falls is a scenic wilderness waterfall situated in Keweenaw County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '97bbbd40-a832-4120-aaf6-8210c1a24cf7';

UPDATE waterfalls SET
  drop_height = '10 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Tioga Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '17eb523e-ba7a-49b4-83ea-e449f11f567a';

UPDATE waterfalls SET
  drop_height = '10 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Tioga Falls (Upper) is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'd9c4e123-6a53-419c-9e29-2ce85e4916ee';

UPDATE waterfalls SET
  drop_height = '9 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Roadside Pull-off on County Two-Track',
  pass_required = 'None (Free Public Access)',
  county = 'Keweenaw',
  description = 'Fenner Falls is a scenic wilderness waterfall situated in Keweenaw County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '4d20a079-4465-4bae-9fdb-ea6f98342d6c';

UPDATE waterfalls SET
  drop_height = '8 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Bathtub Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '97f5912a-46f1-42ee-8bd5-33e3017e6a6d';

UPDATE waterfalls SET
  drop_height = '25 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 2.6,
  parking_type = 'Gravel County Park Lot',
  pass_required = 'None (Free Public Access)',
  county = 'Dickinson',
  description = 'Piers Gorge features the most powerful Class IV whitewater cascades in the Midwest. The mighty Menominee River surges through a deep cedar-lined cedar gorge.',
  historical_notes = 'Site of historic 19th-century Menominee River log jams where lumberjacks dynamited timber jams.'
WHERE id = '480328b4-7018-4d3a-9fed-c5ac18be40da';

UPDATE waterfalls SET
  drop_height = '8 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Quartzite Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'e02db9f1-592d-4bb8-bceb-82ba550fbdb1';

UPDATE waterfalls SET
  drop_height = '8 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Root Beer Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'de98f9a0-6074-409b-a314-42bae4ae9952';

UPDATE waterfalls SET
  drop_height = '8 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Unnamed Ravine River Rd Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '5089fb2f-4516-41ca-ba1e-818767407229';

UPDATE waterfalls SET
  drop_height = '8 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Upper Carp River Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'ce4bbbbe-99ba-4827-8ef8-1387b99b017f';

UPDATE waterfalls SET
  drop_height = '7 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Big Garlic River Falls (Higher) is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '1e7f4623-0b19-42e9-bd88-b0af9e5e8127';

UPDATE waterfalls SET
  drop_height = '7 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Big Pup Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '29097c41-8f11-48ab-b948-7ebe54c240fa';

UPDATE waterfalls SET
  drop_height = '7 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Upper Rocky Forty Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '015c5adf-625f-4089-81e0-0098feaefee8';

UPDATE waterfalls SET
  drop_height = '6 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Dee Lundeen Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '942b8efa-e414-4dff-afbe-a6ef34a2cfc5';

UPDATE waterfalls SET
  drop_height = '6 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Harley Falls #1 is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '677041e5-cfa4-4cdd-8755-c2e8528f0ff2';

UPDATE waterfalls SET
  drop_height = '6 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Iagoo Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'c5b944e6-d4b0-451d-85a8-89165230cf3f';

UPDATE waterfalls SET
  drop_height = '6 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Middle Silver River Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'f3047a2e-3463-43d6-b4d2-49214d5452dd';

UPDATE waterfalls SET
  drop_height = '6 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Morgan Meadows Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'af7f8437-ede0-4cf1-ae68-8c74b06c0620';

UPDATE waterfalls SET
  drop_height = '6 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Traders Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '4ff0bfe3-1f3f-4fc5-8edc-26e6cd6c6c9b';

UPDATE waterfalls SET
  drop_height = '6 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Trappers Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'ae0550e3-8b6d-4207-8b1e-4530ec503247';

UPDATE waterfalls SET
  drop_height = '5 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Lower Carp River Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'ee296295-ed3c-4b80-9fc0-9f4bf10f53b5';

UPDATE waterfalls SET
  drop_height = '5 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Lower Craig''s Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'd76f8135-fc49-40c4-88d9-5c8b6b66e9a5';

UPDATE waterfalls SET
  drop_height = '5 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Overlooked Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '4a4809f4-d75f-4a92-8a5b-39c7f9ab91ac';

UPDATE waterfalls SET
  drop_height = '4 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Black Slate Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '6cf7853d-103d-4948-8b5c-0f56387b5755';

UPDATE waterfalls SET
  drop_height = '4 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Ecstasy Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '4c078cdf-bf13-4838-9a6e-6bea0f4e64a5';

UPDATE waterfalls SET
  drop_height = '4 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Holeyoke Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '235aff97-761b-44d0-b1fc-3d4ebf7262a1';

UPDATE waterfalls SET
  drop_height = '4 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Roadside Pull-off on County Two-Track',
  pass_required = 'None (Free Public Access)',
  county = 'Houghton',
  description = 'Jumbo Falls is a scenic wilderness waterfall situated in Houghton County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '02bcdca5-3edf-4585-b017-8af385a21b36';

UPDATE waterfalls SET
  drop_height = '3 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Ely Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'f2fe6173-dced-4b20-a6af-2e088e7a05ff';

UPDATE waterfalls SET
  drop_height = '3 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Forest Road Pull-off',
  pass_required = 'None (Free Public Access)',
  county = 'Delta',
  description = 'Haymeadows Falls is a scenic wilderness waterfall situated in Delta County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'ebb7fe37-4494-4349-9066-57bb945f2710';

UPDATE waterfalls SET
  drop_height = '2 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Bushy Creek Mouth Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '690345d5-d8c2-464c-aae8-1e4db5109cea';

UPDATE waterfalls SET
  drop_height = '1 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Big Erick''s Fall is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'beafcbf2-e219-4064-bd4d-acd5f1fb8a97';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Algonquin Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '81afd802-3881-4996-8df5-e80f89e005a6';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Big Carp Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '703bb682-9598-4357-a2a0-b9a1ae23cad7';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Big Garlic Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'f5ceac29-1d0d-4387-80a9-534dd0f2b04a';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Big Garlic River Falls (Lower) is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'e1aed90a-a716-4a2f-8ecc-f00d32262939';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Birch Creek Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'cb79740b-2451-4d6b-a3a5-38b472a24fce';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Bull Dog Falls #2 is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '9ba2a125-bf70-4d64-86df-b42632cc805b';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Bull Dog Falls #3 is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '14efb2b0-4898-4dd6-b3af-eb9003bdc8b2';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Bull Dog Falls #4 is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '269ea1ca-6851-4912-93b1-4e5fbf568452';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Bull Dog Falls #5 is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'd4ba51f4-306f-4916-aeb2-f93c262ae8b1';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Bushy Creek Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'c80b9db0-9bea-48a1-b47b-455c854e33e5';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Caps Creek Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'fa7804a1-8ef3-483c-aeaa-356d369cbd0c';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Ontonagon',
  description = 'Cascade Falls is a scenic wilderness waterfall situated in Ontonagon County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '18477738-eaa8-4884-8294-ddd757c7f13f';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Cedar Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '4315b8a5-702f-4d3b-8e50-9372c4801962';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Forest Road Pull-off',
  pass_required = 'None (Free Public Access)',
  county = 'Iron',
  description = 'Chipmunk Falls is a scenic wilderness waterfall situated in Iron County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '3e796e9d-c1bd-44a9-9a51-638314d57ca7';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel National Forest / Trailhead Lot',
  pass_required = 'Pictured Rocks Pass (NPS) or Free Forest Access',
  county = 'Alger',
  description = 'Chipmunk Falls is a scenic wilderness waterfall situated in Alger County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '73c02632-0ed3-4ade-b99c-a14e8969fddc';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel National Forest / Trailhead Lot',
  pass_required = 'Pictured Rocks Pass (NPS) or Free Forest Access',
  county = 'Alger',
  description = 'Cole Creek Falls is a scenic wilderness waterfall situated in Alger County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '0291758a-7c65-4cfa-8f0e-7f64b6038a9f';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Roadside Pull-off on County Two-Track',
  pass_required = 'None (Free Public Access)',
  county = 'Keweenaw',
  description = 'Copper Adit Falls is a scenic wilderness waterfall situated in Keweenaw County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '287ebefb-f886-4681-9071-fa9a37efe781';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Ontonagon',
  description = 'Deer Creek Falls is a scenic wilderness waterfall situated in Ontonagon County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'dd7c4543-f1e1-43a8-8afd-86b875322b88';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'East Branch Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '120dd772-d49a-42f6-9a20-f068227d3663';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'East Branch Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '104f6380-74ca-44d7-af6b-1d7e260ce335';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Frohling Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'ee8b1510-cad1-4ec4-b7cc-240c8afeaf79';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Ontonagon',
  description = 'Gleason Creek Falls is a scenic wilderness waterfall situated in Ontonagon County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'a63f05f8-1a6f-4245-bc42-95b586351a0f';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Granite Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'eb01cf53-7c0b-44b8-97b0-89c25969bb9d';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Harley Falls #2 is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'f01905c5-54dd-4d9f-9cfb-960e19e889a0';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Harley Falls #3 is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'd4e9aa92-d5cf-4593-ad73-d66a9000e921';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Harley Falls #4 is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'f0a4c8f7-6897-40cf-b967-d21127cf5ba7';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Haypress Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '1dc19bd9-fa40-4a12-85cc-8ca78e83038e';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Ontonagon',
  description = 'Hidden Falls is a scenic wilderness waterfall situated in Ontonagon County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'fcec5ad8-0134-41b1-995f-e26a196f4d47';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Hogback Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '16a554bd-31ee-42ce-ac59-ed0987fbb17b';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Roadside Pull-off on County Two-Track',
  pass_required = 'None (Free Public Access)',
  county = 'Houghton',
  description = 'Hogger Falls is a scenic wilderness waterfall situated in Houghton County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'b612cef0-c358-4fd0-b9de-7ceea89badd2';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Forest Road Pull-off',
  pass_required = 'None (Free Public Access)',
  county = 'Delta',
  description = 'Hunters Brook Falls is a scenic wilderness waterfall situated in Delta County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '871317a8-dc7f-408d-8c83-133e6a5c6c4e';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Roadside Pull-off on County Two-Track',
  pass_required = 'None (Free Public Access)',
  county = 'Houghton',
  description = 'Huron Creek Falls is a scenic wilderness waterfall situated in Houghton County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '5bff9ea5-c3c4-45e1-865f-996d16850474';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Kuckuk''s Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '104a32ad-449c-490b-92b6-a425794a7319';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Lepisto Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '7fbd5a66-77ce-4498-8197-02da00d892e0';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Letherby Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '7a4f259d-cc99-4160-bc11-a3ffdee5dfc9';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Ontonagon',
  description = 'Little Falls is a scenic wilderness waterfall situated in Ontonagon County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'c655cf57-ff80-4425-8c41-604c90641195';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Little Garlic Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '94eb3346-d156-4409-a0a0-a9863215834d';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Ontonagon',
  description = 'Little Iron Falls is a scenic wilderness waterfall situated in Ontonagon County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'aed13b2c-17b5-41b8-9d71-37a7a4e00824';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Ontonagon',
  description = 'Little Union Falls is a scenic wilderness waterfall situated in Ontonagon County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '6bb681f7-d238-4835-b3e2-caffea013f0f';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Lower Cliff Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '9170af52-b186-4330-8959-c1a76e854af0';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Roadside Pull-off on County Two-Track',
  pass_required = 'None (Free Public Access)',
  county = 'Keweenaw',
  description = 'Lower Falls is a scenic wilderness waterfall situated in Keweenaw County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '56c1321f-a8b0-46e5-b61c-b6c893021b43';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Lower Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'd58ca9a2-8775-43b1-9bee-2f1f1d6b7729';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Roadside Pull-off on County Two-Track',
  pass_required = 'None (Free Public Access)',
  county = 'Houghton',
  description = 'Lower Falls is a scenic wilderness waterfall situated in Houghton County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'dc6e15e4-dc0b-4398-8255-afc229d5788d';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Ontonagon',
  description = 'Lower Gleason Creek Falls is a scenic wilderness waterfall situated in Ontonagon County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '0a36807f-45df-4e1d-9b25-9e427de396bd';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Lower Letherby Falls (Erics Falls) is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '66ad5fe4-1f3d-49d6-914a-111621f11741';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Ontonagon',
  description = 'Lower Penn Falls is a scenic wilderness waterfall situated in Ontonagon County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'ca787db0-bf61-4d43-82d2-e7f2c29e3715';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Ontonagon',
  description = 'Lower Plover Falls is a scenic wilderness waterfall situated in Ontonagon County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '09134718-5376-46ac-8ad1-0b9fcd5d677c';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Lower Yellow Dog Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '8782c8f8-4554-4cdc-9e56-bb027baa6a9d';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Maple Creek Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '3a4f98a3-d8c6-4683-99aa-0ca0992f158f';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Forest Road Pull-off',
  pass_required = 'None (Free Public Access)',
  county = 'Iron',
  description = 'Margeson Falls is a scenic wilderness waterfall situated in Iron County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'b24a8637-99a9-4dec-afcd-9211e9a5b943';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Mex-i-min-e Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '9eedd077-d204-4b40-a77f-2c2732d9f59b';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Forest Road Pull-off',
  pass_required = 'None (Free Public Access)',
  county = 'Iron',
  description = 'Michigamme Falls is a scenic wilderness waterfall situated in Iron County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'a63608b9-df2d-4695-8453-f4ce7e653e16';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Forest Road Pull-off',
  pass_required = 'None (Free Public Access)',
  county = 'Iron',
  description = 'Middle East Jumbo River Falls is a scenic wilderness waterfall situated in Iron County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'b5a9aabb-e8e5-465c-8f93-dd4f30843cfa';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Middle Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'dba14591-c106-483f-9077-9e7286253e7d';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Middle Falls River Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'e883f51b-7086-40ef-a3ca-cece15e28f3e';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Forest Road Pull-off',
  pass_required = 'None (Free Public Access)',
  county = 'Dickinson',
  description = 'Mill Pond Falls is a scenic wilderness waterfall situated in Dickinson County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'cb17aff3-511a-4e2a-bf75-74f5cb55159b';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Ontonagon',
  description = 'Minnewawa Falls is a scenic wilderness waterfall situated in Ontonagon County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '16a9c944-478e-4700-a98c-15dff6f98d02';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 1.5,
  parking_type = 'Dirt Shoulder Pull-off on M-553 or CR 480',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Morgan Falls is a secluded 20-foot cascade tucked away in a hemlock ravine where Morgan Creek joins the Carp River near Marquette.',
  historical_notes = 'Part of the extensive Marquette multi-use trail system.'
WHERE id = 'c8f6f350-1dee-4f2e-bf90-8b3d4999399f';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Mountain Stream Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'aa93f383-5019-420c-95f9-e6534ebdc358';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Mulligan Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'fc3bfeba-3177-4d15-be3e-39f4c773b6dc';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Neepikon Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '8fa56fc5-5355-45b8-a895-e66f4b8d58de';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'No Name Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'b7b0625d-46d6-48f1-bf50-50e8bfc2f711';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'No Name Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '61768e05-79cf-463e-bcdd-3406eed6c30c';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Roadside Pull-off on County Two-Track',
  pass_required = 'None (Free Public Access)',
  county = 'Houghton',
  description = 'Onion Falls is a scenic wilderness waterfall situated in Houghton County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '94adb2c6-bfd9-4556-8741-de3952bd57d3';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Roadside Pull-off on County Two-Track',
  pass_required = 'None (Free Public Access)',
  county = 'Houghton',
  description = 'Otter Falls is a scenic wilderness waterfall situated in Houghton County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'bf8ee865-44ae-43a2-84cc-3c8fa8ab628f';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Page Creek Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'bde57141-fbfa-46f2-a134-f2124e13f70b';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Roadside Pull-off on County Two-Track',
  pass_required = 'None (Free Public Access)',
  county = 'Houghton',
  description = 'Pauls Falls is a scenic wilderness waterfall situated in Houghton County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'dc6f04e1-8faa-4654-9a08-9f0f744d058c';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Ontonagon',
  description = 'Pewabeck Falls is a scenic wilderness waterfall situated in Ontonagon County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'ec995d21-2cad-49b9-b711-9b246b664314';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Ontonagon',
  description = 'Plover Falls is a scenic wilderness waterfall situated in Ontonagon County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'e3ef5a59-984f-4843-bba8-39ffda1ae8c2';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Potluck Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '2ec8237f-dff5-415d-aa9b-1764434d3c73';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Roadside Pull-off on County Two-Track',
  pass_required = 'None (Free Public Access)',
  county = 'Houghton',
  description = 'Queen Anne Falls is a scenic wilderness waterfall situated in Houghton County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '4edc3ada-3ac6-4d1b-afa4-66821f27d5e1';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Roadside Pull-off on County Two-Track',
  pass_required = 'None (Free Public Access)',
  county = 'Houghton',
  description = 'Quincy Falls is a scenic wilderness waterfall situated in Houghton County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '1f2e419b-f913-40b2-8237-a03aac50f1c6';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Ravine River Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'ca45a5d8-d887-464b-b899-5379a34a571a';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Ontonagon',
  description = 'Rock Bluff Falls is a scenic wilderness waterfall situated in Ontonagon County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'a9c314cb-0a8b-4bd5-980e-1e661d8c1035';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Forest Road Pull-off',
  pass_required = 'None (Free Public Access)',
  county = 'Dickinson',
  description = 'Rock Dam Falls is a scenic wilderness waterfall situated in Dickinson County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '5e6a84b4-e180-414b-a833-6526b778db58';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Rocky Forty Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '40296f81-2d39-43d4-9766-c4a37cf0b33a';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Forest Road Pull-off',
  pass_required = 'None (Free Public Access)',
  county = 'Delta',
  description = 'Rose Falls (East) is a scenic wilderness waterfall situated in Delta County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '3a7391b6-cb84-4de3-aaff-0d7a9f9dbcd8';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Forest Road Pull-off',
  pass_required = 'None (Free Public Access)',
  county = 'Delta',
  description = 'Rose Falls (West) is a scenic wilderness waterfall situated in Delta County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '205e95b2-3b3f-4a39-8c2f-11e85f5ea511';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Roadside Pull-off on County Two-Track',
  pass_required = 'None (Free Public Access)',
  county = 'Houghton',
  description = 'Saint Louis Falls is a scenic wilderness waterfall situated in Houghton County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '5486b546-f4d8-4455-8ecc-18ea55ad0f57';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Ontonagon',
  description = 'Sandhill Creek Falls is a scenic wilderness waterfall situated in Ontonagon County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '4a9572c2-8cb7-4be0-9503-bb8e21a4a0b4';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Schweitzer Falls (lower) is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '0962035d-06ed-4374-8c48-332c0051eeee';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Second City Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '19d2fe82-99c6-4ac9-8472-63879f84849c';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Roadside Pull-off on County Two-Track',
  pass_required = 'None (Free Public Access)',
  county = 'Keweenaw',
  description = 'Silver Creek falls is a scenic wilderness waterfall situated in Keweenaw County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '74398ab1-8eec-4fcf-8c19-674bc6855d51';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel National Forest / Trailhead Lot',
  pass_required = 'Pictured Rocks Pass (NPS) or Free Forest Access',
  county = 'Alger',
  description = 'Silver Creek Falls is a scenic wilderness waterfall situated in Alger County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'da8ce269-9f91-468b-b17a-4c1bb687123b';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Silver Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'c8022732-a6ff-4b9d-a77e-13ad7fba4326';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Slide Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '37677f83-abdf-49f6-980e-8671f308d908';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Tiger Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '6760bbbb-9b37-4a94-8bf1-bc7b0c729dc4';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Ontonagon',
  description = 'Trap Falls is a scenic wilderness waterfall situated in Ontonagon County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'b5d5c3cd-123d-4a86-8f25-d03f70bc8fdb';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Turkey Neck Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '1468cb20-47f9-45ad-ad9a-2ea6523120a8';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Turkey Neck Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '9c565490-b1f4-4c01-b960-0c620f510d8f';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Twin Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '3e763a21-83b4-4327-b319-2fccd4c91136';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Unnamed Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '203efe15-d049-4fbb-984a-7ee40cba8435';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Gogebic',
  description = 'Unnamed Falls is a scenic wilderness waterfall situated in Gogebic County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'eb148d52-bb46-4507-ac7d-cbc35238d365';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel National Forest / Trailhead Lot',
  pass_required = 'Pictured Rocks Pass (NPS) or Free Forest Access',
  county = 'Alger',
  description = 'Unnamed Falls is a scenic wilderness waterfall situated in Alger County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '7ae43299-b5cb-42c5-a910-804b795efcce';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Unnamed Falls on Creek to Dead River is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '1bf527f9-a49c-4c27-99a2-911dd5d20ce5';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Upper Chocolay Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'ae3a57f8-6479-4c3a-87be-ca30ffb5ec17';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Upper Chocolay Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'cac54cd5-8c2f-43f0-9305-73bb3fb3460c';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Upper Craig''s Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '30b3fcad-f701-43e2-9ca5-1963f0960400';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Upper Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '390d7daa-7ad3-4545-839d-16335dedda88';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Upper Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '47b6dc42-059e-4f38-9f16-ffd02023cad2';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Upper Frohling Falls #2 (Chocolay Falls) is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'a04415bd-531a-4a01-b2ce-b96d52be9894';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Upper Garlic Falls 1 is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '6912b4ce-6138-4bd4-9ed3-d9a76c910580';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Upper Garlic Falls 2 is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '953c1ac9-4e36-4711-82b5-c2fadfb99ded';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Upper Garlic Falls 3 is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'ee58d10f-9724-4ceb-a742-8ef42f158af2';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Upper Leatherby Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '8d41c2c0-eeb8-4803-bae5-7a824773a945';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Roadside Pull-off on County Two-Track',
  pass_required = 'None (Free Public Access)',
  county = 'Keweenaw',
  description = 'Upper Montreal Falls is a scenic wilderness waterfall situated in Keweenaw County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '03711364-a8eb-4340-97b3-daefbfee9c38';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Ontonagon',
  description = 'Upper Penn Falls is a scenic wilderness waterfall situated in Ontonagon County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '16462de1-7de3-430f-95dd-a54c777fafb0';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Upper Raney Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'c5fbe85c-e14b-445f-8720-9b7b7d4ba189';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Upper Silver Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '7c5ccb6d-01c3-488b-a77a-147b22548410';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Upper silver falls #1 is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '29fa983b-9e80-41d3-832c-be00add60e40';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Upper Silver Falls #2 is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '22024b55-e37a-43c8-9694-79bb040ad7b6';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Upper Silver Falls #3 is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '5658ece0-30ad-4610-beb7-f7204908d56e';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Upper Silver Falls #4 is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'c8af4ede-37e0-4b14-85d3-6c7d931ef946';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Upper Slate Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'dad14a1b-1ff9-415b-82e9-bc76f1f02a0e';

UPDATE waterfalls SET
  drop_height = '15 ft cascade',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Baraga',
  description = 'Upper Sturgeon Falls is a scenic wilderness waterfall situated in Baraga County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '61d20f75-f700-4c17-b5aa-05e4b238c6be';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Gravel Roadside Pull-off on County Two-Track',
  pass_required = 'None (Free Public Access)',
  county = 'Houghton',
  description = 'Vista Falls is a scenic wilderness waterfall situated in Houghton County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '8fdc8c05-c4bc-4f2a-8404-794c990ba54d';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'West Branch Yellow Dog Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '897beca2-27ab-480f-b2fc-99a1f0eb47af';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'Ottawa National Forest / County Road Turnout',
  pass_required = 'Ottawa National Forest Pass or Free Access',
  county = 'Ontonagon',
  description = 'Wildcat Falls is a scenic wilderness waterfall situated in Ontonagon County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = 'a6d1a619-3df2-41d8-94b0-f1a71ad5f2ab';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Woodys Waterfall is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '281afc51-17fe-4d08-ad9b-10996ec4e30a';

UPDATE waterfalls SET
  drop_height = '20 ft',
  hike_difficulty = 'Moderate',
  trail_length_miles = 0.8,
  parking_type = 'State Forest Road Turnout',
  pass_required = 'None (Free Public Access)',
  county = 'Marquette',
  description = 'Wylie Falls is a scenic wilderness waterfall situated in Marquette County, Michigan. Flowing across ancient Precambrian bedrock and surrounded by dense northern hemlock, cedar, and sugar maple forest, it offers an authentic Upper Peninsula outdoor hiking experience.',
  historical_notes = 'Preserved within Michigan''s Upper Peninsula wilderness corridor, featuring natural bedrock geology carved by post-glacial runoff.'
WHERE id = '84451955-0f6b-4756-9196-012828c2929b';

COMMIT;
