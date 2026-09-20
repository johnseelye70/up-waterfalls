export type FreezeStage = 
  | 'Open Water'
  | 'Spray Ice Rim'
  | 'Curtain Formed'
  | 'Solid Frozen Pillar'
  | 'Late Breakup & Shell Ice'

export type WaterIceGrade = 'None / Scenic Only' | 'WI2' | 'WI3' | 'WI3+' | 'WI4' | 'WI4+' | 'WI5'

export type WinterApproachType = 'Plowed Lot (<0.25 mi)' | 'Packed Trail Snowshoe (0.5–1.5 mi)' | 'Ungroomed Backcountry Ski/Snowshoe (2–5 mi)' | 'Snowmobile / Wilderness Trek (5+ mi)'

export interface WinterWaterfallCondition {
  waterfallId: string
  waterfallName: string
  county: string
  iceGrade: WaterIceGrade
  verticalIceDropFeet: number
  typicalFreezeWindow: string // e.g., "Late Dec – Early April"
  bestMonths: string[]
  freezeStage: FreezeStage
  estimatedIceThicknessInches: number
  winterApproach: WinterApproachType
  winterTrailheadPlowed: boolean
  plowingNotes: string
  climbingPermitRequired: boolean
  permitAgency?: string
  iceTypeDescription: string
  hazards: string[]
  winterGearRecommendations: string[]
}

