"use client";

import { Download } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useState, useRef } from "react";
import { useInView } from "react-intersection-observer";

import vrProjectImage from "../assets/images/vr_map2_T.png";
import outbreakImage from "../assets/images/Outbreak.png"
import fkImage from "../assets/images/freaky_hollow.png"
import raturuImage from "../assets/images/raturu.png"
import cyberImage from "../assets/images/Cyber Security Learning Web.png";
import runImage from "../assets/images/RUUUNNN.png";
import spaceImage from "../assets/images/Space Shooter.png";


// TypeScript interfaces
interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  video?: string; // Optional video file for hover preview
  download?: string; // Optional download link
}

interface FeaturedProjectCardProps {
  project: Project;
}

// --- Reusable Grid Pattern (from other sections) ---
const GridPattern = () => (
  <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-10 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
);

// --- Interactive Image/Video Component ---
const InteractiveMedia = ({ project }: { project: Project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (project.video && videoLoaded) {
      // Delay video appearance slightly for smooth transition
      setTimeout(() => setShowVideo(true), 200);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowVideo(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset video to start
    }
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
    if (videoRef.current && showVideo) {
      videoRef.current.play().catch(console.error);
    }
  };

  const handleVideoCanPlay = () => {
    if (videoRef.current && showVideo && isHovered) {
      videoRef.current.play().catch(console.error);
    }
  };

  return (
    <div 
      className="relative w-full h-64 md:h-72 lg:h-full overflow-hidden group/media"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
    >
      {/* Static Image */}
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        decoding="async"
        className={`w-full h-full object-cover object-center transition-all duration-500 ${
          isHovered ? 'scale-105' : ''
        } ${showVideo && project.video ? 'opacity-0' : 'opacity-100'}`}
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://placehold.co/800x600/ffedd5/f97316?text=IMAGE+N/A";
        }}
      />
      
      {/* Video Overlay */}
      {project.video && (
        <video
          ref={videoRef}
          src={project.video}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={handleVideoLoad}
          onCanPlay={handleVideoCanPlay}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ${
            showVideo ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
          onError={() => {
            console.warn(`Failed to load video: ${project.video}`);
            setVideoLoaded(false);
            setShowVideo(false);
          }}
        />
      )}
      
      {/* Play Indicator */}
      {project.video && !showVideo && videoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover/media:opacity-100 group-active:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 rounded-full p-2 sm:p-3 shadow-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-blue-600 sm:w-6 sm:h-6">
              <path d="M8 5v14l11-7z" fill="currentColor"/>
            </svg>
          </div>
        </div>
      )}
      
      {/* Hover Hint */}
      {project.video && !isHovered && videoLoaded && (
        <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/media:opacity-100 transition-opacity duration-300 hidden sm:block">
          Hover to preview
        </div>
      )}
      
      {/* Mobile Tap Hint */}
      {project.video && !isHovered && videoLoaded && (
        <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-active:opacity-100 transition-opacity duration-300 sm:hidden">
          Tap to preview
        </div>
      )}
    </div>
  );
};

// --- Reusable Animated Title (from other sections) ---
const AnimatedTitle = ({ text }: { text: string }) => {
  return (
    <h2 className="text-4xl md:text-5xl font-bold mb-4">
      <span className="bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
        {text}
      </span>
    </h2>
  );
};

