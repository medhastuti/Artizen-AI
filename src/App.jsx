import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Dashboard from './components/Dashboard'
import PosterPage from './components/PosterPage'
import SocialGenerator from './components/SocialGenerator'
import BioGenerator from './components/BioGenerator'
import { useWindowWidth } from './components/useWindowWidth'

export default function App() {
  const windowWidth = useWindowWidth()
  const isMobile = windowWidth < 768

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()

  // Close sidebar on mobile when route changes (navigate)
  useEffect(() => {
    if (isMobile) setIsSidebarOpen(false)
  }, [location.pathname, isMobile])

  const sidebarOpen = isMobile ? isSidebarOpen : true

  const toggleSidebar = () => {
    if (isMobile) setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-800">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} isMobile={isMobile} />
      <div className="flex-1 p-6">
        <Topbar toggleSidebar={toggleSidebar} isMobile={isMobile} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/poster" element={<PosterPage />} />
          <Route path="/social" element={<SocialGenerator />} />
          <Route path="/bios" element={<BioGenerator />} />
        </Routes>
      </div>
    </div>
  )
}
