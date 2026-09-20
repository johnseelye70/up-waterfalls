import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  fetchNoaaAuroraForecast, 
  getMathematicalMoonPhase, 
  TOP_AURORA_WATERFALLS,
  type AuroraForecast,
  type MoonPhaseInfo
} from '../services/auroraService'

export default function AuroraPredictor() {
  const [forecast, setForecast] = useState<AuroraForecast | null>(null)
  const [moon, setMoon] = useState<MoonPhaseInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedBortle, setSelectedBortle] = useState<number | 'All'>('All')

  const loadData = async () => {
    setLoading(true)
    try {
      const data = await fetchNoaaAuroraForecast()
      setForecast(data)
      setMoon(getMathematicalMoonPhase())
    } catch (err) {
      console.error('Error fetching aurora data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const filteredSpots = TOP_AURORA_WATERFALLS.filter(spot => {
    if (selectedBortle !== 'All' && spot.bortleClass !== selectedBortle) return false
    return true
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-slate-950 via-[#0a1820] to-[#041a1c] rounded-2xl p-6 sm:p-8 text-parchment border-2 border-emerald-500/30 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
              <span>🌌</span> NOAA Space Weather Prediction Center Telemetry
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white mt-1">
              Dark Sky & Aurora Cascade Predictor
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Calculate geomagnetic aurora potential and celestial conditions over Lake Superior waterfalls. Michigan’s 46°N latitude provides prime viewing when geomagnetic solar winds arrive.
            </p>
          </div>

          <button
            onClick={loadData}
            disabled={loading}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-md transition flex items-center gap-2 text-xs disabled:opacity-50"
          >
            <span className={loading ? 'animate-spin' : ''}>🔄</span>
            {loading ? 'Polling NOAA Satellites...' : 'Refresh Solar Data'}
          </button>
        </div>

        {/* Live Space Weather Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          
          {/* Card 1: Planetary Kp Index */}
          <div className="bg-black/50 border border-emerald-500/30 rounded-xl p-4 flex flex-col justify-between space-y-2">
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                Planetary Kp Index
              </span>
              <span className="text-xs px-2 py-0.5 rounded font-bold font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
                SWPC Live
              </span>
            </div>

            <div className="flex items-baseline gap-3 my-1">
              <span className="text-4xl sm:text-5xl font-serif font-black text-white">
                {forecast ? forecast.currentKp.toFixed(1) : '...'}
              </span>
              <span className="text-xs text-slate-300 font-medium">
                / 9.0 Max Scale
              </span>
            </div>

            {/* Kp Gauge Meter */}
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-700 ${
                  (forecast?.currentKp || 0) >= 5 ? 'bg-purple-500' :
                  (forecast?.currentKp || 0) >= 3.5 ? 'bg-emerald-400' : 'bg-blue-500'
                }`}
                style={{ width: `${Math.min(100, ((forecast?.currentKp || 1) / 9) * 100)}%` }}
              />
            </div>

            <p className="text-xs text-slate-300 font-medium">
              {forecast?.kpInterpretation}
            </p>
          </div>

          {/* Card 2: Lunar Illumination */}
          <div className="bg-black/50 border border-emerald-500/30 rounded-xl p-4 flex flex-col justify-between space-y-2">
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                Celestial Night Sky
              </span>
              <span className="text-2xl">{moon?.moonIcon}</span>
            </div>

            <div className="my-1">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
                {moon?.phaseName}
              </div>
              <div className="text-xs text-slate-400 font-mono">
                {moon?.illuminationPercent}% Solar Disk Illumination
              </div>
            </div>

            <div className="text-xs text-slate-300">
              {moon?.isGoodForStargazing 
                ? '✨ Minimal lunar interference — ideal for milky way & faint auroral ribbons.'
                : '🌕 Bright moonlight wash — only high Kp (Kp 5+) will penetrate ambient glare.'}
            </div>
          </div>

          {/* Card 3: Upper Peninsula Visibility Index */}
          <div className="bg-black/50 border border-emerald-500/30 rounded-xl p-4 flex flex-col justify-between space-y-2">
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                U.P. Viewing Probability
              </span>
              <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase ${
                forecast?.visibilityLikelihoodUP === 'High' ? 'bg-purple-900 text-purple-200' :
                forecast?.visibilityLikelihoodUP === 'Moderate' ? 'bg-emerald-900 text-emerald-200' : 'bg-slate-800 text-slate-300'
              }`}>
                {forecast?.visibilityLikelihoodUP} Chance
              </span>
            </div>

            <div className="my-1">
              <div className="text-2xl font-serif font-bold text-white">
                {forecast?.estimatedStormLevel}
              </div>
              <div className="text-[11px] text-slate-400">
                Target Latitude: 46.5°N – 47.5°N
              </div>
            </div>

            <div className="text-xs text-slate-300">
              {forecast?.visibilityLikelihoodUP === 'High' 
                ? '🟢 Naked eye visible! Head to northern horizon overlooks immediately.' 
                : forecast?.visibilityLikelihoodUP === 'Moderate'
                ? '📷 Long exposure camera sensor will capture green horizon glow.'
                : '🌌 Baseline dark sky stargazing; faint chance of sub-auroral arcs.'}
            </div>
          </div>

        </div>
      </div>

      {/* Recommended Waterfall Dark Sky Observation Spots */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-serif font-bold text-slate-900">
              Premier Waterfall Dark Sky & Horizon Overlooks
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Ranked by Bortle dark sky index, unimpeded northern horizon line over Lake Superior, and nocturnal approach safety.
            </p>
          </div>

          {/* Bortle Filter */}
          <div className="flex items-center gap-2 text-xs bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
            <span className="font-bold text-slate-700">Filter Bortle Scale:</span>
            <select
              value={selectedBortle}
              onChange={e => setSelectedBortle(e.target.value === 'All' ? 'All' : Number(e.target.value))}
              className="bg-transparent font-medium text-slate-800 focus:outline-none"
            >
              <option value="All">All Dark Sky Tiers</option>
              <option value="1">Bortle 1 (True Pristine Wilderness)</option>
              <option value="2">Bortle 2 (Truly Dark Sky)</option>
              <option value="3">Bortle 3 (Rural Sky)</option>
            </select>
          </div>
        </div>

        {/* Spot Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpots.map(spot => (
            <div 
              key={spot.waterfallId}
              className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {spot.county} County
                    </span>
                    <h3 className="font-serif font-bold text-lg text-slate-900 mt-1">
                      {spot.waterfallName}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold bg-slate-900 text-white px-2 py-0.5 rounded">
                      Bortle {spot.bortleClass}
                    </span>
                  </div>
                </div>

                <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-800">🧭 Horizon Orientation:</span>
                    <span>{spot.horizonFacing}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-800">🌊 Superior Horizon:</span>
                    <span>{spot.lakeSuperiorLineOfSight ? 'Direct Open Water View' : 'Inland River Gorge'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-800">🔦 Night Trail Safety:</span>
                    <span className="text-slate-700 font-medium">{spot.nightHikingSafety}</span>
                  </div>
                </div>

                <p className="mt-3 text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-100 italic">
                  "{spot.recommendedViewingSpot}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={`/waterfall/${spot.waterfallId}`}
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1 hover:underline"
                >
                  View Waterfall Dossier →
                </Link>
                <span className="text-[10px] font-mono text-slate-400">
                  Dark Sky Rated
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Night Sky Astrophotography Field Tips */}
      <div className="bg-slate-900 text-slate-200 rounded-xl p-6 border border-slate-800 space-y-4">
        <h3 className="font-serif font-bold text-lg text-parchment flex items-center gap-2">
          <span>📷</span> Ranger Field Astrophotography Cheat-Sheet
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-800/80 p-3 rounded border border-slate-700 space-y-1">
            <div className="font-bold text-copper-orange uppercase tracking-wide">Focal Length & Lens</div>
            <p className="text-slate-300">14mm – 24mm ultra-wide f/1.4 to f/2.8 lens. Keep aperture wide open to capture maximum ambient night sky photons.</p>
          </div>
          <div className="bg-slate-800/80 p-3 rounded border border-slate-700 space-y-1">
            <div className="font-bold text-copper-orange uppercase tracking-wide">Exposure & Shutter</div>
            <p className="text-slate-300">Fast curtains (Kp 6+): 4–8 seconds. Faint sub-auroral ribbon: 10–15 seconds to prevent trailing stars.</p>
          </div>
          <div className="bg-slate-800/80 p-3 rounded border border-slate-700 space-y-1">
            <div className="font-bold text-copper-orange uppercase tracking-wide">ISO Sensitivity</div>
            <p className="text-slate-300">Start at ISO 1600. Dial up to ISO 3200 or 6400 on moonless nights, utilizing in-camera noise reduction.</p>
          </div>
          <div className="bg-slate-800/80 p-3 rounded border border-slate-700 space-y-1">
            <div className="font-bold text-copper-orange uppercase tracking-wide">Water Light Painting</div>
            <p className="text-slate-300">Use a warm 3000K headlamp on lowest output for 1 second during exposure to subtly bring out the amber falls.</p>
          </div>
        </div>
      </div>

    </div>
  )
}
