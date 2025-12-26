'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { 
  addToWishlist, 
  removeFromWishlist, 
  isInWishlist,
  type WishlistItem 
} from '@/lib/wishlist';
import { trackProductSave } from '@/lib/analytics';

interface WishlistButtonProps {
  product: Omit<WishlistItem, 'addedAt'>;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  source?: 'project' | 'search' | 'direct';
  className?: string;
}

export default function WishlistButton({
  product,
  size = 'md',
  showLabel = false,
  source = 'direct',
  className = '',
}: WishlistButtonProps) {
  const t = useTranslations('wishlist');
  const [isInList, setIsInList] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Check if product is in wishlist on mount and when wishlist updates
  useEffect(() => {
    setIsInList(isInWishlist(product.productId));

    const handleWishlistUpdate = () => {
      setIsInList(isInWishlist(product.productId));
    };

    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    return () => window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
  }, [product.productId]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);

    if (isInList) {
      const success = removeFromWishlist(product.productId);
      if (success) {
        setIsInList(false);
        setToastMessage(t('removed'));
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } else {
      const success = addToWishlist(product);
      if (success) {
        setIsInList(true);
        setToastMessage(t('added'));
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        
        // Track analytics
        trackProductSave({
          productId: product.productId,
          productName: product.productName,
          source,
        });
      }
    }
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`
          relative flex items-center justify-center gap-2
          ${sizeClasses[size]}
          ${showLabel ? 'px-4 py-2 w-auto' : 'rounded-full'}
          bg-white/90 backdrop-blur-sm
          border border-gray-200
          hover:bg-white hover:border-gray-300
          transition-all duration-200
          group
          ${isAnimating ? 'scale-110' : 'scale-100'}
          ${className}
        `}
        aria-label={isInList ? t('remove') : t('add')}
        title={isInList ? t('remove') : t('add')}
      >
        <Heart
          size={iconSizes[size]}
          className={`
            transition-all duration-200
            ${isInList 
              ? 'fill-red-500 text-red-500' 
              : 'fill-none text-gray-600 group-hover:text-red-500'
            }
            ${isAnimating ? 'animate-ping' : ''}
          `}
        />
        {showLabel && (
          <span className="text-sm font-medium text-gray-700">
            {isInList ? t('remove') : t('add')}
          </span>
        )}
      </button>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
          <div className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <Heart size={16} className="fill-red-500 text-red-500" />
            <span className="text-sm">{toastMessage}</span>
          </div>
        </div>
      )}
    </>
  );
}
