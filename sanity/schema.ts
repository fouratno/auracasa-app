// Sanity Schema Definitions for Auracasa
// This file defines the content structure for the CMS

export const projectSchema = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'AI Generated', value: 'ai-generated' },
          { title: 'Real', value: 'real' },
          { title: 'Hybrid', value: 'hybrid' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'style',
      title: 'Style Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'colorPalette',
      title: 'Color Palette',
      type: 'array',
      of: [
        {
          type: 'string',
          validation: (Rule: any) =>
            Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).error(
              'Must be a valid hex color'
            ),
        },
      ],
    },
    {
      name: 'affiliateProducts',
      title: 'Affiliate Products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroImage',
      category: 'category',
    },
    prepare(selection: any) {
      const { title, media, category } = selection;
      return {
        title,
        subtitle: category,
        media,
      };
    },
  },
};

export const productSchema = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    // Brand Information
    {
      name: 'brand',
      title: 'Brand',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Brand Name',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'logo',
          title: 'Brand Logo',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'website',
          title: 'Brand Website',
          type: 'url',
          validation: (Rule: any) => Rule.uri({ scheme: ['http', 'https'] }),
        },
        {
          name: 'description',
          title: 'Brand Description',
          type: 'text',
          rows: 2,
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    // Pricing Information
    {
      name: 'pricing',
      title: 'Pricing',
      type: 'object',
      fields: [
        {
          name: 'amount',
          title: 'Price',
          type: 'number',
          validation: (Rule: any) => Rule.required().positive(),
        },
        {
          name: 'currency',
          title: 'Currency',
          type: 'string',
          options: {
            list: [
              { title: 'USD ($)', value: 'USD' },
              { title: 'EUR (€)', value: 'EUR' },
              { title: 'GBP (£)', value: 'GBP' },
            ],
          },
          initialValue: 'EUR',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'originalPrice',
          title: 'Original Price (for sales)',
          type: 'number',
          validation: (Rule: any) => Rule.positive(),
        },
        {
          name: 'saleEndDate',
          title: 'Sale End Date',
          type: 'datetime',
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    // Affiliate Links
    {
      name: 'affiliateLinks',
      title: 'Affiliate Links',
      type: 'object',
      fields: [
        {
          name: 'primary',
          title: 'Primary Affiliate Link',
          type: 'object',
          fields: [
            {
              name: 'network',
              title: 'Affiliate Network',
              type: 'string',
              options: {
                list: [
                  { title: 'TradeDoubler', value: 'tradedoubler' },
                  { title: 'AWIN', value: 'awin' },
                  { title: 'Amazon Associates', value: 'amazon' },
                  { title: 'Direct/Other', value: 'direct' },
                ],
              },
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'url',
              title: 'Affiliate URL',
              type: 'url',
              validation: (Rule: any) => Rule.required().uri({ scheme: ['http', 'https'] }),
            },
            {
              name: 'commission',
              title: 'Commission Rate (%)',
              type: 'number',
              validation: (Rule: any) => Rule.min(0).max(100),
            },
          ],
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'secondary',
          title: 'Secondary Affiliate Link (Optional)',
          type: 'object',
          fields: [
            {
              name: 'network',
              title: 'Affiliate Network',
              type: 'string',
              options: {
                list: [
                  { title: 'TradeDoubler', value: 'tradedoubler' },
                  { title: 'AWIN', value: 'awin' },
                  { title: 'Amazon Associates', value: 'amazon' },
                  { title: 'Direct/Other', value: 'direct' },
                ],
              },
            },
            {
              name: 'url',
              title: 'Affiliate URL',
              type: 'url',
              validation: (Rule: any) => Rule.uri({ scheme: ['http', 'https'] }),
            },
            {
              name: 'commission',
              title: 'Commission Rate (%)',
              type: 'number',
              validation: (Rule: any) => Rule.min(0).max(100),
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    // Images
    {
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required().min(1),
    },
    // Description
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    // Specifications
    {
      name: 'specifications',
      title: 'Specifications',
      type: 'object',
      fields: [
        {
          name: 'dimensions',
          title: 'Dimensions',
          type: 'string',
          description: 'e.g., "120cm W x 80cm D x 75cm H"',
        },
        {
          name: 'materials',
          title: 'Materials',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags',
          },
        },
        {
          name: 'colors',
          title: 'Available Colors',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags',
          },
        },
        {
          name: 'weight',
          title: 'Weight',
          type: 'string',
          description: 'e.g., "15kg"',
        },
        {
          name: 'careInstructions',
          title: 'Care Instructions',
          type: 'text',
          rows: 3,
        },
      ],
    },
    // Category & Tags
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Furniture', value: 'furniture' },
          { title: 'Lighting', value: 'lighting' },
          { title: 'Decor', value: 'decor' },
          { title: 'Textiles', value: 'textiles' },
          { title: 'Kitchen', value: 'kitchen' },
          { title: 'Bathroom', value: 'bathroom' },
          { title: 'Outdoor', value: 'outdoor' },
          { title: 'Art', value: 'art' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    // Availability
    {
      name: 'availability',
      title: 'Availability',
      type: 'string',
      options: {
        list: [
          { title: 'In Stock', value: 'in-stock' },
          { title: 'Pre-Order', value: 'pre-order' },
          { title: 'Out of Stock', value: 'out-of-stock' },
          { title: 'Discontinued', value: 'discontinued' },
        ],
      },
      initialValue: 'in-stock',
      validation: (Rule: any) => Rule.required(),
    },
    // Rating & Reviews
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule: any) => Rule.min(0).max(5),
      description: 'Average rating out of 5',
    },
    {
      name: 'reviewCount',
      title: 'Review Count',
      type: 'number',
      validation: (Rule: any) => Rule.min(0).integer(),
    },
    // Featured
    {
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false,
    },
    // SEO
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule: any) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (Rule: any) => Rule.max(160),
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'brand.name',
      media: 'images.0',
      price: 'pricing.amount',
      currency: 'pricing.currency',
    },
    prepare(selection: any) {
      const { title, subtitle, media, price, currency } = selection;
      const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£';
      return {
        title,
        subtitle: `${subtitle} • ${currencySymbol}${price}`,
        media,
      };
    },
  },
};

export const authorSchema = {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
};

export const journalPostSchema = {
  name: 'journalPost',
  title: 'Journal Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required().max(200),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'relatedProjects',
      title: 'Related Projects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
    },
    {
      name: 'affiliateProducts',
      title: 'Affiliate Products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule: any) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (Rule: any) => Rule.max(160),
        },
        {
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'heroImage',
    },
    prepare(selection: any) {
      const { title, author, media } = selection;
      return {
        title,
        subtitle: author && `by ${author}`,
        media,
      };
    },
  },
};

// Export all schemas
export const schemas = [
  projectSchema,
  productSchema,
  authorSchema,
  journalPostSchema,
];
