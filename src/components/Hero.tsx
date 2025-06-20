"use client"

import { ArrowDown, ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three"
import { motion } from "framer-motion"
import { TypeAnimation } from "react-type-animation"

// --- NEW: 3D Background Component ---
function Hero3DBackground() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ mouse }) => {
    if (groupRef.current) {
      // Subtle parallax effect based on mouse position
      const x = (mouse.x * 0.2)
      const y = (mouse.y * 0.2)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x, 0.02)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y, 0.02)
    }
  })

  return (
    <group ref={groupRef}>
      <Stars radius={50} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <mesh position={[0, 0, -2]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#ef4444" wireframe emissive="#ef4444" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

export default function Hero() {

  // --- NEW: Framer Motion animation variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* --- UPDATED: 3D Canvas Background --- */}
      <div className="absolute inset-0 z-0 opacity-50">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <Hero3DBackground />
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* --- UPDATED: Glassmorphism Card with animations & UI accents --- */}
        <motion.div
          className="relative backdrop-blur-lg bg-black/50 rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Decorative Corner Brackets */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-red-400/50"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-red-400/50"></div>

          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 font-mono">
            <span className="bg-gradient-to-r from-white via-red-200 to-red-500 bg-clip-text text-transparent">
              Muhammad Fadel
            </span>
          </motion.h1>

          {/* --- UPDATED: "Live" Typing Animation --- */}
          <motion.div variants={itemVariants} className="text-xl md:text-2xl lg:text-3xl text-red-400 mb-6 font-mono h-10">
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

          <motion.p variants={itemVariants} className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            Crafting interactive and immersive digital experiences with modern technologies. 
            Passionate about creating engaging solutions that make a difference.
          </motion.p>

          <motion.div variants={itemVariants} className="flex justify-center space-x-4 mb-8">
            {[
              { icon: Github, href: "https://github.com/Zavierr1?tab=repositories", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/your-profile-url", label: "LinkedIn" },
              { icon: Mail, href: "#contact", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel={label !== "Email" ? "noopener noreferrer" : undefined}
                className="p-3 rounded-full backdrop-blur-md bg-white/10 border border-white/20 hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-300 group"
                aria-label={label}
              >
                <Icon className="w-6 h-6 text-white group-hover:text-red-400 transition-colors" />
              </a>
            ))}
          </motion.div>

          <motion.div variants={itemVariants}>
            <a
              href="#projects"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
            >
              View My Work
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}