/**
 * Sanity Content Seeding Script
 * Run this to populate your Sanity studio with sample content
 * 
 * Usage:
 * 1. Make sure you have .env.local with SANITY_API_TOKEN
 * 2. Run: npx ts-node scripts/seed-sanity.ts
 */

import { client } from '../lib/sanity.client';

// Sample Author
const sampleAuthor = {
  _type: 'author',
  name: 'Auracasa Team',
  slug: {
    _type: 'slug',
    current: 'auracasa-team',
  },
  bio: [
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: 'The Auracasa team specializes in creating imaginary interiors that blend futuristic design with warm, human touches.',
        },
      ],
    },
  ],
};

// Sample Products
const sampleProducts = [
  {
    _type: 'product',
    name: 'Modern Minimalist Sofa',
    brand: 'Design Co',
    price: 1299,
    affiliateLink: 'https://example.com/sofa',
    category: 'furniture',
    description: 'Clean lines and comfortable seating for modern living spaces.',
    inStock: true,
    featured: true,
  },
  {
    _type: 'product',
    name: 'Pendant Light Fixture',
    brand: 'Lumina',
    price: 349,
    affiliateLink: 'https://example.com/light',
    category: 'lighting',
    description: 'Elegant pendant light with warm ambient glow.',
    inStock: true,
    featured: true,
  },
  {
    _type: 'product',
    name: 'Ceramic Vase Set',
    brand: 'Artisan Crafts',
    price: 89,
    affiliateLink: 'https://example.com/vase',
    category: 'decor',
    description: 'Handcrafted ceramic vases in desert clay tones.',
    inStock: true,
    featured: false,
  },
  {
    _type: 'product',
    name: 'Linen Throw Pillows',
    brand: 'Textile House',
    price: 59,
    affiliateLink: 'https://example.com/pillows',
    category: 'textiles',
    description: 'Soft linen pillows in neutral tones.',
    inStock: true,
    featured: true,
  },
  {
    _type: 'product',
    name: 'Concrete Coffee Table',
    brand: 'Industrial Design',
    price: 899,
    affiliateLink: 'https://example.com/table',
    category: 'furniture',
    description: 'Brutalist concrete table with smooth finish.',
    inStock: true,
    featured: false,
  },
  {
    _type: 'product',
    name: 'Floor Lamp',
    brand: 'Lumina',
    price: 279,
    affiliateLink: 'https://example.com/floor-lamp',
    category: 'lighting',
    description: 'Adjustable floor lamp with brass finish.',
    inStock: true,
    featured: true,
  },
];

// Sample Projects
const sampleProjects = [
  {
    _type: 'project',
    title: 'Sunset Loft',
    slug: {
      _type: 'slug',
      current: 'sunset-loft',
    },
    category: 'ai-generated',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'A loft bathed in sunset tones, balancing clean geometry with soft textures. This AI-generated space explores the intersection of warm futurism and minimalist design.',
          },
        ],
      },
    ],
    style: ['Warm Futurism', 'Minimalist', 'Contemporary'],
    colorPalette: ['#bf896c', '#f5e6d3', '#2d7dd2', '#ffffff'],
    publishedAt: new Date().toISOString(),
    featured: true,
  },
  {
    _type: 'project',
    title: 'Desert Atelier',
    slug: {
      _type: 'slug',
      current: 'desert-atelier',
    },
    category: 'hybrid',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Clay, linen and glass; a studio between imagination and craft. This hybrid project combines real materials with AI-enhanced visualization.',
          },
        ],
      },
    ],
    style: ['Material Study', 'Organic', 'Artisan'],
    colorPalette: ['#d6bda2', '#cfa58b', '#e3d2bd', '#f9f6f2'],
    publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    featured: true,
  },
  {
    _type: 'project',
    title: 'Concrete Poem',
    slug: {
      _type: 'slug',
      current: 'concrete-poem',
    },
    category: 'real',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'A restrained palette where light does the decoration. This real project showcases minimal brutalist architecture with careful attention to natural lighting.',
          },
        ],
      },
    ],
    style: ['Minimal Brut', 'Brutalist', 'Monochrome'],
    colorPalette: ['#262626', '#404040', '#737373', '#a3a3a3'],
    publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    featured: true,
  },
  {
    _type: 'project',
    title: 'Sky Garden Residence',
    slug: {
      _type: 'slug',
      current: 'sky-garden-residence',
    },
    category: 'ai-generated',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'An elevated living space that brings nature indoors through floor-to-ceiling windows and integrated greenery.',
          },
        ],
      },
    ],
    style: ['Biophilic', 'Modern', 'Airy'],
    colorPalette: ['#2d7dd2', '#7cb342', '#ffffff', '#f5f5f5'],
    publishedAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    featured: false,
  },
  {
    _type: 'project',
    title: 'Monochrome Studio',
    slug: {
      _type: 'slug',
      current: 'monochrome-studio',
    },
    category: 'hybrid',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'A study in black, white, and gray. This studio space emphasizes form, texture, and the interplay of light and shadow.',
          },
        ],
      },
    ],
    style: ['Monochrome', 'Minimalist', 'Sculptural'],
    colorPalette: ['#000000', '#ffffff', '#737373', '#d4d4d4'],
    publishedAt: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
    featured: false,
  },
];

