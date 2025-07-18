"use client"

import { motion, type Variants } from "framer-motion"
import { useInView } from "react-intersection-observer"

// --- NEW: Animated Title ---
// A cleaner title animation suitable for the new theme.
const AnimatedTitle = ({ text }: { text: string }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
    
    const variants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={variants}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                    {text}
                </span>
            </h2>
        </motion.div>
    );
};


// --- UPDATED: Data Pod Component for the new theme ---
const DataPod = ({ title, children, delay = 0 }: { title: string, children: React.ReactNode, delay?: number }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const variants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { type: 'spring', stiffness: 80, damping: 20, delay } 
    }
  }

  return (
    <motion.div 
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative bg-white/60 border border-orange-200/50 rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-orange-300/80">
      <h3 className="text-xl font-bold text-orange-700 mb-4">{title}</h3>
      <div className="text-gray-700 leading-relaxed space-y-3">{children}</div>
    </motion.div>
  )
}

// --- NEW: Subtle background pattern component ---
const GridPattern = () => (
    <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-10 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
);


export default function About() {
  return (
    <section id="about" className="py-20 relative overflow-hidden bg-orange-50">
        
      {/* --- NEW: Subtle background pattern for visual texture --- */}
      <GridPattern />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <AnimatedTitle text="About Me" />
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
          {/* --- Pod 1: Bio --- */}
          <div className="lg:col-span-2">
              <DataPod title="[ My Story ]">
                  <p>
                    A Game Developer with a relentless passion for building interactive worlds. In just four months, I have moved from concept to creation, developing a range of games and proving my mettle in a high-pressure Game Jam.
                  </p>
                  <p>
                    My goal is to craft applications that not only function flawlessly but provide exceptional, memorable user experiences.
                  </p>
              </DataPod>
          </div>

          {/* --- Pod 2: Core Philosophy --- */}
          <DataPod title="[ Core Philosophy ]" delay={0.2}>
              <p>
                I believe that clean, maintainable code is the bedrock of any great project. My approach is rooted in user-centric design, ensuring every line of code serves a purpose in enhancing the final experience.
              </p>
          </DataPod>
          
          {/* --- Pod 3: Experience Log (Timeline) --- */}
          <div className="lg:col-span-3">
               <DataPod title="[ My Journey ]" delay={0.4}>
                  <div className="relative border-l-2 border-orange-200/90 pl-8 space-y-8">
                      {/* Timeline Item 1 */}
                      <div className="relative">
                          <div className="absolute -left-[42px] top-1 w-4 h-4 bg-orange-500 rounded-full border-4 border-orange-100 ring-4 ring-white"></div>
                          <p className="font-mono text-sm text-orange-600">Q1 2024</p>
                          <h4 className="font-semibold text-gray-800">Game Developer Concentration</h4>
                          <p className="text-sm text-gray-600">Embarked on an intensive learning path, focusing on the core principles of game development and software engineering.</p>
                      </div>
                      {/* Timeline Item 2 */}
                      <div className="relative">
                          <div className="absolute -left-[42px] top-1 w-4 h-4 bg-orange-500 rounded-full border-4 border-orange-100 ring-4 ring-white"></div>
                          <p className="font-mono text-sm text-orange-600">Q2 2024</p>
                          <h4 className="font-semibold text-gray-800">GIMJAM ITB (Game Jam)</h4>
                          <p className="text-sm text-gray-600">Competed in a 48-hour Game Jam, successfully designing, developing, and deploying a complete game under a strict deadline.</p>
                      </div>
                      <div className="relative">
                          <div className="absolute -left-[42px] top-1 w-4 h-4 bg-orange-500 rounded-full border-4 border-orange-100 ring-4 ring-white"></div>
                          <p className="font-mono text-sm text-orange-600">Q3 2024</p>
                          <h4 className="font-semibold text-gray-800">Mid Exam</h4>
                          <p className="text-sm text-gray-600">Applied my skills in a project-based examination, further solidifying my development process and problem-solving abilities.</p>
                      </div>
                      {/* Timeline Item 3 */}
                      <div className="relative">
                          <div className="absolute -left-[42px] top-1 w-4 h-4 bg-orange-500 rounded-full border-4 border-orange-100 ring-4 ring-white"></div>
                          <p className="font-mono text-sm text-orange-600">Present</p>
                          <h4 className="font-semibold text-gray-800">President University x PT. Mattel Indonesia</h4>
                          <p className="text-sm text-gray-600">Expanding my skill set by bridging gameplay with web platforms, utilizing React and Node.js to create interconnected experiences.</p>
                      </div>
                  </div>
              </DataPod>
          </div>
        </div>
      </div>
    </section>
  )
}
