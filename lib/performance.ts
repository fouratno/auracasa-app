/**
 * Performance Monitoring Utilities
 * Track and report web vitals and performance metrics
 */

export interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

/**
 * Web Vitals thresholds (Google's recommendations)
 */
const THRESHOLDS = {
  // Largest Contentful Paint (LCP)
  LCP: { good: 2500, poor: 4000 },
  // First Input Delay (FID)
  FID: { good: 100, poor: 300 },
  // Cumulative Layout Shift (CLS)
  CLS: { good: 0.1, poor: 0.25 },
  // First Contentful Paint (FCP)
  FCP: { good: 1800, poor: 3000 },
  // Time to First Byte (TTFB)
  TTFB: { good: 800, poor: 1800 },
};

/**
 * Get rating based on value and thresholds
 */
function getRating(
  value: number,
  thresholds: { good: number; poor: number }
): 'good' | 'needs-improvement' | 'poor' {
  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Report Web Vitals to analytics
 */
export function reportWebVitals(metric: PerformanceMetric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Performance] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
    });
  }

  // Send to analytics in production
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible('Web Vitals', {
      props: {
        metric: metric.name,
        value: Math.round(metric.value),
        rating: metric.rating,
      },
    });
  }
}

/**
 * Measure LCP (Largest Contentful Paint)
 */
export function measureLCP(callback: (metric: PerformanceMetric) => void) {
  if (typeof window === 'undefined') return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;

      const metric: PerformanceMetric = {
        name: 'LCP',
        value: lastEntry.renderTime || lastEntry.loadTime,
        rating: getRating(
          lastEntry.renderTime || lastEntry.loadTime,
          THRESHOLDS.LCP
        ),
        timestamp: Date.now(),
      };

      callback(metric);
    });

    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (error) {
    console.error('Error measuring LCP:', error);
  }
}

/**
 * Measure FID (First Input Delay)
 */
export function measureFID(callback: (metric: PerformanceMetric) => void) {
  if (typeof window === 'undefined') return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const firstInput = entries[0] as any;

      const metric: PerformanceMetric = {
        name: 'FID',
        value: firstInput.processingStart - firstInput.startTime,
        rating: getRating(
          firstInput.processingStart - firstInput.startTime,
          THRESHOLDS.FID
        ),
        timestamp: Date.now(),
      };

      callback(metric);
    });

    observer.observe({ type: 'first-input', buffered: true });
  } catch (error) {
    console.error('Error measuring FID:', error);
  }
}

/**
 * Measure CLS (Cumulative Layout Shift)
 */
export function measureCLS(callback: (metric: PerformanceMetric) => void) {
  if (typeof window === 'undefined') return;

  let clsValue = 0;

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as any[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }

      const metric: PerformanceMetric = {
        name: 'CLS',
        value: clsValue,
        rating: getRating(clsValue, THRESHOLDS.CLS),
        timestamp: Date.now(),
      };

      callback(metric);
    });

    observer.observe({ type: 'layout-shift', buffered: true });
  } catch (error) {
    console.error('Error measuring CLS:', error);
  }
}

/**
 * Measure FCP (First Contentful Paint)
 */
export function measureFCP(callback: (metric: PerformanceMetric) => void) {
  if (typeof window === 'undefined') return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcpEntry = entries[0] as any;

      const metric: PerformanceMetric = {
        name: 'FCP',
        value: fcpEntry.startTime,
        rating: getRating(fcpEntry.startTime, THRESHOLDS.FCP),
        timestamp: Date.now(),
      };

      callback(metric);
    });

    observer.observe({ type: 'paint', buffered: true });
  } catch (error) {
    console.error('Error measuring FCP:', error);
  }
}

/**
 * Measure TTFB (Time to First Byte)
 */
export function measureTTFB(callback: (metric: PerformanceMetric) => void) {
  if (typeof window === 'undefined') return;

  try {
    const navigationEntry = performance.getEntriesByType(
      'navigation'
    )[0] as PerformanceNavigationTiming;

    if (navigationEntry) {
      const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;

      const metric: PerformanceMetric = {
        name: 'TTFB',
        value: ttfb,
        rating: getRating(ttfb, THRESHOLDS.TTFB),
        timestamp: Date.now(),
      };

      callback(metric);
    }
  } catch (error) {
    console.error('Error measuring TTFB:', error);
  }
}

/**
 * Initialize all performance monitoring
 */
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return;

  measureLCP(reportWebVitals);
  measureFID(reportWebVitals);
  measureCLS(reportWebVitals);
  measureFCP(reportWebVitals);
  measureTTFB(reportWebVitals);
}

/**
 * Get performance summary
 */
export function getPerformanceSummary(): {
  navigation: PerformanceNavigationTiming | null;
  resources: PerformanceResourceTiming[];
  memory?: any;
} {
  if (typeof window === 'undefined') {
    return { navigation: null, resources: [] };
  }

  const navigation = performance.getEntriesByType(
    'navigation'
  )[0] as PerformanceNavigationTiming;

  const resources = performance.getEntriesByType(
    'resource'
  ) as PerformanceResourceTiming[];

  const memory = (performance as any).memory;

  return {
    navigation,
    resources,
    memory,
  };
}

/**
 * Clear performance data
 */
export function clearPerformanceData() {
  if (typeof window !== 'undefined') {
    performance.clearResourceTimings();
    performance.clearMarks();
    performance.clearMeasures();
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, any> }) => void;
  }
}
