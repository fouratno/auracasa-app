'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getWishlistCount } from '@/lib/wishlist';

interface WishlistBadgeProps {
  locale: string;
  className?: string;
}

export default function WishlistBadge({ locale, className = '' }: WishlistBadgeProps) {
  const t = useTranslations('wishlist');
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted to true to prevent hydration mismatch
    setMounted(true);
    
    // Initial count
    setCount(getWishlistCount());

    // Listen for wishlist updates
    const handleWishlistUpdate = (event: CustomEvent) => {
      setCount(event.detail.count);
    };

    window.addEventListener('wishlistUpdated', handleWishlistUpdate as EventListener);
    return () => window.removeEventListener('wishlistUpdated', handleWishlistUpdate as EventListener);
  }, []);

  return (
    <Link
      href={`/${locale}/wishlist`}
      className={`
        relative flex items-center justify-center
        w-10 h-10 rounded-full
        hover:bg-gray-100 transition-colors
        ${className}
      `}
      aria-label={t('viewAll')}
      title={t('viewAll')}
    >
      <Heart size={20} className="text-gray-700" />
      {mounted && count > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  );
}
