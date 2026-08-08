import requests
import re
import json
import urllib3
urllib3.disable_warnings()

url = "https://shorelinescout.com/michigan/waterfalls/upper-peninsula/"
r = requests.get(url, verify=False)
content = r.text

match = re.search(r'const waterfallData = (\[.*?\]);', content, re.DOTALL)
if match:
    data_str = match.group(1)
    # The string might have some JS specific stuff, but it looks like standard JSON
    try:
        data = json.loads(data_str)
        print(f"Extracted {len(data)} waterfalls!")
        with open('shoreline_waterfalls.json', 'w') as f:
            json.dump(data, f, indent=2)
    except Exception as e:
        print("Failed to parse JSON:", e)
        print(data_str[:500])
else:
    print("Could not find waterfallData")
