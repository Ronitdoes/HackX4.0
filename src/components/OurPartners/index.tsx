"use client";

import React, { useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SPONSORS } from "@/data/sponsors";

gsap.registerPlugin(ScrollTrigger);

interface ScatteredCardConfig {
  sponsor: (typeof SPONSORS)[number];
  left: string;
  top?: string;
  bottom?: string;
  width: string;
  height: string;
  zIndex: number;
  rotate: number;
  depth: number;
}

// 8 Landing Scattered Cards (Viewport 1)
const LANDING_CARDS: ScatteredCardConfig[] = [
  { sponsor: SPONSORS[0], left: "2vw", top: "4%", width: "14vw", height: "42%", zIndex: 2, rotate: -2, depth: 35 },
  { sponsor: SPONSORS[1], left: "80vw", top: "0%", width: "18vw", height: "28%", zIndex: 3, rotate: 1, depth: -20 },
  { sponsor: SPONSORS[2], left: "64vw", top: "6%", width: "10vw", height: "24%", zIndex: 2, rotate: 3, depth: 50 },
  { sponsor: SPONSORS[3], left: "74vw", top: "30%", width: "16vw", height: "48%", zIndex: 4, rotate: -1, depth: -30 },
  { sponsor: SPONSORS[4], left: "0vw", bottom: "4%", width: "16vw", height: "40%", zIndex: 3, rotate: 2, depth: 40 },
  { sponsor: SPONSORS[5], left: "18vw", bottom: "8%", width: "12vw", height: "30%", zIndex: 2, rotate: -3, depth: -45 },
  { sponsor: SPONSORS[6], left: "58vw", bottom: "0%", width: "14vw", height: "32%", zIndex: 2, rotate: 1, depth: 25 },
  { sponsor: SPONSORS[7], left: "34vw", top: "14%", width: "9vw", height: "22%", zIndex: 1, rotate: -2, depth: -55 },
];

// Helper to chunk array into groups of 4 (for 2x2 grids)
function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

const SPONSOR_CHUNKS = chunkArray(SPONSORS, 4);

const SPRING_CONFIG = { damping: 30, stiffness: 120, mass: 0.8 };

function ParallaxScatteredCard({
  config,
  mouseX,
  mouseY,
}: {
  config: ScatteredCardConfig;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
}) {
  const springX = useSpring(mouseX, SPRING_CONFIG);
  const springY = useSpring(mouseY, SPRING_CONFIG);

  const translateX = useTransform(springX, [-0.5, 0.5], [-config.depth, config.depth]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-config.depth * 0.7, config.depth * 0.7]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [config.depth * 0.12, -config.depth * 0.12]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-config.depth * 0.1, config.depth * 0.1]);

  return (
    <motion.div
      className="absolute flex items-center justify-center p-4 md:p-5"
      style={{
        left: config.left,
        top: config.top,
        bottom: config.bottom,
        width: config.width,
        height: config.height,
        zIndex: config.zIndex,
        rotate: config.rotate,
        x: translateX,
        y: translateY,
        rotateX,
        rotateY,
        transformPerspective: 800,
        willChange: "transform",
      }}
      whileHover={{ scale: 1.1, transition: { duration: 0.35 } }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src={config.sponsor.logo}
          alt={config.sponsor.name}
          fill
          className="object-contain p-2 brightness-110 drop-shadow-md"
          sizes="260px"
        />
      </div>
    </motion.div>
  );
}

function Grid2x2Card({
  sponsor,
  index,
  mouseX,
  mouseY,
}: {
  sponsor: (typeof SPONSORS)[number];
  index: number;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
}) {
  const depth = (index % 5) * 6 - 12;
  const springX = useSpring(mouseX, SPRING_CONFIG);
  const springY = useSpring(mouseY, SPRING_CONFIG);

  const translateX = useTransform(springX, [-0.5, 0.5], [-depth * 0.4, depth * 0.4]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-depth * 0.4, depth * 0.4]);

  return (
    <motion.div
      className="w-[210px] md:w-[250px] lg:w-[290px] h-[175px] md:h-[210px] lg:h-[245px] rounded-2xl overflow-hidden bg-white/[0.06] border border-white/[0.1] flex items-center justify-center p-5 md:p-6 hover:border-white/25 hover:bg-white/[0.12] transition-colors duration-300 flex-shrink-0"
      style={{
        x: translateX,
        y: translateY,
        willChange: "transform",
      }}
      whileHover={{ scale: 1.04, transition: { duration: 0.25 } }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src={sponsor.logo}
          alt={sponsor.name}
          fill
          className="object-contain p-3 brightness-110 drop-shadow-sm"
          sizes="360px"
        />
      </div>
    </motion.div>
  );
}

