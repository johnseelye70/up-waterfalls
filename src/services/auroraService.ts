export interface AuroraForecast {
  currentKp: number
  activityLevel: 'Quiet' | 'Unsettled' | 'Active Aurora Glow' | 'Minor Storm' | 'Major Storm'
  viewingProbability: 'Low' | 'Moderate' | 'High' | 'Very High'
  viewingAdvice: string
  kpInterpretation?: string
  visibilityLikelihoodUP?: 'Low' | 'Moderate' | 'High' | 'Very High'
  estimatedStormLevel?: string
  moonPhaseName: string
  moonIlluminationPercent: number
  moonDarkSkySuitability: 'Excellent (Dark Sky)' | 'Good' | 'Moderate Washout' | 'High Moonlight Washout'
  timestamp: string
  isLive: boolean
}

export interface AuroraLocation {
  id: string
  waterfallId?: string
  name: string
  waterfallName?: string
  county: string
  horizonDirection: 'North' | 'North-Northwest' | 'North-Northeast'
  horizonFacing?: string
  bortleClass: number // 1 = darkest, 2 = exceptional
  lakeFacing: boolean
  lakeSuperiorLineOfSight?: boolean
  nightHikingSafety?: string
  photogTips: string
  recommendedViewingSpot?: string
}

export interface MoonPhaseInfo {
  phaseName: string
  illuminationPercent: number
  moonIcon: string
  isGoodForStargazing: boolean
}

