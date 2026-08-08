import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

interface Photo {
  image_url: string
  caption: string
}

interface Waterfall {
  id: string
  name: string
  county: string
  region: string
  drop_height: string
  hike_difficulty: string
  trail_length_miles: number
  youtube_video_id?: string | null
  waterfall_photos?: Photo[]
}

export default function Directory() {
  const [waterfalls, setWaterfalls] = useState<Waterfall[]>([])
  const [loading, setLoading] = useState(true)

  // Gallery Modal State
  const [selectedWaterfall, setSelectedWaterfall] = useState<Waterfall | null>(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  // Video Modal State
  const [selectedVideo, setSelectedVideo] = useState<Waterfall | null>(null)

  useEffect(() => {
    async function fetchWaterfalls() {
      const { data, error } = await supabase
        .from('waterfalls')
        .select('*, waterfall_photos(image_url, caption)')
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

  const openGallery = (wf: Waterfall) => {
    setSelectedWaterfall(wf)
    setCurrentPhotoIndex(0)
  }

  const closeGallery = () => {
    setSelectedWaterfall(null)
  }

  const nextPhoto = () => {
    if (selectedWaterfall?.waterfall_photos) {
      setCurrentPhotoIndex((prev) => 
        (prev + 1) % selectedWaterfall.waterfall_photos!.length
      )
    }
  }

  const prevPhoto = () => {
    if (selectedWaterfall?.waterfall_photos) {
      setCurrentPhotoIndex((prev) => 
        (prev - 1 + selectedWaterfall.waterfall_photos!.length) % selectedWaterfall.waterfall_photos!.length
      )
    }
  }

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
        <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-x-auto">
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
                    {wf.youtube_video_id && (
                      <button 
                        onClick={() => setSelectedVideo(wf)}
                        className="inline-block bg-emerald-700 hover:bg-emerald-600 text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded transition shadow mr-2"
                      >
                        Video
                      </button>
                    )}
                    <button 
                      onClick={() => openGallery(wf)}
                      className="inline-block bg-copper-orange hover:bg-tahquamenon-amber text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded transition shadow mr-2"
                    >
                      Gallery
                    </button>
                    <Link 
                      to={`/waterfall/${wf.id}`} 
                      className="inline-block bg-pinery-green hover:bg-superior-navy text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded transition shadow"
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

      {/* FULL-SCREEN IMAGE GALLERY MODAL */}
      {selectedWaterfall && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col animate-in fade-in duration-300">
          {/* Header Bar */}
          <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex justify-between items-start z-10 bg-gradient-to-b from-black/80 to-transparent">
            <div>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white drop-shadow-lg">
                {selectedWaterfall.name}
              </h3>
              <p className="text-copper-orange font-semibold tracking-widest text-xs uppercase mt-1 drop-shadow">
                {selectedWaterfall.county} County
              </p>
            </div>
            
            <button 
              onClick={closeGallery}
              className="bg-white/10 hover:bg-copper-orange text-white rounded-full p-2 backdrop-blur transition border border-white/20"
              title="Close Gallery"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Image Container */}
          <div className="flex-grow flex items-center justify-center relative p-4 sm:p-12 mt-16 sm:mt-0">
            {(!selectedWaterfall.waterfall_photos || selectedWaterfall.waterfall_photos.length === 0) ? (
              <div className="text-center text-slate-400 font-serif italic text-lg sm:text-xl border border-slate-700 bg-slate-900/50 p-8 rounded-xl backdrop-blur">
                No photos available for this waterfall yet.
                <div className="mt-4">
                  <Link 
                    to={`/waterfall/${selectedWaterfall.id}`} 
                    onClick={closeGallery}
                    className="inline-block bg-copper-orange text-white px-6 py-2 rounded text-sm font-sans not-italic font-bold"
                  >
                    Go to Details Page
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <img 
                  src={selectedWaterfall.waterfall_photos[currentPhotoIndex].image_url} 
                  alt={selectedWaterfall.name}
                  className="max-w-full max-h-full object-contain rounded shadow-2xl transition-opacity duration-300"
                />

                {/* Left Arrow */}
                {selectedWaterfall.waterfall_photos.length > 1 && (
                  <button 
                    onClick={prevPhoto}
                    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-copper-orange text-white rounded-full p-3 sm:p-4 backdrop-blur border border-white/10 transition group"
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}

                {/* Right Arrow */}
                {selectedWaterfall.waterfall_photos.length > 1 && (
                  <button 
                    onClick={nextPhoto}
                    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-copper-orange text-white rounded-full p-3 sm:p-4 backdrop-blur border border-white/10 transition group"
                  >
                    <span className="sr-only">Next</span>
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </>
            )}
          </div>

          {/* Footer Bar / Caption */}
          {selectedWaterfall.waterfall_photos && selectedWaterfall.waterfall_photos.length > 0 && (
            <div className="p-4 sm:p-6 bg-gradient-to-t from-black/90 to-transparent flex flex-col items-center text-center">
              <p className="text-slate-200 text-sm sm:text-base max-w-3xl font-medium drop-shadow">
                {selectedWaterfall.waterfall_photos[currentPhotoIndex].caption || `A beautiful view of ${selectedWaterfall.name}`}
              </p>
              <div className="flex gap-1.5 mt-4">
                {selectedWaterfall.waterfall_photos.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentPhotoIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      idx === currentPhotoIndex 
                        ? 'bg-copper-orange scale-125' 
                        : 'bg-white/40 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* FULL-SCREEN VIDEO MODAL */}
      {selectedVideo && selectedVideo.youtube_video_id && (
        <div className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-300">
          <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex justify-between items-start z-10">
            <div>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white drop-shadow-lg">
                {selectedVideo.name}
              </h3>
              <p className="text-emerald-400 font-semibold tracking-widest text-xs uppercase mt-1 drop-shadow">
                Video Presentation
              </p>
            </div>
            <button 
              onClick={() => setSelectedVideo(null)}
              className="bg-white/10 hover:bg-emerald-600 text-white rounded-full p-2 backdrop-blur transition border border-white/20"
              title="Close Video"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="w-full max-w-5xl aspect-video px-4 sm:px-6">
            <iframe
              className="w-full h-full rounded shadow-2xl border border-white/10"
              src={`https://www.youtube.com/embed/${selectedVideo.youtube_video_id}?autoplay=1&rel=0`}
              title={`${selectedVideo.name} Video`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  )
}
