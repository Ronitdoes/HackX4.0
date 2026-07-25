"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { usePathname } from "next/navigation";

const loadCircularNebulaShader = () =>
  import("@/components/CircularNebulaShader/CircularNebulaShader");

const CircularNebulaShader = dynamic(loadCircularNebulaShader, { ssr: false });

const MENU_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Timeline", href: "/timeline" },
  { label: "Ambassador", href: "/ambassador" },
  { label: "Team", href: "/team" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;

const menuVariants = {
  initial: { y: "-100%" },
  animate: { y: "0%", transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1] } },
  exit: { y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
};

const navLinksVariants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const linkVariants = {
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] } },
  exit: { y: 30, opacity: 0, transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1] } },
};

const footerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay: 0.75, duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: 10, transition: { duration: 0.35, ease: "easeIn" } },
};

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const hoverTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const menuItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wasOpenRef = useRef(false);
  const isCoarsePointerRef = useRef(false);

  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse), (max-width: 767px)");
    const updatePointerMode = () => {
      isCoarsePointerRef.current = mediaQuery.matches;
    };
    updatePointerMode();
    mediaQuery.addEventListener("change", updatePointerMode);
    return () => mediaQuery.removeEventListener("change", updatePointerMode);
  }, []);

  useEffect(() => {
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const preload = () => void loadCircularNebulaShader();

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(preload, { timeout: 1500 });
    } else {
      timeoutId = globalThis.setTimeout(preload, 300);
    }

    return () => {
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) globalThis.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isSafariBrowser =
      ua.includes("safari") &&
      !ua.includes("chrome") &&
      !ua.includes("chromium") &&
      !ua.includes("android");
    const frame = requestAnimationFrame(() => setIsSafari(isSafariBrowser));
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleMouseEnter = () => {
    const lines = buttonRef.current?.querySelectorAll("span");
    if (!lines || lines.length < 2) return;

    // Kill any active hover animations and timelines
    hoverTimelineRef.current?.kill();
    gsap.killTweensOf(lines);

    const tl = gsap.timeline();
    hoverTimelineRef.current = tl;

    if (isOpen) {
      // Premium diagonal scissor slide-out-in (the cross "builds" itself)
      tl.to(lines[0], { x: -24, y: -24, opacity: 0, duration: 0.2, ease: "power2.in" }, 0)
        .to(lines[1], { x: 24, y: -24, opacity: 0, duration: 0.2, ease: "power2.in" }, 0)
        // Teleport to opposite diagonal corners
        .set(lines[0], { x: 24, y: 24 })
        .set(lines[1], { x: -24, y: 24 })
        // Slide back to center from opposite corners
        .to(lines[0], { x: 0, y: 0, opacity: 1, duration: 0.25, ease: "power2.out" }, ">")
        .to(lines[1], { x: 0, y: 0, opacity: 1, duration: 0.25, ease: "power2.out" }, "<");
    } else {
      // Top line slides right (135%), bottom line slides left (-135%)
      tl.to(lines[0], { x: "135%", duration: 0.2, ease: "power2.in" }, 0)
        .to(lines[1], { x: "-135%", duration: 0.2, ease: "power2.in" }, 0)
        // Teleport to opposite sides
        .set(lines[0], { x: "-135%" })
        .set(lines[1], { x: "135%" })
        // Slide back to center from opposite sides
        .to(lines[0], { x: "0%", duration: 0.25, ease: "power2.out" }, ">")
        .to(lines[1], { x: "0%", duration: 0.25, ease: "power2.out" }, "<");
    }
  };

  const resetMenuItemHover = useCallback(() => {
    menuItemRefs.current.forEach((item) => {
      if (!item) return;
      gsap.to(item, {
        filter: "blur(0px)",
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: "power2.out",
        overwrite: true,
      });
    });
  }, []);

  const handleMenuItemHover = useCallback((hoveredIndex: number) => {
    const shouldBlur = !isCoarsePointerRef.current;
    menuItemRefs.current.forEach((item, index) => {
      if (!item) return;
      const distance = Math.abs(hoveredIndex - index);
      gsap.to(item, {
        filter: shouldBlur && index !== hoveredIndex
          ? `blur(${Math.min(12, 4 + distance * 3.5)}px)`
          : "blur(0px)",
        opacity: index === hoveredIndex ? 1 : Math.max(0.12, 0.45 - distance * 0.05),
        scale: index === hoveredIndex ? 1.03 : 1,
        duration: 0.45,
        ease: "power3.out",
        overwrite: true,
      });
    });
  }, []);

  const handleMouseLeave = () => {
    if (!isOpen) return;
    const lines = buttonRef.current?.querySelectorAll("span");
    if (!lines || lines.length < 2) return;

    hoverTimelineRef.current?.kill();
    gsap.killTweensOf(lines);
    // Smoothly slide back to the base cross state (45deg / -45deg)
    gsap.to(lines[0], { x: 0, y: 0, rotation: 45, opacity: 1, duration: 0.35, ease: "power2.out" });
    gsap.to(lines[1], { x: 0, y: 0, rotation: -45, opacity: 1, duration: 0.35, ease: "power2.out" });
  };

  const isInitialRender = useRef(true);

  // Synchronized state transformations
  useEffect(() => {
    const lines = buttonRef.current?.querySelectorAll("span");
    if (!lines || lines.length < 2) return;

    hoverTimelineRef.current?.kill();
    gsap.killTweensOf(lines);

    if (isInitialRender.current) {
      isInitialRender.current = false;
      gsap.set(lines[0], { y: -4, rotation: 0, x: 0, opacity: 1 });
      gsap.set(lines[1], { y: 4, rotation: 0, x: 0, opacity: 1 });
      return;
    }

    if (isOpen) {
      gsap.to(lines[0], {
        y: 0,
        rotation: 45,
        x: 0,
        opacity: 1,
        duration: 0.35,
        ease: "power2.out"
      });
      gsap.to(lines[1], {
        y: 0,
        rotation: -45,
        x: 0,
        opacity: 1,
        duration: 0.35,
        ease: "power2.out"
      });
    } else {
      gsap.to(lines[0], {
        y: -4,
        rotation: 0,
        x: 0,
        opacity: 1,
        duration: 0.35,
        ease: "power2.out"
      });
      gsap.to(lines[1], {
        y: 4,
        rotation: 0,
        x: 0,
        opacity: 1,
        duration: 0.35,
        ease: "power2.out"
      });
    }
  }, [isOpen]);

  // Clean up all running GSAP timelines on unmount
  useEffect(() => {
    const button = buttonRef.current;
    return () => {
      hoverTimelineRef.current?.kill();
      const lines = button?.querySelectorAll("span");
      if (lines) {
        gsap.killTweensOf(lines);
      }
    };
  }, []);

  // Keyboard navigation event handler (a11y)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const previousHtmlOverflow = document.documentElement.style.overflow;
      const previousBodyOverflow = document.body.style.overflow;
      wasOpenRef.current = true;
      document.documentElement.dataset.navOpen = "true";
      document.body.dataset.navOpen = "true";
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      return () => {
        delete document.documentElement.dataset.navOpen;
        delete document.body.dataset.navOpen;
        document.documentElement.style.overflow = previousHtmlOverflow;
        document.body.style.overflow = previousBodyOverflow;
      };
    }

    resetMenuItemHover();
    if (wasOpenRef.current) buttonRef.current?.focus();
  }, [isOpen, resetMenuItemHover]);

  return (
    <>
      {/* Sleek Floating Header Bar */}
      <header className="fixed top-0 left-0 z-[100] isolate h-24 w-full overflow-hidden px-7 md:h-32 md:px-12 flex justify-between items-center pointer-events-none">
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(4, 5, 16, 0.78) 0%, rgba(4, 5, 16, 0.48) 56%, rgba(4, 5, 16, 0.16) 82%, rgba(4, 5, 16, 0) 100%)",
            backdropFilter: isSafari ? "none" : "blur(52px) saturate(1.7)",
            WebkitBackdropFilter: isSafari ? "none" : "blur(52px) saturate(1.7)",
          }}
        />
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="pointer-events-auto relative z-10 group flex items-center gap-2.5 justify-center text-white hover:opacity-85 transition-opacity mix-blend-difference"
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
          aria-expanded={isOpen}
          aria-controls="site-navigation"
        >
          <div className="relative w-6 h-6 flex items-center justify-center overflow-hidden">
            <span className="absolute w-4 h-[0.5px] bg-white" style={{ transform: "translateY(-4px)" }}></span>
            <span className="absolute w-4 h-[0.5px] bg-white" style={{ transform: "translateY(4px)" }}></span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold font-sans h-4 flex items-center overflow-hidden relative select-none px-1.5 -mx-1.5">
            <AnimatePresence mode="wait">
              <motion.span
                key={isOpen ? "close" : "menu"}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="block"
              >
                {isOpen ? "Close" : "Menu"}
              </motion.span>
            </AnimatePresence>
          </span>
        </button>

        <Link
          href="/#register"
          className="pointer-events-auto relative z-10 group/btn font-sans text-xs md:text-sm font-normal tracking-tight text-white hover:opacity-85 transition-opacity flex items-center gap-1.5 mix-blend-difference"
        >
          <span>Register</span>
          <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
        </Link>
      </header>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              backgroundColor: "#08010F",
            }}
            className="fixed inset-0 z-[90] flex h-screen w-screen flex-col justify-between overflow-hidden px-6 py-8 select-none md:px-12 md:py-12"
            id="site-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            data-lenis-prevent
          >
            <CircularNebulaShader />

            {/* Overlay Spacer to maintain layout alignment */}
            <div className="relative z-10 flex justify-start items-center w-full h-6 pointer-events-none" />

            {/* Menu Items Centered */}
            <div className="relative z-10 flex-grow flex items-center justify-center">
              <motion.nav
                variants={navLinksVariants}
                className="flex flex-col items-center justify-center gap-2 text-center"
              >
                {MENU_ITEMS.map((item, idx) => {
                  return (
                    <div key={item.href} className="py-1 px-4 overflow-visible">
                      <motion.div variants={linkVariants}>
                        <motion.div
                          ref={(node) => {
                            menuItemRefs.current[idx] = node;
                          }}
                          className="origin-center"
                        >
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            onMouseEnter={() => handleMenuItemHover(idx)}
                            onMouseLeave={resetMenuItemHover}
                            aria-current={pathname === item.href ? "page" : undefined}
                            className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-normal text-[#F9F6F0] font-sans cursor-pointer select-none"
                          >
                            {item.label}
                          </Link>
                        </motion.div>
                      </motion.div>
                    </div>
                  );
                })}
              </motion.nav>
            </div>

            {/* Contact Info at bottom */}
            <motion.div
              variants={footerVariants}
              className="relative z-10 flex flex-col items-center justify-center text-center mt-auto"
            >
              <span className="font-serif italic text-xs md:text-sm text-[#F9F6F0]/80 mb-1">
                Contact us
              </span>
              <a
                href="mailto:hackxmuj@gmail.com"
                className="text-[#F9F6F0] text-xs md:text-sm font-sans tracking-wide hover:opacity-75 transition-opacity border-b border-[#F9F6F0] pb-0.5"
              >
                hackxmuj@gmail.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
