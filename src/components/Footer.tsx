"use client";

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import type { ComponentType } from "react";

// --- Reusable Social Icon Component with Navy Blue Theme ---
const SocialLink = ({
  href,
  Icon,
  label,
}: {
  href: string;
  Icon: ComponentType<{ className?: string }>;
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="p-3 rounded-full backdrop-blur-sm bg-white border border-gray-300/40 hover:bg-blue-50/70 hover:border-blue-300/60 transition-all duration-300 group shadow-lg"
  >
    <Icon className="w-5 h-5 text-gray-700 group-hover:text-blue-600 transition-colors" />
  </a>
);

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  // --- Show button when page is scrolled down ---
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // --- Set up scroll listener ---
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // --- Smooth scroll to top function ---
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white border-t border-blue-200/50 py-8 px-4 sm:px-6 lg:px-8">
      {/* --- Decorative top line element with navy blue theme --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-blue-600/70 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Glassmorphism Card with Navy Blue Theme (matching Hero) */}
        <div className="relative backdrop-blur-sm bg-white border border-blue-200/50 rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl hover:shadow-blue-800/10 transition-all duration-300">
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            {/* --- Left Side: Copyright --- */}
            <div className="text-center sm:text-left">
              <p className="font-semibold text-sm text-blue-800">
                &copy; {currentYear}{" "}
                <span className="bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
                  Muhammad Fadel
                </span>
                . All Rights Reserved.
              </p>
            </div>

            {/* --- Right Side: Social Links --- */}
            <div className="flex items-center gap-3">
              <SocialLink
                href="https://github.com/Zavierr1?tab=repositories"
                Icon={Github}
                label="GitHub"
              />
              <SocialLink
                href="https://www.linkedin.com/in/muhammadjafier"
                Icon={Linkedin}
                label="LinkedIn"
              />
              <SocialLink
                href="mailto:fadeljafir@gmail.com"
                Icon={Mail}
                label="Email"
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- Scroll to Top Button with Navy Blue Theme --- */}
      <motion.button
        onClick={scrollToTop}
        className={`fixed bottom-5 right-5 z-50 p-3 rounded-full bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white backdrop-blur-sm border border-blue-300/50 shadow-lg hover:shadow-blue-800/25 transition-all duration-300 ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Scroll to top"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </footer>
  );
}
