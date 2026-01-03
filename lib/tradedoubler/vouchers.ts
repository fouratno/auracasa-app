export interface TradedoublerVoucher {
  id?: string;
  title?: string;
  description?: string;
  code?: string;
  url?: string;
  merchant?: string;
  validFrom?: string;
  validTo?: string;
}

export interface TradedoublerVouchersResponse {
  vouchers: TradedoublerVoucher[];
  total?: number;
}

export interface TradedoublerVoucherSearchParams {
  programId?: string;
  language?: string;
  validFrom?: string;
  validTo?: string;
}

const getStringValue = (value: unknown): string | undefined => {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number") {
    return value.toString();
  }

  return undefined;
};

export const normalizeTradedoublerVouchers = (
  payload: any,
): TradedoublerVouchersResponse => {
  const rawVouchers =
    payload?.vouchers?.voucher ??
    payload?.vouchers ??
    payload?.items ??
    payload?.voucher ??
    [];
  const voucherArray = Array.isArray(rawVouchers) ? rawVouchers : [];

  const vouchers = voucherArray.map((voucher) => ({
    id: getStringValue(voucher?.id ?? voucher?.voucherId),
    title: getStringValue(voucher?.title ?? voucher?.name),
    description: getStringValue(voucher?.description ?? voucher?.details),
    code: getStringValue(voucher?.code ?? voucher?.voucherCode),
    url: getStringValue(voucher?.link ?? voucher?.url ?? voucher?.deepLink),
    merchant: getStringValue(
      voucher?.programName ??
        voucher?.merchantName ??
        voucher?.advertiserName,
    ),
    validFrom: getStringValue(voucher?.validFrom ?? voucher?.startDate),
    validTo: getStringValue(voucher?.validTo ?? voucher?.endDate),
  } satisfies TradedoublerVoucher));

  return {
    vouchers,
    total: payload?.total ?? payload?.totalHits ?? payload?.vouchers?.total,
  } satisfies TradedoublerVouchersResponse;
};

export const fetchVouchers = async (
  params: TradedoublerVoucherSearchParams,
): Promise<TradedoublerVouchersResponse> => {
  const searchParams = new URLSearchParams();

  if (params.programId) searchParams.set("programId", params.programId);
  if (params.language) searchParams.set("language", params.language);
  if (params.validFrom) searchParams.set("validFrom", params.validFrom);
  if (params.validTo) searchParams.set("validTo", params.validTo);

  const response = await fetch(
    `/api/tradedoubler/vouchers?${searchParams.toString()}`,
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(
      `Vouchers API request failed (${response.status}): ${message}`,
    );
  }

  return response.json();
};
