import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Sanity client configuration
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
});

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Helper function to get image URL with transformations
export function getImageUrl(source: any, width?: number, height?: number) {
  let imageBuilder = urlFor(source);
  
  if (width) {
    imageBuilder = imageBuilder.width(width);
  }
  
  if (height) {
    imageBuilder = imageBuilder.height(height);
  }
  
  return imageBuilder.url();
}
