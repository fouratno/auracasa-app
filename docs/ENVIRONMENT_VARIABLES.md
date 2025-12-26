# Environment Variables Configuration

This document lists all required environment variables for the Auracasa platform.

## Required Variables

### Site Configuration
```bash
# Base URL for the site (used for SEO, sitemaps, etc.)
NEXT_PUBLIC_SITE_URL=https://auracasa.com
```

### Sanity CMS
```bash
# Sanity Project ID
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id

# Sanity Dataset
NEXT_PUBLIC_SANITY_DATASET=production

# Sanity API Version
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Sanity Auth Token (for write operations)
SANITY_API_TOKEN=your_auth_token
```

### Analytics (Phase 2.3)
```bash
# Plausible Analytics Domain
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=auracasa.com

# Google Analytics 4 Measurement ID (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Affiliate Networks (Phase 2.3)
```bash
# TradeDoubler Publisher ID
NEXT_PUBLIC_TRADEDOUBLER_PUBLISHER_ID=your_publisher_id

# AWIN Publisher ID (Optional)
NEXT_PUBLIC_AWIN_PUBLISHER_ID=your_publisher_id
```

### Email Service (Contact Form)
```bash
# Formspree Form ID
NEXT_PUBLIC_FORMSPREE_FORM_ID=xyzaylqn
```

### Newsletter (Resend)
```bash
# Resend API Key
RESEND_API_KEY=re_1234567890

# Resend Audience ID (list identifier)
RESEND_AUDIENCE_ID=aud_1234567890
```

## Setup Instructions

### Development Environment

1. Create `.env.local` file in the project root:
```bash
cd auracasa-premium
cp .env.example .env.local
```

2. Fill in your actual values in `.env.local`

3. Restart the development server:
```bash
npm run dev
```

### Production Environment

1. Add environment variables to your hosting platform:
   - **Vercel**: Project Settings → Environment Variables
   - **Netlify**: Site Settings → Build & Deploy → Environment
   - **Other**: Follow platform-specific instructions

2. Ensure all `NEXT_PUBLIC_*` variables are set (they're exposed to the browser)

3. Keep sensitive tokens (like `SANITY_API_TOKEN`) server-side only

## Variable Descriptions

### NEXT_PUBLIC_SITE_URL
- **Purpose**: Base URL for generating absolute URLs in sitemaps, metadata, etc.
- **Example**: `https://auracasa.com`
- **Required**: Yes
- **Public**: Yes

### NEXT_PUBLIC_SANITY_PROJECT_ID
- **Purpose**: Your Sanity project identifier
- **Example**: `9qnllyyc`
- **Required**: Yes
- **Public**: Yes

### NEXT_PUBLIC_SANITY_DATASET
- **Purpose**: Sanity dataset name (usually `production` or `development`)
- **Example**: `production`
- **Required**: Yes
- **Public**: Yes

### NEXT_PUBLIC_PLAUSIBLE_DOMAIN
- **Purpose**: Domain for Plausible Analytics tracking
- **Example**: `auracasa.com`
- **Required**: Yes (for analytics)
- **Public**: Yes

### NEXT_PUBLIC_GA_MEASUREMENT_ID
- **Purpose**: Google Analytics 4 measurement ID
- **Example**: `G-XXXXXXXXXX`
- **Required**: No (optional alternative to Plausible)
- **Public**: Yes

### NEXT_PUBLIC_TRADEDOUBLER_PUBLISHER_ID
- **Purpose**: Your TradeDoubler publisher/affiliate ID
- **Example**: `123456`
- **Required**: Yes (for affiliate tracking)
- **Public**: Yes

### SANITY_API_TOKEN
- **Purpose**: Authentication token for Sanity write operations
- **Example**: `sk...`
- **Required**: Yes (for CMS operations)
- **Public**: No (server-side only)

### NEXT_PUBLIC_FORMSPREE_FORM_ID
- **Purpose**: Formspree form identifier for contact submissions
- **Example**: `xyzaylqn`
- **Required**: Yes (for contact form submissions)
- **Public**: Yes

### RESEND_API_KEY
- **Purpose**: API key for Resend newsletter subscriptions
- **Example**: `re_1234567890`
- **Required**: Yes (for newsletter subscriptions)
- **Public**: No (server-side only)

### RESEND_AUDIENCE_ID
- **Purpose**: Audience/list identifier for Resend contacts
- **Example**: `aud_1234567890`
- **Required**: Yes (for newsletter subscriptions)
- **Public**: No (server-side only)

## Security Notes

1. **Never commit `.env.local` or `.env` files to version control**
2. **Only `NEXT_PUBLIC_*` variables are exposed to the browser**
3. **Rotate tokens regularly, especially after team changes**
4. **Use different tokens for development and production**
5. **Keep `.env.example` updated but without actual values**

## Validation

To verify your environment variables are set correctly:

```bash
# Check if variables are loaded
npm run dev

# Look for console warnings about missing variables
# The app will log which required variables are missing
```

## Troubleshooting

### Analytics not tracking
- Verify `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` matches your actual domain
- Check cookie consent is accepted
- Verify Plausible script is loaded in browser DevTools

### Affiliate links not working
- Ensure `NEXT_PUBLIC_TRADEDOUBLER_PUBLISHER_ID` is set
- Check UTM parameters are being appended to links
- Verify affiliate network account is active

### CMS content not loading
- Verify all Sanity variables are correct
- Check Sanity project is published
- Ensure API token has correct permissions

## Example .env.local

```bash
# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=9qnllyyc
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_token_here

# Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=localhost

# Affiliate
NEXT_PUBLIC_TRADEDOUBLER_PUBLISHER_ID=123456

# Email
NEXT_PUBLIC_FORMSPREE_FORM_ID=xyzaylqn

# Newsletter
RESEND_API_KEY=re_1234567890
RESEND_AUDIENCE_ID=aud_1234567890
