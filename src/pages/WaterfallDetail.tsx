import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Map from '../components/Map'
import { supabase } from '../lib/supabase'

interface Waterfall {
  id: string
  name: string
  county: string
  region: string
  latitude: number
  longitude: number
  drop_height: string
  hike_difficulty: string
  trail_length_miles: number
  parking_type: string
  pass_required: string
  historical_notes: string
  description: string
}

export default function WaterfallDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [waterfall, setWaterfall] = useState<Waterfall | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWaterfall() {
      if (!slug) return
      
      const { data, error } = await supabase
        .from('waterfalls')
        .select('*')
        .eq('id', slug)
        .single()
      
      if (error) {
        console.error('Error fetching waterfall:', error)
      } else {
        setWaterfall(data)
      }
      setLoading(false)
    }

    fetchWaterfall()
  }, [slug])

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center font-serif text-xl text-slate-500">
        Loading waterfall details...
      </div>
    )
  }

  if (!waterfall) {
    return (
      <div className="flex-grow flex items-center justify-center font-serif text-xl text-slate-500">
        Waterfall not found.
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6 flex-grow w-full">
      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
        <Link to="/" className="hover:text-copper-orange">{'< Back to Hubs'}</Link>
        <span>|</span>
        <span className="text-slate-800 uppercase">{waterfall.name} HUB PAGE</span>
      </div>

      <div className="relative rounded-xl overflow-hidden shadow-xl border-2 border-pinery-green">
        <div className="h-80 bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80')" }}>
          <div className="absolute inset-0 bg-gradient-to-t from-superior-navy via-superior-navy/40 to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="bg-copper-orange text-white px-2.5 py-0.5 rounded font-medium">{waterfall.region}</span>
              <span className="bg-pinery-green/90 text-white px-2.5 py-0.5 rounded">{waterfall.county} County</span>
              <span className="bg-black/60 backdrop-blur text-slate-200 px-2.5 py-0.5 rounded">GPS: {waterfall.latitude}° N, {waterfall.longitude}° W</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-parchment">{waterfall.name}</h2>
            <p className="text-xs sm:text-sm text-slate-300">{waterfall.description}</p>
            
            <div className="pt-2 flex flex-wrap gap-3 text-xs font-medium">
              <span className="bg-parchment/20 backdrop-blur px-3 py-1 rounded text-white flex items-center gap-1 border border-white/20">
                🥾 Trail: {waterfall.hike_difficulty}
              </span>
              <span className="bg-parchment/20 backdrop-blur px-3 py-1 rounded text-white flex items-center gap-1 border border-white/20">
                📏 Distance: {waterfall.trail_length_miles} Mi Roundtrip
              </span>
              <span className="bg-emerald-950/80 text-emerald-300 px-3 py-1 rounded flex items-center gap-1 border border-emerald-500/30">
                🌊 Drop: {waterfall.drop_height}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-white p-6 rounded-lg shadow border border-slate-200 space-y-4">
            <h3 className="font-serif text-xl font-bold text-pinery-green border-b border-slate-200 pb-2">
              🌲 Overview & Wilderness Features
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {waterfall.description} {waterfall.historical_notes}
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
              <div className="bg-parchment p-3 rounded border border-slate-200">
                <span className="font-bold text-slate-900 block">🚗 Parking Access</span>
                <span className="text-slate-600">{waterfall.parking_type}</span>
              </div>
              <div className="bg-parchment p-3 rounded border border-slate-200">
                <span className="font-bold text-slate-900 block">🎫 Pass Required</span>
                <span className="text-slate-600">{waterfall.pass_required}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="font-serif text-xl font-bold text-pinery-green flex items-center gap-2">
                <span>📰</span> In The Blogs & Travel Guides
              </h3>
              <span className="text-xs text-copper-orange font-semibold">2 Curated Articles</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-slate-200 rounded overflow-hidden flex flex-col bg-parchment hover:border-copper-orange transition">
                <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80" className="h-32 w-full object-cover" alt="Blog cover" />
                <div className="p-3 flex-grow flex flex-col justify-between space-y-2">
                  <span className="text-[10px] text-copper-orange font-bold uppercase tracking-wider">Mitten State Wanderer</span>
                  <h4 className="font-serif text-xs font-bold text-slate-900 leading-snug">Exploring {waterfall.name}</h4>
                  <a href="#" className="text-[11px] text-pinery-green font-semibold hover:underline flex items-center gap-1">
                    Read Article <span>↗</span>
                  </a>
                </div>
              </div>

              <div className="border border-slate-200 rounded overflow-hidden flex flex-col bg-parchment hover:border-copper-orange transition">
                <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80" className="h-32 w-full object-cover" alt="Blog cover" />
                <div className="p-3 flex-grow flex flex-col justify-between space-y-2">
                  <span className="text-[10px] text-copper-orange font-bold uppercase tracking-wider">Pure Michigan Logs</span>
                  <h4 className="font-serif text-xs font-bold text-slate-900 leading-snug">Spring Waterfall Hunting</h4>
                  <a href="#" className="text-[11px] text-pinery-green font-semibold hover:underline flex items-center gap-1">
                    Read Article <span>↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-slate-200 space-y-4">
            <h3 className="font-serif text-xl font-bold text-pinery-green border-b border-slate-200 pb-2">
              📸 Visitor Photo Gallery
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <img src="https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=400&q=80" className="rounded h-24 w-full object-cover shadow hover:opacity-90 cursor-pointer" alt="Falls 1" />
              <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80" className="rounded h-24 w-full object-cover shadow hover:opacity-90 cursor-pointer" alt="Falls 2" />
              <img src="https://images.unsplash.com/photo-1511497584788-876761c11969?auto=format&fit=crop&w=400&q=80" className="rounded h-24 w-full object-cover shadow hover:opacity-90 cursor-pointer" alt="Falls 3" />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow border border-slate-200 space-y-3">
            <h4 className="font-serif text-sm font-bold text-pinery-green flex items-center gap-1.5">
              <span>🗺️</span> Location Map & Trailhead
            </h4>
            <div className="h-48">
              <Map lat={waterfall.latitude} lng={waterfall.longitude} />
            </div>
            <button className="w-full bg-copper-orange hover:bg-tahquamenon-amber text-white font-semibold py-2 rounded text-xs transition shadow">
              ➕ Add to My Trip Itinerary
            </button>
          </div>

          <div className="bg-white p-5 rounded-lg shadow border border-slate-200 space-y-4">
            <div className="border-b border-slate-200 pb-2">
              <h4 className="font-serif text-base font-bold text-pinery-green flex items-center gap-2">
                <span>🥧</span> Nearby Eats
              </h4>
              <p className="text-[11px] text-slate-500">Curated within 12 miles of trailhead</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-2.5 rounded bg-parchment border border-slate-200">
                <span className="text-copper-orange font-bold text-[10px] uppercase block tracking-wider">🍳 Breakfast</span>
                <span className="font-bold text-slate-900 block">Local Diner</span>
                <span className="text-slate-600">Great local spot for morning fuel.</span>
              </div>
              <div className="p-2.5 rounded bg-parchment border border-slate-200">
                <span className="text-copper-orange font-bold text-[10px] uppercase block tracking-wider">🥧 Lunch</span>
                <span className="font-bold text-slate-900 block">UP Pasties</span>
                <span className="text-slate-600">Traditional U.P. beef & rutabaga pasties.</span>
              </div>
              <div className="p-2.5 rounded bg-parchment border border-slate-200">
                <span className="text-copper-orange font-bold text-[10px] uppercase block tracking-wider">🍺 Dinner</span>
                <span className="font-bold text-slate-900 block">Local Tavern</span>
                <span className="text-slate-600">Craft brews & pub food.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
