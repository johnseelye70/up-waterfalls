import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import WaterfallDetail from './pages/WaterfallDetail'
import TripPlanner from './pages/TripPlanner'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/waterfall/:slug" element={<WaterfallDetail />} />
          <Route path="/trip" element={<TripPlanner />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
