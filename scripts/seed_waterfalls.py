import os
import uuid
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables
load_dotenv(dotenv_path='.env.local')

url: str = os.environ.get("VITE_SUPABASE_URL")
key: str = os.environ.get("VITE_SUPABASE_ANON_KEY")

if not url or not key:
    print("Missing Supabase URL or Key in .env.local")
    exit(1)

supabase: Client = create_client(url, key)

waterfalls_data = [
    {
        "name": "Hungarian Falls",
        "county": "Houghton",
        "region": "Keweenaw Peninsula",
        "latitude": 47.1912,
        "longitude": -88.4231,
        "drop_height": "50 ft",
        "hike_difficulty": "Moderate",
        "trail_length_miles": 1.5,
        "parking_type": "Roadside",
        "pass_required": "No",
        "historical_notes": "Site of historic copper mining dams.",
        "description": "Three distinct cascading drops over ancient red sandstone in Dover Creek."
    },
    {
        "name": "Miners Falls",
        "county": "Alger",
        "region": "Munising Area",
        "latitude": 46.4522,
        "longitude": -86.5367,
        "drop_height": "50 ft",
        "hike_difficulty": "Easy",
        "trail_length_miles": 1.2,
        "parking_type": "Paved Lot",
        "pass_required": "NPS Pass",
        "historical_notes": "Part of Pictured Rocks National Lakeshore.",
        "description": "A powerful 50-foot waterfall plunging over sandstone ledges into a lush ravine near Lake Superior."
    },
    {
        "name": "Bond Falls",
        "county": "Ontonagon",
        "region": "Western UP",
        "latitude": 46.4069,
        "longitude": -89.1307,
        "drop_height": "50 ft",
        "hike_difficulty": "Easy",
        "trail_length_miles": 0.5,
        "parking_type": "Paved Lot",
        "pass_required": "Michigan Recreation Passport",
        "historical_notes": "Created by a dam built by the Upper Peninsula Power Company.",
        "description": "Large 50-foot wide cascading waterfall over fractured volcanic rock with extensive wooden boardwalks."
    },
    {
        "name": "Tahquamenon Falls (Upper)",
        "county": "Luce",
        "region": "Eastern UP",
        "latitude": 46.5746,
        "longitude": -85.2575,
        "drop_height": "50 ft",
        "hike_difficulty": "Easy",
        "trail_length_miles": 0.8,
        "parking_type": "Large Paved Lot",
        "pass_required": "Michigan Recreation Passport",
        "historical_notes": "The amber color comes from tannins leached from cedar, spruce and hemlock swamps.",
        "description": "One of the largest waterfalls east of the Mississippi, known for its distinctive amber colored water."
    },
    {
        "name": "Wagner Falls",
        "county": "Alger",
        "region": "Munising Area",
        "latitude": 46.3861,
        "longitude": -86.6343,
        "drop_height": "20 ft",
        "hike_difficulty": "Very Easy",
        "trail_length_miles": 0.2,
        "parking_type": "Small Gravel Lot",
        "pass_required": "Michigan Recreation Passport",
        "historical_notes": "A designated Michigan State Scenic Site.",
        "description": "A picturesque, easily accessible cascade over dolomite rock formations."
    }
]

def run():
    print("Seeding waterfalls to Supabase...")
    for wf in waterfalls_data:
        try:
            response = supabase.table('waterfalls').insert(wf).execute()
            print(f"✅ Inserted: {wf['name']}")
        except Exception as e:
            print(f"❌ Error inserting {wf['name']}: {str(e)}")

    print("Seeding complete.")

if __name__ == "__main__":
    run()
