import { useState, useMemo, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  TRAVEL_GUIDES,
  WATERFALL_BLOG_ARTICLES,
  type TravelGuide
} from '../data/travelGuidesData'
import { WATERFALL_HIKING_DATA } from '../data/waterfallHikingData'
import { useTrip } from '../lib/TripContext'

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

  const [selectedCategory, setSelectedCategory] = useState<string>('All Guides')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [activeGuideId, setActiveGuideId] = useState<string | null>(guideId || null)
  const [activeTab, setActiveTab] = useState<'guides' | 'articles'>('guides')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

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

  // Active guide object
  const activeGuide: TravelGuide | undefined = useMemo(() => {
    if (!activeGuideId) return undefined
    return TRAVEL_GUIDES.find(g => g.id === activeGuideId || g.slug === activeGuideId)
  }, [activeGuideId])

  // Filtered guides
  const filteredGuides = useMemo(() => {
    return TRAVEL_GUIDES.filter(guide => {
      const matchesCat =
        selectedCategory === 'All Guides' || guide.category === selectedCategory
      const q = searchQuery.toLowerCase().trim()
      if (!q) return matchesCat

      const matchesSearch =
        guide.title.toLowerCase().includes(q) ||
        guide.subtitle.toLowerCase().includes(q) ||
        guide.excerpt.toLowerCase().includes(q) ||
        guide.tags.some(t => t.toLowerCase().includes(q)) ||
        guide.author.name.toLowerCase().includes(q)

      return matchesCat && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  // Filtered articles
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return WATERFALL_BLOG_ARTICLES
    const q = searchQuery.toLowerCase().trim()
    return WATERFALL_BLOG_ARTICLES.filter(art => {
      return (
        art.title.toLowerCase().includes(q) ||
        art.waterfallName.toLowerCase().includes(q) ||
        art.snippet.toLowerCase().includes(q) ||
        art.sourceSite.toLowerCase().includes(q) ||
        art.category.toLowerCase().includes(q)
      )
    })
  }, [searchQuery])

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
                onClick={() => setActiveTab('guides')}
                className={`px-3.5 py-1.5 rounded-md transition ${
                  activeTab === 'guides'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Comprehensive Guides ({TRAVEL_GUIDES.length})
              </button>
              <button
                onClick={() => setActiveTab('articles')}
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

          {/* Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Categories */}
            {activeTab === 'guides' && (
              <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full transition border ${
                      selectedCategory === cat
                        ? 'bg-emerald-900 text-white border-emerald-900 shadow-sm'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={activeTab === 'guides' ? 'Search guides or tags...' : 'Search articles or waterfalls...'}
                className="w-full text-xs bg-white border border-slate-300 rounded-lg pl-8 pr-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-copper-orange shadow-sm"
              />
              <span className="absolute left-2.5 top-2.5 text-slate-400 text-xs">🔍</span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-700 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* TAB 1: Master Field Guides Grid */}
          {activeTab === 'guides' && (
            <div className="space-y-8">
              {/* Flagship Featured Hero Guide (shown when viewing All and no search) */}
              {selectedCategory === 'All Guides' && !searchQuery && TRAVEL_GUIDES.length > 0 && (
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

              {/* Guides Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGuides.map(guide => (
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
                        <div className="pt-2 flex items-center gap-2 text-xs text-slate-500 border-t border-slate-100">
                          <span>{guide.author.avatarEmoji}</span>
                          <span className="font-bold text-slate-800">{guide.author.name}</span>
                          <span>•</span>
                          <span>{guide.publishedDate}</span>
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

              {filteredGuides.length === 0 && (
                <div className="text-center py-16 bg-parchment rounded-xl border border-slate-300 space-y-2">
                  <div className="text-3xl">🔍</div>
                  <h3 className="font-serif text-lg font-bold text-slate-800">No field guides found</h3>
                  <p className="text-xs text-slate-600">Try adjusting your category filter or search keywords.</p>
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map(art => (
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
            </div>
          )}

        </div>
      )}
    </div>
  )
}
