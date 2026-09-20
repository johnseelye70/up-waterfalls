export interface GeologicalStrata {
  id: string
  name: string
  ageYearsAgo: string
  geologicEra: string
  rockType: string
  colorDescription: string
  mechanicalBehavior: string
  formationEngine: string
  keyMineralComposition: string[]
  exemplarWaterfalls: Array<{ name: string; county: string; description: string }>
  // Aliases for convenience
  strataUnit?: string
  ageEon?: string
  engine?: string
  fieldRecognitionClues?: string
  description?: string
  mineralogy?: string
  fieldClues?: string
  geologicalAge?: string
  distributionUP?: string
  colorSwatchClass?: string
}

export type StrataUnit = GeologicalStrata
export type MechanicalEngine = WaterfallMechanicalType

export interface WaterfallMechanicalType {
  id: string
  name: string
  subtitle: string
  diagramDescription: string
  formationStory: string
  hydrodynamics: string
  examples: string[]
}

export const MIDCONTINENT_RIFT_STRATA: GeologicalStrata[] = [
  {
    id: 'portage-lake-volcanics',
    name: 'Portage Lake Volcanics (Columnar Basalt & Amygdaloid)',
    ageYearsAgo: '1.09 to 1.10 Billion Years',
    geologicEra: 'Mesoproterozoic (Midcontinent Rift System)',
    rockType: 'Extrusive Igneous (Basaltic flood lavas & interflow conglomerates)',
    colorDescription: 'Dark charcoal-grey to purplish-black with copper-green amygdules and white quartz/calcite nodules.',
    mechanicalBehavior: 'Extremely dense, fracture-resistant caprock. Resists mechanical weathering, forcing rivers into sheer drops and narrow rifts.',
    formationEngine: 'Volcanic flood basalts erupted as North America attempted to pull apart into two tectonic plates. Hundreds of individual lava flows cooled rapidly into columnar basalt joints.',
    keyMineralComposition: ['Native Copper', 'Plagioclase Feldspar', 'Pyroxene', 'Epidote', 'Chlorite', 'Datolite'],
    exemplarWaterfalls: [
      { name: 'Hungarian Falls (Upper/Middle/Lower)', county: 'Houghton', description: 'Plunges through successive tiers of dark basalt lava flows capped by native copper conglomerate seams.' },
      { name: 'Eagle River Falls', county: 'Keweenaw', description: 'Flows over the tilted basalt spine of the Keweenawan fault line before spilling into Lake Superior.' },
      { name: 'Gabbro Falls', county: 'Gogebic', description: 'Black River tributary slicing through massive, jagged volcanic gabbro bedrock rifts.' }
    ]
  },
  {
    id: 'jacobsville-sandstone',
    name: 'Jacobsville Sandstone (Redbed Basin Deposits)',
    ageYearsAgo: '900 Million to 1.0 Billion Years',
    geologicEra: 'Neoproterozoic / Early Cambrian',
    rockType: 'Fluvial Sedimentary Sandstone & Siltstone',
    colorDescription: 'Vivid brick-red, rust-orange, and cream-white mottled swirls caused by oxidized hematite iron and bleached groundwater reduction halos.',
    mechanicalBehavior: 'Moderately soft, easily eroded by river turbulence. Waterfalls undercut the lower Jacobsville strata, forming deep amphitheaters, overhung caves, and mist grottoes.',
    formationEngine: 'Deposited by ancient braided rivers carrying iron-rich sediment into the sinking continental rift basin following the cessation of volcanic eruptions.',
    keyMineralComposition: ['Quartz Grains', 'Feldspar', 'Hematite (Iron Oxide)', 'Kaolinite Clay', 'Limonite'],
    exemplarWaterfalls: [
      { name: 'Munising Falls', county: 'Alger', description: '50-foot vertical drop over a sandstone amphitheater where hikers can observe horizontal cross-bedding layers.' },
      { name: 'Tannery Falls', county: 'Alger', description: 'Recessed sandstone cave amphitheater formed by centuries of undercutting beneath a hard cap.' },
      { name: 'Scott Falls', county: 'Alger', description: 'Curtain cascade falling clear of a hollow sandstone grotto directly along Highway M-28.' }
    ]
  },
  {
    id: 'munising-formation',
    name: 'Munising Formation (Chapel Rock & Miners Castle Sandstone)',
    ageYearsAgo: '500 Million Years',
    geologicEra: 'Late Cambrian',
    rockType: 'Marine Coastal Sandstone',
    colorDescription: 'Buff-white to golden amber, with vivid vertical mineral drip striping in orange (iron), turquoise (copper), and black (manganese).',
    mechanicalBehavior: 'Harder, silica-cemented sandstone cap. Forms sheer vertical palisades up to 200 feet high along Lake Superior that drop directly into deep water.',
    formationEngine: 'Deposited in ancient shallow coastal seas and barrier beaches as Cambrian oceans transgressed onto the eroded Canadian Shield.',
    keyMineralComposition: ['Silica-Cemented Quartz', 'Glauconite', 'Pyrite', 'Manganese Oxide', 'Copper Carbonates'],
    exemplarWaterfalls: [
      { name: 'Spray Falls', county: 'Alger', description: 'Dramatically leaps 70 feet directly off the sheer Munising Formation sea cliff into Lake Superior.' },
      { name: 'Miners Falls', county: 'Alger', description: 'Alger County\'s most powerful cataract, plunging 50 feet over a hard sandstone escarpment.' },
      { name: 'Chapel Falls', county: 'Alger', description: '60-foot cascade dropping into a lush hemlock basin beneath high sandstone gorge walls.' }
    ]
  },
  {
    id: 'copper-harbor-conglomerate',
    name: 'Copper Harbor Conglomerate (Keweenawan Puddingstone)',
    ageYearsAgo: '1.08 Billion Years',
    geologicEra: 'Mesoproterozoic (Midcontinent Rift Sedimentation)',
    rockType: 'Coarse Alluvial Fan Conglomerate',
    colorDescription: 'Deep chocolate-red matrix cementing rounded gravel, smooth rhyolite pebbles, and volcanic cobblestones.',
    mechanicalBehavior: 'Erodes irregularly as individual cobblestones loosen, creating rough, stepped rapids and churning vortex plunge pools.',
    formationEngine: 'Massive flash-flood alluvial fans washing down from ancient volcanic mountains surrounding the actively subsiding Lake Superior rift basin.',
    keyMineralComposition: ['Rhyolite Cobbles', 'Basalt Boulders', 'Red Sandstone Matrix', 'Calcite Veins'],
    exemplarWaterfalls: [
      { name: 'Great Conglomerate Falls', county: 'Gogebic', description: 'The Black River splits around a towering 30-foot island of ancient puddingstone conglomerate.' },
      { name: 'Sandstone & Gorge Falls', county: 'Gogebic', description: 'Channeled through conglomerate fissures and stepped pebble shelves in the Ottawa National Forest.' }
    ]
  },
  {
    id: 'michigamme-slate',
    name: 'Michigamme Slate & Baraga Basin Formations',
    ageYearsAgo: '1.85 Billion Years',
    geologicEra: 'Paleoproterozoic (Penokean Orogeny)',
    rockType: 'Metamorphic Foliated Slate & Graywacke',
    colorDescription: 'Dark blue-black, charcoal slate with metallic pyrite sheen and tilted vertical cleavage planes.',
    mechanicalBehavior: 'Shatters along parallel cleavage planes, creating jagged, razor-sharp canyon rifts, box canyons, and turbulent s-curve chutes.',
    formationEngine: 'Ancient ocean-floor muds compressed and metamorphosed during the collision of an ancient volcanic island arc with the North American proto-continent.',
    keyMineralComposition: ['Quartz', 'Sericite Mica', 'Chlorite', 'Pyrite Cubes', 'Graphite'],
    exemplarWaterfalls: [
      { name: 'Canyon Falls (The Grand Canyon of the U.P.)', county: 'Baraga', description: 'The Sturgeon River plunges 30 feet into a vertical box canyon carved through dipping Michigamme slate.' },
      { name: 'Slate River Falls', county: 'Baraga', description: 'Terraced staircase dropping over angled black slate ledges in the rugged Huron Mountain foothills.' }
    ]
  }
]

