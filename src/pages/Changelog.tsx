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
          {/* Version 1.0.0 */}
          <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
            <div className="bg-pinery-green px-6 py-4 border-b border-emerald-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
                  <span className="text-copper-orange">★</span> Beta 1.0.0
                </h3>
                <span className="text-emerald-100 font-semibold text-sm">September 2026</span>
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <p className="text-base font-semibold text-slate-800">Milestone Release: Complete Upper Peninsula Wilderness Platform & Field Scout System</p>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>Major Milestone (Beta 1.0.0):</strong> The UP Waterfalls wilderness planning platform attains its landmark 1.0.0 milestone, delivering a comprehensive, production-grade guide to all 291 waterfalls across Michigan's Upper Peninsula.</li>
                <li><strong>Full Editorial Publication Library:</strong> Features 36 multi-chapter Field Guides and 73 Curated Travel Journals backed by 100% unique, verified authentic photography and zero placeholder recycling.</li>
                <li><strong>Interactive Directory Navigation Suite:</strong> Dual view modes (Visual Cards vs. Compact iOS-optimized Tables), real-time keyword search, live category count pills, 26-letter A–Z quick-jump strips, and responsive pagination across both directories.</li>
                <li><strong>Complete County Hub Coverage:</strong> 100% authentic hero photographic coverage across all 11 Upper Peninsula county hubs, from the Lake Superior sandstone cliffs of Alger County to the remote river gorges of Iron and Dickinson counties.</li>
                <li><strong>Interactive Route & Trip Planner:</strong> End-to-end trip creation with automated driving calculations, waypoint ordering, fuel estimates, elevation profiles, and GPX export.</li>
                <li><strong>Strict Inline Architecture & Security:</strong> Built 100% inline without intrusive popup modals or fixed scroll-traps, backed by SHA-256 Web Crypto authentication, brute-force rate-limiting, and non-destructive sync reconciliation.</li>
              </ul>
            </div>
          </div>

          {/* Version 0.29.0 */}
          <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif text-2xl font-bold text-slate-800 flex items-center gap-2">
                  Beta 0.29.0
                </h3>
                <span className="text-slate-500 font-semibold text-sm">September 2026</span>
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <p className="text-base font-semibold text-slate-800">Interactive Field Guide Navigation Suite, Dual View Modes, A-Z Quick-Jump & Dynamic Directory Binding</p>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>Dynamic Homepage Guide Link:</strong> Updated the homepage link to dynamically bind to <code className="bg-slate-100 px-1 rounded text-slate-700">TRAVEL_GUIDES.length</code> ("Browse All 36 Guides"), ensuring the displayed count automatically stays synchronized whenever new field guides are added.</li>
                <li><strong>Directory-Style Navigation Suite for Field Guides:</strong> Overhauled the "All Guides" section with real-time keyword search, category filter pills with live item count badges, multi-criteria sorting (Title A–Z, Title Z–A, Quickest Read, In-Depth Read, Most Featured Drops, Category), and active filter dismissal chips.</li>
                <li><strong>Dual View Modes (Visual Cards vs. Compact Table):</strong> Introduced a responsive view mode switcher allowing explorers to switch seamlessly between rich photographic card grids and a compact, scannable directory table engineered with iOS Safari-safe fixed column widths and optimized cell padding.</li>
                <li><strong>A–Z Alphabetical Quick-Jump Navigation:</strong> Integrated interactive 26-letter quick-jump strips with letter count badges for both Field Guides (alphabetized by title) and Curated Travel Articles (alphabetized by waterfall name), enabling instant 1-click filtering.</li>
                <li><strong>Smart Pagination & Back-to-Top Anchor:</strong> Replaced endless scrolling with responsive pagination (configurable to 9, 18, 36, or Show All per page) featuring numeric page buttons, windowed ellipsis, and automatic smooth-scroll to top on navigation.</li>
              </ul>
            </div>
          </div>

          {/* Version 0.28.0 */}
          <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif text-2xl font-bold text-slate-800 flex items-center gap-2">
                  Beta 0.28.0
                </h3>
                <span className="text-slate-500 font-semibold text-sm">September 2026</span>
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <p className="text-base font-semibold text-slate-800">100% Unique & Verified Authentic Photography Across All 109 Field Guides & Travel Journals</p>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>Strict 100% Image Uniqueness:</strong> Completely eradicated image recycling and repetitive placeholder covers across the entire publication catalog. Every single entry among all 36 Field Guides and all 73 Travel Journals features its own distinct, dedicated photograph (109 total unique images).</li>
                <li><strong>Verified Working Media (Zero Broken Links):</strong> Audited every single image URL with automated validation scripts. All 53 authentic Wikimedia Commons field photographs were validated against the official MediaWiki Action API, and all 56 Unsplash high-resolution wilderness photographs were validated with HTTP 200 OK responses.</li>
                <li><strong>Authentic Waterfall Media Matching:</strong> Waterfall travel articles prioritize verified field photography sourced from the Supabase photo registry, U.S. Forest Service (USFS), Bureau of Land Management (BLM), and National Park Service (NPS) archives, depicting the specific cataracts and geological formations described in each dossier.</li>
                <li><strong>Curated Subject Relevance for Field Guides:</strong> Every field guide hero banner was customized to precisely reflect its educational topic—including winter ice climbing gear, canine trail companions, pasty shops, aerial river canyon perspectives, dark sky aurora over waterfalls, and historic copper ruins.</li>
              </ul>
            </div>
          </div>

          {/* Version 0.27.0 */}
          <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif text-2xl font-bold text-slate-800 flex items-center gap-2">
                  Beta 0.27.0
                </h3>
                <span className="text-slate-500 font-semibold text-sm">September 2026</span>
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <p className="text-base font-semibold text-slate-800">2x Content Expansion: 36 Comprehensive Field Guides & 73 Curated Travel Journals</p>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>Comprehensive Field Guides Doubled (18 → 36):</strong> Expanded the authoritative field guide catalog to 36 multi-chapter dossiers across all five editorial categories (<code className="bg-slate-100 px-1 rounded text-slate-700">Regional Expeditions</code>, <code className="bg-slate-100 px-1 rounded text-slate-700">Trail Craft & Safety</code>, <code className="bg-slate-100 px-1 rounded text-slate-700">Seasonal Tactics</code>, <code className="bg-slate-100 px-1 rounded text-slate-700">Photography</code>, and <code className="bg-slate-100 px-1 rounded text-slate-700">Culinary & Culture</code>). Each guide features in-depth chapters, geological explanations, pro tips, gear checklists, and FAQ knowledge bases.</li>
                <li><strong>Curated Travel Journals Doubled (37 → 73):</strong> Doubled the waterfall-specific editorial journal articles across 73 individual waterfalls, each linking directly to its respective interactive waterfall dossier with vetted author credits, reading times, publication badges, and rich Northwoods descriptions.</li>
                <li><strong>New Backcountry Topics:</strong> Introduced specialized field guides covering the Tahquamenon Amber Basin, Black River National Scenic Byway, Marquette Granite Highlands, Off-Trail Canyon Navigation, Universal Accessibility & Stroller Boardwalks, Autumn Foliage Timelines, Long-Exposure Shutter Calculations, Superior Smoked Fish & Foraged Berries, Finnish Sauna & River Plunge Traditions, and Keweenaw Copper Ghost Towns.</li>
                <li><strong>Zero-Collision Article Indexing:</strong> Resolved legacy duplicate article keys and normalized ID structures to guarantee instant, seamless client-side search filtering across both tabs.</li>
              </ul>
            </div>
          </div>

          {/* Version 0.26.0 */}
          <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif text-2xl font-bold text-slate-800 flex items-center gap-2">
                  Beta 0.26.0
                </h3>
                <span className="text-slate-500 font-semibold text-sm">September 2026</span>
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <p className="text-base font-semibold text-slate-800">100% Authentic Photo Coverage Across All 11 Upper Peninsula County Hubs</p>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>Dickinson County Hub Hero & Piers Gorge Coverage:</strong> Discovered, vetted, and ingested authentic Bureau of Land Management (BLM) high-resolution field photography by Bob Wick capturing the Class IV whitewater cascades and rugged cedar-bluff canyon of Piers Gorge on the Menominee River (<code className="bg-slate-100 px-1 rounded text-slate-700">Piers Gorge Falls</code>), eliminating the blank county card on the homepage hub grid.</li>
                <li><strong>Iron County Hub Hero & Ottawa National Forest Coverage:</strong> Ingested authentic U.S. Forest Service Eastern Region field photography of rushing bedrock rapids along the South Branch Paint River corridor in the Iron River Ranger District (<code className="bg-slate-100 px-1 rounded text-slate-700">Chicagon Falls</code> and <code className="bg-slate-100 px-1 rounded text-slate-700">Margeson Falls</code>), alongside high-resolution CC BY-SA 4.0 photography of Chicagon Creek.</li>
                <li><strong>100% UP County Hub Photo Completion:</strong> Every single one of Michigan's 11 Upper Peninsula waterfall counties (Alger, Baraga, Chippewa, Delta, Dickinson, Gogebic, Houghton, Iron, Keweenaw, Luce, Marquette) now features verified, high-resolution authentic hero photography across both the homepage Explore by County Hub grid and county landing views.</li>
                <li><strong>Dual-Layer Database & Enrichment Integrity:</strong> Both Supabase <code className="bg-slate-100 px-1 rounded text-slate-700">waterfall_photos</code> records and client-side <code className="bg-slate-100 px-1 rounded text-slate-700">enrichWaterfall</code> guards were updated with <code className="bg-slate-100 px-1 rounded text-slate-700">is_hero: true</code> and <code className="bg-slate-100 px-1 rounded text-slate-700">is_county_hero: true</code> flags, ensuring reliable rendering across all network and cache states.</li>
              </ul>
            </div>
          </div>

          {/* Version 0.25.0 */}
          <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif text-2xl font-bold text-slate-800 flex items-center gap-2">
                  Beta 0.25.0
                </h3>
                <span className="text-slate-500 font-semibold text-sm">September 2026</span>
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <p className="text-base font-semibold text-slate-800">High-Performance Direct CDN Image Delivery & Marquette County Hub Hero Synchronization</p>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>Direct Wikimedia CDN Image Pipeline:</strong> Upgraded <code className="bg-slate-100 px-1 rounded text-slate-700">getThumbnailUrl</code> to serve Wikimedia Commons imagery directly via Wikimedia's global CDN, eliminating third-party proxy (<code className="bg-slate-100 px-1 rounded text-slate-700">wsrv.nl</code>) HTTP 429 rate-limiting and 404 thumbnail failures.</li>
                <li><strong>Marquette County Hub Hero Alignment:</strong> Designated Lower Yellow Dog Falls with explicit <code className="bg-slate-100 px-1 rounded text-slate-700">is_hero: true</code> and <code className="bg-slate-100 px-1 rounded text-slate-700">is_county_hero: true</code> flags in the client-side data enrichment layer, guaranteeing its authentic wilderness photo renders on both the main Explore by County Hub card and inside the Marquette County detail view.</li>
                <li><strong>Resilient Media Filtering:</strong> Filtered out obsolete non-resolving image URLs for Dead River Falls, preventing broken assets from blocking valid county hero photo selection.</li>
                <li><strong>Directory Hero Synchronization:</strong> Updated Directory data queries and thumbnail bindings to prioritize verified hero photos across both Table and Visual Card views and the 100% inline photo showcase.</li>
              </ul>
            </div>
          </div>

          {/* Version 0.24.0 */}
          <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif text-2xl font-bold text-slate-800 flex items-center gap-2">
                  Beta 0.24.0
                </h3>
                <span className="text-slate-500 font-semibold text-sm">September 2026</span>
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <p className="text-base font-semibold text-slate-800">Phase 4 Authentic Waterfall Photography: Expanded Coverage Across Missing Wilderness Falls</p>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>Curated Verified High-Resolution Photography:</strong> Discovered, vetted, and added 12 authentic, high-resolution photographs (resolutions up to 7928×5152) across previously unphotographed waterfalls including Sturgeon Falls (Houghton), Upper Sturgeon Falls (Baraga), Trap Falls (Ontonagon), Upper & Lower Montreal Falls (Keweenaw), Chapel Beach Falls (Alger), West Branch Falls (Baraga), Lower Yellow Dog Falls (Marquette), and Sandstone Falls (Gogebic).</li>
                <li><strong>Public Agency & Verified Sources:</strong> Sourced strictly from verified U.S. Forest Service Eastern Region field photography, National Park Service Digital Image Archives, U.S. Fish & Wildlife Service, and verified outdoor photographers with full licensing attribution and descriptive wilderness captions.</li>
                <li><strong>Expanded Visual Directory:</strong> Increased total database photographic assets to 223 photos, expanding photo coverage to 82 Upper Peninsula waterfalls.</li>
              </ul>
            </div>
          </div>

          {/* Version 0.23.0 */}
          <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif text-2xl font-bold text-slate-800 flex items-center gap-2">
                  Beta 0.23.0
                </h3>
                <span className="text-slate-500 font-semibold text-sm">September 2026</span>
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <p className="text-base font-semibold text-slate-800">Database Security & RLS Policy Governance: Public Read Permissions & PostGIS Guidance</p>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>Public Read RLS Policy on <code className="bg-slate-100 px-1 rounded text-slate-700">waterfall_blogs</code>:</strong> Created SQL migration scripts granting public and authenticated read permissions for curated travel blogs and field journals, restoring public article displays after enabling Row Level Security.</li>
                <li><strong>PostGIS System Table Resolution (<code className="bg-slate-100 px-1 rounded text-slate-700">spatial_ref_sys</code>):</strong> Documented and confirmed the PostgreSQL 42501 ownership error on <code className="bg-slate-100 px-1 rounded text-slate-700">spatial_ref_sys</code> as an officially recognized Supabase Security Advisor false positive on internal extension metadata, requiring zero changes or manual intervention.</li>
              </ul>
            </div>
          </div>

          {/* Version 0.22.0 */}
          <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif text-2xl font-bold text-slate-800 flex items-center gap-2">
                  Beta 0.22.0
                </h3>
                <span className="text-slate-500 font-semibold text-sm">September 2026</span>
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <p className="text-base font-semibold text-slate-800">Automated Supabase Keep-Alive Architecture: Native Vercel Cron & GitHub Actions Backup Workflow</p>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>Native Vercel Cron Job:</strong> Configured a daily scheduled job in <code className="bg-slate-100 px-1 rounded text-slate-700">vercel.json</code> running at 08:00 UTC (<code className="bg-slate-100 px-1 rounded text-slate-700">0 8 * * *</code>) to ping the database via Vercel's edge infrastructure.</li>
                <li><strong>Dedicated Serverless Ping Endpoint (<code className="bg-slate-100 px-1 rounded text-slate-700">/api/keep-alive</code>):</strong> Implemented an automated Vercel serverless function that executes an active live query on the <code className="bg-slate-100 px-1 rounded text-slate-700">waterfalls</code> table with automatic REST fallback, resetting the Supabase 7-day inactivity pause timer.</li>
                <li><strong>GitHub Actions Redundant Safety Net:</strong> Added <code className="bg-slate-100 px-1 rounded text-slate-700">.github/workflows/keep-alive.yml</code> running every 3 days at 08:00 UTC (<code className="bg-slate-100 px-1 rounded text-slate-700">0 8 */3 * *</code>) with manual <code className="bg-slate-100 px-1 rounded text-slate-700">workflow_dispatch</code> trigger support.</li>
                <li><strong>Vercel API Rewrite Routing:</strong> Configured URL rewriting in <code className="bg-slate-100 px-1 rounded text-slate-700">vercel.json</code> ensuring <code className="bg-slate-100 px-1 rounded text-slate-700">/api/*</code> routes execute as serverless functions while preserving client-side SPA routing for all page URLs.</li>
              </ul>
            </div>
          </div>

          {/* Version 0.21.0 */}
          <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif text-2xl font-bold text-slate-800 flex items-center gap-2">
                  Beta 0.21.0
                </h3>
                <span className="text-slate-500 font-semibold text-sm">September 2026</span>
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <p className="text-base font-semibold text-slate-800">Baraga County Catalog Refinement: Consolidated Harley Falls Series</p>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>Consolidated Harley Falls:</strong> In Baraga County, retired redundant secondary entries <em>Harley Falls #2</em>, <em>Harley Falls #3</em>, and <em>Harley Falls #4</em>, standardizing <em>Harley Falls #1</em> as the singular, authoritative <strong>Harley Falls</strong>.</li>
                <li><strong>Preserved Verified Photography:</strong> Maintained all 9 authentic administrator on-site photographs and primary hero status for the canonical Harley Falls on Harley Creek.</li>
                <li><strong>Application-Wide Data Filtering:</strong> Updated the Directory, Homepage County Hubs, Trip Route Planner, and Admin Management dropdowns to automatically filter out deprecated duplicate IDs and render the canonical "Harley Falls" name.</li>
                <li><strong>Database Migration Script:</strong> Authored <code className="bg-slate-100 px-1 rounded text-slate-700">delete_harley_duplicates.sql</code> and updated the master <code className="bg-slate-100 px-1 rounded text-slate-700">update_all_hiking_info.sql</code> script for executing the permanent cleanup in Supabase.</li>
              </ul>
            </div>
          </div>

          {/* Version 0.20.0 */}
          <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif text-2xl font-bold text-slate-800 flex items-center gap-2">
                  Beta 0.20.0
                </h3>
                <span className="text-slate-500 font-semibold text-sm">September 2026</span>
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <p className="text-base font-semibold text-slate-800">Expanded Master Field Guides Portfolio: 10 New Multi-Chapter Expeditions (18 Total) Across All 5 Disciplines & 12 New Curated Editorial Dispatches (38 Total)</p>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>📚 10 New Comprehensive Master Field Guides (18 Total):</strong> Added 2 high-depth, multi-chapter field guides to every single category:
                  <ul className="list-circle list-inside ml-4 mt-1 space-y-1">
                    <li><em>Regional Expeditions:</em> <strong>The Black River Scenic Byway Gorge Odyssey</strong> (Copper Harbor Conglomerate geology, 500+ stair endurance, Great Conglomerate, Potawatomi, Gorge, Sandstone, Rainbow Falls, and harbor estuary).</li>
                    <li><em>Regional Expeditions:</em> <strong>Marquette Backcountry & The Dead River Gorges</strong> (Archean granite shield scrambles, Dead River multi-pitch canyon, Yellow Dog Wild & Scenic River, Morgan Falls, and Warner Falls).</li>
                    <li><em>Trail Craft & Safety:</em> <strong>Backcountry Navigation & Zero-Cell Survival</strong> (DeLorme atlas navigation, logging road/CFR etiquette, Jacobsville red clay/sand recovery, satellite SOS protocols, and black bear safety).</li>
                    <li><em>Trail Craft & Safety:</em> <strong>Blackflies, Mosquitoes & Timber Ticks Defense Blueprint</strong> (Scientific hatch calendars, Permethrin vs. Picaridin vs. DEET chemistry, fine mesh headnet tactics, and deer tick prevention in bracken ferns).</li>
                    <li><em>Seasonal Tactics:</em> <strong>Autumn Color Explosion: Peak Fall Foliage & Hardwood Cascades</strong> (3 regional foliage microclimates, recharged autumn flow surges, Bond Falls reflections, and wet leaf/frost hazards).</li>
                    <li><em>Seasonal Tactics:</em> <strong>Summer Low-Flow Secrets: Hidden Grottoes & Plunge Pools</strong> (Prehistoric bedrock potholes, safe plunge pool depth checks and hydraulic undertow avoidance, bedrock creek walking, and watershed protection).</li>
                    <li><em>Photography:</em> <strong>Drone Flight Tactics in Northwoods River Gorges</strong> (Airspace legality across NPS vs National Forests, canyon GPS loss / ATTI mode survival, rotor mist condensation, and ferrous iron compass anomalies).</li>
                    <li><em>Photography:</em> <strong>Night Sky & Auroras over Cascades</strong> (Lake Superior Bortle 1 dark skies, solar wind / Bz / Kp space weather forecasting, 500 Rule star exposure math, and Low-Level Landscape Lighting).</li>
                    <li><em>Culinary & Culture:</em> <strong>Smoked Whitefish, Thimbleberry Preserves & Foraged Wild Flavors</strong> (Lake Superior trap-net fisheries, sugar maple smokehouses, wild Keweenaw thimbleberry harvesting, and spring ramps/morels).</li>
                    <li><em>Culinary & Culture:</em> <strong>Lumberjack River Drives, Deserted Copper Stamp Mills & Sacred Spirits</strong> (Ojibwe sacred water traditions, 19th-century white pine river drives / peavey hooks, and Hungarian Falls copper stamp mill ruins).</li>
                  </ul>
                </li>
                <li><strong>📰 12 New Curated Waterfall Editorial Articles (38 Total):</strong> Added richly researched editorial story dispatches mapped directly to waterfalls including Great Conglomerate Falls, Gorge Falls, Rainbow Falls, Dead River Falls, Morgan Falls, Warner Falls, Agate Falls, Manabezho Falls, Manido Falls, Eagle River Falls, Manganese Gorge Falls, and Sandstone Falls.</li>
                <li><strong>⚡ Turnkey Trip Planner Route Integration:</strong> All 10 new guides feature one-click trip addition, instantly injecting all associated waterfalls into the user's active expedition itinerary.</li>
                <li><strong>📖 100% Inline Architecture & Zero Modals:</strong> All 18 field guides render natively inline in the <code className="bg-slate-100 px-1 rounded">&lt;main&gt;</code> document stream with chapter jump navigation, Ranger Advisories, and Gear Matrices.</li>
              </ul>
            </div>
          </div>

          {/* Version 0.19.0 */}
          <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif text-2xl font-bold text-slate-800 flex items-center gap-2">
                  Beta 0.19.0
                </h3>
                <span className="text-slate-500 font-semibold text-sm">September 2026</span>
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <p className="text-base font-semibold text-slate-800">Northwoods Field Guides & Travel Journal Overhaul: Long-Form Multi-Chapter Expeditions, Curated Waterfall Editorial Blogs & 100% Inline Reading Portal</p>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>📚 8 Deep Northwoods Master Field Guides:</strong> Authored extensive, multi-chapter field guides written by seasoned Upper Peninsula wilderness guides and naturalists across 5 core disciplines (Regional Expeditions, Trail Craft & Safety, Seasonal Tactics, Photography, Culinary & Culture). Topics include:
                  <ul className="list-circle list-inside ml-4 mt-1 space-y-1">
                    <li><em>The Definitive Guide to Pictured Rocks Waterfall Country</em> (Miners, Chapel, Mosquito, Spray, Munising)</li>
                    <li><em>The Porcupine Mountains & Presque Isle River Wilderness Expedition</em> (Manido, Nawadaha, Presque Isle, trap rock gorges)</li>
                    <li><em>Chasing Copper Country Cataracts: The Keweenaw Peninsula Trail</em> (Hungarian, Jacob's, Eagle River, manganese gorges)</li>
                    <li><em>Spring Snowmelt Torrent Tactics: How to Chase Peak Flow in May & June</em> (Snowpack water equivalent, discharge spikes, hydro graph tactics)</li>
                    <li><em>The Photographer's Masterclass: Capturing Lake Superior's Wild Waterfalls</em> (ND filter matrices, long exposure water silky effects, polarizer glare cutting)</li>
                    <li><em>The Northwoods Winter Wonderland: Frozen Ice Caves & Glacial Cataracts</em> (Eben ice caves, crampon safety, frozen blue ice columns)</li>
                    <li><em>The Upper Peninsula Pasty & Pitstop Trail: Fueling Your Waterfall Road Trip</em> (Rutabaga ratios, Finnish bakeries, legendary pitstops)</li>
                    <li><em>Bark & Cascades: The Dog-Friendly Waterfall Explorer's Handbook</em> (Canine heat safety, paw protection on volcanic trap rock, leash regulations)</li>
                  </ul>
                </li>
                <li><strong>🧭 Dedicated Field Guides & Travel Journal Portal (`/guides`):</strong> Built a complete guides exploration hub featuring category filter tabs, live full-text search across titles, summaries, tags, and chapter content, and a prominent Featured Hero Master Guide banner.</li>
                <li><strong>📖 100% Inline Multi-Chapter Interactive Reader:</strong> Adheres strictly to the Zero Modal Popup Boxes rule. Deep reading views render completely inline within the main document flow, featuring chapter navigation anchor links, Ranger Field Advisories, Recommended Gear matrices, and deep FAQ accordions.</li>
                <li><strong>⚡ Turnkey Trip Planner Route Injection:</strong> Field guides now feature a one-click <em>"🧭 Add All {'{N}'} Waterfalls to Trip"</em> button that instantly appends the guide's curated waterfalls into the user's active expedition itinerary.</li>
                <li><strong>📰 26 Curated Waterfall Editorial Articles:</strong> Mapped authentic, richly researched blog dispatches directly to UUIDs in the 291-waterfall catalog.</li>
                <li><strong>🌟 Waterfall Detail Integration:</strong> Overhauled the "In The Blogs & Field Guides" section on every waterfall page. Highlights when a waterfall is featured in a master expedition with a prominent golden badge linking to the full guide, accompanied by rich editorial story cards with cover photos, reading times, publication sources, and excerpts.</li>
                <li><strong>🏠 Homepage Dispatches Showcase:</strong> Added a featured Field Guides & Travel Dispatches section to the homepage providing immediate entry into the editorial catalog.</li>
                <li><strong>📱 iOS Safari Compliant Layout:</strong> Clean fluid layouts using 100% widths without 100vw or root scroll restrictions.</li>
              </ul>
            </div>
          </div>

          {/* Version 0.18.0 */}
          <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif text-2xl font-bold text-slate-800 flex items-center gap-2">
                  Beta 0.18.0
                </h3>
                <span className="text-slate-500 font-semibold text-sm">September 2026</span>
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <p className="text-base font-semibold text-slate-800">Expanded Field Expeditions Catalog: 4 New Curated Regional Road Trip Expeditions (9 Total)</p>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>The Tahquamenon Amber Giant & Eastern Wilderness:</strong> Added turnkey expedition featuring Upper Tahquamenon Falls (200-ft wide amber curtain, 50,000 gal/sec), Lower Tahquamenon island cascades, and Sable Falls dunes staircase, paired with Tahquamenon Falls Brewery and Brown Fisheries fresh catch.</li>
                <li><strong>Canyon Falls & Sturgeon River Grandeur:</strong> Added Baraga County expedition navigating "The Grand Canyon of Michigan" (Canyon Falls), the 300-ft deep Sturgeon River Gorge wilderness plunge (Sturgeon Falls), Power House Falls, and Keweenaw Bay waterfront cascades, with stops at The Hilltop's one-pound cinnamon rolls.</li>
                <li><strong>Ironwood Border Cataracts & Montreal River Rift:</strong> Added western border rift expedition spanning Gabbro Falls (60-ft volcanic gabbro cataract), Superior Falls (50-ft drop into a 100-ft gorge at the river mouth), Interstate Falls on the state line, and Cisco Branch cascades, featuring Rigoni's Bakery and 1920s soda fountains.</li>
                <li><strong>Munising Escarpment & Grand Island Gateway:</strong> Added central limestone shelf expedition highlighting Laughing Whitefish Falls (100-ft limestone stair cascade), Wagner Falls Scenic Site, Scott Falls walk-behind curtain, and Tannery Falls grotto, with pitstops at Johnny Dogs and the historic Trenary Toast Cafe.</li>
                <li><strong>Seamless Route Integration:</strong> All 9 expeditions support one-click instant loading or appending directly into the active route itinerary with real-time driving mileage calculation and nearest-neighbor route optimization.</li>
              </ul>
            </div>
          </div>

          {/* Version 0.17.0 */}
          <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif text-2xl font-bold text-slate-800 flex items-center gap-2">
                  Beta 0.17.0
                </h3>
                <span className="text-slate-500 font-semibold text-sm">September 2026</span>
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <p className="text-base font-semibold text-slate-800">Complete Expedition Route Planner Makeover: Intelligent Route Optimization, Driving Leg Engine, Turnkey Navigation & Offline Wilderness Suite</p>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>⚡ Intelligent Route Optimization:</strong> Integrated a nearest-neighbor heuristic solver that reorganizes stops into the most efficient driving sequence with a single click, eliminating highway backtracking and computing exact road miles saved.</li>
                <li><strong>🚗 Inter-Stop Driving Leg Engine:</strong> Implemented rural road distance and travel time calculations between consecutive route stops, using a curvature-adjusted Haversine formula (1.28x factor at 48 mph rural pace) designed specifically for Upper Peninsula trunklines and forest roads.</li>
                <li><strong>🧭 Turnkey Google Maps Navigation:</strong> Added direct multi-stop turn-by-turn route launching into Google Maps, along with single-leg direct navigation links between any two stops on the route.</li>
                <li><strong>📊 5-Stat Expedition Analytics Dashboard:</strong> Live dashboard computing Total Road Driving (miles & hours), Total Trail Footwork (miles across trailheads), Cumulative Cataract Drop (vertical feet plunge), Pet Accessibility Scorecard (friendly vs restricted), and a deduplicated Park Pass & Permit Checklist.</li>
                <li><strong>🗺️ 5 Hand-Curated Iconic Road Trip Expeditions:</strong> Instant one-click loading or appending of 5 turnkey regional expeditions (Pictured Rocks Circuit, Black River Scenic Byway, Keweenaw Copper Country Loop, Porcupine Mountains & Western Gorges, Marquette Backcountry Explorer), complete with iconic local pitstops (pasties, monk bakeries, craft breweries).</li>
                <li><strong>🎒 Wilderness Waterfall Packing Checklist:</strong> An interactive, offline-persisted 16-item gear checklist tailored specifically for UP waterfall expeditions (waterproof footwear, blackfly head nets, bear spray, offline maps, pasties, power banks) with a visual expedition readiness progress bar.</li>
                <li><strong>🖨️ Zero-Cell-Service Printable Field Sheet:</strong> A print-optimized document table with precise 5-decimal GPS coordinates, trailhead notes, trail distances, and backcountry safety protocols designed for vehicle glovebox storage in remote regions with zero cellular service.</li>
                <li><strong>↕️ Stop Reordering & Visual Avatars:</strong> Added stop reordering controls (▲ / ▼), remove buttons, and hero photo thumbnails for every stop in the route timeline.</li>
                <li><strong>100% Inline Architecture:</strong> Adheres strictly to the Zero Modal Popup Boxes rule—all drawers, checklists, and field sheets render inline in the document stream without modal overlays or scroll-traps.</li>
              </ul>
            </div>
          </div>

          {/* Version 0.16.0 */}
          <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif text-2xl font-bold text-slate-800 flex items-center gap-2">
                  Beta 0.16.0
                </h3>
                <span className="text-slate-500 font-semibold text-sm">September 2026</span>
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <p className="text-base font-semibold text-slate-800">Complete 291-Waterfall Hiking Catalog, Trailhead Spec Dossiers & Database Synchronization</p>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>Comprehensive 291-Waterfall Hiking Catalog:</strong> Built and curated complete hiking specifications for all 291 Upper Peninsula waterfalls, providing verified trail mileage, drop heights, physical hike difficulty ratings, route classifications, estimated hike times, parking lot access types, park pass requirements, dog/pet regulations, trail surfaces, and seasonal flow advice.</li>
                <li><strong>Trailhead Specification & Access Dossier:</strong> Overhauled the waterfall detail view with a rich 4-stat matrix (Roundtrip Distance, Est. Duration, Physical Grade, Waterfall Drop), an Access & Regulations guide (Parking, Entry Permits, Pet Policy, ADA / Trail Surface), and a dedicated Wilderness Advisory & Pro-Tips box with optimal viewing seasons and safety guidance.</li>
                <li><strong>Instant Client-Side Data Enrichment:</strong> Integrated an intelligent enrichment layer (`enrichWaterfall`) across the Directory, Waterfall Detail, Home County Hubs, and Trip Planner. Resolves previously null database columns, normalizes county names, and replaces generic robot descriptions with vivid geological and river overviews.</li>
                <li><strong>Trip Itinerary Trail Metrics:</strong> Enhanced the Trip Planner to compute total cumulative hiking mileage and trail times across all saved route stops, complete with color-coded difficulty badges and parking specs on each stop card.</li>
                <li><strong>SQL Migration Suite (`update_all_hiking_info.sql`):</strong> Authored an idempotent, 291-query transaction-safe database migration script ready for execution in the Supabase SQL Editor to permanently sync all hiking fields.</li>
              </ul>
            </div>
          </div>

          {/* Version 0.15.0 */}
          <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif text-2xl font-bold text-slate-800 flex items-center gap-2">
                  Beta 0.15.0
                </h3>
                <span className="text-slate-500 font-semibold text-sm">September 2026</span>
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <p className="text-base font-semibold text-slate-800">Interactive Directory Navigation Suite, A-Z Alphabet Quick-Jump, Dual View Modes & Smart Pagination</p>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>A-Z Alphabet Quick-Jump Strip:</strong> Added an interactive 26-letter navigation ribbon with real-time waterfall counts per letter, enabling single-click navigation directly to waterfalls starting with any letter.</li>
                <li><strong>Multi-Dimensional Filter Bar:</strong> Integrated instant real-time search (matching name, county, region, and notes), dynamic county dropdown with live entry tallies, hike difficulty filter, sort controls (Name A-Z/Z-A, County, Difficulty), and media filters (Verified Photos Only, Video Tour Only).</li>
                <li><strong>Dual View Modes (Table vs. Visual Card Grid):</strong> Toggle effortlessly between a compact, data-dense table with 44x44 photo thumbnail avatars and a visual card gallery featuring hero photo previews, county badges, difficulty chips, and direct hike metrics.</li>
                <li><strong>Smart Pagination & Page Size Controls:</strong> Replaced monolithic 291-row continuous scrolling with responsive pagination (configurable to 25, 50, 100, or All items per page) featuring numeric page buttons, windowed ellipsis, and automatic smooth-scroll to directory top on navigation.</li>
                <li><strong>Zero-Modal Inline Media & iOS Hardened:</strong> Preserved 100% inline photo gallery inspection and YouTube video showcase embedded in &lt;main&gt; without popup overlays or modal traps; enforced fixed table layouts and mobile-responsive widths.</li>
              </ul>
            </div>
          </div>

          {/* Version 0.14.0 */}
          <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif text-2xl font-bold text-slate-800 flex items-center gap-2">
                  Beta 0.14.0
                </h3>
                <span className="text-slate-500 font-semibold text-sm">September 2026</span>
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
