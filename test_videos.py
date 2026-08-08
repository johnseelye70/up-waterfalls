import urllib.request
import json
import ssl
import sys

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def search_commons_videos(category):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:{category}&cmtype=file&cmlimit=500&format=json"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, context=ctx) as response:
            data = json.loads(response.read().decode())
            members = data.get('query', {}).get('categorymembers', [])
            videos = [m['title'] for m in members if m['title'].lower().endswith(('.webm', '.ogv', '.mp4'))]
            return videos
    except Exception as e:
        print(f"Error fetching category {category}: {e}")
        return []

categories = ["Waterfalls_in_Michigan", "Waterfalls_in_the_Upper_Peninsula_of_Michigan"]

total_videos = []
for cat in categories:
    videos = search_commons_videos(cat)
    print(f"Found {len(videos)} videos in {cat}")
    total_videos.extend(videos)

print("Videos found:", set(total_videos))
