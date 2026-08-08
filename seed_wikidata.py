import requests
import json
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

url = 'https://query.wikidata.org/sparql'
query = """
SELECT ?item ?itemLabel ?coord ?image
WHERE 
{
  ?item wdt:P31 wd:Q34038. # instance of waterfall
  ?item wdt:P131* wd:Q1166. # located in administrative territorial entity Michigan
  OPTIONAL { ?item wdt:P625 ?coord. }
  OPTIONAL { ?item wdt:P18 ?image. }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
"""
try:
    headers = {
        'User-Agent': 'UpWaterfallsBot/1.0 (contact@example.com)'
    }
    r = requests.get(url, params={'format': 'json', 'query': query}, headers=headers, verify=False)
    data = r.json()
    waterfalls = []
    for row in data['results']['bindings']:
        waterfalls.append({
            'name': row.get('itemLabel', {}).get('value', ''),
            'coord': row.get('coord', {}).get('value', ''),
            'image': row.get('image', {}).get('value', '')
        })
    print(f"Wikidata found {len(waterfalls)} waterfalls in Michigan.")
except Exception as e:
    print(e)
