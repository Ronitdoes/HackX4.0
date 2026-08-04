"use client";

import React, { useRef, useCallback, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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
  // Parallax depth — higher = more movement. Negative = inverse direction.
  depth: number;
}[] = [
  // Top-left — tall card
  { top: "4%", left: "2%", width: "14%", height: "42%", zIndex: 2, rotate: -2, depth: 35 },
  // Top-right large
  { top: "0%", right: "0%", width: "18%", height: "28%", zIndex: 3, rotate: 1, depth: -20 },
  // Far right small
  { top: "6%", right: "20%", width: "10%", height: "24%", zIndex: 2, rotate: 3, depth: 50 },
  // Center-right — tall card
  { top: "30%", right: "8%", width: "16%", height: "48%", zIndex: 4, rotate: -1, depth: -30 },
  // Bottom-left card
  { bottom: "4%", left: "0%", width: "16%", height: "40%", zIndex: 3, rotate: 2, depth: 40 },
  // Bottom-center-left
  { bottom: "8%", left: "18%", width: "12%", height: "30%", zIndex: 2, rotate: -3, depth: -45 },
  // Bottom-right
  { bottom: "0%", right: "22%", width: "14%", height: "32%", zIndex: 2, rotate: 1, depth: 25 },
  // Far-right mid-small
  { top: "32%", right: "26%", width: "8%", height: "20%", zIndex: 1, rotate: -2, depth: -55 },
];

// Spring config for smooth, buttery cursor tracking
const SPRING_CONFIG = { damping: 30, stiffness: 120, mass: 0.8 };

function ParallaxCard({
  sponsor,
  pos,
  mouseX,
  mouseY,
  cardVariants,
}: {
  sponsor: { id: number; name: string; logo: string };
  pos: (typeof POSITIONS)[number];
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  cardVariants: Record<string, unknown>;
}) {
  // Smooth spring-based tracking
  const springX = useSpring(mouseX, SPRING_CONFIG);
  const springY = useSpring(mouseY, SPRING_CONFIG);

  // Transform mouse position (-0.5 to 0.5) into pixel offset based on card depth
  const translateX = useTransform(springX, [-0.5, 0.5], [-pos.depth, pos.depth]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-pos.depth * 0.7, pos.depth * 0.7]);

  // Subtle rotation based on cursor for 3D tilt feel
  const rotateX = useTransform(springY, [-0.5, 0.5], [pos.depth * 0.12, -pos.depth * 0.12]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-pos.depth * 0.1, pos.depth * 0.1]);

  return (
    <motion.div
      variants={cardVariants}
      className="absolute rounded-lg overflow-hidden bg-white/[0.06] border border-white/[0.1] flex items-center justify-center p-4 md:p-5 hover:border-white/20 hover:bg-white/[0.1]"
      style={{
        top: pos.top,
        bottom: pos.bottom,
        left: pos.left,
        right: pos.right,
        width: pos.width,
        height: pos.height,
        zIndex: pos.zIndex,
        rotate: pos.rotate ?? 0,
        x: translateX,
        y: translateY,
        rotateX,
        rotateY,
        transformPerspective: 800,
        willChange: "transform",
      }}
      whileHover={{ scale: 1.08, transition: { duration: 0.35 } }}
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
}

export default function OurPartners() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Normalized mouse position: 0 = center, -0.5 = left/top edge, 0.5 = right/bottom edge
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    // Smoothly reset to center when cursor leaves
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

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
      {/* Desktop: Editorial scattered layout with cursor parallax */}
      <div
        ref={sectionRef}
        className="hidden md:block relative w-full"
        style={{ height: "100vh", minHeight: "700px", maxHeight: "900px", perspective: "1200px" }}
      >
        {/* Scattered sponsor logo cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {FEATURED.map((sponsor, i) => {
            const pos = POSITIONS[i];
            if (!pos) return null;
            return (
              <ParallaxCard
                key={sponsor.id}
                sponsor={sponsor}
                pos={pos}
                mouseX={mouseX}
                mouseY={mouseY}
                cardVariants={cardVariants}
              />
            );
          })}
        </motion.div>

        {/* Center heading — large typography */}
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

        {/* Scroll indicator removed */}
      </div>

      {/* Mobile: Stacked grid layout (no parallax — touch devices) */}
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
              className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white/[0.06] border border-white/[0.1] flex items-center justify-center p-4"
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
