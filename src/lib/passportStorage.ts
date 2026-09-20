export interface PassportStamp {
  waterfallId: string
  waterfallName: string
  county: string
  visitedAt: string // ISO date or YYYY-MM-DD
  flowObserved: 'Trickle' | 'Moderate' | 'Roaring Peak' | 'Frozen Cascade'
  scrambleRating: 'Easy Boardwalk' | 'Rugged Root Trail' | 'Bushwhack Scramble' | 'Rope & Boulder Canyon'
  personalRating: number // 1 to 5 stars
  trailNotes: string
  weatherAtVisit?: string
}

export interface CountyProgress {
  county: string
  stampedCount: number
  totalCountyCount: number
  badgeUnlocked: boolean
  badgeTitle: string
}

export interface ScoutRank {
  rankTitle: string
  minStamps: number
  badgeIcon: string
  description: string
}

export const SCOUT_RANKS: ScoutRank[] = [
  { rankTitle: 'Porcupine Tenderfoot', minStamps: 0, badgeIcon: '🌱', description: 'Just beginning the journey into the deep northern woods.' },
  { rankTitle: 'Novice Bushwhacker', minStamps: 3, badgeIcon: '🥾', description: 'Logged first wilderness falls across backcountry trails.' },
  { rankTitle: 'Cascade Scout', minStamps: 10, badgeIcon: '🧭', description: 'Experienced route-finder across sandstone gorges and basalt ledges.' },
  { rankTitle: 'Superior Trailblazer', minStamps: 25, badgeIcon: '🌲', description: 'Traversed multiple Upper Peninsula counties and secret canyon gorges.' },
  { rankTitle: 'Iron Range Voyageur', minStamps: 50, badgeIcon: '🛶', description: 'True backcountry expert surviving cedar swamps and granite drops.' },
  { rankTitle: 'Master Yooper Sovereign', minStamps: 75, badgeIcon: '👑', description: 'Ultimate legend of Lake Superior cataracts and wilderness falls.' }
]

const PASSPORT_STORAGE_KEY = 'up_waterfalls_yooper_passport_v1'

export function loadPassportStamps(): PassportStamp[] {
  try {
    const raw = localStorage.getItem(PASSPORT_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (err) {
    console.error('Failed to parse passport stamps from localStorage:', err)
    return []
  }
}

export function savePassportStamp(stamp: PassportStamp): PassportStamp[] {
  const current = loadPassportStamps()
  const existingIdx = current.findIndex(s => s.waterfallId === stamp.waterfallId)
  let updated: PassportStamp[]
  if (existingIdx >= 0) {
    updated = [...current]
    updated[existingIdx] = stamp
  } else {
    updated = [stamp, ...current]
  }
  try {
    localStorage.setItem(PASSPORT_STORAGE_KEY, JSON.stringify(updated))
  } catch (err) {
    console.error('Failed to save stamp to localStorage:', err)
  }
  return updated
}

export function removePassportStamp(waterfallId: string): PassportStamp[] {
  const current = loadPassportStamps()
  const updated = current.filter(s => s.waterfallId !== waterfallId)
  try {
    localStorage.setItem(PASSPORT_STORAGE_KEY, JSON.stringify(updated))
  } catch (err) {
    console.error('Failed to remove stamp from localStorage:', err)
  }
  return updated
}

export function getStampForWaterfall(waterfallId: string): PassportStamp | undefined {
  const current = loadPassportStamps()
  return current.find(s => s.waterfallId === waterfallId)
}

export function getCurrentScoutRank(stampCount: number): ScoutRank {
  for (let i = SCOUT_RANKS.length - 1; i >= 0; i--) {
    if (stampCount >= SCOUT_RANKS[i].minStamps) {
      return SCOUT_RANKS[i]
    }
  }
  return SCOUT_RANKS[0]
}

export function exportPassportJson(): string {
  const stamps = loadPassportStamps()
  return JSON.stringify({
    exportedAt: new Date().toISOString(),
    version: '1.1.0',
    totalStamps: stamps.length,
    stamps
  }, null, 2)
}

export function importPassportJson(jsonString: string): { success: boolean; count: number; error?: string } {
  try {
    const data = JSON.parse(jsonString)
    const list: PassportStamp[] = Array.isArray(data) ? data : data.stamps
    if (!Array.isArray(list)) {
      return { success: false, count: 0, error: 'Invalid file format: missing stamps array' }
    }
    const current = loadPassportStamps()
    const map = new Map<string, PassportStamp>()
    current.forEach(s => map.set(s.waterfallId, s))
    list.forEach(s => {
      if (s.waterfallId && s.waterfallName) {
        map.set(s.waterfallId, s)
      }
    })
    const merged = Array.from(map.values())
    localStorage.setItem(PASSPORT_STORAGE_KEY, JSON.stringify(merged))
    return { success: true, count: merged.length }
  } catch (e: any) {
    return { success: false, count: 0, error: e?.message || 'Failed to parse JSON file' }
  }
}