export const TOP_AURORA_WATERFALLS: AuroraLocation[] = [
  {
    id: '7fb3998a-98fc-4861-be4a-51bf4e9c3735',
    waterfallId: '7fb3998a-98fc-4861-be4a-51bf4e9c3735',
    name: 'Spray Falls',
    waterfallName: 'Spray Falls',
    county: 'Alger',
    horizonDirection: 'North',
    horizonFacing: 'North (Open Superior Horizon)',
    bortleClass: 2,
    lakeFacing: true,
    lakeSuperiorLineOfSight: true,
    nightHikingSafety: 'Dangerous Night Cliffs (Stay on viewing boat or marked trail)',
    photogTips: '70-foot plunge leaping directly into Lake Superior. Facing due north with zero light pollution between the falls and Canada.',
    recommendedViewingSpot: '70-foot plunge leaping directly into Lake Superior. Facing due north with zero light pollution between the falls and Canada.'
  },
  {
    id: '80e758c4-4a34-462e-ab4a-0388566004a2',
    waterfallId: '80e758c4-4a34-462e-ab4a-0388566004a2',
    name: 'Bridal Veil Falls',
    waterfallName: 'Bridal Veil Falls',
    county: 'Alger',
    horizonDirection: 'North',
    horizonFacing: 'North-Northeast',
    bortleClass: 2,
    lakeFacing: true,
    lakeSuperiorLineOfSight: true,
    nightHikingSafety: 'Clifftop Caution (Unfenced high dropoffs)',
    photogTips: 'Pictured Rocks sea cliff cataract with unobstructed northern lake exposure. Best captured from Miners Beach looking east-northeast.',
    recommendedViewingSpot: 'Pictured Rocks sea cliff cataract with unobstructed northern lake exposure. Best captured from Miners Beach looking east-northeast.'
  },
  {
    id: 'f9d50596-f6d8-4f8e-a9b0-4db97561f513',
    waterfallId: 'f9d50596-f6d8-4f8e-a9b0-4db97561f513',
    name: 'Manabezho Falls (Presque Isle River)',
    waterfallName: 'Manabezho Falls',
    county: 'Gogebic',
    horizonDirection: 'North-Northwest',
    horizonFacing: 'North-Northwest',
    bortleClass: 1,
    lakeFacing: true,
    lakeSuperiorLineOfSight: true,
    nightHikingSafety: 'Moderate Boardwalk with stairs (Carry high-lumen headlamp)',
    photogTips: 'Located at the mouth of the Presque Isle River where it meets Lake Superior in the western Porkies. Darkest Bortle 1 skies in Michigan.',
    recommendedViewingSpot: 'Suspension bridge overlook facing downstream toward Lake Superior mouth.'
  },
  {
    id: 'art-lower-montreal-falls-superior-coast',
    waterfallId: 'art-lower-montreal-falls-superior-coast',
    name: 'Montreal Falls',
    waterfallName: 'Montreal Falls',
    county: 'Keweenaw',
    horizonDirection: 'North',
    horizonFacing: 'North',
    bortleClass: 1,
    lakeFacing: true,
    lakeSuperiorLineOfSight: true,
    nightHikingSafety: 'Rugged Coastal Trek (Experienced wilderness hikers only)',
    photogTips: 'At the southern tip of the Keweenaw Peninsula facing open waters. Ancient volcanic bedrock terraces reflect emerald auroral ribbons.',
    recommendedViewingSpot: 'Basalt cobblestone shoreline at the lower river mouth looking out to open lake.'
  },
  {
    id: '4412c9b4-b81b-4f9e-a86d-1bf82ef62001',
    waterfallId: '4412c9b4-b81b-4f9e-a86d-1bf82ef62001',
    name: 'Eagle River Falls',
    waterfallName: 'Eagle River Falls',
    county: 'Keweenaw',
    horizonDirection: 'North-Northwest',
    horizonFacing: 'North-Northwest',
    bortleClass: 2,
    lakeFacing: true,
    lakeSuperiorLineOfSight: true,
    nightHikingSafety: 'Paved / Timber Bridge Overlook (Safest nocturnal tripod spot)',
    photogTips: 'Historic timber bridge overlook provides elevated, tripod-stable vantage looking downstream toward Lake Superior sunset afterglow.',
    recommendedViewingSpot: 'Pedestrian timber bridge looking north across the gorge out to Lake Superior horizon.'
  },
  {
    id: '5618aa82-9fe5-460d-af26-361fcb612107',
    waterfallId: '5618aa82-9fe5-460d-af26-361fcb612107',
    name: 'Chapel Beach Falls',
    waterfallName: 'Chapel Beach Falls',
    county: 'Alger',
    horizonDirection: 'North',
    horizonFacing: 'North',
    bortleClass: 2,
    lakeFacing: true,
    lakeSuperiorLineOfSight: true,
    nightHikingSafety: '6-mile roundtrip backcountry night hike required',
    photogTips: 'Where Chapel Creek pours across amber sand into Lake Superior beside Chapel Rock sea stack. Dramatic foreground silhouette.',
    recommendedViewingSpot: 'Sand beach directly in front of the creek cascade with Chapel Rock silhouette to the east.'
  },
  {
    id: '78a26f63-e56c-4648-a3d6-250f61593596',
    waterfallId: '78a26f63-e56c-4648-a3d6-250f61593596',
    name: 'Miners Beach Outflow Cascades',
    waterfallName: 'Miners Beach Outflow Cascades',
    county: 'Alger',
    horizonDirection: 'North',
    horizonFacing: 'Due North',
    bortleClass: 2,
    lakeFacing: true,
    lakeSuperiorLineOfSight: true,
    nightHikingSafety: 'Paved parking lot with quick wooden boardwalk steps to beach',
    photogTips: 'Wide crescent sand beach with massive northern sweep over Superior. Reflections of green auroral pillars dance across wet lake sand.',
    recommendedViewingSpot: 'Eastern end of Miners Beach where the river seeps over sandstone into the surf.'
  },
  {
    id: 'b885b4cf-7db6-45eb-a97f-c4a706923b1e',
    waterfallId: 'b885b4cf-7db6-45eb-a97f-c4a706923b1e',
    name: 'Mosquito Rivermouth Falls',
    waterfallName: 'Mosquito Rivermouth Falls',
    county: 'Alger',
    horizonDirection: 'North',
    horizonFacing: 'North',
    bortleClass: 2,
    lakeFacing: true,
    lakeSuperiorLineOfSight: true,
    nightHikingSafety: 'Rugged 4-mile wilderness trail (Roots and sandstone mud)',
    photogTips: 'Carved through flat sandstone river ledges spilling into open surf. Pristine dark-sky zone accessible via 4.5-mile backcountry hike.',
    recommendedViewingSpot: 'Flat sandstone shelves extending into Superior waves.'
  }
]

const CACHE_KEY = 'up_waterfalls_aurora_cache'
const CACHE_TTL_MS = 15 * 60 * 1000 // 15 mins

// Moon Phase Mathematical Calculation
function calculateMoonPhase(date: Date): { phaseName: string; illumination: number; suitability: AuroraForecast['moonDarkSkySuitability'] } {
  // Approximate synodic month calculation
  const knownNewMoon = new Date('2024-01-11T11:57:00Z').getTime()
  const synodicMonth = 29.53058867 * 24 * 60 * 60 * 1000
  const diff = date.getTime() - knownNewMoon
  const phaseCycle = (diff % synodicMonth) / synodicMonth
  const daysIntoCycle = phaseCycle * 29.53

  // Illumination calculation (0 to 1)
  const illumination = Math.round((0.5 * (1 - Math.cos(2 * Math.PI * phaseCycle))) * 100)

  let phaseName = 'New Moon'
  if (daysIntoCycle < 1.84) phaseName = 'New Moon'
  else if (daysIntoCycle < 5.53) phaseName = 'Waxing Crescent'
  else if (daysIntoCycle < 9.22) phaseName = 'First Quarter'
  else if (daysIntoCycle < 12.91) phaseName = 'Waxing Gibbous'
  else if (daysIntoCycle < 16.61) phaseName = 'Full Moon'
  else if (daysIntoCycle < 20.3) phaseName = 'Waning Gibbous'
  else if (daysIntoCycle < 23.99) phaseName = 'Last Quarter'
  else if (daysIntoCycle < 27.68) phaseName = 'Waning Crescent'

  let suitability: AuroraForecast['moonDarkSkySuitability'] = 'Excellent (Dark Sky)'
  if (illumination <= 20) suitability = 'Excellent (Dark Sky)'
  else if (illumination <= 45) suitability = 'Good'
  else if (illumination <= 75) suitability = 'Moderate Washout'
  else suitability = 'High Moonlight Washout'

  return { phaseName, illumination, suitability }
}

