"use client"

import { motion, type Variants } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three"

// --- NEW: Reusable 3D Background Component ---
// This can be used in both the Hero and About sections for consistency.
function Themed3DBackground() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Gentle rotation for the central object
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <Stars radius={60} depth={50} count={5000} factor={5} saturation={0} fade speed={1.5} />
      <mesh position={[0, 0, 0]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#ef4444" wireframe emissive="#ef4444" emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

// --- NEW: Animated Title with Glitch Effect ---
const GlitchTitle = ({ text }: { text: string }) => {
    return (
        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-mono glitch-container" data-text={text}>
            <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">{text}</span>
        </h2>
    )
}

// --- NEW: Data Pod Component for modular content display ---
const DataPod = ({ title, children, delay = 0 }: { title: string, children: React.ReactNode, delay?: number }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const variants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay } }
  }

  return (
    <motion.div 
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative backdrop-blur-lg bg-black/50 border border-white/10 rounded-2xl p-6 shadow-xl"
    >
      <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-red-400/50"></div>
      <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-red-400/50"></div>
      <h3 className="text-xl font-bold text-red-400 mb-4 font-mono">{title}</h3>
      <div className="text-gray-300 leading-relaxed space-y-3">{children}</div>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="py-20 relative overflow-hidden bg-black">
      {/* --- NEW: Shared 3D background canvas --- */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight intensity={0.5} />
          <Themed3DBackground />
        </Canvas>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <GlitchTitle text="About Me" />
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full"></div>
        </div>

        {/* --- UPDATED: Grid layout for Data Pods --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* --- Pod 1: Bio --- */}
            <div className="lg:col-span-2">
                <DataPod title="[ BIO SCAN ]">
                    <p>
                        A Game Developer with a relentless passion for building interactive worlds. In just four months, I have moved from concept to creation, developing a range of games and proving my mettle in a high-pressure Game Jam.
                    </p>
                    <p>
                        My goal is to craft applications that not only function flawlessly but provide exceptional, memorable user experiences.
                    </p>
                </DataPod>
            </div>

            {/* --- Pod 2: Core Philosophy --- */}
            <DataPod title="[ CORE DIRECTIVE ]" delay={0.2}>
                <p>
                    I believe that clean, maintainable code is the bedrock of any great project. My approach is rooted in user-centric design, ensuring every line of code serves a purpose in enhancing the final experience.
                </p>
            </DataPod>
            
            {/* --- Pod 3: Experience Log (Timeline) --- */}
            <div className="lg:col-span-3">
                 <DataPod title="[ EXPERIENCE LOG ]" delay={0.4}>
                    <div className="relative border-l-2 border-red-500/30 pl-6 space-y-8">
                        {/* Timeline Item 1 */}
                        <div className="relative">
                            <div className="absolute -left-[34px] top-1 w-4 h-4 bg-red-500 rounded-full border-4 border-black"></div>
                            <p className="font-mono text-red-300">Q1 2024</p>
                            <h4 className="font-semibold text-white">Genesis: The Journey Begins</h4>
                            <p className="text-sm text-gray-400">Embarked on an intensive learning path, focusing on the core principles of game development and software engineering.</p>
                        </div>
                        {/* Timeline Item 2 */}
                        <div className="relative">
                            <div className="absolute -left-[34px] top-1 w-4 h-4 bg-red-500 rounded-full border-4 border-black"></div>
                            <p className="font-mono text-red-300">Q2 2024</p>
                            <h4 className="font-semibold text-white">First Contact: Game Jam</h4>
                            <p className="text-sm text-gray-400">Competed in a 48-hour Game Jam, successfully designing, developing, and deploying a complete game under a strict deadline.</p>
                        </div>
                        {/* Timeline Item 3 */}
                        <div className="relative">
                            <div className="absolute -left-[34px] top-1 w-4 h-4 bg-red-500 rounded-full border-4 border-black"></div>
                            <p className="font-mono text-red-300">Present</p>
                            <h4 className="font-semibold text-white">Project Nexus: Full-Stack Integration</h4>
                            <p className="text-sm text-gray-400">Expanding my skill set by bridging gameplay with web platforms, utilizing React and Node.js to create interconnected experiences.</p>
                        </div>
                    </div>
                </DataPod>
            </div>

        </div>
      </div>
    </section>
  )
}