export const WATERFALL_MECHANICAL_TYPES: WaterfallMechanicalType[] = [
  {
    id: 'caprock-undercut',
    name: 'Caprock Undercutting Plunge',
    subtitle: 'Hard Resistant Bedrock over Softer Sandstone or Shale',
    diagramDescription: 'A durable top layer (Munising Sandstone or Basalt) shelters a softer underlayer (Jacobsville or shale). Water swirling in the pool below carves out a recessed cave, causing the waterfall to leap freely into air.',
    formationStory: 'Over thousands of years of post-glacial meltwater flow, spray mist and freeze-thaw cycles fracture the soft lower layers. As the support weakens, the hard caprock collapses in clean vertical fractures, maintaining a sheer plunge face.',
    hydrodynamics: 'High hydraulic jump with massive kinetic splash dissipation; creates mist bowls with microclimates 10–15°F cooler than surrounding forests.',
    examples: ['Miners Falls', 'Munising Falls', 'Bond Falls', 'Tannery Falls']
  },
  {
    id: 'fault-rift',
    name: 'Fault Line Rift Cascade',
    subtitle: 'Crustal Fractures & Continental Displacement Zones',
    diagramDescription: 'Tectonic faults (such as the 120-mile Keweenaw Fault) have displaced ancient bedrock strata upwards by thousands of feet. Rivers crossing this fracture plunge down narrow fault chasms.',
    formationStory: 'When the Midcontinent Rift failed, massive compressional forces shoved deep volcanic lavas up over younger sandstones along the Keweenaw Fault. Rivers traversing the fault line hit abrupt vertical elevation drops.',
    hydrodynamics: 'High-velocity constricted canyon flow with violent turbulence and vortex swirl potholes carved into solid rock.',
    examples: ['Gabbro Falls', 'Manganese Falls', 'Hungarian Falls', 'Eagle River Falls']
  },
  {
    id: 'stepped-staircase',
    name: 'Basalt Step Staircase',
    subtitle: 'Successive Horizontal Bedrock Ledges',
    diagramDescription: 'Multiple cooling layers of lava flows or stratified sedimentary rock form a natural staircase. Water cascades over broad horizontal shelves rather than falling vertically in a single plunge.',
    formationStory: 'Individual volcanic flow events or sedimentary bedding planes possess differing mineral densities. Softer flow tops erode back first, creating broad stepped platforms.',
    hydrodynamics: 'Widespread sheet flow with aerated curtain lather, ideal for long-exposure photography and shallow wading.',
    examples: ['Laughing Whitefish Falls', 'Rapid River Falls', 'Manido Falls', 'Bond Falls Boardwalk Cascades']
  },
  {
    id: 'coastal-sea-cliff',
    name: 'Coastal Sea Cliff Cataract',
    subtitle: 'Rivers Dropping Directly into the Inland Sea',
    diagramDescription: 'Glacial carving and ancient wave action sheared away coastal sandstone cliffs along Lake Superior. Forest streams leap directly off 70–150 foot palisades into open deep water.',
    formationStory: 'Ancestral Lake Duluth and post-glacial Lake Superior wave erosion undercut vertical cliff palisades. Rivers have not had time to cut canyons down to lake level, leaving "hanging valleys".',
    hydrodynamics: 'Free-fall trajectory influenced by offshore winds; spray frequently blows back up over the clifftops during northern gales.',
    examples: ['Spray Falls', 'Bridalveil Falls', 'Chapel Beach Falls']
  }
]

