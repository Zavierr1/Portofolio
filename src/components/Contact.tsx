"use client"

import type React from "react"
import { useState, useRef, Suspense, useMemo } from "react"
import emailjs from "@emailjs/browser"
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, AlertTriangle } from "lucide-react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Stars, Float } from "@react-three/drei"
import { motion, type Variants } from "framer-motion"
import { useInView } from "react-intersection-observer"
import * as THREE from "three"

// --- ENHANCED: Mouse-Reactive Transmission Background ---
function TransmissionBackground() {
  const { viewport, mouse } = useThree();
  const particlesRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  const particles = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 15;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
        positions[i * 3 + 2] = Math.random() * -60;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    // Animate background particles
    if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 2] += delta * 12;
            if (positions[i + 2] > 10) {
                positions[i + 2] = -50;
            }
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
    
    // Make the whole scene react to mouse movement for a parallax effect
    if (groupRef.current) {
      const x = (mouse.x * viewport.width) / 100;
      const y = (mouse.y * viewport.height) / 100;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x, 0.02);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y, 0.02);
    }
  });

  return (
    <group ref={groupRef}>
        <Stars radius={80} depth={50} count={5000} factor={7} saturation={0} fade speed={1.5} />
        <points ref={particlesRef}>
            <bufferGeometry attach="geometry">
                <bufferAttribute attach="attributes-position" 
                args={[particles, 3]} />
            </bufferGeometry>
            <pointsMaterial attach="material" size={0.05} color="#ef4444" />
        </points>
        <Float speed={0.5} rotationIntensity={1} floatIntensity={1.5}>
           <mesh position={[5, -5, -20]}>
               <icosahedronGeometry args={[0.5, 0]} />
               <meshStandardMaterial wireframe color="#f87171" emissive="#f87171" emissiveIntensity={0.2} />
           </mesh>
        </Float>
         <Float speed={0.7} rotationIntensity={0.8} floatIntensity={1.2}>
           <mesh position={[-5, 5, -30]}>
               <boxGeometry args={[0.8, 0.8, 0.8]} />
               <meshStandardMaterial wireframe color="#fca5a5" emissive="#fca5a5" emissiveIntensity={0.2} />
           </mesh>
        </Float>
         <Float speed={0.6} rotationIntensity={1.2} floatIntensity={1}>
           <mesh position={[6, 6, -45]}>
               <torusKnotGeometry args={[0.4, 0.08, 100, 16]}/>
               <meshStandardMaterial wireframe color="#ef4444" emissive="#ef4444" emissiveIntensity={0.1} />
           </mesh>
        </Float>
    </group>
  );
}

// --- Reusable Glitch Title (Unchanged) ---
const GlitchTitle = ({ text }: { text: string }) => (
  <h2 className="text-4xl md:text-5xl font-bold mb-4 glitch-container" data-text={text}>
      <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">{text}</span>
  </h2>
)

