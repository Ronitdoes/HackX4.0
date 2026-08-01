"use client";

import { AnimatePresence, motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { memo, useCallback, useEffect, useState } from "react";
import WaterRippleImage from "@/components/WaterRippleImage";

const getImageUrl = (imagePath: string) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  return imagePath
    .replace("/assets/images/", "/assets/images/gallery/")
    .replace(/\.(avif|jpe?g)$/i, ".webp");
};
const RAW_PROJECTS = [
  {
    id: "02",
    title: "Solar Archive",
    category: "Experiential",
    image: "/assets/images/pic2_converted.avif",
    description: "An immersive installation designed around the warmth, scale, and quiet wonder of a manufactured sun.",
    hoverText: [
      { text: "Oriens Lum" },
      { text: "ina Walks" }
    ],
  },
  {
    id: "03",
    title: "Soft Hardware",
    category: "Brand Design",
    image: "/assets/images/pic3_converted.avif",
    description: "A tactile system that gives a small everyday object a generous, almost architectural presence.",
    hoverText: [
      { text: "Soft Hardware " },
      { text: "V2" }
    ],
  },
  {
    id: "04",
    title: "Night Signals",
    category: "Film",
    image: "/assets/images/pic4_converted.avif",
    description: "A city-scale film installation that turns a familiar skyline into a live and luminous instrument.",
    hoverText: [
      { text: "Night " },
      { text: "Signals" }
    ],
  },
  {
    id: "05",
    title: "New Rituals",
    category: "Campaign",
    image: "/assets/images/pic6_converted.avif",
    description: "A campaign study in slow gestures, dimensional light, and memorable forms of everyday connection.",
    hoverText: [
      { text: "New " },
      { text: "Rituals" }
    ],
  },
  {
    id: "06",
    title: "Half Light",
    category: "CGI Production",
    image: "/assets/images/pic7_converted.avif",
    description: "A monochrome image world that pairs quiet materiality with the restraint of editorial photography.",
    hoverText: [
      { text: "Half Light" }
    ],
  },
  {
    id: "07",
    title: "Digital Genesis",
    category: "CGI Production",
    image: "/assets/images/pic8_converted.avif",
    description: "A generative exploration of abstract digital terrains and simulated ecosystems.",
    hoverText: [
      { text: "Digital " },
      { text: "Genesis" }
    ],
  },
  {
    id: "08",
    title: "Echo Chamber",
    category: "Experiential",
    image: "/assets/images/pic9_converted.avif",
    description: "An interactive sound installation reflecting the complexities of modern communication.",
    hoverText: [
      { text: "Echo Chamber" }
    ],
  },
  {
    id: "09",
    title: "Neon Pulse",
    category: "Campaign",
    image: "/assets/images/pic10_converted.avif",
    description: "Vibrant visual aesthetics capturing the energy of late-night urban landscapes.",
    hoverText: [
      { text: "Neon" },
      { text: " Pulse" }
    ],
  },
  {
    id: "10",
    title: "Quiet Form",
    category: "Brand Design",
    image: "/assets/images/pic11_converted.avif",
    description: "Minimalist brand identity focused on negative space and typographic clarity.",
    hoverText: [
      { text: "Quiet" },
      { text: " Form" }
    ],
  },
  {
    id: "11",
    title: "Deep Current",
    category: "Film",
    image: "/assets/images/pic12_converted.avif",
    description: "A short film navigating the subconscious through fluid dynamics and underwater cinematography.",
    hoverText: [
      { text: "Deep Current" }
    ],
  },
  {
    id: "12",
    title: "Prism Void",
    category: "CGI Production",
    image: "/assets/images/pic14_converted.avif",
    description: "Volumetric light simulations refracting through impossible geometric objects.",
    hoverText: [
      { text: "Prism " },
      { text: "Void" }
    ],
  },
  {
    id: "13",
    title: "Fluid Motion",
    category: "Film",
    image: "/assets/images/pic15_converted.avif",
    description: "A study of liquid physics, momentum, and abstract kinetic motion.",
    hoverText: [
      { text: "Fluid " },
      { text: "Motion" }
    ],
  },
  {
    id: "14",
    title: "Kinetic Form",
    category: "Experiential",
    image: "/assets/images/pic16_converted.avif",
    description: "An installation translating mechanical motion into tactile, sculptural presence.",
    hoverText: [
      { text: "Kinetic " },
      { text: "Form" }
    ],
  },
  {
    id: "16",
    title: "Monochrome Study",
    category: "Brand Design",
    image: "/assets/images/image_converted.avif",
    description: "Design experiment focusing purely on contrast, texture, and structural layouts.",
    hoverText: [
      { text: "Mono" },
      { text: "chrome" }
    ],
  },
  {
    id: "17",
    title: "Future Shift",
    category: "Campaign",
    image: "/assets/images/WhatsApp Image 2026-07-21 at 09.04.16_converted.avif",
    description: "Bold marketing assets capturing the transition to next-generation interfaces.",
    hoverText: [
      { text: "Future " },
      { text: "Shift" }
    ],
  },
  {
    id: "18",
    title: "Hidden Layer",
    category: "CGI Production",
    image: "/assets/images/WhatsApp Image 2026-07-21 at 09.04.16 (1)_converted.avif",
    description: "Visualizing the unseen computational layers of neural networks and machine intelligence.",
    hoverText: [
      { text: "Hidden " },
      { text: "Layer" }
    ],
  },
  {
    id: "19",
    title: "Tactile Space",
    category: "Experiential",
    image: "/assets/images/WhatsApp Image 2026-07-21 at 09.04.17_converted.avif",
    description: "Physical spaces designed to react dynamically to touch, pressure, and proximity.",
    hoverText: [
      { text: "Tactile " },
      { text: "Space" }
    ],
  },
  {
    id: "20",
    title: "Quantum Shift",
    category: "CGI Production",
    image: "/assets/images/WhatsApp Image 2026-07-21 at 09.04.17 (1)_converted.avif",
    description: "Simulating subatomic particle behaviors and light refraction fields.",
    hoverText: [
      { text: "Quantum " },
      { text: "Shift" }
    ],
  },
  {
    id: "21",
    title: "Spectral Glow",
    category: "Campaign",
    image: "/assets/images/WhatsApp Image 2026-07-21 at 09.04.18_converted.avif",
    description: "Prismatic color gradients designed to stand out in digital environments.",
    hoverText: [
      { text: "Spectral " },
      { text: "Glow" }
    ],
  },
  {
    id: "22",
    title: "Visual Rhythm",
    category: "Film",
    image: "/assets/images/WhatsApp Image 2026-07-21 at 09.04.18 (1)_converted.avif",
    description: "Syncing rhythmic musical beats with custom procedural visuals.",
    hoverText: [
      { text: "Visual " },
      { text: "Rhythm" }
    ],
  },
  {
    id: "23",
    title: "Silent Echo",
    category: "Experiential",
    image: "/assets/images/WhatsApp Image 2026-07-21 at 09.04.18 (2)_converted.avif",
    description: "An installation designed around the resonance and echo of quiet places.",
    hoverText: [
      { text: "Silent " },
      { text: "Echo" }
    ],
  },
  {
    id: "24",
    title: "Static Frame",
    category: "Brand Design",
    image: "/assets/images/WhatsApp Image 2026-07-21 at 09.04.19_converted.avif",
    description: "Clean typographical and layout designs exploring grid-based minimalism.",
    hoverText: [
      { text: "Static " },
      { text: "Frame" }
    ],
  },
  {
    id: "25",
    title: "Infinite Loop",
    category: "CGI Production",
    image: "/assets/images/WhatsApp Image 2026-07-21 at 09.04.19 (1)_converted.avif",
    description: "Seamlessly looping 3D renders exploring perpetual motions.",
    hoverText: [
      { text: "Infinite " },
      { text: "Loop" }
    ],
  },
  {
    id: "27",
    title: "Chroma Field",
    category: "CGI Production",
    image: "/assets/images/WhatsApp Image 2026-07-21 at 10.01.12 copy.jpeg",
    description: "Prismatic shader fields shifting based on camera proximity.",
    hoverText: [
      { text: "Chroma " },
      { text: "Field" }
    ],
  },
];

