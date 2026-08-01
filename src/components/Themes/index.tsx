"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ThemeCard, { ThemeCardData } from "./ThemeCard";

gsap.registerPlugin(ScrollTrigger);

// Custom HackX 4.0 themes with appropriate cyber-tech graphics
const THEME_CARDS: ThemeCardData[] = [
  {
    id: "01",
    title: "AI & Neural Systems",
    subtitle: "INTELLIGENT AGENTS",
    category: "TRACK 01",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
    styleType: "night-goggles",
  },
  {
    id: "02",
    title: "Web3 & Blockchain",
    category: "TRACK 02",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    styleType: "loss",
  },
  {
    id: "03",
    title: "FinTech & DeFi",
    category: "TRACK 03",
    image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&w=800&q=80",
    styleType: "now",
  },
  {
    id: "04",
    title: "Healthcare & MedTech",
    category: "TRACK 04",
    image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80",
    styleType: "saigon-souls",
  },
  {
    id: "05",
    title: "EdTech & VR Learning",
    category: "TRACK 05",
    styleType: "fromanother",
  },
  {
    id: "06",
    title: "Smart Cities & IoT",
    category: "TRACK 06",
    styleType: "fwa",
  },
  {
    id: "07",
    title: "Open Innovation",
    category: "TRACK 07",
    styleType: "site-of-the-day",
  },
];

export default function Themes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const track = trackRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLElement[];
    const container = containerRef.current;

    if (!track || cards.length === 0 || !container) return;

    const vWidth = window.innerWidth;
    const isMobileView = vWidth < 768;

    // Reset card styles to calculate clean base dimensions
    gsap.set(cards, { rotation: 0, y: 0, z: 0, scale: 1 });

    const cardRect = cards[0].getBoundingClientRect();
    const cardWidth = cardRect.width;

    // Extract gap from computed style to avoid rotated bounding rect issues
    let gap = vWidth * (isMobileView ? 0.06 : 0.04); // fallback to 6vw / 4vw
    const style = window.getComputedStyle(track);
    const gapVal = style.gap;
    if (gapVal && gapVal.includes("px")) {
      gap = parseFloat(gapVal);
    }

    const N = cards.length;
    const step = cardWidth + gap;

    // Start: Card 0 is centered in viewport
    const startX = vWidth / 2 - cardWidth / 2;
    // End: Card N-1 is centered in viewport
    const endX = startX - (N - 1) * step;

    // Set track initial offset
    gsap.set(track, { x: startX });

    // Curved bend parameters
    const maxRotation = isMobileView ? 6 : 13; // Max degrees of tilt
    const maxY = isMobileView ? 35 : 90;        // Max downward drop (pixels)
    const maxZ = isMobileView ? 50 : 120;       // Max depth push into 3D space

    const setCardState = (card: HTMLElement, index: number, progress: number) => {
      // Linear offset of the card's center relative to screen center
      const dx = (index - progress * (N - 1)) * step;

      // Normalize offset against 65% of viewport width
      const normDx = dx / (vWidth * 0.65);
      const absNorm = Math.min(Math.abs(normDx), 1.5);

      // Calculate card values based on offset (left cards tilt left, right cards tilt right)
      const rotation = normDx * maxRotation;
      const y = Math.pow(absNorm, 1.4) * maxY;
      const z = -Math.pow(absNorm, 1.4) * maxZ;

      gsap.set(card, {
        rotation: rotation,
        y: y,
        z: z,
        transformPerspective: 1000,
      });
    };

    // Apply start state immediately
    cards.forEach((card, i) => setCardState(card, i, 0));

    // Build main GSAP Timeline with ScrollTrigger pinned on all viewports
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${vWidth * (isMobileView ? 10.0 : 2.2)}`,
        scrub: isMobileView ? 1.0 : 0.8,
        pin: true,
        invalidateOnRefresh: true,
        refreshPriority: 10,
        fastScrollEnd: true,
        preventOverlaps: "ambassador-themes",
      },
      onUpdate: function () {
        const p = this.progress();
        cards.forEach((card, i) => {
          setCardState(card, i, p);
        });
      },
    });

    timeline.fromTo(track,
      { x: startX },
      { x: endX, ease: "none" }
    );

    // Fade in container after paint/measure delay
    gsap.to(container, { opacity: 1, duration: 0.4 });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="h-screen-stable min-h-screen-stable relative w-full overflow-hidden bg-transparent opacity-0 flex items-center touch-pan-y overscroll-y-contain"
    >
      {/* Main image horizontal slider track */}
      <div className="h-full w-full flex items-center justify-start overflow-hidden absolute top-0 left-0">
        <div
          ref={trackRef}
          className="flex gap-[6vw] md:gap-[4vw] select-none pointer-events-auto py-8 md:py-16 will-change-transform pl-0 ml-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {THEME_CARDS.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="will-change-transform"
            >
              <ThemeCard card={card} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
