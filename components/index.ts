// Component Library Exports
// Phase 1.2: Component Library Enhancements

// Navigation
export { default as Navigation } from './Navigation';

// Cards
export { default as ProjectCard } from './ProjectCard';
export { default as ProductCard } from './ProductCard';

// Interactive
export { default as ImageGallery } from './ImageGallery';
export { default as Search } from './Search';

// Loading States
export { default as LoadingSkeleton } from './LoadingSkeleton';
export {
  ProjectCardSkeleton,
  ProductCardSkeleton,
  ImageGallerySkeleton,
  HeroSkeleton,
  NavigationSkeleton,
  FooterSkeleton,
  TextSkeleton,
} from './LoadingSkeleton';

// Animations & Interactions (Phase 1.4)
export { default as ProgressBar } from './ProgressBar';
export { default as ScrollAnimationWrapper } from './ScrollAnimationWrapper';

// Analytics & Tracking (Phase 2.3)
export { default as AnalyticsProvider } from './AnalyticsProvider';
export { default as CookieConsent } from './CookieConsent';

// Performance Optimization (Phase 2.4)
export { OptimizedImage } from './OptimizedImage';
export { LazyLoad } from './LazyLoad';
export { default as PerformanceMonitor } from './PerformanceMonitor';
