import {
  ICategory,
  ICategoryItem,
  IProduct,
  ICity,
  IPaymentDetails,
  IProductDetails,
  IShippingDetails,
  ITransactionStatus,
  ITransaction,
} from './entity.interface';

export interface IGetProductListResponse {
  products: IProduct[];
  total_data: number;
  total_page: number;
  current_page: number;
}

export interface IGetProductListRequest {
  merchant?: string;
  cat?: string;
  seller_city_id?: string;
  q?: string;
  sort_by?: string;
  sort_dir?: string;
  min_price?: number;
  max_price?: number;
  min_rating?: number;
  limit?: number;
  page?: number;
}

export interface IGetProductListCategoryRequest {
  merchant_id?: number;
  seller_city_id?: string;
  q?: string;
  sort_by?: string;
  sort_dir?: string;
  min_price?: number;
  max_price?: number;
  min_rating?: number;
  limit?: number;
  page?: number;
}

export type IGetCategoriesResponse = ICategory[];

export type IGetCategoryAncestorsResponse = ICategoryItem;

export interface IGetCategoriesRequest {
  level?: number;
}

export interface IGetCitiesResponse {
  cities: ICity[];
}

export interface IGetRecommendedProductsRequest {
  page?: number;
  limit?: number;
}

export type IGetMerchantCategoriesResponse = ICategory[];

export interface IGetTransactionListRequest {
  q?: string;
  start_date?: string;
  end_date?: string;
  page?: number;
  limit?: number;
  sort?: number;
}

export interface IGetTransactionListResponse {
  transactions: ITransaction[];
  total_data: number;
  total_page: number;
  current_page: number;
}

export interface IGetTransactionDetailsResponse {
  invoice_code: string;
  payment_details: IPaymentDetails;
  product_details: IProductDetails;
  shipping_details: IShippingDetails;
  transaction_status: ITransactionStatus;
}

export interface IVariantVariantItems {
  image: string;
  price: number;
  stock: number;
  id?: number;
}

export interface IVariantVariantOptions {
  name: string;
  type: string[];
}

export interface ICreateProductRequest {
  id?: string;
  title: string;
  price: number | null;
  category_id: number;
  description: string;
  is_used: boolean;
  images?: string[];
  total_stock: number | null;
  is_archived: boolean;
  weight: number;
  dimension: {
    width: number;
    height: number;
    length: number;
  };
  variant: {
    variant_options: IVariantVariantOptions[];
    variant_items: IVariantVariantItems[];
  } | null;
}
