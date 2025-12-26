'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { trackAffiliateClick } from '@/lib/analytics';
import { useTranslations } from 'next-intl';

interface AffiliateLinkProps {
  href: string;
  children: ReactNode;
  productId?: string;
  productName?: string;
  productPrice?: number;
  affiliateNetwork?: 'tradedoubler' | 'awin' | 'other';
  className?: string;
  showIcon?: boolean;
  showTooltip?: boolean;
}

export default function AffiliateLink({
  href,
  children,
  productId,
  productName,
  productPrice,
  affiliateNetwork = 'other',
  className = '',
  showIcon = true,
  showTooltip = true,
}: AffiliateLinkProps) {
  const t = useTranslations('affiliate');

  const handleClick = () => {
    if (productId && productName) {
      trackAffiliateClick({
        productId,
        productName,
        productPrice: productPrice || 0,
        affiliateNetwork,
      });
    }
  };

  return (
    <Link
      href={href}
      rel="noopener sponsored nofollow"
      target="_blank"
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 hover:underline transition-colors ${className}`}
      aria-label={`${children} (${t('link')})`}
      title={showTooltip ? t('tooltip') : undefined}
    >
      {children}
      {showIcon && (
        <ExternalLink 
          size={14} 
          className="opacity-60 flex-shrink-0" 
          aria-hidden="true"
        />
      )}
    </Link>
  );
}
