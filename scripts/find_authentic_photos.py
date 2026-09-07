import os
import re
import time
import requests
import urllib.parse
from dotenv import load_dotenv

load_dotenv(".env.local")

SUPABASE_URL = os.environ.get("VITE_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("VITE_SUPABASE_ANON_KEY")

headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json"
}

WIKI_HEADERS = {
    "User-Agent": "UPWaterfallsCurator/1.0 (contact@seelye.info)"
}

BAD_KEYWORDS = [
    'sign', 'marker', 'plaque', 'map', 'diagram', 'flag', 'logo',
    'pyrite', 'mineral', 'specimen', 'crystal', 'road', 'highway',
    'bridge', 'building', 'trolley', 'boat', 'post', 'trail_map',
    'parking', 'restroom', 'campsite', 'tent', 'car', 'license'
]

def is_valid_photo_title(title, wf_name):
    lower = title.lower()
    for bad in BAD_KEYWORDS:
        if bad in lower:
            return False
    # Must contain "fall" or "cascade" or the waterfall's distinct name token
    name_clean = wf_name.lower().replace('waterfall', '').replace('falls', '').strip()
    if name_clean and name_clean not in lower and 'fall' not in lower:
        return False
    return True

def get_photos_for_category(category_name, wf_name, limit=4):
    url = "https://commons.wikimedia.org/w/api.php"
    params = {
        "action": "query",
        "format": "json",
        "generator": "categorymembers",
        "gcmtitle": category_name,
        "gcmtype": "file",
        "gcmlimit": 20,
        "prop": "imageinfo",
        "iiprop": "url|extmetadata|dimensions"
    }
    photos = []
    try:
        r = requests.get(url, params=params, headers=WIKI_HEADERS, timeout=10)
        data = r.json()
        if "query" in data and "pages" in data["query"]:
            for page_id, page in data["query"]["pages"].items():
                title = page.get("title", "")
                if not is_valid_photo_title(title, wf_name):
                    continue
                info = page.get("imageinfo", [{}])[0]
                img_url = info.get("url")
                if not img_url:
                    continue
                # Skip tiny icons or SVGs
                if img_url.endswith('.svg') or info.get("width", 0) < 500:
                    continue
                
                ext = info.get("extmetadata", {})
                artist = ext.get("Artist", {}).get("value", "Wikimedia Commons")
                clean_artist = re.sub(r'<[^<]+>', '', artist).strip() or "Wikimedia Commons"
                desc = ext.get("ImageDescription", {}).get("value", "")
                clean_desc = re.sub(r'<[^<]+>', '', desc).strip()
                caption = clean_desc[:120] if clean_desc else f"Scenic view of {wf_name}"

                photos.append({
                    "image_url": img_url,
                    "credit_name": clean_artist[:100],
                    "caption": caption
                })
                if len(photos) >= limit:
                    break
    except Exception as e:
        print(f"Error fetching category {category_name}: {e}")
    return photos

def search_wikimedia_files(wf_name, county, limit=4):
    url = "https://commons.wikimedia.org/w/api.php"
    # Search specific queries
    queries = [
        f'"{wf_name}" Michigan',
        f'"{wf_name}"',
        f'{wf_name} waterfall'
    ]
    photos = []
    seen_urls = set()

    for q in queries:
        if len(photos) >= limit:
            break
        params = {
            "action": "query",
            "format": "json",
            "generator": "search",
            "gsrsearch": f"{q} -sign -map -pyrite -plaque",
            "gsrnamespace": 6,
            "gsrlimit": 10,
            "prop": "imageinfo",
            "iiprop": "url|extmetadata|dimensions"
        }
        try:
            r = requests.get(url, params=params, headers=WIKI_HEADERS, timeout=10)
            data = r.json()
            if "query" in data and "pages" in data["query"]:
                for page_id, page in data["query"]["pages"].items():
                    title = page.get("title", "")
                    if not is_valid_photo_title(title, wf_name):
                        continue
                    info = page.get("imageinfo", [{}])[0]
                    img_url = info.get("url")
                    if not img_url or img_url in seen_urls:
                        continue
                    if img_url.endswith('.svg') or info.get("width", 0) < 500:
                        continue
                    
                    seen_urls.add(img_url)
                    ext = info.get("extmetadata", {})
                    artist = ext.get("Artist", {}).get("value", "Wikimedia Commons")
                    clean_artist = re.sub(r'<[^<]+>', '', artist).strip() or "Wikimedia Commons"
                    desc = ext.get("ImageDescription", {}).get("value", "")
                    clean_desc = re.sub(r'<[^<]+>', '', desc).strip()
                    caption = clean_desc[:120] if clean_desc else f"Scenic view of {wf_name}"

                    photos.append({
                        "image_url": img_url,
                        "credit_name": clean_artist[:100],
                        "caption": caption
                    })
                    if len(photos) >= limit:
                        break
        except Exception as e:
            pass
        time.sleep(0.3)

    return photos

