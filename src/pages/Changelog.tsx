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
          {/* Version 0.14.0 */}
          <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
            <div className="bg-pinery-green px-6 py-4 border-b border-emerald-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
                  <span className="text-copper-orange">★</span> Beta 0.14.0
                </h3>
                <span className="text-emerald-100 font-semibold text-sm">September 2026</span>
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <p className="text-base font-semibold text-slate-800">Admin Fast-Tagger Dropzone, Top 35 Priority Trail Falls, & Historical Digital Archives</p>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>Admin Multi-Photo Dropzone & Fast-Tagger:</strong> Redesigned the administrator upload workflow with a multi-file drag-and-drop zone. Supports simultaneous multi-image queues, instant thumbnail previews, per-photo waterfall tagging, batch tagging, and sequential Supabase Storage uploads with real-time progress indicators.</li>
                <li><strong>Top 35 Priority Trail Falls Hit List:</strong> Added a dedicated interactive inline dashboard highlighting essential Upper Peninsula trail destinations awaiting authentic photos (including Jacob's Falls, Sturgeon Falls, Piers Gorge, Rock River Falls, Big Erick's Fall, Silver Falls, and Chicagon Falls). Features real-time coverage badges, instant search, and one-click "Fast-Tag" buttons to pre-populate uploads.</li>
                <li><strong>Historical & State Digital Archives Integration:</strong> Sourced authentic 19th-century stereographic prints from the Robert N. Dennis Collection (New York Public Library / Library of Congress) and Whitney & Zimmerman for Munising Falls and Interstate Falls (Montreal River).</li>
                <li><strong>Backcountry & Ottawa National Forest Coverage:</strong> Deployed verified field photography for Douglass - Houghton Falls (Michigan's tallest waterfall at 110 ft), Great Conglomerate Falls, Eagle River Falls, Haven Falls, Greenstone Falls, Kakabika Falls, Yondota Falls, Gabbro Falls, Jumbo Falls, Judson Falls, Hogger Falls, Lepisto Falls, and Ogimakwe Falls.</li>
                <li><strong>Database Coverage Milestone:</strong> Increased verified authentic photography to 178 photos across 69 unique Upper Peninsula waterfalls while strictly maintaining the administrator's Alger Falls manual photo as hero.</li>
              </ul>
            </div>
          </div>

          {/* Version 0.13.0 */}
          <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif text-2xl font-bold text-slate-800 flex items-center gap-2">
                  Beta 0.13.0
                </h3>
                <span className="text-slate-500 font-semibold text-sm">September 2026</span>
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <p className="text-base font-semibold text-slate-800">GPS Coordinate Geosearch & Backcountry Waterfall Photo Expansion</p>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>Automated GPS Geocoded Sourcing:</strong> Implemented a coordinate-based geosearch pipeline matching physical camera coordinates within 800m of recorded waterfall locations, bypassing naming ambiguities.</li>
                <li><strong>14 New Backcountry Waterfalls Covered:</strong> Added verified field photography for Saxon Falls, Lower Saxon Falls, Chippewa Falls, Nelson Canyon Falls, Lower Gleason Creek Falls, Lower Plover Falls, Upper O Kun de Kun Falls, Rocky Forty Falls, Upper Rocky Forty Falls, West Branch Yellow Dog Falls, Granite Rapids Falls, Tobacco Falls, Manganese Gorge Falls, and Little Union Gorge Falls.</li>
                <li><strong>Expanded Database Coverage:</strong> Increased authentic Upper Peninsula photo coverage to 66 unique waterfalls and 158 verified photos, complete with USFS botanist and field photographer attributions.</li>
              </ul>
            </div>
          </div>

          {/* Version 0.12.0 */}
          <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif text-2xl font-bold text-slate-800 flex items-center gap-2">
                  Beta 0.12.0
                </h3>
                <span className="text-slate-500 font-semibold text-sm">September 2026</span>
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <p className="text-base font-semibold text-slate-800">100% Authentic UP Waterfall Photo Restoration & Rigorous Multi-Photo Curation</p>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>Strict Geographic & Visual Curation:</strong> Audited and eliminated all out-of-state waterfalls (Pennsylvania, Wisconsin, Hawaii, Ontario, Virginia) and non-waterfall artifacts (minerals, signs, documents, videos).</li>
                <li><strong>135 Verified Authentic Waterfall Photos:</strong> Deployed 135 confirmed real photos across 51 major Upper Peninsula waterfalls with authentic photographer credits and descriptive captions.</li>
                <li><strong>Multiple Authentic Photos Per Waterfall:</strong> Added high-resolution photo sets for premier destinations including Tahquamenon Falls (Upper & Lower), Bond Falls, Miners Falls, Sable Falls, Laughing Whitefish Falls, Canyon Falls, Bridal Veil Falls, Manabezho Falls, Manido Falls, Agate Falls, Bonanza Falls, Tannery Falls, Memorial Falls, Scott Falls, Chapel Falls, Mosquito Falls, Spray Falls, Hungarian Falls, Rainbow Falls, and more.</li>
                <li><strong>Alger Falls Manual Upload Protection:</strong> Ensured the administrator's original on-site photograph of Alger Falls from M-28 is strictly preserved as the primary Hero photo, complemented by verified secondary gallery views.</li>
              </ul>
            </div>
          </div>

          {/* Version 0.11.0 */}
          <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif text-2xl font-bold text-slate-800 flex items-center gap-2">
                  Beta 0.11.0
                </h3>
                <span className="text-slate-500 font-semibold text-sm">September 2026</span>
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <p className="text-base font-semibold text-slate-800">100% Inline Architecture Compliance & Authentic Photo Curation Suite</p>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>Complete Inline Architecture:</strong> Eliminated all full-screen modal popup boxes and fixed overlays across the application. Photo galleries and video presentations in the Directory, as well as the 14-day extended trail forecast in Waterfall Details, now expand 100% inline within the page document stream.</li>
                <li><strong>Purged Synthetic & Misattributed Content:</strong> Removed generic Unsplash stock photos from hero and county cards. Established authentic UP wilderness state badges inviting visitor contributions when authentic photos are not yet verified.</li>
                <li><strong>Database Photo Cleaning Suite:</strong> Created <code className="bg-slate-100 px-1 rounded text-slate-700">clean_photos.sql</code> and automated audit tooling to remove non-waterfall artifacts (minerals, signs, maps, distant scenery) and ensure authentic photography.</li>
                <li><strong>Admin Curation Indicators:</strong> Upgraded the Admin portal waterfall selector to display live photo indicators (<code className="text-amber-700">⚠️ Needs Photo</code> vs <code className="text-emerald-700">✅ X photos</code>) for seamless photo inventory management.</li>
                <li><strong>iOS Table Layout Optimization:</strong> Adjusted Directory table widths to fixed 100% layout and reduced mobile cell padding to prevent horizontal viewport shift on narrow devices.</li>
              </ul>
            </div>
          </div>

          {/* Version 0.10.2 */}
          <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif text-2xl font-bold text-slate-800 flex items-center gap-2">
                  Beta 0.10.2
                </h3>
                <span className="text-slate-500 font-semibold text-sm">August 2026</span>
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <p className="text-slate-700 leading-relaxed font-medium">
                Refined the footer layout by removing redundant hosting text for a cleaner presentation.
              </p>
            </div>
          </div>
          {/* Version 0.10.1 */}
          <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif text-2xl font-bold text-slate-800 flex items-center gap-2">
                  Beta 0.10.1
                </h3>
                <span className="text-slate-500 font-semibold text-sm">August 2026</span>
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
