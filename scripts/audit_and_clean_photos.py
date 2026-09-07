import os
import re
import urllib3
import requests
from dotenv import load_dotenv

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
load_dotenv(".env.local")

SUPABASE_URL = os.environ.get("VITE_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("VITE_SUPABASE_ANON_KEY")

headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation"
}

# Negative keywords for non-waterfall images
BAD_PATTERNS = [
    r'pyrite', r'mineral', r'specimen', r'crystal',
    r'sign', r'plaque', r'marker', r'monument',
    r'map', r'diagram', r'flag', r'logo',
    r'building', r'bridge', r'road', r'highway',
    r'campsite', r'tent', r'park_entrance',
    r'pictured_rocks_2025u',
    r'porcupine_mountains_wilderness_state_park_in_spring_2023_-_425'
]

def audit_photos():
    print("Connecting to Supabase at", SUPABASE_URL)
    try:
        r = requests.get(
            f"{SUPABASE_URL}/rest/v1/waterfall_photos?select=id,waterfall_id,image_url,caption,is_hero,waterfalls(name,county)",
            headers=headers,
            verify=False,
            timeout=10
        )
    except Exception as e:
        print(f"Connection failed: {e}")
        print("Note: If Supabase free tier has paused, unpause it in the Supabase Dashboard.")
        return

    if not r.ok:
        print("Failed to fetch photos:", r.text)
        return

    photos = r.json()
    print(f"Total photos in database: {len(photos)}")

    flagged = []
    for p in photos:
        url_lower = p.get('image_url', '').lower()
        caption_lower = p.get('caption', '').lower()
        matched = []
        for pat in BAD_PATTERNS:
            if re.search(pat, url_lower) or re.search(pat, caption_lower):
                matched.append(pat)
        if matched:
            wf_info = p.get('waterfalls') or {}
            wf_name = wf_info.get('name', 'Unknown')
            flagged.append((p['id'], wf_name, matched, p['image_url']))

    print(f"\nAudit completed. Found {len(flagged)} suspect non-waterfall photo(s):")
    for pid, wf_name, matched, url in flagged:
        print(f"  ❌ [{wf_name}] matched: {matched} -> {url}")

    if flagged:
        print("\nTo purge these from Supabase, run clean_photos.sql in your Supabase SQL Editor.")

if __name__ == '__main__':
    audit_photos()
