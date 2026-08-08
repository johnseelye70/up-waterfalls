import { useEffect, useState } from 'react'
import Map from '../components/Map'
import { useTrip } from '../lib/TripContext'
import { supabase } from '../lib/supabase'

interface TripWaterfall {
  id: string
  name: string
  region: string
  latitude: number
  longitude: number
  drop_height: string
  hike_difficulty: string
}

export default function TripPlanner() {
  const { tripItems, removeFromTrip, clearTrip } = useTrip()
  const [tripData, setTripData] = useState<TripWaterfall[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadTripData() {
      if (tripItems.length === 0) {
        setTripData([])
        return
      }

      setLoading(true)
      const ids = tripItems.map(item => item.id)
      
      const { data, error } = await supabase
        .from('waterfalls')
        .select('*')
        .in('id', ids)

      if (error) {
        console.error('Error fetching trip waterfalls:', error)
      } else {
        // Sort data to match the order in tripItems
        const sorted = tripItems.map(item => data.find(d => d.id === item.id)!).filter(Boolean)
        setTripData(sorted)
      }
      setLoading(false)
    }

    loadTripData()
  }, [tripItems])

  const tripMarkers = tripData.map(wf => ({
    id: wf.id,
    lat: wf.latitude,
    lng: wf.longitude,
    label: wf.name
  }))

  const centerLat = tripData.length > 0 ? tripData[0].latitude : 46.4522
  const centerLng = tripData.length > 0 ? tripData[0].longitude : -86.5367

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6 flex-grow w-full">
      <div className="border-b-2 border-slate-300 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl font-bold text-pinery-green flex items-center gap-2">
            <span>🧭</span> My Trip Itinerary
          </h3>
          <p className="text-xs text-slate-500">Your locally saved waterfall stops and driving route</p>
        </div>
        <div className="flex gap-2">
          {tripItems.length > 0 && (
            <button onClick={clearTrip} className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold px-4 py-2 rounded transition">
              Clear Trip
            </button>
          )}
          <button className="bg-copper-orange hover:bg-tahquamenon-amber text-white text-xs font-semibold px-4 py-2 rounded shadow transition">
            💾 Save (Coming Soon)
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border border-slate-200 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Timeline */}
        <div className="space-y-6">
          {tripItems.length === 0 ? (
            <div className="text-slate-500 text-sm italic py-10 text-center bg-parchment rounded border border-slate-200">
              Your trip is empty. Browse the waterfalls directory to add stops!
            </div>
          ) : loading ? (
            <div className="text-slate-500 text-sm py-10 text-center font-semibold">
              Loading itinerary details...
            </div>
          ) : (
            tripData.map((wf, index) => (
              <div key={wf.id} className="flex items-start gap-4 group">
                <div className="bg-pinery-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shrink-0 shadow">
                  {index + 1}
                </div>
                <div className="flex-grow bg-parchment p-4 rounded border border-slate-200 space-y-2 shadow-sm relative pr-8">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-serif font-bold text-slate-900 text-sm leading-tight">Stop {index + 1}: {wf.name}</h4>
                      <p className="text-[10px] text-copper-orange font-semibold uppercase">{wf.region}</p>
                    </div>
                  </div>
                  <div className="text-xs text-slate-600 flex gap-3">
                    <span>🥾 {wf.hike_difficulty}</span>
                    <span>🌊 {wf.drop_height}</span>
                  </div>
                  
                  <button 
                    onClick={() => removeFromTrip(wf.id)}
                    className="absolute top-2 right-2 text-slate-400 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
                    title="Remove stop"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Route Map */}
        <div className="h-full min-h-[400px]">
          <Map lat={centerLat} lng={centerLng} zoom={tripData.length === 1 ? 12 : 7} markers={tripMarkers} />
        </div>

      </div>
    </div>
  )
}
