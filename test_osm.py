import requests
import json
import urllib3
urllib3.disable_warnings()

# Using Kumi Systems Overpass instance which usually has less rate limiting than overpass-api.de
overpass_url = "https://overpass.kumi.systems/api/interpreter"
# Fallback: "https://overpass-api.de/api/interpreter"
overpass_query = """
[out:json][timeout:90];
(
  node["waterway"="waterfall"](45.5, -90.5, 47.5, -83.5);
  way["waterway"="waterfall"](45.5, -90.5, 47.5, -83.5);
);
out center;
"""
print("Querying Overpass...")
try:
    headers = {'User-Agent': 'UpWaterfallsBot/1.0 (test@example.com)'}
    response = requests.post("https://overpass.kumi.systems/api/interpreter", data={'data': overpass_query}, headers=headers, verify=False, timeout=120)
    print(f"Status: {response.status_code}")
    if response.ok:
        data = response.json()
        with open('osm_waterfalls.json', 'w') as f:
            json.dump(data, f)
        print(f"Saved {len(data.get('elements', []))} elements to osm_waterfalls.json")
    else:
        print("Error:", response.text)
except Exception as e:
    print("Exception:", e)
