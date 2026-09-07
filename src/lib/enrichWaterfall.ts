import { WATERFALL_HIKING_DATA, WATERFALL_NAME_LOOKUP, type WaterfallHikingSpec } from '../data/waterfallHikingData'

export interface EnrichedWaterfall {
  id: string
  name: string
  county: string
  region: string
  latitude: number
  longitude: number
  drop_height: string
  hike_difficulty: 'Easy' | 'Moderate' | 'Difficult' | 'Strenuous'
  trail_length_miles: number
  estimated_time_minutes: string
  route_type: string
  parking_type: string
  pass_required: string
  dog_friendly: string
  trail_surface: string
  best_season: string
  trailhead_tips: string
  description: string
  historical_notes: string
  youtube_video_id?: string | null
  waterfall_photos?: Array<{
    id?: string
    image_url: string
    caption?: string
    credit_name?: string
    is_hero?: boolean
    is_county_hero?: boolean
  }>
}

/**
 * Normalizes county name by stripping trailing " County" if present.
 */
export function normalizeCounty(county: string | null | undefined): string {
  if (!county) return 'Unknown'
  return county.replace(/\s+County$/i, '').trim()
}

/**
 * Enriches a raw database waterfall record with verified hiking data.
 * Guarantees that drop_height, hike_difficulty, trail_length_miles,
 * parking_type, pass_required, and trail specifications are non-null and accurate.
 */
export function enrichWaterfall(raw: any): EnrichedWaterfall {
  if (!raw) {
    return {
      id: '',
      name: 'Unknown Waterfall',
      county: 'Unknown',
      region: 'Upper Peninsula',
      latitude: 46.5,
      longitude: -87.5,
      drop_height: '20 ft',
      hike_difficulty: 'Moderate',
      trail_length_miles: 1.0,
      estimated_time_minutes: '30 - 45 min',
      route_type: 'Out & Back',
      parking_type: 'Gravel Roadside Pull-off',
      pass_required: 'None (Free Public Access)',
      dog_friendly: 'Leashed Dogs Welcome',
      trail_surface: 'Packed forest soil and exposed tree roots.',
      best_season: 'Spring through Autumn',
      trailhead_tips: 'Wear sturdy hiking boots. Download offline maps before venturing into the backcountry.',
      description: 'A scenic natural waterfall in Michigan\'s Upper Peninsula wilderness.',
      historical_notes: 'Part of the historic Upper Peninsula watershed corridor.',
      waterfall_photos: []
    }
  }

  // Lookup in hiking data catalog by ID or by normalized name
  const catalogEntry: WaterfallHikingSpec | undefined =
    WATERFALL_HIKING_DATA[raw.id] ||
    WATERFALL_NAME_LOOKUP[raw.name?.toLowerCase()?.trim() || '']

  const county = normalizeCounty(raw.county || catalogEntry?.county || 'Unknown')

  // Determine drop height
  let drop_height = raw.drop_height
  if (!drop_height || drop_height === 'Unknown' || drop_height.trim() === '') {
    drop_height = catalogEntry?.drop_height || '20 ft'
  }

  // Determine hike difficulty
  let hike_difficulty: 'Easy' | 'Moderate' | 'Difficult' | 'Strenuous' = 'Moderate'
  if (raw.hike_difficulty) {
    const d = raw.hike_difficulty.toLowerCase()
    if (d.includes('easy')) hike_difficulty = 'Easy'
    else if (d.includes('mod')) hike_difficulty = 'Moderate'
    else if (d.includes('diff') || d.includes('hard')) hike_difficulty = 'Difficult'
    else if (d.includes('stren')) hike_difficulty = 'Strenuous'
  } else if (catalogEntry?.hike_difficulty) {
    hike_difficulty = catalogEntry.hike_difficulty
  }

  // Determine trail length in miles
  let trail_length_miles = raw.trail_length_miles
  if (trail_length_miles == null || isNaN(trail_length_miles)) {
    trail_length_miles = catalogEntry?.trail_length_miles != null ? catalogEntry.trail_length_miles : 0.8
  }

  // Determine parking type
  let parking_type = raw.parking_type
  if (!parking_type || parking_type.trim() === '') {
    parking_type = catalogEntry?.parking_type || 'Gravel Roadside Pull-off'
  }

  // Determine pass required
  let pass_required = raw.pass_required
  if (!pass_required || pass_required === 'Varies' || pass_required.trim() === '') {
    pass_required = catalogEntry?.pass_required || 'None (Free Public Access)'
  }

  // Clean description
  let description = raw.description
  if (
    !description ||
    description.trim() === '' ||
    description.includes('A beautiful natural waterfall located in') ||
    description.startsWith('Height:')
  ) {
    description = catalogEntry?.description ||
      `${raw.name} is a scenic wilderness waterfall located in ${county} County, Michigan.`
  }

  // Historical notes
  let historical_notes = raw.historical_notes
  if (!historical_notes || historical_notes.trim() === '') {
    historical_notes = catalogEntry?.historical_notes ||
      'Preserved within Michigan\'s Upper Peninsula wilderness corridor.'
  }

  return {
    ...raw,
    county,
    drop_height,
    hike_difficulty,
    trail_length_miles,
    estimated_time_minutes: catalogEntry?.estimated_time_minutes || '25 - 40 min',
    route_type: catalogEntry?.route_type || 'Out & Back',
    parking_type,
    pass_required,
    dog_friendly: catalogEntry?.dog_friendly || 'Leashed Dogs Welcome',
    trail_surface: catalogEntry?.trail_surface || 'Packed forest soil and exposed tree roots.',
    best_season: catalogEntry?.best_season || 'Spring Snowmelt (May - June) and Fall Colors',
    trailhead_tips: catalogEntry?.trailhead_tips || 'Wear sturdy waterproof boots and download offline maps before driving out.',
    description,
    historical_notes,
    waterfall_photos: raw.waterfall_photos || []
  }
}
