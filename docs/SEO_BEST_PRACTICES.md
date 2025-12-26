# SEO Best Practices for Auracasa

Quick reference guide for maintaining and improving SEO performance.

---

## 📝 Content Guidelines

### Title Tags
- **Length**: 50-60 characters
- **Format**: `Primary Keyword — Brand Name`
- **Example**: `Modern Kitchen Design — Auracasa`
- ✅ Include primary keyword
- ✅ Make it compelling and clickable
- ❌ Don't keyword stuff
- ❌ Don't duplicate across pages

### Meta Descriptions
- **Length**: 150-160 characters
- **Purpose**: Encourage clicks from search results
- ✅ Include call-to-action
- ✅ Mention key benefits
- ✅ Include target keyword naturally
- ❌ Don't duplicate across pages
- ❌ Don't just repeat the title

### Headings (H1-H6)
- **H1**: One per page, main topic
- **H2-H6**: Logical hierarchy
- ✅ Include keywords naturally
- ✅ Make them descriptive
- ❌ Don't skip levels (H1 → H3)
- ❌ Don't use for styling only

---

## 🖼️ Image Optimization

### File Names
- ✅ `modern-kitchen-design.jpg`
- ❌ `IMG_1234.jpg`
- Use descriptive, keyword-rich names
- Use hyphens, not underscores

### Alt Text
- **Purpose**: Accessibility + SEO
- ✅ Describe the image content
- ✅ Include keywords when relevant
- ❌ Don't keyword stuff
- ❌ Don't use "image of" or "picture of"

### Image Size
- **Hero images**: Max 1920px wide
- **Thumbnails**: 600-800px wide
- **File size**: Under 200KB when possible
- Use WebP format when supported
- Lazy load below-the-fold images

---

## 🔗 Internal Linking

### Best Practices
- Link to related content
- Use descriptive anchor text
- ✅ "View our modern kitchen designs"
- ❌ "Click here"
- Link from high-authority pages to new content
- Maintain a logical site structure

