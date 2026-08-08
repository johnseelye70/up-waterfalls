import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const url = process.env.VITE_SUPABASE_URL
const key = process.env.VITE_SUPABASE_ANON_KEY

if (!url || !key) {
    console.error("Missing Supabase URL or Key in .env.local")
    process.exit(1)
}

const supabase = createClient(url, key)

const waterfallsData = [
    {
        name: "Hungarian Falls",
        county: "Houghton",
        region: "Keweenaw Peninsula",
        latitude: 47.1912,
        longitude: -88.4231,
        drop_height: "50 ft",
        hike_difficulty: "Moderate",
        trail_length_miles: 1.5,
        parking_type: "Roadside",
        pass_required: "No",
        historical_notes: "Site of historic copper mining dams.",
        description: "Three distinct cascading drops over ancient red sandstone in Dover Creek."
    },
    {
        name: "Miners Falls",
        county: "Alger",
        region: "Munising Area",
        latitude: 46.4522,
        longitude: -86.5367,
        drop_height: "50 ft",
        hike_difficulty: "Easy",
        trail_length_miles: 1.2,
        parking_type: "Paved Lot",
        pass_required: "NPS Pass",
        historical_notes: "Part of Pictured Rocks National Lakeshore.",
        description: "A powerful 50-foot waterfall plunging over sandstone ledges into a lush ravine near Lake Superior."
    },
    {
        name: "Bond Falls",
        county: "Ontonagon",
        region: "Western UP",
        latitude: 46.4069,
        longitude: -89.1307,
        drop_height: "50 ft",
        hike_difficulty: "Easy",
        trail_length_miles: 0.5,
        parking_type: "Paved Lot",
        pass_required: "Michigan Recreation Passport",
        historical_notes: "Created by a dam built by the Upper Peninsula Power Company.",
        description: "Large 50-foot wide cascading waterfall over fractured volcanic rock with extensive wooden boardwalks."
    },
    {
        name: "Tahquamenon Falls (Upper)",
        county: "Luce",
        region: "Eastern UP",
        latitude: 46.5746,
        longitude: -85.2575,
        drop_height: "50 ft",
        hike_difficulty: "Easy",
        trail_length_miles: 0.8,
        parking_type: "Large Paved Lot",
        pass_required: "Michigan Recreation Passport",
        historical_notes: "The amber color comes from tannins leached from cedar, spruce and hemlock swamps.",
        description: "One of the largest waterfalls east of the Mississippi, known for its distinctive amber colored water."
    },
    {
        name: "Wagner Falls",
        county: "Alger",
        region: "Munising Area",
        latitude: 46.3861,
        longitude: -86.6343,
        drop_height: "20 ft",
        hike_difficulty: "Very Easy",
        trail_length_miles: 0.2,
        parking_type: "Small Gravel Lot",
        pass_required: "Michigan Recreation Passport",
        historical_notes: "A designated Michigan State Scenic Site.",
        description: "A picturesque, easily accessible cascade over dolomite rock formations."
    }
]

async function run() {
    console.log("Seeding waterfalls to Supabase...")
    for (const wf of waterfallsData) {
        const { error } = await supabase.from('waterfalls').insert(wf)
        if (error) {
            console.error(`Error inserting ${wf.name}: ${error.message}`)
        } else {
            console.log(`✅ Inserted: ${wf.name}`)
        }
    }
    console.log("Seeding complete.")
}

run()