// Sample Journal Posts
const sampleJournalPosts = [
  {
    _type: 'journalPost',
    title: 'Auracasa Vision: Clean Futuristic + Warm Human',
    slug: {
      _type: 'slug',
      current: 'auracasa-vision',
    },
    publishedAt: new Date().toISOString(),
    excerpt: 'Exploring the philosophy behind Auracasa: blending futuristic lines with warm materials to create spaces that feel both innovative and inviting.',
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'At Auracasa, we believe that the future of interior design lies in the balance between technological innovation and human warmth. Our approach combines clean, futuristic lines with materials and textures that evoke comfort and connection.',
          },
        ],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'This philosophy manifests in our careful selection of materials—desert clay tones paired with sky blues, concrete softened by linen, glass that captures and diffuses natural light. Each element serves both aesthetic and emotional purposes.',
          },
        ],
      },
    ],
    category: ['Design Philosophy', 'Brand Story'],
    seo: {
      metaTitle: 'Auracasa Vision: Clean Futuristic + Warm Human',
      metaDescription: 'Exploring the philosophy behind Auracasa: blending futuristic lines with warm materials.',
    },
  },
  {
    _type: 'journalPost',
    title: 'Color Stories: Desert Clay & Sky Blue',
    slug: {
      _type: 'slug',
      current: 'color-stories-desert-clay-sky-blue',
    },
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    excerpt: 'A deep dive into our signature color palette and how these hues create emotional resonance in interior spaces.',
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Desert Clay (#bf896c) and Sky Blue (#2d7dd2) form the foundation of the Auracasa color palette. These colors were chosen not just for their visual appeal, but for their psychological impact and versatility.',
          },
        ],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Desert Clay brings warmth, grounding, and a connection to natural earth tones. It evokes the feeling of sun-baked terracotta and creates an immediate sense of comfort. Sky Blue provides contrast and opens up spaces visually.',
          },
        ],
      },
    ],
    category: ['Color Theory', 'Design Tips'],
    seo: {
      metaTitle: 'Color Stories: Desert Clay & Sky Blue | Auracasa',
      metaDescription: 'A deep dive into our signature color palette and how these hues create emotional resonance.',
    },
  },
  {
    _type: 'journalPost',
    title: 'The Art of AI-Generated Interiors',
    slug: {
      _type: 'slug',
      current: 'art-of-ai-generated-interiors',
    },
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    excerpt: 'How we use AI as a creative tool to explore impossible spaces and push the boundaries of interior design.',
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'AI-generated interiors allow us to explore design possibilities that would be impractical or impossible to photograph. We can test lighting scenarios, material combinations, and spatial arrangements without the constraints of physical reality.',
          },
        ],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'However, AI is just a tool. The creative vision, the understanding of proportion, light, and human psychology—these remain firmly in the hands of the designer. We use AI to visualize our ideas, not to replace our creative process.',
          },
        ],
      },
    ],
    category: ['AI Design', 'Technology', 'Process'],
    seo: {
      metaTitle: 'The Art of AI-Generated Interiors | Auracasa Journal',
      metaDescription: 'How we use AI as a creative tool to explore impossible spaces and push design boundaries.',
    },
  },
];

async function seedSanity() {
  try {
    console.log('🌱 Starting Sanity content seeding...\n');

    // 1. Create Author
    console.log('📝 Creating author...');
    const author = await client.create(sampleAuthor);
    console.log(`✅ Author created: ${author.name} (ID: ${author._id})\n`);

    // 2. Create Products
    console.log('🛍️  Creating products...');
    const products = [];
    for (const product of sampleProducts) {
      const createdProduct = await client.create(product);
      products.push(createdProduct);
      console.log(`✅ Product created: ${createdProduct.name} (ID: ${createdProduct._id})`);
    }
    console.log(`\n✅ ${products.length} products created\n`);

    // 3. Create Projects (with product references)
    console.log('🏠 Creating projects...');
    const projects = [];
    for (let i = 0; i < sampleProjects.length; i++) {
      const project = sampleProjects[i];
      // Add 2-3 random products to each project
      const projectProducts = products
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 2) + 2)
        .map(p => ({ _type: 'reference', _ref: p._id }));

      const projectWithProducts = {
        ...project,
        affiliateProducts: projectProducts,
      };

      const createdProject = await client.create(projectWithProducts);
      projects.push(createdProject);
      console.log(`✅ Project created: ${createdProject.title} (ID: ${createdProject._id})`);
    }
    console.log(`\n✅ ${projects.length} projects created\n`);

    // 4. Create Journal Posts (with author, project, and product references)
    console.log('📰 Creating journal posts...');
    for (let i = 0; i < sampleJournalPosts.length; i++) {
      const post = sampleJournalPosts[i];
      
      // Add author reference
      const postWithAuthor = {
        ...post,
        author: {
          _type: 'reference',
          _ref: author._id,
        },
      };

      // Add 1-2 related projects
      const relatedProjects = projects
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 2) + 1)
        .map(p => ({ _type: 'reference', _ref: p._id }));

      // Add 2-3 affiliate products
      const postProducts = products
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 2) + 2)
        .map(p => ({ _type: 'reference', _ref: p._id }));

      const postWithReferences = {
        ...postWithAuthor,
        relatedProjects,
        affiliateProducts: postProducts,
      };

      const createdPost = await client.create(postWithReferences);
      console.log(`✅ Journal post created: ${createdPost.title} (ID: ${createdPost._id})`);
    }
    console.log(`\n✅ ${sampleJournalPosts.length} journal posts created\n`);

    console.log('🎉 Sanity seeding complete!\n');
    console.log('📊 Summary:');
    console.log(`   - 1 author`);
    console.log(`   - ${products.length} products`);
    console.log(`   - ${projects.length} projects`);
    console.log(`   - ${sampleJournalPosts.length} journal posts`);
    console.log('\n✨ Your Sanity studio is now populated with sample content!');
    console.log('🌐 Visit your studio to see the content and add images.');

  } catch (error) {
    console.error('❌ Error seeding Sanity:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedSanity();
