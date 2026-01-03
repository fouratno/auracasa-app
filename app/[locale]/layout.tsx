import "../globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Inter, Space_Grotesk } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/config";
import ClientLayout from "./client-layout";

// Premium font configuration
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: locale === 'de' 
      ? "Auracasa — Imaginäre Innenräume, Real gemacht"
      : "Auracasa — Imaginary Interiors, Made Real",
    description: locale === 'de'
      ? "Saubere, futuristische Innenräume mit warmer menschlicher Note. Auracasa Portfolio & Journal."
      : "Clean, futuristic interiors with warm human touch. Auracasa portfolio & journal.",
    metadataBase: new URL("https://auracasa.example"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  const linkConverterSrc = process.env.TRADEDOUBLER_LINK_CONVERTER_SRC;

  setRequestLocale(locale);
  
  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Fetch messages for the locale
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className="font-sans">
        {linkConverterSrc ? (
          <>
            <Script id="tdlc-epi" strategy="beforeInteractive">
              {`(function(){var path=window.location.pathname||\"\";var slug=path.replace(/^\\/+|\\/+$/g,\"\").replace(/\\//g,\"_\");window.tdlc_epi=slug||\"home\";if(!window.tdlc_epi2){var epi2=document.documentElement.getAttribute(\"data-tdlc-epi2\");if(epi2){window.tdlc_epi2=epi2;}}})();`}
            </Script>
            <Script
              id="tdlc-link-converter"
              strategy="afterInteractive"
              data-tdlc="link-converter"
              src={linkConverterSrc}
            />
            {process.env.NODE_ENV === "development" ? (
              <Script id="tdlc-dev-check" strategy="afterInteractive">
                {`(function(){var hasScript=!!document.querySelector('script[data-tdlc=\"link-converter\"]');console.info(\"[Tradedoubler] Link Converter script loaded:\",hasScript);})();`}
              </Script>
            ) : null}
          </>
        ) : null}
        <NextIntlClientProvider messages={messages}>
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
