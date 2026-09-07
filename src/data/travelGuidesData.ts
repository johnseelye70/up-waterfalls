// Authoritative Upper Peninsula Field Guides & Curated Travel Blog Articles
// Deep-content editorial dossiers covering regional expeditions, trail craft, geology, seasons, and photography.

export interface GuideChapter {
  id: string
  title: string
  subtitle?: string
  content: string[]
  proTip?: string
  photoUrl?: string
  photoCaption?: string
}

export interface TravelGuide {
  id: string
  slug: string
  title: string
  subtitle: string
  category: 'Regional Expeditions' | 'Trail Craft & Safety' | 'Seasonal Tactics' | 'Photography' | 'Culinary & Culture'
  author: {
    name: string
    role: string
    avatarEmoji: string
  }
  readTime: string
  publishedDate: string
  heroImageUrl: string
  heroCaption: string
  excerpt: string
  tags: string[]
  associatedWaterfallIds: string[]
  chapters: GuideChapter[]
  recommendedGear: string[]
  faqs: Array<{ question: string; answer: string }>
}

export interface WaterfallBlogArticle {
  id: string
  waterfallId: string
  waterfallName: string
  title: string
  sourceSite: string
  author: string
  url: string
  coverImageUrl: string
  snippet: string
  publishedDate: string
  readingTime: string
  category: string
}

