"use client";

import { Download } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";

// --- Import images for projects ---
import vrProjectImage from "../assets/images/vr_map2_T.png";
import outbreakImage from "../assets/images/Outbreak.png";
import fkImage from "../assets/images/freaky_hollow.png";
import raturuImage from "../assets/images/raturu.png";
import cyberImage from "../assets/images/Cyber Security Learning Web.png";
import runImage from "../assets/images/RUUUNNN.png";
import spaceImage from "../assets/images/Space Shooter.png";
import DebtorImage from "../assets/images/Debtor.png"
import FragmentImage from "../assets/images/Memori.png"

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
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = async () => {
    setIsHovered(true);
    if (project.video && videoRef.current) {
      try {
        await videoRef.current.play();
      } catch (error) {
        console.error("Failed to play video:", error);
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
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
          isHovered && project.video ? "opacity-30" : "opacity-100"
        }`}
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
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ${
            isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
          }`}
          onError={(e) => {
            console.error("Video error:", e);
          }}
        />
      )}

      {/* Play Indicator */}
      {project.video && !isHovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover/media:opacity-100 group-active:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 rounded-full p-2 sm:p-3 shadow-lg">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="text-blue-600 sm:w-6 sm:h-6"
            >
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          </div>
        </div>
      )}

      {/* Hover Hint */}
      {project.video && !isHovered && (
        <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/media:opacity-100 transition-opacity duration-300 hidden sm:block">
          Hover to preview
        </div>
      )}

      {/* Mobile Tap Hint */}
      {project.video && !isHovered && (
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
  // Featured projects - moved Raturu, Cyber Web, and Outbreak here
  const featuredProjects: Project[] = [
    {
      title: "VR 3D Assessment Game",
      description:
        "An immersive virtual reality experience developed in Unity for corporate training. Features complex interaction systems, performance tracking, and a dynamic environment that reacts to user input.",
      tech: ["Unity", "C#", "Oculus SDK", "Blender"],
      image: vrProjectImage,
    },
    {
      title: "Life as Debt Collector",
      description:
        "A repetitive simulator games when player play as Debt Collector. Like the other simulator games you just do a missions and complete it and then repeat.",
      tech: ["Unity", "C#", "Blender"],
      image: DebtorImage,
      video: "/videos/debtor.mp4",
      download: "https://riuto.itch.io/life-as-debt-collector"
    },
    {
      title: "Cyber Security Learning Web",
      description:
        "A web application designed to educate users about cyber security threats and best practices. I can't publish for the sake of privacy, but it includes interactive lessons, quizzes, and a dashboard for tracking progress.",
      tech: ["React", "TypeScript", "Node.js", "Firebase"],
      image: cyberImage,
    },
    {
      title: "Raturu Home Fever",
      description:
        "A horror game when the the main character, who has a fever, is brought into a dream world and must face several obstacles to get out of the dream and finish the game",
      tech: ["Unity", "C#", "Blender"],
      image: raturuImage,
      video: "/videos/raturu.mp4",
      download: "https://baraaaa.itch.io/raturu-home-fever",
    },
    {
      title: "Outbreak",
      description:
        "A fpp zombie survival game. Features graphical improvements, post processing effects, enemy AI, and a real-time inventory system.",
      tech: ["Unity", "C#", "Blender"],
      image: outbreakImage,
      video: "/videos/outbreak.mp4",
    },
  ];

  // Other projects - remaining projects
  const otherProjects: Project[] = [
    {
      title: "Memory Fragment",
      description:
        "A simple game when you dont know the purpose what you doing in the game hahaha",
      tech: ["Unity", "C#", "Blender"],
      image: FragmentImage,
      video: "/videos/Fragment.mp4",
      download: "https://garoxxiz.itch.io/memory-fragment"
    },
    {
      title: "Freaky Hollow",
      description:
        "A 2D Platformer Game based on Hollow Knight references. It can dash, jump, wall jump, wall slide, and attack enemies. The game features a simple scoring system based on the number of enemies defeated.",
      tech: ["Unity", "C#", "Aseprite"],
      image: fkImage,
      video: "/videos/freaky.mp4",
    },
    {
      title: "RUUUNNN",
      description:
        "A simple endless runner game featuring raycast for detecting obstacles, collectible (coins) add +100 score, and can really jump HIGH. There is no specific goal in this game what player do it's actually just run",
      tech: ["Unity", "C#", "Blender"],
      image: runImage,
      video: "/videos/run.mp4",
    },
    {
      title: "Ultimate Rizzler",
      description:
        "An Space Shooter game also the first game i created. Like the other space shooter game, you can move left and right, and shoot. The game features a simple scoring system based on the number of enemies defeated.  And in this game we fighting PAPI LEBRON and BIG BLACK PAPI LEBRON for the bosses",
      tech: ["Unity", "C#", "Aseprite"],
      image: spaceImage,
      video: "/videos/space-shooter.mp4",
    },
  ];

  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Touch gesture handling for featured projects
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Auto-advance featured projects
  useEffect(() => {
    if (!isAutoPlaying || featuredProjects.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentFeaturedIndex((prev) =>
        prev === featuredProjects.length - 1 ? 0 : prev + 1
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredProjects.length]);

  // Pause auto-play on hover/touch
  const handleFeaturedMouseEnter = () => setIsAutoPlaying(false);
  const handleFeaturedMouseLeave = () => setIsAutoPlaying(true);

  // Touch gesture functions
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Swipe left - next project
      setCurrentFeaturedIndex(
        currentFeaturedIndex === featuredProjects.length - 1
          ? 0
          : currentFeaturedIndex + 1
      );
    }
    if (isRightSwipe) {
      // Swipe right - previous project
      setCurrentFeaturedIndex(
        currentFeaturedIndex === 0
          ? featuredProjects.length - 1
          : currentFeaturedIndex - 1
      );
    }
  };

  // Touch gesture functions for other projects
  const onOtherTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onOtherTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onOtherTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Swipe left - next project
      setSelectedProjectIndex(
        selectedProjectIndex === otherProjects.length - 1
          ? 0
          : selectedProjectIndex + 1
      );
    }
    if (isRightSwipe) {
      // Swipe right - previous project
      setSelectedProjectIndex(
        selectedProjectIndex === 0
          ? otherProjects.length - 1
          : selectedProjectIndex - 1
      );
    }
  };

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
          {/* Featured Projects Section */}
          <div>
            <h3 className="text-2xl font-mono text-blue-700 mb-4 pl-4 border-l-4 border-blue-600">
              [ Featured Projects ]
            </h3>

            {/* Featured Projects Carousel */}
            <div
              className="relative"
              onMouseEnter={handleFeaturedMouseEnter}
              onMouseLeave={handleFeaturedMouseLeave}
            >
              <div
                className="overflow-hidden rounded-3xl"
                onTouchStart={(e) => {
                  handleFeaturedMouseEnter();
                  onTouchStart(e);
                }}
                onTouchMove={onTouchMove}
                onTouchEnd={() => {
                  handleFeaturedMouseLeave();
                  onTouchEnd();
                }}
              >
                <motion.div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentFeaturedIndex * 100}%)`,
                  }}
                >
                  {featuredProjects.map((project) => (
                    <div key={project.title} className="w-full flex-shrink-0">
                      <FeaturedProjectCard project={project} />
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Navigation Dots - Desktop Only */}
              <div className="hidden md:flex justify-center mt-6 space-x-2">
                {featuredProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFeaturedIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentFeaturedIndex === index
                        ? "bg-blue-600 scale-125"
                        : "bg-blue-300 hover:bg-blue-400"
                    }`}
                    aria-label={`Go to featured project ${index + 1}`}
                  />
                ))}
              </div>

              {/* Desktop Navigation Arrows */}
              <div className="hidden md:block">
                <button
                  onClick={() =>
                    setCurrentFeaturedIndex(
                      currentFeaturedIndex === 0
                        ? featuredProjects.length - 1
                        : currentFeaturedIndex - 1
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-blue-200 rounded-full p-3 shadow-lg transition-all duration-300 hover:shadow-xl z-10"
                  aria-label="Previous featured project"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-blue-600"
                  >
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <button
                  onClick={() =>
                    setCurrentFeaturedIndex(
                      currentFeaturedIndex === featuredProjects.length - 1
                        ? 0
                        : currentFeaturedIndex + 1
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-blue-200 rounded-full p-3 shadow-lg transition-all duration-300 hover:shadow-xl z-10"
                  aria-label="Next featured project"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-blue-600"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Mobile swipe indicator */}
              <div className="block md:hidden text-center mt-2 mb-4">
                <p className="text-xs text-gray-400 animate-pulse">
                  ← Swipe to navigate →
                </p>
              </div>

              {/* Mobile Navigation Arrows - Consistent with Other Projects */}
              <div className="flex md:hidden justify-between items-center mt-2 px-2">
                <button
                  onClick={() =>
                    setCurrentFeaturedIndex(
                      currentFeaturedIndex === 0
                        ? featuredProjects.length - 1
                        : currentFeaturedIndex - 1
                    )
                  }
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 active:bg-blue-200 border border-blue-200 rounded-lg transition-colors duration-200 touch-manipulation"
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-blue-600"
                  >
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm text-blue-600">Previous</span>
                </button>

                <div className="flex space-x-1">
                  {featuredProjects.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentFeaturedIndex === index
                          ? "bg-blue-600"
                          : "bg-blue-300"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() =>
                    setCurrentFeaturedIndex(
                      currentFeaturedIndex === featuredProjects.length - 1
                        ? 0
                        : currentFeaturedIndex + 1
                    )
                  }
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 active:bg-blue-200 border border-blue-200 rounded-lg transition-colors duration-200 touch-manipulation"
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  <span className="text-sm text-blue-600">Next</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-blue-600"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Other Projects Section (Improved Mobile Navigation) */}
          {otherProjects.length > 0 && (
            <div>
              <h3 className="text-2xl font-mono text-blue-700 mb-4 pl-4 border-l-4 border-blue-600">
                [ Other Projects ]
              </h3>
              <div className="relative flex flex-col md:flex-row gap-6 md:gap-8 rounded-3xl p-4 md:p-6 backdrop-blur-sm bg-white border border-blue-200/50 shadow-lg hover:shadow-xl hover:shadow-blue-800/10 transition-all duration-300">
                {/* Mobile-Optimized File Tabs */}
                <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible md:w-1/4 pb-2 md:pb-0 border-b-2 md:border-b-0 md:border-r-2 border-blue-200/50 gap-2 md:gap-0 horizontal-scrollbar touch-scroll">
                  {otherProjects.map((project, index) => (
                    <button
                      key={project.title}
                      onClick={() => setSelectedProjectIndex(index)}
                      className={`relative text-left flex-shrink-0 md:w-full px-3 md:px-4 py-2 md:py-3 text-sm font-medium transition-all duration-300 rounded-lg md:rounded-md touch-manipulation active:scale-95 ${
                        selectedProjectIndex === index
                          ? "text-blue-700 bg-gradient-to-r from-blue-200/80 to-blue-300/80 shadow-sm"
                          : "text-gray-500 hover:bg-blue-100/50 hover:text-blue-600 active:bg-blue-200/50"
                      }`}
                      style={{
                        minWidth: "max-content",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      {selectedProjectIndex === index && (
                        <motion.div
                          layoutId="active-tab-highlight"
                          className="absolute inset-0 bg-gradient-to-r from-blue-200/80 to-blue-300/80 rounded-lg md:rounded-md"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                      <span className="relative z-10 whitespace-nowrap md:whitespace-normal">
                        {project.title}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Mobile scroll indicator for tabs */}
                <div className="block md:hidden text-center -mt-1 mb-2">
                  <p className="text-xs text-gray-400">
                    ← Swipe tabs to navigate →
                  </p>
                </div>

                {/* Enhanced Content Pane with Touch Support */}
                <div
                  className="md:w-3/4 relative min-h-[350px] md:min-h-[300px]"
                  onTouchStart={onOtherTouchStart}
                  onTouchMove={onOtherTouchMove}
                  onTouchEnd={onOtherTouchEnd}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedProjectIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="flex flex-col md:flex-row gap-4 md:gap-6 h-full"
                    >
                      <div className="md:w-1/2">
                        <div className="relative rounded-xl overflow-hidden border border-blue-200/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                          <InteractiveMedia
                            project={otherProjects[selectedProjectIndex]}
                          />
                        </div>
                      </div>
                      <div className="md:w-1/2 flex flex-col">
                        <h4 className="text-lg md:text-xl font-bold text-blue-800 mb-3 md:hidden">
                          {otherProjects[selectedProjectIndex].title}
                        </h4>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 flex-grow">
                          {otherProjects[selectedProjectIndex].description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {otherProjects[selectedProjectIndex].tech.map(
                            (tech: string) => (
                              <span
                                key={tech}
                                className="px-2 py-1 bg-blue-500/10 text-blue-700 rounded-md text-xs border border-blue-500/20 transition-colors duration-200 hover:bg-blue-500/20"
                              >
                                {tech}
                              </span>
                            )
                          )}
                        </div>
                        <div className="flex space-x-4 mt-auto pt-4 border-t border-blue-200/50">
                          {otherProjects[selectedProjectIndex].download && (
                            <a
                              href={
                                otherProjects[selectedProjectIndex].download
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 active:text-blue-700 transition-colors duration-200 touch-manipulation"
                              style={{ WebkitTapHighlightColor: "transparent" }}
                            >
                              <Download size={18} />
                              <span>Itch.Io</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Mobile swipe indicator for other projects */}
                  <div className="block md:hidden text-center mt-2 mb-4">
                    <p className="text-xs text-gray-400 animate-pulse">
                      ← Swipe content area to navigate →
                    </p>
                  </div>

                  {/* Mobile Navigation Arrows for Other Projects */}
                  <div className="flex md:hidden justify-between items-center mt-2 px-2">
                    <button
                      onClick={() =>
                        setSelectedProjectIndex(
                          selectedProjectIndex === 0
                            ? otherProjects.length - 1
                            : selectedProjectIndex - 1
                        )
                      }
                      className="flex items-center space-x-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 active:bg-blue-200 border border-blue-200 rounded-lg transition-colors duration-200 touch-manipulation"
                      style={{ WebkitTapHighlightColor: "transparent" }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-blue-600"
                      >
                        <path
                          d="M15 18L9 12L15 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-sm text-blue-600">Previous</span>
                    </button>

                    <div className="flex space-x-1">
                      {otherProjects.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            selectedProjectIndex === index
                              ? "bg-blue-600"
                              : "bg-blue-300"
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() =>
                        setSelectedProjectIndex(
                          selectedProjectIndex === otherProjects.length - 1
                            ? 0
                            : selectedProjectIndex + 1
                        )
                      }
                      className="flex items-center space-x-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 active:bg-blue-200 border border-blue-200 rounded-lg transition-colors duration-200 touch-manipulation"
                      style={{ WebkitTapHighlightColor: "transparent" }}
                    >
                      <span className="text-sm text-blue-600">Next</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-blue-600"
                      >
                        <path
                          d="M9 18L15 12L9 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
