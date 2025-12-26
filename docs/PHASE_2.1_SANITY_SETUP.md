# Phase 2.1: Sanity CMS Integration - Setup Complete ✅

## 📋 Overview

Sanity.io CMS has been integrated into the Auracasa project to enable dynamic content management for projects, products, journal posts, and authors.

---

## ✅ Completed Steps

### 1. **Dependencies Installed**
```bash
npm install @sanity/client@^6.0.0 @sanity/image-url@^1.0.0
```

**Packages:**
- `@sanity/client` - Core Sanity client for data fetching
- `@sanity/image-url` - Image URL builder with transformations

### 2. **File Structure Created**

```
auracasa-premium/
├── lib/
│   ├── sanity.client.ts      # Sanity client configuration
│   └── sanity.queries.ts     # GROQ queries & TypeScript interfaces
├── sanity/
│   └── schema.ts             # Content schemas (Project, Product, Author, JournalPost)
└── .env.local.example        # Environment variables template
```

### 3. **Sanity Client Configuration** (`lib/sanity.client.ts`)

Features:
- ✅ Client initialization with environment variables
- ✅ Image URL builder
- ✅ Helper function for image transformations
- ✅ CDN optimization for production

### 4. **Content Schemas Defined** (`sanity/schema.ts`)

**Four Main Content Types:**

#### **Project Schema**
- Title, slug, category (AI/Real/Hybrid)
- Hero image & gallery
- Rich text description
- Style tags & color palette
- Affiliate product references
- Published date & featured flag

#### **Product Schema**
- Name, brand, price
- Affiliate link
- Product image
- Category (Furniture/Lighting/Decor/Textiles)
- Stock status & featured flag

#### **Author Schema**
- Name, slug, image
- Bio (rich text)

#### **Journal Post Schema**
- Title, slug, author reference
- Hero image, excerpt, body (rich text)
- Categories, related projects
- Affiliate product references
- SEO metadata (meta title, description, OG image)

### 5. **GROQ Queries Created** (`lib/sanity.queries.ts`)

**Available Queries:**
- `getAllProjects()` - Fetch all projects with affiliate products
- `getFeaturedProjects(limit)` - Get featured projects
- `getProjectBySlug(slug)` - Single project with full details
- `getAllJournalPosts()` - All blog posts
- `getJournalPostBySlug(slug)` - Single post with related content
- `getFeaturedProducts(limit)` - Featured affiliate products
- `getProductsByCategory(category)` - Products by category
- `searchProjects(searchTerm)` - Full-text project search
- `searchJournalPosts(searchTerm)` - Full-text blog search

**TypeScript Interfaces:**
- `Project` - Complete project type
- `Product` - Affiliate product type
- `JournalPost` - Blog post type
- `SanityImage` - Image asset type

---

## 🚀 Next Steps: Sanity Studio Setup

### **Step 1: Create Sanity Project**

1. **Sign up for Sanity.io:**
   - Visit https://www.sanity.io/
   - Create a free account
   - Create a new project

2. **Get Project Credentials:**
   - Project ID (from dashboard)
   - Dataset name (usually "production")
   - API token (for write operations)

3. **Configure Environment Variables:**
   ```bash
   # Copy the example file
   cp .env.local.example .env.local
   
   # Edit .env.local with your credentials
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_token
   ```

### **Step 2: Install Sanity CLI & Initialize Studio**

```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Login to Sanity
sanity login

# Initialize Sanity Studio in a separate directory
cd ..
sanity init

# Follow prompts:
# - Select existing project (use your Project ID)
# - Choose dataset: production
# - Output path: ./auracasa-studio
# - Select project template: Clean project with no predefined schemas
```

### **Step 3: Configure Sanity Studio**

1. **Copy schemas to studio:**
   ```bash
   # Copy the schema file
   cp auracasa-premium/sanity/schema.ts auracasa-studio/schemas/
   ```

2. **Update studio configuration:**
   ```typescript
   // auracasa-studio/sanity.config.ts
   import { defineConfig } from 'sanity'
   import { deskTool } from 'sanity/desk'
   import { visionTool } from '@sanity/vision'
   import { schemas } from './schemas/schema'

   export default defineConfig({
     name: 'auracasa',
     title: 'Auracasa CMS',
     projectId: 'your_project_id',
     dataset: 'production',
     plugins: [deskTool(), visionTool()],
     schema: {
       types: schemas,
     },
   })
   ```

3. **Customize studio appearance:**
   ```typescript
   // Add to sanity.config.ts
   theme: {
     colors: {
       primary: '#2d7dd2', // Sky Blue
       secondary: '#bf896c', // Desert Clay
     },
   },
   ```

### **Step 4: Deploy Sanity Studio**

