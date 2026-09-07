export interface CuratedExpedition {
  id: string
  title: string
  subtitle: string
  region: string
  badge: string
  estimatedDays: string
  description: string
  highlights: string[]
  pitstops: Array<{ name: string; type: string; note: string }>
  stopIds: string[]
}

export const CURATED_EXPEDITIONS: CuratedExpedition[] = [
  {
    id: 'pictured-rocks-classic',
    title: 'The Pictured Rocks Iconic Circuit',
    subtitle: 'Sandstone cliffs, emerald canyons, and dune rivers',
    region: 'Central UP (Alger County)',
    badge: 'NPS Scenic Corridor',
    estimatedDays: '1 Full Day or 2 Days',
    description: 'Explore the crown jewels of America\'s first National Lakeshore. From the paved amphitheater of Munising Falls to the sheer 50-ft cliff plunge of Miners Falls, the ancient hemlock forest of Chapel Falls, and the roaring multi-tiered dune cascade of Sable Falls near Grand Marais.',
    highlights: [
      'Munising Falls barrier-free canyon overlook',
      'Miners Falls 50-ft sheer sandstone drop',
      'Chapel Falls 60-ft wilderness plunge on Section 34 Creek',
      'Sable Falls 168-step staircase down to Lake Superior beach'
    ],
    pitstops: [
      { name: 'Falling Rock Books & Cafe', type: 'Breakfast & Coffee', note: 'Munising - Iconic artisan coffee, books, and fresh bakery' },
      { name: 'Muldoon\'s Pasties', type: 'Traditional Lunch', note: 'Munising - Award-winning beef, chicken, and veggie pasties' },
      { name: 'Lake Superior Brewing Co.', type: 'Dinner & Brews', note: 'Grand Marais - Craft beer and fresh whitefish baskets' }
    ],
    stopIds: [
      'cf82a777-92dc-4c8c-a62b-93a10628ef99', // Munising Falls
      '78a26f63-e56c-4648-a3d6-250f61593596', // Miners Falls
      '5618aa82-9fe5-460d-af26-361fcb612107', // Chapel Falls
      'fcd86b67-70a7-4c02-8225-e4eb1944e694'  // Sable Falls
    ]
  },
  {
    id: 'black-river-scenic-byway',
    title: 'Black River National Forest Scenic Byway',
    subtitle: 'Five thunderous cataracts along an ancient Midcontinent volcanic rift',
    region: 'Western UP (Gogebic County)',
    badge: 'National Forest Byway',
    estimatedDays: 'Half-Day (4-5 Hours)',
    description: 'A 14-mile designated National Forest Scenic Byway winding along the churning Black River from Bessemer north to Lake Superior. This compact corridor features five world-class waterfalls in rapid succession, culminating at the historic Black River Harbor.',
    highlights: [
      'Great Conglomerate Falls divided by colossal puddingstone boulders',
      'Potawatomi Falls 130-ft wide barrier-free observation boardwalk',
      'Gorge Falls plunging through a violent 20-ft sheer chasm',
      'Sandstone Falls colorful red rock riverbed steps',
      'Rainbow Falls 45-ft mist cataract casting afternoon rainbows'
    ],
    pitstops: [
      { name: 'Black River Lodge & Cafe', type: 'Comfort Food', note: 'Bessemer - Cozy Northwoods lodge near the scenic byway entrance' },
      { name: 'Black River Harbor Pavilion', type: 'Scenic Picnic', note: 'Harbor - Covered lakeside picnic tables overlooking Lake Superior' }
    ],
    stopIds: [
      '27d5be10-9954-4bf4-96da-c17a27be8a80', // Great Conglomerate Falls
      'c53947b5-f38f-4135-af73-558a45044edc', // Potawatomi Falls
      'd326788e-c027-4b39-8616-1fad3bac4c7b', // Gorge Falls
      'fe8ac0ba-b534-4b3e-99ee-c5c6477d3038', // Sandstone Falls
      '9768a31f-0db9-404f-bac7-af97b4dd7dfa'  // Rainbow Falls
    ]
  },
  {
    id: 'keweenaw-copper-country',
    title: 'Keweenaw Copper Country Loop',
    subtitle: 'Michigan\'s highest drops and historic 19th-century mining ruins',
    region: 'Keweenaw Peninsula (Houghton & Keweenaw Counties)',
    badge: 'Historic Copper Trail',
    estimatedDays: '1 Full Day',
    description: 'Climb the Keweenaw Peninsula along Lake Superior\'s rugged shoreline. Experience Douglass - Houghton Falls (Michigan\'s tallest waterfall at 110 ft), the multi-drop sandstone ledges of Hungarian Falls, the historic timber dam at Eagle River, Jacob\'s Falls beside the monk bakery, and the narrow volcanic fissure of Manganese Gorge.',
    highlights: [
      'Lower Hungarian Falls 50-ft red Jacobsville sandstone amphitheater',
      'Douglass - Houghton Falls 110-ft volcanic ravine plunge',
      'Eagle River Falls and historic timber pedestrian bridge on M-26',
      'Jacob\'s Falls tiered roadside cascade by The Jampot',
      'Manganese Gorge Falls moss-draped 45-ft chasm'
    ],
    pitstops: [
      { name: 'The Jampot Monks Bakery', type: 'Bakery & Preserves', note: 'Eagle Harbor - Famous fruitcakes, jams, and muffins made by Byzantine Catholic monks' },
      { name: 'Fitzgerald\'s Restaurant', type: 'Legendary BBQ & Bar', note: 'Eagle River - Renowned smokehouse brisket and whiskey right on Lake Superior' },
      { name: 'Suomi Home Bakery & Cafe', type: 'Finnish Breakfast', note: 'Houghton - Authentic pannukakku Finnish pancakes and cardamom braid' }
    ],
    stopIds: [
      'bf905ef2-70a4-421a-8879-7ab41457ac75', // Lower Hungarian Falls
      'd603a7c9-385f-4519-aee0-1337975e0d26', // Douglass - Houghton Falls
      'b89f02f1-69f0-47ee-9482-04c0bef56b25', // Eagle River Falls
      '29294467-23f9-42a4-9a09-4db99c84b104', // Jacob's Falls
      'be9008a8-d854-4538-b261-31736a128682'  // Manganese Gorge Falls
    ]
  },
  {
    id: 'porcupine-mountains-western-gorges',
    title: 'Porcupine Mountains & Western Gorges',
    subtitle: 'Wilderness solitude, old-growth hemlocks, and terraced shale riverbeds',
    region: 'Western UP (Ontonagon & Gogebic Counties)',
    badge: 'Wilderness State Park',
    estimatedDays: '1 to 2 Days',
    description: 'Immerse yourself in the Midwest\'s largest old-growth wilderness. Visit the celebrated Bond Falls boardwalk, the terraced river wide shelf at Agate Falls, secluded backcountry cascades on the Little Carp River, and the thunderous Presque Isle River trio where the forest meets Lake Superior.',
    highlights: [
      'Bond Falls 100-ft wide cascading veil and wraparound boardwalk',
      'Agate Falls terraced rock shelves beneath the historic railroad trestle',
      'Overlooked & Greenstone Falls peaceful hemlock riverbed solitude',
      'Manabezho Falls 150-ft broad shale ledge roar at Presque Isle River mouth',
      'Manido Falls circular potholes carved into prehistoric bedrock'
    ],
    pitstops: [
      { name: 'Konteka Black Bear Restaurant', type: 'Dinner & Bowling', note: 'White Pine - Watch live black bears through dining room viewing windows' },
      { name: 'Syl\'s Cafe', type: 'Breakfast & Pasties', note: 'Ontonagon - Homemade berry pies, hearty breakfasts, and fresh pasties' }
    ],
    stopIds: [
      'da36e4f3-d295-4e09-a5d4-91ec4701d423', // Bond Falls
      '22ab77c2-ece7-428b-a547-17fe4a5af4db', // Agate Falls
      '4a4809f4-d75f-4a92-8a5b-39c7f9ab91ac', // Overlooked Falls
      'c2f3c031-13d8-4d26-bd23-e00ade219c56', // Greenstone Falls
      'b00b2bfa-6c37-4fce-ab53-0a52f24cf723', // Manabezho Falls
      'b5a816e7-a9fe-4e28-bf1d-30545ff3ec2f'  // Manido Falls
    ]
  },
  {
    id: 'marquette-backcountry-explorer',
    title: 'Marquette Backcountry Explorer',
    subtitle: 'Rugged granitic river gorges and pristine Wild & Scenic waterways',
    region: 'Central UP (Marquette County)',
    badge: 'Rugged Trail Trek',
    estimatedDays: '1 Full Day',
    description: 'A thrilling expedition through the heart of Marquette County. Hike the rugged rock scrambles of Dead River Falls, the secluded hemlock canyon of Morgan Falls, the federally protected Wild & Scenic Yellow Dog Falls, and roadside Warner Falls in the historic iron mining range.',
    highlights: [
      'Dead River Falls 90-ft multi-tiered rocky canyon scramble',
      'Morgan Falls peaceful footbridge overlook on the South Trails network',
      'Yellow Dog Falls pristine wilderness cataract on granite bedrock',
      'Warner Falls roadside drop cascading over iron range quartzite'
    ],
    pitstops: [
      { name: 'Iron Bay Restaurant & Drinkery', type: 'Dinner & Harbor View', note: 'Marquette - Historic iron dock setting with craft cocktails and Lake Superior fish' },
      { name: 'Jean Kay\'s Pasties', type: 'Local Lunch', note: 'Marquette - Traditional rutabaga or vegetarian pasties served hot with gravy' },
      { name: 'Dead River Coffee Roasters', type: 'Artisan Coffee', note: 'Marquette - Bold small-batch roasted coffee in downtown Marquette' }
    ],
    stopIds: [
      '49452338-6e6e-4bbd-9967-bcd60642131b', // Dead River Falls
      '7fcdf4e3-7010-41fb-b8e2-811a9906cf31', // Morgan Falls
      '9e15a7c5-8573-4c26-8c63-ac6498830d0b', // Yellow Dog Falls
      '4d721036-5878-4ed7-96a7-f8af07db9d14'  // Warner Falls
    ]
  }
]

