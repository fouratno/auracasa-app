"use client";

import { useCallback, useState } from "react";
import {
  fetchVouchers,
  TradedoublerVoucherSearchParams,
  TradedoublerVouchersResponse,
} from "@/lib/tradedoubler/vouchers";

export const useTradedoublerVouchers = () => {
  const [data, setData] = useState<TradedoublerVouchersResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runSearch = useCallback(
    async (params: TradedoublerVoucherSearchParams) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchVouchers(params);
        setData(response);
        return response;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return {
    data,
    isLoading,
    error,
    runSearch,
  };
};
