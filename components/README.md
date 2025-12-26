# Auracasa Premium Component Library

**Phase 1.2: Component Library Enhancements**

A comprehensive collection of production-ready React components for the Auracasa premium affiliate marketing platform.

---

## 📦 Components Overview

### **Navigation System**
- `Navigation.tsx` - Enhanced header with mega menu, mobile drawer, search, wishlist, and account features

### **Card Components**
- `ProjectCard.tsx` - Project showcase cards with wishlist and "Shop This Look" features
- `ProductCard.tsx` - Affiliate product cards with quick view and ratings

### **Interactive Components**
- `ImageGallery.tsx` - Image gallery with lightbox and keyboard navigation
- `Search.tsx` - Real-time search modal with keyboard shortcuts

### **Loading States**
- `LoadingSkeleton.tsx` - Comprehensive skeleton loading components

---

## 🚀 Quick Start

### **Import Components**

```tsx
// Individual imports
import Navigation from '@/components/Navigation';
import ProjectCard from '@/components/ProjectCard';
import ProductCard from '@/components/ProductCard';
import ImageGallery from '@/components/ImageGallery';
import Search from '@/components/Search';
import LoadingSkeleton from '@/components/LoadingSkeleton';

// Or use barrel exports
import { Navigation, ProjectCard, ProductCard } from '@/components';
```

---

## 📚 Component Documentation

### **1. Navigation**

Enhanced navigation system with mega menu and mobile drawer.

```tsx
import Navigation from '@/components/Navigation';

export default function Layout({ children }) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  );
}
```

**Features:**
- Sticky header with glassmorphism
- Mega menu for Portfolio (hover-triggered)
- Mobile slide-out drawer
- Search, Wishlist, Account icons
- Smooth animations

---

### **2. ProjectCard**

Display project cards with wishlist and shopping features.

```tsx
import ProjectCard from '@/components/ProjectCard';

<ProjectCard
  slug="sunset-loft"
  title="Sunset Loft"
  tag="AI • Warm Futurism"
  image="/hero-1.jpg"
  description="Where warmth and technology coexist"
  viewCount={3500}
  hasShoppableItems={true}
/>
```

**Props:**
- `slug` (string, required) - Project URL slug
- `title` (string, required) - Project title
- `tag` (string, required) - Project category/tag
- `image` (string, required) - Image URL
- `description` (string, optional) - Short description
- `viewCount` (number, optional) - View count display
- `hasShoppableItems` (boolean, optional) - Show "Shop This Look" button
- `className` (string, optional) - Additional CSS classes

**Features:**
- Progressive image loading with skeleton
- Wishlist heart icon (save/unsave)
- Hover zoom effect
- View count display
- "Shop This Look" CTA

---

### **3. ProductCard**

Affiliate product cards with quick view modal.

```tsx
import ProductCard from '@/components/ProductCard';

<ProductCard
  id="prod-123"
  name="Modern Pendant Light"
  brand="West Elm"
  price={299.99}
  originalPrice={399.99}
  image="/products/pendant-light.jpg"
  affiliateUrl="https://example.com/affiliate-link"
  category="Lighting"
  rating={4.5}
  reviewCount={128}
  inStock={true}
/>
```

**Props:**
- `id` (string, required) - Product ID
- `name` (string, required) - Product name
- `brand` (string, required) - Brand name
- `price` (number, required) - Current price
- `originalPrice` (number, optional) - Original price (for discount)
- `image` (string, required) - Product image URL
- `affiliateUrl` (string, required) - Affiliate link
- `brandLogo` (string, optional) - Brand logo URL
- `category` (string, optional) - Product category
- `rating` (number, optional) - Star rating (0-5)
- `reviewCount` (number, optional) - Number of reviews
- `inStock` (boolean, optional) - Stock status
- `className` (string, optional) - Additional CSS classes

**Features:**
- Quick view modal
- Star rating display
- Discount badge
- Affiliate disclosure
- Out of stock handling

---

### **4. ImageGallery**

Image gallery with lightbox functionality.

```tsx
import ImageGallery from '@/components/ImageGallery';

const images = [
  {
    src: '/gallery/image-1.jpg',
    alt: 'Living room view',
    caption: 'Modern minimalist living space',
  },
  {
    src: '/gallery/image-2.jpg',
    alt: 'Kitchen view',
    caption: 'Open concept kitchen design',
  },
];

<ImageGallery images={images} columns={3} />
```

**Props:**
- `images` (array, required) - Array of image objects
  - `src` (string) - Image URL
  - `alt` (string) - Alt text
  - `caption` (string, optional) - Image caption
- `columns` (2 | 3 | 4, optional) - Grid columns (default: 3)
- `className` (string, optional) - Additional CSS classes

**Features:**
- Responsive grid layout
- Lightbox with full-screen view
- Keyboard navigation (←, →, ESC)
- Thumbnail strip
- Image captions
- Progressive loading

---

### **5. Search**

Real-time search modal with keyboard shortcuts.

```tsx
import Search from '@/components/Search';
import { useState } from 'react';

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsSearchOpen(true)}>
        Search
      </button>
      <Search 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
}
```

**Props:**
- `isOpen` (boolean, required) - Modal open state
- `onClose` (function, required) - Close handler

**Features:**
- Real-time search (300ms debounce)
- Keyboard shortcut (⌘K / Ctrl+K)
- Categorized results (Projects, Journal, Pages)
- Image thumbnails
- Empty and loading states
- Keyboard navigation hints

---

