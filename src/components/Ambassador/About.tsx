"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  const paragraph1 =
    "Our Campus Ambassador Program is an incredible opportunity for students to represent our college and help us spread the word about our mission. As a Campus Ambassador, you will gain valuable experience, enhance your leadership skills, and connect with like-minded individuals.";

  const paragraph2 =
    "You will be the face of our hackathon on your campus, organizing events, sharing our story, and promoting our values. This role is perfect for proactive, enthusiastic, and passionate students who want to make a difference.";

  const words1 = paragraph1.split(" ");
  const words2 = paragraph2.split(" ");

  useGSAP(
    () => {
      gsap.to(".about-word", {
        opacity: 1,
        stagger: 0.02,
        ease: "power1.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 55%",
          scrub: 0.5,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="relative w-full overflow-hidden py-6 md:py-24">
      {/* Large outlined background text */}
      <div className="absolute inset-0 flex items-center justify-center z-[1] pointer-events-none select-none overflow-hidden">
        <span
          className="block font-sans font-black uppercase text-center tracking-wider"
          style={{
            fontSize: "clamp(3.5rem, 14vw, 16rem)",
            WebkitTextStroke: "1px rgba(255,255,255,0.15)",
            color: "transparent",
            opacity: 0.8,
            letterSpacing: "0.05em",
          }}
        >
          ABOUT
        </span>
      </div>

      {/* Main Container */}
      <div className="relative z-10 flex items-center justify-center px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-4xl w-full"
        >
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="font-sans font-extrabold uppercase text-[39px] md:text-[51px] lg:text-[63px] tracking-wide text-white">
              About
            </h2>
          </div>

          {/* Main Card with Glassmorphism */}
          <div
            ref={containerRef}
            className="relative rounded-3xl p-8 md:p-12 overflow-hidden border border-white/10"
            style={{
              background: "rgba(0, 0, 0, 0.45)",
              backdropFilter: "blur(20px)",
              boxShadow:
                "0 25px 60px rgba(0,0,0,0.2), 0 8px 20px rgba(0,0,0,0.15)",
            }}
          >
            {/* Ambient Background Glow inside Card */}
            <div 
              className="absolute -top-24 -left-24 w-48 h-48 rounded-full pointer-events-none select-none z-0 filter blur-[80px] opacity-25"
              style={{
                background: "var(--color-magenta, #D242D7)",
              }}
            />
            <div 
              className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full pointer-events-none select-none z-0 filter blur-[80px] opacity-20"
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
                    className="about-word opacity-[0.20] inline-block mr-[0.25em]"
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
                    className="about-word opacity-[0.20] inline-block mr-[0.25em]"
                  >
                    {word}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
