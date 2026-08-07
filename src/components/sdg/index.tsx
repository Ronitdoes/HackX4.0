"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Brand {
  name: string;
  logo: string | React.ReactNode;
  description: string;
}

const brands: Brand[] = [
  {
    name: "Healthcare",
    logo: "/assets/themes/healthcare.svg",
    description: "Ensuring healthy lives, medical innovation, and digital health solutions for all.",
  },
  {
    name: "EdTech",
    logo: "/assets/themes/edtech.svg",
    description: "Transforming learning through immersive technologies, smart classrooms, and accessible education.",
  },
  {
    name: "FinTech",
    logo: "/assets/themes/fintech.svg",
    description: "Empowering decentralized finance, digital transactions, and next-gen banking systems.",
  },
  {
    name: "Environment",
    logo: "/assets/themes/enviroment.svg",
    description: "Developing sustainable technology, green energy, and environmental protection systems.",
  },
  {
    name: "Cybersecurity",
    logo: "/assets/themes/cybersecurity.svg",
    description: "Securing digital infrastructure, data privacy, and advanced threat intelligence systems.",
  },
  {
    name: "Blockchain",
    logo: "/assets/themes/blockchian.svg",
    description: "Building decentralized protocols, Web3 ecosystems, and transparent ledger solutions.",
  },
  {
    name: "Defence",
    logo: "/assets/themes/defence.svg",
    description: "Advancing defense tech, autonomous security, and strategic intelligence systems.",
  },
  {
    name: "Disaster Tech",
    logo: "/assets/themes/disaster.svg",
    description: "Creating early warning systems, resilient infrastructure, and crisis response tech.",
  },
  {
    name: "Open Innovation",
    logo: "/assets/themes/open_innovation.svg",
    description: "Fostering unrestricted cross-disciplinary innovation and creative problem solving.",
  },
  {
    name: "Supply Chain",
    logo: "/assets/themes/supplychain.svg",
    description: "Optimizing global logistics, smart tracking, and resilient supply networks.",
  },
];

