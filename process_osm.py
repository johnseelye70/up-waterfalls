import json
import requests
import time
import urllib3
urllib3.disable_warnings()

# Load OSM Data
with open('osm_waterfalls.json', 'r') as f:
    data = json.load(f)

# Wikidata SPARQL Endpoint
wd_url = "https://query.wikidata.org/sparql"

def get_wikidata_image(qid):
    query = f"""
    SELECT ?image WHERE {{
      wd:{qid} wdt:P18 ?image.
    }}
    """
    try:
        r = requests.get(wd_url, params={'format': 'json', 'query': query}, headers={'User-Agent': 'UpWaterfallsBot/1.0'}, verify=False)
        if r.ok:
            results = r.json().get('results', {}).get('bindings', [])
            if results:
                return results[0]['image']['value']
    except Exception as e:
        print(f"Error fetching image for {qid}: {e}")
    return None

def reverse_geocode(lat, lon):
    url = f"https://nominatim.openstreetmap.org/reverse"
    params = {
        'lat': lat,
        'lon': lon,
        'format': 'json',
        'zoom': 10  # County level is usually around zoom 8-10
    }
    headers = {'User-Agent': 'UpWaterfallsBot/1.0'}
    try:
        r = requests.get(url, params=params, headers=headers, verify=False)
        if r.ok:
            data = r.json()
            address = data.get('address', {})
            return address.get('county', 'Unknown County').replace(' County', '')
    except Exception as e:
        pass
    return "Unknown"

final_waterfalls = []

elements = data.get('elements', [])
print(f"Total elements from OSM: {len(elements)}")

for el in elements:
    tags = el.get('tags', {})
    name = tags.get('name')
    if not name:
        continue
        
    wikidata_id = tags.get('wikidata')
    image_url = None
    
    if wikidata_id:
        print(f"Checking Wikidata for {name} ({wikidata_id})...")
        image_url = get_wikidata_image(wikidata_id)
        time.sleep(1) # Be nice to Wikidata API
        
    if image_url:
        lat = el.get('lat')
        lon = el.get('lon')
        if not lat and 'center' in el:
            lat = el['center']['lat']
            lon = el['center']['lon']
            
        print(f"Reverse geocoding {name}...")
        county = reverse_geocode(lat, lon)
        time.sleep(1) # Nominatim 1 request per second
        
        final_waterfalls.append({
            'name': name,
            'latitude': lat,
            'longitude': lon,
            'county': county,
            'region': "Upper Peninsula",
            'image_url': image_url,
            'description': f"A beautiful natural waterfall located in {county} County."
        })

print(f"\nFound {len(final_waterfalls)} waterfalls with confirmed images!")
with open('processed_waterfalls.json', 'w') as f:
    json.dump(final_waterfalls, f, indent=2)
