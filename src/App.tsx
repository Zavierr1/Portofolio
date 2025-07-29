import Hero from "./components/Hero"
import About from "./components/About"
import Skills from "./components/Skills"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { FaviconGenerator } from "./components/FaviconGenerator"


export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950  ">
      <FaviconGenerator />
      <Navbar />
      <Hero />  
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
