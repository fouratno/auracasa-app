'use client';

import { useEffect, useState } from 'react';
import PlausibleProvider from 'next-plausible';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if user has consented to analytics
    try {
      const consent = localStorage.getItem('cookie_consent');
      if (consent) {
        const consentData = JSON.parse(consent);
        setAnalyticsEnabled(consentData.analytics === true);
      }
    } catch (error) {
      console.error('Failed to read cookie consent:', error);
    }
  }, []);

  // Don't render analytics until mounted (avoid hydration mismatch)
  if (!mounted) {
    return <>{children}</>;
  }

  // Only load Plausible if analytics is enabled
  if (!analyticsEnabled) {
    return <>{children}</>;
  }

  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'auracasa.com';

  return (
    <PlausibleProvider 
      domain={plausibleDomain}
      trackOutboundLinks
      trackFileDownloads
      enabled={analyticsEnabled}
    >
      {children}
    </PlausibleProvider>
  );
}
