"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function WhyApply() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardRef.current || !badgeRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      ).fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0.5, rotate: -10 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden py-16 sm:py-24 md:py-32 lg:py-40">
      {/* Large outlined background text */}
      <div className="absolute inset-0 flex items-center justify-center z-[1] pointer-events-none select-none overflow-hidden">
        <div className="flex flex-col items-center justify-center leading-[0.85] w-full gap-[220px] sm:gap-[260px] md:gap-48 lg:gap-56">
          <span
            className="block font-sans font-black uppercase text-center"
            style={{
              fontSize: "clamp(2.5rem, 11vw, 15.5rem)",
              WebkitTextStroke: "2px rgba(255,255,255,0.70)",
              color: "transparent",
              opacity: 0.45,
              letterSpacing: "-0.02em",
            }}
          >
            WHY SHOULD
          </span>
          <span
            className="block font-sans font-black uppercase text-center"
            style={{
              fontSize: "clamp(2.5rem, 11vw, 15.5rem)",
              WebkitTextStroke: "2px rgba(255,255,255,0.70)",
              color: "transparent",
              opacity: 0.45,
              letterSpacing: "-0.02em",
            }}
          >
            YOU APPLY?
          </span>
        </div>
      </div>

      {/* Floating card + heart icon */}
      <div className="relative z-10 flex items-center justify-center px-4 sm:px-6 md:px-12 min-h-[350px] sm:min-h-[400px]">
        <div
          ref={cardRef}
          className="relative max-w-4xl w-full translate-y-0 md:-translate-y-12 opacity-0"
        >
          {/* Heart / Logo badge */}
          <div
            ref={badgeRef}
            className="absolute -top-10 -right-3 sm:-top-12 sm:-right-6 md:-top-16 md:-right-10 z-20 opacity-0"
          >
            <Image
              src="/assets/logos/HACKX White@2x.png"
              alt="HackX Logo"
              width={140}
              height={140}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-36 md:h-36 object-contain drop-shadow-lg"
            />
          </div>

          {/* Main card */}
          <div
            className="relative rounded-3xl p-6 sm:p-8 md:p-12 lg:p-14 overflow-hidden border border-white/10 bg-black/50 backdrop-blur-md"
            style={{
              boxShadow:
                "0 25px 60px rgba(0,0,0,0.2), 0 8px 20px rgba(0,0,0,0.15)",
              transform: "translateZ(0)",
            }}
          >
            <p
              className="font-sans text-white/90 text-lg md:text-xl lg:text-2xl leading-relaxed font-medium"
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