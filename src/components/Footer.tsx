"use client"

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import type { ComponentType } from 'react';

// --- Reusable Social Icon Component with Orange Theme ---
const SocialLink = ({ href, Icon, label }: { 
    href: string; 
    Icon: ComponentType<{ className?: string }>; 
    label: string 
}) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="p-2 rounded-full text-gray-500 transition-all duration-300 hover:text-orange-600 hover:bg-orange-100/80 hover:scale-110"
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
        <footer className="relative bg-white border-t border-orange-200/80 text-gray-600 py-8 px-4 sm:px-6 lg:px-8">
            
            {/* --- Decorative top line element --- */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-orange-300 to-transparent" />

            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">

                {/* --- Left Side: Copyright --- */}
                <div className="text-center sm:text-left">
                    <p className="font-semibold text-sm">
                        &copy; {currentYear} Muhammad Fadel. All Rights Reserved.
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
                className={`fixed bottom-5 right-5 z-50 p-3 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white backdrop-blur-sm border border-orange-300/50 shadow-lg shadow-orange-500/30 transition-opacity duration-300 ${
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