export default function OurPartners() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

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

  // GSAP ScrollTrigger horizontal scroll animation
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const totalScrollWidth = canvas.scrollWidth - window.innerWidth;

        gsap.to(canvas, {
          x: -totalScrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: () => `+=${totalScrollWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative w-full bg-transparent text-white select-none">
      {/* Desktop: Pinned horizontal scroll section with 2x2 Grids & Dividers */}
      <div ref={triggerRef} className="hidden md:block relative w-full h-screen overflow-hidden">
        <div
          ref={canvasRef}
          className="relative h-full flex items-center"
          style={{ width: "max-content" }}
        >
          {/* --- SECTION 1: Landing Scattered Composition (100vw wide) --- */}
          <div className="relative w-[100vw] h-full flex-shrink-0">
            {/* Landing scattered cards */}
            {LANDING_CARDS.map((config, i) => (
              <ParallaxScatteredCard
                key={`landing-${config.sponsor.id}-${i}`}
                config={config}
                mouseX={mouseX}
                mouseY={mouseY}
              />
            ))}

            {/* Center Heading on landing view */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-10 pointer-events-none px-6 text-center">
              <h2
                className="flex flex-col items-center justify-center font-sans font-black uppercase tracking-wide leading-[0.92] text-center"
                style={{ fontSize: "clamp(3rem, 8vw, 8.5rem)" }}
              >
                <span className="block text-white">OUR</span>
                <span className="block text-white">PARTNERS</span>
              </h2>

              <p className="mt-8 max-w-lg text-white/60 text-sm md:text-base font-sans font-normal leading-relaxed text-center">
                HackX 4.0 is powered by industry leaders and visionary
                organizations. From cutting-edge tech companies to creative
                studios, our partners fuel innovation and empower the
                next generation of builders.
              </p>
            </div>
          </div>

          {/* --- VERTICAL DIVIDER LINE --- */}
          <div className="w-[1px] h-[60vh] bg-white/20 flex-shrink-0 my-auto mx-6 md:mx-10" />

          {/* --- SECTION 2: 2x2 Grid Blocks with Vertical Dividing Lines --- */}
          <div className="relative h-full flex items-center pr-[8vw] gap-6 md:gap-10 flex-shrink-0">
            {SPONSOR_CHUNKS.map((chunk, blockIndex) => (
              <React.Fragment key={`block-${blockIndex}`}>
                {/* 2x2 Grid (2 rows x 2 columns) */}
                <div className="grid grid-rows-2 grid-cols-2 gap-4 md:gap-5 lg:gap-6 my-auto">
                  {chunk.map((sponsor, indexInChunk) => {
                    const globalIndex = blockIndex * 4 + indexInChunk;
                    return (
                      <Grid2x2Card
                        key={`grid2x2-${sponsor.id}-${globalIndex}`}
                        sponsor={sponsor}
                        index={globalIndex}
                        mouseX={mouseX}
                        mouseY={mouseY}
                      />
                    );
                  })}
                </div>

                {/* Vertical Divider Line between 2x2 grid blocks */}
                {blockIndex < SPONSOR_CHUNKS.length - 1 && (
                  <div className="w-[1px] h-[56vh] bg-white/20 flex-shrink-0 my-auto" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden px-6 py-12">
        <h2 className="font-sans font-black uppercase tracking-tight leading-[0.92] text-center text-[2.5rem] mb-4">
          <span className="block text-white">OUR</span>
          <span className="block text-white">PARTNERS</span>
        </h2>

        <p className="text-white/60 text-sm font-sans font-normal leading-relaxed text-center mb-10 max-w-sm mx-auto">
          HackX 4.0 is powered by industry leaders and visionary
          organizations that fuel innovation.
        </p>

        <div className="grid grid-cols-2 gap-4">
          {SPONSORS.map((sponsor) => (
            <div
              key={`mobile-${sponsor.id}`}
              className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white/[0.06] border border-white/[0.1] flex items-center justify-center p-4"
            >
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                fill
                className="object-contain p-4 brightness-110"
                sizes="180px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
