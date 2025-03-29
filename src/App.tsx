import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home.tsx'
import { PlayerStats } from './pages/PlayerStats.tsx'
import { TeamStats } from './pages/TeamStats.tsx'
import About from './pages/About.tsx'
import NotFound from './pages/NotFound.tsx'
import { Header } from './components/Header.tsx'
import { Footer } from './components/Footer.tsx'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player-stats" element={<PlayerStats />} />
        <Route path="/team-stats" element={<TeamStats />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