```bash
cd auracasa-studio
sanity deploy

# Choose a studio hostname (e.g., auracasa)
# Studio will be available at: https://auracasa.sanity.studio
```

### **Step 5: Add Sample Content**

1. Open your deployed studio
2. Create sample content:
   - **Author**: Add yourself as an author
   - **Products**: Add 5-10 affiliate products
   - **Projects**: Add 3-5 projects with images
   - **Journal Posts**: Add 2-3 blog posts

### **Step 6: Update Next.js Pages to Use Sanity**

**Example: Update Homepage**
```typescript
// auracasa-premium/app/page.tsx
import { getFeaturedProjects } from '@/lib/sanity.queries';
import { getImageUrl } from '@/lib/sanity.client';

export default async function Home() {
  const projects = await getFeaturedProjects(3);
  
  return (
    <div>
      {projects.map((project) => (
        <div key={project._id}>
          <img 
            src={getImageUrl(project.heroImage, 800, 600)} 
            alt={project.title} 
          />
          <h2>{project.title}</h2>
        </div>
      ))}
    </div>
  );
}
```

### **Step 7: Enable ISR (Incremental Static Regeneration)**

```typescript
// Add to page components
export const revalidate = 60; // Revalidate every 60 seconds
```

### **Step 8: Set Up Webhooks (Optional)**

1. In Sanity dashboard, go to API → Webhooks
2. Create webhook for content updates
3. Point to: `https://your-domain.com/api/revalidate`
4. Create API route to handle revalidation

---

## 📊 Schema Overview

### **Content Relationships**

```
Project
├── affiliateProducts[] → Product
└── (referenced by) JournalPost.relatedProjects[]

JournalPost
├── author → Author
├── relatedProjects[] → Project
└── affiliateProducts[] → Product

Product
├── (referenced by) Project.affiliateProducts[]
└── (referenced by) JournalPost.affiliateProducts[]

Author
└── (referenced by) JournalPost.author
```

---

## 🎯 Benefits of This Setup

### **For Content Editors:**
- ✅ User-friendly interface
- ✅ Real-time preview
- ✅ Image management with CDN
- ✅ Version history
- ✅ Collaborative editing

### **For Developers:**
- ✅ Type-safe queries
- ✅ Flexible schema
- ✅ Fast CDN delivery
- ✅ Incremental Static Regeneration
- ✅ Easy content relationships

### **For Performance:**
- ✅ Optimized images
- ✅ CDN caching
- ✅ Efficient queries
- ✅ Static generation with ISR

---

## 📝 Usage Examples

### **Fetch and Display Projects**
```typescript
import { getAllProjects } from '@/lib/sanity.queries';
import { getImageUrl } from '@/lib/sanity.client';

const projects = await getAllProjects();

projects.map(project => (
  <ProjectCard
    title={project.title}
    image={getImageUrl(project.heroImage, 600, 400)}
    category={project.category}
    slug={project.slug.current}
  />
))
```

### **Search Functionality**
```typescript
import { searchProjects } from '@/lib/sanity.queries';

const results = await searchProjects('modern minimalist');
```

### **Affiliate Products**
```typescript
import { getFeaturedProducts } from '@/lib/sanity.queries';

const products = await getFeaturedProducts(6);

products.map(product => (
  <ProductCard
    name={product.name}
    brand={product.brand}
    price={product.price}
    image={getImageUrl(product.image, 400, 400)}
    affiliateLink={product.affiliateLink}
  />
))
```

---

## 🔒 Security Notes

1. **API Tokens:**
   - Never commit `.env.local` to git
   - Use read-only tokens for public queries
   - Use write tokens only in secure API routes

2. **CORS Configuration:**
   - Configure allowed origins in Sanity dashboard
   - Restrict to your production domain

3. **Content Validation:**
   - All schemas include validation rules
   - Required fields enforced
   - URL and email validation

---

## 📚 Resources

- **Sanity Documentation**: https://www.sanity.io/docs
- **GROQ Query Language**: https://www.sanity.io/docs/groq
- **Next.js Integration**: https://www.sanity.io/plugins/next-sanity
- **Image URLs**: https://www.sanity.io/docs/image-url

---

## ✅ Checklist

- [x] Install Sanity packages
- [x] Create client configuration
- [x] Define content schemas
- [x] Write GROQ queries
- [x] Add TypeScript interfaces
- [x] Create environment template
- [ ] Create Sanity project (manual)
- [ ] Deploy Sanity Studio (manual)
- [ ] Add sample content (manual)
- [ ] Update Next.js pages to fetch from Sanity
- [ ] Test all queries
- [ ] Set up webhooks for revalidation

---

**Status**: Setup files created ✅  
**Next**: Manual Sanity project creation and studio deployment  
**Time to Complete**: ~30 minutes for manual steps
