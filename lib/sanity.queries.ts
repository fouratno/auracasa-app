import { client } from './sanity.client';

// TypeScript interfaces for Sanity data
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

export interface Project {
  _id: string;
  _type: 'project';
  title: string;
  slug: {
    current: string;
  };
  category: 'ai-generated' | 'real' | 'hybrid';
  heroImage: SanityImage;
  gallery?: SanityImage[];
  description: any[]; // Portable Text
  body?: any[]; // Portable Text - full content
  style: string[];
  colorPalette?: string[];
  affiliateProducts?: Product[];
  publishedAt: string;
  featured: boolean;
}

export interface Product {
  _id: string;
  _type: 'product';
  name: string;
  slug: {
    current: string;
  };
  brand: {
    name: string;
    logo?: SanityImage;
    website?: string;
    description?: string;
  };
  pricing: {
    amount: number;
    currency: 'USD' | 'EUR' | 'GBP';
    originalPrice?: number;
    saleEndDate?: string;
  };
  affiliateLinks: {
    primary: {
      network: 'tradedoubler' | 'awin' | 'amazon' | 'direct';
      url: string;
      commission?: number;
    };
    secondary?: {
      network: string;
      url: string;
      commission?: number;
    };
  };
  images: SanityImage[];
  description: any[]; // Portable Text
  specifications?: {
    dimensions?: string;
    materials?: string[];
    colors?: string[];
    weight?: string;
    careInstructions?: string;
  };
  category: 'furniture' | 'lighting' | 'decor' | 'textiles' | 'kitchen' | 'bathroom' | 'outdoor' | 'art';
  tags?: string[];
  availability: 'in-stock' | 'pre-order' | 'out-of-stock' | 'discontinued';
  rating?: number;
  reviewCount?: number;
  featured: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface JournalPost {
  _id: string;
  _type: 'journalPost';
  title: string;
  slug: {
    current: string;
  };
  author: {
    name: string;
    image?: SanityImage;
  };
  publishedAt: string;
  heroImage: SanityImage;
  excerpt: string;
  body: any[]; // Portable Text
  category: string[];
  relatedProjects?: Project[];
  affiliateProducts?: Product[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogImage?: SanityImage;
  };
}

// GROQ Queries

// Get all projects
export async function getAllProjects(): Promise<Project[]> {
  const query = `*[_type == "project"] | order(publishedAt desc) {
    _id,
    _type,
    title,
    slug,
    category,
    heroImage,
    gallery,
    description,
    style,
    colorPalette,
    "affiliateProducts": affiliateProducts[]-> {
      _id,
      name,
      slug,
      brand,
      pricing,
      affiliateLinks,
      images,
      description,
      specifications,
      category,
      tags,
      availability,
      rating,
      reviewCount,
      featured,
      seo
    },
    publishedAt,
    featured
  }`;
  
  return await client.fetch(query);
}

// Get featured projects
export async function getFeaturedProjects(limit: number = 3): Promise<Project[]> {
  const query = `*[_type == "project" && featured == true] | order(publishedAt desc) [0...${limit}] {
    _id,
    _type,
    title,
    slug,
    category,
    heroImage,
    style,
    publishedAt,
    featured
  }`;
  
  return await client.fetch(query);
}

// Get project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    category,
    heroImage,
    gallery,
    description,
    body,
    style,
    colorPalette,
    "affiliateProducts": affiliateProducts[]-> {
      _id,
      name,
      slug,
      brand,
      pricing,
      affiliateLinks,
      images,
      description,
      specifications,
      category,
      tags,
      availability,
      rating,
      reviewCount,
      featured,
      seo
    },
    publishedAt,
    featured
  }`;
  
  return await client.fetch(query, { slug });
}

// Get all journal posts
export async function getAllJournalPosts(): Promise<JournalPost[]> {
  const query = `*[_type == "journalPost"] | order(publishedAt desc) {
    _id,
    _type,
    title,
    slug,
    "author": author-> {
      name,
      image
    },
    publishedAt,
    heroImage,
    excerpt,
    category,
    seo
  }`;
  
  return await client.fetch(query);
}

// Get journal post by slug
export async function getJournalPostBySlug(slug: string): Promise<JournalPost | null> {
  const query = `*[_type == "journalPost" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    "author": author-> {
      name,
      image
    },
    publishedAt,
    heroImage,
    excerpt,
    body,
    category,
    "relatedProjects": relatedProjects[]-> {
      _id,
      title,
      slug,
      heroImage,
      category
    },
    "affiliateProducts": affiliateProducts[]-> {
      _id,
      name,
      brand,
      price,
      affiliateLink,
      image,
      category,
      description,
      inStock,
      featured
    },
    seo
  }`;
  
  return await client.fetch(query, { slug });
}

// Get featured products
export async function getFeaturedProducts(limit: number = 6): Promise<Product[]> {
  const query = `*[_type == "product" && featured == true && availability == "in-stock"] | order(_createdAt desc) [0...${limit}] {
    _id,
    _type,
    name,
    slug,
    brand,
    pricing,
    affiliateLinks,
    images,
    description,
    specifications,
    category,
    tags,
    availability,
    rating,
    reviewCount,
    featured,
    seo
  }`;
  
  return await client.fetch(query);
}

// Get products by category
export async function getProductsByCategory(category: string): Promise<Product[]> {
  const query = `*[_type == "product" && category == $category && availability == "in-stock"] | order(_createdAt desc) {
    _id,
    _type,
    name,
    slug,
    brand,
    pricing,
    affiliateLinks,
    images,
    description,
    specifications,
    category,
    tags,
    availability,
    rating,
    reviewCount,
    featured,
    seo
  }`;
  
  return await client.fetch(query, { category });
}

// Get product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    _id,
    _type,
    name,
    slug,
    brand,
    pricing,
    affiliateLinks,
    images,
    description,
    specifications,
    category,
    tags,
    availability,
    rating,
    reviewCount,
    featured,
    seo
  }`;
  
  return await client.fetch(query, { slug });
}

