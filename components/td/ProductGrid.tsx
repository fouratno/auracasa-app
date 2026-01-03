"use client";

import Image from "next/image";
import Link from "next/link";
import { TradedoublerProduct } from "@/lib/tradedoubler/products";

const formatPrice = (price?: string, currency?: string) => {
  if (!price) return undefined;
  const value = Number(price);

  if (!Number.isNaN(value) && currency) {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value);
  }

  return currency ? `${price} ${currency}` : price;
};

export default function ProductGrid({
  products,
  placement,
}: {
  products: TradedoublerProduct[];
  placement?: string;
}) {
  if (!products.length) {
    return (
      <p className="text-sm text-text-muted dark:text-text-dark-muted">
        No products returned.
      </p>
    );
  }

  return (
    <div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      data-tdlc-placement={placement}
    >
      {products.map((product, index) => {
        const priceLabel = formatPrice(product.price, product.currency);

        return (
          <article
            key={`${product.id ?? "product"}-${index}`}
            className="card overflow-hidden"
          >
            <div className="relative aspect-[4/3] bg-neutral-100 dark:bg-surface-dark-sunken">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name ?? "Product image"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-text-muted">
                  No image
                </div>
              )}
            </div>

            <div className="space-y-2 p-4">
              <div className="text-xs uppercase tracking-wide text-text-muted dark:text-text-dark-muted">
                {product.merchant ?? "Merchant"}
              </div>
              <h3 className="text-sm font-semibold text-text-primary dark:text-text-dark-primary">
                {product.name ?? "Untitled product"}
              </h3>
              {product.description && (
                <p className="text-xs text-text-muted dark:text-text-dark-muted line-clamp-2">
                  {product.description}
                </p>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">
                  {priceLabel ?? "Price unavailable"}
                </span>
                {product.url && (
                  <Link
                    href={product.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent-500 hover:text-accent-600"
                  >
                    View product
                  </Link>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
