import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Contact from './sections/Contact'

export default function App() {
  return (
    <div className="relative bg-cream min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}