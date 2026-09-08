import { useEffect, useState, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { getThumbnailUrl } from '../lib/utils'
import { enrichWaterfall, REMOVED_WATERFALL_IDS, type EnrichedWaterfall } from '../lib/enrichWaterfall'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default function Directory() {
  const [waterfalls, setWaterfalls] = useState<EnrichedWaterfall[]>([])
  const [loading, setLoading] = useState(true)

  // Gallery Modal State (100% Inline)
  const [selectedWaterfall, setSelectedWaterfall] = useState<EnrichedWaterfall | null>(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  // Video Modal State (100% Inline)
  const [selectedVideo, setSelectedVideo] = useState<EnrichedWaterfall | null>(null)

  // User-Friendly Navigation & Filter States
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCounty, setSelectedCounty] = useState('all')
  const [selectedLetter, setSelectedLetter] = useState('all')
  const [photoFilter, setPhotoFilter] = useState<'all' | 'with-photos' | 'with-video'>('all')
  const [difficultyFilter, setDifficultyFilter] = useState('all')
  const [sortBy, setSortBy] = useState<'name-asc' | 'name-desc' | 'county' | 'difficulty'>('name-asc')
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)

  // Scroll Anchor Ref
  const directoryTopRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchWaterfalls() {
      const { data, error } = await supabase
        .from('waterfalls')
        .select('*, waterfall_photos(image_url, caption)')
        .order('name', { ascending: true })
      
      if (error) {
        console.error('Error fetching waterfalls:', error)
      } else if (data) {
        setWaterfalls(data.filter(w => !REMOVED_WATERFALL_IDS.has(w.id)).map(enrichWaterfall))
      }
      setLoading(false)
    }

    fetchWaterfalls()
  }, [])

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCounty, selectedLetter, photoFilter, difficultyFilter, sortBy, pageSize])

  // Compute county counts
  const countiesWithCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    waterfalls.forEach(w => {
      counts[w.county] = (counts[w.county] || 0) + 1
    })
    return Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0]))
  }, [waterfalls])

  // Compute letters with counts
  const lettersWithCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    waterfalls.forEach(w => {
      const char = w.name.trim().charAt(0).toUpperCase()
      if (/[A-Z]/.test(char)) {
        counts[char] = (counts[char] || 0) + 1
      }
    })
    return counts
  }, [waterfalls])

  // Filtered and sorted waterfall dataset
  const filteredWaterfalls = useMemo(() => {
    return waterfalls.filter(wf => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchName = wf.name.toLowerCase().includes(q)
        const matchCounty = wf.county.toLowerCase().includes(q)
        const matchRegion = wf.region?.toLowerCase().includes(q)
        if (!matchName && !matchCounty && !matchRegion) return false
      }

      // 2. County Filter
      if (selectedCounty !== 'all' && wf.county !== selectedCounty) {
        return false
      }

      // 3. Alphabet Letter Filter
      if (selectedLetter !== 'all') {
        const char = wf.name.trim().charAt(0).toUpperCase()
        if (char !== selectedLetter) return false
      }

      // 4. Photo/Video Filter
      if (photoFilter === 'with-photos' && (!wf.waterfall_photos || wf.waterfall_photos.length === 0)) {
        return false
      }
      if (photoFilter === 'with-video' && !wf.youtube_video_id) {
        return false
      }

      // 5. Hike Difficulty Filter
      if (difficultyFilter !== 'all' && (!wf.hike_difficulty || !wf.hike_difficulty.toLowerCase().includes(difficultyFilter.toLowerCase()))) {
        return false
      }

      return true
    }).sort((a, b) => {
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name)
      if (sortBy === 'county') {
        const cComp = a.county.localeCompare(b.county)
        return cComp !== 0 ? cComp : a.name.localeCompare(b.name)
      }
      if (sortBy === 'difficulty') {
        const order: Record<string, number> = { 'Easy': 1, 'Moderate': 2, 'Difficult': 3, 'Strenuous': 4 }
        const diffA = order[a.hike_difficulty] || 2
        const diffB = order[b.hike_difficulty] || 2
        return diffA !== diffB ? diffA - diffB : a.name.localeCompare(b.name)
      }
      return a.name.localeCompare(b.name)
    })
  }, [waterfalls, searchQuery, selectedCounty, selectedLetter, photoFilter, difficultyFilter, sortBy])

  // Pagination calculation
  const totalPages = pageSize === 0 ? 1 : Math.ceil(filteredWaterfalls.length / pageSize)
  const paginatedWaterfalls = useMemo(() => {
    if (pageSize === 0) return filteredWaterfalls
    const start = (currentPage - 1) * pageSize
    return filteredWaterfalls.slice(start, start + pageSize)
  }, [filteredWaterfalls, currentPage, pageSize])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    directoryTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedCounty('all')
    setSelectedLetter('all')
    setPhotoFilter('all')
    setDifficultyFilter('all')
    setSortBy('name-asc')
    setCurrentPage(1)
  }

  const openGallery = (wf: EnrichedWaterfall) => {
    setSelectedWaterfall(wf)
    setCurrentPhotoIndex(0)
    setSelectedVideo(null)
  }

  const closeGallery = () => {
    setSelectedWaterfall(null)
  }

  const openVideo = (wf: EnrichedWaterfall) => {
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

      {/* Scroll Anchor */}
      <div ref={directoryTopRef} className="scroll-mt-24" />

      {/* SEARCH & USER-FRIENDLY FILTER SUITE */}
      <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4 sm:p-6 mb-8 space-y-4">
        {/* Row 1: Search Bar & View Mode Toggle */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-grow w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search waterfalls by name, county, or trail..."
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-copper-orange focus:bg-white outline-none transition"
            />
            <span className="absolute left-3.5 top-3 text-slate-400 text-sm">🔍</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-1 text-xs"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 shrink-0 w-full sm:w-auto justify-center">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition ${viewMode === 'table' ? 'bg-white text-pinery-green shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              title="Compact Table View"
            >
              <span>📋</span> Table
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition ${viewMode === 'grid' ? 'bg-white text-copper-orange shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              title="Visual Cards View"
            >
              <span>🎴</span> Visual Cards
            </button>
          </div>
        </div>

        {/* Row 2: Secondary Dropdown Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-1">
          {/* County Filter */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">County</label>
            <select
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-copper-orange outline-none"
            >
              <option value="all">All Counties ({waterfalls.length})</option>
              {countiesWithCounts.map(([county, count]) => (
                <option key={county} value={county}>
                  {county} ({count})
                </option>
              ))}
            </select>
          </div>

          {/* Media / Photos Filter */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Media</label>
            <select
              value={photoFilter}
              onChange={(e) => setPhotoFilter(e.target.value as any)}
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-copper-orange outline-none"
            >
              <option value="all">All Waterfalls</option>
              <option value="with-photos">📸 Verified Photos Only</option>
              <option value="with-video">🎥 Video Tour Only</option>
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Hike Difficulty</label>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-copper-orange outline-none"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy (Roadside / Boardwalk)</option>
              <option value="moderate">Moderate Trail</option>
              <option value="difficult">Rugged / Backcountry</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-copper-orange outline-none"
            >
              <option value="name-asc">Name (A → Z)</option>
              <option value="name-desc">Name (Z → A)</option>
              <option value="county">County & Name</option>
              <option value="difficulty">Trail Difficulty</option>
            </select>
          </div>

          {/* Page Size */}
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Per Page</label>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-copper-orange outline-none"
            >
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
              <option value={0}>Show all (no paging)</option>
            </select>
          </div>
        </div>

        {/* Row 3: A-Z Alphabet Quick-Jump Strip */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Alphabetical Quick-Jump:
            </span>
            {selectedLetter !== 'all' && (
              <button
                onClick={() => setSelectedLetter('all')}
                className="text-[10px] font-bold text-copper-orange hover:underline"
              >
                Clear Letter Filter
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => setSelectedLetter('all')}
              className={`px-2 py-1 rounded text-xs font-bold transition ${selectedLetter === 'all' ? 'bg-pinery-green text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              All
            </button>
            {ALPHABET.map((char) => {
              const count = lettersWithCounts[char] || 0
              const isAvailable = count > 0
              return (
                <button
                  key={char}
                  disabled={!isAvailable}
                  onClick={() => setSelectedLetter(char)}
                  title={isAvailable ? `${count} waterfall${count > 1 ? 's' : ''} starting with ${char}` : `No waterfalls starting with ${char}`}
                  className={`w-7 h-7 rounded text-xs font-bold transition flex items-center justify-center ${
                    selectedLetter === char
                      ? 'bg-copper-orange text-white shadow'
                      : isAvailable
                        ? 'bg-slate-100 hover:bg-copper-orange/20 text-slate-800'
                        : 'opacity-30 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {char}
                </button>
              )
            })}
          </div>
        </div>

        {/* Row 4: Results Summary & Active Filter Badges */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-slate-800">
              {filteredWaterfalls.length === 0 ? (
                '0 waterfalls found'
              ) : pageSize === 0 ? (
                `Showing all ${filteredWaterfalls.length} waterfalls`
              ) : (
                `Showing ${(currentPage - 1) * pageSize + 1}–${Math.min(currentPage * pageSize, filteredWaterfalls.length)} of ${filteredWaterfalls.length} waterfalls`
              )}
            </span>

            {/* Active Chips */}
            {selectedCounty !== 'all' && (
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                {selectedCounty}
                <button onClick={() => setSelectedCounty('all')} className="hover:text-emerald-950">✕</button>
              </span>
            )}
            {selectedLetter !== 'all' && (
              <span className="bg-copper-orange/10 text-copper-orange border border-copper-orange/30 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                Letter "{selectedLetter}"
                <button onClick={() => setSelectedLetter('all')} className="hover:text-copper-orange">✕</button>
              </span>
            )}
            {photoFilter !== 'all' && (
              <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                {photoFilter === 'with-photos' ? '📸 With Photos' : '🎥 With Video'}
                <button onClick={() => setPhotoFilter('all')} className="hover:text-blue-950">✕</button>
              </span>
            )}
            {difficultyFilter !== 'all' && (
              <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                Hike: {difficultyFilter}
                <button onClick={() => setDifficultyFilter('all')} className="hover:text-amber-950">✕</button>
              </span>
            )}
          </div>

          {(searchQuery || selectedCounty !== 'all' || selectedLetter !== 'all' || photoFilter !== 'all' || difficultyFilter !== 'all' || sortBy !== 'name-asc') && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-copper-orange hover:underline self-start sm:self-auto"
            >
              Reset All Filters ↺
            </button>
          )}
        </div>
      </div>

      {/* DIRECTORY CONTENT (LOADING / EMPTY / TABLE / GRID) */}
      {loading ? (
        <div className="text-center text-slate-500 py-16 font-semibold font-serif bg-white rounded-xl shadow border border-slate-200">
          <div className="animate-spin text-4xl mb-3">🌲</div>
          Loading Upper Peninsula waterfall directory...
        </div>
      ) : filteredWaterfalls.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-12 text-center border border-slate-200 space-y-4">
          <span className="text-4xl">🗺️</span>
          <h3 className="font-serif text-2xl font-bold text-slate-800">No Waterfalls Match Your Criteria</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Try adjusting your search query, clearing county filters, or resetting all filters to view the full directory.
          </p>
          <button
            onClick={handleResetFilters}
            className="inline-block bg-copper-orange hover:bg-tahquamenon-amber text-white text-xs font-bold px-5 py-2.5 rounded-lg transition shadow"
          >
            Reset All Filters
          </button>
        </div>
      ) : viewMode === 'table' ? (
        /* TABLE VIEW (COMPACT, TABLE-LAYOUT: FIXED) */
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-x-auto">
          <table className="w-full text-left border-collapse" style={{ tableLayout: 'fixed' }}>
            <thead className="bg-pinery-green text-parchment text-[10px] sm:text-xs uppercase tracking-wider">
              <tr>
                <th className="p-2 sm:p-4 font-bold border-b border-emerald-800 w-[50%] sm:w-[42%]">Waterfall</th>
                <th className="p-2 sm:p-4 font-bold border-b border-emerald-800 w-[25%] sm:w-[22%]">County</th>
                <th className="p-2 sm:p-4 font-bold border-b border-emerald-800 hidden sm:table-cell sm:w-[16%]">Trail / Hike</th>
                <th className="p-2 sm:p-4 font-bold border-b border-emerald-800 w-[25%] sm:w-[20%] text-right sm:text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {paginatedWaterfalls.map((wf, idx) => {
                const photoCount = wf.waterfall_photos?.length || 0
                const heroPhoto = photoCount > 0 ? wf.waterfall_photos![0].image_url : null

                return (
                  <tr key={wf.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50 hover:bg-slate-100/80 transition'}>
                    {/* Column 1: Waterfall Name + Photo Thumbnail */}
                    <td className="p-2 sm:p-4">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        {/* Thumbnail Avatar */}
                        {heroPhoto ? (
                          <button
                            onClick={() => openGallery(wf)}
                            className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden shrink-0 border border-slate-200 hover:border-copper-orange shadow-sm transition group"
                            title="Click to open inline photo gallery"
                          >
                            <img
                              src={getThumbnailUrl(heroPhoto, 120)}
                              alt={wf.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                            />
                            <span className="absolute bottom-0 right-0 bg-black/70 text-white text-[8px] font-bold px-1 rounded-tl">
                              {photoCount}
                            </span>
                          </button>
                        ) : (
                          <div 
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 shrink-0 text-xs font-bold"
                            title="No photo available yet"
                          >
                            🌊
                          </div>
                        )}

                        {/* Name and Indicators */}
                        <div className="min-w-0">
                          <Link 
                            to={`/waterfall/${wf.id}`}
                            className="font-serif font-bold text-pinery-green hover:text-copper-orange text-sm sm:text-base leading-tight block truncate transition"
                          >
                            {wf.name}
                          </Link>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            {photoCount > 0 ? (
                              <span className="text-[10px] font-semibold text-emerald-700">
                                📸 {photoCount} photo{photoCount > 1 ? 's' : ''}
                              </span>
                            ) : (
                              <span className="text-[10px] font-medium text-slate-400">
                                Awaiting photo
                              </span>
                            )}
                            {wf.youtube_video_id && (
                              <span className="text-[10px] font-semibold text-red-600 flex items-center gap-0.5">
                                • 🎥 Video
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Column 2: County */}
                    <td className="p-2 sm:p-4 truncate">
                      <span className="inline-block text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                        {wf.county}
                      </span>
                    </td>

                    {/* Column 3: Trail / Hike */}
                    <td className="p-2 sm:p-4 text-xs text-slate-600 hidden sm:table-cell truncate">
                      <div className="flex items-center gap-1.5 font-semibold">
                        <span className={`inline-block w-2 h-2 rounded-full shrink-0 ${
                          wf.hike_difficulty === 'Easy' ? 'bg-emerald-500' :
                          wf.hike_difficulty === 'Moderate' ? 'bg-amber-500' :
                          wf.hike_difficulty === 'Difficult' ? 'bg-orange-500' : 'bg-red-500'
                        }`} />
                        <span className="text-slate-900">{wf.hike_difficulty}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {wf.trail_length_miles} mi • {wf.drop_height}
                      </div>
                    </td>

                    {/* Column 4: Action Buttons */}
                    <td className="p-2 sm:p-4 text-right sm:text-left truncate">
                      <div className="flex items-center justify-end sm:justify-start gap-1 sm:gap-1.5">
                        {wf.youtube_video_id && (
                          <button 
                            onClick={() => openVideo(wf)}
                            className="inline-block bg-emerald-700 hover:bg-emerald-600 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-1.5 rounded transition shadow"
                            title="Watch inline video tour"
                          >
                            Video
                          </button>
                        )}
                        <button 
                          onClick={() => openGallery(wf)}
                          className="inline-block bg-copper-orange hover:bg-tahquamenon-amber text-white text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-1.5 rounded transition shadow"
                          title="View inline photo gallery"
                        >
                          Photos
                        </button>
                        <Link 
                          to={`/waterfall/${wf.id}`} 
                          className="inline-block bg-pinery-green hover:bg-superior-navy text-white text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-1.5 rounded transition shadow"
                          title="Open waterfall guide"
                        >
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* VISUAL CARDS GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginatedWaterfalls.map((wf) => {
            const photoCount = wf.waterfall_photos?.length || 0
            const heroPhoto = photoCount > 0 ? wf.waterfall_photos![0].image_url : null

            return (
              <div 
                key={wf.id}
                className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col hover:shadow-xl transition group duration-300"
              >
                {/* Card Media Header */}
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  {heroPhoto ? (
                    <img
                      src={getThumbnailUrl(heroPhoto, 600)}
                      alt={wf.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-400 p-4">
                      <span className="text-3xl mb-1">🌊</span>
                      <span className="text-xs font-semibold text-slate-300">Authentic UP Wilderness</span>
                      <span className="text-[10px] text-slate-500">Photo awaiting contribution</span>
                    </div>
                  )}

                  {/* Overlays */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className="bg-black/70 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow">
                      {wf.county}
                    </span>
                  </div>

                  <div className="absolute top-2.5 right-2.5">
                    {photoCount > 0 ? (
                      <button
                        onClick={() => openGallery(wf)}
                        className="bg-copper-orange text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow flex items-center gap-1 hover:bg-tahquamenon-amber transition"
                      >
                        📸 {photoCount}
                      </button>
                    ) : (
                      <span className="bg-amber-900/80 backdrop-blur-sm text-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                        Needs Photo
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                  <div>
                    <Link
                      to={`/waterfall/${wf.id}`}
                      className="font-serif text-lg font-bold text-pinery-green hover:text-copper-orange transition line-clamp-1"
                    >
                      {wf.name}
                    </Link>
                    <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500 flex-wrap">
                      <span className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                        wf.hike_difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                        wf.hike_difficulty === 'Moderate' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                        wf.hike_difficulty === 'Difficult' ? 'bg-orange-50 text-orange-800 border border-orange-200' :
                        'bg-red-50 text-red-800 border border-red-200'
                      }`}>
                        🥾 {wf.hike_difficulty}
                      </span>
                      <span>
                        • {wf.trail_length_miles} mi • 🌊 {wf.drop_height}
                      </span>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {photoCount > 0 && (
                        <button
                          onClick={() => openGallery(wf)}
                          className="bg-slate-100 hover:bg-copper-orange hover:text-white text-slate-700 px-2.5 py-1.5 rounded text-xs font-bold transition shadow-sm"
                        >
                          Photos
                        </button>
                      )}
                      {wf.youtube_video_id && (
                        <button
                          onClick={() => openVideo(wf)}
                          className="bg-red-50 hover:bg-red-600 hover:text-white text-red-700 px-2.5 py-1.5 rounded text-xs font-bold transition shadow-sm"
                        >
                          Video
                        </button>
                      )}
                    </div>
                    <Link
                      to={`/waterfall/${wf.id}`}
                      className="bg-pinery-green hover:bg-superior-navy text-white px-3.5 py-1.5 rounded text-xs font-bold transition shadow ml-auto"
                    >
                      View Guide →
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* PAGINATION & BOTTOM NAVIGATION CONTROLS */}
      {totalPages > 1 && pageSize > 0 && (
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 font-medium">
            Page {currentPage} of {totalPages} ({filteredWaterfalls.length} total waterfalls)
          </div>

          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            {/* First Page */}
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="px-2.5 py-1.5 rounded border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100 transition disabled:opacity-30 disabled:pointer-events-none"
            >
              « First
            </button>

            {/* Prev Page */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100 transition disabled:opacity-30 disabled:pointer-events-none"
            >
              ‹ Prev
            </button>

            {/* Dynamic Numeric Page Pills */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || (p >= currentPage - 2 && p <= currentPage + 2))
              .map((pageNum, idx, arr) => {
                const prev = arr[idx - 1]
                const showEllipsis = prev && pageNum - prev > 1

                return (
                  <div key={pageNum} className="flex items-center">
                    {showEllipsis && <span className="px-1 text-slate-400 text-xs">…</span>}
                    <button
                      onClick={() => handlePageChange(pageNum)}
                      className={`min-w-[32px] h-8 px-2 rounded text-xs font-bold transition ${
                        pageNum === currentPage
                          ? 'bg-copper-orange text-white shadow'
                          : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  </div>
                )
              })}

            {/* Next Page */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100 transition disabled:opacity-30 disabled:pointer-events-none"
            >
              Next ›
            </button>

            {/* Last Page */}
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1.5 rounded border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100 transition disabled:opacity-30 disabled:pointer-events-none"
            >
              Last »
            </button>
          </div>

          {/* Quick Back to Top */}
          <button
            onClick={() => directoryTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="text-xs font-bold text-pinery-green hover:text-copper-orange transition flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded border border-slate-200"
          >
            ↑ Back to Top
          </button>
        </div>
      )}
    </div>
  )
}
