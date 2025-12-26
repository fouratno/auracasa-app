'use client';

import { useEffect, useState } from 'react';
import CookieConsentBanner from 'react-cookie-consent';

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleAccept = () => {
    // Store consent in localStorage
    const consent = {
      essential: true,
      analytics: true,
      marketing: true,
      affiliate: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookie_consent', JSON.stringify(consent));
    
    // Reload to initialize analytics
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  const handleDecline = () => {
    // Store minimal consent (essential only)
    const consent = {
      essential: true,
      analytics: false,
      marketing: false,
      affiliate: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookie_consent', JSON.stringify(consent));
  };

  const handleCustomize = () => {
    // Open preferences modal (to be implemented)
    alert('Cookie preferences customization coming soon!');
  };

  return (
    <CookieConsentBanner
      location="bottom"
      buttonText="Accept All"
      declineButtonText="Decline"
      enableDeclineButton
      onAccept={handleAccept}
      onDecline={handleDecline}
      cookieName="auracasa_cookie_consent"
      style={{
        background: 'rgba(0, 0, 0, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '20px',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        flexWrap: 'wrap',
      }}
      buttonStyle={{
        background: '#2d7dd2',
        color: 'white',
        fontSize: '14px',
        fontWeight: '500',
        padding: '10px 24px',
        borderRadius: '12px',
        border: 'none',
        cursor: 'pointer',
      }}
      declineButtonStyle={{
        background: 'transparent',
        color: 'white',
        fontSize: '14px',
        fontWeight: '500',
        padding: '10px 24px',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        cursor: 'pointer',
      }}
      expires={365}
    >
      <div style={{ flex: 1, minWidth: '300px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600', color: 'white' }}>
          🍪 We value your privacy
        </h3>
        <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.5' }}>
          We use cookies to enhance your browsing experience, analyze site traffic, and track affiliate conversions. 
          By clicking "Accept All", you consent to our use of cookies.{' '}
          <a 
            href="/legal/privacy" 
            style={{ color: '#2d7dd2', textDecoration: 'underline' }}
          >
            Learn more
          </a>
        </p>
      </div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button
          onClick={handleCustomize}
          style={{
            background: 'transparent',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '14px',
            padding: '10px 16px',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          Customize
        </button>
      </div>
    </CookieConsentBanner>
  );
}
