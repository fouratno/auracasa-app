'use client';

import { useEffect } from 'react';
import { initPerformanceMonitoring } from '@/lib/performance';

/**
 * Performance Monitor Component
 * Automatically tracks Web Vitals and reports to analytics
 * 
 * Usage: Add to root layout
 */
export function PerformanceMonitor() {
  useEffect(() => {
    // Initialize performance monitoring on mount
    initPerformanceMonitoring();

    // Log performance summary in development
    if (process.env.NODE_ENV === 'development') {
      // Wait for page to fully load
      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          
          if (navigation) {
            console.log('[Performance Summary]', {
              'DNS Lookup': `${Math.round(navigation.domainLookupEnd - navigation.domainLookupStart)}ms`,
              'TCP Connection': `${Math.round(navigation.connectEnd - navigation.connectStart)}ms`,
              'Request Time': `${Math.round(navigation.responseStart - navigation.requestStart)}ms`,
              'Response Time': `${Math.round(navigation.responseEnd - navigation.responseStart)}ms`,
              'DOM Processing': `${Math.round(navigation.domComplete - navigation.domInteractive)}ms`,
              'Total Load Time': `${Math.round(navigation.loadEventEnd - navigation.fetchStart)}ms`,
            });
          }
        }, 1000);
      });
    }
  }, []);

  // This component doesn't render anything
  return null;
}

export default PerformanceMonitor;
