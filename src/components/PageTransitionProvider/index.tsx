"use client";

import React from "react";
import { TransitionRouter } from "next-transition-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavTransition } from "@/context/NavTransitionContext";

export default function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, openCurtain, closeCurtain } = useNavTransition();

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
        // Reset scroll position to top
        if (typeof window !== "undefined") {
          window.scrollTo(0, 0);
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
