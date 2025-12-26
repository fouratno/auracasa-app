# TODO - Auracasa Premium

**Last Updated:** January 2025  
**Project Status:** Phase 3.3 Complete

---

## 🚀 Immediate Tasks (High Priority)

### Phase 3.3 Completion Items

#### 1. Configure Resend API for Newsletter
**Priority:** HIGH  
**Status:** ⏳ Pending  
**Estimated Time:** 15 minutes

**Steps:**
1. Sign up at https://resend.com
2. Create an API key
3. Create an audience
4. Add to `.env.local`:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   RESEND_AUDIENCE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   ```
5. Test newsletter subscription at `/en/wishlist` or any page with NewsletterSignup component

**Acceptance Criteria:**
- [ ] Resend account created
- [ ] API key configured
- [ ] Audience created
- [ ] Environment variables set
- [ ] Newsletter subscription tested and working

---

#### 2. Integrate WishlistButton into ProductCard
**Priority:** HIGH  
**Status:** ⏳ Pending  
**Estimated Time:** 30 minutes

**Files to Modify:**
- `components/ProductCard.tsx`

**Implementation:**
```tsx
import { WishlistButton } from '@/components/WishlistButton';

// Inside ProductCard component, add:
<WishlistButton
  product={{
    productId: product.id,
    productName: product.name,
    productImage: product.image,
    productPrice: product.price,
    currency: product.currency || 'EUR',
    brandName: product.brand,
    affiliateUrl: product.affiliateLink,
    category: product.category
  }}
  size="md"
  showLabel={false}
/>
```

**Acceptance Criteria:**
- [ ] WishlistButton added to ProductCard
- [ ] Button positioned correctly (top-right corner)
- [ ] Add to wishlist works
- [ ] Remove from wishlist works
- [ ] Wishlist count updates in navigation
- [ ] Toast notifications appear
- [ ] Analytics events fire

---

#### 3. Fix Minor Translation Inconsistency
**Priority:** MEDIUM  
**Status:** ⏳ Pending  
**Estimated Time:** 5 minutes

**Issue:** Button text says "View project" instead of "View Portfolio"

**Files to Modify:**
- `messages/en.json`
- `messages/de.json`

**Changes:**
```json
// messages/en.json
"wishlist": {
  "viewPortfolio": "View Portfolio"  // Add this
}

