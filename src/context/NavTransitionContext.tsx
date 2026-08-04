"use client";

import React, { createContext, useContext, useState, useRef, useCallback } from "react";

interface NavTransitionContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openCurtain: () => Promise<void>;
  closeCurtain: () => Promise<void>;
}

const NavTransitionContext = createContext<NavTransitionContextType | null>(null);

export function NavTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;

  const openCurtain = useCallback(() => {
    return new Promise<void>((resolve) => {
      if (isOpenRef.current) {
        resolve();
        return;
      }
      setIsOpen(true);
      // Wait for curtain drop animation to cover screen
      setTimeout(resolve, 850);
    });
  }, []);

  const closeCurtain = useCallback(() => {
    return new Promise<void>((resolve) => {
      if (!isOpenRef.current) {
        resolve();
        return;
      }
      setIsOpen(false);
      // Wait for curtain lift animation to complete revealing page
      setTimeout(resolve, 800);
    });
  }, []);

  return (
    <NavTransitionContext.Provider
      value={{
        isOpen,
        setIsOpen,
        openCurtain,
        closeCurtain,
      }}
    >
      {children}
    </NavTransitionContext.Provider>
  );
}

export function useNavTransition() {
  const ctx = useContext(NavTransitionContext);
  if (!ctx) {
    throw new Error("useNavTransition must be used within NavTransitionProvider");
  }
  return ctx;
}
