"use client";

import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { Menu, X } from "lucide-react";

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

  const navItems: NavItem[] = [
    { href: "#home", label: "Home", id: "home" },
    { href: "#about", label: "About", id: "about" },
    { href: "#skills", label: "Skills", id: "skills" },
    { href: "#projects", label: "Projects", id: "projects" },
    { href: "#contact", label: "Contact", id: "contact" },
  ];

  // Effect for scroll handling to determine active section and navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navItems.map((item) =>
        document.querySelector<HTMLElement>(item.href)
      );
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

  const mobileMenuVariants: Variants = {
    open: {
      clipPath: `circle(120% at 90% 40px)`,
      transition: { type: "spring", stiffness: 40, restDelta: 2 },
    },
    closed: {
      clipPath: "circle(24px at 90% 40px)",
      transition: { delay: 0.2, type: "spring", stiffness: 400, damping: 40 },
    },
  };

  const mobileLinkContainerVariants = {
    open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  };

  const mobileLinkVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: { y: { stiffness: 1000, velocity: -100 } },
    },
    closed: { y: 50, opacity: 0, transition: { y: { stiffness: 1000 } } },
  };
  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? "bg-white/90 border-b border-gray-200/30 shadow-lg shadow-blue-800/5"
          : "bg-white/80"
      }`}
      style={{
        backdropFilter:
          scrolled || isOpen ? "blur(20px) saturate(180%)" : "blur(12px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            {/* Logo with Modern Orange Gradient */}
            <a
              href="#home"
              className="text-2xl font-bold"
              onClick={() => setActiveSection("home")}
              aria-label="Home"
            >
              <span
                className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 bg-clip-text text-transparent font-bold"
                data-text="Zavier"
              >
                Zavier
              </span>
            </a>
            {/* System Status Indicator */}
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setActiveSection(item.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:scale-105 ${
                  activeSection === item.id
                    ? "text-blue-700"
                    : "text-gray-700 hover:text-blue-600"
                }`}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                <span className="relative z-10">{item.label}</span>
                {/* Active Indicator with improved styling */}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-700/20 to-blue-600/20 backdrop-blur-sm border border-blue-700/30 rounded-lg shadow-md"
                    layoutId="active-box"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.nav initial={false} animate={isOpen ? "open" : "closed"}>
              <motion.button
                className="relative z-50 text-gray-700 p-2 hover:text-blue-600 transition-colors duration-200"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                <motion.div
                  animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </motion.button>

              <motion.div
                className="absolute top-0 right-0 bottom-0 w-full bg-gradient-to-br from-white/95 via-gray-50/90 to-gray-100/85 backdrop-blur-xl border-l border-gray-200/50 shadow-2xl"
                variants={mobileMenuVariants}
                style={{
                  height: "100vh",
                  backdropFilter: "blur(20px) saturate(180%)",
                }}
              />

              <motion.div
                className="absolute top-20 left-0 w-full"
                variants={mobileLinkContainerVariants}
                aria-hidden={!isOpen}
              >
                {navItems.map((item) => (
                  <motion.div
                    key={item.href}
                    variants={mobileLinkVariants}
                    className="px-8 py-3"
                  >
                    <a
                      href={item.href}
                      className={`block text-xl text-center font-medium transition-all duration-200 py-2 px-4 rounded-lg ${
                        activeSection === item.id
                          ? "text-blue-700 bg-blue-100/50"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50/30"
                      }`}
                      onClick={() => {
                        setActiveSection(item.id);
                        setIsOpen(false);
                      }}
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
