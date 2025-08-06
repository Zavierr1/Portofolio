"use client";

import { useState } from "react";
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

// --- Compact Skill Icon Component ---
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
          scale: isHovered ? 1.1 : 1,
          rotate: isHovered ? 3 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative"
      >
        {/* Handle special case for Aseprite image */}
        {IconComponent === "image" ? (
          <img
            src={AsepriteIcon}
            alt={skillName}
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain"
            style={{
              filter: isHovered
                ? `drop-shadow(0 0 12px ${iconColor}40) brightness(1.1)`
                : "brightness(0.9)",
              transition: "all 0.3s ease",
            }}
          />
        ) : (
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center">
            <IconComponent
              className="w-full h-full"
              style={{
                color: iconColor,
                filter: isHovered
                  ? `drop-shadow(0 0 12px ${iconColor}40)`
                  : "none",
                transition: "all 0.3s ease",
              }}
            />
          </div>
        )}
        {/* Subtle background glow */}
        {isHovered && (
          <div
            className="absolute inset-0 rounded-full blur-lg opacity-20"
            style={{
              backgroundColor: iconColor,
              transform: "scale(1.3)",
            }}
          />
        )}
      </motion.div>
    </div>
  );
}

// --- Compact Skill Card Component ---
function SkillCard({
  skill,
  index,
}: {
  skill: {
    name: string;
    level: string;
  };
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-xl border border-blue-200/50 shadow-sm hover:shadow-lg hover:shadow-blue-800/10 hover:border-blue-300/60 backdrop-blur-sm bg-white transition-all duration-300 active:scale-95 touch-manipulation"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div className="absolute -inset-px bg-gradient-to-r from-blue-800 to-blue-600 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
      <div className="relative rounded-xl flex flex-col h-full overflow-hidden p-4">
        {/* Icon Section */}
        <div className="relative h-16 sm:h-20 flex items-center justify-center mb-3">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/60 to-transparent rounded-lg"></div>
          <SkillIcon
            skillName={skill.name}
            level={skill.level}
            isHovered={isHovered}
          />
        </div>

        {/* Content Section */}
        <div className="text-center">
          <h3 className="text-sm sm:text-base font-bold text-blue-800 mb-1 leading-tight">
            {skill.name}
          </h3>
          <p className="text-xs sm:text-sm text-blue-600 font-medium">
            {skill.level}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// --- Clean Grid Component ---
const SkillGrid = ({
  category,
  skills,
}: {
  category: string;
  skills: {
    name: string;
    level: string;
  }[];
}) => {
  return (
    <div className="mb-8 sm:mb-12">
      <h3 className="text-lg sm:text-xl font-mono text-blue-700 mb-4 sm:mb-6 pl-3 sm:pl-4 border-l-4 border-blue-600">
        {category}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
        {skills.map((skill, index) => (
          <SkillCard key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </div>
  );
};

export default function Skills() {
  // --- Data organized by category for clean display ---
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
    tools: [
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
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-10 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <AnimatedTitle text="Skills" />
          <div className="w-24 h-1 bg-gradient-to-r from-blue-800 to-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto">
            My technical expertise across different domains. All skills are
            immediately visible for easy browsing.
          </p>
        </div>

        <div className="space-y-8 sm:space-y-12">
          <SkillGrid category="Game Development" skills={skillsData.gameDev} />
          <SkillGrid
            category="Frontend Development"
            skills={skillsData.frontend}
          />
          <SkillGrid
            category="Tools & Technologies"
            skills={skillsData.tools}
          />
        </div>
      </div>
    </section>
  );
}
