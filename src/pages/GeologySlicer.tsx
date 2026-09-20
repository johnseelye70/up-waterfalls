import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  GEOLOGY_STRATA_UNITS, 
  MECHANICAL_ENGINES, 
  WATERFALL_GEOLOGY_MAPPINGS,
  type WaterfallGeologyMappingItem
} from '../data/geologyData'

export default function GeologySlicer() {
  const [selectedStrataId, setSelectedStrataId] = useState<string>(GEOLOGY_STRATA_UNITS[0].id)
  const [selectedEngine, setSelectedEngine] = useState<string>('All')

  const currentStrata = GEOLOGY_STRATA_UNITS.find(s => s.id === selectedStrataId) || GEOLOGY_STRATA_UNITS[0]

  // Find all waterfalls bound to this strata
  const matchingWaterfalls = Object.entries(WATERFALL_GEOLOGY_MAPPINGS)
    .filter(([_, mapping]: [string, WaterfallGeologyMappingItem]) => mapping.strataId === currentStrata.id)
    .filter(([_, mapping]: [string, WaterfallGeologyMappingItem]) => selectedEngine === 'All' || mapping.engine === selectedEngine)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 rounded-2xl p-6 sm:p-8 text-parchment border-2 border-copper-orange/50 shadow-2xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-copper-orange uppercase tracking-widest font-bold">
          <span>🌋</span> 1.1-Billion-Year Midcontinent Rift System (MRS)
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white">
          Interactive Bedrock Geology & Rift Slicer
        </h1>
        <p className="text-sm sm:text-base text-stone-300 max-w-3xl leading-relaxed">
          Every waterfall in Michigan's Upper Peninsula is an ancient scar of continental tearing. 1.1 billion years ago, the North American continent began ripping apart, spewing colossal basalt lava flows that now form the rugged waterfalls of the Porcupines, the Keweenaw, and Pictured Rocks.
        </p>

        {/* 4 Waterfall Mechanical Engines Overview */}
        <div className="pt-4 border-t border-stone-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {MECHANICAL_ENGINES.map(engine => (
            <div 
              key={engine.id}
              onClick={() => setSelectedEngine(selectedEngine === engine.name ? 'All' : engine.name)}
              className={`p-3 rounded-lg border cursor-pointer transition ${
                selectedEngine === engine.name
                  ? 'bg-amber-900/60 border-copper-orange text-white'
                  : 'bg-black/40 border-stone-700/60 text-stone-300 hover:border-stone-500'
              }`}
            >
              <div className="font-bold text-copper-orange">{engine.name}</div>
              <p className="text-[11px] text-stone-300 mt-1 leading-snug">{engine.description}</p>
              <div className="text-[10px] text-stone-400 mt-1.5 font-mono">Example: {engine.exampleFalls}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Slicer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Strata Layers Selector (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-stone-200 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-lg text-stone-900">
              Bedrock Formations
            </h2>
            <span className="text-[11px] font-mono text-stone-500">
              Oldest to Youngest ↓
            </span>
          </div>

          <div className="space-y-2">
            {GEOLOGY_STRATA_UNITS.map(strata => {
              const isSelected = strata.id === currentStrata.id
              return (
                <button
                  key={strata.id}
                  onClick={() => setSelectedStrataId(strata.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-stone-900 text-white border-copper-orange shadow-md scale-[1.01]'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full flex-shrink-0 ${strata.colorSwatchClass}`} />
                      <div className="font-serif font-bold text-sm leading-tight">
                        {strata.name}
                      </div>
                    </div>
                    <div className={`text-[11px] font-mono ${isSelected ? 'text-copper-orange' : 'text-stone-500'}`}>
                      {strata.geologicalAge} • {strata.rockType}
                    </div>
                  </div>
                  <span className="text-xs font-mono opacity-80 mt-1">
                    {isSelected ? '▶' : ''}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Column: Active Strata Deep-Dive & Attached Waterfalls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Strata Details Panel */}
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Stratigraphic Column
                </span>
                <h3 className="font-serif font-bold text-2xl text-stone-900 mt-1">
                  {currentStrata.name}
                </h3>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono font-bold text-stone-800">
                  {currentStrata.geologicalAge}
                </div>
                <div className="text-[11px] text-stone-500">
                  {currentStrata.rockType}
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm text-stone-700 leading-relaxed">
              <div>
                <strong className="text-stone-900">Geological Formation:</strong>
                <p className="mt-0.5">{currentStrata.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
                  <div className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                    Mineralogy & Texture
                  </div>
                  <p className="text-xs text-stone-600 mt-1">
                    {currentStrata.mineralogy}
                  </p>
                </div>
                <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
                  <div className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                    Field Identification Clues
                  </div>
                  <p className="text-xs text-stone-600 mt-1">
                    {currentStrata.fieldClues}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <strong className="text-stone-900">Geographic Escarpment Range:</strong>
                <p className="text-xs text-stone-600 mt-0.5">{currentStrata.distributionUP}</p>
              </div>
            </div>
          </div>

          {/* Waterfalls Sculpted in This Bedrock */}
          <div className="bg-stone-50 rounded-xl border border-stone-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-lg text-stone-900">
                  Waterfalls Sculpted by {currentStrata.name}
                </h4>
                <p className="text-xs text-stone-600">
                  Cataracts cascading directly over this geological horizon.
                </p>
              </div>
              <span className="text-xs font-mono bg-stone-200 text-stone-800 px-2 py-0.5 rounded font-bold">
                {matchingWaterfalls.length} Falls Identified
              </span>
            </div>

            {matchingWaterfalls.length === 0 ? (
              <p className="text-xs text-stone-500 italic p-4 text-center">
                No waterfalls currently match the selected mechanical engine filter for this rock unit.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matchingWaterfalls.map(([wfId, mapping]) => (
                  <Link
                    key={wfId}
                    to={`/waterfall/${wfId}`}
                    className="bg-white p-3.5 rounded-lg border border-stone-200 hover:border-copper-orange hover:shadow-sm transition flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-sm text-stone-900 group-hover:text-copper-orange transition">
                          {mapping.waterfallName}
                        </span>
                        <span className="text-[10px] font-mono bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-200">
                          {mapping.engine.split(' ')[0]}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 mt-1 line-clamp-2 leading-snug">
                        {mapping.fieldRecognitionClues}
                      </p>
                    </div>
                    <div className="text-[10px] font-mono text-copper-orange font-bold mt-2 flex items-center justify-between">
                      <span>Inspect Dossier</span>
                      <span>→</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  )
}
