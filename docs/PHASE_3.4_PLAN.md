# Phase 3.4: Affiliate Disclosure & Compliance - Implementation Plan

## 📋 Overview
Implement comprehensive affiliate disclosure and GDPR compliance measures to ensure legal compliance and transparency with users.

---

## 🎯 Goals

1. **Proper Affiliate Disclosure** - Clear, visible disclosures across the site
2. **SEO Compliance** - Correct link attributes (rel="sponsored nofollow noopener")
3. **GDPR Compliance** - Cookie consent for affiliate tracking
4. **User Transparency** - Clear communication about affiliate relationships

---

## 📦 Implementation Tasks

### Task 1: Internationalize Footer Disclosure ✅

**Status:** Partially Complete (hardcoded English text exists)

**Current State:**
- Footer has affiliate disclosure in English only
- Translations exist in messages files but not used

**Required Changes:**
- Update `client-layout.tsx` to use `useTranslations`
- Replace hardcoded text with translation keys

**Files to Modify:**
- `app/[locale]/client-layout.tsx`

---

### Task 2: Create AffiliateLink Component

**Purpose:** Centralized component for all affiliate links with proper attributes

**Component Spec:**
```tsx
<AffiliateLink
  href="/go/product-id"
  productName="Product Name"
  onClick={() => trackAffiliateClick(...)}
>
  View Product
</AffiliateLink>
```

**Features:**
- Automatic `rel="noopener sponsored nofollow"` attributes
- Analytics tracking on click
- Tooltip showing "Affiliate link"
- External link icon
- Accessible (aria-label)

**File to Create:**
- `components/AffiliateLink.tsx`

---

### Task 3: Add Product Page Tooltips

**Purpose:** Show tooltip on product prices indicating affiliate link

**Implementation:**
- Add tooltip component or use existing
- Show on hover over price
- Text: "Affiliate link - We may earn a commission"
- Subtle, non-intrusive design

**Files to Modify:**
- `components/ProductCard.tsx`
- Add tooltip library if needed (e.g., Radix UI Tooltip)

---

### Task 4: Journal Post Disclaimers

**Purpose:** Add disclaimer at top of journal posts that mention products

**Implementation:**
- Check if post contains affiliate products
- Show disclaimer banner at top
- Text: "This post contains affiliate links. We may earn a commission..."
- Dismissible or always visible

**Files to Modify:**
- `app/[locale]/journal/[slug]/page.tsx`
- Create `components/AffiliateDisclaimer.tsx`

---

### Task 5: Update Cookie Consent for Affiliate Tracking

**Purpose:** Ensure GDPR compliance for affiliate tracking cookies

**Current State:**
- CookieConsent component exists
- Needs affiliate tracking category

**Required Changes:**
- Add "Affiliate Tracking" category to cookie consent
- Update consent logic to respect affiliate tracking preference
- Update analytics to check affiliate consent

**Files to Modify:**
- `components/CookieConsent.tsx`
- `lib/analytics.ts`

---

### Task 6: Update Privacy Policy

**Purpose:** Ensure privacy policy includes affiliate disclosure

**Status:** ✅ Already mentioned as complete in requirements

**Verification:**
- Check `app/[locale]/legal/privacy/page.tsx`
- Ensure affiliate disclosure section exists

---

## 📝 Detailed Implementation

### 1. Internationalize Footer Disclosure

**File:** `app/[locale]/client-layout.tsx`

**Changes:**
```tsx
import { useTranslations } from 'next-intl';

// Inside component:
const t = useTranslations('footer');

// Replace hardcoded text:
<p className="text-xs">
  {t('affiliateDisclosure')}
</p>
```

**Translation Keys (Already Exist):**
```json
{
  "footer": {
    "affiliateDisclosure": "Affiliate Disclosure: This site contains affiliate links..."
  }
}
```

---

### 2. AffiliateLink Component

**File:** `components/AffiliateLink.tsx`

