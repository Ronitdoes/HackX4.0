"use client";

import React from "react";

interface GlassPillProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassPill({ children, className = "" }: GlassPillProps) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-5 py-2 md:px-8 md:py-3 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-md ${className}`}
      style={{
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <span className="text-center font-sans font-semibold uppercase tracking-wide text-[#FAF8F5] whitespace-nowrap">
        {children}
      </span>
    </div>
  );
}
