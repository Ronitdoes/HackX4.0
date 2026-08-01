"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const cardOuterRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const paragraph1 =
    "Our Campus Ambassador Program is an incredible opportunity for students to represent our college and help us spread the word about our mission. As a Campus Ambassador, you will gain valuable experience, enhance your leadership skills, and connect with like-minded individuals.";

  const paragraph2 =
    "You will be the face of our hackathon on your campus, organizing events, sharing our story, and promoting our values. This role is perfect for proactive, enthusiastic, and passionate students who want to make a difference.";

  const words1 = paragraph1.split(" ");
  const words2 = paragraph2.split(" ");

  useGSAP(
    () => {
      if (cardOuterRef.current) {
        gsap.fromTo(
          cardOuterRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardOuterRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      const words = gsap.utils.toArray<HTMLElement>(".about-word", containerRef.current);
      if (words.length > 0) {
        gsap.to(words, {
          opacity: 1,
          stagger: 0.02,
          ease: "power1.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "+=120%",
            scrub: 0.5,
            refreshPriority: 2,
          },
        });
      }
    },
    { scope: cardOuterRef }
  );

  return (
    <section className="relative w-full overflow-hidden py-6 md:py-24">
      {/* Main Container */}
      <div className="relative z-10 flex items-center justify-center px-6 md:px-12">
        <div
          ref={cardOuterRef}
          className="relative max-w-4xl w-full opacity-0 will-change-transform"
        >
          {/* Section Header */}
          <div className="text-center mb-4 md:mb-8 pointer-events-none select-none">
            <h2
              className="font-sans font-black uppercase tracking-wider text-center"
              style={{
                fontSize: "clamp(3.2rem, 13vw, 8rem)",
                WebkitTextStroke: "2px rgba(255,255,255,0.70)",
                color: "transparent",
                letterSpacing: "0.05em",
                lineHeight: 1,
              }}
            >
              ABOUT
            </h2>
          </div>

          {/* Main Card with Glassmorphism */}
          <div
            ref={containerRef}
            className="relative rounded-3xl p-8 md:p-12 overflow-hidden border border-white/10 bg-black/45 backdrop-blur-md"
            style={{
              boxShadow:
                "0 25px 60px rgba(0,0,0,0.2), 0 8px 20px rgba(0,0,0,0.15)",
              transform: "translateZ(0)",
            }}
          >
            {/* Ambient Background Glow inside Card */}
            <div 
              className="absolute -top-24 -left-24 w-48 h-48 rounded-full pointer-events-none select-none z-0 filter blur-[50px] opacity-25 will-change-transform"
              style={{
                background: "var(--color-magenta, #D242D7)",
              }}
            />
            <div 
              className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full pointer-events-none select-none z-0 filter blur-[50px] opacity-20 will-change-transform"
              style={{
                background: "var(--color-violet, #7801FF)",
              }}
            />

            <div className="relative z-10 flex flex-col gap-6 md:gap-8">
              <p
                className="font-sans text-white text-lg md:text-xl lg:text-2xl leading-relaxed font-medium text-center"
                style={{ letterSpacing: "0.01em" }}
              >
                {words1.map((word, idx) => (
                  <span
                    key={idx}
                    className="about-word opacity-[0.20] inline-block mr-[0.25em] will-change-[opacity]"
                  >
                    {word}
                  </span>
                ))}
              </p>
              
              <p
                className="font-sans text-white text-lg md:text-xl lg:text-2xl leading-relaxed font-medium text-center"
                style={{ letterSpacing: "0.01em" }}
              >
                {words2.map((word, idx) => (
                  <span
                    key={idx}
                    className="about-word opacity-[0.20] inline-block mr-[0.25em] will-change-[opacity]"
                  >
                    {word}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