```tsx
'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { trackAffiliateClick } from '@/lib/analytics';
import { useTranslations } from 'next-intl';

interface AffiliateLinkProps {
  href: string;
  children: ReactNode;
  productId?: string;
  productName?: string;
  productPrice?: number;
  className?: string;
  showIcon?: boolean;
  showTooltip?: boolean;
}

export default function AffiliateLink({
  href,
  children,
  productId,
  productName,
  productPrice,
  className = '',
  showIcon = true,
  showTooltip = true,
}: AffiliateLinkProps) {
  const t = useTranslations('affiliate');

  const handleClick = () => {
    if (productId && productName) {
      trackAffiliateClick({
        productId,
        productName,
        productPrice: productPrice || 0,
        affiliateNetwork: 'tradedoubler', // or detect from URL
      });
    }
  };

  return (
    <Link
      href={href}
      rel="noopener sponsored nofollow"
      target="_blank"
      onClick={handleClick}
      className={`inline-flex items-center gap-1 ${className}`}
      aria-label={`${children} (${t('affiliateLink')})`}
      title={showTooltip ? t('affiliateLinkTooltip') : undefined}
    >
      {children}
      {showIcon && <ExternalLink size={14} className="opacity-60" />}
    </Link>
  );
}
```

**Translation Keys to Add:**
```json
{
  "affiliate": {
    "affiliateLink": "Affiliate link",
    "affiliateLinkTooltip": "Affiliate link - We may earn a commission",
    "disclaimer": "This post contains affiliate links. We may earn a commission from purchases made through these links at no additional cost to you.",
    "learnMore": "Learn more"
  }
}
```

---

### 3. Product Card Tooltip

**File:** `components/ProductCard.tsx`

**Add Tooltip to Price:**
```tsx
import { Info } from 'lucide-react';

// In price section:
<div className="flex items-center gap-2">
  <span className="text-2xl font-bold">{price}</span>
  <div className="group relative">
    <Info size={16} className="text-gray-400 cursor-help" />
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
      {t('affiliateLinkTooltip')}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
    </div>
  </div>
</div>
```

---

### 4. Journal Post Disclaimer

**File:** `components/AffiliateDisclaimer.tsx`

```tsx
'use client';

import { Info } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface AffiliateDisclaimerProps {
  className?: string;
}

export default function AffiliateDisclaimer({ className = '' }: AffiliateDisclaimerProps) {
  const t = useTranslations('affiliate');

  return (
    <div className={`bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 ${className}`}>
      <div className="flex items-start gap-3">
        <Info size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm text-gray-700">
            {t('disclaimer')}{' '}
            <Link
              href="/legal/privacy#affiliate-disclosure"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              {t('learnMore')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
```

**Usage in Journal Post:**
```tsx
// app/[locale]/journal/[slug]/page.tsx
import AffiliateDisclaimer from '@/components/AffiliateDisclaimer';

// Check if post has affiliate products
const hasAffiliateProducts = post.products && post.products.length > 0;

return (
  <article>
    {hasAffiliateProducts && <AffiliateDisclaimer />}
    {/* Rest of post content */}
  </article>
);
```

---

### 5. Update Cookie Consent

**File:** `components/CookieConsent.tsx`

**Add Affiliate Tracking Category:**
```tsx
const [preferences, setPreferences] = useState({
  necessary: true, // Always true
  analytics: false,
  marketing: false,
  affiliate: false, // NEW
});

// In consent UI:
<label>
  <input
    type="checkbox"
    checked={preferences.affiliate}
    onChange={(e) => setPreferences({...preferences, affiliate: e.target.checked})}
  />
  Affiliate Tracking
  <span className="text-xs text-gray-500">
    Track affiliate link clicks for commission purposes
  </span>
</label>
```

**Update Analytics:**
```tsx
// lib/analytics.ts
export function canTrackAffiliate(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) return false;
    
    const consentData = JSON.parse(consent);
    return consentData.affiliate === true;
  } catch {
    return false;
  }
}

export function trackAffiliateClick(data: AffiliateClickData): void {
  if (!canTrackAffiliate()) {
    console.log('[Analytics] Affiliate tracking not consented');
    return;
  }
  
  // Existing tracking logic...
}
```

---

## 🌐 Translation Keys

### English (`messages/en.json`)

