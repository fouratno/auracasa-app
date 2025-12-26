// Analytics utility library for tracking events and conversions
// Supports Plausible Analytics and custom affiliate tracking

export type AnalyticsEvent = 
  | 'affiliate_click'
  | 'project_view'
  | 'newsletter_signup'
  | 'product_save'
  | 'contact_form_submit'
  | 'search_query'
  | 'social_share';

export interface AffiliateClickData {
  productId: string;
  productName: string;
  productPrice: number;
  projectSlug?: string;
  affiliateNetwork: 'tradedoubler' | 'awin' | 'other';
}

export interface ProjectViewData {
  projectSlug: string;
  projectTitle: string;
  category: string;
  hasAffiliateProducts: boolean;
}

export interface ProductSaveData {
  productId: string;
  productName: string;
  source: 'project' | 'search' | 'direct';
}

// Check if analytics is enabled based on user consent
export function isAnalyticsEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) return false;
    
    const consentData = JSON.parse(consent);
    return consentData.analytics === true;
  } catch {
    return false;
  }
}

// Check if affiliate tracking is enabled based on user consent
export function canTrackAffiliate(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) return false;
    
    const consentData = JSON.parse(consent);
    return consentData.affiliate === true;
  } catch {
    return false;
  }
}

// Track custom event with Plausible
export function trackEvent(
  eventName: AnalyticsEvent,
  props?: Record<string, string | number | boolean>
): void {
  if (!isAnalyticsEnabled()) return;
  
  try {
    // Plausible event tracking
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible(eventName, { props });
    }
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', eventName, props);
    }
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
}

// Track affiliate link click
export function trackAffiliateClick(data: AffiliateClickData): void {
  trackEvent('affiliate_click', {
    product_id: data.productId,
    product_name: data.productName,
    product_price: data.productPrice,
    project_slug: data.projectSlug || 'direct',
    affiliate_network: data.affiliateNetwork,
  });
  
  // Store in localStorage for conversion tracking
  try {
    const clicks = JSON.parse(localStorage.getItem('affiliate_clicks') || '[]');
    clicks.push({
      ...data,
      timestamp: new Date().toISOString(),
    });
    // Keep only last 50 clicks
    localStorage.setItem('affiliate_clicks', JSON.stringify(clicks.slice(-50)));
  } catch (error) {
    console.error('Failed to store affiliate click:', error);
  }
}

// Track project view
export function trackProjectView(data: ProjectViewData): void {
  trackEvent('project_view', {
    project_slug: data.projectSlug,
    project_title: data.projectTitle,
    category: data.category,
    has_affiliate_products: data.hasAffiliateProducts,
  });
}

// Track product save (wishlist)
export function trackProductSave(data: ProductSaveData): void {
  trackEvent('product_save', {
    product_id: data.productId,
    product_name: data.productName,
    source: data.source,
  });
}

// Track newsletter signup
export function trackNewsletterSignup(source: string): void {
  trackEvent('newsletter_signup', {
    source,
  });
}

// Track contact form submission
export function trackContactFormSubmit(): void {
  trackEvent('contact_form_submit', {
    timestamp: new Date().toISOString(),
  });
}

// Track search query
export function trackSearchQuery(query: string, resultsCount: number): void {
  trackEvent('search_query', {
    query,
    results_count: resultsCount,
  });
}

// Track social share
export function trackSocialShare(platform: string, contentType: string, contentId: string): void {
  trackEvent('social_share', {
    platform,
    content_type: contentType,
    content_id: contentId,
  });
}

// Get affiliate click statistics
export function getAffiliateStats(): {
  totalClicks: number;
  clicksByProduct: Record<string, number>;
  clicksByNetwork: Record<string, number>;
  recentClicks: any[];
} {
  try {
    const clicks = JSON.parse(localStorage.getItem('affiliate_clicks') || '[]');
    
    const clicksByProduct: Record<string, number> = {};
    const clicksByNetwork: Record<string, number> = {};
    
    clicks.forEach((click: any) => {
      clicksByProduct[click.productId] = (clicksByProduct[click.productId] || 0) + 1;
      clicksByNetwork[click.affiliateNetwork] = (clicksByNetwork[click.affiliateNetwork] || 0) + 1;
    });
    
    return {
      totalClicks: clicks.length,
      clicksByProduct,
      clicksByNetwork,
      recentClicks: clicks.slice(-10).reverse(),
    };
  } catch {
    return {
      totalClicks: 0,
      clicksByProduct: {},
      clicksByNetwork: {},
      recentClicks: [],
    };
  }
}

// Generate UTM parameters for affiliate links
export function generateUTMParams(params: {
  source: string;
  medium: string;
  campaign: string;
  content?: string;
}): string {
  const utmParams = new URLSearchParams({
    utm_source: params.source,
    utm_medium: params.medium,
    utm_campaign: params.campaign,
  });
  
  if (params.content) {
    utmParams.append('utm_content', params.content);
  }
  
  return utmParams.toString();
}

// Add UTM parameters to affiliate URL
export function addUTMToAffiliateLink(
  url: string,
  projectSlug: string,
  productId: string
): string {
  try {
    const urlObj = new URL(url);
    const utmParams = generateUTMParams({
      source: 'auracasa',
      medium: 'affiliate',
      campaign: projectSlug,
      content: productId,
    });
    
    // Append UTM params
    const separator = urlObj.search ? '&' : '?';
    return `${url}${separator}${utmParams}`;
  } catch {
    // If URL parsing fails, return original URL
    return url;
  }
}
