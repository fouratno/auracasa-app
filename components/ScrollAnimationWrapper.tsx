"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ReactNode } from "react";

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  animation?: "fade-in" | "fade-in-up" | "fade-in-left" | "fade-in-right" | "scale-in";
  delay?: number;
  className?: string;
}

export default function ScrollAnimationWrapper({
  children,
  animation = "fade-in-up",
  delay = 0,
  className = "",
}: ScrollAnimationWrapperProps) {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });

  const animationClass = `scroll-${animation}`;

  return (
    <div
      ref={elementRef as any}
      className={`${animationClass} ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
