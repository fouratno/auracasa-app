"use client";

import { useScrollProgress } from "@/hooks/useScrollAnimation";

export default function ProgressBar() {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 to-accent-500 z-[9999] transition-transform duration-150"
      style={{
        transform: `scaleX(${progress / 100})`,
        transformOrigin: 'left',
      }}
    />
  );
}
