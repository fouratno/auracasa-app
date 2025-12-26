# Phase 3.3: User Engagement Features - Implementation Plan

## 📋 Overview
Implement wishlist/collections and newsletter integration to increase user engagement, return visits, and build an email marketing channel.

---

## 🎯 Goals

1. **Wishlist/Collections** - Allow users to save and organize products
2. **Newsletter Integration** - Build email list for direct marketing
3. **User Engagement** - Increase return visits and conversions

---

## 📦 Part 1: Wishlist/Collections System

### 1.1 Data Structure (LocalStorage-based)

Since we're starting without user authentication, we'll use localStorage:

```typescript
interface WishlistItem {
  productId: string;
  productName: string;
  productImage: string;
  productPrice: number;
  currency: string;
  brandName: string;
  affiliateUrl: string;
  addedAt: string;
}

interface Collection {
  id: string;
  name: string;
  description?: string;
  products: WishlistItem[];
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  shareId?: string; // For public sharing
}
```

### 1.2 Wishlist Utilities

**File:** `lib/wishlist.ts`

Functions to implement:
- `addToWishlist(product)` - Add product to default wishlist
- `removeFromWishlist(productId)` - Remove product
- `getWishlist()` - Get all wishlist items
- `isInWishlist(productId)` - Check if product is saved
- `clearWishlist()` - Clear all items
- `getWishlistCount()` - Get total items count

### 1.3 Collections Utilities

**File:** `lib/collections.ts`

Functions to implement:
- `createCollection(name, description)` - Create new collection
- `addToCollection(collectionId, product)` - Add product to collection
- `removeFromCollection(collectionId, productId)` - Remove product
- `getCollections()` - Get all collections
- `getCollection(id)` - Get single collection
- `updateCollection(id, data)` - Update collection
- `deleteCollection(id)` - Delete collection
- `shareCollection(id)` - Generate shareable link
- `getSharedCollection(shareId)` - Get public collection

### 1.4 Components

#### WishlistButton Component
```tsx
<WishlistButton
  product={product}
  size="sm" | "md" | "lg"
  showLabel={boolean}
/>
```

Features:
- Heart icon (filled when saved)
- Click to add/remove
- Optimistic UI updates
- Toast notifications
- Analytics tracking

#### WishlistModal Component
- Quick view of wishlist
- Remove items
- View full wishlist page
- Create collection from wishlist

#### CollectionsPage
- List all collections
- Create new collection
- Edit/delete collections
- Share collections
- View collection details

#### CollectionDetailPage
- Display collection products
- Add/remove products
- Edit collection info
- Share collection
- Export/print collection

### 1.5 Pages to Create

1. `/[locale]/wishlist` - Main wishlist page
2. `/[locale]/collections` - All collections
3. `/[locale]/collections/[id]` - Single collection
4. `/[locale]/collections/shared/[shareId]` - Public shared collection

---

## 📧 Part 2: Newsletter Integration

### 2.1 Newsletter Service Setup

**Options:**
- ConvertKit (Recommended - creator-focused)
- Mailchimp (Popular, feature-rich)
- Loops (Modern, developer-friendly)
- Resend (Simple, affordable)

**Decision:** Start with **Resend** for simplicity, can migrate later

### 2.2 Newsletter Utilities

**File:** `lib/newsletter.ts`

Functions:
- `subscribeToNewsletter(email, name?, source)` - Subscribe user
- `unsubscribe(email)` - Unsubscribe user
- `isSubscribed(email)` - Check subscription status
- `trackNewsletterSignup(source)` - Analytics tracking

### 2.3 Newsletter Components

#### NewsletterSignupForm
```tsx
<NewsletterSignupForm
  variant="inline" | "modal" | "footer"
  source="footer" | "exit-intent" | "journal-post"
  showName={boolean}
/>
```

Features:
- Email input with validation
- Optional name field
- GDPR-compliant checkbox
- Success/error states
- Loading states
- Analytics tracking

