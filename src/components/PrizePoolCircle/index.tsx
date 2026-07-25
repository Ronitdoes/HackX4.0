"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: "slowDown" | "speedUp" | "pause" | "goBonkers";
  className?: string;
  radius?: number;
}

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 20,
  className = "",
  radius = 45,
}) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation = useMotionValue(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      transition: {
        ease: "linear",
        duration: spinDuration,
        repeat: Infinity,
      },
    });
  }, [mounted, spinDuration, controls, rotation]);
  if (!mounted) return null;

  return (
    <motion.div
      className={`absolute inset-0 h-full w-full ${className}`}
      style={{ rotate: rotation }}
      initial={{ rotate: 0 }}
      animate={controls}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const radians = (rotationDeg * Math.PI) / 180;
        const x = Math.cos(radians) * radius;
        const y = Math.sin(radians) * radius;

        return (
          <span
            key={i}
            className="font-sans text-[#FAF8F5] absolute text-[6px] tracking-wide uppercase lg:text-[8px]"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${
                rotationDeg + 90
              }deg)`,
              transformOrigin: "center",
              fontWeight: 850,
            }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

const PrizePoolCircle = () => {
  const text = "TOTAL PRIZE POOL • TOTAL PRIZE POOL • ";
  const isMobile = useIsMobile();

  return (
    <div className="flex h-16 w-16 transform items-center justify-center rounded-full bg-[#D9D9D91A] backdrop-blur-2xl lg:h-24 lg:w-24">
      <CircularText text={text} spinDuration={15} radius={isMobile ? 27 : 42} />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[#FAF8F5] rotate-[-15.15deg] transform text-base font-bold lg:text-2xl">
          ₹5L+
        </span>
      </div>
    </div>
  );
};

export default PrizePoolCircle;
