import urllib.request
import re
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req = urllib.request.Request('https://www.uptravel.com/outdoors-recreation/waterfalls/', headers={'User-Agent': 'Mozilla/5.0'})
try:
    res = urllib.request.urlopen(req, context=ctx).read().decode('utf-8')
    print("Links:")
    for link in re.findall(r'href=[\'"]([^\'"]+)[\'"]', res):
        if 'waterfall' in link.lower() or 'listing' in link.lower() or 'detail' in link.lower():
            print(link)
    
    # Try to find Simpleview CRM JSON
    matches = re.findall(r'window\.svData\s*=\s*({.*?});', res, re.DOTALL)
    if matches:
        data = json.loads(matches[0])
        print("\nSV Data Keys:", data.keys())

except Exception as e:
    print(e)
