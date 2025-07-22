"use client";

import { motion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

// --- NEW: Animated Title ---
// A cleaner title animation suitable for the new theme.
const AnimatedTitle = ({ text }: { text: string }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  const variants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        <span className="bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
          {text}
        </span>
      </h2>
    </motion.div>
  );
};

// --- UPDATED: Data Pod Component for the new theme ---
const DataPod = ({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const variants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 20, delay },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative backdrop-blur-sm bg-white border border-blue-200/50 rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-800/10 hover:border-blue-300/60"
    >
      <h3 className="text-xl font-bold text-blue-800 mb-4">{title}</h3>
      <div className="text-gray-700 leading-relaxed space-y-3">{children}</div>
    </motion.div>
  );
};

// --- NEW: Subtle background pattern component ---
export default function About() {
  return (
    <section id="about" className="py-20 relative overflow-hidden bg-white">
      {/* --- NEW: Subtle background pattern for visual texture --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <AnimatedTitle text="About Me" />
          <div className="w-24 h-1 bg-gradient-to-r from-blue-800 to-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* --- Pod 1: Bio --- */}
          <div className="lg:col-span-2">
            <DataPod title="[ Player Profile ]">
              <p>
                As a game developer, I focus on building engaging gameplay
                mechanics and immersive virtual worlds. I believe the best games
                come from a love for both the art and the science of creation.
                I'm constantly learning and enjoy turning complex ideas into
                fun, polished experiences.
              </p>
            </DataPod>
          </div>

          {/* --- Pod 2: Quick Stats --- */}
          <div className="lg:col-span-1">
            <DataPod title="[ Stats ]" delay={0.2}>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    Projects
                  </span>
                  <span className="font-bold text-blue-700">4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    Tech
                  </span>
                  <span className="font-bold text-blue-700">10+</span>
                </div>
              </div>
            </DataPod>
          </div>

          {/* --- Pod 3: Current Focus --- */}
          <div className="lg:col-span-3">
            <DataPod title="[ Current Focus ]" delay={0.4}>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <h4 className="font-semibold text-blue-800">
                      Building Interactive Experiences
                    </h4>
                    <p className="text-sm text-gray-600">
                      Crafting web apps and games
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <h4 className="font-semibold text-blue-800">
                      Learning & Experimenting
                    </h4>
                    <p className="text-sm text-gray-600">
                      Always exploring new tech and creative solutions
                    </p>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <p className="text-sm text-gray-500">
                    Ready for the next challenge 
                  </p>
                </div>
              </div>
            </DataPod>
          </div>
        </div>
      </div>
    </section>
  );
}
