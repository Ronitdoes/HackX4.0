"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function WhyApply() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardRef.current) return;

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden py-16 sm:py-24 md:py-32 lg:py-36">
      {/* Large outlined background text */}
      <div className="absolute inset-0 flex items-center justify-center z-[1] pointer-events-none select-none overflow-hidden">
        <div className="flex flex-col items-center justify-center leading-[0.85] w-full gap-28 sm:gap-36 md:gap-40 lg:gap-48">
          <span
            className="block font-sans font-black uppercase text-center tracking-tighter whitespace-nowrap"
            style={{
              fontSize: "clamp(2.5rem, 10vw, 13.5rem)",
              WebkitTextStroke: "2px rgba(255,255,255,0.65)",
              color: "transparent",
              opacity: 0.45,
            }}
          >
            WHY SHOULD
          </span>
          <span
            className="block font-sans font-black uppercase text-center tracking-tighter whitespace-nowrap"
            style={{
              fontSize: "clamp(2.5rem, 10vw, 13.5rem)",
              WebkitTextStroke: "2px rgba(255,255,255,0.65)",
              color: "transparent",
              opacity: 0.45,
            }}
          >
            YOU APPLY?
          </span>
        </div>
      </div>

      {/* Floating card */}
      <div className="relative z-10 flex items-center justify-center px-4 sm:px-6 md:px-12">
        <div
          ref={cardRef}
          className="relative max-w-3xl lg:max-w-4xl w-full opacity-0"
        >
          {/* Main card */}
          <div
            className="relative rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 overflow-hidden border border-white/15 bg-black/65 backdrop-blur-xl"
            style={{
              boxShadow:
                "0 25px 60px rgba(0,0,0,0.5), 0 8px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
              transform: "translateZ(0)",
            }}
          >
            <p
              className="font-sans text-white/95 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed sm:leading-relaxed md:leading-relaxed font-medium"
              style={{ letterSpacing: "0.01em" }}
            >
              Becoming a Campus Ambassador offers a unique opportunity to develop
              your professional skills, network with industry leaders, and gain
              invaluable experience that will set you apart in the job market.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
