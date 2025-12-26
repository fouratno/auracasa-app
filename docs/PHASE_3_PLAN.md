# Phase 3: Affiliate Marketing Features - Implementation Plan

## 📋 Overview
Implement comprehensive affiliate marketing system with enhanced product integration, "Shop This Look" feature, and advanced tracking capabilities.

---

## 🎯 Goals

1. **Enhanced Product Schema** - Expand Sanity product schema with detailed specifications
2. **Product Components** - Build reusable product display components  
3. **Shop This Look** - Create interactive product showcase on project pages
4. **Affiliate Tracking** - Implement robust tracking and analytics
5. **Multi-Network Support** - Support TradeDoubler, Amazon Associates, and direct affiliate programs

---

## 📦 Phase 3.1: Enhanced Product Schema (Sanity CMS)

### Tasks:
- [x] Review current product schema
- [ ] Expand product schema with new fields
- [ ] Add brand object with logo and website
- [ ] Add pricing object with currency support
- [ ] Add multiple affiliate link support
- [ ] Add specifications object
- [ ] Add image gallery support
- [ ] Add availability status
- [ ] Add rating and review count
- [ ] Update Sanity Studio

### Current Product Schema:
```typescript
{
  name, brand, price, affiliateLink, image, 
  category, description, inStock, featured
}
```

### Enhanced Product Schema:
```typescript
{
  name: string
  slug: slug
  brand: {
    name: string
    logo: image
    website: url
    description: text
  }
  pricing: {
    amount: number
    currency: 'USD' | 'EUR' | 'GBP'
    originalPrice?: number
    saleEndDate?: datetime
  }
  affiliateLinks: {
    primary: {
      network: 'tradedoubler' | 'awin' | 'amazon' | 'direct'
      url: url
      commission?: number
    }
    secondary?: {
      network: string
      url: url
      commission?: number
    }
  }
  images: image[] // Gallery support
  description: richText
  specifications: {
    dimensions: string
    materials: string[]
    colors: string[]
    weight?: string
    careInstructions?: text
  }
  category: string
  tags: string[]
  availability: 'in-stock' | 'pre-order' | 'out-of-stock' | 'discontinued'
  featured: boolean
  rating?: number
  reviewCount?: number
  seo: {
    metaTitle?: string
    metaDescription?: text
  }
}
```

---

## 🎨 Phase 3.2: Product Display Components

### 3.2.1 Enhanced ProductCard Component
**Status:** Exists, needs enhancement

**Current Features:**
- Basic product display
- Quick view modal
- Affiliate link tracking
- Price display with discount

**Enhancements Needed:**
- [ ] Add wishlist/save functionality
- [ ] Support multiple images (hover to preview)
- [ ] Add brand logo display
- [ ] Show multiple affiliate link options
- [ ] Add specifications preview
- [ ] Improve mobile responsiveness
- [ ] Add loading states
- [ ] Support grid and list layouts

### 3.2.2 Product Quick View Modal
**Status:** Basic implementation exists

**Enhancements Needed:**
- [ ] Image carousel for multiple images
- [ ] Full specifications table
- [ ] Multiple affiliate link options
- [ ] Related products section
- [ ] Share functionality
- [ ] Add to collection button
- [ ] Improved mobile experience

### 3.2.3 Shop This Look Component (NEW)
**Status:** To be created

**Features:**
- [ ] Grid display of 4-8 products
- [ ] Hotspot overlay on project image
- [ ] Click hotspot to highlight product
- [ ] Total price calculator
- [ ] "Get the Look" bundle CTA
- [ ] Individual product links
- [ ] Responsive design
- [ ] Loading states

**Component Structure:**
```tsx
<ShopThisLook
  projectImage={projectHeroImage}
  products={affiliateProducts}
  hotspots={[
    { x: 30, y: 40, productId: 'chair-1' },
    { x: 60, y: 50, productId: 'lamp-1' },
    // ...
  ]}
/>
```

---

## 📊 Phase 3.3: Affiliate Tracking Enhancements

### Current Implementation:
- Basic click tracking
- Plausible Analytics integration
- localStorage for click history
- UTM parameter generation

### Enhancements Needed:
- [ ] Track product impressions (views)
- [ ] Track "Add to Wishlist" events
- [ ] Track Quick View opens
- [ ] Track affiliate network performance
- [ ] Implement conversion tracking (if possible)
- [ ] Create affiliate dashboard
- [ ] Export tracking data
- [ ] A/B testing support for CTAs

### New Analytics Events:
```typescript
- 'product_impression'
- 'product_quick_view'
- 'product_wishlist_add'
- 'product_wishlist_remove'
- 'shop_this_look_view'
- 'shop_this_look_click'
- 'affiliate_link_hover'
- 'bundle_view'
```

---

## 🔗 Phase 3.4: Multi-Network Affiliate Support