const FILTERS = [
  ["All projects", "27"],
  ["CGI Production", "9"],
  ["Brand Design", "4"],
  ["Film", "4"],
  ["Campaign", "4"],
  ["Experiential", "6"],
];

const PROJECTS = RAW_PROJECTS.map((project) => ({
  ...project,
  image: getImageUrl(project.image),
}));

type Project = (typeof PROJECTS)[number];

const GalleryCard = memo(function GalleryCard({
  project,
  isActive,
  isDimmed,
  priority,
  onEnter,
  onLeave,
}: {
  project: Project;
  isActive: boolean;
  isDimmed: boolean;
  priority: boolean;
  onEnter: (project: Project) => void;
  onLeave: () => void;
}) {
  return (
    <article className="mb-4 md:mb-2 break-inside-avoid [contain:paint]">
      <motion.div
        aria-label={project.title}
        className="overflow-hidden bg-transparent transition-opacity duration-500 relative"
        style={{
          opacity: isDimmed ? 0.3 : 1,
          clipPath: "url(#gallery-scroll-clip)",
          WebkitClipPath: "url(#gallery-scroll-clip)",
          transform: "translateZ(0)",
        }}
        onPointerEnter={() => onEnter(project)}
        onPointerLeave={onLeave}
        onPointerCancel={onLeave}
      >
        <WaterRippleImage imageUrl={project.image} isActive={isActive} priority={priority} />
      </motion.div>
      {/* Mobile-only title below image matching reference design */}
      <h4 className="mt-2 text-xs sm:text-sm font-semibold tracking-wide text-[#faebac]/90 md:hidden leading-snug">
        {project.title}
      </h4>
    </article>
  );
});

