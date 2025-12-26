import { Metadata } from 'next';

// Base URL for the site
export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auracasa.com';

// Default metadata
export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Auracasa — Imaginary Interiors, Made Real',
    template: '%s | Auracasa',
  },
  description:
    'Explore AI-generated interior design concepts blending futuristic aesthetics with warm materiality. Curated furniture and decor recommendations for your dream space.',
  keywords: [
    'interior design',
    'AI design',
    'furniture',
    'home decor',
    'minimalist interiors',
    'modern furniture',
    'interior inspiration',
    'design concepts',
    'home styling',
    'contemporary design',
  ],
  authors: [{ name: 'Auracasa Studio' }],
  creator: 'Auracasa',
  publisher: 'Auracasa',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Auracasa',
    title: 'Auracasa — Imaginary Interiors, Made Real',
    description:
      'Explore AI-generated interior design concepts blending futuristic aesthetics with warm materiality.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Auracasa - Imaginary Interiors',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auracasa — Imaginary Interiors, Made Real',
    description:
      'Explore AI-generated interior design concepts blending futuristic aesthetics with warm materiality.',
    images: ['/twitter-image.jpg'],
    creator: '@auracasa',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

// Generate metadata for project pages
export function generateProjectMetadata(project: {
  title: string;
  description?: string;
  heroImage?: string;
  slug: string;
}): Metadata {
  const title = `${project.title} — Interior Design Concept`;
  const description =
    project.description ||
    `Explore the ${project.title} interior design concept. AI-generated spaces with curated furniture and decor recommendations.`;
  const url = `${BASE_URL}/project/${project.slug}`;
  const imageUrl = project.heroImage || `${BASE_URL}/og-image.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}

// Generate metadata for journal posts
export function generateJournalMetadata(post: {
  title: string;
  excerpt?: string;
  heroImage?: string;
  slug: string;
  publishedAt?: string;
  author?: { name: string };
}): Metadata {
  const title = post.title;
  const description =
    post.excerpt ||
    'Insights on interior design, color theory, and the intersection of AI and human creativity.';
  const url = `${BASE_URL}/journal/${post.slug}`;
  const imageUrl = post.heroImage || `${BASE_URL}/og-image.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author.name] : undefined,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}

// Generate JSON-LD structured data for Organization
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Auracasa',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description:
      'AI-generated interior design concepts with curated furniture and decor recommendations.',
    sameAs: [
      'https://instagram.com/auracasa',
      'https://pinterest.com/auracasa',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'hello@auracasa.com',
    },
  };
}

// Generate JSON-LD structured data for Article
export function generateArticleSchema(article: {
  title: string;
  description: string;
  publishedAt: string;
  modifiedAt?: string;
  author: { name: string; image?: string };
  image: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt || article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
      image: article.author.image,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Auracasa',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
  };
}

// Generate JSON-LD structured data for Product
export function generateProductSchema(product: {
  name: string;
  description?: string;
  image: string;
  price: number;
  currency?: string;
  brand?: string;
  url: string;
  inStock: boolean;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: product.brand
      ? {
          '@type': 'Brand',
          name: product.brand,
        }
      : undefined,
    offers: {
      '@type': 'Offer',
      url: product.url,
      priceCurrency: product.currency || 'USD',
      price: product.price,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
  };
}

// Generate JSON-LD structured data for BreadcrumbList
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Generate JSON-LD structured data for WebSite (for search box)
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Auracasa',
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
