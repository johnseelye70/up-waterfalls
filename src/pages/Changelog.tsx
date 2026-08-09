import { Link } from 'react-router-dom'

export default function Changelog() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="mb-10">
        <Link to="/" className="text-copper-orange hover:text-tahquamenon-amber font-semibold text-sm mb-4 inline-block">
          ← Back to Hub
        </Link>
        <h2 className="font-serif text-3xl font-bold text-emerald-950 flex items-center gap-3">
          <span>📋</span> Version History & Changelog
        </h2>
        <p className="text-slate-600 mt-2">
          Tracking the development of the UP Waterfalls wilderness planner.
        </p>
      </div>

      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
        
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-parchment bg-copper-orange text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
            🔐
          </div>
          <div className="space-y-12">
          {/* Version 0.10.1 */}
          <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
            <div className="bg-pinery-green px-6 py-4 border-b border-emerald-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
                  <span className="text-copper-orange">★</span> Beta 0.10.1
                </h3>
                <span className="text-emerald-100 font-semibold text-sm">August 2026</span>
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <p className="text-slate-700 leading-relaxed font-medium">
                Cleaned up layout presentation by removing the duplicate copyright text from the top header navigation and consolidating it in the footer with updated branding for Seelye.info.
              </p>
            </div>
          </div>
          {/* Version 0.10.0 */}
          <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif text-2xl font-bold text-slate-800 flex items-center gap-2">
                  Beta 0.10.0
                </h3>
                <span className="text-slate-500 font-semibold text-sm">August 2026</span>
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <p className="text-slate-700 leading-relaxed font-medium">
                Added photo deletion functionality to the Admin Gallery Management interface. Includes a secure RPC endpoint to allow administrators to permanently remove unwanted or miscategorized photos from the database.
              </p>
            </div>
          </div>
          {/* Version 0.9.3 */}
          <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif text-2xl font-bold text-slate-800 flex items-center gap-2">
                  Beta 0.9.3
                </h3>
                <span className="text-slate-500 font-semibold text-sm">August 2026</span>
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <p className="text-slate-700 leading-relaxed font-medium">
                Added Vercel rewrite rules to fix a bug where refreshing the browser on a nested route (like the Admin portal or a Waterfall Detail page) resulted in a 404 Not Found error.
              </p>
            </div>
          </div>
          {/* Version 0.9.2 */}
          <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif text-2xl font-bold text-slate-800 flex items-center gap-2">
                  Beta 0.9.2
                </h3>
                <span className="text-slate-500 font-semibold text-sm">August 2026</span>
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <p className="text-slate-700 leading-relaxed font-medium">
                Added a convenient in-app password change utility to the Admin Dashboard. Securely computes new cryptographic hashes entirely in the browser and updates the cloud settings layer via a locked RPC function.
              </p>
            </div>
          </div>
          {/* Version 0.9.1 */}
          <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif text-2xl font-bold text-slate-800 flex items-center gap-2">
                  Beta 0.9.1
                </h3>
                <span className="text-slate-500 font-semibold text-sm">August 2026</span>
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <p className="text-slate-700 leading-relaxed font-medium">
                Applied a critical hotfix to the Admin Portal's photo gallery logic. The frontend was silently failing to trigger the secure RPC updates. It is now properly wired up to bypass database RLS restrictions when authenticated with the Master Passcode.
              </p>
            </div>
          </div>

          {/* Version 0.9.0 */}
          <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif text-2xl font-bold text-slate-800 flex items-center gap-2">
                  Beta 0.9.0
                </h3>
                <span className="text-slate-500 font-semibold text-sm">August 2026</span>
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <p className="text-base font-semibold text-slate-800">Admin Upload Portal & System Security</p>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Implemented a zero-plaintext passcode system with SHA-256 local hashing and brute-force protection to allow secure, owner-only uploads of waterfall photos.
              </p>
            </div>
          </div>
        </div>
        </div>

        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-parchment bg-slate-400 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
            🌲
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white/40">
            <div className="font-bold text-slate-700 text-lg mb-1">Beta 0.7.0</div>
            <p className="text-base font-semibold text-slate-700">Comprehensive Waterfall Dataset & Inline UI</p>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Injected 291 authentic, verified waterfalls with precise coordinates. Removed modal overlays per inline architecture requirements.
            </p>
          </div>
        </div>

        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-parchment bg-slate-400 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
            ☀️
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white/40">
            <div className="font-bold text-slate-700 text-lg mb-1">Beta 0.6.5</div>
            <p className="text-base font-semibold text-slate-700">14-Day Weather Forecast</p>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Expanded the Live Weather widget to include an interactive, full-screen modal displaying a detailed 14-day trail forecast for the waterfall.
            </p>
          </div>
        </div>
        
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-parchment bg-slate-400 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
            ⛅
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white/40">
            <div className="font-bold text-slate-700 text-lg mb-1">Beta 0.6.4</div>
            <p className="text-base font-semibold text-slate-700">Live Weather Integration</p>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Added real-time weather and estimated trail conditions to Waterfall Detail pages using coordinate-based fetches from Open-Meteo.
            </p>
          </div>
        </div>

        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-parchment bg-slate-400 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
            📝
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white/40">
            <div className="font-bold text-slate-700 text-lg mb-1">Beta 0.6.3</div>
            <p className="text-base font-semibold text-slate-700">Travel Blogs & Guides Integration</p>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Activated the `waterfall_blogs` data layer to dynamically display curated articles, external travel guides, and historic write-ups.
            </p>
          </div>
        </div>

        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-parchment bg-slate-300 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
            ▶️
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white/30">
            <div className="font-bold text-slate-700 text-lg mb-1">Beta 0.6.2</div>
            <p className="text-base font-semibold text-slate-700">Manual Video Support</p>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Added database schema support for manual YouTube video assignments.
            </p>
          </div>
        </div>

        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-parchment bg-slate-300 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
            🖼️
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white/30">
            <div className="font-bold text-slate-700 text-lg mb-1">Beta 0.6.1</div>
            <p className="text-base font-semibold text-slate-700">Full-Screen Gallery Lightbox</p>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Added an interactive photo gallery modal to the Waterfall Directory.
            </p>
          </div>
        </div>

        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-parchment bg-slate-300 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
            🗂️
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white/30">
            <div className="font-bold text-slate-700 text-lg mb-1">Beta 0.6.0</div>
            <p className="text-base font-semibold text-slate-700">Waterfall Directory Listing</p>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Created a dedicated Waterfall Directory page featuring an A-Z scannable index of all waterfalls.
            </p>
          </div>
        </div>

        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-parchment bg-slate-200 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
            🚀
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white/20">
            <div className="font-bold text-slate-600 text-lg mb-1">Beta 0.1.0 - 0.5.2</div>
            <p className="text-base font-semibold text-slate-600">Early Access</p>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Initial database setup, county hubs, photo integration, and basic UI scaffolds.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