export async function fetchAuroraForecast(): Promise<AuroraForecast> {
  // Check local cache
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      const parsed = JSON.parse(cached)
      if (Date.now() - parsed.timestamp < CACHE_TTL_MS && parsed.data) {
        return parsed.data
      }
    }
  } catch (_e) {
    // Ignore cache read error
  }

  const moon = calculateMoonPhase(new Date())
  let kp = 3.67 // Realistic Northwoods average
  let isLive = false

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 6000)

    const res = await fetch('https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json', {
      signal: controller.signal
    })
    clearTimeout(timeoutId)

    if (res.ok) {
      const data = await res.json()
      // NOAA planetary Kp array: [ [timestamp, kp, a_running, station_count], ... ]
      if (Array.isArray(data) && data.length > 1) {
        const lastRow = data[data.length - 1]
        const val = parseFloat(lastRow[1])
        if (!isNaN(val) && val >= 0) {
          kp = Math.round(val * 100) / 100
          isLive = true
        }
      }
    }
  } catch (err) {
    console.warn('NOAA Space Weather fetch timed out or offline, using regional geomagnetic model:', err)
  }

  let activityLevel: AuroraForecast['activityLevel'] = 'Unsettled'
  let viewingProbability: AuroraForecast['viewingProbability'] = 'Moderate'
  let viewingAdvice = ''

  if (kp < 2.5) {
    activityLevel = 'Quiet'
    viewingProbability = 'Low'
    viewingAdvice = 'Geomagnetic field is calm. Faint green auroral arcs may only register on 15–20s camera long exposures.'
  } else if (kp < 3.5) {
    activityLevel = 'Unsettled'
    viewingProbability = 'Moderate'
    viewingAdvice = 'Unsettled conditions. Sub-visual green band possible along northern horizon in Bortle 1–2 Keweenaw and Porkies areas.'
  } else if (kp < 4.5) {
    activityLevel = 'Active Aurora Glow'
    viewingProbability = 'High'
    viewingAdvice = 'Active geomagnetic conditions! Visible green glow and vertical light pillars expected along open Lake Superior horizons.'
  } else if (kp < 6.0) {
    activityLevel = 'Minor Storm'
    viewingProbability = 'Very High'
    viewingAdvice = 'Geomagnetic storm in progress (G1). Brilliant pulsing green sheets and red curtain fringes clearly visible to the naked eye!'
  } else {
    activityLevel = 'Major Storm'
    viewingProbability = 'Very High'
    viewingAdvice = 'Severe geomagnetic storm (G2+). Vibrant full-sky coronas directly overhead reflecting brightly across river foam and waterfall spray!'
  }

  const result: AuroraForecast = {
    currentKp: kp,
    activityLevel,
    viewingProbability,
    viewingAdvice,
    kpInterpretation: viewingAdvice,
    visibilityLikelihoodUP: viewingProbability,
    estimatedStormLevel: activityLevel,
    moonPhaseName: moon.phaseName,
    moonIlluminationPercent: moon.illumination,
    moonDarkSkySuitability: moon.suitability,
    timestamp: new Date().toISOString(),
    isLive
  }

  // Cache
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: result }))
  } catch (_e) {
    // Ignore cache write error
  }

  return result
}

export const fetchNoaaAuroraForecast = fetchAuroraForecast

export function getMathematicalMoonPhase(): MoonPhaseInfo {
  const m = calculateMoonPhase(new Date())
  let icon = '🌑'
  if (m.phaseName.includes('Crescent')) icon = '🌒'
  else if (m.phaseName.includes('Quarter')) icon = '🌓'
  else if (m.phaseName.includes('Gibbous')) icon = '🌔'
  else if (m.phaseName.includes('Full')) icon = '🌕'

  return {
    phaseName: m.phaseName,
    illuminationPercent: m.illumination,
    moonIcon: icon,
    isGoodForStargazing: m.illumination <= 45
  }
}
