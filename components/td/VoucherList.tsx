"use client";

import Link from "next/link";
import { TradedoublerVoucher } from "@/lib/tradedoubler/vouchers";

export default function VoucherList({
  vouchers,
  placement,
}: {
  vouchers: TradedoublerVoucher[];
  placement?: string;
}) {
  if (!vouchers.length) {
    return (
      <p className="text-sm text-text-muted dark:text-text-dark-muted">
        No vouchers returned.
      </p>
    );
  }

  return (
    <div className="space-y-4" data-tdlc-placement={placement}>
      {vouchers.map((voucher, index) => (
        <article
          key={`${voucher.id ?? "voucher"}-${index}`}
          className="card p-4 space-y-2"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wide text-text-muted dark:text-text-dark-muted">
                {voucher.merchant ?? "Merchant"}
              </div>
              <h3 className="text-sm font-semibold text-text-primary dark:text-text-dark-primary">
                {voucher.title ?? "Voucher"}
              </h3>
            </div>
            {voucher.code && (
              <span className="badge bg-neutral-100 dark:bg-surface-dark-sunken text-xs font-semibold">
                {voucher.code}
              </span>
            )}
          </div>
          {voucher.description && (
            <p className="text-xs text-text-muted dark:text-text-dark-muted">
              {voucher.description}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted dark:text-text-dark-muted">
            {voucher.validFrom && <span>Valid from: {voucher.validFrom}</span>}
            {voucher.validTo && <span>Valid to: {voucher.validTo}</span>}
          </div>
          {voucher.url && (
            <Link
              href={voucher.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-accent-500 hover:text-accent-600"
            >
              Redeem offer
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}