export const WINTER_CONDITIONS_DATA: WinterWaterfallCondition[] = [
  {
    waterfallId: 'miners-falls',
    waterfallName: 'Miners Falls',
    county: 'Alger',
    iceGrade: 'WI3+',
    verticalIceDropFeet: 50,
    typicalFreezeWindow: 'Mid Dec – Late March',
    bestMonths: ['January', 'February'],
    freezeStage: 'Solid Frozen Pillar',
    estimatedIceThicknessInches: 28,
    winterApproach: 'Packed Trail Snowshoe (0.5–1.5 mi)',
    winterTrailheadPlowed: false,
    plowingNotes: 'Miners Castle Rd unplowed past junction. Access via ski/snowshoe trail from trail groomer turnaround (approx 3.5 miles RT).',
    climbingPermitRequired: true,
    permitAgency: 'National Park Service (Pictured Rocks National Lakeshore)',
    iceTypeDescription: 'Massive single-pitch amphitheater curtain fed by constant river spray. Yields sustained vertical WI3+ ice with heavy aerated cauliflowers.',
    hazards: ['Thin shell ice over rapid churn pool', 'Spindrift avalanches from top rim', 'Sub-zero wind chills'],
    winterGearRecommendations: ['Technical crampons & dual ice axes', 'Ice screws (13cm–19cm)', 'Snowshoes or backcountry touring skis', 'Avalanche beacon/probe for gorge rims']
  },
  {
    waterfallId: 'munising-falls',
    waterfallName: 'Munising Falls',
    county: 'Alger',
    iceGrade: 'None / Scenic Only',
    verticalIceDropFeet: 50,
    typicalFreezeWindow: 'Early Dec – Early April',
    bestMonths: ['January', 'February', 'March'],
    freezeStage: 'Solid Frozen Pillar',
    estimatedIceThicknessInches: 36,
    winterApproach: 'Plowed Lot (<0.25 mi)',
    winterTrailheadPlowed: true,
    plowingNotes: 'City of Munising plows Washington St lot daily. Paved trail packed or shoveled by NPS rangers.',
    climbingPermitRequired: false,
    permitAgency: 'Pictured Rocks National Lakeshore (Climbing strictly prohibited within canyon amphitheater to protect rare mosses & sandstone)',
    iceTypeDescription: 'Stupendous 50ft cathedral ice column locking out the sandstone amphitheater. One of the most photographed frozen sights in North America.',
    hazards: ['Falling ice daggers from sandstone rim (stay on viewing platform)', 'Slippery wooden boardwalk'],
    winterGearRecommendations: ['Microspikes / Yaktrax', 'Warm insulated winter boots', 'Camera tripod & windproof mittens']
  },
  {
    waterfallId: 'hungarian-falls',
    waterfallName: 'Hungarian Falls',
    county: 'Houghton',
    iceGrade: 'WI3',
    verticalIceDropFeet: 60,
    typicalFreezeWindow: 'Late Dec – Late March',
    bestMonths: ['January', 'February'],
    freezeStage: 'Curtain Formed',
    estimatedIceThicknessInches: 22,
    winterApproach: 'Packed Trail Snowshoe (0.5–1.5 mi)',
    winterTrailheadPlowed: true,
    plowingNotes: 'Golf Course Road plowed to residential turnout. Park with care without blocking residential driveways.',
    climbingPermitRequired: false,
    permitAgency: 'Keweenaw Land Trust (Recreational climbing tolerated with tread-lightly ethics)',
    iceTypeDescription: 'Stepped tiers over Jacobsville sandstone. Middle and lower drops freeze into tiered curtains and steep gullys with excellent tool placements.',
    hazards: ['Hidden undercurrent slots', 'Loose sandstone anchors at lip', 'Deep snowpack drifts in gorge'],
    winterGearRecommendations: ['Ice tools', '60m dry-treated dynamic rope', 'V-thread cord & tool for rappel anchors', 'Snowshoes']
  },
  {
    waterfallId: 'laughing-whitefish-falls',
    waterfallName: 'Laughing Whitefish Falls',
    county: 'Alger',
    iceGrade: 'WI2',
    verticalIceDropFeet: 100,
    typicalFreezeWindow: 'Mid Dec – Late March',
    bestMonths: ['January', 'February'],
    freezeStage: 'Solid Frozen Pillar',
    estimatedIceThicknessInches: 24,
    winterApproach: 'Packed Trail Snowshoe (0.5–1.5 mi)',
    winterTrailheadPlowed: false,
    plowingNotes: 'County Rd 327 unplowed for last 1.5 miles. Skiers and snowshoers park at plow turnaround on state forest road.',
    climbingPermitRequired: false,
    permitAgency: 'Michigan DNR (State Scenic Site)',
    iceTypeDescription: 'A 100ft low-angle stair-step curtain sheet spanning limestone rock shelves. Gentle moderate angling makes for premier low-angle alpine ice practice.',
    hazards: ['Thin sheet ice over mid-tier rapids', 'Steep canyon stair descent iced over', 'Deep forest isolation'],
    winterGearRecommendations: ['Crampons & ice axe', 'Microspikes for stair approach', 'Thermal emergency bivy', 'Headlamp with spare batteries']
  },
  {
    waterfallId: 'canyon-falls',
    waterfallName: 'Canyon Falls',
    county: 'Baraga',
    iceGrade: 'WI4',
    verticalIceDropFeet: 30,
    typicalFreezeWindow: 'Late Dec – March',
    bestMonths: ['January', 'February'],
    freezeStage: 'Curtain Formed',
    estimatedIceThicknessInches: 20,
    winterApproach: 'Packed Trail Snowshoe (0.5–1.5 mi)',
    winterTrailheadPlowed: true,
    plowingNotes: 'US-41 MDOT roadside park plowed periodically as emergency snow turnout.',
    climbingPermitRequired: false,
    permitAgency: 'MDOT / State Forest Land',
    iceTypeDescription: 'Dark amber Sturgeon River cascades through a sheer slate box canyon. Raging torrent creates hollow curtain drapes and steep box-gorge ice pillars.',
    hazards: ['Violent under-ice river current with fatal trap risk', 'Vertical canyon dropoffs without railings', 'Frazil ice dams'],
    winterGearRecommendations: ['Technical crampons', 'Flotation snowshoes', 'Top-rope anchor webbing around canyon pines']
  },
  {
    waterfallId: 'tahquamenon-upper-falls',
    waterfallName: 'Upper Tahquamenon Falls',
    county: 'Chippewa',
    iceGrade: 'None / Scenic Only',
    verticalIceDropFeet: 48,
    typicalFreezeWindow: 'Late Dec – April',
    bestMonths: ['January', 'February', 'March'],
    freezeStage: 'Spray Ice Rim',
    estimatedIceThicknessInches: 42,
    winterApproach: 'Plowed Lot (<0.25 mi)',
    winterTrailheadPlowed: true,
    plowingNotes: 'M-123 kept clear by Chippewa County Road Commission; Upper Falls day-use parking lot thoroughly cleared.',
    climbingPermitRequired: false,
    permitAgency: 'Michigan State Parks (Strictly prohibited on crest and spray shelf)',
    iceTypeDescription: 'Immense spray ice volcanoes form below the 200ft wide brink. The massive volume never completely freezes solid, roaring behind huge amber ice sheets.',
    hazards: ['Crest ice collapsing unexpectedly', 'Slippery stairs to lower viewing decks', 'Severe wind gusts off river gorge'],
    winterGearRecommendations: ['Traction cleats / Yaktrax', 'Heavy goose down parka', 'Ski goggles for blowing spindrift spray']
  },
  {
    waterfallId: 'bond-falls',
    waterfallName: 'Bond Falls',
    county: 'Ontonagon',
    iceGrade: 'None / Scenic Only',
    verticalIceDropFeet: 50,
    typicalFreezeWindow: 'Mid Dec – Late March',
    bestMonths: ['January', 'February'],
    freezeStage: 'Solid Frozen Pillar',
    estimatedIceThicknessInches: 26,
    winterApproach: 'Plowed Lot (<0.25 mi)',
    winterTrailheadPlowed: true,
    plowingNotes: 'Scenic site lower boardwalk lot plowed by power utility / state park staff throughout winter.',
    climbingPermitRequired: false,
    permitAgency: 'Michigan State Scenic Site',
    iceTypeDescription: 'Tiered volcanic basalt steps transform into an enchanted cascading maze of frosted terraces, weeping icicle skirts, and steaming open river channels.',
    hazards: ['Boardwalk snow drifts', 'Ice sheets covering timber stairs'],
    winterGearRecommendations: ['Insulated winter hiking boots', 'Walking poles with snow baskets', 'Microspikes']
  },
  {
    waterfallId: 'presque-isle-river-falls',
    waterfallName: 'Presque Isle River Cascades',
    county: 'Gogebic',
    iceGrade: 'WI3',
    verticalIceDropFeet: 35,
    typicalFreezeWindow: 'Late Dec – Late March',
    bestMonths: ['January', 'February'],
    freezeStage: 'Curtain Formed',
    estimatedIceThicknessInches: 24,
    winterApproach: 'Snowmobile / Wilderness Trek (5+ mi)',
    winterTrailheadPlowed: false,
    plowingNotes: 'South Boundary Rd closed in winter. Access via Porcupine Mountains State Park snowmobile trail or 7-mile cross-country ski loop.',
    climbingPermitRequired: false,
    permitAgency: 'Porcupine Mountains Wilderness State Park',
    iceTypeDescription: 'Manido and Nawadaha falls carve sculpted sandstone potholes. Heavy lake-effect moisture builds thick shelf ice and weeping gully drapes.',
    hazards: ['Extreme winter isolation with zero cellular coverage', 'Frazil slush dam washouts', 'Lake-effect whiteout snowstorms'],
    winterGearRecommendations: ['GPS satellite messenger (Garmin inReach)', 'Four-season winter tent & -20F sleeping bag', 'Backcountry touring skis']
  },
  {
    waterfallId: 'sable-falls',
    waterfallName: 'Sable Falls',
    county: 'Alger',
    iceGrade: 'WI2',
    verticalIceDropFeet: 75,
    typicalFreezeWindow: 'Mid Dec – Late March',
    bestMonths: ['January', 'February'],
    freezeStage: 'Solid Frozen Pillar',
    estimatedIceThicknessInches: 30,
    winterApproach: 'Packed Trail Snowshoe (0.5–1.5 mi)',
    winterTrailheadPlowed: true,
    plowingNotes: 'H-58 plowed from Grand Marais to Sable Falls parking lot turnaround.',
    climbingPermitRequired: true,
    permitAgency: 'National Park Service (Pictured Rocks)',
    iceTypeDescription: 'Multi-step cascading stairs down Munising sandstone canyon leading directly to the frozen dunes of Lake Superior.',
    hazards: ['Icy 168-step wooden staircase', 'Gale-force onshore winds off Lake Superior ice shelf'],
    winterGearRecommendations: ['Microspikes for wooden staircase', 'Snowshoes for beach trek to dunes', 'Balaclava & windshell']
  },
  {
    waterfallId: 'potawatomi-falls',
    waterfallName: 'Potawatomi & Gorge Falls',
    county: 'Gogebic',
    iceGrade: 'WI3',
    verticalIceDropFeet: 40,
    typicalFreezeWindow: 'Late Dec – Early April',
    bestMonths: ['January', 'February', 'March'],
    freezeStage: 'Curtain Formed',
    estimatedIceThicknessInches: 28,
    winterApproach: 'Packed Trail Snowshoe (0.5–1.5 mi)',
    winterTrailheadPlowed: true,
    plowingNotes: 'Black River National Forest Scenic Byway plowed by Gogebic County to Black River Harbor.',
    climbingPermitRequired: false,
    permitAgency: 'Ottawa National Forest',
    iceTypeDescription: 'High-volume Black River carves through dark basalt chasm. Dramatic columnar icicles plunge into boiling amber whirlpools.',
    hazards: ['Unprotected gorge canyon cliffs', 'Deep snow cornices extending over river rim'],
    winterGearRecommendations: ['Trekking poles with snow baskets', 'Technical ice crampons', 'Warm thermos of hot tea']
  }
]

export function getWinterConditionForWaterfall(waterfallId: string): WinterWaterfallCondition | undefined {
  return WINTER_CONDITIONS_DATA.find(w => w.waterfallId === waterfallId)
}
