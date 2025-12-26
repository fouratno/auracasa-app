import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import WishlistClient from './WishlistClient';

export async function generateMetadata({ 
  params: { locale } 
}: { 
  params: { locale: string } 
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'wishlist' });
  
  return {
    title: t('title'),
    description: t('emptyDescription'),
  };
}

export default async function WishlistPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  return <WishlistClient locale={locale} />;
}
