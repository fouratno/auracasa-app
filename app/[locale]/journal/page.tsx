import Link from "next/link";
import Image from "next/image";
import { getAllJournalPosts } from "@/lib/sanity.queries";
import { getImageUrl } from "@/lib/sanity.client";

// Enable ISR
export const revalidate = 60;

export default async function Journal() {
  // Fetch all journal posts from Sanity
  const posts = await getAllJournalPosts();

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4">Journal</h1>
        <p className="text-lg text-text-muted dark:text-text-dark-muted">
          Thoughts on design, color, materiality, and the space between imagination and reality.
          A collection of essays exploring how we create conceptual interiors.
        </p>
      </div>

      {/* Results Count */}
      <div className="mb-6 text-sm text-text-muted dark:text-text-dark-muted">
        {posts.length} {posts.length === 1 ? 'article' : 'articles'}
      </div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => {
            const imageUrl = post.heroImage ? getImageUrl(post.heroImage, 800, 600) : '/hero-1.jpg';
            const publishedDate = post.publishedAt 
              ? new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
              : 'Recently';
            
            return (
              <Link
                key={post._id}
                href={`/journal/${post.slug.current}`}
                className="card card-interactive overflow-hidden group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100 dark:bg-surface-dark-sunken">
                  <Image
                    src={imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-text-muted dark:text-text-dark-muted mb-3">
                    {post.category && post.category.length > 0 && (
                      <>
                        <span className="badge badge-outline text-xs">{post.category[0]}</span>
                        <span>•</span>
                      </>
                    )}
                    <span>{publishedDate}</span>
                  </div>
                  <h3 className="text-xl font-serif font-semibold mb-2 group-hover:text-accent-500 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-text-muted dark:text-text-dark-muted line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-accent-500 font-medium">Read more</span>
                    {post.author && (
                      <span className="text-text-muted dark:text-text-dark-muted text-xs">
                        By {post.author.name}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <svg className="w-16 h-16 mx-auto text-text-muted dark:text-text-dark-muted mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-semibold mb-2">No articles yet</h3>
          <p className="text-text-muted dark:text-text-dark-muted mb-6">
            Journal articles will appear here once they are published in Sanity CMS
          </p>
        </div>
      )}
    </div>
  );
}
