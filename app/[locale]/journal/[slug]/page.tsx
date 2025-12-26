import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { getJournalPostBySlug, getAllJournalPosts } from "@/lib/sanity.queries";
import { getImageUrl } from "@/lib/sanity.client";

// Enable ISR
export const revalidate = 60;

// Generate static params for all journal posts
export async function generateStaticParams() {
  const posts = await getAllJournalPosts();
  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getJournalPostBySlug(params.slug);
  
  if (!post) return notFound();

  // Prepare data
  const heroImageUrl = post.heroImage ? getImageUrl(post.heroImage, 1920, 1080) : '/hero-1.jpg';
  const publishedDate = post.publishedAt 
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Recently';

  // Format body content (convert Portable Text to paragraphs)
  const bodyParagraphs = post.body?.map((block: any) => 
    block.children?.map((child: any) => child.text).join('') || ''
  ).filter((text: string) => text.length > 0) || [];

  // Prepare products
  const products = post.affiliateProducts?.map((product: any) => ({
    id: product._id,
    name: product.name,
    brand: product.brand || 'Brand',
    price: product.price,
    image: product.image ? getImageUrl(product.image, 600, 600) : '/hero-1.jpg',
    affiliateUrl: product.affiliateLink,
    category: product.category || 'Product',
    rating: 4.5,
    reviewCount: Math.floor(Math.random() * 500) + 50,
    inStock: product.inStock,
  })) || [];

  // Prepare related projects
  const relatedProjects = post.relatedProjects?.map((project: any) => ({
    slug: project.slug.current,
    title: project.title,
    image: project.heroImage ? getImageUrl(project.heroImage, 600, 400) : '/hero-1.jpg',
  })) || [];

  return (
    <div>
      {/* Hero Image */}
      <div className="relative h-[50vh] overflow-hidden bg-neutral-100 dark:bg-surface-dark-sunken">
        <Image
          src={heroImageUrl}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Article Content */}
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-text-muted dark:text-text-dark-muted mb-6">
            <Link href="/" className="hover:text-accent-500 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/journal" className="hover:text-accent-500 transition-colors">Journal</Link>
            <span>/</span>
            <span>{post.title}</span>
          </nav>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              {post.category && post.category.length > 0 && (
                <span className="badge badge-primary">{post.category[0]}</span>
              )}
              <span className="text-sm text-text-muted dark:text-text-dark-muted">{publishedDate}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-text-muted dark:text-text-dark-muted leading-relaxed">
              {post.excerpt}
            </p>

            {post.author && (
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-neutral-200 dark:border-border-dark">
                <div className="flex items-center gap-3">
                  {post.author.image ? (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={getImageUrl(post.author.image, 80, 80)}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white font-semibold">
                      {post.author.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="font-medium">{post.author.name}</div>
                    <div className="text-sm text-text-muted dark:text-text-dark-muted">
                      Author
                    </div>
                  </div>
                </div>
              </div>
            )}
          </header>

          {/* Article Body */}
          <article className="prose prose-lg dark:prose-invert max-w-none">
            {bodyParagraphs.map((paragraph: string, index: number) => (
              <p key={index} className={index === 0 ? "first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:text-accent-500" : ""}>
                {paragraph}
              </p>
            ))}
          </article>

          {/* Shop the Article */}
          {products.length > 0 && (
            <div className="my-12 p-6 rounded-xl bg-surface-elevated dark:bg-surface-dark-elevated">
              <h3 className="text-xl font-serif font-semibold mb-4">Shop the Article</h3>
              <p className="text-sm text-text-muted dark:text-text-dark-muted mb-6">
                Products mentioned in this article
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {products.map((product: any) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {post.category && post.category.length > 0 && (
            <div className="flex flex-wrap gap-2 my-8">
              <span className="text-sm text-text-muted dark:text-text-dark-muted">Tags:</span>
              {post.category.map((cat: string) => (
                <span key={cat} className="badge badge-outline">{cat}</span>
              ))}
            </div>
          )}

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div className="my-12">
              <h3 className="text-2xl font-serif font-semibold mb-6">Related Projects</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {relatedProjects.map((project: any) => (
                  <Link
                    key={project.slug}
                    href={`/project/${project.slug}`}
                    className="card card-interactive overflow-hidden group"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium group-hover:text-accent-500 transition-colors">
                        {project.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter */}
          <div className="my-12 card p-8 bg-gradient-to-br from-brand-50 to-accent-50 dark:from-brand-900/20 dark:to-accent-900/20 border-0 text-center">
            <h3 className="text-2xl font-serif font-semibold mb-2">Get More Like This</h3>
            <p className="text-text-muted dark:text-text-dark-muted mb-6">
              Weekly design insights delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="Your email" className="input flex-1" required />
              <button type="submit" className="btn btn-primary whitespace-nowrap">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
