import { Link } from 'react-router-dom'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
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
            <Link to="/" className="hover:text-copper-orange transition">Waterfall Directory</Link>
            <Link to="/trip" className="hover:text-copper-orange transition">Trip Planner</Link>
          </nav>

          <Link to="/trip" className="bg-copper-orange hover:bg-tahquamenon-amber text-white px-3.5 py-1.5 rounded text-xs font-semibold shadow transition">
            🧭 Active Trip (2)
          </Link>
        </div>
      </header>

      <main className="flex-grow flex flex-col relative z-10">
        {children}
      </main>

      <div className="w-full overflow-hidden leading-none text-pinery-green -mb-1 mt-auto relative z-10">
        <svg className="w-full h-16 sm:h-20 fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M 0,120 L 0,60 L 15,90 L 30,40 L 45,85 L 60,30 L 75,80 L 90,50 L 105,95 L 120,20 L 135,85 L 150,45 L 165,90 L 180,35 L 195,80 L 210,15 L 225,85 L 240,40 L 255,90 L 270,50 L 285,95 L 300,25 L 315,85 L 330,35 L 345,90 L 360,45 L 375,80 L 390,20 L 405,85 L 420,40 L 435,95 L 450,30 L 465,85 L 480,50 L 495,90 L 510,15 L 525,80 L 540,40 L 555,85 L 570,30 L 585,90 L 600,25 L 615,85 L 630,45 L 645,90 L 660,35 L 675,80 L 690,15 L 705,85 L 720,40 L 735,90 L 750,50 L 765,95 L 780,25 L 795,85 L 810,35 L 825,90 L 840,45 L 855,80 L 870,20 L 885,85 L 900,40 L 915,95 L 930,30 L 945,85 L 960,50 L 975,90 L 990,15 L 1005,80 L 1020,40 L 1035,85 L 1050,30 L 1065,90 L 1080,25 L 1095,85 L 1110,45 L 1125,90 L 1140,35 L 1155,80 L 1170,15 L 1185,85 L 1200,60 L 1200,120 Z"></path>
        </svg>
      </div>

      <footer className="bg-pinery-green text-parchment border-t-2 border-copper-orange relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center space-y-2">
          <p className="font-serif font-bold text-base text-parchment">🌲 Upper Peninsula Waterfalls & Travel Planner</p>
          <p className="text-xs text-slate-300">Authentic Yooper Wilderness Aesthetic • Hosted on seelye.info</p>
        </div>
      </footer>
    </div>
  )
}
