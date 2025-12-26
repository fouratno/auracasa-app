// Wishlist utility functions for managing user's saved products
// Uses localStorage for persistence without requiring authentication

export interface WishlistItem {
  productId: string;
  productName: string;
  productImage: string;
  productPrice: number;
  currency: string;
  brandName: string;
  affiliateUrl: string;
  category?: string;
  addedAt: string;
}

const WISHLIST_KEY = 'auracasa_wishlist';

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

/**
 * Get all wishlist items
 */
export function getWishlist(): WishlistItem[] {
  if (!isBrowser) return [];
  
  try {
    const wishlist = localStorage.getItem(WISHLIST_KEY);
    return wishlist ? JSON.parse(wishlist) : [];
  } catch (error) {
    console.error('Error reading wishlist:', error);
    return [];
  }
}

/**
 * Save wishlist to localStorage
 */
function saveWishlist(wishlist: WishlistItem[]): void {
  if (!isBrowser) return;
  
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    
    // Dispatch custom event for components to listen to
    window.dispatchEvent(new CustomEvent('wishlistUpdated', { 
      detail: { count: wishlist.length } 
    }));
  } catch (error) {
    console.error('Error saving wishlist:', error);
  }
}

/**
 * Add product to wishlist
 */
export function addToWishlist(item: Omit<WishlistItem, 'addedAt'>): boolean {
  if (!isBrowser) return false;
  
  try {
    const wishlist = getWishlist();
    
    // Check if item already exists
    if (wishlist.some(w => w.productId === item.productId)) {
      console.warn('Product already in wishlist');
      return false;
    }
    
    // Add new item with timestamp
    const newItem: WishlistItem = {
      ...item,
      addedAt: new Date().toISOString(),
    };
    
    wishlist.push(newItem);
    saveWishlist(wishlist);
    
    return true;
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    return false;
  }
}

/**
 * Remove product from wishlist
 */
export function removeFromWishlist(productId: string): boolean {
  if (!isBrowser) return false;
  
  try {
    const wishlist = getWishlist();
    const filteredWishlist = wishlist.filter(item => item.productId !== productId);
    
    if (filteredWishlist.length === wishlist.length) {
      console.warn('Product not found in wishlist');
      return false;
    }
    
    saveWishlist(filteredWishlist);
    return true;
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return false;
  }
}

/**
 * Check if product is in wishlist
 */
export function isInWishlist(productId: string): boolean {
  if (!isBrowser) return false;
  
  const wishlist = getWishlist();
  return wishlist.some(item => item.productId === productId);
}

/**
 * Toggle product in wishlist (add if not present, remove if present)
 */
export function toggleWishlist(item: Omit<WishlistItem, 'addedAt'>): boolean {
  if (isInWishlist(item.productId)) {
    return removeFromWishlist(item.productId);
  } else {
    return addToWishlist(item);
  }
}

/**
 * Get wishlist count
 */
export function getWishlistCount(): number {
  if (!isBrowser) return 0;
  
  return getWishlist().length;
}

/**
 * Clear entire wishlist
 */
export function clearWishlist(): void {
  if (!isBrowser) return;
  
  try {
    localStorage.removeItem(WISHLIST_KEY);
    window.dispatchEvent(new CustomEvent('wishlistUpdated', { 
      detail: { count: 0 } 
    }));
  } catch (error) {
    console.error('Error clearing wishlist:', error);
  }
}

/**
 * Get wishlist items by category
 */
export function getWishlistByCategory(category: string): WishlistItem[] {
  const wishlist = getWishlist();
  return wishlist.filter(item => item.category === category);
}

/**
 * Get wishlist total value
 */
export function getWishlistTotal(): { [currency: string]: number } {
  const wishlist = getWishlist();
  const totals: { [currency: string]: number } = {};
  
  wishlist.forEach(item => {
    if (!totals[item.currency]) {
      totals[item.currency] = 0;
    }
    totals[item.currency] += item.productPrice;
  });
  
  return totals;
}

/**
 * Export wishlist as JSON
 */
export function exportWishlist(): string {
  const wishlist = getWishlist();
  return JSON.stringify(wishlist, null, 2);
}

/**
 * Import wishlist from JSON
 */
export function importWishlist(jsonString: string): boolean {
  if (!isBrowser) return false;
  
  try {
    const imported = JSON.parse(jsonString);
    
    if (!Array.isArray(imported)) {
      throw new Error('Invalid wishlist format');
    }
    
    // Validate structure
    const isValid = imported.every(item => 
      item.productId && 
      item.productName && 
      item.productPrice !== undefined
    );
    
    if (!isValid) {
      throw new Error('Invalid wishlist items');
    }
    
    saveWishlist(imported);
    return true;
  } catch (error) {
    console.error('Error importing wishlist:', error);
    return false;
  }
}

/**
 * Get recently added items (last N items)
 */
export function getRecentWishlistItems(limit: number = 5): WishlistItem[] {
  const wishlist = getWishlist();
  return wishlist
    .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
    .slice(0, limit);
}

/**
 * Search wishlist items
 */
export function searchWishlist(query: string): WishlistItem[] {
  const wishlist = getWishlist();
  const lowerQuery = query.toLowerCase();
  
  return wishlist.filter(item =>
    item.productName.toLowerCase().includes(lowerQuery) ||
    item.brandName.toLowerCase().includes(lowerQuery) ||
    item.category?.toLowerCase().includes(lowerQuery)
  );
}
