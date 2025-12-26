// Supported locales
export const locales = ['en', 'de'] as const;
export type Locale = (typeof locales)[number];

// Default locale
export const defaultLocale: Locale = 'en';
