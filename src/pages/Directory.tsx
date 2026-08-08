import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

interface Waterfall {
  id: string
  name: string
  county: string
  region: string
  drop_height: string
  hike_difficulty: string
  trail_length_miles: number
}

export default function Directory() {
  const [waterfalls, setWaterfalls] = useState<Waterfall[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWaterfalls() {
      const { data, error } = await supabase
        .from('waterfalls')
        .select('*')
        .order('name', { ascending: true })
      
      if (error) {
        console.error('Error fetching waterfalls:', error)
      } else if (data) {
        setWaterfalls(data)
      }
      setLoading(false)
    }

    fetchWaterfalls()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-12 flex-grow w-full relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 overflow-hidden -z-10">
        <svg className="w-[800px] h-[400px] text-pinery-green fill-current" viewBox="0 0 500 250">
          <path d="M 30,120 Q 60,80 120,70 Q 180,60 220,80 Q 270,40 330,30 Q 380,20 420,50 Q 460,70 470,110 Q 450,140 390,130 Q 340,120 290,140 Q 230,160 170,150 Q 110,140 60,150 Z"/>
        </svg>
      </div>

      <div className="mb-8 border-b-4 border-copper-orange pb-4">
        <div className="inline-flex items-center gap-1.5 bg-copper-orange/20 border border-copper-orange/50 text-copper-orange text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest mb-3">
          <span>📖</span> Complete Index
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl font-extrabold text-pinery-green tracking-tight">
          Waterfall Directory
        </h2>
        <p className="text-slate-600 max-w-2xl mt-4 text-sm sm:text-base leading-relaxed">
          A complete, A-Z index of all {waterfalls.length > 0 ? waterfalls.length : ''} documented waterfalls in the Upper Peninsula. 
        </p>
      </div>

      {loading ? (
        <div className="text-center text-slate-500 py-10 font-semibold font-serif">
          Loading directory...
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse" style={{ tableLayout: 'fixed' }}>
            <thead className="bg-pinery-green text-parchment text-[10px] sm:text-xs uppercase tracking-wider">
              <tr>
                <th className="p-2 sm:p-4 font-bold border-b border-emerald-800" style={{ width: '40%' }}>Name</th>
                <th className="p-2 sm:p-4 font-bold border-b border-emerald-800" style={{ width: '30%' }}>County</th>
                <th className="p-2 sm:p-4 font-bold border-b border-emerald-800 hidden sm:table-cell" style={{ width: '15%' }}>Hike</th>
                <th className="p-2 sm:p-4 font-bold border-b border-emerald-800" style={{ width: '30%' }}>Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {waterfalls.map((wf, idx) => (
                <tr key={wf.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50 hover:bg-slate-100 transition'}>
                  <td className="p-2 sm:p-4 truncate font-serif font-bold text-pinery-green text-base sm:text-lg">
                    {wf.name}
                  </td>
                  <td className="p-2 sm:p-4 text-xs sm:text-sm text-slate-600 truncate">
                    {wf.county}
                  </td>
                  <td className="p-2 sm:p-4 text-xs text-slate-500 hidden sm:table-cell truncate">
                    {wf.hike_difficulty} ({wf.trail_length_miles}m)
                  </td>
                  <td className="p-2 sm:p-4 text-right sm:text-left truncate">
                    <Link 
                      to={`/waterfall/${wf.id}`} 
                      className="inline-block bg-copper-orange hover:bg-tahquamenon-amber text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded transition shadow"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
