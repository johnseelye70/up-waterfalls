import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  loadPassportStamps, 
  savePassportStamp, 
  removePassportStamp, 
  getCurrentScoutRank, 
  exportPassportJson, 
  importPassportJson,
  SCOUT_RANKS,
  type PassportStamp,
  type ScoutRank
} from '../lib/passportStorage'
import { WATERFALL_HIKING_DATA } from '../data/waterfallHikingData'

export default function TrailPassport() {
  const [stamps, setStamps] = useState<PassportStamp[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [filterCounty, setFilterCounty] = useState<string>('All')
  
  // Form State
  const [formWfId, setFormWfId] = useState<string>('')
  const [formDate, setFormDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [formFlow, setFormFlow] = useState<PassportStamp['flowObserved']>('Prime Cascading' as any)
  const [formScramble, setFormScramble] = useState<PassportStamp['scrambleRating']>('Rugged Root Trail')
  const [formRating, setFormRating] = useState<number>(5)
  const [formNotes, setFormNotes] = useState<string>('')

  // Import State
  const [importStatus, setImportStatus] = useState<string | null>(null)

  useEffect(() => {
    setStamps(loadPassportStamps())
  }, [])

  const currentRank = getCurrentScoutRank(stamps.length)

  // Find next rank
  const nextRankIndex = SCOUT_RANKS.findIndex(r => r.rankTitle === currentRank.rankTitle) + 1
  const nextRank: ScoutRank | undefined = SCOUT_RANKS[nextRankIndex]
  const stampsNeeded = nextRank ? nextRank.minStamps - stamps.length : 0

  // Calculate county breakdown
  const countyList = Array.from(new Set(Object.values(WATERFALL_HIKING_DATA).map(w => w.county))).sort()
  const countyProgress = countyList.map(county => {
    const totalInCounty = Object.values(WATERFALL_HIKING_DATA).filter(w => w.county === county).length
    const stampedInCounty = stamps.filter(s => s.county?.toLowerCase() === county.toLowerCase()).length
    return {
      county,
      totalInCounty,
      stampedInCounty,
      pct: totalInCounty > 0 ? Math.round((stampedInCounty / totalInCounty) * 100) : 0
    }
  })

  const waterfallOptions = Object.values(WATERFALL_HIKING_DATA).sort((a, b) => a.name.localeCompare(b.name))

  const handleSaveStamp = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formWfId) return
    const spec = WATERFALL_HIKING_DATA[formWfId]
    if (!spec) return

    const newStamp: PassportStamp = {
      waterfallId: spec.id,
      waterfallName: spec.name,
      county: spec.county,
      visitedAt: formDate,
      flowObserved: formFlow,
      scrambleRating: formScramble,
      personalRating: formRating,
      trailNotes: formNotes
    }

    const updated = savePassportStamp(newStamp)
    setStamps(updated)
    setShowAddForm(false)
    setFormNotes('')
    setFormWfId('')
  }

  const handleDeleteStamp = (wfId: string) => {
    if (window.confirm('Remove this waterfall stamp from your trail passport?')) {
      const updated = removePassportStamp(wfId)
      setStamps(updated)
    }
  }

  const handleExport = () => {
    const data = exportPassportJson()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `yooper-trail-passport-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const result = importPassportJson(event.target?.result as string)
      if (result.success) {
        setStamps(loadPassportStamps())
        setImportStatus(`Successfully synced ${result.count} passport stamps!`)
      } else {
        setImportStatus(`Import error: ${result.error}`)
      }
    }
    reader.readAsText(file)
  }

  const filteredStamps = stamps.filter(s => {
    if (filterCounty !== 'All' && s.county?.toLowerCase() !== filterCounty.toLowerCase()) return false
    return true
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-pine-900 to-emerald-950 rounded-2xl p-6 sm:p-8 text-parchment border-2 border-copper-orange/50 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-copper-orange uppercase tracking-widest font-bold">
              <span>🥾</span> Official Backcountry Logbook
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white mt-1">
              Yooper Trail Passport & Scramble Journal
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Log every cataract conquered, scramble rated, and secret canyon explored across all 15 Upper Peninsula counties. Earn authentic ranger trail ranks and keep your backcountry memories locked in your device.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2.5 bg-copper-orange hover:bg-tahquamenon-amber text-white font-bold rounded-lg shadow-md transition flex items-center gap-1.5"
            >
              <span>{showAddForm ? '✕ Close Form' : '➕ Stamp a Waterfall'}</span>
            </button>
            <button
              onClick={handleExport}
              className="px-3 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-medium rounded-lg border border-emerald-600 transition"
              title="Download JSON backup"
            >
              💾 Backup
            </button>
            <label className="px-3 py-2 bg-emerald-900/60 hover:bg-emerald-800 text-white font-medium rounded-lg border border-emerald-700/60 cursor-pointer transition">
              📂 Restore
              <input type="file" accept=".json" onChange={handleFileImport} className="hidden" />
            </label>
          </div>
        </div>

        {importStatus && (
          <div className="bg-emerald-900/80 border border-emerald-500 text-emerald-200 text-xs p-3 rounded-lg flex justify-between items-center">
            <span>{importStatus}</span>
            <button onClick={() => setImportStatus(null)} className="text-emerald-400 hover:text-white font-bold ml-2">✕</button>
          </div>
        )}

        {/* Scout Rank Meter Banner */}
        <div className="bg-black/40 border border-emerald-700/40 rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl sm:text-5xl bg-emerald-950 p-3 rounded-2xl border border-emerald-600/50 shadow-inner">
              {currentRank.badgeIcon}
            </div>
            <div>
              <div className="text-[11px] font-mono text-copper-orange uppercase tracking-wider font-bold">
                Current Explorer Rank
              </div>
              <div className="text-2xl font-serif font-black text-white">
                {currentRank.rankTitle}
              </div>
              <p className="text-xs text-slate-300 max-w-md mt-0.5">
                {currentRank.description}
              </p>
            </div>
          </div>

          <div className="w-full md:w-72 space-y-1.5 text-right">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Total Falls Stamped:</span>
              <span className="font-bold text-copper-orange">{stamps.length} Cascades</span>
            </div>
            {nextRank ? (
              <>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-copper-orange transition-all duration-500"
                    style={{ width: `${Math.min(100, (stamps.length / nextRank.minStamps) * 100)}%` }}
                  />
                </div>
                <div className="text-[11px] text-slate-400 text-left">
                  {stampsNeeded} more stamp{stampsNeeded === 1 ? '' : 's'} to unlock <strong>{nextRank.rankTitle}</strong>
                </div>
              </>
            ) : (
              <div className="text-xs text-amber-400 font-bold">
                👑 Maximum Rank Achieved!
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Inline Form to Add a Stamp (100% Inline Architecture) */}
      {showAddForm && (
        <form 
          onSubmit={handleSaveStamp}
          className="bg-white rounded-xl border-2 border-copper-orange shadow-xl p-6 sm:p-8 space-y-6"
        >
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <h2 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
              <span>✍️</span> Log a Waterfall Trail Stamp
            </h2>
            <span className="text-xs font-mono text-slate-500">Record your on-site observations</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Select Waterfall */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-800 uppercase tracking-wide">
                Waterfall Destination:
              </label>
              <select
                required
                value={formWfId}
                onChange={e => setFormWfId(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-xs bg-slate-50 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
              >
                <option value="">-- Choose a Waterfall ({waterfallOptions.length} available) --</option>
                {waterfallOptions.map(wf => (
                  <option key={wf.id} value={wf.id}>
                    {wf.name} ({wf.county} County)
                  </option>
                ))}
              </select>
            </div>

            {/* Date Visited */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-800 uppercase tracking-wide">
                Date Traversed:
              </label>
              <input
                type="date"
                required
                value={formDate}
                onChange={e => setFormDate(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-xs bg-slate-50 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            {/* Observed Flow */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-800 uppercase tracking-wide">
                River Flow Stage Observed:
              </label>
              <select
                value={formFlow}
                onChange={e => setFormFlow(e.target.value as any)}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-xs bg-slate-50 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
              >
                <option value="Trickle">Trickle / Exposed Strata</option>
                <option value="Moderate">Moderate / Scenic Ribbons</option>
                <option value="Roaring Peak">Roaring Peak / Heavy Spray</option>
                <option value="Frozen Cascade">Frozen Cascade / Winter Ice Pillar</option>
              </select>
            </div>

            {/* Trail Scramble Difficulty */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-800 uppercase tracking-wide">
                Scramble & Approach Encountered:
              </label>
              <select
                value={formScramble}
                onChange={e => setFormScramble(e.target.value as any)}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-xs bg-slate-50 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
              >
                <option value="Easy Boardwalk">Easy Boardwalk / Paved Path</option>
                <option value="Rugged Root Trail">Rugged Root Trail / Hardpack Dirt</option>
                <option value="Bushwhack Scramble">Bushwhack Scramble / Unmarked Cedar Swamp</option>
                <option value="Rope & Boulder Canyon">Rope & Boulder Canyon / Slick Wet Ledges</option>
              </select>
            </div>

            {/* Personal Rating */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-800 uppercase tracking-wide">
                Your Rating:
              </label>
              <div className="flex items-center gap-2 pt-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setFormRating(star)}
                    className="text-2xl transition hover:scale-110"
                  >
                    {star <= formRating ? '⭐' : '☆'}
                  </button>
                ))}
                <span className="ml-2 font-mono text-slate-600">{formRating} of 5 Stars</span>
              </div>
            </div>

            {/* Trail Notes */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="font-bold text-slate-800 uppercase tracking-wide">
                Trail Log Notes & Observations:
              </label>
              <textarea
                rows={3}
                value={formNotes}
                onChange={e => setFormNotes(e.target.value)}
                placeholder="Log parking conditions, wildlife sighted (e.g. moose, bald eagle), water clarity, or route hazards..."
                className="w-full border border-slate-300 rounded-lg p-3 text-xs bg-slate-50 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium text-xs transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!formWfId}
              className="px-6 py-2 rounded-lg bg-copper-orange hover:bg-tahquamenon-amber text-white font-bold text-xs shadow transition disabled:opacity-50"
            >
              Stamp Passport
            </button>
          </div>
        </form>
      )}

      {/* County Progress Badges Carousel / Grid */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif font-bold text-lg text-slate-900">
              County Expedition Badges
            </h2>
            <p className="text-xs text-slate-600">
              Track your completion rate across every Upper Peninsula county.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500">
            15 Wilderness Counties
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {countyProgress.map(c => {
            const isCompleted = c.stampedInCounty > 0 && c.stampedInCounty >= c.totalInCounty
            return (
              <div
                key={c.county}
                onClick={() => setFilterCounty(filterCounty === c.county ? 'All' : c.county)}
                className={`p-3 rounded-lg border cursor-pointer transition ${
                  filterCounty === c.county
                    ? 'border-copper-orange bg-amber-50 ring-1 ring-copper-orange'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-xs text-slate-900 truncate">
                    {c.county}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-800">
                    {c.stampedInCounty}/{c.totalInCounty}
                  </span>
                </div>

                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-2">
                  <div
                    className={`h-full ${isCompleted ? 'bg-emerald-600' : 'bg-copper-orange'}`}
                    style={{ width: `${c.pct}%` }}
                  />
                </div>
                <div className="text-[9px] text-slate-500 mt-1 flex justify-between font-mono">
                  <span>{c.pct}% Logged</span>
                  {c.stampedInCounty > 0 && <span>⭐ Active</span>}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Stamped Journal Entries */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-serif font-bold text-2xl text-slate-900">
              Stamped Passport Collection ({filteredStamps.length})
            </h2>
            <p className="text-xs text-slate-600">
              {filterCounty !== 'All' ? `Filtered by ${filterCounty} County` : 'Chronological expedition trail record.'}
            </p>
          </div>

          {filterCounty !== 'All' && (
            <button
              onClick={() => setFilterCounty('All')}
              className="text-xs font-bold text-copper-orange hover:underline"
            >
              Reset to All Counties
            </button>
          )}
        </div>

        {filteredStamps.length === 0 ? (
          <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center space-y-3">
            <span className="text-4xl">🌲</span>
            <h3 className="font-serif font-bold text-base text-slate-700">
              No Passport Stamps in This View
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Ready to log your first expedition? Click "Stamp a Waterfall" above or check in directly from any waterfall dossier page.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-copper-orange text-white text-xs font-bold rounded-lg shadow hover:bg-tahquamenon-amber transition"
            >
              Log First Stamp
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredStamps.map(stamp => (
              <div 
                key={stamp.waterfallId}
                className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 flex flex-col justify-between space-y-3 relative overflow-hidden group"
              >
                {/* Vintage Stamp Border Effect */}
                <div className="absolute top-2 right-2 flex items-center gap-1">
                  <div className="w-12 h-12 border-2 border-emerald-800/40 rounded-full flex flex-col items-center justify-center text-[8px] font-mono uppercase text-emerald-800 font-bold rotate-12 leading-tight">
                    <span>YOOPER</span>
                    <span>VERIFIED</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {stamp.county} County
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Visited: {stamp.visitedAt}
                    </span>
                  </div>

                  <Link 
                    to={`/waterfall/${stamp.waterfallId}`}
                    className="font-serif font-bold text-lg text-slate-900 hover:text-copper-orange transition mt-1 block"
                  >
                    {stamp.waterfallName}
                  </Link>

                  <div className="flex items-center gap-1 text-sm mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < stamp.personalRating ? 'text-amber-400' : 'text-slate-200'}>
                        ★
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded border border-slate-100">
                    <div>
                      <span className="text-slate-500 font-bold block text-[10px] uppercase">Observed Flow</span>
                      <span className="text-slate-800 font-medium">{stamp.flowObserved}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-bold block text-[10px] uppercase">Trail Scramble</span>
                      <span className="text-slate-800 font-medium">{stamp.scrambleRating}</span>
                    </div>
                  </div>

                  {stamp.trailNotes && (
                    <p className="mt-3 text-xs text-slate-700 italic border-l-2 border-copper-orange pl-2.5">
                      "{stamp.trailNotes}"
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <Link
                    to={`/waterfall/${stamp.waterfallId}`}
                    className="font-bold text-emerald-800 hover:underline"
                  >
                    Open Field Dossier →
                  </Link>

                  <button
                    onClick={() => handleDeleteStamp(stamp.waterfallId)}
                    className="text-slate-400 hover:text-red-600 transition text-[11px]"
                    title="Remove stamp"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
