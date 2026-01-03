import { NextResponse } from "next/server";
import {
  normalizeTradedoublerProducts,
  TradedoublerProductsResponse,
} from "@/lib/tradedoubler/products";

const PRODUCTS_BASE_URL = "https://api.tradedoubler.com/1.0/products.json";

const buildMatrixParams = (
  params: Record<string, string | number | undefined>,
) => {
  const entries = Object.entries(params).filter(([, value]) => value !== undefined);
  if (entries.length === 0) {
    return "";
  }

  const matrixValues = entries.map(
    ([key, value]) => `${key}=${encodeURIComponent(String(value))}`,
  );

  return `;${matrixValues.join(";")}`;
};

export async function GET(request: Request) {
  const token = process.env.TRADEDOUBLER_PRODUCTS_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "Missing TRADEDOUBLER_PRODUCTS_TOKEN on the server." },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(request.url);
  const fid = searchParams.get("fid");

  if (!fid) {
    return NextResponse.json(
      { error: "Missing required query parameter: fid." },
      { status: 400 },
    );
  }

  const matrixParams = buildMatrixParams({
    fid,
    q: searchParams.get("q") ?? undefined,
    limit: searchParams.get("limit") ?? undefined,
    page: searchParams.get("page") ?? undefined,
    pageSize: searchParams.get("pageSize") ?? undefined,
    minPrice: searchParams.get("minPrice") ?? undefined,
    maxPrice: searchParams.get("maxPrice") ?? undefined,
    orderBy: searchParams.get("orderBy") ?? undefined,
  });

  const url = `${PRODUCTS_BASE_URL}${matrixParams}?token=${encodeURIComponent(
    token,
  )}`;

  try {
    const response = await fetch(url, { next: { revalidate: 300 } });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Tradedoubler products request failed.",
          status: response.status,
        },
        { status: 502 },
      );
    }

    const payload = await response.json();
    const normalized: TradedoublerProductsResponse =
      normalizeTradedoublerProducts(payload);

    return NextResponse.json(normalized);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unable to reach Tradedoubler products API.",
        detail: error instanceof Error ? error.message : "Unknown error.",
      },
      { status: 502 },
    );
  }
}
