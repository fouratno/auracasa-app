'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales } from '@/i18n/config';

const languageNames: Record<string, string> = {
  en: 'English',
  de: 'Deutsch',
};

const languageFlags: Record<string, string> = {
  en: '🇬🇧',
  de: '🇩🇪',
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    // Remove current locale from pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    // Navigate to new locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-surface-dark-elevated transition-colors"
        aria-label="Switch language"
      >
        <span className="text-lg">{languageFlags[locale]}</span>
        <span className="text-sm font-medium hidden sm:inline">
          {languageNames[locale]}
        </span>
        <svg
          className="w-4 h-4 transition-transform group-hover:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-surface-dark-elevated rounded-lg shadow-lg border border-neutral-200 dark:border-border-dark opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {locales.map((loc) => (
          <button
            key={loc}
            onClick={() => switchLocale(loc)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-neutral-50 dark:hover:bg-surface-dark first:rounded-t-lg last:rounded-b-lg transition-colors ${
              locale === loc
                ? 'bg-neutral-50 dark:bg-surface-dark font-medium'
                : ''
            }`}
          >
            <span className="text-lg">{languageFlags[loc]}</span>
            <span className="text-sm">{languageNames[loc]}</span>
            {locale === loc && (
              <svg
                className="w-4 h-4 ml-auto text-accent-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