### Anchor Text Guidelines
- Use natural, descriptive text
- Include keywords when relevant
- Vary anchor text (don't repeat)
- Make it clear where the link goes

---

## 📊 Structured Data (JSON-LD)

### When to Use

**Organization Schema** (Homepage)
```json
{
  "@type": "Organization",
  "name": "Auracasa",
  "url": "https://auracasa.com"
}
```

**Article Schema** (Blog Posts)
```json
{
  "@type": "Article",
  "headline": "Post Title",
  "datePublished": "2025-01-01"
}
```

**Product Schema** (Affiliate Products)
```json
{
  "@type": "Product",
  "name": "Product Name",
  "offers": {
    "@type": "Offer",
    "price": "99.99"
  }
}
```

**Breadcrumb Schema** (All Pages)
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [...]
}
```

---

## 🚀 Performance Optimization

### Core Web Vitals

**LCP (Largest Contentful Paint)**
- Target: < 2.5 seconds
- Optimize hero images
- Use CDN for images
- Implement lazy loading

**FID (First Input Delay)**
- Target: < 100 milliseconds
- Minimize JavaScript
- Use code splitting
- Defer non-critical JS

**CLS (Cumulative Layout Shift)**
- Target: < 0.1
- Set image dimensions
- Reserve space for ads
- Avoid inserting content above existing content

### Page Speed Tips
- ✅ Use next/image for automatic optimization
- ✅ Enable ISR for faster page loads
- ✅ Minimize CSS and JavaScript
- ✅ Use CDN for static assets
- ✅ Enable compression (gzip/brotli)
- ✅ Implement caching strategies

---

## 📱 Mobile Optimization

### Mobile-First Design
- Responsive design (not separate mobile site)
- Touch-friendly buttons (min 44x44px)
- Readable font sizes (min 16px)
- Avoid horizontal scrolling
- Fast mobile page speed

### Mobile SEO Checklist
- [ ] Responsive design
- [ ] Fast loading on 3G
- [ ] No intrusive interstitials
- [ ] Readable without zooming
- [ ] Touch elements properly spaced

---

## 🔍 Keyword Research

### Finding Keywords
1. **Google Search Console** - See what you rank for
2. **Google Autocomplete** - See what people search
3. **Related Searches** - Bottom of Google results
4. **Competitor Analysis** - What do competitors rank for?

### Keyword Types

**Primary Keywords** (High volume, competitive)
- "interior design"
- "modern furniture"
- "home decor"

**Long-tail Keywords** (Lower volume, less competitive)
- "minimalist kitchen design ideas"
- "affordable modern furniture for small spaces"
- "AI-generated interior design concepts"

### Keyword Placement
- ✅ Title tag
- ✅ Meta description
- ✅ H1 heading
- ✅ First paragraph
- ✅ Image alt text
- ✅ URL slug
- ❌ Don't overuse (keyword stuffing)

---

## 📈 Content Strategy

### Content Types for SEO

**Evergreen Content** (Always relevant)
- Design guides
- How-to articles
- Best practices
- Glossaries

**Trending Content** (Time-sensitive)
- Design trends 2025
- New product launches
- Seasonal content

**Cornerstone Content** (Comprehensive guides)
- Ultimate guide to interior design
- Complete furniture buying guide
- Design style encyclopedia

### Content Optimization
- **Length**: 1500+ words for cornerstone content
- **Freshness**: Update regularly
- **Uniqueness**: 100% original content
- **Value**: Answer user questions
- **Readability**: Short paragraphs, bullet points

---

## 🔗 Link Building

### Internal Links
- Link to related content
- Use descriptive anchor text
- Create content hubs
- Update old posts with new links

### External Links
- Link to authoritative sources
- Use rel="nofollow" for affiliate links
- Open external links in new tab
- Check for broken links regularly

### Backlinks (Inbound Links)
- Create shareable content
- Guest posting
- Influencer partnerships
- Social media promotion
- PR and media outreach

---

## 🛠️ Technical SEO Checklist

### Site Structure
- [ ] Clean URL structure
- [ ] Logical navigation
- [ ] XML sitemap
- [ ] robots.txt
- [ ] 404 error page
- [ ] 301 redirects for moved content

### Security
- [ ] HTTPS enabled
- [ ] SSL certificate valid
- [ ] Secure forms
- [ ] Regular security updates

### Crawlability
- [ ] No orphan pages
- [ ] No broken links
- [ ] Proper use of noindex/nofollow
- [ ] Canonical tags for duplicate content

---

## 📊 Monitoring & Analytics

### Tools to Use

**Google Search Console**
- Monitor search performance
- Check indexing status
- Fix crawl errors
- Submit sitemaps

**Google Analytics 4**
- Track traffic sources
- Monitor user behavior
- Measure conversions
- Identify popular content

**PageSpeed Insights**
- Test page speed
- Get optimization suggestions
- Monitor Core Web Vitals

### Key Metrics to Track
- **Organic traffic** - Visitors from search
- **Rankings** - Position in search results
- **Click-through rate** - % who click from search
- **Bounce rate** - % who leave immediately
- **Time on page** - Engagement metric
- **Conversions** - Affiliate clicks, signups

---

## ✅ Monthly SEO Checklist

### Content
- [ ] Publish new content (2-4 posts)
- [ ] Update old content
- [ ] Fix broken links
- [ ] Add internal links to new content

### Technical
- [ ] Check site speed
- [ ] Review Search Console errors
- [ ] Update sitemap
- [ ] Check mobile usability

### Analysis
- [ ] Review traffic trends
- [ ] Analyze top-performing content
- [ ] Check keyword rankings
- [ ] Review competitor activity

### Optimization
- [ ] Optimize underperforming pages
- [ ] Add missing meta descriptions
- [ ] Improve page speed
- [ ] Fix technical issues

---

## 🚫 Common SEO Mistakes to Avoid

### Content Mistakes
- ❌ Duplicate content
- ❌ Thin content (< 300 words)
- ❌ Keyword stuffing
- ❌ Hidden text
- ❌ Copied content

### Technical Mistakes
- ❌ Slow page speed
- ❌ Not mobile-friendly
- ❌ Broken links
- ❌ Missing alt text
- ❌ No HTTPS

### Link Mistakes
- ❌ Buying links
- ❌ Link schemes
- ❌ Too many outbound links
- ❌ Broken internal links
- ❌ No internal linking strategy

---

## 📚 Resources

### Official Documentation
- [Google Search Central](https://developers.google.com/search)
- [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmasters-guidelines-30fba23a)
- [Schema.org](https://schema.org/)

### Tools
- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Screaming Frog](https://www.screamingfrog.co.uk/seo-spider/)

### Learning
- [Moz Beginner's Guide to SEO](https://moz.com/beginners-guide-to-seo)
- [Ahrefs Blog](https://ahrefs.com/blog/)
- [Search Engine Journal](https://www.searchenginejournal.com/)

---

**Remember**: SEO is a long-term strategy. Focus on creating valuable content for users, and rankings will follow.
