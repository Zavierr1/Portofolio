"use client";

import { ExternalLink, Github } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

import vrProjectImage from "../assets/images/vr_map2_T.png";

// --- Reusable Grid Pattern (from other sections) ---
const GridPattern = () => (
  <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-10 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
);

// --- Reusable Animated Title (from other sections) ---
const AnimatedTitle = ({ text }: { text: string }) => {
  return (
    <h2 className="text-4xl md:text-5xl font-bold mb-4">
      <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
        {text}
      </span>
    </h2>
  );
};

// --- Project Card for the FEATURED project ---
const FeaturedProjectCard = ({ project }: { project: any }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="group relative rounded-2xl p-px bg-gradient-to-br from-orange-300/50 to-amber-300/50 hover:from-orange-400 hover:to-amber-400 transition-all duration-300 shadow-md hover:shadow-xl"
    >
      <div className="relative rounded-[15px] bg-orange-50/90 backdrop-blur-sm overflow-hidden flex flex-col lg:flex-row">
        <div className="relative lg:w-3/5">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-64 lg:h-full object-cover object-center transition-all duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://placehold.co/800x600/ffedd5/f97316?text=IMAGE+N/A";
            }}
          />
        </div>
        <div className="p-8 lg:w-2/5 flex flex-col">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {project.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech: string) => (
              <span
                key={tech}
                className="px-2 py-1 bg-orange-500/10 text-orange-700 rounded-md text-xs border border-orange-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex space-x-4 mt-auto pt-4 border-t border-orange-200/50">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors duration-300"
            >
              <Github size={18} />
              <span>Code</span>
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors duration-300"
            >
              <ExternalLink size={18} />
              <span>Live Demo</span>
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
      description:
        "An immersive virtual reality experience developed in Unity for corporate training. Features complex interaction systems, performance tracking, and a dynamic environment that reacts to user input.",
      tech: ["Unity", "C#", "Oculus SDK", "Blender"],
      image: vrProjectImage,
      github: "#",
      live: "#",
    },
    {
      title: "Outbreak",
      description:
        "A top-down survival game built for a 48-hour Game Jam. Features procedural level generation, enemy AI, and a real-time inventory system.",
      tech: ["Unity", "C#", "Aseprite"],
      image: "https://placehold.co/600x400/fb923c/ffffff?text=Outbreak",
      github: "#",
      live: "#",
    },
    {
      title: "Raturu",
      description:
        "The very portfolio you are browsing now. A fully interactive web experience built with React and Three.js, featuring a cohesive sci-fi theme.",
      tech: ["React", "Three.js (R3F)", "Framer Motion", "TailwindCSS"],
      image: "https://placehold.co/600x400/fdba74/ffffff?text=Raturu",
      github: "#",
      live: "#",
    },
    {
      title: "Freaky Hollow",
      description:
        "A narrative-driven horror game prototype with atmospheric level design and scripted events to build suspense.",
      tech: ["Unreal Engine", "Blueprints", "Blender"],
      image: "https://placehold.co/600x400/fca5a5/ffffff?text=Freaky+Hollow",
      github: "#",
      live: "#",
    },
  ];

  const featuredProject = projects[0];
  const otherProjects = projects.slice(1);

  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  return (
    <section
      id="projects"
      className="py-20 relative overflow-hidden bg-orange-50"
    >
      <GridPattern />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <AnimatedTitle text="Projects" />
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto">
            A selection of my projects. Each represents a unique challenge and a
            story of development.
          </p>
        </div>

        <div className="space-y-16">
          {/* Featured Project Section */}
          <div>
            <h3 className="text-2xl font-mono text-orange-600 mb-4 pl-4 border-l-4 border-orange-500">
              [ Featured Project ]
            </h3>
            <FeaturedProjectCard project={featuredProject} />
          </div>

          {/* Archived Files Section (Tabbed Interface) */}
          {otherProjects.length > 0 && (
            <div>
              <h3 className="text-2xl font-mono text-orange-600 mb-4 pl-4 border-l-4 border-orange-500">
                [ Other Projects ]
              </h3>
              <div className="flex flex-col md:flex-row gap-8 rounded-2xl p-4 bg-white/60 backdrop-blur-sm border border-orange-200/50 shadow-md">
                {/* File Tabs */}
                <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible md:w-1/4 pb-2 md:pb-0 border-b-2 md:border-b-0 md:border-r-2 border-orange-200/50">
                  {otherProjects.map((project, index) => (
                    <button
                      key={project.title}
                      onClick={() => setSelectedProjectIndex(index)}
                      className={`relative text-left w-full px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-md whitespace-nowrap ${
                        selectedProjectIndex === index
                          ? "text-orange-700"
                          : "text-gray-500 hover:bg-orange-100/50 hover:text-orange-600"
                      }`}
                    >
                      {selectedProjectIndex === index && (
                        <motion.div
                          layoutId="active-tab-highlight"
                          className="absolute inset-0 bg-gradient-to-r from-orange-200/80 to-amber-200/80 rounded-md"
                        />
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
                          className="w-full h-full object-cover rounded-lg border border-orange-200/50 shadow-sm"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://placehold.co/600x400/ffedd5/f97316?text=IMAGE+N/A";
                          }}
                        />
                      </div>
                      <div className="md:w-1/2 flex flex-col">
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                          {otherProjects[selectedProjectIndex].description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {otherProjects[selectedProjectIndex].tech.map(
                            (tech: string) => (
                              <span
                                key={tech}
                                className="px-2 py-1 bg-orange-500/10 text-orange-700 rounded-md text-xs border border-orange-500/20"
                              >
                                {tech}
                              </span>
                            )
                          )}
                        </div>
                        <div className="flex space-x-4 mt-auto pt-4 border-t border-orange-200/50">
                          <a
                            href={otherProjects[selectedProjectIndex].github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors"
                          >
                            <Github size={18} />
                            <span>Code</span>
                          </a>
                          <a
                            href={otherProjects[selectedProjectIndex].live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors"
                          >
                            <ExternalLink size={18} />
                            <span>Live Demo</span>
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
  );
}
