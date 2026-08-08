import os
import json
import requests
import urllib3
import hashlib
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
from dotenv import load_dotenv

load_dotenv(".env.local")

SUPABASE_URL = os.environ.get("VITE_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("VITE_SUPABASE_ANON_KEY")

headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation"
}

with open('processed_waterfalls.json', 'r') as f:
    waterfalls = json.load(f)

print(f"Loaded {len(waterfalls)} waterfalls. Inserting into Supabase...")

inserted = 0

for wf in waterfalls:
    # Use MD5 of wikidata URL to get a consistent image name if we wanted to download it, 
    # but we just pass the URL directly.
    # The image from wikidata looks like: http://commons.wikimedia.org/wiki/Special:FilePath/Miner%27s%20Falls%20Pictured%20Rocks.jpg
    
    waterfall_data = {
        "name": wf['name'],
        "county": wf['county'],
        "region": wf['region'],
        "latitude": wf['latitude'],
        "longitude": wf['longitude'],
        "description": wf['description']
    }
    
    r = requests.post(f"{SUPABASE_URL}/rest/v1/waterfalls", json=waterfall_data, headers=headers, verify=False)
    
    if r.ok:
        waterfall_id = r.json()[0]['id']
        
        photo_data = {
            "waterfall_id": waterfall_id,
            "image_url": wf['image_url'],
            "is_hero": True
        }
        
        r_photo = requests.post(f"{SUPABASE_URL}/rest/v1/waterfall_photos", json=photo_data, headers=headers, verify=False)
        if r_photo.ok:
            inserted += 1
            print(f"Inserted: {wf['name']}")
        else:
            print(f"Failed to insert photo for {wf['name']}: {r_photo.text}")
    else:
        print(f"Failed to insert {wf['name']}: {r.text}")

print(f"Successfully inserted {inserted} waterfalls!")
