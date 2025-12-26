# Sanity CMS Setup Guide for Auracasa

## Quick Start (5 Steps)

### Step 1: Create `.env.local` File

Create a file named `.env.local` in the `auracasa-premium` directory with your Sanity credentials:

```bash
# Copy from your Sanity dashboard
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_write_token_here
```

**Where to find these:**
1. Go to https://www.sanity.io/manage
2. Select your project
3. **Project ID**: Found in project settings
4. **Dataset**: Usually "production" (default)
5. **API Token**: Go to API → Tokens → Add API token
   - Name it "Development Token"
   - Set permissions to "Editor" (for write access)
   - Copy the token immediately (you won't see it again!)

### Step 2: Install ts-node (if not installed)

```bash
npm install -D ts-node @types/node
```

### Step 3: Run the Seed Script

```bash
cd auracasa-premium
npx ts-node scripts/seed-sanity.ts
```

This will create:
- ✅ 1 author (Auracasa Team)
- ✅ 6 products (furniture, lighting, decor, textiles)
- ✅ 5 projects (Sunset Loft, Desert Atelier, Concrete Poem, etc.)
- ✅ 3 journal posts (with SEO metadata)

### Step 4: Add Images in Sanity Studio

1. Open your Sanity Studio: `https://your-project.sanity.studio`
2. Go to each content type (Projects, Products, Journal Posts)
3. Upload images from `auracasa-premium/public/` folder:
   - `hero-1.jpg` → Sunset Loft
   - `hero-2.jpg` → Desert Atelier
   - `hero-3.jpg` → Concrete Poem
4. Add product images (you can use placeholder images or real product photos)

### Step 5: Verify Content

1. In Sanity Studio, check that all content is created
2. Make sure images are uploaded
3. Verify that relationships are working (projects → products, posts → projects)

---

## Alternative: Manual Content Creation

If you prefer to add content manually through the Sanity Studio interface:

### 1. Create an Author
- Go to "Author" in Sanity Studio
- Click "Create new"
- Fill in: Name, Slug, Bio
- Publish

### 2. Create Products
- Go to "Product"
- Create 5-6 products with:
  - Name, Brand, Price
  - Affiliate Link (use example.com for now)
  - Category (furniture, lighting, decor, textiles)
  - Upload product image
  - Mark some as "Featured"

### 3. Create Projects
- Go to "Project"
- Create 3-5 projects with:
  - Title, Slug
  - Category (AI Generated, Real, or Hybrid)
  - Upload Hero Image
  - Add Gallery Images (optional)
  - Write Description
  - Add Style Tags
  - Link Affiliate Products
  - Mark as "Featured" if desired

### 4. Create Journal Posts
- Go to "Journal Post"
- Create 2-3 posts with:
  - Title, Slug
  - Select Author
  - Upload Hero Image
  - Write Excerpt and Body
  - Add Categories
  - Link Related Projects
  - Link Affiliate Products
  - Fill in SEO metadata

---

## Troubleshooting

### Error: "Client is not configured"
- Make sure `.env.local` exists with correct credentials
- Restart your development server after creating `.env.local`

### Error: "Unauthorized" or "Permission denied"
- Check that your API token has "Editor" permissions
- Verify the token is correctly copied (no extra spaces)

### Error: "Dataset not found"
- Make sure the dataset name matches (usually "production")
- Check in Sanity dashboard under Datasets

### Seed script fails
- Ensure you have write permissions (Editor token)
- Check that all required fields are filled
- Look at the error message for specific field issues

---

## Next Steps After Setup

Once content is in Sanity, you can:

1. **Update Next.js pages** to fetch from Sanity (instead of hardcoded data)
2. **Test queries** in Sanity Vision tool
3. **Add more content** through the Studio interface
4. **Set up webhooks** for automatic revalidation
5. **Configure ISR** (Incremental Static Regeneration) in Next.js

---

## Useful Commands

```bash
# Run seed script
npx ts-node scripts/seed-sanity.ts

# Start Next.js dev server
npm run dev

# Build Next.js for production
npm run build

# Deploy Sanity Studio (if you have a studio folder)
cd ../auracasa-studio
sanity deploy
```

---

## Resources

- **Sanity Dashboard**: https://www.sanity.io/manage
- **Sanity Documentation**: https://www.sanity.io/docs
- **GROQ Query Language**: https://www.sanity.io/docs/groq
- **Vision Tool** (test queries): Available in your Sanity Studio

---

## Content Structure

```
Author
└── Journal Posts (author reference)

Product
├── Projects (affiliateProducts reference)
└── Journal Posts (affiliateProducts reference)

Project
├── Affiliate Products (references)
└── Journal Posts (relatedProjects reference)

Journal Post
├── Author (reference)
├── Related Projects (references)
└── Affiliate Products (references)
```

---

## Tips

1. **Images**: Use high-quality images (1200x800px minimum)
2. **SEO**: Fill in meta titles and descriptions for all journal posts
3. **Slugs**: Keep them URL-friendly (lowercase, hyphens)
4. **Featured**: Mark 2-3 projects and products as featured for homepage
5. **Affiliate Links**: Update with real affiliate links when ready

---

**Need Help?** Check the main documentation in `PHASE_2.1_SANITY_SETUP.md`
