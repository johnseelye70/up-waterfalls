import Map from '../components/Map'

export default function TripPlanner() {
  const tripMarkers = [
    { id: '1', lat: 46.4522, lng: -86.5367, label: 'Miners Falls' },
    { id: '2', lat: 46.3861, lng: -86.6343, label: 'Wagner Falls' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6 flex-grow w-full">
      <div className="border-b-2 border-slate-300 pb-2 flex items-center justify-between">
        <div>
          <h3 className="font-serif text-2xl font-bold text-pinery-green flex items-center gap-2">
            <span>🧭</span> My Trip Itinerary: "Keweenaw & Munising Loop"
          </h3>
          <p className="text-xs text-slate-500">Sequenced driving route with planned waterfall & dining stops</p>
        </div>
        <button className="bg-copper-orange hover:bg-tahquamenon-amber text-white text-xs font-semibold px-4 py-2 rounded shadow transition">
          💾 Save Itinerary
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border border-slate-200 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Timeline */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="bg-pinery-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shrink-0">
              1
            </div>
            <div className="flex-grow bg-parchment p-4 rounded border border-slate-200 space-y-1 shadow-sm">
              <div className="flex justify-between items-center">
                <h4 className="font-serif font-bold text-slate-900 text-sm">Stop 1: Miners Falls (Munising Area)</h4>
                <span className="text-[10px] bg-emerald-800 text-white px-2 py-0.5 rounded">09:00 AM</span>
              </div>
              <p className="text-xs text-slate-600">Easy 1.2-mile roundtrip boardwalk trail to a 50-foot waterfall drop.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-copper-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shrink-0">
              🥧
            </div>
            <div className="flex-grow bg-parchment p-4 rounded border border-slate-200 space-y-1 shadow-sm">
              <div className="flex justify-between items-center">
                <h4 className="font-serif font-bold text-slate-900 text-sm">Lunch: Muldoons Pasties</h4>
                <span className="text-[10px] bg-copper-orange text-white px-2 py-0.5 rounded">12:00 PM</span>
              </div>
              <p className="text-xs text-slate-600">Grab warm, authentic beef pasties before heading to the Keweenaw Peninsula.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-pinery-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shrink-0">
              2
            </div>
            <div className="flex-grow bg-parchment p-4 rounded border border-slate-200 space-y-1 shadow-sm">
              <div className="flex justify-between items-center">
                <h4 className="font-serif font-bold text-slate-900 text-sm">Stop 2: Hungarian Falls (Houghton County)</h4>
                <span className="text-[10px] bg-emerald-800 text-white px-2 py-0.5 rounded">03:30 PM</span>
              </div>
              <p className="text-xs text-slate-600">Root trail hike through Dover Creek gorge to view the Lower & Middle falls.</p>
            </div>
          </div>
        </div>

        {/* Route Map */}
        <div className="h-full min-h-[400px]">
          <Map lat={46.4522} lng={-86.5367} zoom={10} markers={tripMarkers} />
        </div>

      </div>
    </div>
  )
}
