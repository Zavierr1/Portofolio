"use client"

import type React from "react"
import { useState } from "react"
import emailjs from "@emailjs/browser"
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, AlertTriangle } from "lucide-react"
import { motion, type Variants } from "framer-motion"
import { useInView } from "react-intersection-observer"

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
    )
}

// --- NEW: Animated SVG Icon ---
const AnimatedContactIcon = () => {
    return (
        <motion.div
            className="w-full h-full flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <svg width="100%" height="100%" viewBox="0 0 200 200" className="max-w-[250px] max-h-[250px]">
                <motion.circle
                    cx="100" cy="100" r="80"
                    fill="none"
                    stroke="url(#gradient-ring)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "circOut" }}
                />
                <motion.circle
                    cx="100" cy="100" r="65"
                    fill="url(#gradient-fill)"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.5, type: "spring", stiffness: 100 }}
                />
                <motion.path
                    d="M50 80 H150 V130 H50 Z M50 80 L100 110 L150 80"
                    stroke="#fff"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
                />
                <defs>
                    <radialGradient id="gradient-fill">
                        <stop offset="0%" stopColor="#fb923c" />
                        <stop offset="100%" stopColor="#f97316" />
                    </radialGradient>
                    <linearGradient id="gradient-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                         <stop offset="0%" stopColor="#f97316" />
                         <stop offset="100%" stopColor="#fdba74" />
                    </linearGradient>
                </defs>
            </svg>
        </motion.div>
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
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden bg-orange-50">
      <GridPattern />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
            className="text-center mb-16"
            initial={{opacity: 0, y: -40}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{ once: true, amount: 0.8 }}
            transition={{duration: 0.8, ease: "easeOut"}}
        >
          <AnimatedTitle text="Get In Touch" />
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg">
            Have a project, a question, or just want to connect? Send me a message.
          </p>
        </motion.div>

        <motion.div
            ref={ref}
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid lg:grid-cols-2 gap-8 bg-white/70 backdrop-blur-md border border-orange-200/50 rounded-2xl p-6 sm:p-8 shadow-lg"
        >
          {/* --- LEFT SIDE: Info & Icon --- */}
          <div className="flex flex-col justify-between">
              <div>
                  <h3 className="text-2xl font-bold mb-6 text-gray-800">Contact Information</h3>
                  <motion.div className="space-y-4" variants={cardVariants}>
                    {[
                      { icon: Mail, label: "Email", value: "fadeljafir@gmail.com" },
                      { icon: Phone, label: "Phone Number", value: "0878-2607-8588" },
                      { icon: MapPin, label: "Location", value: "North Cikarang, Bekasi" },
                    ].map(({ icon: Icon, label, value }) => (
                      <motion.div 
                          key={label} 
                          className="flex items-center space-x-4 group cursor-pointer" 
                          onClick={() => handleCopy(value, label)}
                          variants={itemVariants}
                      >
                        <div className="p-3 rounded-full bg-orange-100 border border-orange-200/80 group-hover:bg-orange-200 group-hover:scale-110 transition-all duration-300">
                          <Icon className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 uppercase tracking-wider">{label}</div>
                          <div className="text-sm text-gray-700 font-medium transition-colors">{copied === label ? "Copied!" : value}</div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
              </div>
              <div className="relative w-full h-56 lg:h-64 mt-8">
                <AnimatedContactIcon />
              </div>
          </div>

          {/* --- RIGHT SIDE: Contact Form --- */}
          <div className="border-t-2 lg:border-t-0 lg:border-l-2 border-orange-200/50 pt-8 lg:pt-0 lg:pl-8">
             <form onSubmit={handleSubmit} className="space-y-6">
               <div>
                   <label htmlFor="name" className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Your Name</label>
                   <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="form-input-orange" placeholder="Enter your name"/>
               </div>
               <div>
                   <label htmlFor="email" className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Your Email</label>
                   <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="form-input-orange" placeholder="Enter your email address"/>
               </div>
               <div>
                <label htmlFor="message" className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} className="form-input-orange" placeholder="Your message here..."></textarea>
               </div>
               <div>
                <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="w-full flex items-center justify-center gap-x-2 px-8 py-3 font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-orange-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-orange-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                      <>
                          <Loader2 size={20} className="animate-spin" />
                          <span>Sending...</span>
                      </>
                  ) : (
                      <>
                          <Send size={18} />
                          <span>Send Message</span>
                      </>
                  )}
                </motion.button>
               </div>
               
              {submissionStatus && (
                  <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}                   className={`text-center p-3 rounded-lg text-sm flex items-center justify-center gap-2 ${submissionStatus === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                     {submissionStatus === 'success' ? <CheckCircle size={18}/> : <AlertTriangle size={18} />}
                     {submissionStatus === 'success' ? "Message sent successfully!" : "An error occurred. Please try again."}
                  </motion.div>
              )}
             </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
