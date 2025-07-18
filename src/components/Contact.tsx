"use client";

import type React from "react";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

// --- Reusable Grid Pattern (from other sections) ---
const GridPattern = () => (
  <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#d1d5db_1px,transparent_1px),linear-gradient(to_bottom,#d1d5db_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-15 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
);

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

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    "success" | "error" | null
  >(null);
  const [copied, setCopied] = useState<string | null>(null);

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);
    // --- Your EmailJS details remain untouched ---
    const serviceID = "service_ufcualj";
    const templateID = "template_0i4wy2l";
    const publicKey = "bzPQYq0f1dMDYC9VV";

    emailjs
      .send(serviceID, templateID, formData, publicKey)
      .then(
        () => {
          setSubmissionStatus("success");
          setFormData({ name: "", email: "", subject: "", message: "" });
        },
        () => {
          setSubmissionStatus("error");
        }
      )
      .finally(() => {
        setIsSubmitting(false);
        setTimeout(() => setSubmissionStatus(null), 5000); // Reset status after 5 seconds
      });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-32 relative overflow-hidden bg-white"
    >
      <GridPattern />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <AnimatedTitle text="Get In Touch" />
          <div className="w-24 h-1 bg-gradient-to-r from-blue-800 to-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg">
            Have a project, a question, or just want to connect? Send me a
            message.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={cardVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative grid lg:grid-cols-2 gap-8 backdrop-blur-sm bg-white border border-blue-200/50 rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl hover:shadow-blue-800/10 transition-all duration-300">
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-blue-600/70 rounded-br-lg"></div>
          {/* --- LEFT SIDE: Info & Icon --- */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-blue-800">
                Contact Information
              </h3>
              <motion.div className="space-y-4" variants={cardVariants}>
                {[
                  { icon: Mail, label: "Email", value: "fadeljafir@gmail.com" },
                  {
                    icon: Phone,
                    label: "Phone Number",
                    value: "0878-2607-8588",
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "North Cikarang, Bekasi",
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <motion.div
                    key={label}
                    className="flex items-center space-x-4 group cursor-pointer"
                    onClick={() => handleCopy(value, label)}
                    variants={itemVariants}
                  >
                    <div className="p-3 rounded-full backdrop-blur-sm bg-white border border-blue-300/40 hover:bg-blue-50/70 hover:border-blue-300/60 group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <Icon className="w-5 h-5 text-gray-700 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">
                        {label}
                      </div>
                      <div className="text-sm text-gray-700 font-medium transition-colors">
                        {copied === label ? "Copied!" : value}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* --- RIGHT SIDE: Contact Form --- */}
          <div className="border-t-2 lg:border-t-0 lg:border-l-2 border-blue-200/50 pt-8 lg:pt-0 lg:pl-8">
            <h3 className="text-2xl font-bold mb-6 text-blue-800">
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
              {/* Full Name and Email in a row on larger screens */}
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0">
                <div className="flex-1">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors backdrop-blur-sm bg-white/80"
                    placeholder="Your full name"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors backdrop-blur-sm bg-white/80"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Subject field */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors backdrop-blur-sm bg-white/80"
                  placeholder="What's this about?"
                />
              </div>

              {/* Message field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors resize-vertical backdrop-blur-sm bg-white/80"
                  placeholder="Tell me about your project, ideas, or just say hello..."
                />
              </div>
              {/* Submit Button */}
              <div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="w-full flex items-center justify-center gap-x-2 px-8 py-4 font-semibold text-white bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-800/25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message →</span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Status Messages */}
              {submissionStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-center p-4 rounded-lg text-sm flex items-center justify-center gap-2 ${submissionStatus === "success" ? "bg-green-100 text-green-700 border border-green-200" : "bg-red-100 text-red-700 border border-red-200"}`}
                >
                  {submissionStatus === "success" ? (
                    <CheckCircle size={18} />
                  ) : (
                    <AlertTriangle size={18} />
                  )}
                  {submissionStatus === "success"
                    ? "Message sent successfully!"
                    : "An error occurred. Please try again."}
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
