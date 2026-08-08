import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useTrip } from '../lib/TripContext'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { tripItems } = useTrip()
  const [showChangelog, setShowChangelog] = useState(false)

  return (
    <div className="bg-parchment font-sans text-slate-800 antialiased min-h-screen flex flex-col relative">
      <header className="bg-pinery-green text-parchment sticky top-0 z-50 shadow-lg border-b-4 border-copper-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🌲</span>
            <Link to="/">
              <h1 className="font-serif font-bold text-lg sm:text-xl tracking-wider text-parchment leading-none">UP WATERFALLS</h1>
              <p className="text-[10px] text-copper-orange font-semibold tracking-widest uppercase">Wilderness Travel Planner</p>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-6 text-sm font-medium text-parchment">
            <Link to="/" className="hover:text-copper-orange transition">Hubs & Loops</Link>
            <Link to="/directory" className="hover:text-copper-orange transition">Waterfall Directory</Link>
            <Link to="/trip" className="hover:text-copper-orange transition">Trip Planner</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <a 
              href="https://seelye.info" 
              className="flex items-center justify-center w-8 h-8 rounded-full border border-emerald-700/50 hover:bg-emerald-800/50 transition text-[1.1rem] leading-none"
              title="Seelye.info Home"
            >
              🏠
            </a>
            <Link to="/trip" className="bg-copper-orange hover:bg-tahquamenon-amber text-white px-3.5 py-1.5 rounded text-xs font-semibold shadow transition">
              🧭 Active Trip ({tripItems.length})
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col relative z-10">
        {children}
      </main>

      <div className="w-full overflow-hidden leading-none text-emerald-950 -mb-1 mt-auto relative z-10">
        <svg className="w-full h-16 sm:h-20 fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M 0,120 L 0,60 L 15,90 L 30,40 L 45,85 L 60,30 L 75,80 L 90,50 L 105,95 L 120,20 L 135,85 L 150,45 L 165,90 L 180,35 L 195,80 L 210,15 L 225,85 L 240,40 L 255,90 L 270,50 L 285,95 L 300,25 L 315,85 L 330,35 L 345,90 L 360,45 L 375,80 L 390,20 L 405,85 L 420,40 L 435,95 L 450,30 L 465,85 L 480,50 L 495,90 L 510,15 L 525,80 L 540,40 L 555,85 L 570,30 L 585,90 L 600,25 L 615,85 L 630,45 L 645,90 L 660,35 L 675,80 L 690,15 L 705,85 L 720,40 L 735,90 L 750,50 L 765,95 L 780,25 L 795,85 L 810,35 L 825,90 L 840,45 L 855,80 L 870,20 L 885,85 L 900,40 L 915,95 L 930,30 L 945,85 L 960,50 L 975,90 L 990,15 L 1005,80 L 1020,40 L 1035,85 L 1050,30 L 1065,90 L 1080,25 L 1095,85 L 1110,45 L 1125,90 L 1140,35 L 1155,80 L 1170,15 L 1185,85 L 1200,60 L 1200,120 Z"></path>
        </svg>
      </div>

      {/* Footer & Version History */}
      <footer className="bg-emerald-950 text-slate-300 py-12 px-4 sm:px-6 lg:px-8 border-t-4 border-copper-orange relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="space-y-4 text-center md:text-left">
            <div className="font-serif text-2xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <span className="text-copper-orange">🌲</span> UP Waterfalls
            </div>
            <p className="text-sm max-w-sm leading-relaxed text-emerald-100/70">
              The ultimate wilderness travel planner for Michigan's Upper Peninsula waterfalls and historic sites. Hosted on seelye.info.
            </p>
            <div className="text-xs space-x-4 pt-4 border-t border-emerald-900/50 flex justify-center md:justify-start">
              <a href="#" className="hover:text-copper-orange transition">Terms</a>
              <a href="#" className="hover:text-copper-orange transition">Privacy</a>
              <a href="#" className="hover:text-copper-orange transition">Contact</a>
            </div>
          </div>

          <div className="flex-shrink-0">
            <button 
              onClick={() => setShowChangelog(true)}
              className="bg-emerald-900/60 hover:bg-emerald-800 text-white px-6 py-3 rounded-lg border border-emerald-800/50 shadow-lg transition flex items-center gap-3 font-semibold"
            >
              <span>📋</span> Beta 0.6.0
            </button>
          </div>

        </div>
      </footer>

      {/* CHANGELOG MODAL OVERLAY */}
      {showChangelog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-emerald-950 w-full max-w-2xl rounded-xl shadow-2xl border border-emerald-800 flex flex-col overflow-hidden max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="bg-emerald-900/80 px-6 py-4 border-b border-emerald-800 flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                <span>📋</span> Version History & Changelog
              </h3>
              <button 
                onClick={() => setShowChangelog(false)}
                className="text-emerald-400 hover:text-white transition p-1 bg-emerald-950 rounded"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 overflow-y-auto space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5 pb-4 border-b border-emerald-800/50">
                <span className="bg-copper-orange text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shrink-0 self-start">
                  Beta 0.6.0
                </span>
                <div>
                  <p className="text-base font-semibold text-white">Waterfall Directory Listing</p>
                  <p className="text-sm text-emerald-100/70 mt-1 leading-relaxed">
                    Created a dedicated Waterfall Directory page featuring an A-Z scannable index of all waterfalls, utilizing the new massive database schema.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5 pb-4 border-b border-emerald-800/50">
                <span className="bg-slate-700 text-slate-300 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shrink-0 self-start">
                  Beta 0.5.2
                </span>
                <div>
                  <p className="text-base font-semibold text-white">Portal Integration & Data Clean-up</p>
                  <p className="text-sm text-emerald-100/70 mt-1 leading-relaxed">
                    Tied the application back to the main Seelye.info Portal Hub by introducing the universal home button into the header navigation. Handled database deduplication.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5 pb-4 border-b border-emerald-800/50">
                <span className="bg-slate-700 text-slate-300 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shrink-0 self-start">
                  Beta 0.5.1
                </span>
                <div>
                  <p className="text-base font-semibold text-white">Changelog Modal UI</p>
                  <p className="text-sm text-emerald-100/70 mt-1 leading-relaxed">
                    Refactored the changelog into a dedicated floating modal dialog overlay accessible via a clean version button in the footer.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5 pb-4 border-b border-emerald-800/50">
                <span className="bg-slate-700 text-slate-300 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shrink-0 self-start">
                  Beta 0.5.0
                </span>
                <div>
                  <p className="text-base font-semibold text-white">Stage 1 Scaling & Hub Redesign</p>
                  <p className="text-sm text-emerald-100/70 mt-1 leading-relaxed">
                    Redesigned the homepage into a scalable County Hub Card grid to support hundreds of waterfalls. Added 8 new major waterfalls and optimized search functionality.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5 pb-4 border-b border-emerald-800/50">
                <span className="bg-slate-700 text-slate-300 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shrink-0 self-start">
                  Beta 0.4.0
                </span>
                <div>
                  <p className="text-base font-semibold text-white">County Hubs & Dynamic Photos</p>
                  <p className="text-sm text-emerald-100/70 mt-1 leading-relaxed">
                    Grouped home page into dynamic County Hubs. Added full photo integration using Wikimedia Commons imagery, with an Inline Hero Photo Gallery on detail pages.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5 pb-4 border-b border-emerald-800/50">
                <span className="bg-slate-700 text-slate-300 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shrink-0 self-start">
                  Beta 0.3.0
                </span>
                <div>
                  <p className="text-base font-semibold text-white">Interactive Trip Planner</p>
                  <p className="text-sm text-emerald-100/70 mt-1 leading-relaxed">
                    Added local storage anonymous Trip Planner allowing users to save and build itineraries. Added dynamic nearby attractions fetching from Supabase.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5 pb-4 border-b border-emerald-800/50">
                <span className="bg-slate-700 text-slate-300 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shrink-0 self-start">
                  Beta 0.2.0
                </span>
                <div>
                  <p className="text-base font-semibold text-slate-300">Database Integration</p>
                  <p className="text-sm text-emerald-100/70 mt-1 leading-relaxed">
                    Wired up Supabase backend for dynamic fetching. Added real UP waterfalls data. Established CI/CD pipeline via GitHub Desktop & Vercel.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5 pb-1">
                <span className="bg-slate-700 text-slate-300 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shrink-0 self-start">
                  Beta 0.1.0
                </span>
                <div>
                  <p className="text-base font-semibold text-slate-300">Initial Scaffolding</p>
                  <p className="text-sm text-emerald-100/50 mt-1 leading-relaxed">
                    Created base rustic UI, setup Tailwind CSS 4.0, built routing and detail views.
                  </p>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-emerald-900/50 p-4 border-t border-emerald-800 text-center">
              <button 
                onClick={() => setShowChangelog(false)}
                className="bg-emerald-800 hover:bg-emerald-700 text-white px-6 py-2 rounded font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