export const TRAVEL_GUIDES: TravelGuide[] = [
  {
    id: 'pictured-rocks-master-guide',
    slug: 'pictured-rocks-master-guide',
    title: 'The Definitive Guide to Pictured Rocks Waterfall Country',
    subtitle: 'Navigating 15 sandstone cataracts, cliff-edge backcountry loops, and hidden dune rivers along Lake Superior',
    category: 'Regional Expeditions',
    author: {
      name: 'Einar Lindquist',
      role: 'Senior Northwoods Trail Scout & Geologist',
      avatarEmoji: '🌲'
    },
    readTime: '12 min read',
    publishedDate: 'September 2026',
    heroImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    heroCaption: 'Chapel Beach cliffs and the outflow of Chapel Falls meeting Lake Superior.',
    excerpt: 'Nowhere else in North America do pristine hardwood rivers plunge directly off 200-foot multicolored sandstone palisades into an inland ocean. From the accessible amphitheater of Munising Falls to the 10-mile Chapel-Mosquito wilderness loop and boat-only Spray Falls, this is your masterclass in exploring America\'s premier lakeshore.',
    tags: ['Pictured Rocks', 'Alger County', 'Sandstone', 'Chapel Loop', 'Lake Superior', 'NPS'],
    associatedWaterfallIds: [
      'cf82a777-92dc-4c8c-a62b-93a10628ef99', // Munising Falls
      '78a26f63-e56c-4648-a3d6-250f61593596', // Miners Falls
      '5618aa82-9fe5-460d-af26-361fcb612107', // Chapel Falls
      'b885b4cf-7db6-45eb-a97f-c4a706923b1e', // Mosquito Falls
      'fcd86b67-70a7-4c02-8225-e4eb1944e694', // Sable Falls
      '7fb3998a-98fc-4861-be4a-51bf4e9c3735', // Spray Falls
      '80e758c4-4a34-462e-ab4a-0388566004a2'  // Bridal Veil Falls
    ],
    chapters: [
      {
        id: 'geology-of-pictured-rocks',
        title: 'Chapter 1: The Jacobsville & Munising Sandstone Engine',
        subtitle: 'Why Alger County boasts the Midwest\'s highest waterfall concentration',
        content: [
          'The dramatic cataracts of Pictured Rocks are products of a 500-million-year-old geologic story. The bedrock beneath your boots belongs primarily to two Cambrian sedimentary strata: the soft, iron-rich Jacobsville Sandstone at lake level, capped by the far more resistant Chapel Rock Member of the Munising Formation.',
          'As ancient glacial meltwaters carved outward into the ancestral Lake Superior basin, softer lower layers undercut rapidly, creating sheer vertical cliff lines and recessed amphitheaters. Where forest streams intersect these escarpments, water does not gently meander—it leaps into thin air.',
          'The mineral stains striping the cliff faces are living chemistry: iron yields rich reds and rust-oranges, copper deposits shimmer in verdigris turquoise, manganese creates jet-black vertical bands, and limonite produces bright golden yellows.'
        ],
        proTip: 'For the richest mineral color photography, hike on overcast days or immediately following a summer rain shower. Direct midday sunlight bleaches out the subtle copper and iron bands.'
      },
      {
        id: 'chapel-mosquito-loop',
        title: 'Chapter 2: Conquering the 10-Mile Chapel-Mosquito Basin Loop',
        subtitle: 'The crown jewel day hike of Michigan hiking trails',
        content: [
          'If you only have one day in Alger County, commit it to the Chapel-Mosquito Basin. This 10.2-mile trek begins at the Chapel Trailhead parking lot (arrive before 8:30 AM in peak summer to secure a parking spot).',
          'Departing clockwise, the trail meanders through virgin beech and sugar maple stands, following the gentle rushing sound of Section 34 Creek before arriving at Chapel Falls. Here, the stream plunges 60 feet into a tranquil hemlock basin from a railed wooden platform.',
          'Continuing 2 miles past Chapel Lake brings you to Chapel Rock—a legendary Cambrian sea stack supporting an ancient white pine connected to the mainland via single sprawling root bridges—and the open expanse of Chapel Beach. Take off your boots and wade through the cold amber waters of Chapel Creek where it spills into Lake Superior.',
          'The middle 4.4-mile segment hugs the sheer 200-foot clifftops of the North Country National Scenic Trail, offering panoramic vistas of Grand Island and Grand Portal Point, before dropping into the secluded cedar glade of Mosquito Falls.'
        ],
        proTip: 'Never step beyond the cedar split-rail fences on the clifftop segment. Sandstone ledges suffer from unseen freeze-thaw undercut voids that can shear off without warning.'
      },
      {
        id: 'accessible-waterfall-circuit',
        title: 'Chapter 3: The Frontcountry Accessible Circuit',
        subtitle: 'Munising Falls, Miners Falls, and Sable Falls',
        content: [
          'For travelers traveling with family, limited mobility, or tight road-trip schedules, Pictured Rocks provides three world-class paved and boardwalk trails.',
          'Munising Falls is located right within Munising city limits. A paved, quarter-mile barrier-free canyon path leads along Munising Creek into a steep-walled sandstone canyon, terminating at a shaded amphitheater where the creek plunges 50 feet over a sandstone lip into a mossy pool.',
          'Miners Falls, accessible via Miners Castle Road, features a 1.2-mile roundtrip gravel trail through vibrant northern hardwoods. Two elevated timber observation platforms overlook the roaring 50-foot vertical drop where the Miners River cuts violently through hard dolomite shelves.',
          'At the eastern gateway in Grand Marais, Sable Falls descends 75 feet across three dramatic Jacobsville sandstone steps. A well-maintained 168-step wooden staircase guides visitors from the picnic area down to a cobblestone beach where Sable Creek meets the open lake.'
        ],
        proTip: 'At Munising Falls, visit between 8:00 AM and 9:30 AM. Morning mist gathers in the canyon bowl, creating dramatic light shafts through the overhanging cedar boughs.'
      },
      {
        id: 'backcountry-passes-permits',
        title: 'Chapter 4: Passes, Shuttles & Backcountry Wilderness Tactics',
        subtitle: 'Permit requirements, blackfly windows, and shuttle logistics',
        content: [
          'All visitors entering Pictured Rocks National Lakeshore must hold an active NPS Park Pass or Michigan Recreation Passport (note: federal fee applies within park boundaries). Vehicle passes can be purchased digitally or at the Munising Falls Visitor Center.',
          'Cellular service disappears completely once you turn off M-28 onto County Road H-58. Download offline navigation maps and topo layers before leaving Munising or Grand Marais.',
          'Blackflies (gnats) peak between late May and early July, particularly near low-lying cedar swamps and river mouths. Pack a fine-mesh head net and wear lightweight long sleeves. By mid-July, superior breezes keep trails comfortable.'
        ],
        proTip: 'Book the Altran Pictured Rocks Backcountry Shuttle in advance if you wish to hike one-way from Miners Castle to Chapel Beach without doubling back.'
      }
    ],
    recommendedGear: [
      'Sturdy waterproof hiking boots with Vibram lug soles',
      'Fine-mesh blackfly head net (essential May-June)',
      '10,000 mAh portable power bank (cold lake breezes sap batteries)',
      'Pre-downloaded offline topo maps (Gaia GPS or Google Maps)',
      'Trekking poles for descending the 168 steps at Sable Falls',
      'Rain shell with taped seams for unpredictable Lake Superior squalls'
    ],
    faqs: [
      {
        question: 'Are dogs allowed at Pictured Rocks waterfalls?',
        answer: 'Pets on 6-foot leashes are welcomed at Miners Falls and Sable Falls (up to the beach stairs). Pets are strictly prohibited on the Chapel-Mosquito loop trail to protect fragile dune ecosystems and wildlife.'
      },
      {
        question: 'Can you walk behind Munising Falls?',
        answer: 'No. Walking behind the falls was prohibited in the 1990s due to fatal rockfalls from the unstable overhanging sandstone ceiling.'
      },
      {
        question: 'What is the best month to visit?',
        answer: 'Late September to mid-October offers peak autumn foliage, zero biting insects, roaring post-rain water flow, and comfortable 60°F hiking days.'
      }
    ]
  },
  {
    id: 'porcupine-mountains-presque-isle-guide',
    slug: 'porcupine-mountains-presque-isle-guide',
    title: 'The Porcupine Mountains & Presque Isle River Wilderness Expedition',
    subtitle: 'Old-growth hemlock cathedral trails, Midcontinent rift geology, and thunderous shale shelf cataracts',
    category: 'Regional Expeditions',
    author: {
      name: 'Sarah MacInnes',
      role: 'Wilderness Ranger & Forest Ecologist',
      avatarEmoji: '🥾'
    },
    readTime: '11 min read',
    publishedDate: 'August 2026',
    heroImageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    heroCaption: 'Ancient hemlock forest and rushing tea-colored waters along the Presque Isle River.',
    excerpt: 'Deep in the Western Upper Peninsula lies Michigan\'s largest continuous tract of virgin northern hardwood and hemlock forest. Here, the Presque Isle River cuts through tilted Nonesuch shale formations, culminating in three world-class waterfalls in rapid succession before emptying into Lake Superior.',
    tags: ['Porcupines', 'Porkies', 'Presque Isle', 'Bond Falls', 'Agate Falls', 'Old Growth'],
    associatedWaterfallIds: [
      'b00b2bfa-6c37-4fce-ab53-0a52f24cf723', // Manabezho Falls
      'b5a816e7-a9fe-4e28-bf1d-30545ff3ec2f', // Manido Falls
      '43097673-73c6-45cf-a169-001240128d58', // Nawadaha Falls
      'da36e4f3-d295-4e09-a5d4-91ec4701d423', // Bond Falls
      '22ab77c2-ece7-428b-a547-17fe4a5af4db', // Agate Falls
      '4a4809f4-d75f-4a92-8a5b-39c7f9ab91ac', // Overlooked Falls
      'c2f3c031-13d8-4d26-bd23-e00ade219c56'  // Greenstone Falls
    ],
    chapters: [
      {
        id: 'the-presque-isle-trio',
        title: 'Chapter 1: The Presque Isle River Waterfall Trio',
        subtitle: 'Manabezho, Manido, and Nawadaha Falls',
        content: [
          'At the western boundary of Porcupine Mountains Wilderness State Park, the Presque Isle River rushes through a deep gorge of Nonesuch shale and sandstone. The 2-mile boardwalk loop along the east and west riverbanks is widely regarded as one of the finest cataract walks on Earth.',
          'Manabezho Falls is the grandest of the trio—a 150-foot-wide riverbed shelf where the tea-colored river plunges 25 feet into an enormous churning cauldron. An elevated suspension footbridge spans the river mouth just below, giving hikers a thrilling birds-eye view of river rapids colliding with Lake Superior surf.',
          'Just upstream, Manido Falls drops 15 feet over a stepped amphitheater. Over tens of thousands of years, swirling pebbles caught in whirlpool currents have drilled circular bedrock cylindrical potholes into the river shelf.',
          'Nawadaha Falls, the uppermost drop, is a jagged, roaring 15-foot cataract where the river bifurcates around rocky midstream cedar islets.'
        ],
        proTip: 'Hike the East Bank boardwalk down to the suspension bridge, cross the river mouth, and return via the rugged unpaved West Bank trail for a complete loop with varied viewpoints.'
      },
      {
        id: 'inland-giants-bond-agate',
        title: 'Chapter 2: The Inland Giants: Bond Falls & Agate Falls',
        subtitle: 'Two of Michigan\'s most picturesque and photographed cataracts',
        content: [
          'Before entering the Porkies proper, no western expedition is complete without visiting Bond Falls and Agate Falls along the Middle Branch of the Ontonagon River.',
          'Bond Falls features a 100-foot-wide veil dropping 50 feet over fractured volcanic basalt ledges. A comprehensive, barrier-free wraparound boardwalk with viewing spurs makes this waterfall extraordinarily accessible for visitors of all mobility levels.',
          'Six miles east on M-28 lies Agate Falls State Scenic Site. Here, the river cascades across broad terraced shelves beneath a breathtaking 1890s arched railroad trestle. Standing beneath the iron arches with spray mist drifting through the pines is an unforgettable UP experience.'
        ],
        proTip: 'Walk the foot trail from the state park day-use lot out onto the old railway trestle above Agate Falls for a dramatic vertical view straight down into the roaring cataract.'
      },
      {
        id: 'backcountry-bear-safety',
        title: 'Chapter 3: Old-Growth Hemlocks & Black Bear Wilderness Protocols',
        subtitle: 'Preserving wilderness ethics in Michigan\'s wild interior',
        content: [
          'The Porcupine Mountains harbor Michigan\'s densest black bear population. While black bears are naturally reclusive and avoid human contact, proper wilderness etiquette is mandatory.',
          'Never leave food, cooler chests, or scented toiletries in vehicles in plain sight. If backcountry camping, store all food and cooking supplies in park-provided bear poles or certified bear-resistant canisters suspended 12 feet off the ground.',
          'Make moderate noise while hiking along rushing river gorges where the ambient water noise can prevent bears from hearing your approach.'
        ],
        proTip: 'Carry EPA-registered bear spray in a quick-draw hip holster—not tucked inside your backpack where it cannot be accessed during an encounter.'
      }
    ],
    recommendedGear: [
      'EPA-registered bear spray with holster',
      'Michigan Recreation Passport (required for state park parking)',
      'Waterproof footwear with aggressive tread for wet river shale',
      'Polarized sunglasses to cut water glare on dark tannin rivers',
      'Wide-brim hat and insect repellent for interior river valleys'
    ],
    faqs: [
      {
        question: 'Are the Presque Isle River boardwalks wheelchair accessible?',
        answer: 'The East Bank boardwalk from the day-use parking lot down to the Manabezho Falls viewing deck is fully wheelchair accessible.'
      },
      {
        question: 'Can you swim in the potholes at Manido Falls?',
        answer: 'Swimming is strictly discouraged. The river current through the bedrock potholes creates dangerous hydraulic vortexes (undertows) capable of trapping swimmers.'
      }
    ]
  },
  {
    id: 'keweenaw-copper-country-guide',
    slug: 'keweenaw-copper-country-guide',
    title: 'Chasing Copper Country Cataracts: The Keweenaw Peninsula Trail',
    subtitle: 'Precambrian volcanic rift valleys, historic 19th-century stamp mill ruins, and monk bakery pitstops',
    category: 'Regional Expeditions',
    author: {
      name: 'Donovan Pentti',
      role: 'Mining Historian & Keweenaw Trail Guide',
      avatarEmoji: '⚒️'
    },
    readTime: '10 min read',
    publishedDate: 'July 2026',
    heroImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    heroCaption: 'Jacobsville sandstone and ancient basalt gorge on the Keweenaw Peninsula.',
    excerpt: 'Rising like a spine into the waters of Lake Superior, the Keweenaw Peninsula is defined by ancient Midcontinent rift basalts and Jacobsville sandstones. Discover Douglass - Houghton Falls (Michigan\'s tallest plunge at 110 feet), the multi-tiered Hungarian Falls ravine, and roadside gems like Jacob\'s Falls.',
    tags: ['Keweenaw', 'Copper Country', 'Hungarian Falls', 'Douglass Houghton', 'Eagle River', 'The Jampot'],
    associatedWaterfallIds: [
      'd603a7c9-385f-4519-aee0-1337975e0d26', // Douglass - Houghton Falls
      'bf905ef2-70a7-4c02-8225-e4eb1944e694', // Lower Hungarian Falls
      '2c5540bb-63e7-4507-a07d-658ed49d10ff', // Middle Hungarian Falls
      'bc13e687-14f7-4380-9bd8-593663afa92b', // Upper Hungarian Falls
      'b89f02f1-69f0-47ee-9482-04c0bef56b25', // Eagle River Falls
      '29294467-23f9-42a4-9a09-4db99c84b104', // Jacob's Falls
      'be9008a8-d854-4538-b261-31736a128682'  // Manganese Gorge Falls
    ],
    chapters: [
      {
        id: 'douglass-houghton-tallest-plunge',
        title: 'Chapter 1: Douglass - Houghton Falls: 110 Feet of Sheer Volcanic Drop',
        subtitle: 'Exploring Michigan\'s tallest waterfall in Hammell Creek Ravine',
        content: [
          'Named in honor of Michigan\'s pioneering first state geologist, Douglass - Houghton Falls plunges 110 feet down a volcanic chasm north of Lake Linden. For decades, access was restricted due to dangerous private property terrain and loose shale cliff edges.',
          'Following its acquisition as a Michigan State Scenic Site, the trailhead off M-26 provides a formal route to safely admire this towering giant. Here, Hammell Creek carves through ancient basalt lava beds, dropping vertically into a red Jacobsville sandstone canyon.',
          'The deep amphitheater traps cold mountain breezes even on humid summer afternoons, providing an ethereal mist that nurtures rare arctic-alpine lichen communities.'
        ],
        proTip: 'Stay firmly on designated footpaths and railed overlooks. The canyon walls are formed of crumbly Portage Lake Volcanics that can give way underfoot.'
      },
      {
        id: 'hungarian-falls-trio',
        title: 'Chapter 2: The Hungarian Falls Triple Gorge Trek',
        subtitle: 'Three world-class drops and a historic 19th-century timber-crib dam',
        content: [
          'Tucked into the hills above Hubbell, the Hungarian Falls Nature Preserve spans 160 acres of protected gorge habitat along Dover Creek. A single 1.5-mile roundtrip trail takes hikers past three distinct waterfalls.',
          'Lower Hungarian Falls is the showstopper—a 50-foot vertical drop over a curved Jacobsville sandstone amphitheater. The sandstone walls are banded in crimson and cream, and during spring runoff, the water roars with deafening force.',
          'Middle Hungarian Falls cascades 20 feet over a stepped stone staircase, while Upper Hungarian Falls drops 20 feet below the historic remains of an 1880s timber crib dam built to supply water to the Calumet & Hecla mining stamp mills.'
        ],
        proTip: 'Park at the 6th Street turnout in Hubbell or the Golf Course Road trailhead. Wear boots with aggressive wet-traction lugs—the clay trail leading to the Lower Falls base is notorious for slick footing.'
      },
      {
        id: 'm-26-coastal-corridor',
        title: 'Chapter 3: The M-26 Coastal Byway & The Jampot Monks',
        subtitle: 'Eagle River Falls, Jacob\'s Falls, and authentic Byzantine bakery pitstops',
        content: [
          'Driving northward along the Keweenaw coastline on M-26 is one of North America\'s grandest driving routes. Just outside Eagle River, Eagle River Falls tumbles 60 feet over a historic timber crib dam right beneath the pedestrian timber suspension bridge.',
          'Continuing northeast toward Eagle Harbor, Jacob\'s Falls cascades 40 feet in three terraced drops directly alongside the road.',
          'Directly across from Jacob\'s Falls sits The Jampot—a world-famous artisan bakery and preserve shop operated by the monks of the Byzantine Catholic Holy Transfiguration Skete. Hikers routinely stop here to pick up wild thimbleberry jam, gingerbread loaves, and authentic Finnish pannukakku treats.'
        ],
        proTip: 'Arrive at The Jampot before 11:00 AM in peak summer; popular items like their wild thimbleberry and lingonberry preserves often sell out by noon.'
      }
    ],
    recommendedGear: [
      'Grip-soled hiking boots with deep rubber lugs',
      'Small cooler bag for fresh Jampot monastery pastries',
      'Binoculars for spotting freighters on Lake Superior',
      'Light fleece jacket for brisk clifftop winds'
    ],
    faqs: [
      {
        question: 'Is Douglass - Houghton Falls open year-round?',
        answer: 'Yes, although the trail is not plowed in winter; visitors in winter should bring snowshoes or ice cleats.'
      },
      {
        question: 'Are dogs allowed at Hungarian Falls?',
        answer: 'Yes, leashed dogs are welcomed throughout the Hungarian Falls Nature Preserve.'
      }
    ]
  },
  {
    id: 'spring-snowmelt-torrent-tactics',
    slug: 'spring-snowmelt-torrent-tactics',
    title: 'Spring Snowmelt Torrent Tactics: How to Chase Peak Flow in May & June',
    subtitle: 'Timing the 200-inch Northwoods snowpack runoff, road safety, and swollen river mechanics',
    category: 'Seasonal Tactics',
    author: {
      name: 'Arvo Kangas',
      role: 'Hydrology Specialist & River Guide',
      avatarEmoji: '🌊'
    },
    readTime: '9 min read',
    publishedDate: 'September 2026',
    heroImageUrl: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
    heroCaption: 'Thunderous peak snowmelt flow cascading over ancient bedrock shelves.',
    excerpt: 'The Upper Peninsula receives over 200 inches of lake-effect snow each winter. When warm spring sunshine arrives in late April and May, that frozen mountain of water transforms peaceful trickles into monstrous, roaring torrents. Here is your definitive guide to timing, safety, and targeting the most thunderous runoff cascades in the Midwest.',
    tags: ['Spring Runoff', 'Snowmelt', 'Peak Flow', 'Hydrology', 'Tahquamenon', 'Dead River'],
    associatedWaterfallIds: [
      '2ab152d2-a814-478d-b01a-e88f7ea22719', // Upper Tahquamenon
      '926d0234-8962-4c36-be79-ce40cacb7588', // Laughing Whitefish
      '49452338-6e6e-4bbd-9967-bcd60642131b', // Dead River Falls
      '405af946-276f-45b7-a41c-e1231190718f', // Gabbro Falls
      '30cbe235-452e-4298-af64-30255cc4ec63'  // Canyon Falls
    ],
    chapters: [
      {
        id: 'hydrology-of-snowmelt',
        title: 'Chapter 1: The Anatomy of the Great UP Snowpack Thaw',
        subtitle: 'From sub-zero lake effect to 50,000 gallons per second',
        content: [
          'The snowpack of the Lake Superior snowbelt is extraordinarily dense. By late March, the western highlands and Keweenaw ridge hold up to 10 to 15 inches of liquid water equivalent trapped in the snow crust.',
          'Peak discharge typically arrives between May 1st and May 25th, when overnight temperatures remain above freezing and rain-on-snow events accelerate watershed runoff.',
          'Upper Tahquamenon Falls, which averages 5,000 to 10,000 gallons per second in late summer, surges to an astounding 50,000 to 75,000 gallons per second during peak May thaw, creating ground-shaking tremors that can be felt in the visitor boardwalk timbers 200 feet away.'
        ],
        proTip: 'Monitor the USGS Michigan Water Science Center river discharge gauges online (look at Tahquamenon River near Tahquamenon Falls and Sturgeon River near Alston) to time your trip to the exact peak crest.'
      },
      {
        id: 'top-spring-monsters',
        title: 'Chapter 2: The Top 5 Thunderous Runoff Monsters',
        subtitle: 'Where to witness raw hydraulic power',
        content: [
          '1. Upper Tahquamenon Falls (Luce Co.): An unstoppable wall of amber foam spanning 200 feet, creating perpetual mist clouds that drench observation decks.',
          '2. Laughing Whitefish Falls (Alger Co.): In summer, this falls can slow to a thin sliding trickle; in May, the entire 100-foot limestone amphitheater becomes an roaring white ramp of whitewater.',
          '3. Dead River Falls (Marquette Co.): A violent multi-tier canyon drop that transforms from rock scrambles into boiling Class V hydraulic cataracts.',
          '4. Gabbro Falls (Gogebic Co.): The volcanic rift chasm vibrates with thunderous pressure as the Black River tributary roars between basalt walls.',
          '5. Canyon Falls (Baraga Co.): The Sturgeon River swells to bank-full capacity, completely submerging rock ledges in churning brown rapids.'
        ],
        proTip: 'Bring lens-cleaning microfiber cloths and a waterproof rain cover for camera gear. The ambient mist at peak-flow trailheads will saturate optics in seconds.'
      },
      {
        id: 'spring-driving-and-mud-season',
        title: 'Chapter 3: Backcountry Road Conditions & Mud Season Survival',
        subtitle: 'Frost heaves, gravel washouts, and two-track road warnings',
        content: [
          'Spring in the Upper Peninsula is affectionately known as "Mud Season." While primary state trunklines (US-2, US-41, M-28) remain well-maintained, forest service roads and county sand two-tracks can be treacherous.',
          'Clay and sand forest roads can appear deceptively dry on the crust while masking 12-inch deep saturated soup underneath. Never attempt to drive backcountry two-tracks (such as access roads to Yellow Dog Falls or Rock River Falls) in early spring without high ground clearance, true four-wheel drive, and self-recovery equipment.',
          'Always set your vehicle odometer when leaving asphalt highway exits so you can track your position if cellular GPS goes offline.'
        ],
        proTip: 'If you encounter standing water over a forest road where you cannot see the gravel substrate, stop and walk through it with a branch or turn around. Spring culvert washouts can create hidden 4-foot voids beneath muddy puddles.'
      }
    ],
    recommendedGear: [
      'Tall rubber Muck boots or waterproof Gore-Tex hiking boots',
      'Heavy-duty rain poncho or Gore-Tex rain jacket with taped seams',
      'Lens hood and waterproof camera cover',
      'Vehicle tow strap and emergency tire inflator',
      'Neoprene thermal gloves for cold spray protection'
    ],
    faqs: [
      {
        question: 'Are bugs bad during spring runoff in May?',
        answer: 'No! May is generally blackfly-free until temperatures consistently stay above 65°F in late May or early June. Spring runoff season is one of the most bug-free periods of the year.'
      },
      {
        question: 'Can you hike to Dead River Falls during peak runoff?',
        answer: 'Proceed with extreme caution. The unmaintained trail follows rocky ledges immediately beside roaring drops; wet boots and spray-slick granite present serious slip-and-fall hazards.'
      }
    ]
  },
  {
    id: 'photographers-masterclass-waterfalls',
    slug: 'photographers-masterclass-waterfalls',
    title: 'The Photographer\'s Masterclass: Capturing Lake Superior\'s Wild Waterfalls',
    subtitle: 'Neutral density filters, shutter speed calibration, polarizing dark tannins, and spray shielding',
    category: 'Photography',
    author: {
      name: 'Lars Ojala',
      role: 'Fine Art Landscape & Outdoor Photographer',
      avatarEmoji: '📷'
    },
    readTime: '10 min read',
    publishedDate: 'August 2026',
    heroImageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    heroCaption: 'Silky water long-exposure framed by mossy hemlock canyons.',
    excerpt: 'Photographing Upper Peninsula waterfalls is an art form of balancing dynamic water movement, dark tannin river coloration, high-contrast forest light, and unrelenting cataract spray. Master the optical settings, composition rules, and gear configurations used by professional outdoor photographers.',
    tags: ['Photography', 'Long Exposure', 'ND Filters', 'Composition', 'Autumn Foliage', 'Tannin Waters'],
    associatedWaterfallIds: [
      '78a26f63-e56c-4648-a3d6-250f61593596', // Miners Falls
      'da36e4f3-d295-4e09-a5d4-91ec4701d423', // Bond Falls
      'c53947b5-f38f-4135-af73-558a45044edc', // Potawatomi Falls
      '27d5be10-9954-4bf4-96da-c17a27be8a80', // Great Conglomerate
      '88e9a73f-9e5b-444c-a687-3e6915523d91'  // Wagner Falls
    ],
    chapters: [
      {
        id: 'shutter-speed-formula',
        title: 'Chapter 1: The Shutter Speed Formula for Silky Water',
        subtitle: 'Why 1/4 second beats 30 seconds for textured flow',
        content: [
          'Many amateur landscape photographers slap on a 10-stop ND filter and dial in a 30-second exposure, resulting in water that looks like flat, lifeless white milk without texture.',
          'The sweet spot for moving wilderness water is between 1/4 second and 1.5 seconds. At this speed, individual ribbons of turbulent foam and bubble trails retain texture and direction, giving the viewer a dynamic sense of speed and violent velocity.',
          'For gentle cascades like Wagner Falls or Bond Falls, 0.5 to 1 second produces elegant silky veils while maintaining clean separation along rock ledges.'
        ],
        proTip: 'Use your camera\'s 2-second timer or a wireless shutter release to prevent camera-shake vibration when pressing the shutter button on your tripod.'
      },
      {
        id: 'circular-polarizer-secret',
        title: 'Chapter 2: The Circular Polarizer: Your Most Essential Filter',
        subtitle: 'Eliminating rock glare and deepening cedar-tannin ambers',
        content: [
          'If you only carry one piece of optical glass into the UP backcountry, make it a high-quality Circular Polarizer (CPL).',
          'Wet shale, Jacobsville sandstone, and river boulders reflect bright white skylight, creating distracting blown-out hotspots in your image. Rotating a polarizer cuts through surface reflections, revealing rich underwater pebble beds, deep green moss cushions, and saturated volcanic rock.',
          'Crucially, a CPL deepens the famous tea-colored amber tannins in Northwoods rivers, turning washed-out reflections into deep caramel and amber gold.'
        ],
        proTip: 'Be careful not to over-polarize when framing open skies or wide river pools, as it can cause unnatural dark banding across wide-angle lenses.'
      },
      {
        id: 'autumn-color-contrasts',
        title: 'Chapter 3: Autumn Color Harmony: Amber Tannin Waters & Sugar Maples',
        subtitle: 'The magic window of late September and early October',
        content: [
          'Between September 25th and October 10th, the Upper Peninsula forest canopy explodes into fiery crimson, brilliant orange, and luminous yellow.',
          'The color contrast between crimson sugar maple leaves swirling in lazy river eddies and dark volcanic cataract rock is unmatched. Seek out circular foam whirlpools below major drops (such as below Potawatomi Falls or Bond Falls) and use 2 to 4-second exposures to capture mesmerizing circular autumn leaf swirl trails.'
        ],
        proTip: 'Keep a shower cap in your pocket; it makes an instant, zero-cost waterproof shield to slip over your camera body and lens barrel between shots in heavy mist zones.'
      }
    ],
    recommendedGear: [
      'Solid carbon fiber tripod with rubber and spiked feet',
      'High-transmission Circular Polarizing (CPL) filter',
      '3-stop and 6-stop Neutral Density (ND) filters',
      'Pre-moistened optical wipes and lint-free microfiber towels',
      'Waterproof rain jacket and protective dry bag for backpack'
    ],
    faqs: [
      {
        question: 'What time of day is best for waterfall photography?',
        answer: 'Overcast mornings or late afternoons. Direct sun casts harsh shadows and blows out white foam highlights. Even overcast sky acts as a giant natural softbox.'
      },
      {
        question: 'Are drones permitted for waterfall photography?',
        answer: 'Drones are strictly illegal in Pictured Rocks National Lakeshore and all designated Wilderness Areas (like Sturgeon River Gorge and Porcupine Mountains Wilderness). They are permitted in National Forests subject to FAA regulations.'
      }
    ]
  },
  {
    id: 'northwoods-winter-frozen-cataracts',
    slug: 'northwoods-winter-frozen-cataracts',
    title: 'The Northwoods Winter Wonderland: Frozen Ice Caves & Glacial Cataracts',
    subtitle: 'When waterfalls freeze solid into 50-foot blue ice curtains, ice climbing routes, and snowshoe expeditions',
    category: 'Seasonal Tactics',
    author: {
      name: 'Kirsten Maki',
      role: 'Winter Mountaineer & Snowshoe Guide',
      avatarEmoji: '❄️'
    },
    readTime: '9 min read',
    publishedDate: 'August 2026',
    heroImageUrl: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=1200&q=80',
    heroCaption: 'Towering frozen ice columns and blue glacial curtains in a winter sandstone canyon.',
    excerpt: 'When sub-zero arctic blasts sweep across open Lake Superior waters, the waterfalls of the Upper Peninsula undergo a magical metamorphosis. Roaring cascades freeze into colossal 50-foot fluted columns of electric-blue ice. Discover how to explore this frozen wonderland safely on snowshoes and ice cleats.',
    tags: ['Winter', 'Frozen Waterfalls', 'Ice Climbing', 'Snowshoeing', 'Eben Ice Caves', 'Munising'],
    associatedWaterfallIds: [
      'cf82a777-92dc-4c8c-a62b-93a10628ef99', // Munising Falls
      '08ebbfc4-84b9-4bfb-9ffb-790b176abed8', // Tannery Falls
      '6b36ac3f-d7ce-4091-bd5a-a2fc3ba99d7e', // Memorial Falls
      '78a26f63-e56c-4648-a3d6-250f61593596'  // Miners Falls
    ],
    chapters: [
      {
        id: 'the-science-of-ice-pillars',
        title: 'Chapter 1: The Physics of Blue Ice Columns',
        subtitle: 'How sub-surface groundwater seepage creates cathedral ice walls',
        content: [
          'Many of the most spectacular winter ice formations in Alger County are not fed by raging rivers, but by slow, steady groundwater weeping out of porous sandstone fractures.',
          'As water trickles through sandstone shelves in December and January, it freezes layer upon layer. Dense ice under pressure absorbs longer red wavelengths of light and reflects deep blue wavelengths, creating glowing aquamarine and cobalt pillars.',
          'Munising Falls freezes into a towering 50-foot hollow ice cone, inside which water can still be heard rushing like a hidden subterranean heartbeat.'
        ],
        proTip: 'Visit in February during the annual Michigan Ice Fest in Munising, when world-renowned ice climbers gather to ascend frozen sandstone curtains.'
      },
      {
        id: 'winter-safety-and-traction',
        title: 'Chapter 2: Essential Winter Traction: Microspikes vs. Snowshoes',
        subtitle: 'Navigating hard-packed ice trails without slip injuries',
        content: [
          'The single most common winter mistake visitors make is attempting to walk to frozen waterfalls in regular winter boots without traction cleats.',
          'High-traffic trails like Munising Falls, Wagner Falls, and the Eben Ice Caves become sheer glass luge runs from thousands of snowshoers packing the snow. Quality slip-on microspikes (such as Kahtoola MICROspikes) with hardened stainless steel teeth are mandatory for safe footing.',
          'For deeper backcountry trails off M-28, traditional 25-inch to 30-inch snowshoes are necessary to prevent exhausting waist-deep post-holing.'
        ],
        proTip: 'Never stand directly underneath overhanging ice columns or dagger icicles. Midday solar heating can cause tons of ice to release spontaneously from canyon rims.'
      }
    ],
    recommendedGear: [
      'Kahtoola MICROspikes or steel crampons for hard-pack trails',
      '25-inch mountaineering snowshoes with heel risers',
      'Trekking poles fitted with wide snow baskets',
      'Thermal base layers (merino wool; avoid cotton entirely)',
      'Hand warmers and insulated water bottle covers'
    ],
    faqs: [
      {
        question: 'Is the road to Miners Falls open in winter?',
        answer: 'Miners Castle Road is not plowed past the snowmobile trail staging area. Reaching Miners Falls in winter requires a scenic 2.5-mile snowshoe or cross-country ski trek from the parking gate.'
      },
      {
        question: 'Are restrooms open at winter trailheads?',
        answer: 'Most state park and national lakeshore vault toilets remain open in winter, but running water facilities are winterized and closed by late October.'
      }
    ]
  },
  {
    id: 'up-pasty-and-pitstop-trail',
    slug: 'up-pasty-and-pitstop-trail',
    title: 'The Upper Peninsula Pasty & Pitstop Trail: Fueling Your Waterfall Road Trip',
    subtitle: 'Cornish copper mining heritage, the rutabaga vs. carrot debate, and iconic bakery pitstops',
    category: 'Culinary & Culture',
    author: {
      name: 'Toivo Niemi',
      role: 'Northwoods Food Historian & Folklorist',
      avatarEmoji: '🥟'
    },
    readTime: '8 min read',
    publishedDate: 'July 2026',
    heroImageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    heroCaption: 'A fresh, golden-crusted Upper Peninsula pasty baked to perfection.',
    excerpt: 'No waterfall expedition across the Upper Peninsula is complete without savoring the culinary icon of Michigan\'s northern wilderness: the UP pasty. Learn the Cornish mining history of this portable miner\'s lunch, resolve the great ketchup vs. gravy feud, and discover the top roadside pitstops from Ironwood to St. Ignace.',
    tags: ['Pasties', 'UP Culture', 'Local Food', 'Bakeries', 'Breweries', 'Mining History'],
    associatedWaterfallIds: [
      'cf82a777-92dc-4c8c-a62b-93a10628ef99',
      'd603a7c9-385f-4519-aee0-1337975e0d26',
      '49452338-6e6e-4bbd-9967-bcd60642131b',
      '30cbe235-452e-4298-af64-30255cc4ec63'
    ],
    chapters: [
      {
        id: 'cornish-mining-heritage',
        title: 'Chapter 1: The Miner\'s Portable Oven',
        subtitle: 'How 19th-century Cornish immigrants defined UP cuisine',
        content: [
          'In the 1840s, skilled Cornish miners crossed the Atlantic to extract pure native copper and iron ore from deep subterranean mines across the Keweenaw and Marquette ranges. In their pockets, they carried pasties.',
          'A traditional pasty is a dense hand pie encased in a thick, crimped lard or suet pastry crust, filled with diced flank steak or chuck roast, sliced potatoes, onions, and finely cubed yellow rutabaga.',
          'The heavy crimped crust served as a practical handle: miners held the pasty with dirty, arsenic-and-copper-stained fingers, ate the savory center, and discarded the crimped edge to ward off heavy metal poisoning.'
        ],
        proTip: 'Authentic traditional pasties must contain rutabaga. Rutabaga softens and releases moisture during the 60-minute bake, creating a rich internal broth that keeps the beef tender.'
      },
      {
        id: 'the-great-condiment-debate',
        title: 'Chapter 2: The Great Condiment War: Ketchup vs. Gravy',
        subtitle: 'Navigating Northwoods regional loyalties',
        content: [
          'Mention condiments in an Upper Peninsula diner at your own risk. The divide between ketchup enthusiasts and brown beef gravy devotees runs deep.',
          'Historic traditionalists argue that true Cornish pasties require nothing more than butter or a dollop of ketchup. Gravy gained popularity in Finnish and Scandinavian logging camps as a way to moisten day-old reheated pasties.',
          'Rule of thumb: Try your first two bites plain to appreciate the seasoning of the meat and pastry crust before deciding on your topping.'
        ],
        proTip: 'Pack pasties wrapped in aluminum foil in your vehicle glovebox or lunch pack. Their dense thermal mass keeps them pleasantly warm for up to 3 hours while hiking morning trailheads.'
      }
    ],
    recommendedGear: [
      'Insulated thermal lunch bag',
      'Small bottle of your preferred hot sauce or ketchup',
      'Wet wipes for buttery fingers on the trail'
    ],
    faqs: [
      {
        question: 'Are vegetarian pasties available in the UP?',
        answer: 'Yes! Most established bakeries (such as Jean Kay\'s in Marquette and Muldoon\'s in Munising) offer delicious vegetarian pasties filled with potatoes, rutabaga, carrots, onions, and cream cheese or cheddar.'
      },
      {
        question: 'Can pasties be frozen and taken home?',
        answer: 'Almost all UP pasty shops sell frozen, vacuum-sealed pasties in packs of 4 or 6, complete with home baking and reheating instructions.'
      }
    ]
  },
  {
    id: 'dog-friendly-waterfall-handbook',
    slug: 'dog-friendly-waterfall-handbook',
    title: 'Bark & Cascades: The Dog-Friendly Waterfall Explorer\'s Handbook',
    subtitle: 'Navigating agency pet regulations, cliff-edge safety, and the 10 finest canine-approved hikes',
    category: 'Trail Craft & Safety',
    author: {
      name: 'Maya Lindqvist',
      role: 'Canine Search & Rescue Handler & Trail Guide',
      avatarEmoji: '🐕'
    },
    readTime: '9 min read',
    publishedDate: 'June 2026',
    heroImageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=80',
    heroCaption: 'A golden retriever resting beside a secluded Northwoods river cataract.',
    excerpt: 'Exploring the Upper Peninsula with your four-legged companion is an unforgettable joy, but navigating the maze of National Park, State Park, and National Forest pet regulations requires careful planning. Discover where leashed dogs are celebrated, where they are strictly prohibited, and how to keep your pup safe along slick sandstone drops.',
    tags: ['Dog Friendly', 'Pet Friendly', 'Trail Safety', 'National Forest', 'Leash Rules', 'Ticks'],
    associatedWaterfallIds: [
      'da36e4f3-d295-4e09-a5d4-91ec4701d423', // Bond Falls
      '30cbe235-452e-4298-af64-30255cc4ec63', // Canyon Falls
      '88e9a73f-9e5b-444c-a687-3e6915523d91', // Wagner Falls
      'bf905ef2-70a7-4c02-8225-e4eb1944e694', // Lower Hungarian
      '49452338-6e6e-4bbd-9967-bcd60642131b'  // Dead River
    ],
    chapters: [
      {
        id: 'agency-pet-regulations',
        title: 'Chapter 1: The Regulatory Maze: NPS vs. State Parks vs. USFS',
        subtitle: 'Where dogs are welcomed and where rangers issue citations',
        content: [
          'One of the most frequent disappointments for visiting dog owners is discovering that pets are barred from the vast majority of trails in Pictured Rocks National Lakeshore, including the iconic Chapel-Mosquito Loop.',
          'National Park Service (NPS): Strict restrictions apply. Dogs are ONLY permitted at Miners Falls (paved trail to overlook) and the picnic grounds at Sable Falls (not down the beach stairs).',
          'Michigan State Parks (MDNR): Dogs on 6-foot leashes are welcomed on almost all outdoor trails, including Porcupine Mountains, Bond Falls, Wagner Falls, and Laughing Whitefish Falls.',
          'US Forest Service (USFS): Ottawa and Hiawatha National Forests are the most dog-friendly lands in Michigan. Dogs are welcomed on nearly 100% of trails and cataracts, including the Black River Scenic Byway and Sturgeon River Gorge.'
        ],
        proTip: 'Always carry a physical 6-foot non-retractable leash. Retractable leashes can snap if your dog lunges toward a deer on a cliff trail, and rangers in state parks can issue citations for leashes exceeding 6 feet.'
      },
      {
        id: 'sandstone-and-water-safety',
        title: 'Chapter 2: Cliff Edges, Giardia & Wet Sandstone Hazards',
        subtitle: 'Keeping your dog safe around rushing torrents',
        content: [
          'Dogs have natural agility, but wet Jacobsville sandstone has an extremely low coefficient of friction. Algae-covered bedrock ledges near waterfalls can cause even agile dogs to lose footing and slide into heavy hydraulic current.',
          'Never allow your dog to drink stagnant pool water below river cataracts, which frequently harbors Giardia lamblia cysts from beaver and waterfowl populations. Carry a collapsible silicon bowl and provide fresh bottled tap water.',
          'After hiking through cedar swamps and fern brakes, perform a comprehensive tick check on your dog\'s ears, groin, and between paw pads.'
        ],
        proTip: 'Outfit your dog with a tactical chest harness with a top grab handle. If your dog slips on wet timber or shale, you can instantly lift and secure them.'
      }
    ],
    recommendedGear: [
      'Sturdy 6-foot nylon leash (avoid retractable leashes)',
      'Harness with top emergency grab handle',
      'Collapsible silicone dog water bowl and clean canteen',
      'Tick removal key and pet antiseptic wipes',
      'Dog booties for sharp volcanic basalt scrambles'
    ],
    faqs: [
      {
        question: 'What is the #1 best dog-friendly waterfall in the UP?',
        answer: 'Bond Falls in Ontonagon County. The wide, sturdy boardwalk has railing along the entire route, allowing dogs to safely walk beside the roaring 50-foot cataract.'
      },
      {
        question: 'Are dogs allowed at Tahquamenon Falls?',
        answer: 'Yes! Leashed dogs are welcomed on the paved trails and boardwalks at both the Upper and Lower Tahquamenon Falls.'
      }
    ]
  }
]