// Get all products
export async function getAllProducts(): Promise<Product[]> {
  const query = `*[_type == "product"] | order(_createdAt desc) {
    _id,
    _type,
    name,
    slug,
    brand,
    pricing,
    affiliateLinks,
    images,
    category,
    tags,
    availability,
    rating,
    reviewCount,
    featured
  }`;
  
  return await client.fetch(query);
}

// Search products
export async function searchProducts(searchTerm: string): Promise<Product[]> {
  const query = `*[_type == "product" && (
    name match $searchTerm + "*" ||
    brand.name match $searchTerm + "*" ||
    pt::text(description) match $searchTerm + "*" ||
    $searchTerm in tags[]
  )] | order(_createdAt desc) {
    _id,
    _type,
    name,
    slug,
    brand,
    pricing,
    affiliateLinks,
    images,
    category,
    tags,
    availability,
    rating,
    reviewCount,
    featured
  }`;
  
  return await client.fetch(query, { searchTerm });
}

// Search projects
export async function searchProjects(searchTerm: string): Promise<Project[]> {
  const query = `*[_type == "project" && (
    title match $searchTerm + "*" ||
    pt::text(description) match $searchTerm + "*" ||
    $searchTerm in style[]
  )] | order(publishedAt desc) {
    _id,
    _type,
    title,
    slug,
    category,
    heroImage,
    style,
    publishedAt,
    featured
  }`;
  
  return await client.fetch(query, { searchTerm });
}

// Search journal posts
export async function searchJournalPosts(searchTerm: string): Promise<JournalPost[]> {
  const query = `*[_type == "journalPost" && (
    title match $searchTerm + "*" ||
    excerpt match $searchTerm + "*" ||
    pt::text(body) match $searchTerm + "*"
  )] | order(publishedAt desc) {
    _id,
    _type,
    title,
    slug,
    "author": author-> {
      name,
      image
    },
    publishedAt,
    heroImage,
    excerpt,
    category,
    seo
  }`;
  
  return await client.fetch(query, { searchTerm });
}