def find_all():
    # Fetch waterfalls from Supabase
    r = requests.get(f"{SUPABASE_URL}/rest/v1/waterfalls?select=id,name,county&order=name.asc", headers=headers)
    if not r.ok:
        print("Failed to fetch waterfalls:", r.text)
        return

    waterfalls = r.json()
    print(f"Loaded {len(waterfalls)} waterfalls from database.")

    # Known direct category mappings for major UP waterfalls
    CATEGORY_MAP = {
        'Tahquamenon Falls (Upper)': 'Category:Tahquamenon_Falls',
        'Tahquamenon Falls (Lower)': 'Category:Tahquamenon_Falls',
        'Bond Falls': 'Category:Bond_Falls',
        'Miners Falls': 'Category:Miners_Falls',
        'Munising Falls': 'Category:Munising_Falls',
        'Laughing Whitefish Falls': 'Category:Laughing_Whitefish_Falls',
        'Agate Falls': 'Category:Agate_Falls',
        'Wagner Falls': 'Category:Wagner_Falls_Scenic_Site',
        'Sable Falls': 'Category:Sable_Falls',
        'Chapel Falls': 'Category:Chapel_Falls',
        'Mosquito Falls': 'Category:Mosquito_Falls',
        'Spray Falls': 'Category:Spray_Falls_(Michigan)',
        'Au Train Falls': 'Category:Au_Train_Falls',
        'Canyon Falls': 'Category:Canyon_Falls_(Michigan)',
        'Eagle River Falls': 'Category:Eagle_River_Falls',
        'Hungarian Falls': 'Category:Hungarian_Falls',
        'Manabezho Falls': 'Category:Manabezho_Falls',
        'Manido Falls': 'Category:Manido_Falls',
        'Nawadaha Falls': 'Category:Nawadaha_Falls',
        'Gorge Falls': 'Category:Gorge_Falls',
        'Haven Falls': 'Category:Haven_Falls',
        'Memorial Falls': 'Category:Memorial_Falls',
        'Tannery Falls': 'Category:Tannery_Falls',
        'Scott Falls': 'Category:Scott_Falls',
        'Superior Falls': 'Category:Superior_Falls',
        'Bonanza Falls': 'Category:Bonanza_Falls',
        'O-Kun-de-Kun Falls': 'Category:O_Kun_de_Kun_Falls',
        'Potato River Falls': 'Category:Potato_River_Falls'
    }

    results = {}
    
    # Process mapped first
    print("\n--- Phase 1: Checking Major Mapped Categories ---")
    for wf in waterfalls:
        name = wf['name']
        if name in CATEGORY_MAP:
            cat = CATEGORY_MAP[name]
            photos = get_photos_for_category(cat, name, limit=4)
            if photos:
                results[wf['id']] = {
                    "name": name,
                    "photos": photos
                }
                print(f"✅ {name}: Found {len(photos)} authentic category photos")
            time.sleep(0.3)

    print(f"\nPhase 1 Complete: {len(results)} waterfalls matched.")

    # Phase 2: Search for other popular waterfalls
    print("\n--- Phase 2: Searching for Other Falls with Verified Photos ---")
    count = 0
    for wf in waterfalls:
        if wf['id'] in results:
            continue
        name = wf['name']
        # Search Wikimedia
        photos = search_wikimedia_files(name, wf.get('county', ''), limit=3)
        if photos:
            results[wf['id']] = {
                "name": name,
                "photos": photos
            }
            print(f"✅ {name}: Found {len(photos)} photo(s)")
            count += 1
            if count >= 25: # Test batch
                break

    print(f"\nTotal waterfalls with authentic photos found: {len(results)}")
    return results

if __name__ == '__main__':
    find_all()
