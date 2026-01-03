import { NextResponse } from "next/server";
import {
  normalizeTradedoublerVouchers,
  TradedoublerVouchersResponse,
} from "@/lib/tradedoubler/vouchers";

const VOUCHERS_BASE_URL = "https://api.tradedoubler.com/1.0/vouchers.json";

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
  const token = process.env.TRADEDOUBLER_VOUCHERS_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "Missing TRADEDOUBLER_VOUCHERS_TOKEN on the server." },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(request.url);

  const matrixParams = buildMatrixParams({
    programId: searchParams.get("programId") ?? undefined,
    language: searchParams.get("language") ?? undefined,
    validFrom: searchParams.get("validFrom") ?? undefined,
    validTo: searchParams.get("validTo") ?? undefined,
  });

  const url = `${VOUCHERS_BASE_URL}${matrixParams}?token=${encodeURIComponent(
    token,
  )}`;

  try {
    const response = await fetch(url, { next: { revalidate: 900 } });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Tradedoubler vouchers request failed.",
          status: response.status,
        },
        { status: 502 },
      );
    }

    const payload = await response.json();
    const normalized: TradedoublerVouchersResponse =
      normalizeTradedoublerVouchers(payload);

    return NextResponse.json(normalized);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unable to reach Tradedoubler vouchers API.",
        detail: error instanceof Error ? error.message : "Unknown error.",
      },
      { status: 502 },
    );
  }
}
