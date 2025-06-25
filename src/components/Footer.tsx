"use client"

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import type { ComponentType } from 'react';

// --- Reusable Social Icon Component ---
const SocialLink = ({ href, Icon, label }: { 
    href: string; 
    // Specify that Icon is a component that accepts a className prop
    Icon: ComponentType<{ className?: string }>; 
    label: string 
}) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="p-2 rounded-full text-gray-400 transition-all duration-300 hover:text-white hover:bg-red-500/20 hover:scale-110"
    >
        <Icon className="w-5 h-5" />
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
            behavior: "smooth"
        });
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-black border-t-2 border-red-500/20 text-gray-400 py-8 px-4 sm:px-6 lg:px-8 hud-grid-bg">
            
            {/* --- Decorative top line element --- */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />

            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">

                {/* --- Left Side: Copyright --- */}
                <div className="text-center sm:text-left">
                    <p className="font-mono text-sm">
                        &copy; {currentYear} ZAVIER. ALL SYSTEMS NOMINAL.
                    </p>
                    <p className="font-mono text-xs text-gray-500">
                        DESIGNATION: MUHAMMAD FADEL // LOCATION: EARTH
                    </p>
                </div>

                {/* --- Right Side: Social Links --- */}
                <div className="flex items-center gap-2">
                    <SocialLink href="https://github.com/Zavierr1?tab=repositories" Icon={Github} label="GitHub" />
                    <SocialLink href="https://www.linkedin.com/in/your-profile-url" Icon={Linkedin} label="LinkedIn" />
                    <SocialLink href="mailto:fadeljafir@gmail.com" Icon={Mail} label="Email" />
                </div>

            </div>
            
            {/* --- Scroll to Top Button --- */}
            <motion.button
                onClick={scrollToTop}
                className={`fixed bottom-5 right-5 z-50 p-3 rounded-full bg-red-600/80 text-white backdrop-blur-sm border border-red-400/50 shadow-lg shadow-red-500/20 transition-all duration-300 ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
                }`}
                aria-label="Scroll to top"
                whileHover={{ scale: isVisible ? 1.1 : 0, rotate: -45, backgroundColor: "#ef4444" }}
                whileTap={{ scale: isVisible ? 0.9 : 0 }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <ArrowUp className="w-6 h-6" />
            </motion.button>
        </footer>
    );
}