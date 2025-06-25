"use client"

import { useState, useRef, Suspense, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars, Points, PointMaterial } from "@react-three/drei"
import { motion } from "framer-motion"
import * as THREE from "three"
import { Vector3 } from "three"
import * as random from "maath/random/dist/maath-random.esm"

// --- NEW: Reusable 3D Background (from About section) ---
function Themed3DBackground() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  })

  return (
    <group ref={groupRef}>
      <Stars radius={60} depth={50} count={5000} factor={5} saturation={0} fade speed={1.5} />
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#ef4444" wireframe emissive="#ef4444" emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

// --- NEW: Reusable Glitch Title (from About section) ---
const GlitchTitle = ({ text }: { text: string }) => {
    return (
        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-mono glitch-container" data-text={text}>
            <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">{text}</span>
        </h2>
    )
}

// --- SkillGlyph and SkillCard components remain the same, as they are already well-designed ---
function SkillGlyph({ level, isHovered }: { level: string; isHovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const sphere = useMemo(() => random.inSphere(new Float32Array(5000), { radius: 1.8 }), [])

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += 0.005
    if (particlesRef.current) particlesRef.current.rotation.y += 0.002
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        materialRef.current.emissiveIntensity, isHovered ? 2.5 : 0.4, delta * 5
      )
    }
    if (meshRef.current) {
      const targetScale = isHovered ? 1.15 : 1;
      meshRef.current.scale.lerp(new Vector3(targetScale, targetScale, targetScale), delta * 5);
    }
  })

  const { geometry, color } = (() => {
    switch (level.toLowerCase()) {
      case "expert": return { geometry: <icosahedronGeometry args={[1, 0]} />, color: "#ef4444" }
      case "advanced": return { geometry: <dodecahedronGeometry args={[0.9, 0]} />, color: "#f87171" }
      case "proficient": return { geometry: <octahedronGeometry args={[1, 0]} />, color: "#fca5a5" }
      default: return { geometry: <boxGeometry args={[1.2, 1.2, 1.2]} />, color: "#fecaca" }
    }
  })()

  return (
    <group>
      <mesh ref={meshRef}>
        {geometry}
        <meshStandardMaterial ref={materialRef} wireframe color={color} emissive={color} emissiveIntensity={0.4} />
      </mesh>
      <Points ref={particlesRef} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#ef4444" size={0.008} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  )
}

function SkillCard({ skill }: { skill: { name: string; level: string; description: string; class: string; id: string; stability: string; } }) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div
      className="group relative rounded-2xl border border-white/10 transition-all duration-300 hover:border-red-500/50 bg-black/50 flex-shrink-0 w-72"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute -inset-px bg-gradient-to-r from-red-600 to-red-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
      <div className="relative backdrop-blur-sm rounded-2xl flex flex-col h-full overflow-hidden">
        <div className="relative h-48 flex-shrink-0 border-b-2 border-red-500/20">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500/80 blur-[2px] animate-scan group-hover:blur-[3px] group-hover:bg-red-400"></div>
          <div className="absolute top-2 left-3 text-red-300 font-mono text-[10px] opacity-70 group-hover:opacity-100 transition-opacity">
            <p>CLASS: {skill.class}</p><p>ID: {skill.id}</p>
          </div>
          <div className="absolute top-2 right-3 text-right text-red-300 font-mono text-[10px] opacity-70 group-hover:opacity-100 transition-opacity">
            <p>STABILITY</p><p className="text-lg text-red-400">{skill.stability}%</p>
          </div>
          <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }}>
            <ambientLight intensity={0.5} /><pointLight position={[0, 0, 5]} intensity={100} color="#ef4444" />
            <Suspense fallback={null}><SkillGlyph level={skill.level} isHovered={isHovered} /></Suspense>
          </Canvas>
        </div>
        <div className="p-5 flex-grow bg-black/30" style={{ backgroundImage: "radial-gradient(rgba(239, 68, 68, 0.05) 1px, transparent 1px)", backgroundSize: "0.5rem 0.5rem" }}>
          <h3 className="text-xl font-bold text-white mb-1">{skill.name}</h3>
          <p className="text-sm text-red-300 font-semibold mb-3">{skill.level}</p>
          <p className="text-gray-400 text-xs leading-relaxed">{skill.description}</p>
        </div>
      </div>
    </div>
  )
}

// --- NEW: Carousel Component ---
const SkillCarousel = ({ category, skills }: { category: string; skills: any[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-mono text-red-400 mb-4 pl-4 border-l-4 border-red-500">{category}</h3>
      <div className="relative">
        <motion.div ref={scrollRef} className="flex space-x-8 overflow-x-auto pb-4 horizontal-scrollbar" whileTap={{ cursor: "grabbing" }}>
          {skills.map((skill, index) => (
             <motion.div key={skill.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ root: scrollRef, once: true }}>
                <SkillCard skill={skill} />
             </motion.div>
          ))}
        </motion.div>
        <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
      </div>
    </div>
  )
}

export default function Skills() {
  // --- Data now organized by category ---
  const skillsData = {
    gameDev: [
      { name: "Unreal Engine", level: "Expert", description: "Crafting high-fidelity cinematic experiences and complex gameplay.", class: "Tier-IV", id: "#UE5-EXP", stability: "99.8"},
      { name: "Unity", level: "Advanced", description: "Architecting core game mechanics, systems, and 3D environments.", class: "Tier-III", id: "#U3D-ADV", stability: "98.2"},
      { name: "C#", level: "Advanced", description: "Primary language for creating robust logic and complex interactions.", class: "Tier-III", id: "#CS-ADV", stability: "99.1"},
    ],
    webAndGraphics: [
      { name: "React", level: "Proficient", description: "Building dynamic, responsive user interfaces for web applications.", class: "Tier-II", id: "#RJS-PRO", stability: "97.5"},
      { name: "Three.js / R3F", level: "Proficient", description: "Integrating interactive 3D graphics directly into the web.", class: "Tier-II", id: "#TJS-PRO", stability: "96.4"},
      { name: "Node.js", level: "Basic", description: "Developing server-side logic and APIs for web and game backends.", class: "Tier-I", id: "#NJS-BAS", stability: "95.2"},
    ],
    toolsAndLanguages: [
      { name: "TypeScript", level: "Proficient", description: "Enhancing code quality and scalability in large projects.", class: "Tier-II", id: "#TS-PRO", stability: "98.9"},
      { name: "Blender", level: "Basic", description: "Modeling and texturing low-poly assets for real-time applications.", class: "Tier-I", id: "#BLN-BAS", stability: "94.6"},
      { name: "Git & Github", level: "Advanced", description: "Version control and collaborative development workflows.", class: "Tier-III", id: "#GIT-ADV", stability: "99.5"},
    ]
  }

  return (
    <section id="skills" className="py-20 relative overflow-hidden bg-black">
      {/* --- UPDATED: Using the shared 3D background --- */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight intensity={0.5} />
          <Themed3DBackground />
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <GlitchTitle text="Skills" />
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            A curated collection of my core competencies. Drag to explore each category.
          </p>
        </div>

        <div className="space-y-16">
          <SkillCarousel category="Game Development" skills={skillsData.gameDev} />
          <SkillCarousel category="Web & 3D Graphics" skills={skillsData.webAndGraphics} />
          <SkillCarousel category="Tools & Languages" skills={skillsData.toolsAndLanguages} />
        </div>
      </div>
    </section>
  )
}
