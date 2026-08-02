"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HistoryEdition {
  id: string;
  year: string;
  endYear: string;
  title: string;
  subtitle: string;
  movement: string;
  description: string;
  context: string;
  influences: string[];
  stats: { label: string; value: string }[];
  image: string;
}

const EDITIONS: HistoryEdition[] = [
  {
    id: "hackx-1",
    year: "2023",
    endYear: "2023 /",
    title: "HACKX 1.0",
    subtitle: "The Genesis & Cybernetic Roots",
    movement: "Victorian & Industrial Tech",
    description:
      "Launched as MUJ's inaugural 24-hour flagship hackathon, bringing together 300+ visionaries to code prototype solutions under intense hackathon adrenaline.",
    context:
      "Established the foundation of peer-to-peer developer collaboration at Manipal University Jaipur, focusing on core web infrastructure, basic hardware nodes, and mobile utilities.",
    influences: [
      "Monolithic Web Arch",
      "Full-Stack Web Dev",
      "First Student Developer Guilds",
      "24-Hour Non-stop Jamming",
    ],
    stats: [
      { label: "Hackers", value: "300+" },
      { label: "Projects Built", value: "50+" },
      { label: "Prize Pool", value: "₹1 Lakh+" },
    ],
    image: "/assets/history/hackx1.jpg",
  },
  {
    id: "hackx-2",
    year: "2024",
    endYear: "2024 /",
    title: "HACKX 2.0",
    subtitle: "The Nationwide Expansion",
    movement: "Art Deco & Cyber-Constructivism",
    description:
      "Scaled into a multi-state arena with 700+ hackers, introducing specialized tracks for AI/ML, Blockchain networks, and IoT hardware prototypes.",
    context:
      "Partnered with leading venture networks, developer advocates, and global cloud partners to provide high-performance cloud infrastructure and direct founder mentorship.",
    influences: [
      "Distributed Cloud Systems",
      "Early GenAI Integration",
      "1-on-1 Founder Mentorship",
      "Smart Contract Track",
    ],
    stats: [
      { label: "Hackers", value: "700+" },
      { label: "Projects Built", value: "120+" },
      { label: "Prize Pool", value: "₹3 Lakhs+" },
    ],
    image: "/assets/history/hackx2.jpg",
  },
  {
    id: "hackx-3",
    year: "2025",
    endYear: "2025 /",
    title: "HACKX 3.0",
    subtitle: "The Quantum Leap",
    movement: "Swiss Modern & Neon Minimal",
    description:
      "Gathered 1,500+ top engineering minds nationwide for a 36-hour hackathon arena with live domain workshops, investor speed-pitching, and instant hiring rounds.",
    context:
      "Pioneered hybrid hackathon execution with AI-driven automated judging, real-time code reviews, and high-stakes venture grant challenges.",
    influences: [
      "Autonomous AI Agents",
      "Web3 & Zero-Knowledge Proofs",
      "High-Frequency Judging",
      "Fast-Track Recruitment",
    ],
    stats: [
      { label: "Hackers", value: "1,500+" },
      { label: "Projects Built", value: "250+" },
      { label: "Prize Pool", value: "₹5 Lakhs+" },
    ],
    image: "/assets/history/hackx3.jpg",
  },
  {
    id: "hackx-4",
    year: "2026",
    endYear: "TODAY /",
    title: "HACKX 4.0",
    subtitle: "The Infinite Frontier",
    movement: "Flat & Neural Design Era",
    description:
      "The pinnacle edition of HackX — an immersive 36-hour sandbox of pure innovation uniting 2,000+ hackers across the country with massive prize pools and incubation grants.",
    context:
      "Redefining modern hackathons with cutting-edge tech tracks, direct founder recruitment, hands-on bootcamps, and an unforgettable arena experience.",
    influences: [
      "Multi-Modal AI & LLMs",
      "Spatial Computing & Hardware",
      "Direct VC Seed Funding",
      "Industry Partner Grants",
    ],
    stats: [
      { label: "Expected Hackers", value: "2,000+" },
      { label: "Duration", value: "36 Hours" },
      { label: "Prizes & Grants", value: "₹10 Lakhs+" },
    ],
    image: "/assets/history/hackx4.jpg",
  },
];

