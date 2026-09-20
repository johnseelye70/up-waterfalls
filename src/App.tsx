import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Directory from './pages/Directory'
import WaterfallDetail from './pages/WaterfallDetail'
import TravelGuides from './pages/TravelGuides'
import TripPlanner from './pages/TripPlanner'
import Changelog from './pages/Changelog'
import Admin from './pages/Admin'
import RiverFlow from './pages/RiverFlow'
import AuroraPredictor from './pages/AuroraPredictor'
import GeologySlicer from './pages/GeologySlicer'
import TrailPassport from './pages/TrailPassport'
import WinterIce from './pages/WinterIce'
import { TripProvider } from './lib/TripContext'

function App() {
  return (
    <TripProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/waterfall/:slug" element={<WaterfallDetail />} />
            <Route path="/guides" element={<TravelGuides />} />
            <Route path="/guides/:guideId" element={<TravelGuides />} />
            <Route path="/trip" element={<TripPlanner />} />
            <Route path="/flow" element={<RiverFlow />} />
            <Route path="/aurora" element={<AuroraPredictor />} />
            <Route path="/geology" element={<GeologySlicer />} />
            <Route path="/passport" element={<TrailPassport />} />
            <Route path="/winter" element={<WinterIce />} />
            <Route path="/changelog" element={<Changelog />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Layout>
      </Router>
    </TripProvider>
  )
}

export default App
