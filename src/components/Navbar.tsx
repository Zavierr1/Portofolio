"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import * as Tone from 'tone'

// --- Types remain the same ---
interface NavItem {
  href: string;
  label: string;
  id: SectionId;
}
type SectionId = "home" | "about" | "skills" | "projects" | "contact";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  // --- NEW: Ref to hold the Tone.js synth to prevent re-creation ---
  const synth = useRef<Tone.Synth | null>(null);

  const navItems: NavItem[] = [
    { href: "#home",     label: "Home",     id: "home" },
    { href: "#about",    label: "About",    id: "about" },
    { href: "#skills",   label: "Skills",   id: "skills" },
    { href: "#projects", label: "Projects", id: "projects" },
    { href: "#contact",  label: "Contact",  id: "contact" },
  ];

  // Effect for scroll handling to determine active section and navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navItems.map(item => document.querySelector<HTMLElement>(item.href));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // navItems is stable

  // --- NEW: Function to play a sound on hover ---
  const playHoverSound = () => {
    // Initialize the synth on the first interaction
    if (!synth.current) {
      synth.current = new Tone.Synth({
        oscillator: { type: 'sine' },
        envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 0.1 }
      }).toDestination();
    }
    // Play a short, high-pitched note
    synth.current.triggerAttackRelease("C5", "8n");
  };

  const mobileMenuVariants = {
    open: {
      clipPath: `circle(120% at 90% 40px)`,
      transition: { type: "spring", stiffness: 40, restDelta: 2 }
    },
    closed: {
      clipPath: "circle(24px at 90% 40px)",
      transition: { delay: 0.2, type: "spring", stiffness: 400, damping: 40 }
    }
  };
  
  const mobileLinkContainerVariants = {
      open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
      closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
  };

  const mobileLinkVariants = {
      open: { y: 0, opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 } } },
      closed: { y: 50, opacity: 0, transition: { y: { stiffness: 1000 } } }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        scrolled || isOpen ? "bg-black/70 backdrop-blur-xl border-b border-red-500/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            {/* Logo with Glitch Effect */}
            <a href="#home" className="text-2xl font-bold glitch-container" onClick={() => setActiveSection("home")} aria-label="Home">
              <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent" data-text="Zavier">
                Zavier
              </span>
            </a>
            {/* --- NEW: System Status Indicator --- */}
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onMouseEnter={playHoverSound}
                onClick={() => setActiveSection(item.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${
                   activeSection === item.id ? "text-white" : "text-gray-400 hover:text-white"
                }`}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                {item.label}
                {/* --- UPDATED: Active Indicator --- */}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute inset-0 border-2 border-red-500/80 rounded-lg"
                    layoutId="active-box"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.nav initial={false} animate={isOpen ? "open" : "closed"}>
                 <motion.button 
                    className="relative z-50 text-white p-2"
                    onClick={() => setIsOpen(!isOpen)} 
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                 >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.button>
              <motion.div className="absolute top-0 right-0 bottom-0 w-full bg-black/90 backdrop-blur-md" variants={mobileMenuVariants} style={{height: '100vh'}} />
              <motion.div
                  className="absolute top-24 left-0 w-full"
                  variants={mobileLinkContainerVariants}
                  aria-hidden={!isOpen}
              >
                  {navItems.map((item) => (
                      <motion.div key={item.href} variants={mobileLinkVariants} className="px-8 py-2">
                          <a
                              href={item.href}
                              className={`block text-2xl text-center font-medium transition-colors ${
                                  activeSection === item.id ? "text-red-400" : "text-gray-300"
                              }`}
                              onClick={() => setIsOpen(false)}
                          >
                              {item.label}
                          </a>
                      </motion.div>
                  ))}
              </motion.div>
            </motion.nav>
          </div>
        </div>
      </div>
    </nav>
  );
}
