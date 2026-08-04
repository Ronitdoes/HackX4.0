"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SPONSORS } from "@/data/sponsors";

// Pick a curated subset of sponsors for the scattered layout positions
const FEATURED = SPONSORS.slice(0, 8);

// Predefined positions for the scattered logos — mirrors the editorial collage aesthetic
const POSITIONS: {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width: string;
  height: string;
  zIndex: number;
  rotate?: number;
}[] = [
  // Top-left — tall card
  { top: "4%", left: "2%", width: "14%", height: "42%", zIndex: 2, rotate: -2 },
  // Top-right large
  { top: "0%", right: "0%", width: "18%", height: "28%", zIndex: 3, rotate: 1 },
  // Far right small
  { top: "6%", right: "20%", width: "10%", height: "24%", zIndex: 2, rotate: 3 },
  // Center-right — tall card
  { top: "30%", right: "8%", width: "16%", height: "48%", zIndex: 4, rotate: -1 },
  // Bottom-left card
  { bottom: "4%", left: "0%", width: "16%", height: "40%", zIndex: 3, rotate: 2 },
  // Bottom-center-left
  { bottom: "8%", left: "18%", width: "12%", height: "30%", zIndex: 2, rotate: -3 },
  // Bottom-right
  { bottom: "0%", right: "22%", width: "14%", height: "32%", zIndex: 2, rotate: 1 },
  // Far-right mid-small
  { top: "32%", right: "26%", width: "8%", height: "20%", zIndex: 1, rotate: -2 },
];

export default function OurPartners() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const headingVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants = {
    hidden: { y: "110%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        delay: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative w-full bg-transparent text-white overflow-hidden select-none py-12 md:py-0">
      {/* Desktop: Editorial scattered layout */}
      <div className="hidden md:block relative w-full" style={{ height: "100vh", minHeight: "700px", maxHeight: "900px" }}>
        {/* Scattered sponsor logo cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="absolute inset-0"
        >
          {FEATURED.map((sponsor, i) => {
            const pos = POSITIONS[i];
            if (!pos) return null;
            return (
              <motion.div
                key={sponsor.id}
                variants={cardVariants}
                className="absolute rounded-lg overflow-hidden bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] flex items-center justify-center p-4 md:p-5 transition-transform duration-500 hover:scale-105 hover:border-white/20 hover:bg-white/[0.08]"
                style={{
                  top: pos.top,
                  bottom: pos.bottom,
                  left: pos.left,
                  right: pos.right,
                  width: pos.width,
                  height: pos.height,
                  zIndex: pos.zIndex,
                  transform: `rotate(${pos.rotate ?? 0}deg)`,
                }}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    fill
                    className="object-contain p-3 brightness-110 drop-shadow-sm"
                    sizes="220px"
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Center heading — large serif typography */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-6">
          <motion.h2
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col items-center justify-center font-sans font-black uppercase tracking-wide leading-[0.92] text-center"
            style={{ fontSize: "clamp(3rem, 8vw, 8.5rem)" }}
          >
            <div className="overflow-hidden py-1">
              <motion.span variants={wordVariants} className="block text-white">
                OUR
              </motion.span>
            </div>
            <div className="overflow-hidden py-1">
              <motion.span variants={wordVariants} className="block text-white">
                PARTNERS
              </motion.span>
            </div>
          </motion.h2>

          {/* Descriptive paragraph */}
          <motion.p
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8 max-w-lg text-white/60 text-sm md:text-base font-sans font-normal leading-relaxed text-center"
          >
            HackX 4.0 is powered by industry leaders and visionary
            organizations. From cutting-edge tech companies to creative
            studios, our partners fuel innovation and empower the
            next generation of builders.
          </motion.p>
        </div>

        {/* Scroll indicator bottom-right */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-6 right-8 flex items-center gap-3 z-10"
        >
          <div className="w-16 h-px bg-white/30" />
          <span className="text-white/40 text-xs font-sans uppercase tracking-[0.25em]">
            Scroll
          </span>
        </motion.div>
      </div>

      {/* Mobile: Stacked grid layout */}
      <div className="block md:hidden px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans font-black uppercase tracking-tight leading-[0.92] text-center text-[2.5rem] mb-4"
        >
          <span className="block text-white">OUR</span>
          <span className="block text-white">PARTNERS</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/60 text-sm font-sans font-normal leading-relaxed text-center mb-10 max-w-sm mx-auto"
        >
          HackX 4.0 is powered by industry leaders and visionary
          organizations that fuel innovation.
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4"
        >
          {FEATURED.map((sponsor) => (
            <motion.div
              key={sponsor.id}
              variants={cardVariants}
              className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white/[0.04] border border-white/[0.08] flex items-center justify-center p-4"
            >
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                fill
                className="object-contain p-4 brightness-110"
                sizes="180px"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
