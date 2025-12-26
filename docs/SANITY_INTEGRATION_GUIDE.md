# Sanity Integration Implementation Guide

## ✅ Completed Steps

### 1. Sanity Studio Schema Configuration
- ✅ Updated `auracasa/schemaTypes/index.ts` to import all schemas
- ✅ Schemas now available in Sanity Studio

### 2. Homepage Integration
- ✅ Updated `app/page.tsx` to fetch from Sanity
- ✅ Added ISR with 60-second revalidation
- ✅ Mapped Sanity data to ProjectCard component
- ✅ Dynamic image URLs from Sanity CDN

---

## 🔄 Remaining Pages to Update

### Portfolio Page (`app/portfolio/page.tsx`)

**Current State:** Uses hardcoded data with client-side filtering

**Required Changes:**
```typescript
// Add at top
import { getAllProjects } from "@/lib/sanity.queries";
import { getImageUrl } from "@/lib/sanity.client";

// Add ISR
export const revalidate = 60;

// Change to async component
export default async function Portfolio() {
  // Fetch all projects from Sanity
  const sanityProjects = await getAllProjects();
  
  // Transform Sanity data to match existing structure
  const projects = sanityProjects.map(project => ({
    slug: project.slug.current,
    title: project.title,
    src: project.heroImage ? getImageUrl(project.heroImage, 800, 600) : '/hero-1.jpg',
    tag: `${project.category} • ${project.style?.[0] || 'Design'}`,
    description: project.description?.[0]?.children?.[0]?.text || '',
    type: project.category,
    style: project.style?.[0]?.toLowerCase().replace(' ', '-') || 'minimalist',
    room: 'living', // Add room field to Sanity schema if needed
    colorPalette: project.colorPalette?.[0] || 'monochrome',
    popularity: Math.floor(Math.random() * 5000) + 1000,
    date: project.publishedAt,
  }));
  
  // Rest of component stays the same (client-side filtering works on fetched data)
  // ...
}
```

**Note:** Portfolio page uses "use client" for filtering. You'll need to:
1. Create a separate client component for the filtering UI
2. Pass fetched data as props
3. Keep filtering logic on client side

---

### Project Detail Page (`app/project/[slug]/page.tsx`)

**Current State:** Uses hardcoded project data

**Required Changes:**
```typescript
import { getProjectBySlug } from "@/lib/sanity.queries";
import { getImageUrl } from "@/lib/sanity.client";
import { notFound } from "next/navigation";

export const revalidate = 60;

// Generate static params for all projects
export async function generateStaticParams() {
  const { getAllProjects } = await import("@/lib/sanity.queries");
  const projects = await getAllProjects();
  
  return projects.map((project) => ({
    slug: project.slug.current,
  }));
}

export default async function Project({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  
  if (!project) {
    return notFound();
  }

  const imageUrl = project.heroImage ? getImageUrl(project.heroImage, 1400, 900) : '/hero-1.jpg';
  const galleryImages = project.gallery?.map(img => getImageUrl(img, 1200, 800)) || [];
  
  return (
    // Use project data from Sanity
    // project.title, project.description, project.affiliateProducts, etc.
  );
}
```

---

### Journal Listing Page (`app/journal/page.tsx`)

**Current State:** Uses hardcoded posts array

