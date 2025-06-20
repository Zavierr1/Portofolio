"use client"

import type React from "react"
import { useState, useRef, Suspense, useMemo } from "react"
import emailjs from "@emailjs/browser"
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, AlertTriangle } from "lucide-react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars, Float } from "@react-three/drei"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import * as THREE from "three"

// --- UPDATED: Background with more elements ---
function TransmissionBackground() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = Math.random() * -50;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 2] += delta * 15;
            if (positions[i + 2] > 10) {
                positions[i + 2] = -50;
            }
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
        <Stars radius={80} depth={50} count={5000} factor={7} saturation={0} fade speed={1.5} />
        <points ref={particlesRef}>
            <bufferGeometry attach="geometry">
                <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial attach="material" size={0.05} color="#ef4444" />
        </points>
        <Float>
           <mesh position={[5, -5, -20]}>
                <icosahedronGeometry args={[0.5, 0]} />
                <meshStandardMaterial wireframe color="#f87171" emissive="#f87171" emissiveIntensity={0.2} />
           </mesh>
        </Float>
         <Float>
           <mesh position={[-5, 5, -30]}>
                <boxGeometry args={[0.8, 0.8, 0.8]} />
                <meshStandardMaterial wireframe color="#fca5a5" emissive="#fca5a5" emissiveIntensity={0.2} />
           </mesh>
        </Float>
    </group>
  );
}

// --- Reusable Glitch Title (font-mono removed) ---
const GlitchTitle = ({ text }: { text: string }) => (
    <h2 className="text-4xl md:text-5xl font-bold mb-4 glitch-container" data-text={text}>
        <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">{text}</span>
    </h2>
)

// --- Interactive Globe with Rings ---
const ContactGlobe = () => {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        if(groupRef.current) {
            groupRef.current.rotation.y += 0.002;
        }
    })
    return (
        <group ref={groupRef}>
            <mesh>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial wireframe color="#ef4444" emissive="#ef4444" emissiveIntensity={0.2} />
            </mesh>
            <mesh rotation-x={Math.PI / 2}>
                <torusGeometry args={[1.2, 0.01, 16, 100]} />
                <meshStandardMaterial color="#f87171" emissive="#f87171" emissiveIntensity={0.5} />
            </mesh>
            <mesh rotation-x={Math.PI / 2} rotation-y={Math.PI / 4}>
                <torusGeometry args={[1.4, 0.008, 16, 100]} />
                <meshStandardMaterial color="#fca5a5" emissive="#fca5a5" emissiveIntensity={0.5} />
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

  const cardVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);
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
      });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(value);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-black scan-lines-bg">
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <TransmissionBackground />
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <GlitchTitle text="Open Channel" />
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Have a project, a question, or just want to connect? Send a transmission.
          </p>
        </div>

        <motion.div
            ref={ref}
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid lg:grid-cols-2 gap-8 backdrop-blur-xl bg-black/50 border border-white/10 rounded-2xl p-8 shadow-2xl hud-grid-bg"
        >
          {/* --- LEFT SIDE: Info & Globe --- */}
          <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">Contact Coordinates</h3>
                <div className="space-y-4">
                  {[
                    { icon: Mail, label: "Signal", value: "fadeljafir@gmail.com" },
                    { icon: Phone, label: "Frequency", value: "0878-2607-8588" },
                    { icon: MapPin, label: "Nexus", value: "Bekasi, Indonesia" },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center space-x-4 group cursor-pointer" onClick={() => handleCopy(value)}>
                      <div className="p-3 rounded-full bg-red-500/10 border border-red-500/20 group-hover:bg-red-500/20 transition-colors">
                        <Icon className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">{label}</div>
                        <div className="text-sm text-white transition-colors">{copied === value ? "Copied!" : value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative w-full h-48 lg:h-64 mt-8 opacity-50">
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
                    <label htmlFor="name" className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Your Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="form-input resize-none border border-black/50 bg-black/50 text-white w-[100%]" placeholder="Enter your callsign"/>
                </div>
                <div>
                    <label htmlFor="email" className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Your Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="form-input resize-none border border-black/50 bg-black/50 text-white w-[100%]" placeholder="Enter your comms link"/>
                </div>
               <div>
                 <label htmlFor="message" className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Message</label>
                 <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} className="form-input resize-none border border-black/50 bg-black/50 text-white w-[100%]" placeholder="Begin transmission..."></textarea>
               </div>
               <div>
                 <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-8 py-15 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100">
                   {isSubmitting ? (<><Loader2 size={20} className="animate-spin" /><span>Encrypting...</span></>) : (<><Send size={20} /><span>Transmit Message</span></>)}
                 </button>
               </div>
               
               {submissionStatus && (
                  <div className={`text-center p-3 rounded-lg text-sm flex items-center justify-center gap-2 ${submissionStatus === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    {submissionStatus === 'success' ? <CheckCircle size={18}/> : <AlertTriangle size={18} />}
                    {submissionStatus === 'success' ? "Transmission received. Standing by." : "Connection failed. Please check your signal."}
                  </div>
               )}
             </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
