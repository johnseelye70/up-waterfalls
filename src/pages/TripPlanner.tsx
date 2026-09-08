import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Map from '../components/Map'
import { useTrip, type TripItem } from '../lib/TripContext'
import { supabase } from '../lib/supabase'
import { enrichWaterfall, REMOVED_WATERFALL_IDS, type EnrichedWaterfall } from '../lib/enrichWaterfall'
import {
  CURATED_EXPEDITIONS,
  calculateDrivingLeg,
  getGoogleMapsMultiStopUrl,
  optimizeStopSequence,
  type CuratedExpedition
} from '../data/itineraryTemplates'
import { WATERFALL_HIKING_DATA } from '../data/waterfallHikingData'

interface PackItem {
  id: string
  label: string
  category: string
  tip: string
  checked: boolean
}

const DEFAULT_PACK_LIST: Omit<PackItem, 'checked'>[] = [
  { id: 'boots', label: 'Waterproof Hiking Boots', category: '🥾 Footwear', tip: 'Wet Jacobsville sandstone and mossy river shale are extremely slippery.' },
  { id: 'socks', label: 'Extra Merino Wool Socks', category: '🥾 Footwear', tip: 'Keep a spare dry pair in the car after river crossings or wet bog trails.' },
  { id: 'poles', label: 'Trekking Poles', category: '🥾 Footwear', tip: 'Essential balance aid for steep gorge descents like Presque Isle and Dead River.' },
  { id: 'bugnet', label: 'Blackfly Head Net', category: '🦟 Insect Protection', tip: 'Vital during late spring & early summer Upper Peninsula blackfly hatch.' },
  { id: 'spray', label: 'Insect Repellent (DEET / Picaridin)', category: '🦟 Insect Protection', tip: 'Guards against wood ticks and mosquitoes in deep cedar swamp lowlands.' },
  { id: 'rain', label: 'Windproof Rain Shell Jacket', category: '🧥 Weather Armor', tip: 'Lake Superior creates localized microclimates and sudden heavy squalls.' },
  { id: 'passports', label: 'MI Recreation Passport / NPS Pass', category: '🎫 Permits & Access', tip: 'Required for entry at Porcupine Mountains, Tahquamenon, and Pictured Rocks.' },
  { id: 'offline', label: 'Downloaded Offline Topo & Road Maps', category: '🗺️ Navigation', tip: 'Cellular signals drop to zero throughout Western UP gorges and Huron Mountains.' },
  { id: 'compass', label: 'Physical Magnetic Compass & Paper Map', category: '🗺️ Navigation', tip: 'Backcountry backup in the event of dead phone batteries in remote forests.' },
  { id: 'bearspray', label: 'Bear Spray (EPA Approved)', category: '🐻 Wildlife & Safety', tip: 'Black bears roam remote river corridors across Gogebic and Ontonagon counties.' },
  { id: 'firstaid', label: 'Waterproof First-Aid Kit & Tick Key', category: '🐻 Wildlife & Safety', tip: 'For minor trail scrapes, blister moleskin, and quick tick removal.' },
  { id: 'drybag', label: 'Waterproof Dry Bag / Phone Case', category: '🔋 Electronics', tip: 'Protects optics and smartphones from cataract mist and river splashes.' },
  { id: 'powerbank', label: 'High-Capacity Power Bank (10,000+ mAh)', category: '🔋 Electronics', tip: 'Cold Superior breezes accelerate phone battery drain while GPS mapping.' },
  { id: 'headlamp', label: 'Headlamp with Fresh Batteries', category: '🔋 Electronics', tip: 'Dense forest canopy darkens trails 45 minutes before official sunset.' },
  { id: 'hydration', label: 'Insulated Water Canteen (2L+)', category: '🥪 Fuel & Hydration', tip: 'Raw river water contains giardia; never drink untreated stream water.' },
  { id: 'pasty', label: 'Trail Snacks or Local UP Pasty', category: '🥪 Fuel & Hydration', tip: 'Dense caloric fuel for full days trekking multi-tier gorge riverbeds.' },
]

