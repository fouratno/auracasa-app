import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    slug: 'sunset-loft',
    src: '/hero-1.jpg',
    translationKey: 'sunsetLoft',
  },
  {
    slug: 'desert-atelier',
    src: '/hero-2.jpg',
    translationKey: 'desertAtelier',
  },
  {
    slug: 'concrete-poem',
    src: '/hero-3.jpg',
    translationKey: 'concretePoem',
  },
];

export default async function Home({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'home' });
  const tProjects = await getTranslations({ locale, namespace: 'projects' });

  return (
    <div>
      <section className="container py-16">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
              {t('hero.title')}{' '}
              <span className="text-accent-500">{t('hero.titleAccent')}</span>
            </h1>
            <p className="mt-5 text-lg text-neutral-700 dark:text-text-dark-muted">
              {t('hero.description')}
            </p>
            <div className="mt-6 flex gap-3">
              <Link href={`/${locale}/portfolio`} className="btn btn-primary">
                {t('hero.viewPortfolio')}
              </Link>
              <Link href={`/${locale}/services`} className="btn btn-outline">
                {t('hero.ourServices')}
              </Link>
            </div>
          </div>
          <div className="card overflow-hidden">
            <Image
              src="/hero-1.jpg"
              alt="Auracasa hero"
              width={1400}
              height={900}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

      <section className="container py-8">
        <h2 className="text-2xl font-semibold">{t('featured.title')}</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/${locale}/project/${p.slug}`}
              className="card overflow-hidden"
            >
              <Image
                src={p.src}
                alt={tProjects(`${p.translationKey}.title`)}
                width={1200}
                height={800}
                className="w-full h-auto"
              />
              <div className="p-4">
                <div className="text-sm text-neutral-600 dark:text-text-dark-muted">
                  {tProjects(`${p.translationKey}.tag`)}
                </div>
                <div className="text-lg font-medium">
                  {tProjects(`${p.translationKey}.title`)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
