"use client";

import { useCallback, useState } from "react";
import {
  searchProducts,
  TradedoublerProductSearchParams,
  TradedoublerProductsResponse,
} from "@/lib/tradedoubler/products";

export const useTradedoublerProducts = () => {
  const [data, setData] = useState<TradedoublerProductsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runSearch = useCallback(
    async (params: TradedoublerProductSearchParams) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await searchProducts(params);
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
