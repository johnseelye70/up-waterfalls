import { useState } from 'react'
import type { EnrichedWaterfall } from '../lib/enrichWaterfall'
import { getGeologyForWaterfall } from '../data/geologyData'
import { getWinterConditionForWaterfall } from '../data/winterClimbingData'

interface PrintablePamphletProps {
  waterfall: EnrichedWaterfall
  onClose?: () => void
}

function toDMS(deg: number, isLat: boolean): string {
  const absolute = Math.abs(deg)
  const degrees = Math.floor(absolute)
  const minutesNotTruncated = (absolute - degrees) * 60
  const minutes = Math.floor(minutesNotTruncated)
  const seconds = Math.floor((minutesNotTruncated - minutes) * 60)
  const direction = isLat ? (deg >= 0 ? 'N' : 'S') : (deg >= 0 ? 'E' : 'W')
  return `${degrees}°${minutes}'${seconds}"${direction}`
}

export default function PrintablePamphlet({ waterfall, onClose }: PrintablePamphletProps) {
  const [highContrast, setHighContrast] = useState(false)
  const geology = getGeologyForWaterfall(waterfall.name, waterfall.county)
  const winter = getWinterConditionForWaterfall(waterfall.id)

  const latDms = toDMS(waterfall.latitude, true)
  const lngDms = toDMS(waterfall.longitude, false)

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className={`mt-8 border-2 rounded-xl overflow-hidden transition-all duration-300 ${
      highContrast 
        ? 'bg-white text-black border-black' 
        : 'bg-[#faf6ee] text-[#1c2e22] border-emerald-900/30 shadow-2xl'
    }`}>
      {/* Screen toolbar (hidden in print) */}
      <div className="print:hidden bg-emerald-950 text-parchment px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-3 border-b-2 border-copper-orange">
        <div className="flex items-center gap-2">
          <span className="text-xl">📜</span>
          <span className="font-serif font-bold text-sm sm:text-base tracking-wide">
            OFFLINE RANGER POCKET PAMPHLET (Tri-Fold Field Dossier)
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setHighContrast(!highContrast)}
            className="px-3 py-1.5 rounded bg-emerald-800 hover:bg-emerald-700 text-white font-medium border border-emerald-600 transition"
          >
            {highContrast ? '🎨 Scenic Parchment Mode' : '🖨️ High-Contrast Ink Saver'}
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-1.5 rounded bg-copper-orange hover:bg-tahquamenon-amber text-white font-bold shadow transition flex items-center gap-1.5"
          >
            <span>🖨️</span> Print Dossier
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="px-2.5 py-1.5 rounded bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 transition"
            >
              ✕ Close
            </button>
          )}
        </div>
      </div>

      {/* Print Instructions Notice (hidden on paper) */}
      <div className="print:hidden bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-900 flex items-center justify-between">
        <span>💡 <strong>Field Tip:</strong> Select <em>"Landscape"</em> or <em>"Portrait"</em> in your browser print dialog and enable <em>"Background graphics"</em> if you wish to preserve watermarks.</span>
        <span className="font-mono text-[11px] text-amber-800">100% Offline Ready</span>
      </div>

      {/* Tri-Fold Pamphlet Body */}
      <div className="p-6 sm:p-8 print:p-4 max-w-5xl mx-auto space-y-6">
        
        {/* Pamphlet Header */}
        <div className="border-b-2 border-current pb-4 text-center">
          <div className="text-[10px] sm:text-xs font-mono tracking-widest uppercase mb-1 font-bold">
            Michigan Upper Peninsula Wilderness Ranger Service • Official Field Dossier
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-black tracking-tight uppercase">
            {waterfall.name}
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono mt-2 font-semibold">
            <span>COUNTY: {waterfall.county?.toUpperCase()}</span>
            <span>•</span>
            <span>DROP: {waterfall.drop_height || 'Variable Cascade'}</span>
            <span>•</span>
            <span>TRAIL: {waterfall.hike_difficulty || 'Moderate'} ({waterfall.trail_length_miles || '0.5'} mi RT)</span>
            <span>•</span>
            <span>REGION: {waterfall.region?.toUpperCase() || 'UPPER PENINSULA'}</span>
          </div>
        </div>

        {/* 3-Column Tri-Fold Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed">
          
          {/* PANEL 1: GPS & BACKCOUNTRY NAVIGATION */}
          <div className="border border-current p-4 rounded space-y-3 bg-white/40 print:bg-transparent">
            <h3 className="font-serif font-bold text-sm tracking-wider uppercase border-b border-current pb-1 flex items-center gap-1.5">
              <span>📍</span> Panel 1: GPS Waypoints
            </h3>
            
            <div className="space-y-1.5">
              <div className="font-bold text-[11px] uppercase tracking-wide">Coordinates (WGS84):</div>
              <div className="font-mono text-[11px] bg-slate-100 print:bg-slate-50 p-2 rounded border border-slate-300">
                <div>DEC: {waterfall.latitude.toFixed(5)}, {waterfall.longitude.toFixed(5)}</div>
                <div>DMS: {latDms}, {lngDms}</div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="font-bold text-[11px] uppercase tracking-wide">Trailhead Access:</div>
              <p className="text-[11px]">
                {waterfall.parking_type || 'Roadside Forest Turnout'}. Route: {waterfall.route_type || 'Out & Back'}.
              </p>
              <p className="text-[11px] italic">
                {waterfall.trailhead_tips || 'Exercise caution on unpaved logging spurs and seasonal county roads.'}
              </p>
            </div>

            <div className="space-y-1">
              <div className="font-bold text-[11px] uppercase tracking-wide">Pass & Recreation Fees:</div>
              <p className="text-[11px]">
                {waterfall.pass_required || 'No vehicle permit required for general national/state forest parcels.'}
              </p>
            </div>

            <div className="space-y-1 pt-2 border-t border-current/30">
              <div className="font-bold text-[11px] uppercase tracking-wide">Pet Policy:</div>
              <p className="text-[11px]">{waterfall.dog_friendly || 'Leashed dogs welcome on trail.'}</p>
            </div>
          </div>

          {/* PANEL 2: GEOLOGY, FLOW & ECOSYSTEM */}
          <div className="border border-current p-4 rounded space-y-3 bg-white/40 print:bg-transparent">
            <h3 className="font-serif font-bold text-sm tracking-wider uppercase border-b border-current pb-1 flex items-center gap-1.5">
              <span>🔬</span> Panel 2: Rift Strata & Flow
            </h3>

            {geology ? (
              <div className="space-y-1.5">
                <div className="font-bold text-[11px] uppercase tracking-wide">Bedrock Unit:</div>
                <p className="font-serif font-bold text-xs">{geology.strataUnit}</p>
                <div className="text-[10px] font-mono text-emerald-900 print:text-black">
                  Age: {geology.ageEon} • Dynamic: {geology.engine}
                </div>
                <p className="text-[11px] mt-1 leading-snug">
                  {geology.fieldRecognitionClues}
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="font-bold text-[11px] uppercase tracking-wide">Bedrock Engine:</div>
                <p className="text-[11px]">Precambrian Laurentian Shield escarpment shaped by late Wisconsin glaciation.</p>
              </div>
            )}

            {winter && (
              <div className="space-y-1 pt-2 border-t border-current/30">
                <div className="font-bold text-[11px] uppercase tracking-wide">Winter Ice Conditions:</div>
                <div className="text-[11px]">
                  <strong>Rating:</strong> {winter.iceGrade} ({winter.verticalIceDropFeet} ft)
                </div>
                <div className="text-[11px]">
                  <strong>Freeze Window:</strong> {winter.typicalFreezeWindow}
                </div>
                <div className="text-[10px] italic">
                  Road plow: {winter.winterTrailheadPlowed ? 'Regularly Cleared' : 'Unplowed Backcountry Access'}
                </div>
              </div>
            )}

            <div className="space-y-1 pt-2 border-t border-current/30">
              <div className="font-bold text-[11px] uppercase tracking-wide">Leave No Trace Covenant:</div>
              <ul className="list-disc pl-4 space-y-0.5 text-[10px]">
                <li>Pack out all trash and fruit peels.</li>
                <li>Stay on sandstone rim trails to prevent erosion.</li>
                <li>Never throw rocks or dive into foaming plunge pools.</li>
              </ul>
            </div>
          </div>

          {/* PANEL 3: WILDERNESS DISPATCH & RANGER LOG */}
          <div className="border border-current p-4 rounded space-y-3 bg-white/40 print:bg-transparent">
            <h3 className="font-serif font-bold text-sm tracking-wider uppercase border-b border-current pb-1 flex items-center gap-1.5">
              <span>📻</span> Panel 3: Emergency Dispatch
            </h3>

            <div className="space-y-1 font-mono text-[10px] bg-red-50/80 print:bg-transparent p-2 rounded border border-red-200 print:border-black">
              <div className="font-bold text-red-900 print:text-black">CRITICAL DISPATCH CONTACTS:</div>
              <div>• DNR 24/7 Report Emergency: 1-800-292-7800</div>
              <div>• MSP Negaunee (Dist 8): 906-475-9922</div>
              <div>• VHF Radio: Marine Ch 16 (Coast Guard)</div>
              <div>• Text-to-911: Send SMS if call fails (All UP)</div>
            </div>

            {/* Field Observation Stamp Box */}
            <div className="border-2 border-dashed border-current p-3 rounded text-center space-y-1.5 mt-3">
              <div className="font-serif font-bold text-xs uppercase tracking-wide">
                Ranger Field Stamp & Log
              </div>
              <div className="h-14 border border-current/40 rounded flex items-center justify-center text-[10px] text-slate-400 italic">
                Affix Trailhead Stamp or Rubbing Here
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px] text-left pt-1">
                <div>DATE: ____________</div>
                <div>FLOW: ___________</div>
                <div>TEMP: ____________</div>
                <div>CREW: ___________</div>
              </div>
            </div>

            <div className="text-[9px] text-center font-mono opacity-80 pt-1">
              Field Dossier • Generated {new Date().toLocaleDateString()} • Beta 1.1.0
            </div>
          </div>

        </div>

        {/* Ranger Safety Disclaimer Footer */}
        <div className="text-[10px] border-t border-current/40 pt-3 text-center leading-normal opacity-90">
          <strong>BACKCOUNTRY NOTICE:</strong> Cell coverage in the Upper Peninsula is highly erratic. Always inform someone of your route and estimated return time before entering logging spurs or wilderness gorges.
        </div>

      </div>
    </div>
  )
}
