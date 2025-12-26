'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Heart, Trash2, Search, ExternalLink, Download, Upload } from 'lucide-react';
import Link from 'next/link';
import {
  getWishlist,
  removeFromWishlist,
  clearWishlist,
  searchWishlist,
  getWishlistTotal,
  exportWishlist,
  type WishlistItem,
} from '@/lib/wishlist';

interface WishlistClientProps {
  locale: string;
}

export default function WishlistClient({ locale }: WishlistClientProps) {
  const t = useTranslations('wishlist');
  const tCommon = useTranslations('common');
  
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<WishlistItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'priceLow' | 'priceHigh'>('newest');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Load wishlist on mount
  useEffect(() => {
    loadWishlist();

    // Listen for wishlist updates
    const handleWishlistUpdate = () => {
      loadWishlist();
    };

    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    return () => window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
  }, []);

  // Filter and sort items when search or sort changes
  useEffect(() => {
    let result = searchQuery ? searchWishlist(searchQuery) : items;

    // Sort items
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
        case 'oldest':
          return new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime();
        case 'priceLow':
          return a.productPrice - b.productPrice;
        case 'priceHigh':
          return b.productPrice - a.productPrice;
        default:
          return 0;
      }
    });

    setFilteredItems(result);
  }, [items, searchQuery, sortBy]);

  const loadWishlist = () => {
    const wishlist = getWishlist();
    setItems(wishlist);
  };

  const handleRemove = (productId: string) => {
    removeFromWishlist(productId);
  };

  const handleClear = () => {
    if (showClearConfirm) {
      clearWishlist();
      setShowClearConfirm(false);
    } else {
      setShowClearConfirm(true);
      setTimeout(() => setShowClearConfirm(false), 3000);
    }
  };

  const handleExport = () => {
    const data = exportWishlist();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `auracasa-wishlist-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const totals = getWishlistTotal();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <Heart size={64} className="mx-auto text-gray-300 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('empty')}</h1>
            <p className="text-gray-600 mb-8">{t('emptyDescription')}</p>
            <Link
              href={`/${locale}/portfolio`}
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              {tCommon('viewProject')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('title')}</h1>
          <p className="text-gray-600">
            {items.length === 1 ? t('countSingular', { count: items.length }) : t('count', { count: items.length })}
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t('search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            >
              <option value="newest">{t('sortNewest')}</option>
              <option value="oldest">{t('sortOldest')}</option>
              <option value="priceLow">{t('sortPriceLow')}</option>
              <option value="priceHigh">{t('sortPriceHigh')}</option>
            </select>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleExport}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                title={t('export')}
              >
                <Download size={20} />
              </button>
              <button
                onClick={handleClear}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  showClearConfirm
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
                title={t('clear')}
              >
                <Trash2 size={20} />
                {showClearConfirm && <span className="text-sm">{t('clearConfirm')}</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">{t('noResults')}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredItems.map((item) => (
                <div key={item.productId} className="bg-white rounded-lg shadow-sm overflow-hidden group">
                  {/* Image */}
                  <div className="relative aspect-square bg-gray-100">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => handleRemove(item.productId)}
                      className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                      aria-label={t('remove')}
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <p className="text-sm text-gray-600 mb-1">{item.brandName}</p>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {item.productName}
                    </h3>
                    <p className="text-lg font-bold text-gray-900 mb-3">
                      {item.productPrice.toFixed(2)} {item.currency}
                    </p>
                    <a
                      href={item.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      {t('shopNow')}
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">{t('total')}</span>
                <div className="text-right">
                  {Object.entries(totals).map(([currency, amount]) => (
                    <p key={currency} className="text-xl font-bold text-gray-900">
                      {amount.toFixed(2)} {currency}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
