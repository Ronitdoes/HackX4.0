"use client";

import React, { useEffect, useCallback } from "react";
import { TransitionRouter } from "next-transition-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavTransition } from "@/context/NavTransitionContext";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";

// Ensure scroll restoration is manual globally to prevent browser auto-scroll conflicts
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

export default function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, openCurtain, closeCurtain } = useNavTransition();
  const lenis = useLenis();
  const pathname = usePathname();

  const resetScrollToTop = useCallback(() => {
    if (typeof window === "undefined") return;

    // Temporarily unlock overflow on html and body so window.scrollTo is not blocked
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";

    // Instant browser scroll reset
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Force Lenis smooth-scroll instance reset to top
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    }
  }, [lenis]);

  // Ensure scroll is reset whenever pathname changes
  useEffect(() => {
    resetScrollToTop();
  }, [pathname, resetScrollToTop]);

  return (
    <TransitionRouter
      auto
      leave={async (next) => {
        // Lower navbar curtain if not already down
        if (!isOpen) {
          await openCurtain();
        }
        next();
      }}
      enter={async (next) => {
        // Reset scroll position to top immediately while curtain is covering the screen
        resetScrollToTop();

        // Refresh GSAP ScrollTrigger for new page elements from top position
        if (typeof window !== "undefined") {
          gsap.registerPlugin(ScrollTrigger);
          ScrollTrigger.clearScrollMemory();
          ScrollTrigger.refresh(true);

          setTimeout(() => {
            resetScrollToTop();
            ScrollTrigger.refresh(true);
          }, 60);
        }

        // Lift up the navbar curtain when ready to reveal the new page
        await closeCurtain();
        next();
      }}
    >
      {children}
    </TransitionRouter>
  );
}


