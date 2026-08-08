import requests
import urllib3
urllib3.disable_warnings()

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
    
    headers = {
        "User-Agent": "UPWaterfallsBot/1.0 (contact@seelye.info)"
    }
    
    response = requests.get(url, params=params, headers=headers, verify=False)
    data = response.json()
    
    if "query" in data and "pages" in data["query"]:
        pages = data["query"]["pages"]
        for page_id in pages:
            image_info = pages[page_id].get("imageinfo", [{}])[0]
            url = image_info.get("url")
            ext = image_info.get("extmetadata", {})
            credit = ext.get("Credit", {}).get("value", "")
            return url, credit
    return None, None

names = ["Tahquamenon Falls", "Bond Falls", "Agate Falls", "Hungarian Falls"]
for name in names:
    print(f"Testing {name}...")
    url, credit = search_wikimedia(name)
    print(f"URL: {url}")
    