### **6. LoadingSkeleton**

Skeleton loading components for better perceived performance.

```tsx
import LoadingSkeleton, {
  ProjectCardSkeleton,
  ProductCardSkeleton,
  HeroSkeleton,
} from '@/components/LoadingSkeleton';

// Generic skeleton
<LoadingSkeleton variant="card" count={3} />

// Specialized skeletons
<ProjectCardSkeleton count={6} />
<ProductCardSkeleton count={4} />
<HeroSkeleton />
```

**Variants:**
- `text` - Text lines
- `card` - Card with image and content
- `image` - Image grid
- `circle` - Circular (avatars)
- `button` - Button shapes

**Specialized Components:**
- `ProjectCardSkeleton` - For project grids
- `ProductCardSkeleton` - For product grids
- `ImageGallerySkeleton` - For image galleries
- `HeroSkeleton` - For hero sections
- `NavigationSkeleton` - For header
- `FooterSkeleton` - For footer
- `TextSkeleton` - For paragraphs

---

## 🎨 Styling

All components use Tailwind CSS with the premium design system:

### **Design Tokens:**
- **Fonts:** Playfair Display (serif), Inter (sans), Space Grotesk (display)
- **Colors:** Brand (desert clay), Accent (sky blue), Blush (pink)
- **Spacing:** Fluid scale (responsive)
- **Shadows:** Soft, Medium, Strong
- **Animations:** Fade, Slide, Scale, Bounce

### **Utility Classes:**
```css
.glass-strong          /* Glassmorphism effect */
.card                  /* Base card style */
.card-interactive      /* Interactive card with hover */
.btn                   /* Button base */
.btn-primary           /* Primary button */
.btn-outline           /* Outline button */
.badge                 /* Badge/tag */
.skeleton              /* Skeleton loader */
.animate-fade-in       /* Fade in animation */
.animate-slide-in-right /* Slide in from right */
```

---

## ♿ Accessibility

All components follow accessibility best practices:

- ✅ Semantic HTML
- ✅ ARIA labels and attributes
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Screen reader friendly
- ✅ Color contrast compliance

---

## 📱 Responsive Design

Components are mobile-first and fully responsive:

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

---

## 🔧 Customization

### **Extending Components:**

```tsx
// Custom ProjectCard with additional features
import ProjectCard from '@/components/ProjectCard';

function CustomProjectCard(props) {
  return (
    <div className="relative">
      <ProjectCard {...props} />
      {/* Add custom overlay or badge */}
      <div className="absolute top-2 left-2">
        <span className="badge">Featured</span>
      </div>
    </div>
  );
}
```

### **Theming:**

Components respect the Tailwind dark mode:

```tsx
// Automatically adapts to dark mode
<ProjectCard 
  className="dark:border-white/10" 
  {...props} 
/>
```

---

## 🧪 Testing

### **Component Testing Checklist:**

**Navigation:**
- [ ] Mega menu opens on hover
- [ ] Mobile drawer slides in
- [ ] Search opens with ⌘K
- [ ] Wishlist badge updates

**ProjectCard:**
- [ ] Wishlist toggles
- [ ] Image loads progressively
- [ ] Hover effects work
- [ ] "Shop This Look" appears

**ProductCard:**
- [ ] Quick view opens
- [ ] Rating displays correctly
- [ ] Affiliate link works
- [ ] Discount calculates

**ImageGallery:**
- [ ] Lightbox opens
- [ ] Keyboard navigation works
- [ ] Thumbnails highlight
- [ ] Captions display

**Search:**
- [ ] ⌘K opens modal
- [ ] Results appear in real-time
- [ ] ESC closes modal
- [ ] Categories work

---

## 📊 Performance

### **Optimization Techniques:**

1. **Progressive Image Loading** - Blur-up effect with skeleton
2. **Debounced Search** - 300ms delay for real-time search
3. **Lazy Loading** - Images load on demand
4. **Code Splitting** - Components load as needed
5. **Memoization** - Prevent unnecessary re-renders

---

## 🐛 Troubleshooting

### **Common Issues:**

**Issue:** Navigation mega menu not showing
- **Solution:** Ensure parent has `relative` positioning

**Issue:** Search modal not opening
- **Solution:** Check `isOpen` state is being updated

**Issue:** Images not loading
- **Solution:** Verify image paths and Next.js Image config

**Issue:** Skeleton not animating
- **Solution:** Check Tailwind animation classes are included

---

## 📝 Changelog

### **Phase 1.2 (December 2025)**
- ✅ Navigation with mega menu and mobile drawer
- ✅ ProjectCard with wishlist and shop features
- ✅ ProductCard with quick view modal
- ✅ ImageGallery with lightbox
- ✅ Search with keyboard shortcuts
- ✅ LoadingSkeleton system

---

## 🤝 Contributing

When adding new components:

1. Follow existing naming conventions
2. Include TypeScript types
3. Add accessibility features
4. Document props and usage
5. Test on mobile and desktop
6. Update this README

---

## 📄 License

Part of the Auracasa Premium project.

---

## 🔗 Related Documentation

- [PHASE_1.2_COMPLETE.md](../PHASE_1.2_COMPLETE.md) - Implementation details
- [ROADMAP.md](../../ROADMAP.md) - Project roadmap
- [tailwind.config.ts](../tailwind.config.ts) - Design system tokens
- [globals.css](../app/globals.css) - Global styles

---

**Last Updated:** December 17, 2025  
**Version:** 1.2.0  
**Status:** Production Ready ✅
