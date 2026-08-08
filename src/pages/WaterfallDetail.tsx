import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Map from '../components/Map'
import { supabase } from '../lib/supabase'
import { useTrip } from '../lib/TripContext'

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

interface NearbyPlace {
  id: string
  category: string
  name: string
  description: string
  distance_miles: number
}

interface WaterfallPhoto {
  id: string
  image_url: string
  caption: string
  credit_name: string
  is_hero: boolean
}

interface WaterfallBlog {
  id: string
  title: string
  source_site: string
  url: string
  cover_image_url: string
  snippet: string
  published_date: string
}

export default function WaterfallDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [waterfall, setWaterfall] = useState<Waterfall | null>(null)
  const [places, setPlaces] = useState<NearbyPlace[]>([])
  const [photos, setPhotos] = useState<WaterfallPhoto[]>([])
  const [blogs, setBlogs] = useState<WaterfallBlog[]>([])
  const [activePhoto, setActivePhoto] = useState<string>('')
  const [loading, setLoading] = useState(true)
  
  const { addToTrip, tripItems } = useTrip()
  
  const isAdded = waterfall ? tripItems.some(i => i.id === waterfall.id) : false

  useEffect(() => {
    async function fetchData() {
      if (!slug) return
      
      const { data: wfData, error: wfError } = await supabase
        .from('waterfalls')
        .select('*')
        .eq('id', slug)
        .single()
      
      if (wfError) {
        console.error('Error fetching waterfall:', wfError)
      } else {
        setWaterfall(wfData)
      }

      const { data: placesData, error: placesError } = await supabase
        .from('nearby_places')
        .select('*')
        .eq('waterfall_id', slug)
        .order('distance_miles', { ascending: true })

      if (placesError) {
        console.error('Error fetching nearby places:', placesError)
      } else {
        setPlaces(placesData || [])
      }

      const { data: photosData, error: photosError } = await supabase
        .from('waterfall_photos')
        .select('*')
        .eq('waterfall_id', slug)
        .order('is_hero', { ascending: false })

      if (photosError) {
        console.error('Error fetching photos:', photosError)
      } else if (photosData && photosData.length > 0) {
        setPhotos(photosData)
        // Set initial active photo to the hero (or the first one)
        setActivePhoto(photosData[0].image_url)
      } else {
        // Fallback default image if no photos exist
        setActivePhoto('https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80')
      }

      const { data: blogsData, error: blogsError } = await supabase
        .from('waterfall_blogs')
        .select('*')
        .eq('waterfall_id', slug)
        .order('published_date', { ascending: false })

      if (blogsError) {
        console.error('Error fetching blogs:', blogsError)
      } else {
        setBlogs(blogsData || [])
      }

      setLoading(false)
    }

    fetchData()
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

  const handleAddToTrip = () => {
    addToTrip({
      id: waterfall.id,
      name: waterfall.name,
      region: waterfall.region
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6 flex-grow w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <Link to="/" className="hover:text-copper-orange">{'< Back to Hubs'}</Link>
          <span>|</span>
          <span className="text-slate-800 uppercase">{waterfall.name} HUB PAGE</span>
        </div>
        
        {/* Helper instruction for user to know the image is a dynamic hero gallery */}
        {photos.length > 0 && (
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-100 px-2 py-1 rounded border border-slate-200">
            Inline Hero Gallery Active
          </div>
        )}
      </div>

      <div className="relative rounded-xl overflow-hidden shadow-xl border-2 border-pinery-green transition-all duration-500">
        <div className="h-[450px] bg-cover bg-center relative transition-all duration-700 ease-in-out" style={{ backgroundImage: `url('${activePhoto}')` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-superior-navy via-superior-navy/40 to-transparent transition-opacity"></div>
          
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="bg-copper-orange text-white px-2.5 py-0.5 rounded font-medium shadow">{waterfall.region}</span>
              <span className="bg-pinery-green/90 text-white px-2.5 py-0.5 rounded shadow">{waterfall.county} County</span>
              <span className="bg-black/60 backdrop-blur text-slate-200 px-2.5 py-0.5 rounded">GPS: {waterfall.latitude}° N, {waterfall.longitude}° W</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-parchment drop-shadow-lg">{waterfall.name}</h2>
            <p className="text-xs sm:text-sm text-slate-300 drop-shadow max-w-2xl">{waterfall.description}</p>
            
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
            <h3 className="font-serif text-xl font-bold text-pinery-green border-b border-slate-200 pb-2 flex items-center gap-2">
              <span>📸</span> Visitor Photo Gallery
            </h3>
            <p className="text-xs text-slate-500 pb-2">Click any thumbnail to expand the image in the hero viewer above.</p>
            
            {photos.length === 0 ? (
              <div className="text-sm text-slate-500 italic p-4 bg-parchment border border-slate-200 rounded">
                No visitor photos uploaded yet.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {photos.map((photo) => (
                  <div key={photo.id} className="space-y-1">
                    <div 
                      onClick={() => setActivePhoto(photo.image_url)}
                      className={`relative h-24 w-full rounded overflow-hidden cursor-pointer shadow hover:opacity-90 transition group border-2 ${activePhoto === photo.image_url ? 'border-copper-orange' : 'border-transparent'}`}
                    >
                      <img src={photo.image_url} className="w-full h-full object-cover" alt={photo.caption || 'Waterfall photo'} />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs font-bold uppercase tracking-widest drop-shadow">View Large</span>
                      </div>
                    </div>
                    {photo.caption && (
                      <p className="text-[10px] text-slate-500 truncate" title={photo.caption}>{photo.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="font-serif text-xl font-bold text-pinery-green flex items-center gap-2">
                <span>📰</span> In The Blogs & Travel Guides
              </h3>
              {blogs.length > 0 && (
                <span className="text-xs text-copper-orange font-semibold">{blogs.length} Curated Articles</span>
              )}
            </div>

            {blogs.length === 0 ? (
              <div className="text-sm text-slate-500 italic p-4 bg-parchment border border-slate-200 rounded">
                No curated articles or travel guides linked yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {blogs.map(blog => (
                  <div key={blog.id} className="border border-slate-200 rounded overflow-hidden flex flex-col bg-parchment hover:border-copper-orange transition">
                    {blog.cover_image_url && (
                      <img src={blog.cover_image_url} className="h-32 w-full object-cover" alt="Blog cover" />
                    )}
                    <div className="p-3 flex-grow flex flex-col justify-between space-y-2">
                      <span className="text-[10px] text-copper-orange font-bold uppercase tracking-wider">{blog.source_site}</span>
                      <h4 className="font-serif text-xs font-bold text-slate-900 leading-snug">{blog.title}</h4>
                      {blog.snippet && (
                        <p className="text-[11px] text-slate-600 line-clamp-2">{blog.snippet}</p>
                      )}
                      <a href={blog.url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-pinery-green font-semibold hover:underline flex items-center gap-1 mt-2">
                        Read Article <span>↗</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
            {isAdded ? (
              <button disabled className="w-full bg-slate-300 text-slate-600 font-semibold py-2 rounded text-xs shadow flex items-center justify-center gap-1">
                <span>✓</span> Added to Itinerary
              </button>
            ) : (
              <button onClick={handleAddToTrip} className="w-full bg-copper-orange hover:bg-tahquamenon-amber text-white font-semibold py-2 rounded text-xs transition shadow">
                ➕ Add to My Trip Itinerary
              </button>
            )}
          </div>

          <div className="bg-white p-5 rounded-lg shadow border border-slate-200 space-y-4">
            <div className="border-b border-slate-200 pb-2 flex justify-between items-end">
              <h4 className="font-serif text-base font-bold text-pinery-green flex items-center gap-2">
                <span>🥧</span> Nearby Attractions
              </h4>
              <p className="text-[11px] text-slate-500">
                {places.length > 0 ? `Within ${Math.max(...places.map(p => p.distance_miles), 12)} miles` : 'Within 12 miles'}
              </p>
            </div>

            <div className="space-y-3 text-xs">
              {places.length === 0 ? (
                <div className="p-3 text-slate-500 italic bg-parchment rounded border border-slate-200 text-center">
                  No nearby attractions listed for this waterfall yet.
                </div>
              ) : (
                places.map(place => (
                  <div key={place.id} className="p-2.5 rounded bg-parchment border border-slate-200 relative">
                    <span className="text-copper-orange font-bold text-[10px] uppercase block tracking-wider">
                      {place.category === 'Breakfast' && '🍳 '}
                      {place.category === 'Lunch' && '🥧 '}
                      {place.category === 'Dinner' && '🍺 '}
                      {place.category === 'Lodging' && '🏡 '}
                      {place.category}
                    </span>
                    <span className="font-bold text-slate-900 block">{place.name}</span>
                    <span className="text-slate-600">{place.description}</span>
                    <span className="absolute top-2.5 right-2.5 text-[10px] font-semibold text-pinery-green bg-pinery-green/10 px-1.5 py-0.5 rounded">
                      {place.distance_miles} mi
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
