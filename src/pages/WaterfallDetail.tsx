import { Link, useParams } from 'react-router-dom'
import { useEffect, useState, useMemo } from 'react'
import Map from '../components/Map'
import { supabase } from '../lib/supabase'
import { useTrip } from '../lib/TripContext'
import { getThumbnailUrl } from '../lib/utils'
import { enrichWaterfall, type EnrichedWaterfall } from '../lib/enrichWaterfall'
import { TRAVEL_GUIDES, WATERFALL_BLOG_ARTICLES } from '../data/travelGuidesData'

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

interface WeatherData {
  temperature: number
  windspeed: number
  weathercode: number
}

interface DailyWeather {
  date: string
  maxTemp: number
  minTemp: number
  weathercode: number
}

// WMO Weather Code Mapper
function getWeatherInfo(code: number): { text: string; icon: string; trailWarning: string | null } {
  if (code === 0) return { text: 'Clear Sky', icon: '☀️', trailWarning: null }
  if (code === 1) return { text: 'Mainly Clear', icon: '🌤️', trailWarning: null }
  if (code === 2) return { text: 'Partly Cloudy', icon: '⛅', trailWarning: null }
  if (code === 3) return { text: 'Overcast', icon: '☁️', trailWarning: null }
  if ([45, 48].includes(code)) return { text: 'Fog', icon: '🌫️', trailWarning: 'Low visibility' }
  if ([51, 53, 55, 56, 57].includes(code)) return { text: 'Drizzle', icon: '🌧️', trailWarning: 'Trail may be slick' }
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { text: 'Rain', icon: '🌧️', trailWarning: 'Trail likely muddy & slippery' }
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { text: 'Snow', icon: '❄️', trailWarning: 'Snow/Ice on trail' }
  if ([95, 96, 99].includes(code)) return { text: 'Thunderstorm', icon: '⛈️', trailWarning: 'Hazardous conditions' }
  return { text: 'Unknown', icon: '🌡️', trailWarning: null }
}

