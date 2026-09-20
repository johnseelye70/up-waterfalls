import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  WINTER_CONDITIONS_DATA, 
  type FreezeStage
} from '../data/winterClimbingData'

export default function WinterIce() {
  const [filterStage, setFilterStage] = useState<string>('All')
  const [filterGrade, setFilterGrade] = useState<string>('All')
  const [filterPlowedOnly, setFilterPlowedOnly] = useState<boolean>(false)

  const freezeStages = ['All', 'Solid Frozen Pillar', 'Curtain Formed', 'Spray Ice Rim', 'Open Water']
  const iceGrades = ['All', 'None / Scenic Only', 'WI2', 'WI3', 'WI3+', 'WI4']

  const filteredConditions = WINTER_CONDITIONS_DATA.filter(item => {
    if (filterStage !== 'All' && item.freezeStage !== filterStage) return false
    if (filterGrade !== 'All' && item.iceGrade !== filterGrade) return false
    if (filterPlowedOnly && !item.winterTrailheadPlowed) return false
    return true
  })

  const getStageBadgeColor = (stage: FreezeStage) => {
    switch (stage) {
      case 'Solid Frozen Pillar': return 'bg-cyan-100 text-cyan-900 border-cyan-300'
      case 'Curtain Formed': return 'bg-blue-100 text-blue-900 border-blue-300'
      case 'Spray Ice Rim': return 'bg-indigo-100 text-indigo-900 border-indigo-300'
      case 'Open Water': return 'bg-amber-100 text-amber-900 border-amber-300'
      case 'Late Breakup & Shell Ice': return 'bg-red-100 text-red-900 border-red-300'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-parchment border-2 border-sky-400/40 shadow-2xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-sky-400 uppercase tracking-widest font-bold">
          <span>❄️</span> Sub-Zero Cataract Conditions & Access Registry
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white">
          Winter Ice Climbing & Frozen Cataracts
        </h1>
        <p className="text-sm sm:text-base text-sky-100 max-w-3xl leading-relaxed">
          From the massive 50-foot frozen columns of Pictured Rocks to remote canyon curtains along the Sturgeon and Black rivers, track winter ice formation stages, technical Water Ice (WI) ratings, and seasonal trailhead plowing advisories.
        </p>

        {/* Warning Banner */}
        <div className="bg-sky-900/40 border border-sky-500/40 p-4 rounded-xl text-xs text-sky-200 flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <div className="leading-relaxed">
            <strong>Sub-Zero Backcountry Hazard Notice:</strong> Winter waterfall gorges generate intense spindrift ice and treacherous frazil slush pools. Never step beneath unsupported hanging daggers or onto river ice without probing. Check technical climbing regulations before ascending.
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <label className="font-bold text-slate-700">Freeze Stage:</label>
            <select
              value={filterStage}
              onChange={e => setFilterStage(e.target.value)}
              className="border border-slate-300 rounded px-2.5 py-1.5 bg-slate-50 text-xs focus:ring-1 focus:ring-sky-600 focus:outline-none"
            >
              {freezeStages.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <label className="font-bold text-slate-700">Ice Grade:</label>
            <select
              value={filterGrade}
              onChange={e => setFilterGrade(e.target.value)}
              className="border border-slate-300 rounded px-2.5 py-1.5 bg-slate-50 text-xs focus:ring-1 focus:ring-sky-600 focus:outline-none"
            >
              {iceGrades.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700 ml-2">
            <input
              type="checkbox"
              checked={filterPlowedOnly}
              onChange={e => setFilterPlowedOnly(e.target.checked)}
              className="rounded text-sky-600 focus:ring-sky-500 w-4 h-4"
            />
            <span>🚗 Plowed Parking Lots Only</span>
          </label>
        </div>

        <div className="text-slate-500 font-mono text-[11px]">
          Showing {filteredConditions.length} Frozen Cataracts
        </div>
      </div>

      {/* Conditions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConditions.map(item => (
          <div 
            key={item.waterfallId}
            className="bg-white rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-sky-800 font-semibold bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                    {item.county} County
                  </span>
                  <h3 className="font-serif font-bold text-lg text-slate-900 mt-1">
                    {item.waterfallName}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold bg-slate-900 text-white px-2 py-0.5 rounded">
                    {item.iceGrade}
                  </span>
                </div>
              </div>

              {/* Status Badges */}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span className={`px-2 py-0.5 rounded border font-semibold text-[11px] ${getStageBadgeColor(item.freezeStage)}`}>
                  🧊 {item.freezeStage}
                </span>
                <span className="px-2 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-700 text-[11px] font-mono">
                  ~{item.estimatedIceThicknessInches}" Ice
                </span>
                <span className="px-2 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-700 text-[11px] font-mono">
                  {item.verticalIceDropFeet} ft Drop
                </span>
              </div>

              {/* Approach & Plowing */}
              <div className="mt-3 space-y-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${item.winterTrailheadPlowed ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <span className="font-bold text-slate-800">
                    {item.winterTrailheadPlowed ? 'Plowed Access Lot' : 'Unplowed Backcountry Access'}
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] bg-slate-50 p-2 rounded border border-slate-100">
                  {item.plowingNotes}
                </p>
              </div>

              {/* Ice Description */}
              <div className="mt-3 text-xs text-slate-600 leading-relaxed">
                <strong className="text-slate-800 block text-[11px] uppercase tracking-wide mb-0.5">
                  Formation Character:
                </strong>
                <p>{item.iceTypeDescription}</p>
              </div>

              {/* Hazards list */}
              <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-red-900 space-y-1">
                <span className="font-bold flex items-center gap-1">
                  <span>⚠️</span> Winter Hazards:
                </span>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                  {item.hazards.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <Link
                to={`/waterfall/${item.waterfallId}`}
                className="font-bold text-sky-800 hover:text-sky-950 flex items-center gap-1 hover:underline"
              >
                Inspect Waterfall Dossier →
              </Link>
              <span className="text-[10px] text-slate-400 font-mono">
                {item.typicalFreezeWindow}
              </span>
            </div>

          </div>
        ))}
      </div>

      {/* Winter Climbing Ethics & Conservation Notice */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-xs text-slate-600 space-y-3">
        <h3 className="font-serif font-bold text-base text-slate-900">
          U.P. Winter Ice Ethics & Sandstone Conservation
        </h3>
        <p>
          Ice climbing in Michigan's Upper Peninsula is unique because waterfalls and seepage curtains form directly over delicate Jacobsville and Munising sandstone. Never use ice axes on bare rock or dry-tool on fragile cliff rims. In Pictured Rocks National Lakeshore, ice climbing is strictly prohibited within Munising Falls canyon to protect endangered arctic-alpine bryophytes and moss colonies. Always carry proper avalanche probes and avalanche shovels when navigating deep lake-effect snowdrifts on canyon rims.
        </p>
      </div>

    </div>
  )
}
