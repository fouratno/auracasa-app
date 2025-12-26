import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ImageGallery from "@/components/ImageGallery";
import ProductCard from "@/components/ProductCard";
import { getProjectBySlug, getAllProjects } from "@/lib/sanity.queries";
import { getImageUrl } from "@/lib/sanity.client";
import ProjectClientActions from "./ProjectClientActions";
import { 
  generateProjectMetadata, 
  generateBreadcrumbSchema,
  generateProductSchema,
  BASE_URL 
} from "@/lib/seo";

// Enable ISR
export const revalidate = 60;

// Generate static params for all projects
export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    slug: project.slug.current,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  let project = await getProjectBySlug(params.slug);
  
  if (!project) {
    const allProjects = await getAllProjects();
    project = allProjects.find(p => 
      p.slug.current.toLowerCase().replace(/\s+/g, '-') === params.slug.toLowerCase() ||
      p.slug.current.toLowerCase() === params.slug.toLowerCase().replace(/-/g, ' ')
    ) || null;
  }
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const description = project.description?.[0]?.children?.[0]?.text || 
    `Explore the ${project.title} interior design concept. AI-generated spaces with curated furniture and decor recommendations.`;
  
  const heroImageUrl = project.heroImage ? getImageUrl(project.heroImage, 1200, 630) : undefined;

  return generateProjectMetadata({
    title: project.title,
    description,
    heroImage: heroImageUrl,
    slug: project.slug.current,
  });
}

export default async function Project({ params }: { params: { slug: string } }) {
  // Try to fetch project with the provided slug
  let project = await getProjectBySlug(params.slug);
  
  // If not found, try to fetch all projects and find by matching slug (case-insensitive, handle spaces)
  if (!project) {
    const allProjects = await getAllProjects();
    project = allProjects.find(p => 
      p.slug.current.toLowerCase().replace(/\s+/g, '-') === params.slug.toLowerCase() ||
      p.slug.current.toLowerCase() === params.slug.toLowerCase().replace(/-/g, ' ')
    ) || null;
  }
  
  if (!project) return notFound();

  // Prepare data
  const heroImageUrl = project.heroImage ? getImageUrl(project.heroImage, 1920, 1080) : '/hero-1.jpg';
  const categoryLabel = project.category === 'ai-generated' ? 'AI' : 
                       project.category === 'hybrid' ? 'Hybrid' : 'Real';
  const styleLabel = project.style?.[0] || 'Design';
  const metaTag = `${categoryLabel} • ${styleLabel}`;
  
  // Format date
  const publishedDate = project.publishedAt 
    ? new Date(project.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Recently';

  // Prepare gallery images
  const galleryImages = project.gallery?.map((img: any, index: number) => ({
    src: getImageUrl(img.asset, 1200, 800),
    alt: img.alt || `${project.title} - Image ${index + 1}`,
    caption: img.caption || '',
  })) || [];

  // Prepare products
  const products = project.affiliateProducts?.map((product: any) => ({
    id: product._id,
    name: product.name,
    brand: product.brand || 'Brand',
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.image ? getImageUrl(product.image, 600, 600) : '/hero-1.jpg',
    affiliateUrl: product.affiliateUrl,
    category: product.category || 'Product',
    rating: 4.5,
    reviewCount: Math.floor(Math.random() * 500) + 50,
    inStock: true,
  })) || [];

  // Get description text
  const descriptionText = project.description?.[0]?.children?.[0]?.text || '';
  
  // Format body content (convert Portable Text to paragraphs)
  const bodyParagraphs = project.body?.map((block: any) => 
    block.children?.map((child: any) => child.text).join('') || ''
  ).filter((text: string) => text.length > 0) || [descriptionText];

  // Generate structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: BASE_URL },
    { name: 'Portfolio', url: `${BASE_URL}/portfolio` },
    { name: project.title, url: `${BASE_URL}/project/${project.slug.current}` },
  ]);

  // Generate product schemas for affiliate products
  const productSchemas = products.map((product: any) => 
    generateProductSchema({
      name: product.name,
      description: `${product.name} featured in ${project.title}`,
      image: product.image,
      price: product.price,
      currency: 'USD',
      brand: product.brand,
      url: product.affiliateUrl,
      inStock: product.inStock,
    })
  );

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {productSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}

      <div>
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden bg-neutral-100 dark:bg-surface-dark-sunken">
        <Image
          src={heroImageUrl}
          alt={project.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
          <div className="container">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-4 opacity-90">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <Link href="/portfolio" className="hover:underline">Portfolio</Link>
              <span>/</span>
              <span>{project.title}</span>
            </nav>

            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="badge bg-white/20 backdrop-blur-sm text-white border-white/30">
                  {project.category}
                </span>
                <span className="text-sm opacity-90">{publishedDate}</span>
                <span className="text-sm opacity-90">• 5 min read</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-serif font-semibold mb-4">
                {project.title}
              </h1>
              
              <p className="text-xl opacity-90 mb-6">
                {metaTag}
              </p>

              {/* Client-side Action Buttons */}
              <ProjectClientActions projectTitle={project.title} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Project Narrative */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {bodyParagraphs.map((paragraph: string, index: number) => (
                <p key={index} className={index === 0 ? "first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:text-accent-500" : ""}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Image Gallery */}
            {galleryImages.length > 0 && (
              <div>
                <h2 className="text-2xl font-serif font-semibold mb-6">Project Gallery</h2>
                <ImageGallery images={galleryImages} columns={2} />
              </div>
            )}

            {/* Shop This Look Section */}
            {products.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-serif font-semibold mb-2">Shop This Look</h2>
                    <p className="text-text-muted dark:text-text-dark-muted">
                      Featured products from this project
                    </p>
                  </div>
                  <div className="text-sm text-text-muted dark:text-text-dark-muted">
                    {products.length} items
                  </div>
                </div>

                {/* Affiliate Disclosure */}
                <div className="mb-6 p-4 rounded-xl bg-surface-elevated dark:bg-surface-dark-elevated border border-neutral-200 dark:border-border-dark">
                  <p className="text-sm text-text-muted dark:text-text-dark-muted">
                    <strong>Affiliate Disclosure:</strong> This section contains affiliate links. 
                    We may earn a commission if you make a purchase through these links, at no 
                    additional cost to you. This helps support our work creating conceptual design content.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product: any) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Project Metadata */}
              <div className="card p-6">
                <h3 className="font-semibold mb-4">Project Details</h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-text-muted dark:text-text-dark-muted">Category</dt>
                    <dd className="font-medium">{project.category}</dd>
                  </div>
                  <div>
                    <dt className="text-text-muted dark:text-text-dark-muted">Type</dt>
                    <dd className="font-medium">{metaTag}</dd>
                  </div>
                  <div>
                    <dt className="text-text-muted dark:text-text-dark-muted">Published</dt>
                    <dd className="font-medium">{publishedDate}</dd>
                  </div>
                  {project.style && project.style.length > 0 && (
                    <div>
                      <dt className="text-text-muted dark:text-text-dark-muted">Style</dt>
                      <dd className="font-medium">{project.style.join(', ')}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Newsletter CTA */}
              <div className="card p-6 bg-gradient-to-br from-brand-50 to-accent-50 dark:from-brand-900/20 dark:to-accent-900/20 border-0">
                <h3 className="font-semibold mb-2">Stay Inspired</h3>
                <p className="text-sm text-text-muted dark:text-text-dark-muted mb-4">
                  Get new projects and design insights delivered to your inbox.
                </p>
                <form className="space-y-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="input w-full"
                    required
                  />
                  <button type="submit" className="btn btn-primary w-full">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
