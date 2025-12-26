"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Info } from "lucide-react";
import { useTranslations } from "next-intl";
import { trackAffiliateClick, addUTMToAffiliateLink } from "@/lib/analytics";

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  brandLogo?: string;
  price: number;
  originalPrice?: number;
  image: string;
  affiliateUrl: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  className?: string;
}

export default function ProductCard({
  id,
  name,
  brand,
  brandLogo,
  price,
  originalPrice,
  image,
  affiliateUrl,
  category,
  rating = 0,
  reviewCount = 0,
  inStock = true,
  className = "",
}: ProductCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const t = useTranslations('affiliate');

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(true);
  };

  return (
    <>
      <div className={`card group overflow-hidden ${className}`}>
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-surface-dark-sunken">
          {/* Skeleton Loader */}
          {!isImageLoaded && (
            <div className="absolute inset-0 skeleton animate-pulse" />
          )}

          {/* Product Image */}
          <Image
            src={image}
            alt={name}
            fill
            className={`object-cover transition-all duration-500 ${
              isImageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            } group-hover:scale-105`}
            onLoad={() => setIsImageLoaded(true)}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discount > 0 && (
              <div className="badge bg-error text-white font-semibold">
                -{discount}%
              </div>
            )}
            {!inStock && (
              <div className="badge bg-neutral-700 text-white">
                Out of Stock
              </div>
            )}
          </div>

          {/* Quick View Button (Hover) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
            <button
              onClick={handleQuickView}
              className="btn btn-sm bg-white text-neutral-900 hover:bg-neutral-100 shadow-strong"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              Quick View
            </button>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4">
          {/* Brand */}
          <div className="flex items-center gap-2 mb-2">
            {brandLogo ? (
              <div className="relative w-6 h-6">
                <Image
                  src={brandLogo}
                  alt={brand}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <span className="text-xs font-medium text-text-muted dark:text-text-dark-muted uppercase tracking-wide">
                {brand}
              </span>
            )}
            {category && (
              <>
                <span className="text-text-muted dark:text-text-dark-muted">
                  •
                </span>
                <span className="text-xs text-text-muted dark:text-text-dark-muted">
                  {category}
                </span>
              </>
            )}
          </div>

          {/* Product Name */}
          <h3 className="text-sm font-medium mb-2 line-clamp-2 group-hover:text-accent-500 transition-colors">
            {name}
          </h3>

          {/* Rating */}
          {rating > 0 && (
            <div className="flex items-center gap-1 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(rating)
                        ? "text-warning fill-current"
                        : "text-neutral-300 dark:text-neutral-700"
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              {reviewCount > 0 && (
                <span className="text-xs text-text-muted dark:text-text-dark-muted">
                  ({reviewCount})
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold">${price.toFixed(2)}</span>
              {originalPrice && (
                <span className="text-sm text-text-muted dark:text-text-dark-muted line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {/* Affiliate Tooltip */}
            <div className="group/tooltip relative">
              <Info size={16} className="text-gray-400 cursor-help" aria-label={t('tooltip')} />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                {t('tooltip')}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <a
            href={addUTMToAffiliateLink(affiliateUrl, 'product-card', id)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={`btn w-full ${
              inStock ? "btn-primary" : "btn-outline opacity-50 cursor-not-allowed"
            }`}
            onClick={(e) => {
              if (!inStock) {
                e.preventDefault();
                return;
              }
              
              // Track affiliate click
              trackAffiliateClick({
                productId: id,
                productName: name,
                productPrice: price,
                affiliateNetwork: 'tradedoubler', // Default, can be made dynamic
              });
            }}
          >
            {inStock ? (
              <>
                View on {brand}
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </>
            ) : (
              "Out of Stock"
            )}
          </a>

          {/* Affiliate Disclosure */}
          <p className="text-xs text-text-muted dark:text-text-dark-muted mt-2 text-center">
            {t('link')} • {t('tooltip').split(' - ')[1]}
          </p>
        </div>
      </div>

      {/* Quick View Modal (Placeholder) */}
      {showQuickView && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-modal-backdrop animate-fade-in"
            onClick={() => setShowQuickView(false)}
          />
          <div className="fixed inset-0 z-modal flex items-center justify-center p-4 animate-scale-in">
            <div className="card max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <h2 className="text-2xl font-serif font-semibold">
                    Quick View
                  </h2>
                  <button
                    onClick={() => setShowQuickView(false)}
                    className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-surface-dark-elevated transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Product Image */}
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-100 dark:bg-surface-dark-sunken">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div>
                    <div className="text-sm text-text-muted dark:text-text-dark-muted mb-2">
                      {brand} {category && `• ${category}`}
                    </div>
                    <h3 className="text-2xl font-serif font-semibold mb-4">
                      {name}
                    </h3>

                    {/* Rating */}
                    {rating > 0 && (
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(rating)
                                  ? "text-warning fill-current"
                                  : "text-neutral-300 dark:text-neutral-700"
                              }`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm font-medium">{rating}</span>
                        {reviewCount > 0 && (
                          <span className="text-sm text-text-muted dark:text-text-dark-muted">
                            ({reviewCount} reviews)
                          </span>
                        )}
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-baseline gap-3 mb-6">
                      <span className="text-3xl font-semibold">
                        ${price.toFixed(2)}
                      </span>
                      {originalPrice && (
                        <>
                          <span className="text-xl text-text-muted dark:text-text-dark-muted line-through">
                            ${originalPrice.toFixed(2)}
                          </span>
                          <span className="badge bg-error text-white">
                            Save {discount}%
                          </span>
                        </>
                      )}
                    </div>

                    {/* Stock Status */}
                    <div className="mb-6">
                      {inStock ? (
                        <div className="flex items-center gap-2 text-success">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="font-medium">In Stock</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-error">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="font-medium">Out of Stock</span>
                        </div>
                      )}
                    </div>

                    {/* CTA */}
                    <a
                      href={addUTMToAffiliateLink(affiliateUrl, 'quick-view', id)}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className={`btn btn-lg w-full mb-4 ${
                        inStock ? "btn-primary" : "btn-outline opacity-50 cursor-not-allowed"
                      }`}
                      onClick={(e) => {
                        if (!inStock) {
                          e.preventDefault();
                          return;
                        }
                        
                        // Track affiliate click from quick view
                        trackAffiliateClick({
                          productId: id,
                          productName: name,
                          productPrice: price,
                          affiliateNetwork: 'tradedoubler',
                        });
                      }}
                    >
                      {inStock ? `View on ${brand}` : "Out of Stock"}
                    </a>

                    {/* Affiliate Disclosure */}
                    <div className="p-4 rounded-xl bg-surface-elevated dark:bg-surface-dark-elevated border border-neutral-200 dark:border-border-dark">
                      <p className="text-sm text-text-muted dark:text-text-dark-muted">
                        <strong>Affiliate Disclosure:</strong> This is an
                        affiliate link. We may earn a commission if you make a
                        purchase through this link, at no additional cost to
                        you.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
