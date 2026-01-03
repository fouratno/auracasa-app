export interface TradedoublerProduct {
  id?: string;
  name?: string;
  description?: string;
  imageUrl?: string;
  price?: string;
  currency?: string;
  merchant?: string;
  url?: string;
}

export interface TradedoublerProductsResponse {
  products: TradedoublerProduct[];
  total?: number;
  page?: number;
  pageSize?: number;
}

export interface TradedoublerProductSearchParams {
  q?: string;
  fid: string;
  limit?: number;
  page?: number;
  pageSize?: number;
  minPrice?: number;
  maxPrice?: number;
  orderBy?: string;
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

export const normalizeTradedoublerProducts = (
  payload: any,
): TradedoublerProductsResponse => {
  const rawProducts =
    payload?.products?.product ??
    payload?.products ??
    payload?.items ??
    payload?.product ??
    [];
  const productArray = Array.isArray(rawProducts) ? rawProducts : [];

  const products = productArray.map((product) => {
    const rawPrice =
      product?.price?.value ??
      product?.price?.amount ??
      product?.price ??
      product?.priceValue ??
      product?.salePrice;

    return {
      id: getStringValue(
        product?.id ??
          product?.productId ??
          product?.productID ??
          product?.sku,
      ),
      name: getStringValue(
        product?.name ?? product?.productName ?? product?.title,
      ),
      description: getStringValue(product?.description ?? product?.summary),
      imageUrl: getStringValue(
        product?.productImage?.url ??
          product?.productImage ??
          product?.imageUrl ??
          product?.image ??
          product?.imageURL,
      ),
      price: getStringValue(rawPrice),
      currency: getStringValue(product?.price?.currency ?? product?.currency),
      merchant: getStringValue(
        product?.programName ??
          product?.merchantName ??
          product?.advertiserName,
      ),
      url: getStringValue(
        product?.productUrl ??
          product?.productURL ??
          product?.url ??
          product?.deepLink,
      ),
    } satisfies TradedoublerProduct;
  });

  return {
    products,
    total: payload?.totalHits ?? payload?.total ?? payload?.products?.total,
    page: payload?.page ?? payload?.pageNumber,
    pageSize: payload?.pageSize ?? payload?.page_size,
  } satisfies TradedoublerProductsResponse;
};

export const searchProducts = async (
  params: TradedoublerProductSearchParams,
): Promise<TradedoublerProductsResponse> => {
  const searchParams = new URLSearchParams();
  searchParams.set("fid", params.fid);

  if (params.q) searchParams.set("q", params.q);
  if (params.limit) searchParams.set("limit", params.limit.toString());
  if (params.page) searchParams.set("page", params.page.toString());
  if (params.pageSize) searchParams.set("pageSize", params.pageSize.toString());
  if (params.minPrice) searchParams.set("minPrice", params.minPrice.toString());
  if (params.maxPrice) searchParams.set("maxPrice", params.maxPrice.toString());
  if (params.orderBy) searchParams.set("orderBy", params.orderBy);

  const response = await fetch(
    `/api/tradedoubler/products?${searchParams.toString()}`,
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(
      `Products API request failed (${response.status}): ${message}`,
    );
  }

  return response.json();
};