// --- Project Card for the FEATURED project ---
const FeaturedProjectCard = ({ project }: FeaturedProjectCardProps) => {
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
      className="group relative rounded-3xl backdrop-blur-sm bg-white border border-blue-200/50 shadow-lg hover:shadow-xl hover:shadow-blue-800/10 transition-all duration-300"
    >
      {/* Floating accent elements */}
      <div className="absolute bottom-6 left-6 w-1 h-1 bg-blue-600 rounded-full animate-ping"></div>
      <div className="relative rounded-3xl overflow-hidden flex flex-col lg:flex-row">
        <div className="relative lg:w-3/5">
          <InteractiveMedia project={project} />
        </div>
        <div className="p-8 lg:w-2/5 flex flex-col">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">
            {project.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech: string) => (
              <span
                key={tech}
                className="px-2 py-1 bg-blue-500/10 text-blue-700 rounded-md text-xs border border-blue-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex space-x-4 mt-auto pt-4 border-t border-blue-200/50">
            {project.download && (
              <a
                href={project.download}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                <Download size={18} />
                <span>Itch.io</span>
              </a>
            )}
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
    },
    {
      title: "Outbreak",
      description:
        "A fpp zombie survival game. Features graphical improvements, post processing effects, enemy AI, and a real-time inventory system.",
      tech: ["Unity", "C#", "Blender"],
      image: outbreakImage,
      video: "/videos/outbreak-demo.mp4", 
    },
    {
      title: "Raturu Home Fever",
      description:
        "This is the game that our team created at GIMJAM ITB. A simple horror game when the the main character, who has a fever, is brought into a dream world and must face several obstacles to get out of the dream and finish the game",
      tech: ["Unity", "C#", "Blender"],
      image: raturuImage,
      video: "/videos/raturu-demo.mp4", 
      download: "https://baraaaa.itch.io/raturu-home-fever",
    },
    {
      title: "Freaky Hollow",
      description:
        "A 2D Platformer Game based on Hollow Knight references. It can dash, jump, wall jump, wall slide, and attack enemies. The game features a simple scoring system based on the number of enemies defeated.",
      tech: ["Unity", "C#", "Aseprite"],
      image: fkImage,
      video: "/videos/freaky-demo.mp4",
    },
    {
      title: "Cyber Security Learning Web",
      description:
        "A web application designed to educate users about cyber security threats and best practices. I can't publish for the sake of privacy, but it includes interactive lessons, quizzes, and a dashboard for tracking progress.",
      tech: ["React", "TypeScript", "Node.js", "Firebase"],
      image: cyberImage, 
    },
    {
      title: "RUUUNNN",
      description:
        "A simple endless runner game featuring raycast for detecting obstacles, collectible (coins) add +100 score, and can really jump HIGH. There is no specific goal in this game what player do it's actually just run",
      tech: ["Unity", "C#", "Blender"],
      image: runImage, 
      video: "/videos/puzzle-quest-demo.mp4", 
    },
    {
      title: "Ultimate Rizzler",
      description:
        "An Space Shooter game also the first game i created. Like the other space shooter game, you can move left and right, and shoot. The game features a simple scoring system based on the number of enemies defeated.  And in this game we fighting PAPI LEBRON and BIG BLACK PAPI LEBRON for the bosses",
      tech: ["Unity", "C#", "Aseprite"],
      image: spaceImage,  
      video: "/videos/ai-chat-demo.mp4", 
    },
  ];

  const featuredProject = projects[0];
  const otherProjects = projects.slice(1);

  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  return (
    <section id="projects" className="py-20 relative overflow-hidden bg-white">
      <GridPattern />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <AnimatedTitle text="Projects" />
          <div className="w-24 h-1 bg-gradient-to-r from-blue-800 to-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto">
            A selection of my projects. Each represents a unique challenge and a
            story of development.
          </p>
        </div>

        <div className="space-y-16">
          {/* Featured Project Section */}
          <div>
            <h3 className="text-2xl font-mono text-blue-700 mb-4 pl-4 border-l-4 border-blue-600">
              [ Featured Project ]
            </h3>
            <FeaturedProjectCard project={featuredProject} />
          </div>

          {/* Archived Files Section (Tabbed Interface) */}
          {otherProjects.length > 0 && (
            <div>
              <h3 className="text-2xl font-mono text-blue-700 mb-4 pl-4 border-l-4 border-blue-600">
                [ Other Projects ]
              </h3>
              <div className="relative flex flex-col md:flex-row gap-8 rounded-3xl p-4 backdrop-blur-sm bg-white border border-blue-200/50 shadow-lg hover:shadow-xl hover:shadow-blue-800/10 transition-all duration-300">                {/* File Tabs */}
                <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible md:w-1/4 pb-2 md:pb-0 border-b-2 md:border-b-0 md:border-r-2 border-blue-200/50">
                  {otherProjects.map((project, index) => (
                    <button
                      key={project.title}
                      onClick={() => setSelectedProjectIndex(index)}
                      className={`relative text-left w-full px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-md whitespace-nowrap ${selectedProjectIndex === index
                          ? "text-blue-700"
                          : "text-gray-500 hover:bg-blue-100/50 hover:text-blue-600"
                        }`}
                    >
                      {selectedProjectIndex === index && (
                        <motion.div
                          layoutId="active-tab-highlight"
                          className="absolute inset-0 bg-gradient-to-r from-blue-200/80 to-blue-300/80 rounded-md"
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
                        <div className="relative rounded-lg overflow-hidden border border-blue-200/50 shadow-sm">
                          <InteractiveMedia project={otherProjects[selectedProjectIndex]} />
                        </div>
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
                                className="px-2 py-1 bg-blue-500/10 text-blue-700 rounded-md text-xs border border-blue-500/20"
                              >
                                {tech}
                              </span>
                            )
                          )}
                        </div>
                        <div className="flex space-x-4 mt-auto pt-4 border-t border-blue-200/50">
                          {otherProjects[selectedProjectIndex].download && (
                            <a
                              href={otherProjects[selectedProjectIndex].download}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                            >
                              <Download size={18} />
                              <span>Download</span>
                            </a>
                          )}
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