export default function WaterfallDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [waterfall, setWaterfall] = useState<EnrichedWaterfall | null>(null)
  const [places, setPlaces] = useState<NearbyPlace[]>([])
  const [photos, setPhotos] = useState<WaterfallPhoto[]>([])
  const [blogs, setBlogs] = useState<WaterfallBlog[]>([])
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [dailyForecast, setDailyForecast] = useState<DailyWeather[]>([])
  const [showForecast, setShowForecast] = useState(false)
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
        setWaterfall(enrichWaterfall(wfData))
        
        // Fetch Weather Data from Open-Meteo
        try {
          const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${wfData.latitude}&longitude=${wfData.longitude}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&windspeed_unit=mph&forecast_days=14&timezone=America%2FDetroit`)
          const weatherData = await res.json()
          
          if (weatherData.current_weather) {
            setWeather(weatherData.current_weather)
          }

          if (weatherData.daily) {
            const parsedDaily = weatherData.daily.time.map((timeStr: string, index: number) => ({
              date: new Date(timeStr + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
              maxTemp: Math.round(weatherData.daily.temperature_2m_max[index]),
              minTemp: Math.round(weatherData.daily.temperature_2m_min[index]),
              weathercode: weatherData.daily.weathercode[index]
            }))
            setDailyForecast(parsedDaily)
          }

        } catch (err) {
          console.error("Failed to fetch weather", err)
        }
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
        // Initial active photo to hero or empty if none exist
        setActivePhoto(photosData[0].image_url)
      } else {
        // No photos exist yet - keep empty to show authentic UP wilderness placeholder
        setActivePhoto('')
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

  const featuredMasterGuides = useMemo(() => {
    if (!waterfall) return []
    return TRAVEL_GUIDES.filter(g => g.associatedWaterfallIds.includes(waterfall.id))
  }, [waterfall])

  const allCuratedArticles = useMemo(() => {
    if (!waterfall) return []
    const localArticles = WATERFALL_BLOG_ARTICLES.filter(
      a => a.waterfallId === waterfall.id || a.waterfallName.toLowerCase() === waterfall.name.toLowerCase()
    )
    const dbBlogs = blogs.map(b => ({
      id: b.id,
      waterfallId: waterfall.id,
      waterfallName: waterfall.name,
      title: b.title,
      sourceSite: b.source_site,
      author: 'Staff Writer',
      url: b.url,
      coverImageUrl: b.cover_image_url,
      snippet: b.snippet,
      publishedDate: b.published_date,
      readingTime: '5 min read',
      category: 'Travel Guide'
    }))

    const seen = new Set<string>()
    const combined = []
    for (const art of [...localArticles, ...dbBlogs]) {
      const key = art.title.toLowerCase()
      if (!seen.has(key)) {
        seen.add(key)
        combined.push(art)
      }
    }

    if (combined.length === 0) {
      return WATERFALL_BLOG_ARTICLES.slice(0, 2)
    }

    return combined
  }, [waterfall, blogs])

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
    if (waterfall) {
      addToTrip({
        id: waterfall.id,
        name: waterfall.name,
        region: waterfall.region
      })
    }
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

      <div className="relative rounded-xl overflow-hidden shadow-xl border-2 border-pinery-green bg-emerald-950">
        <div 
          className="h-[450px] bg-cover bg-center relative" 
          style={{ backgroundImage: activePhoto ? `url('${getThumbnailUrl(activePhoto, 1200)}')` : undefined }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-superior-navy via-superior-navy/40 to-transparent"></div>
          
          {!activePhoto && (
            <div className="absolute top-6 right-6 z-20 bg-slate-900/80 backdrop-blur border border-copper-orange/60 text-copper-orange px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow">
              <span>🌲</span> Authentic Photo Needed • <Link to="/admin" className="underline hover:text-white">Upload via Admin</Link>
            </div>
          )}

          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="bg-copper-orange text-white px-2.5 py-0.5 rounded font-medium shadow">{waterfall.region}</span>
              <span className="bg-pinery-green/90 text-white px-2.5 py-0.5 rounded shadow">{waterfall.county} County</span>
              <span className="bg-black/60 text-slate-200 px-2.5 py-0.5 rounded">GPS: {waterfall.latitude}° N, {waterfall.longitude}° W</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-parchment drop-shadow-lg">{waterfall.name}</h2>
            <p className="text-xs sm:text-sm text-slate-300 drop-shadow max-w-2xl">{waterfall.description}</p>
            
            <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold">
              <span className={`px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm border ${
                waterfall.hike_difficulty === 'Easy' ? 'bg-emerald-600/90 text-white border-emerald-400/40' :
                waterfall.hike_difficulty === 'Moderate' ? 'bg-amber-600/90 text-white border-amber-400/40' :
                waterfall.hike_difficulty === 'Difficult' ? 'bg-orange-600/90 text-white border-orange-400/40' :
                'bg-red-700/90 text-white border-red-500/40'
              }`}>
                🥾 {waterfall.hike_difficulty} Hike
              </span>
              <span className="bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-white flex items-center gap-1.5 border border-white/20">
                📏 {waterfall.trail_length_miles} Mi Roundtrip
              </span>
              <span className="bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-white flex items-center gap-1.5 border border-white/20">
                ⏱️ {waterfall.estimated_time_minutes}
              </span>
              <span className="bg-emerald-950/80 text-emerald-300 px-3 py-1 rounded-full flex items-center gap-1.5 border border-emerald-500/30">
                🌊 Drop: {waterfall.drop_height}
              </span>
              <span className="bg-black/40 backdrop-blur-sm text-slate-200 px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20 hidden sm:flex">
                🔄 {waterfall.route_type}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Overview Card */}
          <div className="bg-white p-6 rounded-lg shadow border border-slate-200 space-y-4">
            <h3 className="font-serif text-xl font-bold text-pinery-green border-b border-slate-200 pb-2 flex items-center gap-2">
              <span>🌲</span> Overview & Wilderness Features
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {waterfall.description}
            </p>
            {waterfall.historical_notes && (
              <p className="text-xs text-slate-500 italic bg-parchment p-3 rounded border border-slate-200 leading-relaxed">
                <strong className="text-slate-800 not-italic block mb-0.5">📜 Heritage & Geology:</strong> {waterfall.historical_notes}
              </p>
            )}
          </div>

          {/* Trailhead Specification Dossier */}
          <div className="bg-white p-6 rounded-lg shadow border border-slate-200 space-y-5">
            <div className="border-b border-slate-200 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h3 className="font-serif text-xl font-bold text-pinery-green flex items-center gap-2">
                <span>🥾</span> Trailhead Specifications & Access Guide
              </h3>
              <span className="text-xs text-copper-orange font-bold uppercase tracking-wider">
                {waterfall.hike_difficulty} Route • {waterfall.trail_length_miles} Mi
              </span>
            </div>

            {/* Spec Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-parchment p-3 rounded-lg border border-slate-200 text-center space-y-1">
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block">Roundtrip Hike</span>
                <span className="text-base font-extrabold text-slate-900 block">{waterfall.trail_length_miles} Mi</span>
                <span className="text-[10px] text-slate-500">{waterfall.route_type}</span>
              </div>
              <div className="bg-parchment p-3 rounded-lg border border-slate-200 text-center space-y-1">
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block">Est. Duration</span>
                <span className="text-base font-extrabold text-slate-900 block">{waterfall.estimated_time_minutes}</span>
                <span className="text-[10px] text-slate-500">Average Pace</span>
              </div>
              <div className="bg-parchment p-3 rounded-lg border border-slate-200 text-center space-y-1">
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block">Trail Rating</span>
                <span className={`text-base font-extrabold block ${
                  waterfall.hike_difficulty === 'Easy' ? 'text-emerald-700' :
                  waterfall.hike_difficulty === 'Moderate' ? 'text-amber-700' :
                  waterfall.hike_difficulty === 'Difficult' ? 'text-orange-700' : 'text-red-700'
                }`}>
                  {waterfall.hike_difficulty}
                </span>
                <span className="text-[10px] text-slate-500">Physical Grade</span>
              </div>
              <div className="bg-parchment p-3 rounded-lg border border-slate-200 text-center space-y-1">
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block">Waterfall Drop</span>
                <span className="text-base font-extrabold text-pinery-green block">{waterfall.drop_height}</span>
                <span className="text-[10px] text-slate-500">Vertical Relief</span>
              </div>
            </div>

            {/* Access & Regulations Detailed Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span>🚗</span> Trailhead Parking Access
                </span>
                <p className="text-slate-600 leading-relaxed">{waterfall.parking_type}</p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span>🎫</span> Park Pass & Permits
                </span>
                <p className="text-slate-600 leading-relaxed">{waterfall.pass_required}</p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span>🐕</span> Pet & Dog Regulations
                </span>
                <p className="text-slate-600 leading-relaxed">{waterfall.dog_friendly}</p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span>🦽</span> Trail Surface & Terrain
                </span>
                <p className="text-slate-600 leading-relaxed">{waterfall.trail_surface}</p>
              </div>
            </div>

            {/* Wilderness Pro-Tips Box */}
            <div className="bg-emerald-950/5 border border-emerald-900/20 rounded-lg p-4 space-y-2 text-xs">
              <h4 className="font-serif font-bold text-pinery-green flex items-center gap-2">
                <span>💡</span> Wilderness Trailhead Advisory & Pro-Tips
              </h4>
              <p className="text-slate-700 leading-relaxed">
                {waterfall.trailhead_tips}
              </p>
              <div className="pt-2 border-t border-emerald-900/10 flex items-center gap-2 text-slate-600">
                <span className="font-bold text-slate-900">🗓️ Optimal Viewing:</span>
                <span>{waterfall.best_season}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-slate-200 space-y-4">
            <h3 className="font-serif text-xl font-bold text-pinery-green border-b border-slate-200 pb-2 flex items-center gap-2">
              <span>📸</span> Visitor Photo Gallery
            </h3>
            <p className="text-xs text-slate-500 pb-2">Click any thumbnail to expand the image in the hero viewer above.</p>
            
            {photos.length === 0 ? (
              <div className="text-sm text-slate-500 italic p-5 bg-parchment border border-slate-200 rounded flex flex-col sm:flex-row items-center justify-between gap-3">
                <span>No verified visitor photos uploaded yet for this waterfall.</span>
                <Link to="/admin" className="bg-copper-orange hover:bg-tahquamenon-amber text-white text-xs font-bold px-4 py-2 rounded transition shadow shrink-0 not-italic">
                  Upload Photo
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {photos.map((photo) => (
                  <div key={photo.id} className="space-y-1">
                    <div 
                      onClick={() => setActivePhoto(photo.image_url)}
                      className={`relative h-24 w-full rounded overflow-hidden cursor-pointer shadow hover:opacity-90 transition group border-2 ${activePhoto === photo.image_url ? 'border-copper-orange' : 'border-transparent'}`}
                    >
                      <img src={getThumbnailUrl(photo.image_url, 400)} className="w-full h-full object-cover" alt={photo.caption || 'Waterfall photo'} />
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

          <div className="bg-white p-6 rounded-lg shadow border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="font-serif text-xl font-bold text-pinery-green flex items-center gap-2">
                <span>📰</span> In The Blogs & Field Guides
              </h3>
              <Link
                to="/guides"
                className="text-xs font-bold text-copper-orange hover:text-tahquamenon-amber flex items-center gap-1 transition"
              >
                <span>Browse All Guides</span> ➔
              </Link>
            </div>

            {/* Featured Master Field Guide Banner (if waterfall is in a master guide) */}
            {featuredMasterGuides.map(guide => (
              <div
                key={guide.id}
                className="bg-emerald-950 text-white p-4 sm:p-5 rounded-xl shadow border border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-copper-orange text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                      ★ Featured Master Field Guide
                    </span>
                    <span className="text-emerald-300 text-xs font-semibold">⏱️ {guide.readTime}</span>
                  </div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-white leading-tight">
                    {guide.title}
                  </h4>
                  <p className="text-xs text-emerald-200/80 line-clamp-1">
                    {guide.subtitle}
                  </p>
                </div>
                <Link
                  to={`/guides/${guide.id}`}
                  className="bg-copper-orange hover:bg-tahquamenon-amber text-white text-xs font-bold px-4 py-2.5 rounded shadow transition shrink-0 text-center"
                >
                  Read Field Guide ➔
                </Link>
              </div>
            ))}

            {/* Curated Waterfall Articles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {allCuratedArticles.map(art => (
                <div
                  key={art.id}
                  className="border border-slate-200 rounded-lg overflow-hidden flex flex-col bg-parchment hover:border-copper-orange transition shadow-sm"
                >
                  {art.coverImageUrl && (
                    <div className="relative h-32 w-full overflow-hidden">
                      <img src={art.coverImageUrl} className="h-full w-full object-cover" alt="Article cover" loading="lazy" />
                      <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded">
                        {art.category}
                      </span>
                    </div>
                  )}
                  <div className="p-3.5 flex-grow flex flex-col justify-between space-y-2">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                        <span className="text-copper-orange font-bold">{art.sourceSite}</span>
                        <span>{art.readingTime}</span>
                      </div>
                      <h4 className="font-serif text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {art.title}
                      </h4>
                      {art.snippet && (
                        <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                          {art.snippet}
                        </p>
                      )}
                    </div>
                    <a
                      href={art.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-pinery-green font-bold hover:underline flex items-center gap-1 mt-1 pt-2 border-t border-slate-200"
                    >
                      Read Full Article <span>↗</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          
          {/* Live Weather Widget & Inline 14-Day Forecast (100% Inline Architecture) */}
          {weather && (
            <div className="space-y-3">
              <div 
                onClick={() => setShowForecast(!showForecast)}
                className="bg-emerald-950 p-2.5 sm:p-3 rounded-lg shadow-lg border border-emerald-800 space-y-1.5 relative overflow-hidden text-white cursor-pointer hover:border-emerald-500 hover:shadow-emerald-900/50 transition group"
              >
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <h4 className="font-serif text-[11px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                      Live Conditions 
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-2xl font-extrabold">{Math.round(weather.temperature)}°</span>
                      <div className="flex flex-col text-[11px] font-semibold leading-tight text-emerald-100">
                        <span>{getWeatherInfo(weather.weathercode).icon} {getWeatherInfo(weather.weathercode).text}</span>
                        <span className="text-emerald-300 text-[9px]">Wind: {weather.windspeed} mph</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/10 px-2 py-1 rounded text-[10px] font-bold text-emerald-300 group-hover:bg-emerald-500 group-hover:text-white transition flex items-center gap-1">
                    <span>{showForecast ? 'Hide Forecast ▲' : '14-Day Forecast ▼'}</span>
                  </div>
                </div>
                
                {getWeatherInfo(weather.weathercode).trailWarning ? (
                  <div className="relative z-10 mt-1.5 bg-red-900/40 border border-red-500/50 rounded py-1 px-1.5 text-[10px] sm:text-[11px] text-red-200 font-semibold flex items-center gap-1.5">
                    <span>⚠️</span> {getWeatherInfo(weather.weathercode).trailWarning}
                  </div>
                ) : (
                  <div className="relative z-10 mt-1 text-[10px] text-emerald-300 font-medium">
                    {showForecast ? 'Extended 14-day trail forecast displayed below' : 'Click to expand 14-day trail forecast inline'}
                  </div>
                )}
              </div>

              {/* INLINE 14-DAY FORECAST (100% INLINE ARCHITECTURE - ZERO MODALS) */}
              {showForecast && (
                <div className="bg-emerald-950 rounded-xl shadow-xl border border-emerald-800 p-3 text-white space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between border-b border-emerald-800/80 pb-2">
                    <h5 className="font-serif text-xs font-bold text-emerald-200 flex items-center gap-1.5">
                      <span>📅</span> 14-Day Trail Forecast
                    </h5>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setShowForecast(false); }}
                      className="text-[10px] text-emerald-400 hover:text-white font-bold"
                    >
                      Close
                    </button>
                  </div>

                  <div className="space-y-1.5 pt-1 max-h-[380px] overflow-y-auto">
                    {dailyForecast.map((day, idx) => {
                      const info = getWeatherInfo(day.weathercode)
                      return (
                        <div key={idx} className="bg-emerald-900/40 border border-emerald-800/50 rounded-lg py-1.5 px-2 flex items-center justify-between hover:bg-emerald-900/60 transition text-xs">
                          <span className="text-emerald-100 font-bold text-[11px] w-24">{day.date}</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm">{info.icon}</span>
                            <span className="text-[9px] text-emerald-300 font-semibold uppercase hidden sm:inline">{info.text}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-white font-bold">{day.maxTemp}°</span>
                            <span className="text-xs text-blue-300 font-semibold">{day.minTemp}°</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

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
