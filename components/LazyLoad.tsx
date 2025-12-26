'use client';

import { useEffect, useRef, useState } from 'react';

interface LazyLoadProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

/**
 * Lazy Load Component using Intersection Observer
 * Loads children only when they enter the viewport
 * 
 * @param threshold - Percentage of visibility before loading (0-1)
 * @param rootMargin - Margin around root (e.g., "200px" to load 200px before visible)
 */
export function LazyLoad({
  children,
  className,
  threshold = 0.1,
  rootMargin = '200px',
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : <div style={{ minHeight: '200px' }} />}
    </div>
  );
}