// --- ENHANCED: Interactive Globe with Pulsing Rings ---
const ContactGlobe = () => {
  const groupRef = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.MeshStandardMaterial>(null);
  const ring2 = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
      if(groupRef.current) {
          groupRef.current.rotation.y += 0.002;
      }
      // Create a subtle pulsing effect on the rings
      if(ring1.current && ring2.current) {
          const pulse = (Math.sin(clock.getElapsedTime() * 2) + 1) / 2; // oscillates between 0 and 1
          ring1.current.emissiveIntensity = 0.3 + pulse * 0.5;
          ring2.current.emissiveIntensity = 0.3 + (1-pulse) * 0.5;
      }
  })
  return (
      <group ref={groupRef}>
          <mesh>
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial wireframe color="#ef4444" emissive="#ef4444" emissiveIntensity={0.1} />
          </mesh>
          <mesh rotation-x={Math.PI / 2}>
              <torusGeometry args={[1.2, 0.01, 16, 100]} />
              <meshStandardMaterial ref={ring1} color="#f87171" emissive="#f87171" />
          </mesh>
          <mesh rotation-x={Math.PI / 2} rotation-y={Math.PI / 4}>
              <torusGeometry args={[1.4, 0.008, 16, 100]} />
              <meshStandardMaterial ref={ring2} color="#fca5a5" emissive="#fca5a5" />
          </mesh>
      </group>
  )
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<"success" | "error" | null>(null)
  const [copied, setCopied] = useState<string | null>(null);

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const cardVariants: Variants = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 } }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);
    // --- Your EmailJS details remain untouched ---
    const serviceID = "service_ufcualj";
    const templateID = "template_0i4wy2l";
    const publicKey = "bzPQYq0f1dMDYC9VV";

    emailjs.send(serviceID, templateID, formData, publicKey)
      .then(() => {
        setSubmissionStatus("success");
        setFormData({ name: "", email: "", message: "" });
      }, () => {
        setSubmissionStatus("error");
      })
      .finally(() => {
        setIsSubmitting(false);
        setTimeout(() => setSubmissionStatus(null), 5000); // Reset status after 5 seconds
      });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    // ADDED: A subtle animated scan-line effect via CSS
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden bg-black scan-lines-bg">
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <TransmissionBackground />
          </Suspense>
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
            className="text-center mb-16"
            initial={{opacity: 0, y: -40}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{ once: true, amount: 0.8 }}
            transition={{duration: 0.8, ease: "easeOut"}}
        >
          <GlitchTitle text="Open Channel" />
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg">
            Have a project, a question, or just want to connect? Send a transmission.
          </p>
        </motion.div>

        <motion.div
            ref={ref}
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            // IMPROVED: Responsive padding and background effect
            className="grid lg:grid-cols-2 gap-8 backdrop-blur-xl bg-black/60 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl hud-grid-bg"
        >
          {/* --- LEFT SIDE: Info & Globe --- */}
          <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">Contact Coordinates</h3>
                <motion.div className="space-y-4" variants={cardVariants}>
                  {[
                    { icon: Mail, label: "Signal", value: "fadeljafir@gmail.com" },
                    { icon: Phone, label: "Frequency", value: "0878-2607-8588" },
                    { icon: MapPin, label: "Nexus", value: "Bekasi, Indonesia" },
                  ].map(({ icon: Icon, label, value }) => (
                    <motion.div 
                        key={label} 
                        className="flex items-center space-x-4 group cursor-pointer" 
                        onClick={() => handleCopy(value, label)}
                        variants={itemVariants}
                    >
                      <div className="p-3 rounded-full bg-red-500/10 border border-red-500/20 group-hover:bg-red-500/20 group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">{label}</div>
                        <div className="text-sm text-white transition-colors">{copied === label ? "Copied!" : value}</div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              {/* IMPROVED: Responsive height for the globe canvas */}
              <div className="relative w-full h-56 lg:h-72 mt-8 opacity-50 hover:opacity-75 transition-opacity duration-500">
                <Canvas camera={{position: [0, 0, 2.5], fov: 75}}>
                  <ambientLight intensity={1} />
                  <pointLight position={[10, 10, 10]} intensity={100} color="#ef4444"/>
                  <Suspense fallback={null}><ContactGlobe /></Suspense>
                </Canvas>
              </div>
          </div>

          {/* --- RIGHT SIDE: Organized Contact Form --- */}
          <div className="border-t-2 lg:border-t-0 lg:border-l-2 border-red-500/20 pt-8 lg:pt-0 lg:pl-8">
             <form onSubmit={handleSubmit} className="space-y-6">
               <div>
                   <label htmlFor="name" className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Your Name</label>
                   {/* IMPROVED: Consistent input styling */}
                   <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="form-input" placeholder="Enter your callsign"/>
               </div>
               <div>
                   <label htmlFor="email" className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Your Email</label>
                   <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" placeholder="Enter your comms link"/>
               </div>
               <div>
                 <label htmlFor="message" className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Message</label>
                 <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} className="form-input" placeholder="Begin transmission..."></textarea>
               </div>
               <div>
                 {/* IMPROVED: Responsive button styling */}
                 <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      // --- TAP ANIMATION ---
                      whileHover={{ scale: 1.02, y: -2 }} // Slightly less scale for a full-width element
                      whileTap={{ scale: 0.99 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      // --- RESPONSIVE & ENHANCED STYLING ---
                      className="
                          w-full                           // Consistently full-width
                          flex items-center justify-center gap-x-2
                          px-8 py-3
                          font-semibold text-white
                          bg-gradient-to-r from-red-600 to-red-500
                          rounded-lg
                          transition-all duration-300
                          shadow-lg hover:shadow-xl hover:shadow-red-500/30
                          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-black
                          disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 disabled:y-0
                      "
                  >
                      {isSubmitting ? (
                          <>
                              <Loader2 size={20} className="animate-spin" />
                              <span>Encrypting...</span>
                          </>
                      ) : (
                          <>
                              <Send size={18} />
                              <span>Transmit Message</span>
                          </>
                      )}
                  </motion.button>
               </div>
               
               {submissionStatus && (
                   <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-center p-3 rounded-lg text-sm flex items-center justify-center gap-2 ${submissionStatus === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                     {submissionStatus === 'success' ? <CheckCircle size={18}/> : <AlertTriangle size={18} />}
                     {submissionStatus === 'success' ? "Transmission received. Standing by." : "Connection failed. Check signal."}
                   </motion.div>
               )}
             </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}