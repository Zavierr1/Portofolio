"use client"

import { useState, useRef, useMemo, Suspense } from "react"
import { motion } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points } from "@react-three/drei"
import { PointMaterial } from "@react-three/drei"
import * as THREE from "three"
import { Vector3 } from "three"
import { random } from "maath"

// --- Animated Title (matching About.tsx) ---
const AnimatedTitle = ({ text }: { text: string }) => {
    return (
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
                {text}
            </span>
        </h2>
    )
}

// --- SkillGlyph with Orange Theme ---
function SkillGlyph({ level, isHovered }: { level: string; isHovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const sphere = useMemo(() => {
    const positions = new Float32Array(5000 * 3)
    random.inSphere(positions, { radius: 1.8 })
    return positions
  }, [])

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
      case "expert": return { geometry: <icosahedronGeometry args={[1, 0]} />, color: "#1e40af" }
      case "advanced": return { geometry: <dodecahedronGeometry args={[0.9, 0]} />, color: "#2563eb" }
      case "proficient": return { geometry: <octahedronGeometry args={[1, 0]} />, color: "#3b82f6" }
      default: return { geometry: <boxGeometry args={[1.2, 1.2, 1.2]} />, color: "#60a5fa" }
    }
  })()

  return (
    <group>
      <mesh ref={meshRef}>
        {geometry}
        <meshStandardMaterial ref={materialRef} wireframe color={color} emissive={color} emissiveIntensity={0.4} />
      </mesh>
      <Points ref={particlesRef} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#2563eb" size={0.008} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  )
}

function SkillCard({ skill }: { skill: { name: string; level: string; description: string; class: string; id: string; stability: string; } }) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div
      className="group relative rounded-2xl border border-blue-200/50 shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-800/10 hover:border-blue-300/60 backdrop-blur-sm bg-white flex-shrink-0 w-72"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <div className="absolute -inset-px bg-gradient-to-r from-blue-800 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
      <div className="relative rounded-2xl flex flex-col h-full overflow-hidden">
        <div className="relative h-48 flex-shrink-0 border-b-2 border-blue-200/50">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-0.5 bg-blue-600/80 animate-pulse group-hover:bg-blue-700"></div>
          <div className="absolute top-2 left-3 text-blue-700 font-mono text-[10px] opacity-70 group-hover:opacity-100 transition-opacity">
            <p>CLASS: {skill.class}</p><p>ID: {skill.id}</p>
          </div>
          <div className="absolute top-2 right-3 text-right text-blue-700 font-mono text-[10px] opacity-70 group-hover:opacity-100 transition-opacity">
            <p>STABILITY</p><p className="text-lg text-blue-600">{skill.stability}%</p>
          </div>
          <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }}>
            <ambientLight intensity={0.5} /><pointLight position={[0, 0, 5]} intensity={100} color="#2563eb" />
            <Suspense fallback={null}><SkillGlyph level={skill.level} isHovered={isHovered} /></Suspense>
          </Canvas>
        </div>
        <div className="p-5 flex-grow bg-white/20" style={{ backgroundImage: "radial-gradient(rgba(37, 99, 235, 0.03) 1px, transparent 1px)", backgroundSize: "0.5rem 0.5rem" }}>
          <h3 className="text-xl font-bold text-blue-800 mb-1">{skill.name}</h3>
          <p className="text-sm text-blue-700 font-semibold mb-3">{skill.level}</p>
          <p className="text-gray-600 text-xs leading-relaxed">{skill.description}</p>
        </div>
      </div>
    </div>
  )
}

// --- Carousel Component with Orange Theme ---
const SkillCarousel = ({ category, skills }: {
  category: string;
  skills: { name: string; level: string; description: string; class: string; id: string; stability: string; }[]
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-mono text-blue-700 mb-4 pl-4 border-l-4 border-blue-600">{category}</h3>
      <div className="relative">
        <motion.div ref={scrollRef} className="flex space-x-8 overflow-x-auto pb-4 horizontal-scrollbar" whileTap={{ cursor: "grabbing" }}>
          {skills.map((skill, index) => (
             <motion.div key={skill.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ root: scrollRef, once: true }}>
               <SkillCard skill={skill} />
             </motion.div>
          ))}
          </motion.div>
      </div>
    </div>
  )
}

export default function Skills() {
  // --- Data now organized by category ---
  const skillsData = {
    gameDev: [
      { name: "Unity", level: "Advanced", description: "Architecting core game mechanics, systems, and 3D environments.", class: "Tier-III", id: "#U3D-ADV", stability: "98.2"},
      { name: "C#", level: "Advanced", description: "Primary language for creating robust logic and complex interactions.", class: "Tier-III", id: "#CS-ADV", stability: "99.1"},
    ],
    webAndGraphics: [
      { name: "React", level: "Proficient", description: "Building dynamic, responsive user interfaces for web applications.", class: "Tier-II", id: "#RJS-PRO", stability: "97.5"},
      { name: "Three.js", level: "Proficient", description: "Integrating interactive 3D graphics directly into the web.", class: "Tier-II", id: "#TJS-PRO", stability: "96.4"},
      { name: "Node.js", level: "Basic", description: "Developing server-side logic and APIs for web and game backends.", class: "Tier-I", id: "#NJS-BAS", stability: "95.2"},
    ],
    toolsAndLanguages: [
      { name: "TypeScript", level: "Proficient", description: "Enhancing code quality and scalability in large projects.", class: "Tier-II", id: "#TS-PRO", stability: "98.9"},
      { name: "Blender", level: "Basic", description: "Modeling and texturing low-poly assets for real-time applications.", class: "Tier-I", id: "#BLN-BAS", stability: "94.6"},
      { name: "Git & Github", level: "Advanced", description: "Version control and collaborative development workflows.", class: "Tier-III", id: "#GIT-ADV", stability: "99.5"},
    ]
  }
  return (
    <section id="skills" className="py-20 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <AnimatedTitle text="Skills" />
          <div className="w-24 h-1 bg-gradient-to-r from-blue-800 to-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto">
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
