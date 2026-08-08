import os
import time
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

def search_wikimedia(waterfall_name):
    url = "https://commons.wikimedia.org/w/api.php"
    params = {
        "action": "query",
        "format": "json",
        "generator": "search",
        "gsrsearch": f"{waterfall_name} Michigan",
        "gsrnamespace": 6, # File namespace
        "gsrlimit": 1,
        "prop": "imageinfo",
        "iiprop": "url|extmetadata"
    }
    
    wiki_headers = {
        "User-Agent": "UPWaterfallsBot/1.0 (contact@seelye.info)"
    }
    
    try:
        response = requests.get(url, params=params, headers=wiki_headers, verify=False, timeout=10)
        data = response.json()
        
        if "query" in data and "pages" in data["query"]:
            pages = data["query"]["pages"]
            for page_id in pages:
                # Discard placeholder images that might match broadly
                title = pages[page_id].get("title", "").lower()
                if "map" in title or "logo" in title or "flag" in title:
                    continue
                image_info = pages[page_id].get("imageinfo", [{}])[0]
                url = image_info.get("url")
                ext = image_info.get("extmetadata", {})
                credit = ext.get("Credit", {}).get("value", "Wikimedia Commons")
                return url, credit
    except Exception as e:
        print(f"Error fetching wiki data for {waterfall_name}: {e}")
    return None, None

def seed_photos():
    # 1. Get all waterfalls
    print("Fetching waterfalls from Supabase...")
    r = requests.get(f"{SUPABASE_URL}/rest/v1/waterfalls?select=id,name", headers=headers, verify=False)
    
    if not r.ok:
        print(f"Failed to fetch waterfalls: {r.text}")
        return
        
    waterfalls = r.json()
    print(f"Found {len(waterfalls)} waterfalls.")
    
    inserted = 0
    not_found = 0
    
    for wf in waterfalls:
        print(f"Searching photo for {wf['name']}...")
        photo_url, credit = search_wikimedia(wf['name'])
        
        if photo_url:
            print(f"  -> Found! {photo_url}")
            
            # Clean up HTML tags in credit if any
            import re
            credit_clean = re.sub('<[^<]+>', '', credit) if credit else "Wikimedia Commons"
            
            photo_data = {
                "waterfall_id": wf['id'],
                "image_url": photo_url,
                "caption": f"Authentic photo of {wf['name']}.",
                "credit_name": credit_clean,
                "is_hero": True
            }
            
            post_r = requests.post(f"{SUPABASE_URL}/rest/v1/waterfall_photos", json=photo_data, headers=headers, verify=False)
            if post_r.ok:
                inserted += 1
            else:
                print(f"  -> DB Insert Failed: {post_r.text}")
        else:
            print("  -> No suitable image found.")
            not_found += 1
            
        time.sleep(0.5) # Be nice to Wikimedia API
        
    print(f"\nFinished! Successfully inserted {inserted} photos. {not_found} waterfalls had no matching photos on Wikimedia.")

if __name__ == "__main__":
    seed_photos()
