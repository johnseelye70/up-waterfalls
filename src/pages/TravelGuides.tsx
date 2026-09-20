import { useState, useMemo, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  TRAVEL_GUIDES,
  WATERFALL_BLOG_ARTICLES,
  type TravelGuide
} from '../data/travelGuidesData'
import { WATERFALL_HIKING_DATA } from '../data/waterfallHikingData'
import { useTrip } from '../lib/TripContext'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const CATEGORIES = [
  'All Guides',
  'Regional Expeditions',
  'Trail Craft & Safety',
  'Seasonal Tactics',
  'Photography',
  'Culinary & Culture'
] as const

export default function TravelGuides() {
  const { guideId } = useParams<{ guideId?: string }>()
  const { tripItems, addToTrip } = useTrip()

  // Navigation & filter states for Guides
  const [selectedCategory, setSelectedCategory] = useState<string>('All Guides')
  const [selectedLetter, setSelectedLetter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortBy] = useState<'title-asc' | 'title-desc' | 'readTime-asc' | 'readTime-desc' | 'drops-desc' | 'category'>('title-asc')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(9)

  // Articles specific filter states
  const [articleCategory, setArticleCategory] = useState<string>('all')
  const [articleLetter, setArticleLetter] = useState<string>('all')
  const [articleSortBy, setArticleSortBy] = useState<'waterfall-asc' | 'waterfall-desc' | 'title-asc' | 'source' | 'readTime'>('waterfall-asc')
  const [articleCurrentPage, setArticleCurrentPage] = useState<number>(1)
  const [articlePageSize, setArticlePageSize] = useState<number>(12)

  const [activeGuideId, setActiveGuideId] = useState<string | null>(guideId || null)
  const [activeTab, setActiveTab] = useState<'guides' | 'articles'>('guides')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Scroll Anchor Ref
  const guidesTopRef = useRef<HTMLDivElement>(null)

  // Sync guideId param
  useEffect(() => {
    if (guideId) {
      setActiveGuideId(guideId)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [guideId])

  // Toast auto-dismiss
  useEffect(() => {
    if (toastMessage) {
      const t = setTimeout(() => setToastMessage(null), 3500)
      return () => clearTimeout(t)
    }
  }, [toastMessage])

  // Reset page when guide filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, selectedLetter, searchQuery, sortBy, pageSize])

  // Reset page when article filters change
  useEffect(() => {
    setArticleCurrentPage(1)
  }, [articleCategory, articleLetter, searchQuery, articleSortBy, articlePageSize])

  // Active guide object
  const activeGuide: TravelGuide | undefined = useMemo(() => {
    if (!activeGuideId) return undefined
    return TRAVEL_GUIDES.find(g => g.id === activeGuideId || g.slug === activeGuideId)
  }, [activeGuideId])

  // Guide alphabet letter counts
  const guideLettersWithCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    TRAVEL_GUIDES.forEach(g => {
      const char = g.title.trim().charAt(0).toUpperCase()
      if (/[A-Z]/.test(char)) {
        counts[char] = (counts[char] || 0) + 1
      }
    })
    return counts
  }, [])

  // Guide category counts
  const guideCategoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = { 'All Guides': TRAVEL_GUIDES.length }
    CATEGORIES.slice(1).forEach(cat => {
      counts[cat] = TRAVEL_GUIDES.filter(g => g.category === cat).length
    })
    return counts
  }, [])

  // Article alphabet letter counts
  const articleLettersWithCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    WATERFALL_BLOG_ARTICLES.forEach(a => {
      const char = a.waterfallName.trim().charAt(0).toUpperCase()
      if (/[A-Z]/.test(char)) {
        counts[char] = (counts[char] || 0) + 1
      }
    })
    return counts
  }, [])

  // Article category counts
  const articleCategoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    WATERFALL_BLOG_ARTICLES.forEach(a => {
      counts[a.category] = (counts[a.category] || 0) + 1
    })
    return Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0]))
  }, [])

  // Filtered and sorted guides
  const filteredGuides = useMemo(() => {
    return TRAVEL_GUIDES.filter(guide => {
      // 1. Category
      if (selectedCategory !== 'All Guides' && guide.category !== selectedCategory) {
        return false
      }

      // 2. Letter
      if (selectedLetter !== 'all') {
        const char = guide.title.trim().charAt(0).toUpperCase()
        if (char !== selectedLetter) return false
      }

      // 3. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matches =
          guide.title.toLowerCase().includes(q) ||
          guide.subtitle.toLowerCase().includes(q) ||
          guide.excerpt.toLowerCase().includes(q) ||
          guide.tags.some(t => t.toLowerCase().includes(q)) ||
          guide.author.name.toLowerCase().includes(q)
        if (!matches) return false
      }

      return true
    }).sort((a, b) => {
      if (sortBy === 'title-asc') return a.title.localeCompare(b.title)
      if (sortBy === 'title-desc') return b.title.localeCompare(a.title)
      if (sortBy === 'readTime-asc') {
        const tA = parseInt(a.readTime) || 0
        const tB = parseInt(b.readTime) || 0
        return tA !== tB ? tA - tB : a.title.localeCompare(b.title)
      }
      if (sortBy === 'readTime-desc') {
        const tA = parseInt(a.readTime) || 0
        const tB = parseInt(b.readTime) || 0
        return tA !== tB ? tB - tA : a.title.localeCompare(b.title)
      }
      if (sortBy === 'drops-desc') {
        const cA = a.associatedWaterfallIds.length
        const cB = b.associatedWaterfallIds.length
        return cA !== cB ? cB - cA : a.title.localeCompare(b.title)
      }
      if (sortBy === 'category') {
        const cComp = a.category.localeCompare(b.category)
        return cComp !== 0 ? cComp : a.title.localeCompare(b.title)
      }
      return 0
    })
  }, [selectedCategory, selectedLetter, searchQuery, sortBy])

  // Filtered and sorted articles
  const filteredArticles = useMemo(() => {
    return WATERFALL_BLOG_ARTICLES.filter(art => {
      // 1. Category
      if (articleCategory !== 'all' && art.category !== articleCategory) {
        return false
      }

      // 2. Letter
      if (articleLetter !== 'all') {
        const char = art.waterfallName.trim().charAt(0).toUpperCase()
        if (char !== articleLetter) return false
      }

      // 3. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matches =
          art.title.toLowerCase().includes(q) ||
          art.waterfallName.toLowerCase().includes(q) ||
          art.snippet.toLowerCase().includes(q) ||
          art.sourceSite.toLowerCase().includes(q) ||
          art.author.toLowerCase().includes(q) ||
          art.category.toLowerCase().includes(q)
        if (!matches) return false
      }

      return true
    }).sort((a, b) => {
      if (articleSortBy === 'waterfall-asc') return a.waterfallName.localeCompare(b.waterfallName)
      if (articleSortBy === 'waterfall-desc') return b.waterfallName.localeCompare(a.waterfallName)
      if (articleSortBy === 'title-asc') return a.title.localeCompare(b.title)
      if (articleSortBy === 'source') {
        const sComp = a.sourceSite.localeCompare(b.sourceSite)
        return sComp !== 0 ? sComp : a.waterfallName.localeCompare(b.waterfallName)
      }
      if (articleSortBy === 'readTime') {
        const tA = parseInt(a.readingTime) || 0
        const tB = parseInt(b.readingTime) || 0
        return tA !== tB ? tA - tB : a.waterfallName.localeCompare(b.waterfallName)
      }
      return 0
    })
  }, [articleCategory, articleLetter, searchQuery, articleSortBy])

  // Pagination calculations
  const totalGuidePages = pageSize === 0 ? 1 : Math.ceil(filteredGuides.length / pageSize)
  const paginatedGuides = useMemo(() => {
    if (pageSize === 0) return filteredGuides
    const start = (currentPage - 1) * pageSize
    return filteredGuides.slice(start, start + pageSize)
  }, [filteredGuides, currentPage, pageSize])

  const handleGuidePageChange = (page: number) => {
    setCurrentPage(page)
    guidesTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const totalArticlePages = articlePageSize === 0 ? 1 : Math.ceil(filteredArticles.length / articlePageSize)
  const paginatedArticles = useMemo(() => {
    if (articlePageSize === 0) return filteredArticles
    const start = (articleCurrentPage - 1) * articlePageSize
    return filteredArticles.slice(start, start + articlePageSize)
  }, [filteredArticles, articleCurrentPage, articlePageSize])

  const handleArticlePageChange = (page: number) => {
    setArticleCurrentPage(page)
    guidesTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleResetFilters = () => {
    if (activeTab === 'guides') {
      setSelectedCategory('All Guides')
      setSelectedLetter('all')
      setSearchQuery('')
      setSortBy('title-asc')
      setCurrentPage(1)
    } else {
      setArticleCategory('all')
      setArticleLetter('all')
      setSearchQuery('')
      setArticleSortBy('waterfall-asc')
      setArticleCurrentPage(1)
    }
  }

  // Add all guide waterfalls to active trip
  const handleAddAllToTrip = (guide: TravelGuide) => {
    let addedCount = 0
    for (const id of guide.associatedWaterfallIds) {
      const spec = WATERFALL_HIKING_DATA[id]
      if (spec && !tripItems.some(item => item.id === id)) {
        addToTrip({
          id,
          name: spec.name,
          region: spec.region || spec.county
        })
        addedCount++
      }
    }
    if (addedCount > 0) {
      setToastMessage(`🧭 Added ${addedCount} waterfalls from "${guide.title}" to your active trip!`)
    } else {
      setToastMessage('All waterfalls from this guide are already in your active trip.')
    }
  }

  // Open guide inline
  const handleOpenGuide = (id: string) => {
    setActiveGuideId(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Close guide inline
  const handleCloseGuide = () => {
    setActiveGuideId(null)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-grow w-full">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="bg-emerald-900 border-2 border-copper-orange text-white px-4 py-3 rounded-lg shadow-xl flex items-center justify-between text-sm transition-all duration-300">
          <div className="flex items-center gap-2">
            <span className="text-copper-orange text-lg">✦</span>
            <span>{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-emerald-300 hover:text-white font-bold text-xs uppercase"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 100% INLINE READER VIEW: Active Field Guide */}
      {activeGuide ? (
        <article className="space-y-8 animate-in fade-in duration-300">
          {/* Back Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <button
              onClick={handleCloseGuide}
              className="inline-flex items-center gap-2 text-xs font-bold text-pinery-green hover:text-copper-orange transition"
            >
              <span>←</span> Back to All Guides & Articles
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-semibold">{activeGuide.readTime}</span>
              <span className="text-slate-300">•</span>
              <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-2.5 py-0.5 rounded-full">
                {activeGuide.category}
              </span>
            </div>
          </div>

          {/* Guide Header Banner */}
          <header className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-copper-orange text-white uppercase tracking-wider">
              ★ Authoritative Northwoods Field Dossier
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 leading-tight">
              {activeGuide.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {activeGuide.subtitle}
            </p>

            {/* Author Metadata Bar */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-600 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{activeGuide.author.avatarEmoji}</span>
                <div>
                  <span className="font-bold text-slate-900 block">{activeGuide.author.name}</span>
                  <span className="text-[11px] text-slate-500">{activeGuide.author.role}</span>
                </div>
              </div>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <div>
                <span className="font-semibold block text-slate-500">Published</span>
                <span className="text-slate-800 font-bold">{activeGuide.publishedDate}</span>
              </div>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <div>
                <span className="font-semibold block text-slate-500">Featured Drops</span>
                <span className="text-copper-orange font-bold">{activeGuide.associatedWaterfallIds.length} Waterfalls</span>
              </div>
            </div>
          </header>

          {/* Hero Media */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <img
              src={activeGuide.heroImageUrl}
              alt={activeGuide.title}
              className="w-full h-64 sm:h-96 lg:h-[480px] object-cover"
            />
            {activeGuide.heroCaption && (
              <div className="bg-slate-900 text-slate-300 text-xs px-4 py-2 italic border-t border-slate-800">
                {activeGuide.heroCaption}
              </div>
            )}
          </div>

          {/* Main Reading Stream & Sidebar Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left/Main Column: Chapters & Content */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Excerpt Lead */}
              <div className="bg-parchment p-5 rounded-xl border-l-4 border-copper-orange text-slate-800 text-sm sm:text-base leading-relaxed font-serif italic">
                "{activeGuide.excerpt}"
              </div>

              {/* Table of Contents Box */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="font-serif text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <span>📑</span> Table of Contents
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {activeGuide.chapters.map((ch, idx) => (
                    <li key={ch.id}>
                      <a
                        href={`#${ch.id}`}
                        className="hover:text-copper-orange transition flex items-baseline gap-2 font-medium"
                      >
                        <span className="text-copper-orange font-bold">{idx + 1}.</span>
                        <span>{ch.title}</span>
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href="#gear-matrix" className="hover:text-copper-orange transition flex items-baseline gap-2 font-medium">
                      <span className="text-copper-orange font-bold">★</span>
                      <span>Recommended Field Gear Matrix</span>
                    </a>
                  </li>
                  <li>
                    <a href="#featured-falls" className="hover:text-copper-orange transition flex items-baseline gap-2 font-medium">
                      <span className="text-copper-orange font-bold">★</span>
                      <span>Featured Waterfalls & Trailheads</span>
                    </a>
                  </li>
                  <li>
                    <a href="#faqs" className="hover:text-copper-orange transition flex items-baseline gap-2 font-medium">
                      <span className="text-copper-orange font-bold">★</span>
                      <span>Frequently Asked Field Questions</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Chapters Content Stream */}
              <div className="space-y-12">
                {activeGuide.chapters.map(ch => (
                  <section key={ch.id} id={ch.id} className="space-y-4 scroll-mt-24">
                    <div className="border-b border-slate-200 pb-2">
                      <h2 className="font-serif text-2xl font-bold text-slate-900 leading-snug">
                        {ch.title}
                      </h2>
                      {ch.subtitle && (
                        <p className="text-xs sm:text-sm text-copper-orange font-semibold mt-0.5">
                          {ch.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3.5 text-sm sm:text-base text-slate-700 leading-relaxed">
                      {ch.content.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>

                    {ch.proTip && (
                      <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl text-xs sm:text-sm text-emerald-950 flex items-start gap-3 shadow-sm">
                        <span className="text-xl">💡</span>
                        <div className="space-y-0.5">
                          <strong className="font-bold text-emerald-900 block uppercase tracking-wider text-[11px]">
                            Ranger Field Advisory
                          </strong>
                          <p className="leading-relaxed">{ch.proTip}</p>
                        </div>
                      </div>
                    )}
                  </section>
                ))}
              </div>

              {/* Recommended Gear Matrix */}
              <section id="gear-matrix" className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 scroll-mt-24">
                <h3 className="font-serif text-xl font-bold text-pinery-green flex items-center gap-2">
                  <span>🎒</span> Recommended Expedition Gear
                </h3>
                <p className="text-xs text-slate-600">
                  Field-tested items specifically curated for the terrain and conditions in this guide:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {activeGuide.recommendedGear.map((gear, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-800 bg-parchment p-3 rounded border border-slate-200">
                      <span className="text-emerald-700 font-bold">✓</span>
                      <span>{gear}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQs Section */}
              <section id="faqs" className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 scroll-mt-24">
                <h3 className="font-serif text-xl font-bold text-pinery-green flex items-center gap-2">
                  <span>❓</span> Backcountry Field FAQs
                </h3>
                <div className="space-y-3">
                  {activeGuide.faqs.map((faq, idx) => (
                    <div key={idx} className="bg-parchment p-4 rounded-lg border border-slate-200 space-y-1.5">
                      <h4 className="font-serif font-bold text-sm text-slate-900">
                        {faq.question}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Bottom Back Button */}
              <div className="pt-6 border-t border-slate-200 flex justify-between items-center">
                <button
                  onClick={handleCloseGuide}
                  className="bg-pinery-green hover:bg-emerald-900 text-white text-xs font-bold px-4 py-2.5 rounded shadow transition flex items-center gap-1.5"
                >
                  <span>←</span> Return to Field Guides Catalog
                </button>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-xs font-semibold text-slate-500 hover:text-copper-orange transition"
                >
                  Top of Guide ↑
                </button>
              </div>

            </div>

            {/* Right Sidebar: Featured Waterfalls & Trip Actions */}
            <aside className="lg:col-span-4 space-y-6">
              
              {/* Trip Addition Card */}
              <div className="bg-emerald-950 text-white p-5 rounded-xl shadow-md space-y-4 border border-emerald-900 sticky top-24">
                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-copper-orange">
                    Expedition Integration
                  </div>
                  <h4 className="font-serif text-lg font-bold text-white">
                    Explore This Route
                  </h4>
                  <p className="text-xs text-emerald-200 leading-relaxed">
                    Instantly load all waterfalls featured in this guide directly into your Trip Planner with calculated driving legs and turn-by-turn navigation.
                  </p>
                </div>

                <button
                  onClick={() => handleAddAllToTrip(activeGuide)}
                  className="w-full bg-copper-orange hover:bg-tahquamenon-amber text-white font-bold text-xs py-2.5 px-4 rounded shadow transition text-center flex items-center justify-center gap-2"
                >
                  <span>🧭</span> Add All {activeGuide.associatedWaterfallIds.length} Waterfalls to Trip
                </button>

                {/* Associated Waterfalls List */}
                <div id="featured-falls" className="pt-4 border-t border-emerald-800/60 space-y-2.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                    Waterfalls Featured in Guide:
                  </div>
                  <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                    {activeGuide.associatedWaterfallIds.map(wfId => {
                      const spec = WATERFALL_HIKING_DATA[wfId]
                      if (!spec) return null

                      return (
                        <div
                          key={wfId}
                          className="bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-800 rounded-lg p-2.5 transition flex items-center justify-between gap-2"
                        >
                          <div className="space-y-0.5">
                            <Link
                              to={`/waterfall/${wfId}`}
                              className="font-serif text-xs font-bold text-white hover:text-copper-orange transition leading-tight block"
                            >
                              {spec.name}
                            </Link>
                            <div className="text-[10px] text-emerald-300 flex items-center gap-2">
                              <span>{spec.county} Co.</span>
                              <span>•</span>
                              <span>{spec.drop_height}</span>
                              <span>•</span>
                              <span className="text-copper-orange">{spec.hike_difficulty}</span>
                            </div>
                          </div>
                          <Link
                            to={`/waterfall/${wfId}`}
                            className="text-[11px] font-bold text-copper-orange hover:text-white px-2 py-1 rounded bg-black/20"
                            title="View Waterfall Dossier"
                          >
                            View
                          </Link>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Tag Pills */}
                <div className="pt-3 border-t border-emerald-800/60 flex flex-wrap gap-1.5">
                  {activeGuide.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[10px] bg-emerald-900 text-emerald-200 px-2 py-0.5 rounded border border-emerald-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

              </div>

            </aside>

          </div>
        </article>
      ) : (
        /* CATALOG VIEW: Main Guides & Articles Grid */
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Header Banner */}
          <div className="border-b-2 border-slate-300 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-copper-orange text-white uppercase tracking-wider mb-1.5">
                ★ Upper Peninsula Field Dispatches & Travel Guides
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-pinery-green flex items-center gap-2.5">
                <span>📖</span> Field Guides & Travel Journal
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                Authoritative backcountry guides, regional expedition breakdowns, geological deep-dives, photography masterclasses, and authentic local food journals crafted by Upper Peninsula field scouts.
              </p>
            </div>

            {/* Primary Tab Switcher: Guides vs. Curated Articles */}
            <div className="flex items-center bg-slate-200 p-1 rounded-lg shrink-0 text-xs font-bold">
              <button
                onClick={() => {
                  setActiveTab('guides')
                  setCurrentPage(1)
                }}
                className={`px-3.5 py-1.5 rounded-md transition ${
                  activeTab === 'guides'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Comprehensive Guides ({TRAVEL_GUIDES.length})
              </button>
              <button
                onClick={() => {
                  setActiveTab('articles')
                  setArticleCurrentPage(1)
                }}
                className={`px-3.5 py-1.5 rounded-md transition ${
                  activeTab === 'articles'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Curated Articles ({WATERFALL_BLOG_ARTICLES.length})
              </button>
            </div>
          </div>

          {/* Scroll Anchor */}
          <div ref={guidesTopRef} className="scroll-mt-24" />

          {/* SEARCH & USER-FRIENDLY FILTER SUITE */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4 sm:p-6 space-y-4">
            {/* Row 1: Search Bar & View Mode Toggle */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-grow w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={activeTab === 'guides' ? 'Search field guides by title, author, topic, or tags...' : 'Search articles by title, waterfall, publication, or topic...'}
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
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition ${viewMode === 'grid' ? 'bg-white text-copper-orange shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                  title="Visual Cards View"
                >
                  <span>🎴</span> Visual Cards
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition ${viewMode === 'table' ? 'bg-white text-pinery-green shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                  title="Compact Table View"
                >
                  <span>📋</span> Compact Table
                </button>
              </div>
            </div>

            {/* Row 2: Secondary Dropdown Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {/* Category Dropdown */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Category Filter
                </label>
                {activeTab === 'guides' ? (
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-copper-orange outline-none"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>
                        {cat} ({guideCategoriesWithCounts[cat] || 0})
                      </option>
                    ))}
                  </select>
                ) : (
                  <select
                    value={articleCategory}
                    onChange={(e) => setArticleCategory(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-copper-orange outline-none"
                  >
                    <option value="all">All Categories ({WATERFALL_BLOG_ARTICLES.length})</option>
                    {articleCategoriesWithCounts.map(([cat, count]) => (
                      <option key={cat} value={cat}>
                        {cat} ({count})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Sort By Dropdown */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Sort Order
                </label>
                {activeTab === 'guides' ? (
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-copper-orange outline-none"
                  >
                    <option value="title-asc">Title (A → Z)</option>
                    <option value="title-desc">Title (Z → A)</option>
                    <option value="readTime-asc">Quickest Read (Shortest First)</option>
                    <option value="readTime-desc">In-Depth Read (Longest First)</option>
                    <option value="drops-desc">Most Featured Drops</option>
                    <option value="category">Category & Title</option>
                  </select>
                ) : (
                  <select
                    value={articleSortBy}
                    onChange={(e) => setArticleSortBy(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-copper-orange outline-none"
                  >
                    <option value="waterfall-asc">Waterfall (A → Z)</option>
                    <option value="waterfall-desc">Waterfall (Z → A)</option>
                    <option value="title-asc">Article Title (A → Z)</option>
                    <option value="source">Publication Source</option>
                    <option value="readTime">Reading Time</option>
                  </select>
                )}
              </div>

              {/* Page Size Dropdown */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Items Per Page
                </label>
                {activeTab === 'guides' ? (
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-copper-orange outline-none"
                  >
                    <option value={9}>9 per page</option>
                    <option value={18}>18 per page</option>
                    <option value={36}>36 per page (All)</option>
                    <option value={0}>Show all (no paging)</option>
                  </select>
                ) : (
                  <select
                    value={articlePageSize}
                    onChange={(e) => setArticlePageSize(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-copper-orange outline-none"
                  >
                    <option value={12}>12 per page</option>
                    <option value={24}>24 per page</option>
                    <option value={48}>48 per page</option>
                    <option value={0}>Show all (no paging)</option>
                  </select>
                )}
              </div>
            </div>

            {/* Row 3: Category Quick Pills (for Guides) */}
            {activeTab === 'guides' && (
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                {CATEGORIES.map(cat => {
                  const count = guideCategoriesWithCounts[cat] || 0
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-xs font-semibold px-3 py-1 rounded-full transition border flex items-center gap-1.5 ${
                        selectedCategory === cat
                          ? 'bg-emerald-900 text-white border-emerald-900 shadow-sm'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
                      }`}
                    >
                      <span>{cat}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                          selectedCategory === cat ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>
            )}

            {/* Row 4: A-Z Alphabet Quick-Jump Strip */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  {activeTab === 'guides' ? 'Alphabetical Quick-Jump (by Title):' : 'Alphabetical Quick-Jump (by Waterfall):'}
                </span>
                {(activeTab === 'guides' ? selectedLetter !== 'all' : articleLetter !== 'all') && (
                  <button
                    onClick={() => (activeTab === 'guides' ? setSelectedLetter('all') : setArticleLetter('all'))}
                    className="text-[10px] font-bold text-copper-orange hover:underline"
                  >
                    Clear Letter Filter
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-1">
                <button
                  onClick={() => (activeTab === 'guides' ? setSelectedLetter('all') : setArticleLetter('all'))}
                  className={`px-2 py-1 rounded text-xs font-bold transition ${
                    (activeTab === 'guides' ? selectedLetter === 'all' : articleLetter === 'all')
                      ? 'bg-pinery-green text-white shadow'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  All
                </button>
                {ALPHABET.map((char) => {
                  const count = (activeTab === 'guides' ? guideLettersWithCounts[char] : articleLettersWithCounts[char]) || 0
                  const isAvailable = count > 0
                  const isSelected = activeTab === 'guides' ? selectedLetter === char : articleLetter === char

                  return (
                    <button
                      key={char}
                      disabled={!isAvailable}
                      onClick={() => (activeTab === 'guides' ? setSelectedLetter(char) : setArticleLetter(char))}
                      title={
                        isAvailable
                          ? `${count} ${activeTab === 'guides' ? 'guide' : 'waterfall'}${count > 1 ? 's' : ''} starting with ${char}`
                          : `No ${activeTab === 'guides' ? 'guides' : 'waterfalls'} starting with ${char}`
                      }
                      className={`w-7 h-7 rounded text-xs font-bold transition flex items-center justify-center ${
                        isSelected
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

            {/* Row 5: Results Summary & Active Filter Badges */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-slate-800">
                  {activeTab === 'guides' ? (
                    filteredGuides.length === 0 ? (
                      '0 field guides found'
                    ) : pageSize === 0 ? (
                      `Showing all ${filteredGuides.length} field guides`
                    ) : (
                      `Showing ${(currentPage - 1) * pageSize + 1}–${Math.min(currentPage * pageSize, filteredGuides.length)} of ${filteredGuides.length} field guides`
                    )
                  ) : (
                    filteredArticles.length === 0 ? (
                      '0 articles found'
                    ) : articlePageSize === 0 ? (
                      `Showing all ${filteredArticles.length} articles`
                    ) : (
                      `Showing ${(articleCurrentPage - 1) * articlePageSize + 1}–${Math.min(articleCurrentPage * articlePageSize, filteredArticles.length)} of ${filteredArticles.length} articles`
                    )
                  )}
                </span>

                {/* Active Chips */}
                {activeTab === 'guides' ? (
                  <>
                    {selectedCategory !== 'All Guides' && (
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                        Category: {selectedCategory}
                        <button onClick={() => setSelectedCategory('All Guides')} className="hover:text-emerald-950">✕</button>
                      </span>
                    )}
                    {selectedLetter !== 'all' && (
                      <span className="bg-copper-orange/10 text-copper-orange border border-copper-orange/30 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                        Letter "{selectedLetter}"
                        <button onClick={() => setSelectedLetter('all')} className="hover:text-copper-orange">✕</button>
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    {articleCategory !== 'all' && (
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                        Category: {articleCategory}
                        <button onClick={() => setArticleCategory('all')} className="hover:text-emerald-950">✕</button>
                      </span>
                    )}
                    {articleLetter !== 'all' && (
                      <span className="bg-copper-orange/10 text-copper-orange border border-copper-orange/30 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                        Letter "{articleLetter}"
                        <button onClick={() => setArticleLetter('all')} className="hover:text-copper-orange">✕</button>
                      </span>
                    )}
                  </>
                )}

                {searchQuery && (
                  <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="hover:text-blue-950">✕</button>
                  </span>
                )}
              </div>

              {(searchQuery || (activeTab === 'guides' ? (selectedCategory !== 'All Guides' || selectedLetter !== 'all' || sortBy !== 'title-asc') : (articleCategory !== 'all' || articleLetter !== 'all' || articleSortBy !== 'waterfall-asc'))) && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-copper-orange hover:underline self-start sm:self-auto"
                >
                  Reset All Filters ↺
                </button>
              )}
            </div>
          </div>

          {/* TAB 1: Master Field Guides Grid / Table */}
          {activeTab === 'guides' && (
            <div className="space-y-8">
              {/* Flagship Featured Hero Guide (shown when viewing All and no search on Page 1 in Grid View) */}
              {selectedCategory === 'All Guides' && selectedLetter === 'all' && !searchQuery && currentPage === 1 && viewMode === 'grid' && TRAVEL_GUIDES.length > 0 && (
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200 grid grid-cols-1 lg:grid-cols-12 hover:shadow-xl transition">
                  <div className="lg:col-span-7 relative h-72 lg:h-auto overflow-hidden">
                    <img
                      src={TRAVEL_GUIDES[0].heroImageUrl}
                      alt={TRAVEL_GUIDES[0].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-copper-orange text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                      ★ Featured Master Guide
                    </div>
                  </div>
                  <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded">
                          {TRAVEL_GUIDES[0].category}
                        </span>
                        <span className="text-slate-500 font-semibold">
                          ⏱️ {TRAVEL_GUIDES[0].readTime}
                        </span>
                      </div>

                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-950 leading-tight">
                        {TRAVEL_GUIDES[0].title}
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {TRAVEL_GUIDES[0].excerpt}
                      </p>

                      <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
                        <span>{TRAVEL_GUIDES[0].author.avatarEmoji}</span>
                        <span className="font-bold text-slate-800">{TRAVEL_GUIDES[0].author.name}</span>
                        <span>•</span>
                        <span>{TRAVEL_GUIDES[0].publishedDate}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenGuide(TRAVEL_GUIDES[0].id)}
                      className="bg-pinery-green hover:bg-emerald-900 text-white font-bold text-xs py-2.5 px-4 rounded-lg shadow transition text-center flex items-center justify-center gap-2"
                    >
                      <span>📖</span> Read Full Field Guide ➔
                    </button>
                  </div>
                </div>
              )}

              {/* Empty State */}
              {filteredGuides.length === 0 && (
                <div className="text-center py-16 bg-parchment rounded-xl border border-slate-300 space-y-3">
                  <div className="text-4xl">🔍</div>
                  <h3 className="font-serif text-lg font-bold text-slate-800">No field guides found</h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    No field guides match your current filter settings. Try adjusting your category filter, choosing a different letter, or resetting all filters.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="inline-block bg-copper-orange hover:bg-tahquamenon-amber text-white font-bold text-xs py-2 px-4 rounded transition shadow"
                  >
                    Reset All Filters ↺
                  </button>
                </div>
              )}

              {/* View Mode: Cards Grid */}
              {viewMode === 'grid' && filteredGuides.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedGuides.map(guide => (
                    <div
                      key={guide.id}
                      className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
                    >
                      <div className="space-y-3">
                        {/* Thumbnail with category tag */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={guide.heroImageUrl}
                            alt={guide.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute top-3 left-3 bg-emerald-950/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                            {guide.category}
                          </div>
                          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                            ⏱️ {guide.readTime}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 space-y-2.5">
                          <h3 className="font-serif text-lg font-bold text-slate-900 leading-snug group-hover:text-copper-orange transition">
                            {guide.title}
                          </h3>
                          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                            {guide.excerpt}
                          </p>

                          {/* Author Info */}
                          <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                            <div className="flex items-center gap-1.5">
                              <span>{guide.author.avatarEmoji}</span>
                              <span className="font-bold text-slate-800">{guide.author.name}</span>
                            </div>
                            <span className="text-[11px] text-copper-orange font-semibold">
                              {guide.associatedWaterfallIds.length} drops
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 pt-0">
                        <button
                          onClick={() => handleOpenGuide(guide.id)}
                          className="w-full bg-parchment hover:bg-copper-orange hover:text-white text-slate-800 border border-slate-300 font-bold text-xs py-2 px-3 rounded shadow-sm transition text-center flex items-center justify-center gap-1.5"
                        >
                          <span>📖</span> Read Field Guide
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* View Mode: Compact Table */}
              {viewMode === 'table' && filteredGuides.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-x-auto">
                  <table className="w-full text-left border-collapse" style={{ tableLayout: 'fixed' }}>
                    <thead className="bg-pinery-green text-parchment text-[10px] sm:text-xs uppercase tracking-wider">
                      <tr>
                        <th className="p-2 sm:p-4 font-bold border-b border-emerald-800 w-[55%] sm:w-[45%]">Field Guide & Topic</th>
                        <th className="p-2 sm:p-4 font-bold border-b border-emerald-800 hidden sm:table-cell sm:w-[18%]">Category</th>
                        <th className="p-2 sm:p-4 font-bold border-b border-emerald-800 hidden md:table-cell md:w-[15%]">Author & Date</th>
                        <th className="p-2 sm:p-4 font-bold border-b border-emerald-800 w-[25%] sm:w-[12%]">Read Time</th>
                        <th className="p-2 sm:p-4 font-bold border-b border-emerald-800 w-[20%] sm:w-[10%] text-right sm:text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {paginatedGuides.map((guide, idx) => (
                        <tr key={guide.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50 hover:bg-slate-100/80 transition'}>
                          {/* Column 1: Thumbnail + Title + Subtitle */}
                          <td className="p-2 sm:p-4">
                            <div className="flex items-center gap-2.5 sm:gap-3">
                              <button
                                onClick={() => handleOpenGuide(guide.id)}
                                className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 border border-slate-200 hover:border-copper-orange shadow-sm transition group"
                                title="Click to read full field guide"
                              >
                                <img
                                  src={guide.heroImageUrl}
                                  alt={guide.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                                  loading="lazy"
                                />
                              </button>
                              <div className="min-w-0">
                                <button
                                  onClick={() => handleOpenGuide(guide.id)}
                                  className="font-serif font-bold text-pinery-green hover:text-copper-orange text-xs sm:text-sm leading-tight block text-left truncate transition"
                                >
                                  {guide.title}
                                </button>
                                <p className="text-[11px] text-slate-500 truncate hidden sm:block mt-0.5">
                                  {guide.subtitle}
                                </p>
                                <div className="flex sm:hidden items-center gap-2 mt-0.5 text-[10px] text-slate-500">
                                  <span className="text-copper-orange font-semibold">{guide.category}</span>
                                  <span>•</span>
                                  <span>{guide.readTime}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          {/* Column 2: Category */}
                          <td className="p-2 sm:p-4 hidden sm:table-cell">
                            <span className="inline-block text-[11px] font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">
                              {guide.category}
                            </span>
                          </td>
                          {/* Column 3: Author & Date */}
                          <td className="p-2 sm:p-4 hidden md:table-cell text-xs text-slate-600">
                            <div className="font-semibold text-slate-800 flex items-center gap-1">
                              <span>{guide.author.avatarEmoji}</span>
                              <span className="truncate">{guide.author.name}</span>
                            </div>
                            <div className="text-[10px] text-slate-400 mt-0.5">{guide.publishedDate}</div>
                          </td>
                          {/* Column 4: Read Time & Drops */}
                          <td className="p-2 sm:p-4 text-xs">
                            <div className="font-semibold text-slate-700">⏱️ {guide.readTime}</div>
                            <div className="text-[10px] text-copper-orange font-semibold mt-0.5">
                              {guide.associatedWaterfallIds.length} drops
                            </div>
                          </td>
                          {/* Column 5: Action */}
                          <td className="p-2 sm:p-4 text-right sm:text-left">
                            <button
                              onClick={() => handleOpenGuide(guide.id)}
                              className="inline-flex items-center gap-1 bg-parchment hover:bg-copper-orange hover:text-white text-slate-800 border border-slate-300 font-bold text-[11px] py-1.5 px-2.5 rounded shadow-sm transition"
                            >
                              <span>Read</span> <span className="hidden sm:inline">Guide</span> ➔
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Guides Pagination */}
              {totalGuidePages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
                  <div className="text-xs text-slate-600 font-medium">
                    Page <strong>{currentPage}</strong> of <strong>{totalGuidePages}</strong> ({filteredGuides.length} total field guides)
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap justify-center">
                    {/* First Page */}
                    <button
                      onClick={() => handleGuidePageChange(1)}
                      disabled={currentPage === 1}
                      className="px-2.5 py-1.5 rounded border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100 transition disabled:opacity-30 disabled:pointer-events-none"
                    >
                      « First
                    </button>

                    {/* Prev Page */}
                    <button
                      onClick={() => handleGuidePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 rounded border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100 transition disabled:opacity-30 disabled:pointer-events-none"
                    >
                      ‹ Prev
                    </button>

                    {/* Dynamic Numeric Page Pills */}
                    {Array.from({ length: totalGuidePages }, (_, i) => i + 1)
                      .filter(p => p === 1 || p === totalGuidePages || (p >= currentPage - 2 && p <= currentPage + 2))
                      .map((pageNum, idx, arr) => {
                        const prev = arr[idx - 1]
                        const showEllipsis = prev && pageNum - prev > 1

                        return (
                          <div key={pageNum} className="flex items-center">
                            {showEllipsis && <span className="px-1 text-slate-400 text-xs">…</span>}
                            <button
                              onClick={() => handleGuidePageChange(pageNum)}
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
                      onClick={() => handleGuidePageChange(currentPage + 1)}
                      disabled={currentPage === totalGuidePages}
                      className="px-3 py-1.5 rounded border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100 transition disabled:opacity-30 disabled:pointer-events-none"
                    >
                      Next ›
                    </button>

                    {/* Last Page */}
                    <button
                      onClick={() => handleGuidePageChange(totalGuidePages)}
                      disabled={currentPage === totalGuidePages}
                      className="px-2.5 py-1.5 rounded border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100 transition disabled:opacity-30 disabled:pointer-events-none"
                    >
                      Last »
                    </button>
                  </div>

                  {/* Quick Back to Top */}
                  <button
                    onClick={() => guidesTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="text-xs font-bold text-pinery-green hover:text-copper-orange transition flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded border border-slate-200"
                  >
                    ↑ Back to Top
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Curated Waterfall Blog Articles */}
          {activeTab === 'articles' && (
            <div className="space-y-6">
              <div className="bg-parchment p-4 rounded-xl border border-slate-300 text-xs text-slate-700 flex items-center justify-between flex-wrap gap-2">
                <span>
                  Showing <strong>{filteredArticles.length}</strong> curated articles from leading Northwoods publications (Lake Superior Magazine, Pure Michigan, Mitten State Wanderer, Midwest Living).
                </span>
                <span className="text-copper-orange font-bold">
                  Mapped directly to Upper Peninsula waterfall dossiers.
                </span>
              </div>

              {/* Empty State */}
              {filteredArticles.length === 0 && (
                <div className="text-center py-16 bg-parchment rounded-xl border border-slate-300 space-y-3">
                  <div className="text-4xl">🔍</div>
                  <h3 className="font-serif text-lg font-bold text-slate-800">No articles found</h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    No articles match your current search or filter criteria. Try choosing a different letter or resetting filters.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="inline-block bg-copper-orange hover:bg-tahquamenon-amber text-white font-bold text-xs py-2 px-4 rounded transition shadow"
                  >
                    Reset All Filters ↺
                  </button>
                </div>
              )}

              {/* View Mode: Cards Grid */}
              {viewMode === 'grid' && filteredArticles.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedArticles.map(art => (
                    <div
                      key={art.id}
                      className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="relative h-44 overflow-hidden">
                          <img
                            src={art.coverImageUrl}
                            alt={art.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute top-2.5 left-2.5 bg-copper-orange text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                            {art.category}
                          </div>
                          <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                            {art.readingTime}
                          </div>
                        </div>

                        <div className="p-4 space-y-2">
                          <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                            <span>{art.sourceSite}</span>
                            <span>{art.publishedDate}</span>
                          </div>

                          <h3 className="font-serif text-base font-bold text-slate-900 leading-snug">
                            {art.title}
                          </h3>

                          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                            {art.snippet}
                          </p>

                          <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-100 flex items-center gap-1.5">
                            <span>🌊</span>
                            <span>Waterbody: <strong>{art.waterfallName}</strong></span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 pt-0 flex gap-2">
                        <Link
                          to={`/waterfall/${art.waterfallId}`}
                          className="flex-1 bg-parchment hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold text-xs py-2 px-3 rounded transition text-center"
                        >
                          Waterfall Dossier
                        </Link>
                        <a
                          href={art.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-pinery-green hover:bg-emerald-900 text-white font-bold text-xs py-2 px-3 rounded transition text-center flex items-center justify-center gap-1"
                        >
                          <span>Visit</span> ➔
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* View Mode: Compact Table */}
              {viewMode === 'table' && filteredArticles.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-x-auto">
                  <table className="w-full text-left border-collapse" style={{ tableLayout: 'fixed' }}>
                    <thead className="bg-pinery-green text-parchment text-[10px] sm:text-xs uppercase tracking-wider">
                      <tr>
                        <th className="p-2 sm:p-4 font-bold border-b border-emerald-800 w-[55%] sm:w-[48%]">Waterfall & Article</th>
                        <th className="p-2 sm:p-4 font-bold border-b border-emerald-800 hidden sm:table-cell sm:w-[18%]">Source & Date</th>
                        <th className="p-2 sm:p-4 font-bold border-b border-emerald-800 hidden md:table-cell md:w-[14%]">Category</th>
                        <th className="p-2 sm:p-4 font-bold border-b border-emerald-800 w-[20%] sm:w-[10%]">Read Time</th>
                        <th className="p-2 sm:p-4 font-bold border-b border-emerald-800 w-[25%] sm:w-[10%] text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {paginatedArticles.map((art, idx) => (
                        <tr key={art.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50 hover:bg-slate-100/80 transition'}>
                          {/* Column 1: Thumbnail + Waterfall Name + Article Title */}
                          <td className="p-2 sm:p-4">
                            <div className="flex items-center gap-2.5 sm:gap-3">
                              <div className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 border border-slate-200 shadow-sm">
                                <img
                                  src={art.coverImageUrl}
                                  alt={art.title}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              </div>
                              <div className="min-w-0">
                                <Link
                                  to={`/waterfall/${art.waterfallId}`}
                                  className="font-serif font-bold text-pinery-green hover:text-copper-orange text-xs sm:text-sm leading-tight block truncate transition"
                                >
                                  {art.waterfallName}
                                </Link>
                                <p className="text-[11px] text-slate-700 font-medium truncate mt-0.5">
                                  {art.title}
                                </p>
                                <div className="flex sm:hidden items-center gap-1.5 mt-0.5 text-[10px] text-slate-500">
                                  <span className="text-copper-orange font-semibold">{art.sourceSite}</span>
                                  <span>•</span>
                                  <span>{art.readingTime}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          {/* Column 2: Source & Date */}
                          <td className="p-2 sm:p-4 hidden sm:table-cell text-xs text-slate-600">
                            <div className="font-semibold text-slate-800 truncate">{art.sourceSite}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">{art.publishedDate}</div>
                          </td>
                          {/* Column 3: Category */}
                          <td className="p-2 sm:p-4 hidden md:table-cell">
                            <span className="inline-block text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded">
                              {art.category}
                            </span>
                          </td>
                          {/* Column 4: Reading Time */}
                          <td className="p-2 sm:p-4 text-xs font-semibold text-slate-700">
                            ⏱️ {art.readingTime}
                          </td>
                          {/* Column 5: Actions */}
                          <td className="p-2 sm:p-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <Link
                                to={`/waterfall/${art.waterfallId}`}
                                className="bg-parchment hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold text-[10px] py-1 px-2 rounded transition"
                                title="View Waterfall Dossier"
                              >
                                Dossier
                              </Link>
                              <a
                                href={art.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-pinery-green hover:bg-emerald-900 text-white font-bold text-[10px] py-1 px-2 rounded transition"
                                title="Visit source article"
                              >
                                ➔
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Articles Pagination */}
              {totalArticlePages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
                  <div className="text-xs text-slate-600 font-medium">
                    Page <strong>{articleCurrentPage}</strong> of <strong>{totalArticlePages}</strong> ({filteredArticles.length} total articles)
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap justify-center">
                    {/* First Page */}
                    <button
                      onClick={() => handleArticlePageChange(1)}
                      disabled={articleCurrentPage === 1}
                      className="px-2.5 py-1.5 rounded border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100 transition disabled:opacity-30 disabled:pointer-events-none"
                    >
                      « First
                    </button>

                    {/* Prev Page */}
                    <button
                      onClick={() => handleArticlePageChange(articleCurrentPage - 1)}
                      disabled={articleCurrentPage === 1}
                      className="px-3 py-1.5 rounded border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100 transition disabled:opacity-30 disabled:pointer-events-none"
                    >
                      ‹ Prev
                    </button>

                    {/* Dynamic Numeric Page Pills */}
                    {Array.from({ length: totalArticlePages }, (_, i) => i + 1)
                      .filter(p => p === 1 || p === totalArticlePages || (p >= articleCurrentPage - 2 && p <= articleCurrentPage + 2))
                      .map((pageNum, idx, arr) => {
                        const prev = arr[idx - 1]
                        const showEllipsis = prev && pageNum - prev > 1

                        return (
                          <div key={pageNum} className="flex items-center">
                            {showEllipsis && <span className="px-1 text-slate-400 text-xs">…</span>}
                            <button
                              onClick={() => handleArticlePageChange(pageNum)}
                              className={`min-w-[32px] h-8 px-2 rounded text-xs font-bold transition ${
                                pageNum === articleCurrentPage
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
                      onClick={() => handleArticlePageChange(articleCurrentPage + 1)}
                      disabled={articleCurrentPage === totalArticlePages}
                      className="px-3 py-1.5 rounded border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100 transition disabled:opacity-30 disabled:pointer-events-none"
                    >
                      Next ›
                    </button>

                    {/* Last Page */}
                    <button
                      onClick={() => handleArticlePageChange(totalArticlePages)}
                      disabled={articleCurrentPage === totalArticlePages}
                      className="px-2.5 py-1.5 rounded border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100 transition disabled:opacity-30 disabled:pointer-events-none"
                    >
                      Last »
                    </button>
                  </div>

                  {/* Quick Back to Top */}
                  <button
                    onClick={() => guidesTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="text-xs font-bold text-pinery-green hover:text-copper-orange transition flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded border border-slate-200"
                  >
                    ↑ Back to Top
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      )}
    </div>
  )
}
