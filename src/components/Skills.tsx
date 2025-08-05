"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  SiUnity,
  SiSharp,  
  SiReact,
  SiThreedotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiBlender,
  SiGit,
  SiVite,
} from "react-icons/si";
import { FaPaintBrush } from "react-icons/fa"; // For fallback icons
import AsepriteIcon from "../assets/icons/aseprite.png";

// --- Animated Title (matching About.tsx) ---
const AnimatedTitle = ({ text }: { text: string }) => {
  return (
    <h2 className="text-4xl md:text-5xl font-bold mb-4">
      <span className="bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
        {text}
      </span>
    </h2>
  );
};

// --- Skill Icon Component ---
function SkillIcon({
  skillName,
  level,
  isHovered,
}: {
  skillName: string;
  level: string;
  isHovered: boolean;
}) {
  // Get the appropriate icon for each skill
  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "unity":
        return SiUnity;
      case "c#":
        return SiSharp;
      case "react":
        return SiReact;
      case "three.js":
        return SiThreedotjs;
      case "typescript":
        return SiTypescript;
      case "javascript":
        return SiJavascript;
      case "node.js":
        return SiNodedotjs;
      case "blender":
        return SiBlender;
      case "git":
        return SiGit;
      case "vite":
        return SiVite;
      case "aseprite":
        return "image"; // Special case for image
      default:
        return FaPaintBrush;
    }
  };

  // Get skill level color (keeping your blue theme)
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "expert":
        return "#1e40af"; // Dark blue
      case "advanced":
        return "#2563eb"; // Medium blue
      case "intermediate":
        return "#3b82f6"; // Blue
      default:
        return "#60a5fa"; // Light blue
    }
  };

  const IconComponent = getIcon(skillName);
  const iconColor = getLevelColor(level);

  return (
    <div className="relative flex items-center justify-center h-full w-full">
      <motion.div
        animate={{
          scale: isHovered ? 1.15 : 1,
          rotate: isHovered ? 5 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative"
      >
        {/* Handle special case for Aseprite image */}
        {IconComponent === "image" ? (
          <img
            src={AsepriteIcon}
            alt={skillName}
            className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 object-contain"
            style={{
              filter: isHovered ? `drop-shadow(0 0 20px ${iconColor}40) brightness(1.1)` : 'brightness(0.9)',
              transition: 'all 0.3s ease',
            }}
          />
        ) : (
          <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 flex items-center justify-center">
            <IconComponent
              className="w-full h-full"
              style={{
                color: iconColor,
                filter: isHovered ? `drop-shadow(0 0 20px ${iconColor}40)` : 'none',
                transition: 'all 0.3s ease',
              }}
            />
          </div>
        )}
        {/* Subtle background glow */}
        {isHovered && (
          <div
            className="absolute inset-0 rounded-full blur-xl opacity-30"
            style={{
              backgroundColor: iconColor,
              transform: 'scale(1.5)',
            }}
          />
        )}
      </motion.div>
    </div>
  );
}

// Loading placeholder that matches the theme
const SkillCardPlaceholder = () => (
  <div className="relative h-40 sm:h-44 md:h-48 flex-shrink-0 border-b-2 border-blue-200/50">
    <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 to-transparent"></div>
    <div className="absolute top-0 left-0 w-full h-0.5 bg-blue-600/80 animate-pulse"></div>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  </div>
);

function SkillCard({
  skill,
}: {
  skill: {
    name: string;
    level: string;
  };
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className="group relative rounded-2xl border border-blue-200/50 shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-800/10 hover:border-blue-300/60 backdrop-blur-sm bg-white flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-72 active:scale-95 touch-manipulation"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div className="absolute -inset-px bg-gradient-to-r from-blue-800 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
      <div className="relative rounded-2xl flex flex-col h-full overflow-hidden">
        <div className="relative h-40 sm:h-44 md:h-48 flex-shrink-0 border-b-2 border-blue-200/50">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-0.5 bg-blue-600/80 animate-pulse group-hover:bg-blue-700"></div>
          {inView ? (
            <SkillIcon 
              skillName={skill.name} 
              level={skill.level} 
              isHovered={isHovered} 
            />
          ) : (
            <SkillCardPlaceholder />
          )}
        </div>
        <div
          className="p-4 sm:p-5 flex-grow bg-white/20"
          style={{
            backgroundImage:
              "radial-gradient(rgba(37, 99, 235, 0.03) 1px, transparent 1px)",
            backgroundSize: "0.5rem 0.5rem",
          }}
        >
          <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-1">{skill.name}</h3>
          <p className="text-sm text-blue-700 font-semibold mb-3">
            {skill.level}
          </p>
        </div>
      </div>
    </div>
  );
}

// --- Enhanced Carousel Component with Better Mobile Support ---
const SkillCarousel = ({
  category,
  skills,
}: {
  category: string;
  skills: {
    name: string;
    level: string;
  }[];
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Enhanced touch/mouse drag handling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="mb-8 sm:mb-12">
      <h3 className="text-xl sm:text-2xl font-mono text-blue-700 mb-3 sm:mb-4 pl-3 sm:pl-4 border-l-4 border-blue-600">
        {category}
      </h3>
      <div className="relative">
        <motion.div
          ref={scrollRef}
          className="flex space-x-3 sm:space-x-4 md:space-x-6 lg:space-x-8 overflow-x-auto pb-4 px-2 sm:px-4 md:px-0 snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing horizontal-scrollbar touch-scroll"
          style={{
            scrollBehavior: isDragging ? 'auto' : 'smooth',
            WebkitTapHighlightColor: 'transparent'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleEnd}
          whileTap={{ cursor: "grabbing" }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ root: scrollRef, once: true }}
              className="snap-center no-select"
              style={{ 
                pointerEvents: isDragging ? 'none' : 'auto'
              }}
            >
              <SkillCard skill={skill} />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Enhanced Mobile scroll indicator */}
        <div className="block sm:hidden text-center mt-2">
          <p className="text-xs text-gray-500 animate-pulse">← Drag or swipe to explore more →</p>
        </div>
        
        {/* Desktop navigation arrows */}
        <div className="hidden md:block">
          <button
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
              }
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-blue-200 rounded-full p-2 shadow-lg transition-all duration-300 hover:shadow-xl z-10 opacity-0 group-hover:opacity-100"
            aria-label={`Scroll ${category} skills left`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-blue-600">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
              }
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-blue-200 rounded-full p-2 shadow-lg transition-all duration-300 hover:shadow-xl z-10 opacity-0 group-hover:opacity-100"
            aria-label={`Scroll ${category} skills right`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-blue-600">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Skills() {
  // --- Data now organized by category ---
  const skillsData = {
    gameDev: [
      {
        name: "Unity",
        level: "Advanced",
      },
      {
        name: "C#",
        level: "Intermediate",
      },
    ],
    frontend: [
      {
        name: "React",
        level: "Learning",
      },
      {
        name: "Three.js",
        level: "Learning",
      },
      {
        name: "TypeScript",
        level: "Learning",
      },
      {
        name: "JavaScript",
        level: "Learning",
      },
    ],
    backend: [
      {
        name: "Node.js",
        level: "Learning",
      },
      {
        name: "Blender",
        level: "Basic",
      },
      {
        name: "Aseprite",
        level: "Intermediate",
      },
      {
        name: "Git",
        level: "Advanced",
      },
      {
        name: "Vite",
        level: "Basic",
      },
    ],
  };
  return (
    <section id="skills" className="py-20 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <AnimatedTitle text="Skills" />
          <div className="w-24 h-1 bg-gradient-to-r from-blue-800 to-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto">
            A curated collection of my core competencies. Drag to explore each
            category.
          </p>
        </div>

        <div className="space-y-12 sm:space-y-16">
          <div className="group">
            <SkillCarousel
              category="Game Development"
              skills={skillsData.gameDev}
            />
          </div>
          <div className="group">
            <SkillCarousel category="Frontend" skills={skillsData.frontend} />
          </div>
          <div className="group">
            <SkillCarousel
              category="Backend & Tools"
              skills={skillsData.backend}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
