"use client";

import React from "react";
import dynamic from "next/dynamic";

const Timeline = dynamic(() => import("@/components/Timeline"), {
  ssr: false,
});

export default function TimelinePage() {
  return (
    <div className="relative w-full min-h-screen-stable bg-transparent pt-24">
      {/* Title section for the Timeline Page */}
      <div className="max-w-4xl mx-auto text-center px-6 pt-12 pb-6 select-none animate-[fadeIn_1s_ease-out]">
        <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-wider mb-4">
          Event Timeline
        </h1>
       
      </div>

      <Timeline />
    </div>
  );
}
