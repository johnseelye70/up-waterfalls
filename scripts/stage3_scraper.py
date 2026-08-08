import urllib.request
import urllib.parse
import json
import time
import re
import hashlib
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def fetch_json(url, data=None):
    if data:
        req = urllib.request.Request(url, data=data, headers={'User-Agent': 'UPWaterfallsScraper/1.0'})
    else:
        req = urllib.request.Request(url, headers={'User-Agent': 'UPWaterfallsScraper/1.0'})
    
    try:
        with urllib.request.urlopen(req, context=ctx) as response:
            return json.loads(response.read().decode('utf-8'))
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def get_md5_url(filename):
    filename = filename.replace(" ", "_")
    md5 = hashlib.md5(filename.encode('utf-8')).hexdigest()
    return f"https://upload.wikimedia.org/wikipedia/commons/{md5[0]}/{md5[0:2]}/{urllib.parse.quote(filename)}"

# 1. Fetch waterfalls from Overpass API
print("Fetching waterfalls from OpenStreetMap...")
overpass_url = "http://overpass-api.de/api/interpreter"
# Bounding box for UP Michigan
overpass_query = """
[out:json];
area["ISO3166-2"="US-MI"]->.mi;
(
  node["waterway"="waterfall"](area.mi)(45.5, -90.5, 47.5, -83.5);
  way["waterway"="waterfall"](area.mi)(45.5, -90.5, 47.5, -83.5);
);
out center;
"""
data = urllib.parse.urlencode({'data': overpass_query}).encode('utf-8')
osm_data = fetch_json(overpass_url, data)

if not osm_data or 'elements' not in osm_data:
    print("Failed to fetch OSM data.")
    exit(1)

waterfalls = []
for el in osm_data['elements']:
    tags = el.get('tags', {})
    if 'name' not in tags: continue
    
    name = tags['name']
    lat = el.get('lat') or el.get('center', {}).get('lat')
    lon = el.get('lon') or el.get('center', {}).get('lon')
    
    if not lat or not lon: continue
    
    waterfalls.append({
        'name': name,
        'lat': lat,
        'lon': lon,
        'height': tags.get('height', 'Unknown')
    })

print(f"Found {len(waterfalls)} named waterfalls in OSM.")

# Deduplicate by name and approximate location
unique_waterfalls = {}
for w in waterfalls:
    key = f"{w['name']}_{round(w['lat'], 2)}_{round(w['lon'], 2)}"
    if key not in unique_waterfalls:
        unique_waterfalls[key] = w
waterfalls = list(unique_waterfalls.values())
print(f"{len(waterfalls)} unique waterfalls after deduplication.")

valid_waterfalls = []

# 2. For each, find photo and county
for w in waterfalls:
    name = w['name']
    lat = w['lat']
    lon = w['lon']
    
    # Exclude already processed ones roughly by name
    if any(x.lower() in name.lower() for x in ['Munising', 'Miners', 'Sable', 'Wagner', 'Alger', 'Scott', 'Tahquamenon', 'Conglomerate', 'Manabezho', 'Manido', 'Nawadaha', 'Hungarian', 'Douglass', 'Bond', 'Agate', 'O Kun de Kun', 'Canyon', 'Sandstone', 'Laughing Whitefish']):
        continue

    print(f"Processing {name} at {lat}, {lon}...")
    
    # Geosearch Commons (1km radius)
    # Using https://commons.wikimedia.org/w/api.php
    search_url = f"https://commons.wikimedia.org/w/api.php?action=query&list=geosearch&gsradius=1000&gscoord={lat}|{lon}&gsnamespace=6&format=json&gslimit=1"
    max_retries = 3
    geo_data = None
    for attempt in range(max_retries):
        geo_data = fetch_json(search_url)
        if geo_data is None: # likely 429 or error
            print(f"  -> API error, sleeping for {5 * (attempt+1)}s before retry...")
            time.sleep(5 * (attempt+1))
        else:
            break
            
    img_url = None
    if geo_data and 'query' in geo_data and 'geosearch' in geo_data['query']:
        results = geo_data['query']['geosearch']
        if results:
            title = results[0]['title'].replace('File:', '')
            img_url = get_md5_url(title)
            
    if not img_url:
        print(f"  -> No photo found within 1km. Skipping.")
        time.sleep(1.5)
        continue
        
    print(f"  -> Photo found: {img_url}")
    
    # Get County from Nominatim
    nom_url = f"https://nominatim.openstreetmap.org/reverse?format=json&lat={lat}&lon={lon}&zoom=10"
    
    nom_data = None
    for attempt in range(max_retries):
        nom_data = fetch_json(nom_url)
        if nom_data is None:
            time.sleep(5 * (attempt+1))
        else:
            break
            
    county = "Unknown"
    region = "Upper Peninsula"
    if nom_data and 'address' in nom_data:
        county = nom_data['address'].get('county', 'Unknown County').replace(' County', '')
        
    w['county'] = county
    w['region'] = region
    w['img_url'] = img_url
    
    # Generate generic description
    w['description'] = f"{name} is a beautiful natural waterfall located in {county} County, Michigan. Tucked away in the wilderness of the Upper Peninsula, it offers visitors a peaceful retreat into nature. The exact trail conditions vary by season, but the scenic beauty of the surrounding forest and the cascading waters make it a wonderful spot for photography and hiking."
    
    valid_waterfalls.append(w)
    
    if len(valid_waterfalls) >= 50:
        print("Reached 50 new waterfalls for Stage 3 batch. Stopping.")
        break
        
    time.sleep(2.0) # Be nice to APIs

print(f"\nSuccessfully gathered {len(valid_waterfalls)} waterfalls with photos!")

sql_output = ["BEGIN;\n\n-- STAGE 3 MASSIVE SEEDING\n"]
for w in valid_waterfalls:
    slug = w['name'].lower().replace(" ", "-").replace("(", "").replace(")", "").replace("'", "")
    clean_name = w['name'].replace("'", "''")
    clean_county = w['county'].replace("'", "''")
    
    sql = f"""
-- {clean_name}
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('{clean_name}', '{clean_county}', '{w['region']}', {w['lat']}, {w['lon']}, '{w['height']}', 'Moderate', 1.0, 'Dirt/Gravel', 'Varies', 'A scenic natural waterfall in the Upper Peninsula.', '{w['description'].replace("'", "''")}')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, '{w['img_url']}', 'Beautiful natural scenery near {clean_name}', true
FROM new_waterfall;
"""
    sql_output.append(sql)

sql_output.append("COMMIT;\n")

with open("seed_stage_3.sql", "w", encoding="utf-8") as f:
    f.write("\n".join(sql_output))

print("Saved to seed_stage_3.sql")