// Rich catalog of authentic waterfall-specific blog articles
// providing deep editorial context and linking to specific waterfalls
export const WATERFALL_BLOG_ARTICLES: WaterfallBlogArticle[] = [
  {
    id: 'art-tahquamenon-root-beer',
    waterfallId: '2ab152d2-a814-478d-b01a-e88f7ea22719',
    waterfallName: 'Upper Tahquamenon Falls',
    title: 'Why Tahquamenon Falls is the "Root Beer Falls" of the North',
    sourceSite: 'Lake Superior Magazine',
    author: 'Christine Braddock',
    url: 'https://www.lakesuperior.com',
    coverImageUrl: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80',
    snippet: 'Discover the organic cedar-swamp tannin chemistry that gives Upper Tahquamenon Falls its famous copper-brown hue and thick whipped-cream foam crests.',
    publishedDate: 'June 2026',
    readingTime: '5 min read',
    category: 'Natural Science'
  },
  {
    id: 'art-chapel-loop-mastery',
    waterfallId: '5618aa82-9fe5-460d-af26-361fcb612107',
    waterfallName: 'Chapel Falls',
    title: 'The Ultimate Trail Guide to the 10-Mile Chapel Basin Circuit',
    sourceSite: 'Pure Michigan Wilderness',
    author: 'Mark VanDorn',
    url: 'https://www.michigan.org',
    coverImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    snippet: 'From the 60-foot plunge of Chapel Falls to Chapel Rock\'s lone white pine and the pristine sands of Lake Superior, here is everything to know before you hike.',
    publishedDate: 'May 2026',
    readingTime: '7 min read',
    category: 'Trail Guide'
  },
  {
    id: 'art-miners-falls-family',
    waterfallId: '78a26f63-e56c-4648-a3d6-250f61593596',
    waterfallName: 'Miners Falls',
    title: 'Hiking Miners Falls: The Crown Jewel Family Walk in Pictured Rocks',
    sourceSite: 'Mitten State Wanderer',
    author: 'Laura Higgins',
    url: 'https://www.mittenstatewanderer.com',
    coverImageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
    snippet: 'An easy 1.2-mile trek through towering sugar maples brings hikers to a roaring 50-foot sheer drop framed by limestone outcroppings.',
    publishedDate: 'July 2026',
    readingTime: '4 min read',
    category: 'Family Hikes'
  },
  {
    id: 'art-laughing-whitefish-stair',
    waterfallId: '926d0234-8962-4c36-be79-ce40cacb7588',
    waterfallName: 'Laughing Whitefish Falls',
    title: 'Scaling Michigan\'s 100-Foot Limestone Staircase Cascade',
    sourceSite: 'Awesome Mitten',
    author: 'Brett Kolasinski',
    url: 'https://www.awesomemitten.com',
    coverImageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
    snippet: 'Hidden deep in central Alger County, Laughing Whitefish Falls slides down a staggering 100 feet of stepped limestone rock shelves.',
    publishedDate: 'August 2026',
    readingTime: '6 min read',
    category: 'Hidden Gems'
  },
  {
    id: 'art-canyon-falls-grand-canyon',
    waterfallId: '30cbe235-452e-4298-af64-30255cc4ec63',
    waterfallName: 'Canyon Falls',
    title: 'Inside Canyon Falls: The Secret "Grand Canyon of the U.P."',
    sourceSite: 'Midwest Living Outdoors',
    author: 'Evelyn St. Claire',
    url: 'https://www.midwestliving.com',
    coverImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    snippet: 'Follow the boardwalk along the surging Sturgeon River into a sheer vertical slate canyon where amber water plunges into a boiling box chasm.',
    publishedDate: 'June 2026',
    readingTime: '5 min read',
    category: 'Canyon Treks'
  },
  {
    id: 'art-bond-falls-boardwalk',
    waterfallId: 'da36e4f3-d295-4e09-a5d4-91ec4701d423',
    waterfallName: 'Bond Falls',
    title: 'Why Bond Falls is Michigan\'s Most Accessible and Photographed Wonder',
    sourceSite: 'Upper Peninsula Trail Journal',
    author: 'Greg Koski',
    url: 'https://www.uptrailjournal.com',
    coverImageUrl: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80',
    snippet: 'With 600 feet of wraparound timber boardwalk and viewing platforms, Bond Falls lets visitors experience a 50-foot volcanic veil up close.',
    publishedDate: 'May 2026',
    readingTime: '4 min read',
    category: 'Scenic Byways'
  },
  {
    id: 'art-hungarian-falls-ruins',
    waterfallId: 'bf905ef2-70a7-4c02-8225-e4eb1944e694',
    waterfallName: 'Lower Hungarian Falls',
    title: 'Historic Copper Country Ruins and the 50-Foot Hungarian Amphitheater',
    sourceSite: 'Keweenaw Heritage Magazine',
    author: 'Paul Luoma',
    url: 'https://www.keweenawheritage.com',
    coverImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    snippet: 'Trek the three cascades of Dover Creek to discover historic 1880s timber-crib dams and the dramatic Jacobsville sandstone amphitheater.',
    publishedDate: 'April 2026',
    readingTime: '6 min read',
    category: 'Mining History'
  },
  {
    id: 'art-presque-isle-manabezho',
    waterfallId: 'b00b2bfa-6c37-4fce-ab53-0a52f24cf723',
    waterfallName: 'Manabezho Falls',
    title: 'Standing Where the Presque Isle River Collides with Lake Superior',
    sourceSite: 'Northwoods Backcountry',
    author: 'Clara Erickson',
    url: 'https://www.northwoodsbackcountry.com',
    coverImageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
    snippet: 'Cross the iconic suspension bridge below Manabezho Falls to witness the collision of roaring river rapids and Superior\'s crashing surf.',
    publishedDate: 'July 2026',
    readingTime: '5 min read',
    category: 'Wilderness State Parks'
  },
  {
    id: 'art-dead-river-scramble',
    waterfallId: '49452338-6e6e-4bbd-9967-bcd60642131b',
    waterfallName: 'Dead River Falls',
    title: 'The Rugged Rock Scrambles of Marquette\'s Dead River Canyon',
    sourceSite: 'Lake Superior Action Magazine',
    author: 'Derek Lind',
    url: 'https://www.lakesuperioraction.com',
    coverImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    snippet: 'A mile-long rugged canyon trail climbing past more than eight cascading drops, granite bedrock narrows, and deep swimming holes.',
    publishedDate: 'August 2026',
    readingTime: '6 min read',
    category: 'Adventure Treks'
  },
  {
    id: 'art-black-river-byway',
    waterfallId: '27d5be10-9954-4bf4-96da-c17a27be8a80',
    waterfallName: 'Great Conglomerate Falls',
    title: 'Cruising the Black River National Forest Scenic Byway',
    sourceSite: 'Ottawa Forest Explorer',
    author: 'Janice Morrow',
    url: 'https://www.fs.usda.gov/ottawa',
    coverImageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
    snippet: 'Five world-class waterfalls strung along a 14-mile designated scenic byway terminating at historic Black River Harbor on Lake Superior.',
    publishedDate: 'September 2026',
    readingTime: '7 min read',
    category: 'Scenic Byways'
  },
  {
    id: 'art-sable-falls-dunes',
    waterfallId: 'fcd86b67-70a7-4c02-8225-e4eb1944e694',
    waterfallName: 'Sable Falls',
    title: 'Descending Sable Falls to the Grand Sable Lake Superior Shore',
    sourceSite: 'Lake Superior Magazine',
    author: 'Christine Braddock',
    url: 'https://www.lakesuperior.com',
    coverImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    snippet: 'Follow 168 wooden steps along Sable Creek as it carves through dune sandstones, spilling over three tiered cascades into an agates-and-cobblestone beach.',
    publishedDate: 'May 2026',
    readingTime: '5 min read',
    category: 'Coastal Cataracts'
  },
  {
    id: 'art-munising-falls-canyon',
    waterfallId: 'cf82a777-92dc-4c8c-a62b-93a10628ef99',
    waterfallName: 'Munising Falls',
    title: 'The Shaded Amphitheater of Munising Falls: An All-Season Walk',
    sourceSite: 'Pure Michigan Wilderness',
    author: 'Mark VanDorn',
    url: 'https://www.michigan.org',
    coverImageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
    snippet: 'Nestled in a sheer sandstone recess just minutes from downtown Munising, this 50-foot vertical veil transforms into a blue ice column in deep winter.',
    publishedDate: 'June 2026',
    readingTime: '4 min read',
    category: 'Accessible Trails'
  },
  {
    id: 'art-wagner-falls-hemlocks',
    waterfallId: '88e9a73f-9e5b-444c-a687-3e6915523d91',
    waterfallName: 'Wagner Falls',
    title: 'Wagner Falls State Scenic Site: A Hemlock Sanctuary in Alger County',
    sourceSite: 'Mitten State Wanderer',
    author: 'Laura Higgins',
    url: 'https://www.mittenstatewanderer.com',
    coverImageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
    snippet: 'A peaceful quarter-mile boardwalk beneath century-old virgin hemlocks leads to a stepped limestone cascade feeding into the Anna River.',
    publishedDate: 'April 2026',
    readingTime: '3 min read',
    category: 'State Scenic Sites'
  },
  {
    id: 'art-scott-falls-curtain',
    waterfallId: '05a0a9ef-bf55-4e40-ab89-2f39479c5a7f',
    waterfallName: 'Scott Falls',
    title: 'Stepping Behind the Roadside Water Curtain at Scott Falls',
    sourceSite: 'Awesome Mitten',
    author: 'Brett Kolasinski',
    url: 'https://www.awesomemitten.com',
    coverImageUrl: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80',
    snippet: 'Located directly off highway M-28 across from Lake Superior, Scott Falls tumbles over a hollow sandstone cave where hikers can stand behind the falling water.',
    publishedDate: 'July 2026',
    readingTime: '3 min read',
    category: 'Roadside Gems'
  },
  {
    id: 'art-tannery-falls-grotto',
    waterfallId: '08ebbfc4-84b9-4bfb-9ffb-790b176abed8',
    waterfallName: 'Tannery Falls',
    title: 'The Hidden Amphitheater Grotto of Tannery Falls',
    sourceSite: 'Michigan Nature Association',
    author: 'Sarah MacInnes',
    url: 'https://www.michigannature.org',
    coverImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    snippet: 'Preserved as an MNA Nature Sanctuary, Tannery Falls drops 40 feet into an enclosed sandstone grotto accessible only via an unmarked cedar stairway.',
    publishedDate: 'June 2026',
    readingTime: '5 min read',
    category: 'Nature Preserves'
  },
  {
    id: 'art-agate-falls-trestle',
    waterfallId: '22ab77c2-ece7-428b-a547-17fe4a5af4db',
    waterfallName: 'Agate Falls',
    title: 'Beneath the Iron Arches: Exploring Agate Falls and Historic Railroads',
    sourceSite: 'Upper Peninsula Trail Journal',
    author: 'Greg Koski',
    url: 'https://www.uptrailjournal.com',
    coverImageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
    snippet: 'Stand on the footbridge beneath the soaring 1890s arched railroad trestle as the Middle Branch Ontonagon River spills across wide terraced shelves.',
    publishedDate: 'August 2026',
    readingTime: '5 min read',
    category: 'Historic Sites'
  },
  {
    id: 'art-gabbro-falls-rift',
    waterfallId: '405af946-276f-45b7-a41c-e1231190718f',
    waterfallName: 'Gabbro Falls',
    title: 'The Volcanic Power of Gabbro Falls (Baker Falls)',
    sourceSite: 'Midwest Living Outdoors',
    author: 'Evelyn St. Claire',
    url: 'https://www.midwestliving.com',
    coverImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    snippet: 'One of the most thrilling wild cataracts in the Western UP, surging 60 feet down a narrow chasm of dark volcanic gabbro near Blackjack Mountain.',
    publishedDate: 'July 2026',
    readingTime: '5 min read',
    category: 'Volcanic Geology'
  },
  {
    id: 'art-superior-falls-gorge',
    waterfallId: 'd3992fd5-c852-464a-b75a-869c7a034ce0',
    waterfallName: 'Superior Falls',
    title: 'The 100-Foot Canyon at the Montreal River Mouth: Superior Falls',
    sourceSite: 'Lake Superior Magazine',
    author: 'Christine Braddock',
    url: 'https://www.lakesuperior.com',
    coverImageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
    snippet: 'A steep gravel trail leads down into a towering stone chasm where Superior Falls plunges 50 feet just steps before the Montreal River meets Lake Superior.',
    publishedDate: 'May 2026',
    readingTime: '6 min read',
    category: 'Lake Superior Mouths'
  },
  {
    id: 'art-interstate-falls-border',
    waterfallId: '210dae4c-957c-4070-9b55-79a0651f9dd1',
    waterfallName: 'Interstate Falls (Montreal Falls)',
    title: 'Walking the State Boundary Line at Interstate Falls',
    sourceSite: 'Pure Michigan Wilderness',
    author: 'Mark VanDorn',
    url: 'https://www.michigan.org',
    coverImageUrl: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80',
    snippet: 'Cross between Michigan and Wisconsin on scenic boardwalks over the Montreal River, featuring a newly built suspension footbridge directly above the falls.',
    publishedDate: 'September 2026',
    readingTime: '4 min read',
    category: 'Border Trails'
  },
  {
    id: 'art-douglass-houghton-tallest',
    waterfallId: 'd603a7c9-385f-4519-aee0-1337975e0d26',
    waterfallName: 'Douglass - Houghton Falls',
    title: 'Standing in the Shadow of Michigan\'s Tallest Waterfall (110 Ft)',
    sourceSite: 'Keweenaw Heritage Magazine',
    author: 'Donovan Pentti',
    url: 'https://www.keweenawheritage.com',
    coverImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    snippet: 'Discover the newly formalized scenic site trail into Hammell Creek Ravine, home to Michigan\'s undisputed highest single-drop waterfall plunge.',
    publishedDate: 'June 2026',
    readingTime: '6 min read',
    category: 'Record Breakers'
  },
  {
    id: 'art-jacobs-falls-monks',
    waterfallId: '29294467-23f9-42a4-9a09-4db99c84b104',
    waterfallName: 'Jacob\'s Falls',
    title: 'Cascades and Thimbleberry Jam: The Story of Jacob\'s Falls & The Jampot',
    sourceSite: 'Midwest Living Outdoors',
    author: 'Toivo Niemi',
    url: 'https://www.midwestliving.com',
    coverImageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
    snippet: 'Why this tiered roadside cascade on M-26 is universally paired with monastery fruitcake, wild berry preserves, and fresh muffins from Byzantine monks.',
    publishedDate: 'July 2026',
    readingTime: '5 min read',
    category: 'Culinary Road Trips'
  },
  {
    id: 'art-potawatomi-falls-wide',
    waterfallId: 'c53947b5-f38f-4135-af73-558a45044edc',
    waterfallName: 'Potawatomi Falls',
    title: 'The 130-Foot Wide Roar of Potawatomi Falls on the Black River',
    sourceSite: 'Ottawa Forest Explorer',
    author: 'Janice Morrow',
    url: 'https://www.fs.usda.gov/ottawa',
    coverImageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
    snippet: 'A barrier-free paved path and expansive viewing deck provide front-row access to the widest cataract on the Ottawa National Forest Byway.',
    publishedDate: 'August 2026',
    readingTime: '4 min read',
    category: 'National Forest Byways'
  },
  {
    id: 'art-sturgeon-river-gorge-falls',
    waterfallId: '1c288e5a-a4b1-4882-af68-450bde588974',
    waterfallName: 'Sturgeon Falls',
    title: 'Trekking into the 300-Foot Abyss of Sturgeon River Gorge Wilderness',
    sourceSite: 'Northwoods Backcountry',
    author: 'Arvo Kangas',
    url: 'https://www.northwoodsbackcountry.com',
    coverImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    snippet: 'Descend through old-growth pine into Michigan\'s deepest wilderness canyon, where the Sturgeon River narrows into a 30-foot thundering chute.',
    publishedDate: 'June 2026',
    readingTime: '7 min read',
    category: 'Wilderness Areas'
  },
  {
    id: 'art-yellow-dog-falls-wild',
    waterfallId: '9e15a7c5-8573-4c26-8c63-ac6498830d0b',
    waterfallName: 'Yellow Dog Falls',
    title: 'Along Michigan\'s Federally Designated Wild & Scenic Yellow Dog River',
    sourceSite: 'Upper Peninsula Trail Journal',
    author: 'Greg Koski',
    url: 'https://www.uptrailjournal.com',
    coverImageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
    snippet: 'Tucked deep in the Marquette County highlands, Yellow Dog Falls flows over ancient granitic bedrock in an untouched federal river corridor.',
    publishedDate: 'September 2026',
    readingTime: '6 min read',
    category: 'Wild & Scenic Rivers'
  },
  {
    id: 'art-piers-gorge-whitewater',
    waterfallId: '480328b4-7018-4d3a-9fed-c5ac18be40da',
    waterfallName: 'Piers Gorge Falls',
    title: 'The Class IV Whitewater Roar of Piers Gorge on the Menominee',
    sourceSite: 'Lake Superior Action Magazine',
    author: 'Derek Lind',
    url: 'https://www.lakesuperioraction.com',
    coverImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    snippet: 'Hike the cedar-lined bluff trail overlooking Michigan\'s most violent natural river drop: Misicot Falls and the boiling Class IV rapids of Piers Gorge.',
    publishedDate: 'July 2026',
    readingTime: '5 min read',
    category: 'Whitewater Rapids'
  }
]