**Required Changes:**
```typescript
import { getAllJournalPosts } from "@/lib/sanity.queries";

export const revalidate = 60;

export default async function Journal() {
  const posts = await getAllJournalPosts();
  
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-semibold">Journal</h1>
      <ul className="mt-6 space-y-4">
        {posts.map((post) => (
          <li key={post._id} className="card p-4">
            <div className="text-sm text-neutral-500">
              {new Date(post.publishedAt).toLocaleDateString()}
            </div>
            <Link href={`/journal/${post.slug.current}`} className="text-lg font-medium">
              {post.title}
            </Link>
            {post.excerpt && (
              <p className="text-sm text-neutral-600 mt-2">{post.excerpt}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

### Journal Post Detail Page (`app/journal/[slug]/page.tsx`)

**Current State:** Uses hardcoded post data

**Required Changes:**
```typescript
import { getJournalPostBySlug, getAllJournalPosts } from "@/lib/sanity.queries";
import { getImageUrl } from "@/lib/sanity.client";
import { PortableText } from '@portabletext/react';
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getAllJournalPosts();
  
  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getJournalPostBySlug(params.slug);
  
  if (!post) {
    return notFound();
  }

  const heroImageUrl = post.heroImage ? getImageUrl(post.heroImage, 1400, 700) : null;
  
  return (
    <div className="container py-12">
      {heroImageUrl && (
        <Image src={heroImageUrl} alt={post.title} width={1400} height={700} />
      )}
      <h1 className="text-3xl font-semibold mt-6">{post.title}</h1>
      <div className="text-sm text-neutral-500 mt-2">
        By {post.author.name} • {new Date(post.publishedAt).toLocaleDateString()}
      </div>
      <div className="prose mt-6">
        <PortableText value={post.body} />
      </div>
      
      {/* Related Projects */}
      {post.relatedProjects && post.relatedProjects.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Related Projects</h2>
          {/* Display related projects */}
        </div>
      )}
      
      {/* Affiliate Products */}
      {post.affiliateProducts && post.affiliateProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Shop This Look</h2>
          {/* Display affiliate products */}
        </div>
      )}
    </div>
  );
}
```

**Note:** You'll need to install `@portabletext/react` for rendering rich text:
```bash
npm install @portabletext/react
```

---

## 📦 Required Package

For rendering Portable Text (rich text from Sanity):
```bash
cd auracasa-premium
npm install @portabletext/react
```

---

## 🎨 Image Optimization

All images from Sanity are automatically optimized through the CDN. The `getImageUrl` helper function handles:
- Automatic format conversion (WebP)
- Responsive sizing
- Quality optimization
- Hotspot/crop support

Example usage:
```typescript
const imageUrl = getImageUrl(project.heroImage, 800, 600);
// Returns: https://cdn.sanity.io/images/[project-id]/[dataset]/[image-id]-800x600.webp?fit=crop&auto=format
```

---

## 🔄 ISR (Incremental Static Regeneration)

All pages now use ISR with 60-second revalidation:
```typescript
export const revalidate = 60;
```

This means:
- Pages are statically generated at build time
- After 60 seconds, the next request triggers a background regeneration
- Users always see fast, cached pages
- Content updates appear within 60 seconds

---

## 🪝 Webhooks (Optional - Phase 2.3)

For instant revalidation when content changes in Sanity:

1. **Create webhook in Sanity Dashboard:**
   - Go to API → Webhooks
   - Add webhook URL: `https://your-domain.com/api/revalidate`
   - Select triggers: Create, Update, Delete

2. **Create API route** (`app/api/revalidate/route.ts`):
```typescript
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  
  // Validate secret token
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    // Revalidate based on document type
    if (body._type === 'project') {
      revalidatePath('/portfolio');
      revalidatePath(`/project/${body.slug.current}`);
    } else if (body._type === 'journalPost') {
      revalidatePath('/journal');
      revalidatePath(`/journal/${body.slug.current}`);
    }
    
    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
```

3. **Add secret to `.env.local`:**
```bash
REVALIDATE_SECRET=your-random-secret-here
```

---

## ✅ Testing Checklist

After implementing Sanity integration:

### Homepage
- [ ] Featured projects load from Sanity
- [ ] Images display correctly from CDN
- [ ] Project cards link to correct slugs
- [ ] ISR works (content updates after 60s)

### Portfolio Page
- [ ] All projects load from Sanity
- [ ] Filtering works with Sanity data
- [ ] Sorting works correctly
- [ ] View modes (grid/list/masonry) work
- [ ] Images load from CDN

### Project Detail Pages
- [ ] Individual projects load correctly
- [ ] Hero image displays
- [ ] Gallery images work
- [ ] Affiliate products display
- [ ] 404 page shows for invalid slugs

### Journal Pages
- [ ] All posts list correctly
- [ ] Post dates format properly
- [ ] Excerpts display

### Journal Post Detail
- [ ] Rich text renders correctly
- [ ] Images in content display
- [ ] Author information shows
- [ ] Related projects link correctly
- [ ] Affiliate products display

---

## 🐛 Common Issues & Solutions

### Issue: "Client is not configured"
**Solution:** Ensure `.env.local` exists with correct Sanity credentials

### Issue: Images not loading
**Solution:** Check that `NEXT_PUBLIC_SANITY_PROJECT_ID` is set correctly

### Issue: "Cannot read properties of undefined"
**Solution:** Add optional chaining (`?.`) when accessing Sanity data

### Issue: Build fails with "fetch is not defined"
**Solution:** Ensure you're using Next.js 13+ with App Router

### Issue: Filtering doesn't work on portfolio page
**Solution:** Portfolio page needs to be split into server component (data fetching) and client component (filtering UI)

---

## 📝 Summary

**Completed:**
- ✅ Sanity Studio schemas configured
- ✅ Homepage integrated with Sanity
- ✅ ISR enabled on homepage

**Next Steps:**
1. Update portfolio page (split into server/client components)
2. Update project detail pages
3. Update journal listing page
4. Update journal post detail pages
5. Install `@portabletext/react` for rich text
6. Test all pages thoroughly
7. (Optional) Set up webhooks for instant revalidation

**Estimated Time:** 2-3 hours for all remaining pages