export default function TripPlanner() {
  const { tripItems, removeFromTrip, clearTrip, moveStopUp, moveStopDown, loadTrip } = useTrip()
  const [tripData, setTripData] = useState<EnrichedWaterfall[]>([])
  const [loading, setLoading] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Drawer / View toggles (all 100% INLINE per zero-modal rules)
  const [showTemplates, setShowTemplates] = useState(false)
  const [showPackingList, setShowPackingList] = useState(false)
  const [showFieldSheet, setShowFieldSheet] = useState(false)

  // Packing list state with local storage persistence
  const [packList, setPackList] = useState<PackItem[]>(() => {
    try {
      const saved = localStorage.getItem('up_waterfalls_packlist')
      if (saved) {
        const parsed = JSON.parse(saved)
        return DEFAULT_PACK_LIST.map(item => ({
          ...item,
          checked: !!parsed[item.id]
        }))
      }
    } catch {
      // ignore JSON error
    }
    return DEFAULT_PACK_LIST.map(item => ({ ...item, checked: false }))
  })

  // Toast auto-dismiss
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000)
      return () => clearTimeout(timer)
    }
  }, [toastMessage])

  // Fetch waterfall details with photos whenever tripItems change
  useEffect(() => {
    async function loadTripData() {
      if (tripItems.length === 0) {
        setTripData([])
        return
      }

      setLoading(true)
      const ids = tripItems.map(item => item.id)

      const { data, error } = await supabase
        .from('waterfalls')
        .select('*, waterfall_photos(*)')
        .in('id', ids)

      if (error) {
        console.error('Error fetching trip waterfalls:', error)
      } else if (data) {
        const enriched = data.filter(w => !REMOVED_WATERFALL_IDS.has(w.id)).map(enrichWaterfall)
        // Sort data to exactly match the order in tripItems
        const sorted = tripItems
          .map(item => enriched.find(d => d.id === item.id)!)
          .filter(Boolean)
        setTripData(sorted)
      }
      setLoading(false)
    }

    loadTripData()
  }, [tripItems])

  // Save packing list changes to localStorage
  const togglePackItem = (id: string) => {
    setPackList(prev => {
      const updated = prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
      const map: Record<string, boolean> = {}
      for (const item of updated) {
        map[item.id] = item.checked
      }
      localStorage.setItem('up_waterfalls_packlist', JSON.stringify(map))
      return updated
    })
  }

  const resetPackList = () => {
    const cleared = DEFAULT_PACK_LIST.map(item => ({ ...item, checked: false }))
    setPackList(cleared)
    localStorage.removeItem('up_waterfalls_packlist')
    setToastMessage('Wilderness packing checklist has been reset.')
  }

  const checkAllPackList = () => {
    const all = DEFAULT_PACK_LIST.map(item => ({ ...item, checked: true }))
    setPackList(all)
    const map: Record<string, boolean> = {}
    for (const item of all) map[item.id] = true
    localStorage.setItem('up_waterfalls_packlist', JSON.stringify(map))
    setToastMessage('All wilderness gear marked as packed!')
  }

  // --- Analytics & Calculations ---

  // Trail Mileage & Estimated Hike Time
  const totalTrailMiles = useMemo(() => {
    return tripData.reduce((sum, wf) => sum + (wf.trail_length_miles || 0), 0).toFixed(1)
  }, [tripData])

  // Inter-stop Driving Legs
  const drivingLegs = useMemo(() => {
    const legs: Array<{
      from: EnrichedWaterfall
      to: EnrichedWaterfall
      distanceMiles: number
      driveMinutes: number
      formattedDuration: string
      googleLegUrl: string
    }> = []

    for (let i = 0; i < tripData.length - 1; i++) {
      const from = tripData[i]
      const to = tripData[i + 1]
      const leg = calculateDrivingLeg(from.latitude, from.longitude, to.latitude, to.longitude)
      const googleLegUrl = `https://www.google.com/maps/dir/?api=1&origin=${from.latitude},${from.longitude}&destination=${to.latitude},${to.longitude}`
      legs.push({
        from,
        to,
        ...leg,
        googleLegUrl
      })
    }

    return legs
  }, [tripData])

  // Cumulative Driving Summary
  const totalDrivingSummary = useMemo(() => {
    const miles = drivingLegs.reduce((sum, leg) => sum + leg.distanceMiles, 0)
    const minutes = drivingLegs.reduce((sum, leg) => sum + leg.driveMinutes, 0)
    let duration = `${minutes} min`
    if (minutes >= 60) {
      const hrs = Math.floor(minutes / 60)
      const mins = minutes % 60
      duration = mins > 0 ? `${hrs} hr ${mins} min` : `${hrs} hr`
    }
    return {
      miles: Math.round(miles * 10) / 10,
      duration
    }
  }, [drivingLegs])

  // Deduplicated Required Passes
  const passChecklist = useMemo(() => {
    const set = new Set<string>()
    for (const wf of tripData) {
      if (wf.pass_required && wf.pass_required.trim() !== '') {
        set.add(wf.pass_required)
      }
    }
    return Array.from(set)
  }, [tripData])

  // Pet Accessibility Scorecard
  const petScorecard = useMemo(() => {
    let friendly = 0
    let restricted = 0
    for (const wf of tripData) {
      const policy = (wf.dog_friendly || '').toLowerCase()
      if (policy.includes('no') || policy.includes('prohibit') || policy.includes('not permitted')) {
        restricted++
      } else {
        friendly++
      }
    }
    return { friendly, restricted, total: tripData.length }
  }, [tripData])

  // Cumulative Vertical Drop
  const totalVerticalDropFt = useMemo(() => {
    return tripData.reduce((sum, wf) => {
      const m = (wf.drop_height || '').match(/(\d+)/)
      return sum + (m ? parseInt(m[1], 10) : 0)
    }, 0)
  }, [tripData])

  // Map markers and center coordinates
  const tripMarkers = tripData.map((wf, idx) => ({
    id: wf.id,
    lat: wf.latitude,
    lng: wf.longitude,
    label: `Stop ${idx + 1}: ${wf.name}`
  }))

  const centerLat = tripData.length > 0 ? tripData[0].latitude : 46.4522
  const centerLng = tripData.length > 0 ? tripData[0].longitude : -86.5367

  // Multi-stop Google Maps directions link
  const googleMapsRouteUrl = useMemo(() => {
    return getGoogleMapsMultiStopUrl(tripData)
  }, [tripData])

  // --- Handlers ---

  // Route Optimization (Greedy Nearest Neighbor)
  const handleOptimizeRoute = () => {
    if (tripData.length <= 2) {
      setToastMessage('Need at least 3 stops to run route optimization.')
      return
    }

    const currentTotalMiles = totalDrivingSummary.miles
    const optimized = optimizeStopSequence(tripData)

    // Calculate new mileage
    let newTotalMiles = 0
    for (let i = 0; i < optimized.length - 1; i++) {
      newTotalMiles += calculateDrivingLeg(
        optimized[i].latitude,
        optimized[i].longitude,
        optimized[i + 1].latitude,
        optimized[i + 1].longitude
      ).distanceMiles
    }
    newTotalMiles = Math.round(newTotalMiles * 10) / 10

    const savedMiles = Math.max(0, Math.round((currentTotalMiles - newTotalMiles) * 10) / 10)

    const newTripItems: TripItem[] = optimized.map(wf => ({
      id: wf.id,
      name: wf.name,
      region: wf.region
    }))

    loadTrip(newTripItems)

    if (savedMiles > 0) {
      setToastMessage(`⚡ Route optimized! Saved ~${savedMiles} miles of highway backtracking.`)
    } else {
      setToastMessage('⚡ Route is already ordered for minimal driving distance!')
    }
  }

  // Load Curated Expedition
  const handleLoadExpedition = (exp: CuratedExpedition, append = false) => {
    const items: TripItem[] = exp.stopIds.map(id => {
      const spec = WATERFALL_HIKING_DATA[id]
      return {
        id,
        name: spec?.name || 'Waterfall Stop',
        region: spec?.region || exp.region
      }
    })

    if (append) {
      const existingIds = new Set(tripItems.map(i => i.id))
      const toAdd = items.filter(i => !existingIds.has(i.id))
      loadTrip([...tripItems, ...toAdd])
      setToastMessage(`Added ${toAdd.length} stops from "${exp.title}" to your trip!`)
    } else {
      loadTrip(items)
      setShowTemplates(false)
      setToastMessage(`Loaded "${exp.title}" (${items.length} stops). Ready for expedition!`)
    }
  }

  // Share route summary to clipboard
  const handleShareRoute = async () => {
    if (tripData.length === 0) return

    const lines = [
      `🌲 UP WATERFALLS EXPEDITION ITINERARY (${tripData.length} Stops)`,
      `Total Driving: ~${totalDrivingSummary.miles} miles (${totalDrivingSummary.duration})`,
      `Total Hiking: ~${totalTrailMiles} miles`,
      `Total Vertical Drop: ~${totalVerticalDropFt} ft`,
      '',
      ...tripData.map((wf, idx) => {
        return `${idx + 1}. ${wf.name} (${wf.county} County) - Drop: ${wf.drop_height} | Hike: ${wf.trail_length_miles} mi (${wf.hike_difficulty}) | Pass: ${wf.pass_required}`
      }),
      '',
      `🚗 Turn-by-Turn Route: ${googleMapsRouteUrl}`,
      'Built with UP Waterfalls Wilderness Planner (seelye.info)'
    ]

    try {
      await navigator.clipboard.writeText(lines.join('\n'))
      setToastMessage('📋 Itinerary details copied to clipboard! Ready to paste into SMS or notes.')
    } catch {
      setToastMessage('Could not copy to clipboard. Please copy link directly.')
    }
  }

  const packedCount = packList.filter(i => i.checked).length
  const packPercent = Math.round((packedCount / packList.length) * 100)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-grow w-full">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="bg-emerald-900 border-2 border-copper-orange text-white px-4 py-3 rounded-lg shadow-xl flex items-center justify-between text-sm transition-all duration-300">
          <div className="flex items-center gap-2">
            <span className="text-copper-orange text-lg">✦</span>
            <span>{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-emerald-300 hover:text-white font-bold ml-4 text-xs uppercase tracking-wider"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Header */}
      <div className="border-b-2 border-slate-300 pb-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-pinery-green flex items-center gap-2.5">
            <span>🧭</span> Expedition Route Planner
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Curate your route, calculate rural highway driving legs, review wilderness passes, and generate an offline field navigation sheet for zero-service areas.
          </p>
        </div>

        {/* Global Route Actions Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {tripData.length >= 2 && (
            <button
              onClick={handleOptimizeRoute}
              className="bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2 rounded shadow transition flex items-center gap-1.5"
              title="Reorders stops using nearest-neighbor solver to minimize road driving miles"
            >
              <span>⚡</span> Optimize Route
            </button>
          )}

          {tripData.length > 0 && (
            <a
              href={googleMapsRouteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-copper-orange hover:bg-tahquamenon-amber text-white text-xs font-semibold px-3 py-2 rounded shadow transition flex items-center gap-1.5"
              title="Launch full turn-by-turn route in Google Maps"
            >
              <span>🚗</span> Google Maps
            </a>
          )}

          <button
            onClick={() => {
              setShowTemplates(prev => !prev)
              setShowPackingList(false)
              setShowFieldSheet(false)
            }}
            className={`text-xs font-semibold px-3 py-2 rounded transition flex items-center gap-1.5 border ${
              showTemplates
                ? 'bg-slate-800 text-white border-slate-800 shadow-inner'
                : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
            }`}
          >
            <span>🗺️</span> {showTemplates ? 'Close Expeditions' : 'Curated Expeditions'}
          </button>

          <button
            onClick={() => {
              setShowPackingList(prev => !prev)
              setShowTemplates(false)
              setShowFieldSheet(false)
            }}
            className={`text-xs font-semibold px-3 py-2 rounded transition flex items-center gap-1.5 border ${
              showPackingList
                ? 'bg-slate-800 text-white border-slate-800 shadow-inner'
                : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
            }`}
          >
            <span>🎒</span> Gear Checklist
            <span className="ml-1 px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">
              {packedCount}/{packList.length}
            </span>
          </button>

          {tripData.length > 0 && (
            <button
              onClick={() => {
                setShowFieldSheet(prev => !prev)
                setShowTemplates(false)
                setShowPackingList(false)
              }}
              className={`text-xs font-semibold px-3 py-2 rounded transition flex items-center gap-1.5 border ${
                showFieldSheet
                  ? 'bg-slate-800 text-white border-slate-800 shadow-inner'
                  : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
              }`}
            >
              <span>🖨️</span> {showFieldSheet ? 'Close Field Sheet' : 'Print Field Sheet'}
            </button>
          )}

          {tripData.length > 0 && (
            <button
              onClick={handleShareRoute}
              className="bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-2 rounded border border-slate-300 shadow-sm transition flex items-center gap-1"
              title="Copy itinerary summary to clipboard"
            >
              <span>🔗</span> Share
            </button>
          )}

          {tripItems.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your current itinerary?')) {
                  clearTrip()
                  setToastMessage('Trip cleared. You can load a curated expedition below!')
                }
              }}
              className="bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-500 text-xs font-semibold px-2.5 py-2 rounded border border-slate-200 transition"
              title="Clear all stops"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Expedition Analytics 5-Stat Dashboard */}
      {tripData.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* Stat 1: Total Driving */}
          <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <span>🚗</span> Highway Driving
            </div>
            <div className="mt-1 font-serif text-xl font-bold text-slate-900">
              {totalDrivingSummary.miles} <span className="text-xs font-normal text-slate-500">Mi</span>
            </div>
            <div className="text-[11px] text-slate-600 mt-0.5 font-medium">
              ~{totalDrivingSummary.duration} road time
            </div>
          </div>

          {/* Stat 2: Total Trail Footwork */}
          <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <span>🥾</span> Trail Footwork
            </div>
            <div className="mt-1 font-serif text-xl font-bold text-slate-900">
              {totalTrailMiles} <span className="text-xs font-normal text-slate-500">Mi</span>
            </div>
            <div className="text-[11px] text-slate-600 mt-0.5 font-medium">
              Across {tripData.length} trailheads
            </div>
          </div>

          {/* Stat 3: Total Waterfall Drop */}
          <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <span>🌊</span> Vertical Plunge
            </div>
            <div className="mt-1 font-serif text-xl font-bold text-slate-900">
              {totalVerticalDropFt} <span className="text-xs font-normal text-slate-500">Ft</span>
            </div>
            <div className="text-[11px] text-slate-600 mt-0.5 font-medium">
              Cumulative cataract drop
            </div>
          </div>

          {/* Stat 4: Pet Accessibility */}
          <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <span>🐾</span> Pet Policy
            </div>
            <div className="mt-1 font-serif text-xl font-bold text-slate-900">
              {petScorecard.friendly}/{petScorecard.total}
            </div>
            <div className="text-[11px] text-slate-600 mt-0.5 font-medium">
              {petScorecard.restricted > 0 ? (
                <span className="text-amber-700 font-semibold">{petScorecard.restricted} stop prohibited</span>
              ) : (
                <span className="text-emerald-700 font-semibold">100% Dog-Friendly</span>
              )}
            </div>
          </div>

          {/* Stat 5: Permits & Passes */}
          <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm col-span-2 sm:col-span-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <span>🎫</span> Required Passes
            </div>
            <div className="mt-1 font-serif text-xl font-bold text-slate-900">
              {passChecklist.length} <span className="text-xs font-normal text-slate-500">Tier{passChecklist.length === 1 ? '' : 's'}</span>
            </div>
            <div className="text-[10px] text-slate-600 mt-0.5 truncate" title={passChecklist.join(', ')}>
              {passChecklist.slice(0, 2).join(', ')}
              {passChecklist.length > 2 ? ` +${passChecklist.length - 2} more` : ''}
            </div>
          </div>
        </div>
      )}

      {/* 100% INLINE DRAWER 1: Curated Road Trip Expeditions */}
      {showTemplates && (
        <div className="bg-white p-6 rounded-xl shadow-md border-2 border-emerald-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-copper-orange text-white uppercase tracking-wider mb-1">
                ★ Hand-Curated Field Expeditions
              </div>
              <h3 className="font-serif text-2xl font-bold text-pinery-green">
                Iconic Upper Peninsula Road Trip Templates
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Select a turnkey expedition with optimized scenic corridors, matched trailheads, and authentic Northwoods pasty and bakery pitstops.
              </p>
            </div>
            <button
              onClick={() => setShowTemplates(false)}
              className="text-xs font-bold text-slate-500 hover:text-slate-900 border border-slate-200 px-3 py-1.5 rounded transition self-start sm:self-auto"
            >
              ✕ Close Drawer
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CURATED_EXPEDITIONS.map(exp => (
              <div
                key={exp.id}
                className="bg-parchment rounded-xl border border-slate-300 p-5 flex flex-col justify-between hover:shadow-lg transition space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-bold bg-emerald-800 text-white px-2 py-0.5 rounded">
                      {exp.badge}
                    </span>
                    <span className="text-slate-500 font-semibold">
                      ⏱️ {exp.estimatedDays}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-serif text-lg font-bold text-slate-900 leading-tight">
                      {exp.title}
                    </h4>
                    <p className="text-xs text-copper-orange font-semibold mt-0.5">
                      {exp.subtitle}
                    </p>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-200">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Cataract Highlights:
                    </div>
                    <ul className="text-xs text-slate-700 space-y-1">
                      {exp.highlights.slice(0, 3).map((hl, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-700 font-bold">✓</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pitstops */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-200">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Iconic UP Pitstops:
                    </div>
                    <div className="text-xs text-slate-600 space-y-1">
                      {exp.pitstops.slice(0, 2).map((ps, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <span className="text-copper-orange">🍴</span>
                          <div>
                            <span className="font-semibold text-slate-800">{ps.name}</span>
                            <span className="text-[10px] text-slate-500 block">{ps.note}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex gap-2">
                  <button
                    onClick={() => handleLoadExpedition(exp, false)}
                    className="flex-1 bg-pinery-green hover:bg-emerald-900 text-white text-xs font-bold py-2 px-3 rounded shadow transition text-center"
                  >
                    Load Expedition ({exp.stopIds.length} Stops)
                  </button>
                  {tripItems.length > 0 && (
                    <button
                      onClick={() => handleLoadExpedition(exp, true)}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold py-2 px-3 rounded transition"
                      title="Append these stops to your existing trip"
                    >
                      + Append
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 100% INLINE DRAWER 2: Wilderness Packing Checklist */}
      {showPackingList && (
        <div className="bg-white p-6 rounded-xl shadow-md border-2 border-slate-300 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-800 text-white uppercase tracking-wider mb-1">
                🎒 Expedition Preparedness
              </div>
              <h3 className="font-serif text-2xl font-bold text-pinery-green">
                Wilderness Waterfall Packing Checklist
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Field-tested gear requirements for Upper Peninsula backcountry trails, blackfly swarms, slippery sandstone, and zero-connectivity gorges.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={checkAllPackList}
                className="text-xs font-semibold text-emerald-800 hover:underline px-2 py-1"
              >
                Mark All Packed
              </button>
              <button
                onClick={resetPackList}
                className="text-xs font-semibold text-slate-500 hover:text-red-600 px-2 py-1"
              >
                Reset
              </button>
              <button
                onClick={() => setShowPackingList(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 border border-slate-200 px-3 py-1.5 rounded transition ml-2"
              >
                ✕ Close
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700">
              <span>Expedition Readiness</span>
              <span>{packedCount} of {packList.length} items packed ({packPercent}%)</span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${packPercent}%` }}
              />
            </div>
          </div>

          {/* Checklist Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {packList.map(item => (
              <label
                key={item.id}
                className={`p-3.5 rounded-lg border flex items-start gap-3 cursor-pointer transition select-none ${
                  item.checked
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                }`}
              >
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => togglePackItem(item.id)}
                  className="mt-0.5 h-4 w-4 rounded text-emerald-700 focus:ring-emerald-500 cursor-pointer"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{item.label}</span>
                    <span className="text-[10px] text-slate-500 font-semibold px-1.5 py-0.2 bg-slate-100 rounded">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {item.tip}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* 100% INLINE DRAWER 3: Printable Zero-Cell-Service Field Sheet */}
      {showFieldSheet && tripData.length > 0 && (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border-2 border-slate-400 space-y-6 print:p-0 print:border-none print:shadow-none">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-800 pb-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-copper-orange">
                ★ Upper Peninsula Field Navigation Document
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-950">
                Wilderness Expedition Field Sheet
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Optimized for vehicle glovebox storage in zero-cellular-connectivity backcountry corridors.
              </p>
            </div>
            <div className="flex items-center gap-2 print:hidden">
              <button
                onClick={() => window.print()}
                className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-4 py-2 rounded shadow transition flex items-center gap-2"
              >
                <span>🖨️</span> Print / Save as PDF
              </button>
              <button
                onClick={() => setShowFieldSheet(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 border border-slate-200 px-3 py-2 rounded transition"
              >
                ✕ Close
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-parchment p-3.5 rounded border border-slate-300 text-xs">
            <div>
              <span className="font-bold text-slate-500 uppercase block text-[10px]">Expedition Stops</span>
              <span className="font-serif font-bold text-base text-slate-900">{tripData.length} Waterfalls</span>
            </div>
            <div>
              <span className="font-bold text-slate-500 uppercase block text-[10px]">Estimated Road Mileage</span>
              <span className="font-serif font-bold text-base text-slate-900">{totalDrivingSummary.miles} Mi ({totalDrivingSummary.duration})</span>
            </div>
            <div>
              <span className="font-bold text-slate-500 uppercase block text-[10px]">Total Trail Footwork</span>
              <span className="font-serif font-bold text-base text-slate-900">{totalTrailMiles} Mi Hiking</span>
            </div>
            <div>
              <span className="font-bold text-slate-500 uppercase block text-[10px]">Cumulative Drop</span>
              <span className="font-serif font-bold text-base text-slate-900">{totalVerticalDropFt} Vertical Ft</span>
            </div>
          </div>

          {/* Printable Mobile Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse" style={{ tableLayout: 'fixed' }}>
              <thead>
                <tr className="border-b-2 border-slate-800 bg-slate-100 text-slate-900 font-bold">
                  <th style={{ width: '8%' }} className="py-2.5 px-2">#</th>
                  <th style={{ width: '25%' }} className="py-2.5 px-2">Waterfall & County</th>
                  <th style={{ width: '22%' }} className="py-2.5 px-2">GPS Coordinates</th>
                  <th style={{ width: '22%' }} className="py-2.5 px-2">Trail & Access</th>
                  <th style={{ width: '23%' }} className="py-2.5 px-2">Trailhead Advisory</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {tripData.map((wf, idx) => (
                  <tr key={wf.id} className="hover:bg-slate-50">
                    <td className="py-3 px-2 font-bold text-slate-900 align-top">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-2 align-top">
                      <span className="font-bold text-slate-900 block">{wf.name}</span>
                      <span className="text-[10px] text-slate-500 block uppercase">{wf.county} County • {wf.drop_height}</span>
                    </td>
                    <td className="py-3 px-2 align-top font-mono text-[11px] text-slate-700">
                      <div>{wf.latitude.toFixed(5)}° N</div>
                      <div>{wf.longitude.toFixed(5)}° W</div>
                    </td>
                    <td className="py-3 px-2 align-top">
                      <div className="font-semibold text-slate-800">{wf.hike_difficulty} • {wf.trail_length_miles} mi</div>
                      <div className="text-[10px] text-slate-500">{wf.pass_required}</div>
                      <div className="text-[10px] text-slate-500">{wf.parking_type}</div>
                    </td>
                    <td className="py-3 px-2 align-top text-[11px] text-slate-600 leading-tight">
                      {wf.trailhead_tips}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Emergency Protocols Footer for Field Sheet */}
          <div className="border-t-2 border-slate-300 pt-4 space-y-2 text-[11px] text-slate-600 leading-relaxed">
            <div className="font-bold uppercase tracking-wider text-slate-800">
              🚨 Upper Peninsula Backcountry Protocols:
            </div>
            <p>
              1. <strong>Cell Coverage Notice:</strong> Forest roads in Ontonagon, Gogebic, Alger, and Keweenaw counties possess zero cellular signals. Reset vehicle trip odometer at trunkline exits.
            </p>
            <p>
              2. <strong>Sandstone Hazards:</strong> Jacobsville red sandstone is dangerously slick when wet or moss-covered. Avoid wet cliff edges.
            </p>
            <p>
              3. <strong>Emergency Dispatch:</strong> Dial 911 if service is available, or proceed to nearest county trunkline (US-2, US-41, M-28) to locate highway patrol.
            </p>
          </div>
        </div>
      )}

      {/* Main Itinerary Split: Left Timeline Stops & Right Route Map */}
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Itinerary Stops & Inter-Stop Connectors */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>📍</span> Itinerary Stops ({tripData.length})
            </h3>
            {tripData.length > 0 && (
              <span className="text-xs text-slate-500 font-medium">
                Reorder stops with ▲ ▼ arrows
              </span>
            )}
          </div>

          {tripItems.length === 0 ? (
            <div className="text-center py-12 px-6 bg-parchment rounded-xl border-2 border-dashed border-slate-300 space-y-4">
              <div className="text-4xl">🌲</div>
              <div className="max-w-md mx-auto space-y-1">
                <h4 className="font-serif text-xl font-bold text-slate-800">
                  Your expedition itinerary is empty
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Start building your dream Upper Peninsula adventure by loading an iconic curated route, or browse our full 291-waterfall directory to handpick stops.
                </p>
              </div>
              <div className="pt-3 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setShowTemplates(true)}
                  className="bg-pinery-green hover:bg-emerald-900 text-white text-xs font-bold px-4 py-2.5 rounded shadow transition flex items-center gap-1.5"
                >
                  <span>🗺️</span> Load Curated Expedition
                </button>
                <Link
                  to="/directory"
                  className="bg-copper-orange hover:bg-tahquamenon-amber text-white text-xs font-bold px-4 py-2.5 rounded shadow transition flex items-center gap-1.5"
                >
                  <span>📖</span> Browse 291 Waterfalls
                </Link>
              </div>
            </div>
          ) : loading ? (
            <div className="text-slate-500 text-sm py-16 text-center font-semibold animate-pulse">
              🌊 Loading expedition details, trailheads & driving legs...
            </div>
          ) : (
            <div className="space-y-4">
              {tripData.map((wf, index) => {
                const leg = drivingLegs[index] // Driving leg to NEXT stop (if not last)
                const heroPhoto = wf.waterfall_photos?.find(p => p.is_hero) || wf.waterfall_photos?.[0]

                return (
                  <div key={wf.id} className="space-y-3">
                    {/* Stop Card */}
                    <div className="bg-parchment rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition relative group">
                      <div className="flex items-start gap-3.5">
                        {/* Sequence Number Badge */}
                        <div className="bg-pinery-green text-white rounded-full w-8 h-8 flex items-center justify-center font-serif font-bold text-sm shrink-0 shadow mt-0.5">
                          {index + 1}
                        </div>

                        {/* Optional Thumbnail Photo */}
                        {heroPhoto?.image_url ? (
                          <img
                            src={heroPhoto.image_url}
                            alt={wf.name}
                            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-slate-300 shadow-sm shrink-0"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-emerald-950/10 border border-slate-300 flex items-center justify-center text-xl shrink-0">
                            🌊
                          </div>
                        )}

                        {/* Details */}
                        <div className="flex-grow space-y-1.5 pr-8">
                          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                            <Link
                              to={`/waterfall/${wf.id}`}
                              className="font-serif font-bold text-base text-slate-900 hover:text-copper-orange transition leading-tight"
                            >
                              {wf.name}
                            </Link>
                            <span className="text-[10px] text-copper-orange font-bold uppercase tracking-wider">
                              {wf.county} County • {wf.region}
                            </span>
                          </div>

                          {/* Trail Badges Matrix */}
                          <div className="flex flex-wrap items-center gap-1.5 pt-0.5 text-[11px]">
                            <span className={`font-semibold px-2 py-0.5 rounded ${
                              wf.hike_difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                              wf.hike_difficulty === 'Moderate' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                              wf.hike_difficulty === 'Difficult' ? 'bg-orange-100 text-orange-900 border border-orange-300' :
                              'bg-red-100 text-red-900 border border-red-300'
                            }`}>
                              🥾 {wf.hike_difficulty}
                            </span>
                            <span className="bg-white/80 px-2 py-0.5 rounded border border-slate-200 text-slate-700 font-medium">
                              📏 {wf.trail_length_miles} mi • ⏱️ {wf.estimated_time_minutes}
                            </span>
                            <span className="bg-white/80 px-2 py-0.5 rounded border border-slate-200 text-slate-700 font-medium">
                              🌊 {wf.drop_height}
                            </span>
                          </div>

                          {/* Access & Pass info */}
                          <div className="text-[11px] text-slate-600 flex flex-wrap gap-x-3 gap-y-1 pt-0.5">
                            <span>🚗 {wf.parking_type}</span>
                            <span>🎫 {wf.pass_required}</span>
                            <span>🐾 {wf.dog_friendly}</span>
                          </div>
                        </div>

                        {/* Reorder & Remove Actions */}
                        <div className="absolute top-3 right-3 flex flex-col items-center gap-1">
                          <button
                            onClick={() => removeFromTrip(wf.id)}
                            className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-white transition"
                            title="Remove stop"
                            aria-label={`Remove ${wf.name} from trip`}
                          >
                            ✕
                          </button>
                          
                          <div className="flex flex-col gap-0.5 pt-1">
                            <button
                              onClick={() => moveStopUp(wf.id)}
                              disabled={index === 0}
                              className={`p-1 rounded text-xs leading-none transition ${
                                index === 0
                                  ? 'text-slate-300 cursor-not-allowed'
                                  : 'text-slate-600 hover:text-emerald-800 hover:bg-slate-200 font-bold'
                              }`}
                              title="Move Stop Earlier"
                              aria-label={`Move ${wf.name} earlier`}
                            >
                              ▲
                            </button>
                            <button
                              onClick={() => moveStopDown(wf.id)}
                              disabled={index === tripData.length - 1}
                              className={`p-1 rounded text-xs leading-none transition ${
                                index === tripData.length - 1
                                  ? 'text-slate-300 cursor-not-allowed'
                                  : 'text-slate-600 hover:text-emerald-800 hover:bg-slate-200 font-bold'
                              }`}
                              title="Move Stop Later"
                              aria-label={`Move ${wf.name} later`}
                            >
                              ▼
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Inter-Stop Driving Leg Connector (Between stops) */}
                    {leg && (
                      <div className="pl-6 sm:pl-8 py-1 relative">
                        <div className="border-l-2 border-dashed border-emerald-700/50 pl-6 py-2 space-y-1">
                          <div className="bg-emerald-950/5 hover:bg-emerald-950/10 border border-emerald-900/20 rounded-lg px-3.5 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition">
                            <div className="flex items-center gap-2 text-xs text-emerald-950 font-medium">
                              <span className="text-copper-orange font-bold text-sm">🚗</span>
                              <span>
                                <strong>Leg {index + 1} → {index + 2}:</strong> ~{leg.distanceMiles} miles • ~{leg.formattedDuration} scenic rural drive
                              </span>
                            </div>
                            <a
                              href={leg.googleLegUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] font-bold text-copper-orange hover:text-tahquamenon-amber flex items-center gap-1 shrink-0"
                            >
                              <span>🧭 Leg Directions</span> →
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Right Column: Route Map & Quick Hub Links */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>🗺️</span> Synchronized Route Map
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              {tripMarkers.length} Active Marker{tripMarkers.length === 1 ? '' : 's'}
            </span>
          </div>

          <div className="h-[420px] sm:h-[480px] lg:h-[540px] sticky top-24">
            <Map
              lat={centerLat}
              lng={centerLng}
              zoom={tripData.length === 1 ? 12 : tripData.length > 1 ? 8 : 7}
              markers={tripMarkers}
            />
          </div>

          {/* Offline Tip Callout */}
          <div className="bg-parchment p-4 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <span>💡</span> Pro-Tip for UP Drivers
            </div>
            <p className="leading-relaxed">
              Google Maps allows you to pre-download the entire Upper Peninsula offline. Open Google Maps on your phone, search "Upper Peninsula", tap the three dots, and choose <strong>Download offline map</strong> before departing.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