export default function HistoryShowcase() {
  const [selectedEdition, setSelectedEdition] = useState<HistoryEdition | null>(null);
  const [activeTab, setActiveTab] = useState<string>(EDITIONS[0].id);

  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToEdition = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(`history-card-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  return (
    <section className="relative w-full bg-[#05020d] text-white py-24 px-4 sm:px-6 md:px-12 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8c19be]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#ff7695]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1300px] mx-auto relative z-10 flex flex-col items-center">
        {/* Intro Header */}
        <div className="text-center max-w-3xl mb-16 select-none">
          <span className="text-[#ff7695] text-xs sm:text-sm font-black tracking-[0.3em] uppercase block mb-3">
            An Interactive Journey
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-sans font-extrabold uppercase tracking-tight text-white leading-tight">
            HISTORY OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D242D7] via-[#ff7695] to-white">HACKX</span>
          </h2>
          <p className="mt-5 text-white/70 text-sm sm:text-base md:text-lg font-sans font-normal leading-relaxed">
            Graphic design and tech architecture have merged across every edition. From early campus builds to a national arena of innovation, explore the movements that defined our evolution.
          </p>
        </div>

        {/* Sticky Timeline Navigation Bar */}
        <div className="sticky top-6 z-30 mb-14 w-full max-w-2xl bg-zinc-900/80 backdrop-blur-xl border border-white/15 rounded-full p-1.5 shadow-2xl flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
          {EDITIONS.map((ed) => {
            const isActive = activeTab === ed.id;
            return (
              <button
                key={ed.id}
                onClick={() => scrollToEdition(ed.id)}
                className={`relative px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 flex-1 text-center whitespace-nowrap ${
                  isActive ? "text-white" : "text-white/50 hover:text-white/80"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeHistoryTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#8c19be] to-[#ff7695] rounded-full shadow-lg"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{ed.title}</span>
              </button>
            );
          })}
        </div>

        {/* Slide Track Grid Showcase */}
        <div ref={containerRef} className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {EDITIONS.map((ed) => (
            <motion.div
              key={ed.id}
              id={`history-card-${ed.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.6 }}
              className="group relative w-full bg-zinc-900/60 border border-white/10 hover:border-[#ff7695]/50 rounded-2xl p-6 md:p-8 backdrop-blur-md flex flex-col justify-between transition-all duration-500 shadow-xl hover:shadow-[0_0_30px_rgba(255,118,149,0.25)]"
            >
              {/* Header Details */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl sm:text-3xl font-black text-[#ff7695] tracking-widest font-mono">
                    {ed.endYear}
                  </span>
                  <span className="text-xs sm:text-sm text-white/50 font-sans tracking-wide border border-white/15 rounded-full px-3 py-1 bg-white/5">
                    {ed.movement}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#ff7695] transition-all">
                  {ed.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/60 font-serif italic mt-1 mb-4">
                  {ed.subtitle}
                </p>

                {/* Card Image */}
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-6 border border-white/10">
                  <img
                    src={ed.image}
                    alt={ed.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                </div>

                <p className="text-white/80 text-sm md:text-base leading-relaxed line-clamp-3 mb-6 font-sans">
                  {ed.description}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setSelectedEdition(ed)}
                className="w-full py-3 sm:py-3.5 px-6 rounded-xl bg-white/10 hover:bg-gradient-to-r hover:from-[#8c19be] hover:to-[#ff7695] text-white font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 border border-white/15 hover:border-transparent shadow-md"
              >
                <span>EXPLORE DETAILS</span>
                <i className="fa-solid fa-arrow-right text-xs transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Full Screen Detail Modal / Panel */}
      <AnimatePresence>
        {selectedEdition && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEdition(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-xl"
            />

            {/* Modal Drawer Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-white/20 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl text-white z-10 no-scrollbar"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedEdition(null)}
                aria-label="Close details"
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-colors z-20"
              >
                <i className="fa-solid fa-xmark text-lg" />
              </button>

              {/* Modal Top Metadata */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl font-bold font-mono text-[#ff7695]">
                  {selectedEdition.year}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span className="text-xs uppercase tracking-widest text-white/60">
                  {selectedEdition.movement}
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-2">
                {selectedEdition.title}
              </h2>
              <p className="text-base sm:text-lg font-serif italic text-white/70 mb-8">
                {selectedEdition.subtitle}
              </p>

              {/* Large Image Banner */}
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-8 border border-white/15">
                <img
                  src={selectedEdition.image}
                  alt={selectedEdition.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Stats Highlights Grid */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
                {selectedEdition.stats.map((st, i) => (
                  <div
                    key={i}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
                  >
                    <div className="text-xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#ff7695]">
                      {st.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wider mt-1 font-medium">
                      {st.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Description & Context Split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pt-4 border-t border-white/10">
                <div>
                  <h4 className="text-sm uppercase tracking-widest font-bold text-[#ff7695] mb-3">
                    OVERVIEW & VISION
                  </h4>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                    {selectedEdition.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm uppercase tracking-widest font-bold text-[#ff7695] mb-3">
                    HISTORICAL CONTEXT
                  </h4>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                    {selectedEdition.context}
                  </p>
                </div>
              </div>

              {/* Key Influences / Technical Highlights */}
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-sm uppercase tracking-widest font-bold text-[#ff7695] mb-4">
                  KEY INFLUENCES & HIGHLIGHTS
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {selectedEdition.influences.map((inf, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/15 text-xs sm:text-sm text-white/90 font-medium tracking-wide flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff7695]" />
                      {inf}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