export function getGeologyForWaterfall(waterfallName: string, county: string = ''): GeologicalStrata {
  const cleanName = waterfallName.toLowerCase().replace(/-/g, ' ').trim()
  const cleanCounty = county.toLowerCase().trim()

  let strata: GeologicalStrata = MIDCONTINENT_RIFT_STRATA[0]

  // Match strata by specific waterfalls
  if (cleanName.includes('spray') || cleanName.includes('miners') || cleanName.includes('chapel') || cleanName.includes('sable')) {
    strata = MIDCONTINENT_RIFT_STRATA[2] // Munising Formation
  } else if (cleanName.includes('munising') || cleanName.includes('tannery') || cleanName.includes('scott') || cleanName.includes('alger')) {
    strata = MIDCONTINENT_RIFT_STRATA[1] // Jacobsville Sandstone
  } else if (cleanName.includes('conglomerate') || cleanName.includes('gorge') || cleanName.includes('sandstone') || cleanName.includes('potawatomi')) {
    strata = MIDCONTINENT_RIFT_STRATA[3] // Copper Harbor Conglomerate
  } else if (cleanName.includes('canyon') || cleanName.includes('slate') || cleanName.includes('power house')) {
    strata = MIDCONTINENT_RIFT_STRATA[4] // Michigamme Slate
  } else if (cleanCounty === 'keweenaw' || cleanCounty === 'houghton' || cleanName.includes('hungarian') || cleanName.includes('gabbro')) {
    strata = MIDCONTINENT_RIFT_STRATA[0] // Portage Lake Volcanics
  } else if (cleanCounty === 'alger') {
    strata = MIDCONTINENT_RIFT_STRATA[2]
  } else if (cleanCounty === 'baraga') {
    strata = MIDCONTINENT_RIFT_STRATA[4]
  }

  return {
    ...strata,
    strataUnit: strata.name,
    ageEon: strata.ageYearsAgo,
    engine: strata.id === 'munising-formation' ? 'Caprock Undercut' : strata.id === 'michigamme-slate' ? 'Fault Rift Box Canyon' : 'Volcanic Terraced Ledge',
    fieldRecognitionClues: strata.mechanicalBehavior,
    description: strata.formationEngine,
    mineralogy: strata.keyMineralComposition.join(', '),
    fieldClues: strata.mechanicalBehavior,
    geologicalAge: strata.ageYearsAgo,
    distributionUP: strata.colorDescription
  }
}

