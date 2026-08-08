import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

interface Waterfall {
  id: string
  name: string
  county: string
  region: string
  drop_height: string
  hike_difficulty: string
  trail_length_miles: number
  description: string
  waterfall_photos?: { image_url: string; is_hero: boolean }[]
}

export default function Home() {
  const [waterfallsByCounty, setWaterfallsByCounty] = useState<Record<string, Waterfall[]>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWaterfalls() {
      const { data, error } = await supabase
        .from('waterfalls')
        .select(`
          *,
          waterfall_photos ( image_url, is_hero )
        `)
        .order('county', { ascending: true })
      
      if (error) {
        console.error('Error fetching waterfalls:', error)
      } else if (data) {
        // Group by county
        const grouped = data.reduce((acc: Record<string, Waterfall[]>, wf: Waterfall) => {
          if (!acc[wf.county]) acc[wf.county] = []
          acc[wf.county].push(wf)
          return acc
        }, {})
        
        setWaterfallsByCounty(grouped)
      }
      setLoading(false)
    }

    fetchWaterfalls()
  }, [])

  return (
    <>
      {/* Hero Section with Topo SVG Overlay */}
      <section className="relative bg-superior-navy text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b-4 border-copper-orange">
        
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#C06C38" strokeWidth="1.5" fill="none">
            <path d="M-100 50 Q 200 -20, 500 80 T 1200 30" />
            <path d="M-100 100 Q 250 30, 600 140 T 1300 80" />
            <path d="M-100 150 Q 300 70, 700 180 T 1400 120" />
            <path d="M-100 200 Q 350 120, 800 220 T 1500 160" />
          </g>
        </svg>

        <div className="relative max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-copper-orange/20 border border-copper-orange/50 text-copper-orange text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest">
            <span>📍</span> Upper Peninsula Wilderness Travel
          </div>
          
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-parchment tracking-tight">
            Discover Michigan's Northwoods Waterfalls
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Explore over 300 waterfalls hidden among hemlock canopy, red sandstone gorges, and Great Lakes shores.
          </p>

          <div className="pt-2 max-w-md mx-auto flex gap-2">
            <input type="text" placeholder="Search waterfalls (Hungarian, Miners, Bond)..." className="w-full px-4 py-2.5 rounded bg-parchment text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-copper-orange shadow" />
            <button className="bg-copper-orange hover:bg-tahquamenon-amber text-white font-semibold px-5 py-2.5 rounded text-sm transition shrink-0 shadow">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area with UP Silhouette Watermark */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow space-y-12 relative w-full">
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 overflow-hidden -z-10">
          <svg className="w-[800px] h-[400px] text-pinery-green fill-current" viewBox="0 0 500 250">
            <path d="M 30,120 Q 60,80 120,70 Q 180,60 220,80 Q 270,40 330,30 Q 380,20 420,50 Q 460,70 470,110 Q 450,140 390,130 Q 340,120 290,140 Q 230,160 170,150 Q 110,140 60,150 Z"/>
          </svg>
        </div>

        {loading ? (
          <div className="text-center text-slate-500 py-10 font-semibold font-serif">
            Loading county hubs...
          </div>
        ) : Object.keys(waterfallsByCounty).length === 0 ? (
          <div className="text-center text-slate-500 py-10 font-semibold font-serif border-2 border-dashed border-slate-300 rounded-lg bg-white/50">
            No waterfalls found. Please run the Supabase seed script in your SQL Editor!
          </div>
        ) : (
          <div className="space-y-16">
            {Object.entries(waterfallsByCounty).map(([county, falls]) => (
              <section key={county} className="space-y-6">
                <div className="border-b-2 border-copper-orange/30 pb-2 flex items-center justify-between">
                  <h3 className="font-serif text-2xl font-bold text-pinery-green flex items-center gap-2">
                    <span>🗺️</span> {county} County Hub
                  </h3>
                  <span className="text-xs font-semibold text-tahquamenon-amber uppercase tracking-wider">
                    {falls.length} {falls.length === 1 ? 'Waterfall' : 'Waterfalls'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {falls.map((wf) => {
                    const heroPhoto = wf.waterfall_photos?.find(p => p.is_hero)?.image_url
                    
                    return (
                      <div key={wf.id} className="bg-white rounded-lg shadow-md border-2 border-slate-200 overflow-hidden hover:border-copper-orange transition flex flex-col justify-between group">
                        <div>
                          {/* Name plate with dynamic hero photo */}
                          <div 
                            className="h-44 bg-pinery-green p-4 relative flex flex-col justify-between text-white bg-cover bg-center overflow-hidden"
                            style={{ backgroundImage: heroPhoto ? `url('${heroPhoto}')` : undefined }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-superior-navy via-superior-navy/40 to-transparent"></div>
                            
                            <span className="relative z-10 bg-copper-orange text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded self-start shadow">
                              {wf.county} County
                            </span>
                            <div className="relative z-10">
                              <h4 className="font-serif font-bold text-2xl text-parchment drop-shadow-md">{wf.name}</h4>
                              <p className="text-xs text-slate-200 drop-shadow">{wf.region}</p>
                            </div>
                          </div>

                          <div className="p-5 space-y-4">
                            <div className="flex flex-wrap gap-2 text-xs font-medium">
                              <span className="bg-parchment border border-tahquamenon-amber/40 text-tahquamenon-amber px-2.5 py-1 rounded">
                                🥾 {wf.hike_difficulty}
                              </span>
                              <span className="bg-parchment border border-pinery-green/30 text-pinery-green px-2.5 py-1 rounded">
                                📏 {wf.trail_length_miles} Mi Hike
                              </span>
                              <span className="bg-emerald-900/10 text-emerald-800 border border-emerald-500/30 px-2.5 py-1 rounded">
                                🌊 {wf.drop_height} Drop
                              </span>
                            </div>

                            <p className="text-xs text-slate-700 leading-relaxed line-clamp-3">
                              {wf.description}
                            </p>
                          </div>
                        </div>

                        <div className="p-5 pt-0 mt-auto">
                          <Link to={`/waterfall/${wf.id}`} className="block text-center w-full bg-pinery-green group-hover:bg-superior-navy text-white font-medium py-2 rounded text-xs transition shadow">
                            View Waterfall Details ➔
                          </Link>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
