export interface UsgsGaugeStation {
  siteId: string
  name: string
  riverName: string
  county: string
  latitude: number
  longitude: number
  medianCfs: number // historical median discharge
  floodCfs: number  // high flow threshold
  lowCfs: number    // low trickle threshold
  associatedWaterfallNames: string[]
  associatedWaterfallIds?: string[]
}

export const USGS_UP_STATIONS: UsgsGaugeStation[] = [
  {
    siteId: '04045500',
    name: 'Tahquamenon River near Paradise, MI',
    riverName: 'Tahquamenon River',
    county: 'Chippewa',
    latitude: 46.5744,
    longitude: -85.0347,
    medianCfs: 850,
    floodCfs: 3500,
    lowCfs: 300,
    associatedWaterfallNames: ['Upper Tahquamenon Falls', 'Lower Tahquamenon Falls']
  },
  {
    siteId: '04033000',
    name: 'Presque Isle River at M-28 near Tula, MI',
    riverName: 'Presque Isle River',
    county: 'Gogebic',
    latitude: 46.5508,
    longitude: -89.7711,
    medianCfs: 420,
    floodCfs: 2200,
    lowCfs: 110,
    associatedWaterfallNames: ['Manabezho Falls', 'Manido Falls', 'Nawadaha Falls']
  },
  {
    siteId: '04031000',
    name: 'Black River near Bessemer, MI',
    riverName: 'Black River',
    county: 'Gogebic',
    latitude: 46.5161,
    longitude: -90.0664,
    medianCfs: 310,
    floodCfs: 1800,
    lowCfs: 80,
    associatedWaterfallNames: [
      'Great Conglomerate Falls',
      'Potawatomi Falls',
      'Gorge Falls',
      'Sandstone Falls',
      'Rainbow Falls'
    ]
  },
  {
    siteId: '04037500',
    name: 'Sturgeon River near Sidnaw, MI',
    riverName: 'Sturgeon River',
    county: 'Houghton',
    latitude: 46.6083,
    longitude: -88.7511,
    medianCfs: 380,
    floodCfs: 2100,
    lowCfs: 120,
    associatedWaterfallNames: ['Sturgeon River Gorge Falls', 'Tibbetts Falls']
  },
  {
    siteId: '04040000',
    name: 'Sturgeon River near Alston, MI',
    riverName: 'Sturgeon River (Lower Basin)',
    county: 'Baraga',
    latitude: 46.7369,
    longitude: -88.6653,
    medianCfs: 540,
    floodCfs: 3200,
    lowCfs: 160,
    associatedWaterfallNames: ['Canyon Falls', 'Lower Canyon Falls', 'Middle Canyon Falls']
  },
  {
    siteId: '04043050',
    name: 'Dead River near Marquette, MI',
    riverName: 'Dead River',
    county: 'Marquette',
    latitude: 46.5786,
    longitude: -87.4819,
    medianCfs: 240,
    floodCfs: 1400,
    lowCfs: 60,
    associatedWaterfallNames: ['Dead River Falls', 'Reany Falls']
  },
  {
    siteId: '04062000',
    name: 'Paint River at Crystal Falls, MI',
    riverName: 'Paint River',
    county: 'Iron',
    latitude: 45.9986,
    longitude: -88.3314,
    medianCfs: 620,
    floodCfs: 2800,
    lowCfs: 210,
    associatedWaterfallNames: ['Margeson Falls', 'Chicagon Falls']
  },
  {
    siteId: '04067500',
    name: 'Menominee River at McAllister, WI (MI Border)',
    riverName: 'Menominee River',
    county: 'Dickinson',
    latitude: 45.3283,
    longitude: -87.8286,
    medianCfs: 2800,
    floodCfs: 9500,
    lowCfs: 1100,
    associatedWaterfallNames: ['Piers Gorge Falls', 'Quiver Falls', 'Pemene Falls']
  },
  {
    siteId: '04043238',
    name: 'Falls River near L\'Anse, MI',
    riverName: 'Falls River',
    county: 'Baraga',
    latitude: 46.7511,
    longitude: -88.4528,
    medianCfs: 120,
    floodCfs: 850,
    lowCfs: 35,
    associatedWaterfallNames: ['Power House Falls', 'Lower Falls River Cascades', 'Middle Falls River Falls']
  },
  {
    siteId: '04036000',
    name: 'Middle Branch Ontonagon River near Paulding, MI',
    riverName: 'Ontonagon River Basin',
    county: 'Ontonagon',
    latitude: 46.3683,
    longitude: -89.0767,
    medianCfs: 460,
    floodCfs: 2600,
    lowCfs: 140,
    associatedWaterfallNames: ['Bond Falls', 'Agate Falls', 'O-Kun-de-Kun Falls']
  },
  {
    siteId: '04058000',
    name: 'Rapid River near Rapid River, MI',
    riverName: 'Rapid River',
    county: 'Delta',
    latitude: 45.9436,
    longitude: -86.9733,
    medianCfs: 95,
    floodCfs: 600,
    lowCfs: 25,
    associatedWaterfallNames: ['Rapid River Falls', 'Haymeadow Falls']
  },
  {
    siteId: '04043150',
    name: 'Chocolay River near Harvey, MI',
    riverName: 'Chocolay River',
    county: 'Marquette',
    latitude: 46.4719,
    longitude: -87.3564,
    medianCfs: 150,
    floodCfs: 900,
    lowCfs: 50,
    associatedWaterfallNames: ['Morgan Falls', 'Warner Falls']
  }
]

export const USGS_STATIONS = USGS_UP_STATIONS
export type UsgsStationDef = UsgsGaugeStation

export function getStationForWaterfall(waterfallNameOrId: string): UsgsGaugeStation | undefined {
  const clean = waterfallNameOrId.toLowerCase().replace(/-/g, ' ').trim()
  return USGS_UP_STATIONS.find(s => 
    s.associatedWaterfallNames.some(w => clean.includes(w.toLowerCase()) || w.toLowerCase().includes(clean))
  )
}
