import requests
import json
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

overpass_url = "https://overpass-api.de/api/interpreter"
overpass_query = """
[out:json][timeout:25];
node["waterway"="waterfall"](45.5, -90.5, 47.5, -83.5);
out body;
"""

print("Fetching waterfalls from Overpass API...")
try:
    headers = {
        'User-Agent': 'UpWaterfallsBot/1.0 (contact@example.com)'
    }
    response = requests.get(overpass_url, params={'data': overpass_query}, headers=headers, verify=False)
    response.raise_for_status()
    osm_data = response.json()

    waterfalls = []
    for element in osm_data['elements']:
        if 'tags' in element and 'name' in element['tags']:
            waterfalls.append({
                'name': element['tags']['name'],
                'lat': element['lat'],
                'lon': element['lon']
            })

    with open('overpass_waterfalls.json', 'w') as f:
        json.dump(waterfalls, f, indent=2)

    print(f"Found {len(waterfalls)} named waterfalls in bounding box and saved to overpass_waterfalls.json")
except Exception as e:
    print(e)
    if hasattr(e, 'response') and e.response is not None:
        print(e.response.text)
