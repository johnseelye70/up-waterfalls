import os
import random
import requests
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
from dotenv import load_dotenv

load_dotenv(".env.local")

# Environment vars
SUPABASE_URL = os.environ.get("VITE_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("VITE_SUPABASE_ANON_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY")
    exit(1)

# List of 15 U.P. Counties
counties = [
    "Alger", "Baraga", "Chippewa", "Delta", "Dickinson",
    "Gogebic", "Houghton", "Iron", "Keweenaw", "Luce",
    "Mackinac", "Marquette", "Menominee", "Ontonagon", "Schoolcraft"
]

adjectives = ["Hidden", "Whispering", "Roaring", "Silent", "Silver", "Crystal", "Bridal", "Twin", "Black", "Red", "White", "Bear", "Wolf", "Eagle", "Little", "Big", "Lost", "Wild", "Mystic", "Mossy"]
nouns = ["Creek", "River", "Brook", "Pine", "Rock", "Gorge", "Canyon", "Valley", "Cliff", "Ridge", "Forest", "Stone", "Waters", "Spring", "Run", "Gulch", "Basin", "Hollow"]

unsplash_urls = [
    "https://images.unsplash.com/photo-1432405972618-c60b02422315",
    "https://images.unsplash.com/photo-1519001362791-c917f858f964",
    "https://images.unsplash.com/photo-1476610182048-b716b8518aae",
    "https://images.unsplash.com/photo-1504280590864-42b41de45292",
    "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5"
]

waterfalls_to_insert = 225
per_county = waterfalls_to_insert // len(counties)

print(f"Generating {per_county} waterfalls per county ({waterfalls_to_insert} total)...")

inserted = 0

headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation"
}

for county in counties:
    for i in range(per_county):
        # Generate random name
        name = f"{random.choice(adjectives)} {random.choice(nouns)} Falls"
        lat = round(random.uniform(45.5, 47.5), 6)
        lon = round(random.uniform(-90.5, -83.5), 6)
        
        waterfall_data = {
            "name": name,
            "county": county,
            "region": "Upper Peninsula",
            "latitude": lat,
            "longitude": lon,
            "drop_height": f"{random.randint(5, 100)} ft",
            "hike_difficulty": random.choice(["Easy", "Moderate", "Hard"]),
            "trail_length_miles": round(random.uniform(0.1, 5.0), 2),
            "description": f"A beautiful and secluded waterfall located deep in the heart of {county} County. Perfect for nature lovers."
        }
        
        r = requests.post(f"{SUPABASE_URL}/rest/v1/waterfalls", json=waterfall_data, headers=headers, verify=False)
        if not r.ok:
            print(f"Error {r.status_code}: {r.text}")
            break
        
        waterfall_id = r.json()[0]['id']
        
        # Insert photo
        photo_data = {
            "waterfall_id": waterfall_id,
            "image_url": random.choice(unsplash_urls),
            "is_hero": True
        }
        
        r_photo = requests.post(f"{SUPABASE_URL}/rest/v1/waterfall_photos", json=photo_data, headers=headers, verify=False)
        r_photo.raise_for_status()
        
        inserted += 1

print(f"Successfully generated and inserted {inserted} waterfalls!")
