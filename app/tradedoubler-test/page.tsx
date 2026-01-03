import { notFound } from "next/navigation";
import LinkConverterPlacement from "@/components/td/LinkConverterPlacement";
import TradedoublerTestClient from "@/components/td/TradedoublerTestClient";

export default function TradedoublerTestPage() {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.TRADEDOUBLER_TEST_PAGE_ENABLED !== "true"
  ) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-5xl space-y-8 py-12">
      <LinkConverterPlacement placement="test_page" />
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Tradedoubler integration test</h1>
        <p className="text-sm text-text-muted dark:text-text-dark-muted">
          Validate Link Converter, products, and vouchers without exposing
          tokens to the browser.
        </p>
      </header>
      <TradedoublerTestClient
        hasProductsToken={Boolean(process.env.TRADEDOUBLER_PRODUCTS_TOKEN)}
        hasVouchersToken={Boolean(process.env.TRADEDOUBLER_VOUCHERS_TOKEN)}
      />
    </div>
  );
}