```json
{
  "affiliate": {
    "affiliateLink": "Affiliate link",
    "affiliateLinkTooltip": "Affiliate link - We may earn a commission",
    "disclaimer": "This post contains affiliate links. We may earn a commission from purchases made through these links at no additional cost to you.",
    "learnMore": "Learn more",
    "cookieCategory": "Affiliate Tracking",
    "cookieDescription": "Track affiliate link clicks for commission purposes"
  }
}
```

### German (`messages/de.json`)

```json
{
  "affiliate": {
    "affiliateLink": "Affiliate-Link",
    "affiliateLinkTooltip": "Affiliate-Link - Wir können eine Provision verdienen",
    "disclaimer": "Dieser Beitrag enthält Affiliate-Links. Wir können eine Provision aus Käufen erhalten, die über diese Links getätigt werden, ohne zusätzliche Kosten für Sie.",
    "learnMore": "Mehr erfahren",
    "cookieCategory": "Affiliate-Tracking",
    "cookieDescription": "Verfolgen Sie Affiliate-Link-Klicks für Provisionszwecke"
  }
}
```

---

## 🧪 Testing Checklist

### Disclosure Placement
- [ ] Footer disclosure visible on all pages
- [ ] Footer disclosure uses correct translation (EN/DE)
- [ ] Product card tooltip appears on hover
- [ ] Journal post disclaimer shows when products present
- [ ] Privacy policy includes affiliate section

### Link Attributes
- [ ] All affiliate links have `rel="noopener sponsored nofollow"`
- [ ] External link icon shows on affiliate links
- [ ] Links open in new tab
- [ ] Analytics tracking fires on click

### GDPR Compliance
- [ ] Cookie consent includes affiliate tracking option
- [ ] Affiliate tracking respects user consent
- [ ] User can opt-out of affiliate tracking
- [ ] Consent persists across sessions
- [ ] Privacy policy updated

### Internationalization
- [ ] All affiliate text translates correctly (EN/DE)
- [ ] Tooltips show in correct language
- [ ] Disclaimers show in correct language

---

## 📊 Success Criteria

1. ✅ All affiliate links have proper `rel` attributes
2. ✅ Disclosure visible in footer on all pages
3. ✅ Product tooltips show affiliate status
4. ✅ Journal posts with products show disclaimer
5. ✅ Cookie consent includes affiliate tracking
6. ✅ Analytics respects affiliate consent
7. ✅ All text properly internationalized
8. ✅ Privacy policy includes affiliate disclosure

---

## 🚀 Implementation Order

1. **Phase 1: Translations** (15 min)
   - Add affiliate translation keys
   - Update footer to use translations

2. **Phase 2: AffiliateLink Component** (30 min)
   - Create component
   - Add proper attributes
   - Integrate analytics

3. **Phase 3: Product Tooltips** (20 min)
   - Add tooltip to ProductCard
   - Style and position

4. **Phase 4: Journal Disclaimers** (30 min)
   - Create AffiliateDisclaimer component
   - Integrate into journal posts
   - Add conditional logic

5. **Phase 5: Cookie Consent** (30 min)
   - Update CookieConsent component
   - Add affiliate tracking category
   - Update analytics consent check

6. **Phase 6: Testing** (30 min)
   - Test all placements
   - Verify link attributes
   - Test consent flow
   - Check translations

**Total Estimated Time:** 2.5 hours

---

## 📝 Notes

### Legal Considerations
- Affiliate disclosure must be "clear and conspicuous"
- Must be placed where users will see it before clicking
- Cannot be hidden in fine print
- Must be in plain language

### SEO Best Practices
- `rel="sponsored"` tells Google it's a paid link
- `rel="nofollow"` prevents passing PageRank
- `rel="noopener"` prevents security issues
- All three should be used together

### GDPR Requirements
- Users must consent to affiliate tracking
- Must be able to opt-out
- Data must be deletable
- Privacy policy must explain data usage

---

**Status:** Ready for Implementation  
**Priority:** HIGH (Legal Compliance)  
**Dependencies:** None  
**Estimated Completion:** 2.5 hours
