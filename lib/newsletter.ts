// Newsletter utility functions for managing email subscriptions
// Uses localStorage for tracking subscription status (client-side only)
// Actual email sending should be handled by API routes with services like Resend

const NEWSLETTER_KEY = 'auracasa_newsletter_subscription';

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

export interface NewsletterSubscription {
  email: string;
  name?: string;
  subscribedAt: string;
  source: string;
}

/**
 * Validate email address format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Check if email is already subscribed (client-side check only)
 */
export function isSubscribed(email: string): boolean {
  if (!isBrowser) return false;
  
  try {
    const subscription = localStorage.getItem(NEWSLETTER_KEY);
    if (!subscription) return false;
    
    const data: NewsletterSubscription = JSON.parse(subscription);
    return data.email.toLowerCase() === email.toLowerCase();
  } catch (error) {
    console.error('Error checking subscription:', error);
    return false;
  }
}

/**
 * Get current subscription data
 */
export function getSubscription(): NewsletterSubscription | null {
  if (!isBrowser) return null;
  
  try {
    const subscription = localStorage.getItem(NEWSLETTER_KEY);
    return subscription ? JSON.parse(subscription) : null;
  } catch (error) {
    console.error('Error getting subscription:', error);
    return null;
  }
}

/**
 * Save subscription data locally
 * Note: This only saves to localStorage. Actual API call should be made separately.
 */
export function saveSubscriptionLocally(
  email: string,
  name: string | undefined,
  source: string
): void {
  if (!isBrowser) return;
  
  try {
    const subscription: NewsletterSubscription = {
      email,
      name,
      subscribedAt: new Date().toISOString(),
      source,
    };
    
    localStorage.setItem(NEWSLETTER_KEY, JSON.stringify(subscription));
  } catch (error) {
    console.error('Error saving subscription:', error);
  }
}

/**
 * Subscribe to newsletter
 * This function should call your API route to handle the actual subscription
 */
export async function subscribeToNewsletter(
  email: string,
  name?: string,
  source: string = 'website'
): Promise<{ success: boolean; message: string }> {
  // Validate email
  if (!validateEmail(email)) {
    return {
      success: false,
      message: 'Invalid email address',
    };
  }

  // Check if already subscribed locally
  if (isSubscribed(email)) {
    return {
      success: false,
      message: 'Already subscribed',
    };
  }

  try {
    // Call API route to handle subscription
    const response = await fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name, source }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      // Save subscription locally
      saveSubscriptionLocally(email, name, source);
      
      return {
        success: true,
        message: 'Successfully subscribed',
      };
    } else {
      return {
        success: false,
        message: data.message || 'Subscription failed',
      };
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return {
      success: false,
      message: 'Network error. Please try again.',
    };
  }
}

/**
 * Unsubscribe from newsletter
 */
export async function unsubscribe(email: string): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('/api/newsletter/unsubscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      // Remove from localStorage
      if (isBrowser) {
        localStorage.removeItem(NEWSLETTER_KEY);
      }
      
      return {
        success: true,
        message: 'Successfully unsubscribed',
      };
    } else {
      return {
        success: false,
        message: data.message || 'Unsubscribe failed',
      };
    }
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return {
      success: false,
      message: 'Network error. Please try again.',
    };
  }
}

/**
 * Check if exit intent popup should be shown
 */
export function shouldShowExitIntent(): boolean {
  if (!isBrowser) return false;
  
  try {
    // Don't show if already subscribed
    if (getSubscription()) return false;
    
    // Check if user dismissed the popup
    const dismissed = localStorage.getItem('newsletter_exit_intent_dismissed');
    if (dismissed) {
      const dismissedDate = new Date(dismissed);
      const daysSinceDismissed = (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
      
      // Show again after 7 days
      return daysSinceDismissed > 7;
    }
    
    return true;
  } catch (error) {
    console.error('Error checking exit intent:', error);
    return false;
  }
}

/**
 * Mark exit intent popup as dismissed
 */
export function dismissExitIntent(permanent: boolean = false): void {
  if (!isBrowser) return;
  
  try {
    if (permanent) {
      localStorage.setItem('newsletter_exit_intent_dismissed', 'permanent');
    } else {
      localStorage.setItem('newsletter_exit_intent_dismissed', new Date().toISOString());
    }
  } catch (error) {
    console.error('Error dismissing exit intent:', error);
  }
}

/**
 * Clear all newsletter data (for testing/debugging)
 */
export function clearNewsletterData(): void {
  if (!isBrowser) return;
  
  try {
    localStorage.removeItem(NEWSLETTER_KEY);
    localStorage.removeItem('newsletter_exit_intent_dismissed');
  } catch (error) {
    console.error('Error clearing newsletter data:', error);
  }
}
