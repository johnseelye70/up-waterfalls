import os
import json
import requests
import urllib3
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

with open('shoreline_waterfalls.json', 'r') as f:
    waterfalls = json.load(f)

print(f"Loaded {len(waterfalls)} waterfalls. Inserting into Supabase...")

inserted = 0
for wf in waterfalls:
    
    # parse height if possible
    description = ""
    if wf.get('heightFt'):
        description += f"Height: {wf['heightFt']} ft. "
    if wf.get('hikeDistanceMi'):
        description += f"Hike: {wf['hikeDistanceMi']} miles. "
    if wf.get('hikeDifficulty'):
        description += f"Difficulty: {wf['hikeDifficulty']}. "
        
    if not description:
        description = f"A beautiful natural waterfall located in {wf.get('county')} County."
        
    waterfall_data = {
        "name": wf['name'],
        "county": wf.get('county', 'Unknown') + " County",
        "region": "Upper Peninsula",
        "latitude": wf['lat'],
        "longitude": wf['lng'],
        "description": description
    }
    
    r = requests.post(f"{SUPABASE_URL}/rest/v1/waterfalls", json=waterfall_data, headers=headers, verify=False)
    
    if r.ok:
        inserted += 1
    else:
        print(f"Failed to insert {wf['name']}: {r.text}")

print(f"Successfully inserted {inserted} waterfalls!")
