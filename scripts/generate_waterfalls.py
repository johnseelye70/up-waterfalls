import urllib.request
import urllib.parse
import json
import hashlib
import ssl
import sys
import time

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'UPWaterfallsBot/1.0 (contact@seelye.info)'})
    try:
        with urllib.request.urlopen(req, context=ctx) as response:
            return json.loads(response.read().decode())
    except Exception as e:
        print(f"Failed to fetch: {e}")
        return {}

def get_md5_url(filename):
    if not filename: return None
    filename = filename.replace(" ", "_")
    if filename.startswith("File:"):
        filename = filename[5:]
    md5 = hashlib.md5(filename.encode('utf-8')).hexdigest()
    return f"https://upload.wikimedia.org/wikipedia/commons/{md5[0]}/{md5[0:2]}/{urllib.parse.quote(filename)}"

# Hardcoded list of prominent UP waterfalls across counties
waterfalls = [
    {"name": "Munising Falls", "county": "Alger", "region": "Central UP", "difficulty": "Easy"},
    {"name": "Miners Falls", "county": "Alger", "region": "Central UP", "difficulty": "Moderate"},
    {"name": "Sable Falls", "county": "Alger", "region": "Central UP", "difficulty": "Moderate"},
    {"name": "Wagner Falls", "county": "Alger", "region": "Central UP", "difficulty": "Easy"},
    {"name": "Alger Falls", "county": "Alger", "region": "Central UP", "difficulty": "Easy"},
    {"name": "Scott Falls", "county": "Alger", "region": "Central UP", "difficulty": "Easy"},
    {"name": "Laughing Whitefish Falls State Park", "county": "Alger", "region": "Central UP", "difficulty": "Moderate"},
    {"name": "Canyon Falls", "county": "Baraga", "region": "Western UP", "difficulty": "Moderate"},
    {"name": "Tahquamenon Falls", "county": "Chippewa", "region": "Eastern UP", "difficulty": "Easy"},
    {"name": "Fumee Falls", "county": "Dickinson", "region": "Central UP", "difficulty": "Easy"},
    {"name": "Great Conglomerate Falls", "county": "Gogebic", "region": "Western UP", "difficulty": "Moderate"},
    {"name": "Potawatomi Falls", "county": "Gogebic", "region": "Western UP", "difficulty": "Easy"},
    {"name": "Gorge Falls", "county": "Gogebic", "region": "Western UP", "difficulty": "Moderate"},
    {"name": "Sandstone Falls", "county": "Gogebic", "region": "Western UP", "difficulty": "Moderate"},
    {"name": "Rainbow Falls (Michigan)", "county": "Gogebic", "region": "Western UP", "difficulty": "Moderate"},
    {"name": "Manabezho Falls", "county": "Gogebic", "region": "Western UP", "difficulty": "Easy"},
    {"name": "Manido Falls", "county": "Gogebic", "region": "Western UP", "difficulty": "Easy"},
    {"name": "Nawadaha Falls", "county": "Gogebic", "region": "Western UP", "difficulty": "Easy"},
    {"name": "Hungarian Falls", "county": "Houghton", "region": "Keweenaw Peninsula", "difficulty": "Moderate"},
    {"name": "Houghton-Douglass Falls", "county": "Houghton", "region": "Keweenaw Peninsula", "difficulty": "Hard"},
    {"name": "Chicagon Falls", "county": "Iron", "region": "Western UP", "difficulty": "Moderate"},
    {"name": "Eagle River Falls", "county": "Keweenaw", "region": "Keweenaw Peninsula", "difficulty": "Easy"},
    {"name": "Manganese Falls", "county": "Keweenaw", "region": "Keweenaw Peninsula", "difficulty": "Moderate"},
    {"name": "Jacob's Falls", "county": "Keweenaw", "region": "Keweenaw Peninsula", "difficulty": "Easy"},
    {"name": "Dead River Falls", "county": "Marquette", "region": "Central UP", "difficulty": "Hard"},
    {"name": "Yellow Dog Falls", "county": "Marquette", "region": "Central UP", "difficulty": "Moderate"},
    {"name": "Morgan Falls", "county": "Marquette", "region": "Central UP", "difficulty": "Moderate"},
    {"name": "Warner Falls", "county": "Marquette", "region": "Central UP", "difficulty": "Easy"},
    {"name": "Bond Falls", "county": "Ontonagon", "region": "Western UP", "difficulty": "Easy"},
    {"name": "Agate Falls Scenic Site", "county": "Ontonagon", "region": "Western UP", "difficulty": "Easy"},
    {"name": "O Kun de Kun Falls", "county": "Ontonagon", "region": "Western UP", "difficulty": "Moderate"}
]

sql_output = ["BEGIN;\n\n-- STAGE 2 MASSIVE SEEDING\n"]

# Batch requests to avoid 429
titles = [w['name'] for w in waterfalls]
titles_chunk = urllib.parse.quote("|".join(titles))
url = f"https://en.wikipedia.org/w/api.php?action=query&prop=coordinates|pageimages|extracts&exintro=1&explaintext=1&pithumbsize=1000&titles={titles_chunk}&format=json"

data = fetch(url)
pages = data.get('query', {}).get('pages', {})
page_map = {pdata.get('title'): pdata for p_id, pdata in pages.items()}

for w in waterfalls:
    title = w["name"]
    pdata = page_map.get(title, {})
    
    if not pdata or 'missing' in pdata:
        print(f"Missing wikipedia page for {title}")
        continue
        
    lat, lon = 46.5, -87.5
    img_url = ""
    desc = f"{w['name']} is a beautiful waterfall located in {w['county']} County."
    
    extract = pdata.get('extract', '')
    if extract: 
        desc = extract.replace("'", "''").replace('\n', ' ')[:400] + "..."
        
    coords = pdata.get('coordinates', [{}])[0]
    if coords:
        lat, lon = coords.get('lat', lat), coords.get('lon', lon)
        
    image = pdata.get('pageimage')
    if image: img_url = get_md5_url(image)
    
    if not img_url:
        print(f"No image found for {title}, skipping...")
        continue
        
    print(f"Successfully processed {title}")
    
    slug = title.lower().replace(" ", "-").replace("(", "").replace(")", "").replace("'", "")
    name = title.replace("'", "''").replace(" (Michigan)", "").replace(" Scenic Site", "").replace(" State Park", "")
    
    sql = f"""
-- {name}
WITH new_waterfall AS (
  INSERT INTO waterfalls (name, county, region, latitude, longitude, drop_height, hike_difficulty, trail_length_miles, parking_type, pass_required, historical_notes, description)
  VALUES ('{name}', '{w['county']}', '{w['region']}', {lat}, {lon}, 'Unknown', '{w['difficulty']}', 1.0, 'Paved/Gravel Lot', 'Varies', 'Historically significant wilderness area.', '{desc}')
  RETURNING id
)
INSERT INTO waterfall_photos (waterfall_id, image_url, caption, is_hero)
SELECT id, '{img_url}', 'Beautiful view of {name}', true
FROM new_waterfall;
"""
    sql_output.append(sql)

sql_output.append("COMMIT;\n")

with open("seed_stage_2.sql", "w", encoding="utf-8") as f:
    f.write("\n".join(sql_output))

print("\nFinished writing seed_stage_2.sql")