export const GEOLOGY_STRATA_UNITS = MIDCONTINENT_RIFT_STRATA.map(s => ({
  ...s,
  strataUnit: s.name,
  ageEon: s.ageYearsAgo,
  engine: 'Midcontinent Rift System',
  fieldRecognitionClues: s.mechanicalBehavior,
  description: s.formationEngine,
  mineralogy: s.keyMineralComposition.join(', '),
  fieldClues: s.mechanicalBehavior,
  geologicalAge: s.ageYearsAgo,
  distributionUP: s.colorDescription,
  colorSwatchClass: s.id === 'portage-lake-volcanics' ? 'bg-stone-700' : s.id === 'jacobsville-sandstone' ? 'bg-red-600' : s.id === 'munising-formation' ? 'bg-amber-500' : s.id === 'copper-harbor-conglomerate' ? 'bg-amber-800' : 'bg-slate-800'
}))

export const MECHANICAL_ENGINES = WATERFALL_MECHANICAL_TYPES.map(m => ({
  ...m,
  description: m.diagramDescription,
  exampleFalls: m.examples.join(', ')
}))

export interface WaterfallGeologyMappingItem {
  waterfallName: string
  strataId: string
  strataUnit: string
  engine: string
  ageEon: string
  fieldRecognitionClues: string
}

export const WATERFALL_GEOLOGY_MAPPINGS: Record<string, WaterfallGeologyMappingItem> = {
  'hungarian-falls': {
    waterfallName: 'Hungarian Falls',
    strataId: 'portage-lake-volcanics',
    strataUnit: 'Portage Lake Volcanics',
    engine: 'Basalt Step Staircase',
    ageEon: '1.09 Billion Years',
    fieldRecognitionClues: 'Successive tiered drops over columnar basalt flow sheets and amygdaloidal copper seams.'
  },
  'eagle-river-falls': {
    waterfallName: 'Eagle River Falls',
    strataId: 'portage-lake-volcanics',
    strataUnit: 'Portage Lake Volcanics',
    engine: 'Fault Line Rift Cascade',
    ageEon: '1.09 Billion Years',
    fieldRecognitionClues: 'Tilted volcanic basalt escarpment crossing the Keweenawan fault line.'
  },
  'miners-falls': {
    waterfallName: 'Miners Falls',
    strataId: 'munising-formation',
    strataUnit: 'Munising Formation',
    engine: 'Caprock Undercutting Plunge',
    ageEon: '500 Million Years',
    fieldRecognitionClues: '50-foot vertical drop over hard silica-cemented sandstone caprock.'
  },
  'spray-falls': {
    waterfallName: 'Spray Falls',
    strataId: 'munising-formation',
    strataUnit: 'Munising Formation',
    engine: 'Coastal Sea Cliff Cataract',
    ageEon: '500 Million Years',
    fieldRecognitionClues: 'Leaps 70 feet directly into Lake Superior from sheer sandstone sea cliff.'
  },
  'munising-falls': {
    waterfallName: 'Munising Falls',
    strataId: 'jacobsville-sandstone',
    strataUnit: 'Jacobsville Sandstone',
    engine: 'Caprock Undercutting Plunge',
    ageEon: '900 Million Years',
    fieldRecognitionClues: 'Recessed redbed sandstone canyon amphitheater with visible horizontal bedding planes.'
  },
  'great-conglomerate-falls': {
    waterfallName: 'Great Conglomerate Falls',
    strataId: 'copper-harbor-conglomerate',
    strataUnit: 'Copper Harbor Conglomerate',
    engine: 'Basalt Step Staircase',
    ageEon: '1.08 Billion Years',
    fieldRecognitionClues: 'Black River splits around a 30-foot island of ancient puddingstone conglomerate.'
  },
  'canyon-falls': {
    waterfallName: 'Canyon Falls',
    strataId: 'michigamme-slate',
    strataUnit: 'Michigamme Slate',
    engine: 'Fault Line Rift Cascade',
    ageEon: '1.85 Billion Years',
    fieldRecognitionClues: 'Turbulent gorge box canyon carved through dipping charcoal-black slate cleavage planes.'
  },
  'bond-falls': {
    waterfallName: 'Bond Falls',
    strataId: 'portage-lake-volcanics',
    strataUnit: 'Portage Lake Volcanics',
    engine: 'Basalt Step Staircase',
    ageEon: '1.09 Billion Years',
    fieldRecognitionClues: 'Tiered volcanic basalt shelves creating wide cascading ribbons.'
  }
}
