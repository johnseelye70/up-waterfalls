import urllib.request
import ssl
import re

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

url = 'https://www.uptravel.com/outdoors-recreation/waterfalls/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    res = urllib.request.urlopen(req, context=ctx).read().decode('utf-8')
    print("Listing links:")
    print(re.findall(r'/listings?/[^\'\"]+', res))
    
    print("\nAPI links:")
    print(re.findall(r'/api/[^\'\"]+', res))
    
    print("\nIncludes links:")
    print(set(re.findall(r'/includes/public/custom/[^\'\"]+', res)))
except Exception as e:
    print(e)
