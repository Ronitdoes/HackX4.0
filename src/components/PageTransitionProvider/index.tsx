"use client";

import React, { useEffect } from "react";
import { TransitionRouter } from "next-transition-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavTransition } from "@/context/NavTransitionContext";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";

export default function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, openCurtain, closeCurtain } = useNavTransition();
  const lenis = useLenis();
  const pathname = usePathname();

  // Ensure scroll is reset to top whenever pathname changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

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
        if (typeof window !== "undefined") {
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }
        if (lenis) {
          lenis.scrollTo(0, { immediate: true });
        }

        // Refresh GSAP ScrollTrigger for new page elements
        if (typeof window !== "undefined") {
          gsap.registerPlugin(ScrollTrigger);
          setTimeout(() => {
            ScrollTrigger.refresh();
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