/**
 * Calculates straight-line distance using the Haversine formula,
 * adjusted with a 1.28x curvature multiplier for Upper Peninsula rural trunklines.
 */
export function calculateDrivingLeg(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): { distanceMiles: number; driveMinutes: number; formattedDuration: string } {
  const R = 3958.8 // Radius of the earth in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const straightLine = R * c

  // UP roads navigate forests, swamps, and ridges; apply 1.28x road winding factor
  const roadMiles = Math.max(0.5, Math.round(straightLine * 1.28 * 10) / 10)

  // Average UP rural speed ~48 mph including turns and park access roads
  const driveMinutes = Math.max(3, Math.round((roadMiles / 48) * 60))

  let formattedDuration = `${driveMinutes} min`
  if (driveMinutes >= 60) {
    const hrs = Math.floor(driveMinutes / 60)
    const mins = driveMinutes % 60
    formattedDuration = mins > 0 ? `${hrs} hr ${mins} min` : `${hrs} hr`
  }

  return {
    distanceMiles: roadMiles,
    driveMinutes,
    formattedDuration
  }
}

/**
 * Constructs a multi-stop turn-by-turn navigation URL for Google Maps.
 */
export function getGoogleMapsMultiStopUrl(
  stops: Array<{ latitude: number; longitude: number; name: string }>
): string {
  if (stops.length === 0) return 'https://www.google.com/maps'
  if (stops.length === 1) {
    return `https://www.google.com/maps/search/?api=1&query=${stops[0].latitude},${stops[0].longitude}`
  }

  const origin = `${stops[0].latitude},${stops[0].longitude}`
  const destination = `${stops[stops.length - 1].latitude},${stops[stops.length - 1].longitude}`
  const waypoints = stops
    .slice(1, -1)
    .map(s => `${s.latitude},${s.longitude}`)
    .join('|')

  let url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`
  if (waypoints) {
    url += `&waypoints=${encodeURIComponent(waypoints)}`
  }
  return url
}

/**
 * Optimizes the stop sequence to minimize total driving distance
 * using a greedy nearest-neighbor solver starting from the first stop.
 */
export function optimizeStopSequence<T extends { latitude: number; longitude: number }>(
  items: T[]
): T[] {
  if (items.length <= 2) return [...items]

  const remaining = [...items]
  const optimized: T[] = [remaining.shift()!]

  while (remaining.length > 0) {
    const current = optimized[optimized.length - 1]
    let nearestIndex = 0
    let minDistance = Infinity

    for (let i = 0; i < remaining.length; i++) {
      const candidate = remaining[i]
      const dist = calculateDrivingLeg(
        current.latitude,
        current.longitude,
        candidate.latitude,
        candidate.longitude
      ).distanceMiles

      if (dist < minDistance) {
        minDistance = dist
        nearestIndex = i
      }
    }

    optimized.push(remaining.splice(nearestIndex, 1)[0])
  }

  return optimized
}
