import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { getThumbnailUrl } from '../lib/utils'

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
    setSelectedVideo(null)
  }

  const closeGallery = () => {
    setSelectedWaterfall(null)
  }

  const openVideo = (wf: Waterfall) => {
    setSelectedVideo(wf)
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

      {/* INLINE MEDIA SHOWCASE (100% INLINE ARCHITECTURE - ZERO MODALS) */}
      {selectedWaterfall && (
        <div className="mb-8 bg-slate-900 text-white rounded-xl shadow-2xl border-2 border-copper-orange overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
          {/* Header Bar */}
          <div className="p-4 sm:p-6 flex justify-between items-start border-b border-slate-800 bg-slate-950/80">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-copper-orange">
                Inline Photo Showcase • {selectedWaterfall.county} County
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-0.5">
                {selectedWaterfall.name}
              </h3>
            </div>
            
            <button 
              onClick={closeGallery}
              className="bg-slate-800 hover:bg-copper-orange text-white rounded-lg px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 border border-slate-700"
              title="Close Showcase"
            >
              <span>✕</span> Close
            </button>
          </div>

          {/* Image Container */}
          <div className="p-4 sm:p-8 flex flex-col items-center justify-center relative bg-black/40">
            {(!selectedWaterfall.waterfall_photos || selectedWaterfall.waterfall_photos.length === 0) ? (
              <div className="text-center text-slate-400 font-serif italic text-base sm:text-lg border border-slate-700 bg-slate-900/60 p-8 rounded-xl max-w-md w-full my-4">
                <p>No verified photos available for this waterfall yet.</p>
                <div className="mt-4 flex justify-center gap-3">
                  <Link 
                    to={`/waterfall/${selectedWaterfall.id}`} 
                    className="inline-block bg-copper-orange hover:bg-tahquamenon-amber text-white px-5 py-2 rounded text-xs font-sans not-italic font-bold transition"
                  >
                    Go to Details Page
                  </Link>
                  <Link 
                    to="/admin" 
                    className="inline-block bg-slate-700 hover:bg-slate-600 text-white px-5 py-2 rounded text-xs font-sans not-italic font-bold transition"
                  >
                    Upload via Admin
                  </Link>
                </div>
              </div>
            ) : (
              <div className="relative w-full max-w-4xl flex flex-col items-center">
                <div className="relative w-full flex items-center justify-center min-h-[260px] max-h-[520px]">
                  <img 
                    src={getThumbnailUrl(selectedWaterfall.waterfall_photos[currentPhotoIndex].image_url, 1200)} 
                    alt={selectedWaterfall.name}
                    className="max-w-full max-h-[500px] object-contain rounded-lg shadow-xl"
                  />

                  {/* Left Arrow */}
                  {selectedWaterfall.waterfall_photos.length > 1 && (
                    <button 
                      onClick={prevPhoto}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-copper-orange text-white rounded-full p-2.5 sm:p-3 backdrop-blur border border-white/20 transition shadow"
                    >
                      <span className="sr-only">Previous</span>
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  )}

                  {/* Right Arrow */}
                  {selectedWaterfall.waterfall_photos.length > 1 && (
                    <button 
                      onClick={nextPhoto}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-copper-orange text-white rounded-full p-2.5 sm:p-3 backdrop-blur border border-white/20 transition shadow"
                    >
                      <span className="sr-only">Next</span>
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Caption and Navigation Dots */}
                <div className="w-full mt-4 text-center">
                  <p className="text-slate-300 text-xs sm:text-sm font-medium">
                    {selectedWaterfall.waterfall_photos[currentPhotoIndex].caption || `Authentic view of ${selectedWaterfall.name}`}
                  </p>
                  {selectedWaterfall.waterfall_photos.length > 1 && (
                    <div className="flex justify-center gap-1.5 mt-3">
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
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-400">
              {selectedWaterfall.waterfall_photos?.length 
                ? `Photo ${currentPhotoIndex + 1} of ${selectedWaterfall.waterfall_photos.length}`
                : 'No photos'}
            </span>
            <Link 
              to={`/waterfall/${selectedWaterfall.id}`} 
              className="text-copper-orange hover:text-tahquamenon-amber font-bold transition"
            >
              Open Full Waterfall Guide →
            </Link>
          </div>
        </div>
      )}

      {/* INLINE VIDEO SHOWCASE (100% INLINE ARCHITECTURE - ZERO MODALS) */}
      {selectedVideo && selectedVideo.youtube_video_id && (
        <div className="mb-8 bg-slate-900 text-white rounded-xl shadow-2xl border-2 border-emerald-600 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="p-4 sm:p-6 flex justify-between items-start border-b border-slate-800 bg-slate-950/80">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-400">
                Inline Video Presentation
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-0.5">
                {selectedVideo.name}
              </h3>
            </div>
            <button 
              onClick={() => setSelectedVideo(null)}
              className="bg-slate-800 hover:bg-emerald-600 text-white rounded-lg px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 border border-slate-700"
              title="Close Video"
            >
              <span>✕</span> Close
            </button>
          </div>

          <div className="p-4 sm:p-8 flex justify-center bg-black/40">
            <div className="w-full max-w-3xl aspect-video rounded-lg overflow-hidden shadow-2xl border border-slate-700">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo.youtube_video_id}?autoplay=1&rel=0`}
                title={`${selectedVideo.name} Video`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center text-slate-500 py-10 font-semibold font-serif">
          Loading directory...
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-x-auto">
          <table className="w-full text-left border-collapse" style={{ tableLayout: 'fixed' }}>
            <thead className="bg-pinery-green text-parchment text-[10px] sm:text-xs uppercase tracking-wider">
              <tr>
                <th className="p-1.5 sm:p-4 font-bold border-b border-emerald-800 w-[42%] sm:w-[35%]">Name</th>
                <th className="p-1.5 sm:p-4 font-bold border-b border-emerald-800 w-[28%] sm:w-[25%]">County</th>
                <th className="p-1.5 sm:p-4 font-bold border-b border-emerald-800 hidden sm:table-cell sm:w-[15%]">Hike</th>
                <th className="p-1.5 sm:p-4 font-bold border-b border-emerald-800 w-[30%] sm:w-[25%] text-right sm:text-left">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {waterfalls.map((wf, idx) => (
                <tr key={wf.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50 hover:bg-slate-100 transition'}>
                  <td className="p-1.5 sm:p-4 truncate font-serif font-bold text-pinery-green text-base sm:text-lg">
                    {wf.name}
                  </td>
                  <td className="p-1.5 sm:p-4 text-xs sm:text-sm text-slate-600 truncate">
                    {wf.county}
                  </td>
                  <td className="p-1.5 sm:p-4 text-xs text-slate-500 hidden sm:table-cell truncate">
                    {wf.hike_difficulty} ({wf.trail_length_miles}m)
                  </td>
                  <td className="p-1.5 sm:p-4 text-right sm:text-left truncate">
                    {wf.youtube_video_id && (
                      <button 
                        onClick={() => openVideo(wf)}
                        className="inline-block bg-emerald-700 hover:bg-emerald-600 text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded transition shadow mr-1 sm:mr-2"
                      >
                        Video
                      </button>
                    )}
                    <button 
                      onClick={() => openGallery(wf)}
                      className="inline-block bg-copper-orange hover:bg-tahquamenon-amber text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded transition shadow mr-1 sm:mr-2"
                    >
                      Gallery
                    </button>
                    <Link 
                      to={`/waterfall/${wf.id}`} 
                      className="inline-block bg-pinery-green hover:bg-superior-navy text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded transition shadow"
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