// messages/de.json
"wishlist": {
  "viewPortfolio": "Portfolio ansehen"  // Add this
}
```

**Update Component:**
- `app/[locale]/wishlist/WishlistClient.tsx` - Change button text to use `t('viewPortfolio')`

**Acceptance Criteria:**
- [ ] Translation keys added
- [ ] Component updated
- [ ] English text correct
- [ ] German text correct

---

#### 4. Add Favicon
**Priority:** LOW  
**Status:** ⏳ Pending  
**Estimated Time:** 10 minutes

**Issue:** Favicon 404 error in console

**Steps:**
1. Create or obtain favicon.ico (32x32 or 16x16)
2. Place in `auracasa-premium/public/favicon.ico`
3. Optionally add other sizes:
   - `public/favicon-16x16.png`
   - `public/favicon-32x32.png`
   - `public/apple-touch-icon.png`

**Acceptance Criteria:**
- [ ] Favicon file added
- [ ] No 404 errors in console
- [ ] Favicon displays in browser tab

---

## 📋 Short-term Tasks (Next Sprint)

### Testing & Quality Assurance

#### 5. Add Automated Tests
**Priority:** MEDIUM  
**Status:** ⏳ Pending  
**Estimated Time:** 2-3 days

**Test Coverage Needed:**
- [ ] Unit tests for wishlist utilities
- [ ] Unit tests for newsletter utilities
- [ ] Component tests for WishlistButton
- [ ] Component tests for WishlistBadge
- [ ] Component tests for NewsletterSignup
- [ ] Integration tests for wishlist flow
- [ ] E2E tests for user journey

**Tools:**
- Jest for unit tests
- React Testing Library for component tests
- Playwright or Cypress for E2E tests

---

#### 6. Complete End-to-End Testing
**Priority:** MEDIUM  
**Status:** ⏳ Pending  
**Estimated Time:** 1 day

**Test Scenarios:**
- [ ] User adds product to wishlist
- [ ] User removes product from wishlist
- [ ] User views wishlist page
- [ ] User clears wishlist
- [ ] User exports wishlist
- [ ] User imports wishlist
- [ ] User searches wishlist
- [ ] User subscribes to newsletter
- [ ] User switches languages
- [ ] Wishlist persists across sessions

---

#### 7. Performance Optimization
**Priority:** MEDIUM  
**Status:** ⏳ Pending  
**Estimated Time:** 1-2 days

**Optimizations:**
- [ ] Add loading states to components
- [ ] Optimize images (add sizes prop)
- [ ] Implement lazy loading for wishlist items
- [ ] Add caching for wishlist data
- [ ] Optimize bundle size
- [ ] Add service worker for offline support

---

### Deployment

#### 8. Deploy to Staging
**Priority:** HIGH  
**Status:** ⏳ Pending  
**Estimated Time:** 1 hour

**Prerequisites:**
- [ ] Resend API configured
- [ ] WishlistButton integrated
- [ ] All tests passing
- [ ] Documentation reviewed

**Steps:**
1. Create staging branch
2. Deploy to staging environment
3. Run smoke tests
4. Verify all features work
5. Get stakeholder approval

---

#### 9. User Acceptance Testing (UAT)
**Priority:** HIGH  
**Status:** ⏳ Pending  
**Estimated Time:** 2-3 days

**Test with:**
- [ ] Product team
- [ ] Marketing team
- [ ] Sample users
- [ ] Stakeholders

**Feedback Areas:**
- [ ] Usability
- [ ] Performance
- [ ] Design
- [ ] Functionality
- [ ] Translations

---

## 🔮 Long-term Tasks (Phase 4)

### Collections System

#### 10. Implement Collections Utilities
**Priority:** MEDIUM  
**Status:** 📅 Planned  
**Estimated Time:** 2 days

**File to Create:** `lib/collections.ts`

**Functions Needed:**
- [ ] `createCollection(name, description)`
- [ ] `addToCollection(collectionId, product)`
- [ ] `removeFromCollection(collectionId, productId)`
- [ ] `getCollections()`
- [ ] `getCollection(id)`
- [ ] `updateCollection(id, data)`
- [ ] `deleteCollection(id)`
- [ ] `shareCollection(id)` - Generate shareable link
- [ ] `getSharedCollection(shareId)` - Get public collection

---

#### 11. Create Collections Pages
**Priority:** MEDIUM  
**Status:** 📅 Planned  
**Estimated Time:** 3 days

**Pages to Create:**
- [ ] `/[locale]/collections` - All collections
- [ ] `/[locale]/collections/[id]` - Single collection
- [ ] `/[locale]/collections/shared/[shareId]` - Shared collection

---

#### 12. Collections Components
**Priority:** MEDIUM  
**Status:** 📅 Planned  
**Estimated Time:** 2 days

**Components to Create:**
- [ ] `CollectionCard` - Display collection
- [ ] `CreateCollectionModal` - Create new collection
- [ ] `AddToCollectionModal` - Add product to collection
- [ ] `CollectionShareButton` - Share collection
- [ ] `CollectionEmptyState` - Empty state

---

### User Authentication

#### 13. Set Up Authentication
**Priority:** MEDIUM  
**Status:** 📅 Planned  
**Estimated Time:** 3-4 days

**Options:**
- NextAuth.js (recommended)
- Clerk
- Auth0

**Features Needed:**
- [ ] User registration
- [ ] User login
- [ ] Password reset
- [ ] Email verification
- [ ] Social login (Google, Facebook)
- [ ] User profile page
- [ ] Protected routes

---

#### 14. Sync Wishlist with User Account
**Priority:** MEDIUM  
**Status:** 📅 Planned  
**Estimated Time:** 2 days

**Implementation:**
- [ ] Migrate localStorage wishlist to database
- [ ] Sync on login
- [ ] Merge local and server wishlists
- [ ] Cross-device sync
- [ ] Conflict resolution

---

### Advanced Newsletter Features

#### 15. Exit-Intent Popup
**Priority:** LOW  
**Status:** 📅 Planned  
**Estimated Time:** 1 day

**Features:**
- [ ] Detect exit intent (mouse leaving viewport)
- [ ] Show newsletter signup modal
- [ ] Respect dismissal (don't show again for X days)
- [ ] A/B testing support
- [ ] Analytics tracking

---

#### 16. Inline Newsletter Forms
**Priority:** LOW  
**Status:** 📅 Planned  
**Estimated Time:** 1 day

**Locations:**
- [ ] Journal post pages
- [ ] After project view
- [ ] Footer (already planned)
- [ ] Wishlist page

---

#### 17. Email Sequences
**Priority:** LOW  
**Status:** 📅 Planned  
**Estimated Time:** 3-4 days

**Sequences to Create:**
1. **Welcome Series:**
   - [ ] Welcome email (brand story)
   - [ ] Day 3: First curated picks
   - [ ] Day 7: How to use wishlist
   - [ ] Day 14: Exclusive deals

2. **Weekly Newsletter:**
   - [ ] Curated product picks
   - [ ] New project announcements
   - [ ] Design tips
   - [ ] Partner deals

3. **Behavioral Triggers:**
   - [ ] Abandoned wishlist
   - [ ] Price drop alerts
   - [ ] Back in stock notifications
   - [ ] Birthday/anniversary

---

## 🐛 Known Issues

### Minor Issues

#### Issue 1: Sanity API Connection Errors
**Priority:** LOW  
**Status:** 🔍 Investigating  
**Impact:** Some pages may not load Sanity content

**Error:**
```
getaddrinfo ENOTFOUND 9qnllyyc.api.sanity.io
```

**Possible Causes:**
- Network connectivity
- Sanity configuration
- API rate limiting

**Next Steps:**
- [ ] Check Sanity configuration
- [ ] Verify API credentials
- [ ] Test connection
- [ ] Add error handling

---

#### Issue 2: Image Size Warnings
**Priority:** LOW  
**Status:** 📝 Documented  
**Impact:** Performance warnings in console

**Warning:**
```
Image with src "/hero-1.jpg" has "fill" but is missing "sizes" prop
```

**Solution:**
- [ ] Add sizes prop to all images with fill
- [ ] Example: `sizes="(max-width: 768px) 100vw, 50vw"`

---

## 📊 Progress Tracking

### Phase 3.3 Completion: 95%
- [x] Wishlist utilities (100%)
- [x] Wishlist components (100%)
- [x] Wishlist pages (100%)
- [x] Newsletter utilities (100%)
- [x] Newsletter components (100%)
- [x] Newsletter API (100%)
- [x] Internationalization (100%)
- [x] Navigation integration (100%)
- [x] Documentation (100%)
- [x] Hydration error fix (100%)
- [x] Critical path testing (100%)
- [ ] Resend configuration (0%)
- [ ] ProductCard integration (0%)
- [ ] End-to-end testing (0%)

### Overall Project Progress: 75%
- [x] Phase 1: Foundation (100%)
- [x] Phase 2: CMS & SEO (100%)
- [x] Phase 3.1: Affiliate Integration (100%)
- [x] Phase 3.3: User Engagement (95%)
- [ ] Phase 4: Advanced Features (0%)

---

## 📝 Notes

### Development Environment
- Node.js version: Latest LTS
- Next.js version: 14.2.35 (consider upgrading)
- Package manager: npm

### Deployment
- Staging: TBD
- Production: TBD

### Team
- Developer: BLACKBOXAI
- Reviewer: TBD
- QA: TBD

---

## 🔗 Related Documentation

- [PHASE_3.3_PLAN.md](./PHASE_3.3_PLAN.md) - Implementation plan
- [PHASE_3.3_COMPLETE.md](./PHASE_3.3_COMPLETE.md) - Completion report
- [PHASE_3.3_README.md](./PHASE_3.3_README.md) - Quick reference
- [PHASE_3.3_TESTING_RESULTS.md](./PHASE_3.3_TESTING_RESULTS.md) - Test results
- [PHASE_3.3_VERIFICATION.md](./PHASE_3.3_VERIFICATION.md) - Verification report

---

**Last Updated:** January 2025  
**Next Review:** After Resend configuration and ProductCard integration
