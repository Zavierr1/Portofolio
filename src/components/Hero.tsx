"use client";

import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

// --- Grid Pattern Component with Navy Blue Theme ---

export default function Hero() {
  // --- NEW: Framer Motion animation variants ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {" "}
        {/* Glassmorphism Card with Navy Blue Theme */}
        <motion.div
          className="relative backdrop-blur-sm bg-white border border-blue-200/50 rounded-3xl p-8 md:p-12 shadow-lg hover:shadow-xl hover:shadow-blue-800/10 transition-all duration-300"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
              Muhammad Fadel
            </span>
          </motion.h1>
          {/* Live Typing Animation with Navy Blue Theme */}
          <motion.div
            variants={itemVariants}
            className="text-xl md:text-2xl lg:text-3xl text-blue-700 mb-6 h-10"
          >
            <TypeAnimation
              sequence={[
                "<Game Developer />",
                2000,
                "<Problem Solver />",
                2000,
                "<Creative Coder />",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8"
          >
            Crafting interactive and immersive digital experiences with modern
            technologies. Passionate about creating engaging solutions that make
            a difference.
          </motion.p>{" "}
          <motion.div
            variants={itemVariants}
            className="flex justify-center space-x-4 mb-8"
          >
            {[
              {
                icon: Github,
                href: "https://github.com/Zavierr1?tab=repositories",
                label: "GitHub",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/your-profile-url",
                label: "LinkedIn",
              },
              { icon: Mail, href: "#contact", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel={label !== "Email" ? "noopener noreferrer" : undefined}
                className="p-3 rounded-full backdrop-blur-sm bg-white border border-gray-300/40 hover:bg-blue-50/70 hover:border-blue-300/60 transition-all duration-300 group shadow-lg"
                aria-label={label}
              >
                <Icon className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
              </a>
            ))}
          </motion.div>
          <motion.div variants={itemVariants}>
            <a
              href="#projects"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-800/25"
            >
              View My Work
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