#### ExitIntentPopup
- Detects exit intent (mouse leaving viewport)
- Shows newsletter signup
- Dismissible
- Respects user preference (don't show again)
- Cookie-based tracking

### 2.4 Newsletter Placements

1. **Footer** - Always visible
2. **Exit Intent Popup** - On scroll up/mouse leave
3. **Inline in Journal Posts** - After 2-3 paragraphs
4. **Post-Project View** - After viewing project details
5. **Wishlist Page** - Encourage saving collections

### 2.5 Email Sequences (To Configure in Resend/ConvertKit)

1. **Welcome Email**
   - Thank you for subscribing
   - Brand story
   - What to expect
   - Link to latest project

2. **Weekly Curated Picks**
   - 3-5 featured products
   - Affiliate links
   - Design tips
   - New project preview

3. **New Project Announcement**
   - Project showcase
   - Featured products
   - Behind-the-scenes

4. **Exclusive Deals**
   - Partner discounts
   - Limited-time offers
   - Seasonal collections

---

## 🔧 Implementation Steps

### Week 1: Wishlist Foundation
- [ ] Day 1: Create wishlist utilities
- [ ] Day 2: Create WishlistButton component
- [ ] Day 3: Create wishlist page
- [ ] Day 4: Integrate with ProductCard
- [ ] Day 5: Testing & polish

### Week 2: Collections System
- [ ] Day 1: Create collections utilities
- [ ] Day 2: Create collections page
- [ ] Day 3: Create collection detail page
- [ ] Day 4: Implement sharing functionality
- [ ] Day 5: Testing & polish

### Week 3: Newsletter Integration
- [ ] Day 1: Set up Resend account & API
- [ ] Day 2: Create newsletter utilities
- [ ] Day 3: Create signup components
- [ ] Day 4: Implement exit intent popup
- [ ] Day 5: Testing & email sequences

---

## 📊 Analytics Events to Track

### Wishlist Events:
- `wishlist_add` - Product added to wishlist
- `wishlist_remove` - Product removed
- `wishlist_view` - Wishlist page viewed
- `wishlist_clear` - All items cleared

### Collection Events:
- `collection_create` - New collection created
- `collection_add_product` - Product added to collection
- `collection_remove_product` - Product removed
- `collection_share` - Collection shared
- `collection_view_shared` - Shared collection viewed

### Newsletter Events:
- `newsletter_signup` - User subscribed
- `newsletter_signup_source` - Track signup source
- `exit_intent_shown` - Exit popup displayed
- `exit_intent_dismissed` - Popup closed without signup

---

## 🎨 UI/UX Considerations

### Wishlist:
- Heart icon universally recognized
- Instant feedback on add/remove
- Toast notifications
- Empty state with CTA
- Product count badge

### Collections:
- Pinterest-style grid layout
- Drag-and-drop organization (future)
- Cover image selection
- Public/private toggle
- Share link with preview

### Newsletter:
- Non-intrusive placements
- Clear value proposition
- GDPR-compliant
- Easy unsubscribe
- Mobile-optimized

---

## 🌍 Internationalization

### Translation Keys Needed:

```json
{
  "wishlist": {
    "add": "Add to Wishlist",
    "remove": "Remove from Wishlist",
    "added": "Added to wishlist",
    "removed": "Removed from wishlist",
    "empty": "Your wishlist is empty",
    "emptyDescription": "Start adding products you love",
    "viewAll": "View Wishlist",
    "count": "{count} items"
  },
  "collections": {
    "create": "Create Collection",
    "name": "Collection Name",
    "description": "Description",
    "share": "Share Collection",
    "shareLink": "Share Link",
    "copyLink": "Copy Link",
    "linkCopied": "Link copied!",
    "public": "Public",
    "private": "Private",
    "empty": "No collections yet",
    "emptyDescription": "Create your first collection"
  },
  "newsletter": {
    "title": "Stay Inspired",
    "description": "Get weekly design inspiration and curated product picks",
    "emailPlaceholder": "Enter your email",
    "namePlaceholder": "Your name (optional)",
    "subscribe": "Subscribe",
    "subscribing": "Subscribing...",
    "success": "Thanks for subscribing!",
    "error": "Something went wrong. Please try again.",
    "gdpr": "I agree to receive emails and understand I can unsubscribe anytime",
    "exitIntent": {
      "title": "Before you go...",
      "description": "Join our community for exclusive design inspiration"
    }
  }
}
```

---

## 🔒 Privacy & GDPR Compliance

### Wishlist/Collections:
- Stored locally (no server-side data)
- Clear data on browser clear
- Export functionality
- Delete functionality

### Newsletter:
- Double opt-in (recommended)
- Clear consent checkbox
- Easy unsubscribe link
- Privacy policy link
- Data processing disclosure

---

## 🧪 Testing Plan

### Wishlist Testing:
- [ ] Add product to wishlist
- [ ] Remove product from wishlist
- [ ] View wishlist page
- [ ] Clear wishlist
- [ ] Wishlist persists across sessions
- [ ] Wishlist count updates correctly
- [ ] Empty state displays correctly

### Collections Testing:
- [ ] Create collection
- [ ] Add product to collection
- [ ] Remove product from collection
- [ ] Edit collection
- [ ] Delete collection
- [ ] Share collection
- [ ] View shared collection
- [ ] Public/private toggle works

### Newsletter Testing:
- [ ] Subscribe with valid email
- [ ] Subscribe with invalid email
- [ ] GDPR checkbox required
- [ ] Success message displays
- [ ] Error handling works
- [ ] Exit intent triggers correctly
- [ ] Exit intent respects dismissal
- [ ] Email delivery works

---

## 📈 Success Metrics

### Wishlist:
- Wishlist add rate (% of product views)
- Average items per wishlist
- Wishlist to purchase conversion
- Return visit rate

### Collections:
- Collections created per user
- Average products per collection
- Collection share rate
- Shared collection views

### Newsletter:
- Signup conversion rate by source
- Email open rate
- Click-through rate
- Unsubscribe rate
- Revenue per subscriber

---

## 🚀 Future Enhancements

### Wishlist:
- User accounts for cross-device sync
- Price drop alerts
- Back-in-stock notifications
- Wishlist analytics dashboard

### Collections:
- Collaborative collections
- Collection templates
- Social sharing (Pinterest, Instagram)
- Collection marketplace

### Newsletter:
- Personalized recommendations
- Behavioral triggers
- A/B testing
- Advanced segmentation

---

**Status:** Planning Complete ✅  
**Next Step:** Begin implementation - Wishlist utilities
