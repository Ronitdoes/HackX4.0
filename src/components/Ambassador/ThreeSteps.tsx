"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ThreeSteps() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightColRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      num: "01",
      title: "Apply Online",
      desc: "Fill out our quick application form to share your profile, experience, and motivation.",
      color: "from-[#D242D7] to-[#B86EF9]",
    },
    {
      num: "02",
      title: "Get Shortlisted",
      desc: "Our team will review your application and conduct a brief onboarding discussion.",
      color: "from-[#B86EF9] to-[#7801FF]",
    },
    {
      num: "03",
      title: "Lead & Earn",
      desc: "Promote HackX 4.0 on your campus, help teams register, and claim exclusive rewards.",
      color: "from-[#7801FF] to-[#D242D7]",
    },
  ];

  useGSAP(
    () => {
      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rightColRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      const card1 = cardRefs.current[0];
      const card2 = cardRefs.current[1];
      const card3 = cardRefs.current[2];

      if (!card1 || !card2 || !card3 || !sectionRef.current) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 767px)",
          isDesktop: "(min-width: 768px)",
        },
        (context) => {
          const { isMobile: isMobileSize } = context.conditions as {
            isMobile: boolean;
            isDesktop: boolean;
          };

          // Final offset positions (centered on mobile, staggered offset on desktop)
          const c1X = isMobileSize ? 0 : -50;
          const c1Y = isMobileSize ? -15 : -35;

          const c2X = 0;
          const c2Y = 0;

          const c3X = isMobileSize ? 0 : 50;
          const c3Y = isMobileSize ? 15 : 35;

          // Initial card entrance distance (reduced on mobile for smooth viewport entry)
          const enterY = isMobileSize ? 100 : 500;

          gsap.set(card1, { x: c1X, y: c1Y, rotation: 0, opacity: 1 });
          gsap.set(card2, {
            x: c2X + (isMobileSize ? 0 : 150),
            y: enterY,
            rotation: 0,
            opacity: isMobileSize ? 0.3 : 0,
          });
          gsap.set(card3, {
            x: c3X + (isMobileSize ? 0 : 150),
            y: enterY,
            rotation: 0,
            opacity: isMobileSize ? 0.3 : 0,
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: isMobileSize ? "top 80%" : "top top",
              end: isMobileSize ? "bottom 20%" : "+=170%",
              scrub: 1.2,
              pin: !isMobileSize,
              pinSpacing: !isMobileSize,
              refreshPriority: 5,
            },
          });

          tl.to(card2, {
            x: c2X,
            y: c2Y,
            rotation: 0,
            opacity: 1,
            ease: "power3.out",
            duration: 1.5,
          }, "+=0.5")
          .to(card3, {
            x: c3X,
            y: c3Y,
            rotation: 0,
            opacity: 1,
            ease: "power3.out",
            duration: 1.5,
          }, "+=0.5");
        }
      );

    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative w-full h-auto min-h-fit md:h-screen-stable md:min-h-screen-stable bg-transparent select-none flex items-center z-10 py-16 md:py-0">
      {/* Background Soft Glows */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[280px] h-[280px] sm:w-[450px] sm:h-[450px] rounded-full pointer-events-none filter blur-[80px] sm:blur-[120px] opacity-20"
        style={{
          background: "radial-gradient(circle, var(--color-violet, #7801FF) 0%, transparent 70%)",
          transform: "translate3d(-25%, -50%, 0)",
        }}
      />
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[280px] h-[280px] sm:w-[450px] sm:h-[450px] rounded-full pointer-events-none filter blur-[80px] sm:blur-[120px] opacity-15"
        style={{
          background: "radial-gradient(circle, var(--color-magenta, #D242D7) 0%, transparent 70%)",
          transform: "translate3d(25%, -50%, 0)",
        }}
      />

      <div className="max-w-[1250px] mx-auto px-6 md:px-12 flex w-full flex-col-reverse md:flex-row items-center md:items-start justify-between gap-12 md:gap-12 md:pt-16">
        {/* Left Column: Stacked Interactive Cards */}
        <div
          className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] flex items-center justify-center mx-auto md:mx-0"
        >
          {steps.map((step, idx) => {
            return (
              <div
                key={step.num}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className="absolute inset-0 cursor-pointer"
                style={{
                  zIndex: 10 + idx,
                }}
              >
                <div
                  className="w-full h-full p-6 md:p-8 rounded-none border border-white/20 flex flex-col justify-between origin-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 bg-[#16072b] md:bg-[rgba(18,5,38,0.88)] md:backdrop-blur-xl md:backdrop-saturate-150"
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.03) 100%)",
                    transform: "translateZ(0)",
                  }}
                >
                  {/* Top of Card: Step Number */}
                  <div className="flex justify-between items-start">
                    <span className={`font-sans font-black text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r ${step.color} select-none`}>
                      {step.num}
                    </span>

                    {/* Subtle HackX Logo Watermark */}
                    <div className="opacity-10 w-12 h-12 relative pointer-events-none select-none">
                      <Image
                        src="/assets/logos/HACKX White@2x.png"
                        alt="HackX watermark"
                        fill
                        sizes="48px"
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Bottom of Card: Step Content */}
                  <div className="flex flex-col gap-2 mt-auto">
                    <h4 className="font-sans font-black text-xl md:text-2xl uppercase tracking-wide text-white leading-tight">
                      {step.title}
                    </h4>
                    <p className="font-sans text-white/60 text-xs md:text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Heading Text */}
        <div className="flex-1 max-w-[600px] text-center md:text-right md:-translate-y-8">
          <div
            ref={rightColRef}
            className="flex flex-col gap-4 opacity-0"
          >
            <h2 className="font-sans font-black uppercase text-4xl sm:text-5xl md:text-6xl text-white tracking-normal leading-[1.0] flex flex-col gap-2 items-center md:items-end">
              <span>CAMPUS</span>
              <span>AMBASSADOR</span>
              <span className="leading-[1.1] pb-1 text-white">
                IN 3 SIMPLE STEPS
              </span>
            </h2>
            <p className="font-sans text-white/60 text-sm md:text-base mt-4 max-w-[480px] leading-relaxed md:ml-auto text-center md:text-left">
              As a Campus Ambassador, you will be responsible for promoting our brand on campus, organizing and hosting events and workshops, engaging with students and gathering feedback, and representing our company at campus fairs and events.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
