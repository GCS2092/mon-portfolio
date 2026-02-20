import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToHash from './components/ScrollToHash'
import { I18nProvider } from './features/i18n/I18nProvider'

import HomePage from './pages/HomePage'
import FrameworksPage from './pages/FrameworksPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ProjectArchitecturePage from './pages/ProjectArchitecturePage'
import AdminPage from './pages/AdminPage'

export default function App() {
  return (
    <BrowserRouter>
      <I18nProvider>
        <ScrollToHash />
        <div className="relative bg-cream min-h-screen">
          <Navbar />

          <main>
            <Routes>
              {/* Page d'accueil */}
              <Route path="/" element={<HomePage />} />

              <Route path="/frameworks" element={<FrameworksPage />} />

              <Route path="/admin" element={<AdminPage />} />

              {/* Page détail projet */}
              <Route path="/project/:slug" element={<ProjectDetailPage />} />

              {/* ⭐ Page architecture projet */}
              <Route
                path="/project/:slug/architecture"
                element={<ProjectArchitecturePage />}
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </I18nProvider>
    </BrowserRouter>
  )
}