export default function Home() {
  const [hoveredProject, setHoveredProject] = useState<typeof PROJECTS[0] | null>(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 45, stiffness: 300 });

  const scrollClipPathD = useTransform(smoothVelocity, (v) => {
    const normalized = Math.max(-1, Math.min(1, v / 250));
    const bend = (0.035 * Math.abs(normalized)).toFixed(4);

    let topCornerY: string;
    let topCtrlY: string;
    let botCornerY: string;
    let botCtrlY: string;

    if (normalized >= 0) {
      // Scrolling DOWN -> inverted U arch ∩ (subtle, refined curve)
      topCornerY = bend;
      topCtrlY = "0.0000";
      botCornerY = "1.0000";
      botCtrlY = (1 - Number(bend)).toFixed(4);
    } else {
      // Scrolling UP -> U trough ∪ (subtle, refined curve)
      topCornerY = "0.0000";
      topCtrlY = bend;
      botCornerY = (1 - Number(bend)).toFixed(4);
      botCtrlY = "1.0000";
    }

    return `M 0 ${topCornerY} C 0.3 ${topCtrlY}, 0.7 ${topCtrlY}, 1 ${topCornerY} L 1 ${botCornerY} C 0.7 ${botCtrlY}, 0.3 ${botCtrlY}, 0 ${botCornerY} Z`;
  });

  useEffect(() => {
    void import("jquery").then(() => import("jquery.ripples"));
  }, []);

  const handleEnter = useCallback((project: Project) => {
    setHoveredProject(project);
  }, []);

  const handleLeave = useCallback(() => {
    setHoveredProject(null);
  }, []);

  return (
    <main className="min-h-screen-stable overflow-x-clip bg-transparent text-[#f3f0e6] relative">
      {/* Static Purple Nebula Background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#070210]">
        {/* Deep Cosmic Purple & Indigo Nebula Glows */}
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 20% 15%, rgba(147, 51, 234, 0.35) 0%, rgba(88, 28, 135, 0.18) 45%, transparent 70%),
              radial-gradient(ellipse 70% 50% at 85% 35%, rgba(192, 132, 252, 0.25) 0%, rgba(126, 34, 206, 0.15) 40%, transparent 65%),
              radial-gradient(circle 600px at 50% 65%, rgba(168, 85, 247, 0.28) 0%, rgba(79, 70, 229, 0.12) 50%, transparent 75%),
              radial-gradient(ellipse 60% 70% at 30% 85%, rgba(217, 70, 239, 0.2) 0%, rgba(109, 40, 217, 0.1) 45%, transparent 70%),
              radial-gradient(ellipse 90% 80% at 75% 90%, rgba(99, 102, 241, 0.22) 0%, rgba(58, 12, 163, 0.15) 50%, transparent 75%)
            `,
          }}
        />

        {/* Soft Nebula Dust Texture Glows */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-screen"
          style={{
            background: `
              radial-gradient(circle 350px at 40% 25%, rgba(236, 72, 153, 0.25), transparent 70%),
              radial-gradient(circle 450px at 70% 60%, rgba(168, 85, 247, 0.3), transparent 70%),
              radial-gradient(circle 300px at 15% 70%, rgba(129, 140, 248, 0.2), transparent 70%)
            `,
            filter: "blur(40px)",
          }}
        />

        {/* Ambient Vignette Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(4,1,12,0.6)_100%)]" />
      </div>

      <svg className="fixed pointer-events-none opacity-0 w-0 h-0" aria-hidden="true">
        <defs>
          <clipPath id="gallery-scroll-clip" clipPathUnits="objectBoundingBox">
            <motion.path d={scrollClipPathD} />
          </clipPath>
        </defs>
      </svg>


      <AnimatePresence initial={false}>
        {hoveredProject && (
          <motion.div
            key={hoveredProject.id + '-hover'}
            className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center mix-blend-difference"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div className="w-full max-w-[1100px] px-6 text-center sm:px-10 lg:px-0">
              <h2 className="font-sans leading-none [font-size:clamp(2rem,6vw,5.5rem)] font-bold tracking-[0.06em] text-[#faebac] select-none inline-block transform scale-y-[1.12] origin-center">
                {hoveredProject.hoverText.map((part, i) => (
                  <span key={i}>{part.text}</span>
                ))}
              </h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative z-20 mx-auto w-full max-w-[1100px] px-3 sm:px-10 lg:px-0 pb-28 pt-24 sm:pt-48">
        <div className="grid grid-cols-2 gap-3 md:block md:columns-2 md:gap-2">
          {PROJECTS.map((project, index) => (
            <GalleryCard
              key={project.id}
              project={project}
              isActive={hoveredProject?.id === project.id}
              isDimmed={Boolean(hoveredProject && hoveredProject.id !== project.id)}
              priority={index < 7}
              onEnter={handleEnter}
              onLeave={handleLeave}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
