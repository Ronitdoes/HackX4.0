"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Brand {
  name: string;
  logo: React.ReactNode;
  description: string;
}

const brands: Brand[] = [
  {
    name: "Health",
    logo: (
      <svg className="w-full h-auto max-h-[95px] fill-current text-[#f9f6f0]" viewBox="0 0 200 90">
        <text x="28" y="22" dominantBaseline="middle" textAnchor="end" fontFamily="sans-serif" fontWeight="900" fontSize="27" fill="currentColor">3</text>
        <text x="36" y="15" dominantBaseline="middle" textAnchor="start" fontFamily="sans-serif" fontWeight="700" fontSize="13" letterSpacing="0.02em" fill="currentColor">GOOD HEALTH</text>
        <text x="36" y="28" dominantBaseline="middle" textAnchor="start" fontFamily="sans-serif" fontWeight="700" fontSize="13" letterSpacing="0.02em" fill="currentColor">AND WELL-BEING</text>
        <path d="M40 58 L72 58 L78 46 L84 72 L92 36 L100 68 L106 52 L112 58 L124 58" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M136 52 Q136 46 142 46 Q148 46 148 52 Q148 58 136 66 Q124 58 124 52 Q124 46 130 46 Q136 46 136 52Z" fill="currentColor" />
      </svg>
    ),
    description: "Ensuring healthy lives and promoting well-being for all at every age.",
  },
  {
    name: "Education",
    logo: (
      <svg className="w-full h-auto max-h-[95px] fill-current text-[#f9f6f0]" viewBox="0 0 200 90">
        <text x="28" y="22" dominantBaseline="middle" textAnchor="end" fontFamily="sans-serif" fontWeight="900" fontSize="27" fill="currentColor">4</text>
        <text x="36" y="15" dominantBaseline="middle" textAnchor="start" fontFamily="sans-serif" fontWeight="700" fontSize="13" letterSpacing="0.02em" fill="currentColor">QUALITY</text>
        <text x="36" y="28" dominantBaseline="middle" textAnchor="start" fontFamily="sans-serif" fontWeight="700" fontSize="13" letterSpacing="0.02em" fill="currentColor">EDUCATION</text>
        <path d="M80 46 Q95 50 100 56 Q105 50 120 46 L120 74 Q105 78 100 72 Q95 78 80 74 Z" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <line x1="100" y1="56" x2="100" y2="72" stroke="currentColor" strokeWidth="2.2" />
        <path d="M128 44 L134 50 L130 70 L126 70 L126 66 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    description: "Inclusive and equitable quality education for lifelong learning.",
  },
  {
    name: "Equality",
    logo: (
      <svg className="w-full h-auto max-h-[95px] fill-current text-[#f9f6f0]" viewBox="0 0 200 90">
        <text x="28" y="22" dominantBaseline="middle" textAnchor="end" fontFamily="sans-serif" fontWeight="900" fontSize="27" fill="currentColor">5</text>
        <text x="36" y="15" dominantBaseline="middle" textAnchor="start" fontFamily="sans-serif" fontWeight="700" fontSize="13" letterSpacing="0.02em" fill="currentColor">GENDER</text>
        <text x="36" y="28" dominantBaseline="middle" textAnchor="start" fontFamily="sans-serif" fontWeight="700" fontSize="13" letterSpacing="0.02em" fill="currentColor">EQUALITY</text>
        <circle cx="100" cy="54" r="11" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <line x1="94" y1="51" x2="106" y2="51" stroke="currentColor" strokeWidth="2.5" />
        <line x1="94" y1="57" x2="106" y2="57" stroke="currentColor" strokeWidth="2.5" />
        <line x1="100" y1="65" x2="100" y2="78" stroke="currentColor" strokeWidth="2.5" />
        <line x1="93" y1="72" x2="107" y2="72" stroke="currentColor" strokeWidth="2.5" />
        <line x1="108" y1="46" x2="116" y2="38" stroke="currentColor" strokeWidth="2.5" />
        <polyline points="109,38 116,38 116,45" fill="none" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    ),
    description: "Empowering all women and girls through equal opportunities.",
  },
  {
    name: "Clean Energy",
    logo: (
      <svg className="w-full h-auto max-h-[95px] fill-current text-[#f9f6f0]" viewBox="0 0 200 90">
        <text x="28" y="22" dominantBaseline="middle" textAnchor="end" fontFamily="sans-serif" fontWeight="900" fontSize="27" fill="currentColor">7</text>
        <text x="36" y="15" dominantBaseline="middle" textAnchor="start" fontFamily="sans-serif" fontWeight="700" fontSize="13" letterSpacing="0.02em" fill="currentColor">AFFORDABLE AND</text>
        <text x="36" y="28" dominantBaseline="middle" textAnchor="start" fontFamily="sans-serif" fontWeight="700" fontSize="13" letterSpacing="0.02em" fill="currentColor">CLEAN ENERGY</text>
        <circle cx="100" cy="58" r="9" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <line x1="100" y1="52" x2="100" y2="58" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="100" y1="42" x2="100" y2="45" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="100" y1="71" x2="100" y2="74" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="84" y1="58" x2="87" y2="58" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="113" y1="58" x2="116" y2="58" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="89" y1="47" x2="91" y2="49" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="109" y1="67" x2="111" y2="69" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="89" y1="69" x2="91" y2="67" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="109" y1="49" x2="111" y2="47" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
    description: "Affordable, reliable, sustainable and modern energy for all.",
  },
  {
    name: "Decent Work",
    logo: (
      <svg className="w-full h-auto max-h-[95px] fill-current text-[#f9f6f0]" viewBox="0 0 200 90">
        <text x="28" y="22" dominantBaseline="middle" textAnchor="end" fontFamily="sans-serif" fontWeight="900" fontSize="27" fill="currentColor">8</text>
        <text x="36" y="15" dominantBaseline="middle" textAnchor="start" fontFamily="sans-serif" fontWeight="700" fontSize="13" letterSpacing="0.02em" fill="currentColor">DECENT WORK AND</text>
        <text x="36" y="28" dominantBaseline="middle" textAnchor="start" fontFamily="sans-serif" fontWeight="700" fontSize="13" letterSpacing="0.02em" fill="currentColor">ECONOMIC GROWTH</text>
        <rect x="84" y="66" width="6" height="10" fill="currentColor" />
        <rect x="94" y="58" width="6" height="18" fill="currentColor" />
        <rect x="104" y="50" width="6" height="26" fill="currentColor" />
        <rect x="114" y="42" width="6" height="34" fill="currentColor" />
        <polyline points="80,58 95,48 106,42 122,32" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="112,32 122,32 122,42" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    description: "Sustained, inclusive economic growth and decent work for all.",
  },
  {
    name: "Innovation",
    logo: (
      <svg className="w-full h-auto max-h-[95px] fill-current text-[#f9f6f0]" viewBox="0 0 200 90">
        <text x="28" y="22" dominantBaseline="middle" textAnchor="end" fontFamily="sans-serif" fontWeight="900" fontSize="27" fill="currentColor">9</text>
        <text x="36" y="15" dominantBaseline="middle" textAnchor="start" fontFamily="sans-serif" fontWeight="700" fontSize="13" letterSpacing="0.02em" fill="currentColor">INDUSTRY, INNOVATION</text>
        <text x="36" y="28" dominantBaseline="middle" textAnchor="start" fontFamily="sans-serif" fontWeight="700" fontSize="13" letterSpacing="0.02em" fill="currentColor">AND INFRASTRUCTURE</text>
        <polygon points="100,38 112,45 100,52 88,45" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M88 45 L88 59 L100 66 L100 52" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M112 45 L112 59 L100 66" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <polygon points="88,59 76,66 88,73 100,66" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M76 66 L76 80 L88 87 L88 73" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M100 66 L100 80 L88 87" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <polygon points="112,59 100,66 112,73 124,66" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M100 66 L100 80 L112 87 L112 73" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M124 66 L124 80 L112 87" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      </svg>
    ),
    description: "Resilient infrastructure and inclusive industrialization.",
  },
  {
    name: "Equality",
    logo: (
      <svg className="w-full h-auto max-h-[95px] fill-current text-[#f9f6f0]" viewBox="0 0 200 90">
        <text x="26" y="22" dominantBaseline="middle" textAnchor="end" fontFamily="sans-serif" fontWeight="900" fontSize="25" fill="currentColor">10</text>
        <text x="34" y="15" dominantBaseline="middle" textAnchor="start" fontFamily="sans-serif" fontWeight="700" fontSize="13" letterSpacing="0.02em" fill="currentColor">REDUCED</text>
        <text x="34" y="28" dominantBaseline="middle" textAnchor="start" fontFamily="sans-serif" fontWeight="700" fontSize="13" letterSpacing="0.02em" fill="currentColor">INEQUALITIES</text>
        <rect x="94" y="54" width="12" height="3" fill="currentColor" />
        <rect x="94" y="61" width="12" height="3" fill="currentColor" />
        <polygon points="100,38 92,47 108,47" fill="currentColor" />
        <polygon points="100,80 92,71 108,71" fill="currentColor" />
        <polygon points="78,59 87,51 87,67" fill="currentColor" />
        <polygon points="122,59 113,51 113,67" fill="currentColor" />
      </svg>
    ),
    description: "Reducing inequality within and among countries.",
  },
  {
    name: "Climate",
    logo: (
      <svg className="w-full h-auto max-h-[95px] fill-current text-[#f9f6f0]" viewBox="0 0 200 90">
        <text x="26" y="22" dominantBaseline="middle" textAnchor="end" fontFamily="sans-serif" fontWeight="900" fontSize="25" fill="currentColor">13</text>
        <text x="34" y="15" dominantBaseline="middle" textAnchor="start" fontFamily="sans-serif" fontWeight="700" fontSize="13" letterSpacing="0.02em" fill="currentColor">CLIMATE</text>
        <text x="34" y="28" dominantBaseline="middle" textAnchor="start" fontFamily="sans-serif" fontWeight="700" fontSize="13" letterSpacing="0.02em" fill="currentColor">ACTION</text>
        <path d="M72 58 Q100 38 128 58 Q100 78 72 58 Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="100" cy="58" r="9" fill="currentColor" />
        <path d="M96 52 Q100 50 102 54 Q98 58 95 56 Z M103 57 Q106 55 107 60 Q101 64 100 60 Z" fill="#000" />
      </svg>
    ),
    description: "Urgent action to combat climate change and its impacts.",
  },
  {
    name: "Partnerships",
    logo: (
      <svg className="w-full h-auto max-h-[95px] fill-current text-[#f9f6f0]" viewBox="0 0 200 90">
        <text x="26" y="22" dominantBaseline="middle" textAnchor="end" fontFamily="sans-serif" fontWeight="900" fontSize="25" fill="currentColor">17</text>
        <text x="34" y="15" dominantBaseline="middle" textAnchor="start" fontFamily="sans-serif" fontWeight="700" fontSize="13" letterSpacing="0.02em" fill="currentColor">PARTNERSHIPS</text>
        <text x="34" y="28" dominantBaseline="middle" textAnchor="start" fontFamily="sans-serif" fontWeight="700" fontSize="13" letterSpacing="0.02em" fill="currentColor">FOR THE GOALS</text>
        <g stroke="currentColor" strokeWidth="2" fill="none" transform="translate(100,58)">
          <circle cx="0" cy="0" r="10" />
          <circle cx="0" cy="-6" r="10" />
          <circle cx="5.2" cy="-3" r="10" />
          <circle cx="5.2" cy="3" r="10" />
          <circle cx="0" cy="6" r="10" />
          <circle cx="-5.2" cy="3" r="10" />
          <circle cx="-5.2" cy="-3" r="10" />
        </g>
      </svg>
    ),
    description: "Global partnerships for sustainable development.",
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
      {/* Desktop View: Pinned Arc Conveyor */}
      <div
        ref={sectionRef}
        className="hidden md:flex w-full h-screen relative items-center opacity-0"
      >
        {/* Brand Stack (Arc Motion Area) */}
        <div className="absolute left-[24vw] top-0 h-full w-[50vw] flex items-start pt-[48vh] justify-start z-20 pointer-events-none">
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
        <div className="absolute right-[6.5vw] top-0 h-full w-[32vw] flex items-start pt-[48vh] z-30 pointer-events-auto">
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
                  {brand.logo}
                </div>
                <p className="font-sans text-sm leading-relaxed font-normal text-[#f9f6f0]/90 select-text">
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
          <div className="flex items-center justify-center gap-2 font-serif italic text-base text-[#f9f6f0]/80 mb-3">
            <span>{brands.length}</span>
            <span>-</span>
            <span>Sustainable Goals</span>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#f9f6f0]/75 max-w-sm sm:max-w-md mx-auto text-center leading-relaxed mb-12 font-light">
            Addressing global challenges through innovation, equality, health, and sustainable development to build a better future.
          </p>

          {/* 3-Column Logo Grid */}
          <div className="grid grid-cols-3 gap-y-12 gap-x-4 items-center justify-items-center">
            {brands.map((brand, idx) => (
              <div
                key={idx}
                className="w-full flex items-center justify-center p-1 text-[#f9f6f0]"
              >
                <div className="w-full max-w-[165px] h-auto flex items-center justify-center">
                  {brand.logo}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

