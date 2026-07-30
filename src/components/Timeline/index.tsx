"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

const milestones = [
  {
    number: "1.",
    title: "REGISTRATION & CHECK-IN",
    time: "09:00 AM - 10:30 AM",
    description: "Get your badges, goodie bags, and settle into your hacking stations."
  },
  {
    number: "2.",
    title: "OPENING CEREMONY",
    time: "10:30 AM - 11:30 AM",
    description: "Keynote speech, theme reveals, guidelines briefing, and official kickoff."
  },
  {
    number: "3.",
    title: "HACKING BEGINS",
    time: "12:00 PM",
    description: "Brainstorming session, repository initialization, and design begins."
  },
  {
    number: "4.",
    title: "MENTORING ROUND 1",
    time: "04:00 PM - 06:00 PM",
    description: "First interaction with industry experts to refine prototypes and validate ideas."
  },
  {
    number: "5.",
    title: "MIDNIGHT SNACKS & FUN",
    time: "12:00 AM",
    description: "Unwind with mini-games, dynamic music, and late-night caffeine refills."
  },
  {
    number: "6.",
    title: "FINAL PITCH & JUDGING",
    time: "09:00 AM - 12:00 PM",
    description: "Project submissions, final presentations to the panel, and declaration of winners."
  }
];

export default function Timeline() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollYProgress = useMotionValue(0);

  const progressSpring = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const startPos = viewportHeight * 0.5;
      const currentPos = startPos - rect.top;
      const totalDist = rect.height;

      const progress = Math.max(0, Math.min(1, currentPos / totalDist));
      scrollYProgress.set(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    const timer = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(timer);
    };
  }, [mounted, scrollYProgress]);

  // Dimension Constants
  const DESKTOP_HEIGHT = 5400;
  const DESKTOP_STEP = 850;
  const MOBILE_HEIGHT = 1800;
  const MOBILE_STEP = 280;

  const totalHeight = isMobile ? MOBILE_HEIGHT : DESKTOP_HEIGHT;
  const stepHeight = isMobile ? MOBILE_STEP : DESKTOP_STEP;
  const amplitude = 150;

  // X coordinate formula: straight line on left (x=40) for mobile, sine wave for desktop
  const getX = (y: number) => {
    if (isMobile) return 40;
    return 500 + amplitude * Math.sin(y * (Math.PI / stepHeight) + Math.PI);
  };

  // Motion transforms
  const yPosition = useTransform(progressSpring, [0, 1], [0, totalHeight], { clamp: true });
  const xPosition = useTransform(yPosition, (y) => getX(y));
  const lineProgress = useTransform(yPosition, [0, totalHeight], [0, 1], { clamp: true });

  // Generate SVG path (straight vertical line on mobile, serpentine wave on desktop)
  const generatePath = () => {
    if (isMobile) {
      return `M 40 0 L 40 ${totalHeight}`;
    }
    let path = "";
    for (let y = 0; y <= totalHeight; y += 15) {
      const x = getX(y);
      if (y === 0) path += `M ${x.toFixed(2)} ${y}`;
      else path += ` L ${x.toFixed(2)} ${y}`;
    }
    return path;
  };

  const fullPathD = generatePath();

  return (
    <section
      id="timeline-section"
      ref={containerRef}
      className={`relative w-full bg-transparent text-white select-none overflow-visible pt-16 pb-32 ${
        isMobile ? "h-[1800px] mb-12" : "h-[5400px] mb-32"
      }`}
    >
      {/* Central SVG Timeline Line */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] pointer-events-none z-10 overflow-visible">
        {mounted && (
          <svg
            viewBox={`0 0 1000 ${totalHeight}`}
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#C076EC" />
                <stop offset="70%" stopColor="#572CE6" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>

              <filter id="active-glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="15" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background trace line */}
            <path
              d={fullPathD}
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="3"
            />

            {/* Animated active drawing line */}
            <motion.path
              d={fullPathD}
              fill="none"
              stroke="url(#line-gradient)"
              strokeWidth="4.5"
              style={{ pathLength: lineProgress }}
            />

            {/* Milestone static checkpoint indicators */}
            {milestones.map((_, idx) => {
              const yVal = (idx + 0.5) * stepHeight;
              const xVal = getX(yVal);
              return (
                <g key={idx}>
                  <circle
                    cx={xVal}
                    cy={yVal}
                    r={isMobile ? "10" : "14"}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx={xVal}
                    cy={yVal}
                    r={isMobile ? "4" : "5"}
                    fill="#ffffff"
                    opacity="0.9"
                  />
                </g>
              );
            })}

            {/* Moving Active Tracker Dot */}
            <motion.circle
              cx={xPosition}
              cy={yPosition}
              r={isMobile ? "14" : "22"}
              fill="#ffffff"
              opacity="0.25"
            />
            <motion.circle
              cx={xPosition}
              cy={yPosition}
              r={isMobile ? "6" : "9"}
              fill="#ffffff"
            />
          </svg>
        )}
      </div>

      {/* Cards list overlay */}
      <div className="relative w-full max-w-[1000px] mx-auto h-full px-3 sm:px-6 md:px-12 pointer-events-none">
        {milestones.map((item, idx) => {
          const yVal = (idx + 0.5) * stepHeight;
          const isLeft = idx % 2 === 0;

          const xVal = getX(yVal);
          const xPercent = (xVal / 1000) * 100;

          let cardStyle: React.CSSProperties;
          let isTextRight: boolean;

          if (isMobile) {
            // On mobile screens: position cards to the right of the straight left line (64px offset)
            cardStyle = {
              top: `${yVal}px`,
              left: "64px",
              right: "16px",
            };
            isTextRight = false;
          } else {
            // Desktop layout
            const gapPercent = 4;
            if (isLeft) {
              cardStyle = {
                top: `${yVal}px`,
                right: `${100 - (xPercent - gapPercent)}%`,
                left: "auto",
              };
              isTextRight = true;
            } else {
              cardStyle = {
                top: `${yVal}px`,
                left: `${xPercent + gapPercent}%`,
                right: "auto",
              };
              isTextRight = false;
            }
          }

          return (
            <div
              key={idx}
              style={cardStyle}
              className={`absolute -translate-y-1/2 pointer-events-auto ${
                isMobile ? "w-auto max-w-none" : "w-[36%] max-w-[380px]"
              }`}
            >
              <motion.div
                initial={{ opacity: 0, x: isTextRight ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-15% 0px -15% 0px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col ${
                  isTextRight ? "items-end text-right" : "items-start text-left"
                }`}
              >
                {/* Milestone Big Number */}
                <span className="font-serif italic text-5xl sm:text-7xl md:text-8xl text-white leading-none mb-2 sm:mb-3 md:mb-4 block select-none">
                  {item.number}
                </span>

                {/* Milestone Title */}
                <h3 className="font-sans font-bold text-white text-base sm:text-xl md:text-2xl tracking-wider mb-1 sm:mb-2">
                  {item.title}
                </h3>

                {/* Milestone Time */}
                <span className="font-serif italic text-base sm:text-xl md:text-2xl text-white/80 tracking-wide mb-2 sm:mb-3 block select-none">
                  {item.time}
                </span>

                {/* Milestone Description */}
                <p className="font-sans text-white/70 text-xs sm:text-sm md:text-base leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
