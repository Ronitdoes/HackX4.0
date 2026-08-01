'use client';

import { useEffect } from 'react';

export default function ViewportFix() {
  useEffect(() => {
    const updateVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set initial --vh value on page load
    updateVh();

    // Re-evaluate ONLY on orientation change (not on scroll) to prevent layout thrashing
    window.addEventListener('orientationchange', updateVh);
    return () => {
      window.removeEventListener('orientationchange', updateVh);
    };
  }, []);

  return null;
}
