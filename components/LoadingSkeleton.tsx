interface LoadingSkeletonProps {
  variant?: "text" | "card" | "image" | "circle" | "button";
  count?: number;
  className?: string;
}

export default function LoadingSkeleton({
  variant = "text",
  count = 1,
  className = "",
}: LoadingSkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  const renderSkeleton = () => {
    switch (variant) {
      case "text":
        return (
          <div className={`space-y-2 ${className}`}>
            {skeletons.map((i) => (
              <div
                key={i}
                className="skeleton h-4 w-full rounded"
                style={{ width: i === count - 1 ? "80%" : "100%" }}
              />
            ))}
          </div>
        );

      case "card":
        return (
          <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
            {skeletons.map((i) => (
              <div key={i} className="card overflow-hidden">
                {/* Image skeleton */}
                <div className="skeleton aspect-[4/3] w-full" />
                {/* Content skeleton */}
                <div className="p-6 space-y-3">
                  <div className="skeleton h-3 w-1/3 rounded" />
                  <div className="skeleton h-5 w-3/4 rounded" />
                  <div className="skeleton h-4 w-full rounded" />
                  <div className="skeleton h-4 w-5/6 rounded" />
                </div>
              </div>
            ))}
          </div>
        );

      case "image":
        return (
          <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
            {skeletons.map((i) => (
              <div key={i} className="skeleton aspect-[4/3] w-full rounded-xl" />
            ))}
          </div>
        );

      case "circle":
        return (
          <div className={`flex gap-4 ${className}`}>
            {skeletons.map((i) => (
              <div key={i} className="skeleton-circle w-12 h-12" />
            ))}
          </div>
        );

      case "button":
        return (
          <div className={`flex gap-3 ${className}`}>
            {skeletons.map((i) => (
              <div key={i} className="skeleton h-10 w-32 rounded-2xl" />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return <>{renderSkeleton()}</>;
}

// Specific skeleton components for common use cases

export function ProjectCardSkeleton({ count = 3 }: { count?: number }) {
  return <LoadingSkeleton variant="card" count={count} />;
}

export function ImageGallerySkeleton({ count = 6 }: { count?: number }) {
  return <LoadingSkeleton variant="image" count={count} />;
}

export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return <LoadingSkeleton variant="text" count={lines} />;
}

export function HeroSkeleton() {
  return (
    <div className="container py-20">
      <div className="grid gap-8 md:grid-cols-2 items-center">
        <div className="space-y-6">
          {/* Badge skeleton */}
          <div className="skeleton h-8 w-40 rounded-full" />
          {/* Title skeleton */}
          <div className="space-y-3">
            <div className="skeleton h-12 w-full rounded" />
            <div className="skeleton h-12 w-5/6 rounded" />
          </div>
          {/* Description skeleton */}
          <div className="space-y-2">
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-3/4 rounded" />
          </div>
          {/* Buttons skeleton */}
          <div className="flex gap-3">
            <div className="skeleton h-12 w-40 rounded-2xl" />
            <div className="skeleton h-12 w-40 rounded-2xl" />
          </div>
        </div>
        {/* Hero image skeleton */}
        <div className="skeleton aspect-[4/3] w-full rounded-2xl" />
      </div>
    </div>
  );
}

export function ProductCardSkeleton({ count = 4 }: { count?: number }) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {skeletons.map((i) => (
        <div key={i} className="card overflow-hidden">
          {/* Product image skeleton */}
          <div className="skeleton aspect-square w-full" />
          {/* Content skeleton */}
          <div className="p-4 space-y-3">
            <div className="skeleton h-3 w-1/4 rounded" />
            <div className="skeleton h-4 w-3/4 rounded" />
            <div className="skeleton h-4 w-1/2 rounded" />
            <div className="flex items-center gap-2">
              <div className="skeleton h-6 w-20 rounded" />
              <div className="skeleton h-4 w-16 rounded" />
            </div>
            <div className="skeleton h-10 w-full rounded-2xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function NavigationSkeleton() {
  return (
    <header className="border-b border-neutral-200 dark:border-border-dark">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo skeleton */}
        <div className="skeleton h-6 w-32 rounded" />
        {/* Nav links skeleton */}
        <div className="hidden md:flex items-center gap-6">
          <div className="skeleton h-4 w-20 rounded" />
          <div className="skeleton h-4 w-20 rounded" />
          <div className="skeleton h-4 w-20 rounded" />
          <div className="skeleton h-4 w-20 rounded" />
          <div className="skeleton h-10 w-32 rounded-2xl" />
        </div>
      </div>
    </header>
  );
}

export function FooterSkeleton() {
  return (
    <footer className="mt-24 border-t border-neutral-200 dark:border-border-dark bg-surface-elevated dark:bg-surface-dark-elevated">
      <div className="container py-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="skeleton h-6 w-32 rounded" />
              <div className="space-y-2">
                <div className="skeleton h-4 w-full rounded" />
                <div className="skeleton h-4 w-5/6 rounded" />
                <div className="skeleton h-4 w-4/6 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