export default function SdgComponent() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stackGroupRef = useRef<HTMLDivElement>(null);

  const brandRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [settledIndex, setSettledIndex] = useState(0);
  const prevSettledIndexRef = useRef(0);
  const activeIndexRef = useRef(0);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // Debounce activeIndex updates by 120ms to settle scroll targets before transitioning
  useEffect(() => {
    const timer = setTimeout(() => {
      setSettledIndex(activeIndex);
    }, 120);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  // Smooth, constant-speed time-based transition played when selection changes
  useEffect(() => {
    const prevIdx = prevSettledIndexRef.current;
    if (prevIdx === settledIndex) return;

    // Fade/blur out previous card
    if (cardRefs.current[prevIdx]) {
      gsap.to(cardRefs.current[prevIdx], {
        opacity: 0,
        filter: "blur(20px)",
        pointerEvents: "none",
        duration: 0.55,
        ease: "power2.inOut",
      });
    }

    // Fade/blur in next active card
    if (cardRefs.current[settledIndex]) {
      gsap.to(cardRefs.current[settledIndex], {
        opacity: 1,
        filter: "blur(0px)",
        pointerEvents: "auto",
        duration: 0.55,
        ease: "power2.out",
      });
    }

    prevSettledIndexRef.current = settledIndex;
  }, [settledIndex]);

  const getArcPosition = (diff: number, isMobile = false) => {
    const absDiff = Math.abs(diff);
    // Radius tuned for viewport (smaller radius on mobile so the arc curve remains prominent)
    const R = isMobile ? 520 : 850;
    // Spacing angle in degrees
    const angleDeg = isMobile ? 14 : 7.5;
    const angleRad = (absDiff * angleDeg * Math.PI) / 180;

    // x shifts LEFT as distance from center increases
    const x = -(R - R * Math.cos(angleRad));
    // y shifts UP for items above (diff < 0) and DOWN for items below (diff > 0)
    const yMagnitude = R * Math.sin(angleRad);
    const y = diff < 0 ? -yMagnitude : diff > 0 ? yMagnitude : 0;
    const rotation = diff * angleDeg;

    return { x, y, rotation };
  };

  // Helper: get visual properties based on distance from active item
  const getVisualProps = (diff: number, isMobile = false) => {
    const absDiff = Math.abs(diff);
    return {
      scale: isMobile
        ? 1.0 - Math.min(absDiff * 0.08, 0.35)
        : 1.0 - Math.min(absDiff * 0.03, 0.2),
      opacity: absDiff === 0 ? 1 : Math.max(0.4 - absDiff * 0.09, 0.1),
      blur: isMobile ? Math.min(absDiff * 0.5, 2.0) : Math.min(absDiff * 0.4, 2.5),
      fill: "#f9f6f0",
      stroke: "0px transparent",
    };
  };

  useGSAP(
    () => {
      if (!isReady) return;

      const mm = gsap.matchMedia();

      // Desktop layout (> 768px)
      mm.add("(min-width: 769px)", () => {
        if (!sectionRef.current) return;

        // Setup initial card states — active is index 0
        brands.forEach((_, k) => {
          if (cardRefs.current[k]) {
            gsap.set(cardRefs.current[k], {
              opacity: k === 0 ? 1 : 0,
              y: 0,
              filter: k === 0 ? "blur(0px)" : "blur(20px)",
              pointerEvents: k === 0 ? "auto" : "none",
            });
          }
        });

        brands.forEach((_, k) => {
          if (brandRefs.current[k]) {
            const diff = k - 0;
            const pos = getArcPosition(diff, false);
            const vis = getVisualProps(diff, false);

            gsap.set(brandRefs.current[k], {
              x: pos.x,
              y: pos.y,
              yPercent: -50,
              rotation: pos.rotation,
              scale: vis.scale,
              opacity: vis.opacity,
              filter: `blur(${vis.blur}px)`,
              transformOrigin: "left center",
            });
          }
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${window.innerHeight * (brands.length - 1) * 0.45}`,
            scrub: 0.5,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progressIdx = Math.round(self.progress * (brands.length - 1));
              if (progressIdx !== activeIndexRef.current) {
                activeIndexRef.current = progressIdx;
                setActiveIndex(progressIdx);
              }
            },
          },
        });

        for (let s = 1; s < brands.length; s++) {
          for (let k = 0; k < brands.length; k++) {
            const diff = k - s;
            const pos = getArcPosition(diff, false);
            const vis = getVisualProps(diff, false);

            tl.to(
              brandRefs.current[k],
              {
                x: pos.x,
                y: pos.y,
                rotation: pos.rotation,
                scale: vis.scale,
                opacity: vis.opacity,
                filter: `blur(${vis.blur}px)`,
                duration: 1,
                ease: "none",
              },
              s - 1
            );
          }
        }

        if (sectionRef.current) {
          gsap.to(sectionRef.current, { opacity: 1, duration: 0.4 });
        }

      });

      // Refresh ScrollTrigger to ensure accurate layout calculations
      ScrollTrigger.refresh();
    },
    { scope: sectionRef, dependencies: [isReady], revertOnUpdate: true }
  );

  return (
    <section id="sdg-section" className="w-full bg-transparent select-none overflow-hidden">
      <div className="hidden h-[37vh] items-end justify-center md:flex">
        <h2 className="font-serif italic text-white text-[9vw] sm:text-[13vw] lg:text-[12vw] leading-[0.85] text-center tracking-normal whitespace-nowrap">
          OUR THEMES
        </h2>
      </div>
      {/* Desktop View: Pinned Arc Conveyor */}
      <div
        ref={sectionRef}
        className="hidden md:flex w-full h-screen-stable relative items-center opacity-0"
      >
        {/* Brand Stack (Arc Motion Area) */}
        <div className="absolute left-[24vw] top-0 h-full w-[50vw] flex items-start pt-[25vh] justify-start z-20 pointer-events-none">
          <div ref={stackGroupRef} className="relative w-full">
            {brands.map((brand, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  brandRefs.current[idx] = el;
                }}
                className="absolute left-0 font-sans font-semibold text-[5vw] lg:text-[4.5vw] tracking-normal leading-tight text-[#f9f6f0] select-none cursor-pointer whitespace-nowrap origin-left pointer-events-auto max-w-full overflow-hidden text-ellipsis"
                onClick={() => {
                  const scrollTriggerInstance = ScrollTrigger.getAll().find(
                    (st) => st.trigger === sectionRef.current
                  );
                  if (scrollTriggerInstance) {
                    const startPos = scrollTriggerInstance.start;
                    const endPos = scrollTriggerInstance.end;
                    const scrollRange = endPos - startPos;
                    const targetScroll = startPos + (idx / (brands.length - 1)) * scrollRange;
                    window.scrollTo({
                      top: targetScroll,
                      behavior: "smooth",
                    });
                  }
                }}
                style={{
                  transformStyle: "preserve-3d",
                  willChange: "transform, opacity, filter",
                  color: "#f9f6f0",
                }}
              >
                {brand.name}
              </div>
            ))}
          </div>
        </div>

        {/* Right Active Brand Info Panel */}
        <div className="absolute right-[6.5vw] top-0 h-full w-[32vw] flex items-start pt-[25vh] z-30 pointer-events-auto">
          <div className="relative w-full h-[120px] flex items-center -translate-y-1/2">
            {brands.map((brand, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className="absolute left-0 w-full grid grid-cols-[1.2fr_1.6fr] items-center gap-10 pointer-events-none"
              >
                <div className="flex items-center justify-start h-full max-h-[85px]">
                  {typeof brand.logo === "string" ? (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="h-16 md:h-20 w-auto object-contain drop-shadow-[0_0_12px_rgba(249,246,240,0.35)]"
                    />
                  ) : (
                    brand.logo
                  )}
                </div>
                <p className="font-sans text-[15px] leading-relaxed font-normal text-[#f9f6f0]/90 select-text">
                  {brand.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile View: 3-Column Logo Grid Matching Reference Image */}
      <div className="block md:hidden w-full py-16 px-6 bg-transparent text-center select-none">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-3">
            <span className="font-serif italic text-white text-[17vw] sm:text-[15vw] lg:text-[13.5vw] leading-[0.85] text-center tracking-normal whitespace-nowrap">
              OUR THEMES
            </span>
          </div>
          
          {/* 3-Column Logo Grid */}
          <div className="grid grid-cols-3 gap-y-12 gap-x-4 items-center justify-items-center">
            {brands.map((brand, idx) => (
              <div
                key={idx}
                className="w-full flex items-center justify-center p-1 text-[#f9f6f0]"
              >
                <div className="w-full max-w-[165px] h-auto flex items-center justify-center">
                  {typeof brand.logo === "string" ? (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="h-16 sm:h-20 w-auto object-contain drop-shadow-[0_0_10px_rgba(249,246,240,0.35)]"
                    />
                  ) : (
                    brand.logo
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

