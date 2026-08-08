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
  const [waterfall, setWaterfall] = useState<Waterfall | null>(null)
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
        setWaterfall(wfData)
        
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
          
          {/* Live Weather Widget */}
          {weather && (
            <div 
              onClick={() => setShowForecast(true)}
              className="bg-emerald-950 p-3 sm:p-4 rounded-lg shadow-lg border border-emerald-800 space-y-2 relative overflow-hidden text-white cursor-pointer hover:border-emerald-500 hover:shadow-emerald-900/50 transition group"
            >
              <div className="absolute right-0 top-0 opacity-10 text-7xl group-hover:scale-110 transition-transform duration-500 pointer-events-none origin-top-right">
                {getWeatherInfo(weather.weathercode).icon}
              </div>
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <h4 className="font-serif text-xs font-bold text-emerald-400 uppercase tracking-widest mb-0.5 flex items-center gap-1.5">
                    Live Conditions 
                  </h4>
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl font-extrabold">{Math.round(weather.temperature)}°</span>
                    <div className="flex flex-col text-xs font-semibold leading-tight text-emerald-100">
                      <span>{getWeatherInfo(weather.weathercode).icon} {getWeatherInfo(weather.weathercode).text}</span>
                      <span className="text-emerald-300 text-[10px] mt-0.5">Wind: {weather.windspeed} mph</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 p-1.5 rounded-full backdrop-blur group-hover:bg-emerald-500 transition">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              
              {getWeatherInfo(weather.weathercode).trailWarning ? (
                <div className="relative z-10 mt-2 bg-red-900/40 border border-red-500/50 rounded py-1.5 px-2 text-[10px] sm:text-xs text-red-200 font-semibold flex items-center gap-1.5">
                  <span>⚠️</span> {getWeatherInfo(weather.weathercode).trailWarning}
                </div>
              ) : (
                <div className="relative z-10 mt-2 text-[10px] sm:text-xs text-emerald-200 font-medium flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition">
                  <span>📅</span> View 14-Day Forecast
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

      {/* 14-DAY FORECAST MODAL OVERLAY (iOS Safe) */}
      {showForecast && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 animate-in fade-in duration-200" style={{ width: '100%', height: '100%' }}>
          <div className="bg-emerald-950 w-full max-w-sm rounded-xl shadow-2xl border border-emerald-800 flex flex-col overflow-hidden max-h-[85%]">
            
            {/* Modal Header */}
            <div className="bg-emerald-900/90 px-4 py-3 border-b border-emerald-800 flex items-center justify-between sticky top-0 z-10">
              <div>
                <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                  <span>📅</span> 14-Day Forecast
                </h3>
                <p className="text-[10px] text-emerald-300 mt-0.5 uppercase tracking-wider font-semibold truncate max-w-[200px]">
                  {waterfall.name}
                </p>
              </div>
              <button 
                onClick={() => setShowForecast(false)}
                className="text-emerald-400 hover:text-white transition p-1.5 bg-emerald-950/50 hover:bg-emerald-800 rounded-full"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-3 overflow-y-auto">
              <div className="space-y-1.5">
                {dailyForecast.map((day, idx) => {
                  const info = getWeatherInfo(day.weathercode)
                  return (
                    <div key={idx} className="bg-emerald-900/40 border border-emerald-800/50 rounded-lg p-2.5 flex items-center justify-between hover:bg-emerald-900/60 transition">
                      
                      <div className="flex items-center gap-3 w-1/3 min-w-[80px]">
                        <span className="text-emerald-100 font-bold text-xs sm:text-sm">{day.date}</span>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center w-1/3">
                        <span className="text-xl mb-0.5">{info.icon}</span>
                        <span className="text-[9px] text-emerald-300 font-semibold uppercase tracking-wider text-center">{info.text}</span>
                      </div>
                      
                      <div className="flex items-center justify-end gap-3 w-1/3">
                        <div className="flex flex-col items-end">
                          <span className="text-[9px] text-emerald-400/70 font-semibold uppercase">Hi</span>
                          <span className="text-sm text-white font-bold">{day.maxTemp}°</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-[9px] text-blue-400/70 font-semibold uppercase">Lo</span>
                          <span className="text-sm text-blue-200 font-bold">{day.minTemp}°</span>
                        </div>
                      </div>

                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