### Supported Networks:
1. **TradeDoubler** (Primary)
   - [ ] Integration setup
   - [ ] Link format validation
   - [ ] Commission tracking

2. **Amazon Associates** (Optional)
   - [ ] Integration setup
   - [ ] Product API integration
   - [ ] Link format validation

3. **Direct Affiliate Programs**
   - [ ] Custom link support
   - [ ] Brand-specific tracking

### Implementation:
- [ ] Create affiliate network utilities
- [ ] Add network-specific link formatting
- [ ] Implement fallback logic (primary → secondary)
- [ ] Add network performance tracking
- [ ] Create admin interface for managing links

---

## 🛠️ Phase 3.5: Supporting Features

### 3.5.1 Wishlist/Save Functionality
- [ ] Create wishlist data structure
- [ ] localStorage persistence
- [ ] Wishlist page/modal
- [ ] Share wishlist functionality
- [ ] Email wishlist feature

### 3.5.2 Product Search & Filter
- [ ] Search products by name/brand
- [ ] Filter by category
- [ ] Filter by price range
- [ ] Filter by availability
- [ ] Sort options (price, popularity, newest)

### 3.5.3 Product Recommendations
- [ ] "Similar Products" algorithm
- [ ] "Frequently Bought Together"
- [ ] "You May Also Like"
- [ ] Based on project style tags

---

## 📱 Phase 3.6: Mobile Optimization

### Tasks:
- [ ] Optimize ProductCard for mobile
- [ ] Mobile-friendly Quick View
- [ ] Touch-optimized Shop This Look
- [ ] Mobile wishlist experience
- [ ] Swipeable product galleries
- [ ] Bottom sheet modals

---

## 🌍 Phase 3.7: Internationalization for Products

### Tasks:
- [ ] Add product translations to messages/en.json
- [ ] Add product translations to messages/de.json
- [ ] Currency conversion support
- [ ] Locale-specific affiliate links
- [ ] Translated product descriptions
- [ ] Localized pricing display

### Translation Keys Needed:
```json
{
  "products": {
    "quickView": "Quick View",
    "viewOn": "View on {brand}",
    "addToWishlist": "Add to Wishlist",
    "inStock": "In Stock",
    "outOfStock": "Out of Stock",
    "preOrder": "Pre-Order",
    "specifications": "Specifications",
    "dimensions": "Dimensions",
    "materials": "Materials",
    "colors": "Colors",
    "shopThisLook": "Shop This Look",
    "getTotalPrice": "Total: ${price}",
    "affiliateDisclosure": "Affiliate link • We may earn commission"
  }
}
```

---

## 🧪 Phase 3.8: Testing Plan

### Unit Tests:
- [ ] Product schema validation
- [ ] Affiliate link formatting
- [ ] UTM parameter generation
- [ ] Price calculations
- [ ] Currency conversion

### Integration Tests:
- [ ] Sanity CMS product queries
- [ ] Affiliate click tracking
- [ ] Wishlist functionality
- [ ] Shop This Look interactions

### E2E Tests:
- [ ] Product card interactions
- [ ] Quick View modal
- [ ] Affiliate link clicks
- [ ] Shop This Look flow
- [ ] Mobile responsiveness

### Manual Testing:
- [ ] Test all affiliate links
- [ ] Verify tracking events
- [ ] Check mobile experience
- [ ] Test in both languages
- [ ] Verify SEO meta tags

---

## 📅 Implementation Timeline

### Week 7: Schema & Core Components
- Days 1-2: Enhanced product schema
- Days 3-4: ProductCard enhancements
- Day 5: Quick View improvements

### Week 8: Shop This Look & Tracking
- Days 1-3: Shop This Look component
- Days 4-5: Enhanced tracking system

### Week 9: Polish & Testing
- Days 1-2: Wishlist functionality
- Days 3-4: Mobile optimization
- Day 5: Testing & bug fixes

---

## 🎯 Success Metrics

### Technical Metrics:
- [ ] All affiliate links properly tracked
- [ ] <100ms component render time
- [ ] 100% mobile responsive
- [ ] Zero console errors
- [ ] Lighthouse score >90

### Business Metrics:
- [ ] Track affiliate click-through rate
- [ ] Monitor conversion rate (if available)
- [ ] Measure engagement with Shop This Look
- [ ] Track wishlist usage
- [ ] Monitor product view duration

---

## 📝 Notes

### Dependencies:
- Sanity CMS (already set up)
- Plausible Analytics (already integrated)
- next-intl (already configured)
- Existing ProductCard component

### Considerations:
- GDPR compliance for tracking
- Affiliate disclosure requirements
- Mobile-first approach
- Performance optimization
- SEO best practices

---

**Status:** Planning Complete ✅  
**Next Step:** Begin Phase 3.1 - Enhanced Product Schema
