import requests
import json
import re

import urllib3
urllib3.disable_warnings()

url = "https://shorelinescout.com/michigan/waterfalls/upper-peninsula/"
r = requests.get(url, verify=False)
content = r.text

# Look for JSON arrays or objects that might contain lat/lon or location data
matches = re.finditer(r'<script.*?>\s*(.*?lat.*?)\s*</script>', content, re.IGNORECASE | re.DOTALL)
for match in matches:
    print("Found a script with 'lat':")
    print(match.group(1)[:500])
    print("...")
