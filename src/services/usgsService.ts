import { USGS_UP_STATIONS, type UsgsGaugeStation } from '../data/usgsGaugesData'

export interface LiveFlowData {
  siteId: string
  name: string
  riverName: string
  county: string
  currentCfs: number
  gageHeightFt: number | null
  timestamp: string
  flowStatus: 'Torrential Roar' | 'Peak Flow' | 'Prime Flow' | 'Moderate Flow' | 'Low Flow'
  flowPercentOfMedian: number
  medianCfs: number
  floodCfs: number
  associatedWaterfallNames: string[]
  isLive: boolean
}

const CACHE_KEY = 'up_waterfalls_usgs_flow_cache'
const CACHE_TTL_MS = 15 * 60 * 1000 // 15 minutes

export async function fetchLiveUsgsFlow(): Promise<LiveFlowData[]> {
  // Check local cache first
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      const parsed = JSON.parse(cached)
      if (Date.now() - parsed.timestamp < CACHE_TTL_MS && Array.isArray(parsed.data)) {
        return parsed.data
      }
    }
  } catch (_e) {
    // Ignore storage errors
  }

  const siteIds = USGS_UP_STATIONS.map(s => s.siteId).join(',')
  const url = `https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${siteIds}&parameterCd=00060,00065&siteStatus=active`

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 7000)

    const res = await fetch(url, { signal: controller.signal })
    clearTimeout(timeoutId)

    if (!res.ok) {
      throw new Error(`USGS HTTP ${res.status}`)
    }

    const json = await res.json()
    const timeSeries = json?.value?.timeSeries || []

    const liveReadings: Record<string, { cfs?: number; height?: number; time?: string }> = {}

    timeSeries.forEach((ts: any) => {
      const siteCode = ts?.sourceInfo?.siteCode?.[0]?.value
      const variableCode = ts?.variable?.variableCode?.[0]?.value
      const values = ts?.values?.[0]?.value

      if (siteCode && values && values.length > 0) {
        const latest = values[values.length - 1]
        const val = parseFloat(latest.value)
        if (!isNaN(val) && val >= 0) {
          liveReadings[siteCode] = liveReadings[siteCode] || {}
          if (variableCode === '00060') {
            liveReadings[siteCode].cfs = val
            liveReadings[siteCode].time = latest.dateTime
          } else if (variableCode === '00065') {
            liveReadings[siteCode].height = val
          }
        }
      }
    })

    const results: LiveFlowData[] = USGS_UP_STATIONS.map(station => {
      const reading = liveReadings[station.siteId]
      const cfs = reading?.cfs !== undefined ? reading.cfs : getFallbackCfs(station)
      const height = reading?.height !== undefined ? reading.height : null
      const percent = Math.round((cfs / station.medianCfs) * 100)

      let status: LiveFlowData['flowStatus'] = 'Prime Flow'
      if (percent >= 180) status = 'Torrential Roar'
      else if (percent >= 125) status = 'Peak Flow'
      else if (percent >= 80) status = 'Prime Flow'
      else if (percent >= 50) status = 'Moderate Flow'
      else status = 'Low Flow'

      return {
        siteId: station.siteId,
        name: station.name,
        riverName: station.riverName,
        county: station.county,
        currentCfs: Math.round(cfs),
        gageHeightFt: height !== null ? Math.round(height * 100) / 100 : null,
        timestamp: reading?.time || new Date().toISOString(),
        flowStatus: status,
        flowPercentOfMedian: percent,
        medianCfs: station.medianCfs,
        floodCfs: station.floodCfs,
        associatedWaterfallNames: station.associatedWaterfallNames,
        isLive: reading?.cfs !== undefined
      }
    })

    // Cache valid results
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: results }))
    } catch (_e) {
      // Ignore cache write error
    }

    return results
  } catch (err) {
    console.warn('USGS live streamflow fetch failed or timed out, using seasonal hydrologic model:', err)
    return getOfflineFlowModel()
  }
}

// Fallback algorithm based on current month for seasonal hydrology
function getFallbackCfs(station: UsgsGaugeStation): number {
  const month = new Date().getMonth() // 0-11
  let multiplier = 1.0
  if (month >= 3 && month <= 4) multiplier = 2.4 // April-May spring thaw
  else if (month === 5) multiplier = 1.4         // June early summer
  else if (month >= 6 && month <= 7) multiplier = 0.85 // July-August
  else if (month >= 8 && month <= 9) multiplier = 1.1  // Sept-Oct autumn rains
  else multiplier = 0.65                         // Winter frozen trickle

  // Add subtle deterministic variance based on site ID
  const variance = 1 + ((station.siteId.charCodeAt(6) % 15) - 7) * 0.02
  return Math.round(station.medianCfs * multiplier * variance)
}

function getOfflineFlowModel(): LiveFlowData[] {
  return USGS_UP_STATIONS.map(station => {
    const cfs = getFallbackCfs(station)
    const percent = Math.round((cfs / station.medianCfs) * 100)

    let status: LiveFlowData['flowStatus'] = 'Prime Flow'
    if (percent >= 180) status = 'Torrential Roar'
    else if (percent >= 125) status = 'Peak Flow'
    else if (percent >= 80) status = 'Prime Flow'
    else if (percent >= 50) status = 'Moderate Flow'
    else status = 'Low Flow'

    return {
      siteId: station.siteId,
      name: station.name,
      riverName: station.riverName,
      county: station.county,
      currentCfs: cfs,
      gageHeightFt: 3.5,
      timestamp: new Date().toISOString(),
      flowStatus: status,
      flowPercentOfMedian: percent,
      medianCfs: station.medianCfs,
      floodCfs: station.floodCfs,
      associatedWaterfallNames: station.associatedWaterfallNames,
      isLive: false
    }
  })
}

// Find matching flow station for a waterfall
export function getFlowStationForWaterfall(waterfallName: string, county: string): UsgsGaugeStation | undefined {
  const cleanName = waterfallName.toLowerCase().trim()
  
  // Exact name match
  const exact = USGS_UP_STATIONS.find(s => 
    s.associatedWaterfallNames.some(w => cleanName.includes(w.toLowerCase().trim()))
  )
  if (exact) return exact

  // County & watershed match
  return USGS_UP_STATIONS.find(s => s.county.toLowerCase() === county.toLowerCase())
}

export interface UsgsReading {
  flowCfs: number
  gaugeHeightFt: number | null
  stageDescription: string
  timestamp: string
}

export async function fetchAllStationsFlow(): Promise<Record<string, UsgsReading>> {
  const list = await fetchLiveUsgsFlow()
  const map: Record<string, UsgsReading> = {}
  list.forEach(item => {
    let stage: string = item.flowStatus
    if (stage === 'Peak Flow') stage = 'Peak Runoff'
    else if (stage === 'Prime Flow') stage = 'Prime Cascading'
    map[item.siteId] = {
      flowCfs: item.currentCfs,
      gaugeHeightFt: item.gageHeightFt,
      stageDescription: stage,
      timestamp: item.timestamp
    }
  })
  return map
}

export async function fetchSingleStationFlow(siteId: string): Promise<UsgsReading | null> {
  const map = await fetchAllStationsFlow()
  return map[siteId] || null
}
