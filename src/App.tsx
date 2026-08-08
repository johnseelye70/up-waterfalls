import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import WaterfallDetail from './pages/WaterfallDetail'
import TripPlanner from './pages/TripPlanner'
import { TripProvider } from './lib/TripContext'

function App() {
  return (
    <TripProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/waterfall/:slug" element={<WaterfallDetail />} />
            <Route path="/trip" element={<TripPlanner />} />
          </Routes>
        </Layout>
      </Router>
    </TripProvider>
  )
}

export default App
