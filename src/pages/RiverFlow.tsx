import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { USGS_STATIONS, type UsgsGaugeStation } from '../data/usgsGaugesData'
import { fetchAllStationsFlow, type UsgsReading } from '../services/usgsService'

export default function RiverFlow() {
  const [readings, setReadings] = useState<Record<string, UsgsReading>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedBasin, setSelectedBasin] = useState<string>('All')
  const [selectedStage, setSelectedStage] = useState<string>('All')
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date())

  const loadData = async (force: boolean = false) => {
    setLoading(true)
    setError(null)
    try {
      if (force) {
        // clear localStorage usgs cache
        localStorage.removeItem('up_waterfalls_usgs_flow_cache')
      }
      const data = await fetchAllStationsFlow()
      setReadings(data)
      setLastRefreshed(new Date())
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch live USGS telemetry')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const basins: string[] = ['All', ...Array.from(new Set(USGS_STATIONS.map((s: UsgsGaugeStation) => s.riverName)))]
  const stages: string[] = ['All', 'Torrential Roar', 'Peak Runoff', 'Prime Cascading', 'Moderate Flow', 'Low Flow']

  const filteredStations = USGS_STATIONS.filter((station: UsgsGaugeStation) => {
    if (selectedBasin !== 'All' && station.riverName !== selectedBasin) return false
    const reading = readings[station.siteId]
    if (selectedStage !== 'All' && reading && reading.stageDescription !== selectedStage) return false
    return true
  })

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Torrential Roar': return 'bg-purple-600 text-white border-purple-400'
      case 'Peak Runoff': return 'bg-blue-600 text-white border-blue-400'
      case 'Prime Cascading': return 'bg-emerald-600 text-white border-emerald-400'
      case 'Moderate Flow': return 'bg-amber-600 text-white border-amber-400'
      case 'Low Flow': return 'bg-slate-600 text-white border-slate-400'
      default: return 'bg-slate-700 text-slate-200 border-slate-500'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 rounded-2xl p-6 sm:p-8 text-parchment border-2 border-copper-orange/40 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-copper-orange uppercase tracking-wider">
              <span>🌊</span> USGS Wilderness Hydrology Network
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-white mt-1">
              Live River Flow & Torrent Tracker
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Real-time telemetry directly from 12 United States Geological Survey streamflow gauges across the Upper Peninsula. Know whether cataracts are roaring at record runoff or crystal low trickles.
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <button
              onClick={() => loadData(true)}
              disabled={loading}
              className="px-4 py-2 bg-copper-orange hover:bg-tahquamenon-amber text-white font-bold rounded-lg shadow-md transition flex items-center gap-2 text-xs disabled:opacity-50"
            >
              <span className={loading ? 'animate-spin' : ''}>🔄</span>
              {loading ? 'Polling Telemetry...' : 'Refresh USGS Telemetry'}
            </button>
            <span className="text-[11px] text-slate-400 font-mono">
              Last check: {lastRefreshed.toLocaleTimeString()}
            </span>
          </div>
        </div>

        {/* Legend / Hydrology Tiers */}
        <div className="pt-4 border-t border-slate-700/60 grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
          <div className="bg-purple-950/80 border border-purple-500/40 p-2 rounded">
            <div className="font-bold text-purple-200">🌊 Torrential Roar</div>
            <div className="text-[10px] text-purple-300">&gt;180% Median • Mist & Foam</div>
          </div>
          <div className="bg-blue-950/80 border border-blue-500/40 p-2 rounded">
            <div className="font-bold text-blue-200">⚡ Peak Runoff</div>
            <div className="text-[10px] text-blue-300">125–180% • Massive Volume</div>
          </div>
          <div className="bg-emerald-950/80 border border-emerald-500/40 p-2 rounded">
            <div className="font-bold text-emerald-200">✨ Prime Cascading</div>
            <div className="text-[10px] text-emerald-300">80–125% • Ideal Contrast</div>
          </div>
          <div className="bg-amber-950/80 border border-amber-500/40 p-2 rounded">
            <div className="font-bold text-amber-200">🍂 Moderate Flow</div>
            <div className="text-[10px] text-amber-300">50–80% • Clear Ribbons</div>
          </div>
          <div className="bg-slate-900 border border-slate-600/40 p-2 rounded col-span-2 sm:col-span-1">
            <div className="font-bold text-slate-300">🪨 Low Flow</div>
            <div className="text-[10px] text-slate-400">&lt;50% • Exposed Strata</div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <label className="font-bold text-slate-700 flex items-center gap-1.5">
            <span>🗺️</span> Watershed:
          </label>
          <select
            value={selectedBasin}
            onChange={e => setSelectedBasin(e.target.value)}
            className="border border-slate-300 rounded px-2.5 py-1.5 text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          >
            {basins.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          <label className="font-bold text-slate-700 ml-2 flex items-center gap-1.5">
            <span>📊</span> Flow Stage:
          </label>
          <select
            value={selectedStage}
            onChange={e => setSelectedStage(e.target.value)}
            className="border border-slate-300 rounded px-2.5 py-1.5 text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          >
            {stages.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="text-slate-500 font-mono text-[11px]">
          Showing {filteredStations.length} of {USGS_STATIONS.length} Wilderness Stations
        </div>
      </div>

      {error && (
        <div className="bg-amber-50 border border-amber-300 text-amber-900 p-4 rounded-xl text-xs flex items-center gap-3">
          <span className="text-xl">⚠️</span>
          <div>
            <strong>Notice:</strong> {error}. Telemetry is currently running on seasonal hydrologic model baselines.
          </div>
        </div>
      )}

      {/* Gauges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStations.map((station: UsgsGaugeStation) => {
          const reading = readings[station.siteId]
          const cfs = reading?.flowCfs ?? station.medianCfs
          const stage = reading?.stageDescription ?? 'Prime Cascading'
          const pctMedian = Math.round((cfs / station.medianCfs) * 100)
          
          // Calculate gauge bar fill percentage (capped at 100)
          const barFill = Math.min(100, Math.round((cfs / station.floodCfs) * 100))

          return (
            <div 
              key={station.siteId}
              className="bg-white rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Station header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {station.riverName}
                    </span>
                    <h3 className="font-serif font-bold text-base text-slate-900 mt-1 leading-snug">
                      {station.name}
                    </h3>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded border shadow-sm ${getStageColor(stage)}`}>
                    {stage}
                  </span>
                </div>

                {/* Flow numbers */}
                <div className="mt-4 bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wide">Discharge Rate</div>
                    <div className="text-2xl font-serif font-black text-slate-900">
                      {cfs.toLocaleString()} <span className="text-xs font-sans font-normal text-slate-600">CFS</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wide">Percent of Median</div>
                    <div className={`text-base font-bold font-mono ${pctMedian >= 140 ? 'text-purple-700' : pctMedian >= 80 ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {pctMedian}%
                    </div>
                  </div>
                </div>

                {/* Hydrograph meter bar */}
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>Median ({station.medianCfs} CFS)</span>
                    <span>Flood ({station.floodCfs} CFS)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        barFill > 80 ? 'bg-purple-600' : barFill > 50 ? 'bg-blue-600' : 'bg-emerald-600'
                      }`}
                      style={{ width: `${barFill}%` }}
                    />
                  </div>
                </div>

                {/* Gauge metadata */}
                <div className="mt-3 text-[11px] text-slate-600 space-y-1">
                  <div><strong>County:</strong> {station.county}</div>
                  <div><strong>USGS Site ID:</strong> <span className="font-mono">{station.siteId}</span></div>
                  {reading?.gaugeHeightFt && (
                    <div><strong>Gage Height:</strong> <span className="font-mono">{reading.gaugeHeightFt.toFixed(2)} ft</span></div>
                  )}
                </div>
              </div>

              {/* Associated Waterfalls */}
              <div className="pt-3 border-t border-slate-100">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                  Cascades Impacted:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {station.associatedWaterfallNames.map(name => (
                    <Link
                      key={name}
                      to={`/directory?search=${encodeURIComponent(name)}`}
                      className="text-[11px] bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 border border-slate-200 hover:border-emerald-300 px-2 py-0.5 rounded transition"
                    >
                      🌊 {name}
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          )
        })}
      </div>

    </div>
  )
}
