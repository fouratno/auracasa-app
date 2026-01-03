"use client";

import { useState } from "react";
import ProductGrid from "@/components/td/ProductGrid";
import VoucherList from "@/components/td/VoucherList";
import { useTradedoublerProducts } from "@/hooks/useTradedoublerProducts";
import { useTradedoublerVouchers } from "@/hooks/useTradedoublerVouchers";

export default function TradedoublerTestClient({
  hasProductsToken,
  hasVouchersToken,
}: {
  hasProductsToken: boolean;
  hasVouchersToken: boolean;
}) {
  const [feedId, setFeedId] = useState("");
  const [keyword, setKeyword] = useState("");
  const [programId, setProgramId] = useState("");
  const [language, setLanguage] = useState("en");

  const {
    data: productData,
    isLoading: isProductsLoading,
    error: productsError,
    runSearch: runProductSearch,
  } = useTradedoublerProducts();

  const {
    data: voucherData,
    isLoading: isVouchersLoading,
    error: vouchersError,
    runSearch: runVoucherSearch,
  } = useTradedoublerVouchers();

  const handleProductSearch = async () => {
    if (!feedId) {
      alert("Feed ID (fid) is required to query products.");
      return;
    }

    await runProductSearch({
      fid: feedId,
      q: keyword || undefined,
      limit: 9,
      pageSize: 9,
    });
  };

  const handleVoucherSearch = async () => {
    await runVoucherSearch({
      programId: programId || undefined,
      language: language || undefined,
    });
  };

  return (
    <div className="space-y-10">
      <section className="card p-6 space-y-4">
        <h2 className="text-lg font-semibold">Environment sanity check</h2>
        <ul className="text-sm text-text-muted dark:text-text-dark-muted space-y-1">
          <li>
            Products token configured: {hasProductsToken ? "Yes" : "No"}
          </li>
          <li>
            Vouchers token configured: {hasVouchersToken ? "Yes" : "No"}
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Products API</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="space-y-2 text-sm">
            <span className="font-medium">Feed ID (fid)</span>
            <input
              value={feedId}
              onChange={(event) => setFeedId(event.target.value)}
              placeholder="e.g. 12345"
              className="w-full rounded border border-neutral-200 bg-white px-3 py-2 text-sm text-black"
            />
          </label>
          <label className="space-y-2 text-sm md:col-span-2">
            <span className="font-medium">Keyword search</span>
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Search term"
              className="w-full rounded border border-neutral-200 bg-white px-3 py-2 text-sm text-black"
            />
          </label>
        </div>
        <button
          type="button"
          onClick={handleProductSearch}
          className="btn btn-sm bg-accent-500 text-white hover:bg-accent-600"
          disabled={isProductsLoading}
        >
          {isProductsLoading ? "Loading products..." : "Test Products"}
        </button>
        {productsError && (
          <p className="text-sm text-red-500">{productsError}</p>
        )}
        {productData && (
          <div className="space-y-4">
            <div className="text-xs text-text-muted dark:text-text-dark-muted">
              Returned {productData.products.length} products
            </div>
            <ProductGrid products={productData.products} placement="test_grid" />
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Vouchers API</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="space-y-2 text-sm">
            <span className="font-medium">Program ID</span>
            <input
              value={programId}
              onChange={(event) => setProgramId(event.target.value)}
              placeholder="Optional program id"
              className="w-full rounded border border-neutral-200 bg-white px-3 py-2 text-sm text-black"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-medium">Language</span>
            <input
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              placeholder="en"
              className="w-full rounded border border-neutral-200 bg-white px-3 py-2 text-sm text-black"
            />
          </label>
        </div>
        <button
          type="button"
          onClick={handleVoucherSearch}
          className="btn btn-sm bg-accent-500 text-white hover:bg-accent-600"
          disabled={isVouchersLoading}
        >
          {isVouchersLoading ? "Loading vouchers..." : "Test Vouchers"}
        </button>
        {vouchersError && (
          <p className="text-sm text-red-500">{vouchersError}</p>
        )}
        {voucherData && (
          <div className="space-y-4">
            <div className="text-xs text-text-muted dark:text-text-dark-muted">
              Returned {voucherData.vouchers.length} vouchers
            </div>
            <VoucherList vouchers={voucherData.vouchers} placement="test_list" />
          </div>
        )}
      </section>
    </div>
  );
}
