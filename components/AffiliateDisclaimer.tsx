'use client';

import { Info } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface AffiliateDisclaimerProps {
  className?: string;
}

export default function AffiliateDisclaimer({ className = '' }: AffiliateDisclaimerProps) {
  const t = useTranslations('affiliate');
  const tCommon = useTranslations('common');

  return (
    <div className={`bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-8 rounded-r ${className}`}>
      <div className="flex items-start gap-3">
        <Info size={20} className="text-blue-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div className="flex-1">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {t('disclaimer')}{' '}
            <Link
              href="/legal/privacy#affiliate-disclosure"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline font-medium"
            >
              {tCommon('learnMore')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
