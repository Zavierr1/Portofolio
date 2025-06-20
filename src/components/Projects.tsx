"use client"

import { ExternalLink, Github } from "lucide-react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import * as THREE from "three"
import { useInView } from "react-intersection-observer"


// --- Reusable 3D Background (from other sections) ---
function Themed3DBackground() {
  const groupRef = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  })
  return (
    <group ref={groupRef}>
      <Stars radius={70} depth={50} count={5000} factor={6} saturation={0} fade speed={1.5} />
      <mesh position={[0, 0, 0]}>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <meshStandardMaterial color="#ef4444" wireframe emissive="#ef4444" emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}

// --- Reusable Glitch Title (from other sections) ---
const GlitchTitle = ({ text }: { text: string }) => {
    return (
        <h2 className="text-4xl md:text-5xl font-bold mb-4  glitch-container" data-text={text}>
            <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">{text}</span>
        </h2>
    )
}

// --- Project Card for the FEATURED project ---
const FeaturedProjectCard = ({ project }: { project: any }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    }

    return (
        <motion.div
            ref={ref}
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="group relative rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 backdrop-blur-sm bg-black/50"
        >
            <div className="absolute -inset-px bg-gradient-to-r from-red-600 to-red-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative flex flex-col lg:flex-row">
                <div className="relative lg:w-3/5">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 lg:h-full object-cover object-center filter grayscale group-hover:grayscale-0 transition-all duration-500"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/800x600/000000/ef4444?text=IMAGE+N/A'; }}
                    />
                    <div className="absolute inset-0 bg-red-900/50 mix-blend-multiply group-hover:bg-red-900/30 transition-all duration-500"></div>
                </div>
                <div className="p-8 lg:w-2/5 flex flex-col">
                    <h3 className="text-2xl font-bold text-white mb-2 ">{project.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech: string) => (
                            <span key={tech} className="px-2 py-1 bg-red-500/10 text-red-300 rounded-md text-xs border border-red-500/20">
                                {tech}
                            </span>
                        ))}
                    </div>
                    <div className="flex space-x-4 mt-auto pt-4 border-t border-white/10">
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-300 hover:text-red-400 transition-colors duration-300">
                            <Github size={18} /><span>Code</span>
                        </a>
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-300 hover:text-red-400 transition-colors duration-300">
                            <ExternalLink size={18} /><span>Live Demo</span>
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default function Projects() {
  const projects = [
    {
      title: "VR 3D Assessment Game",
      description: "An immersive virtual reality experience developed in Unity for corporate training. Features complex interaction systems, performance tracking, and a dynamic environment that reacts to user input.",
      tech: ["Unity", "C#", "Oculus SDK", "Blender"],
      image: "https://placehold.co/800x600/000000/ef4444?text=VR+Assessment",
      github: "#",
      live: "#",
    },
    {
      title: "Project: Outbreak",
      description: "A top-down survival game built for a 48-hour Game Jam. Features procedural level generation, enemy AI, and a real-time inventory system.",
      tech: ["Unity", "C#", "Aseprite"],
      image: "https://placehold.co/600x400/000000/f87171?text=Outbreak",
      github: "#",
      live: "#",
    },
    {
      title: "Raturu: Portfolio Terminal",
      description: "The very portfolio you are browsing now. A fully interactive web experience built with React and Three.js, featuring a cohesive sci-fi theme.",
      tech: ["React", "Three.js (R3F)", "Framer Motion", "TailwindCSS"],
      image: "https://placehold.co/600x400/000000/fca5a5?text=Raturu",
      github: "#",
      live: "#",
    },
  ];

  const featuredProject = projects[0];
  const otherProjects = projects.slice(1);

  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  return (
    <section id="projects" className="py-20 relative overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 12] }}>
          <ambientLight intensity={0.5} />
          <Themed3DBackground />
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <GlitchTitle text="Case Files" />
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            A selection of my projects. Each represents a unique challenge and a story of development.
          </p>
        </div>
        
        <div className="space-y-16">
            {/* Featured Project Section */}
            <div>
                <h3 className="text-2xl  text-red-400 mb-4 pl-4 border-l-4 border-red-500">[ Featured File ]</h3>
                <FeaturedProjectCard project={featuredProject} />
            </div>

            {/* --- NEW: Archived Files Section (Tabbed Interface) --- */}
            {otherProjects.length > 0 && (
                <div>
                    <h3 className="text-2xl  text-red-400 mb-4 pl-4 border-l-4 border-red-500">[ Archived Files ]</h3>
                    <div className="flex flex-col md:flex-row gap-8 border border-white/10 rounded-2xl p-4 backdrop-blur-sm bg-black/50">
                        {/* File Tabs */}
                        <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible md:w-1/4 pb-2 md:pb-0">
                            {otherProjects.map((project, index) => (
                                <button
                                    key={project.title}
                                    onClick={() => setSelectedProjectIndex(index)}
                                    className={`relative text-left w-full px-4 py-3 text-sm  transition-colors duration-200 rounded-md whitespace-nowrap ${
                                        selectedProjectIndex === index ? 'text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    {selectedProjectIndex === index && (
                                        <motion.div layoutId="active-tab-highlight" className="absolute inset-0 bg-red-500/20 rounded-md" />
                                    )}
                                    <span className="relative z-10">{project.title}</span>
                                </button>
                            ))}
                        </div>
                        
                        {/* Content Pane */}
                        <div className="md:w-3/4 relative min-h-[300px]">
                             <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedProjectIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col md:flex-row gap-6"
                                >
                                    <div className="md:w-1/2">
                                        <img
                                            src={otherProjects[selectedProjectIndex].image}
                                            alt={otherProjects[selectedProjectIndex].title}
                                            className="w-full h-full object-cover rounded-lg border border-white/10"
                                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/000000/ef4444?text=IMAGE+N/A'; }}
                                        />
                                    </div>
                                    <div className="md:w-1/2 flex flex-col">
                                        <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">{otherProjects[selectedProjectIndex].description}</p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {otherProjects[selectedProjectIndex].tech.map((tech: string) => (
                                                <span key={tech} className="px-2 py-1 bg-red-500/10 text-red-300 rounded-md text-xs border border-red-500/20">{tech}</span>
                                            ))}
                                        </div>
                                        <div className="flex space-x-4 mt-auto pt-4 border-t border-white/10">
                                            <a href={otherProjects[selectedProjectIndex].github} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-300 hover:text-red-400 transition-colors">
                                                <Github size={18} /><span>Code</span>
                                            </a>
                                            <a href={otherProjects[selectedProjectIndex].live} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-300 hover:text-red-400 transition-colors">
                                                <ExternalLink size={18} /><span>Live Demo</span>
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </section>
  )
}
