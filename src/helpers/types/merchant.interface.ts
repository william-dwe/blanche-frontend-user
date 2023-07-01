export interface IMerchantInfo {
  id: number;
  domain: string;
  name: string;
  address: {
    province: string;
    city: string;
  };
  avg_rating: number;
  join_date: string;
  num_of_product: number;
  num_of_sale: number;
  num_of_review: number;
  image: string;
}

export type IMerchantInfoResponse = IMerchantInfo;

export interface ICreateMerchantRequest {
  domain: string;
  name: string;
  address_id: number | undefined;
}

export interface ICheckStoreNameResponse {
  is_available: boolean;
  name: string;
}

export interface ICheckDomainResponse {
  is_available: boolean;
  domain: string;
}

export interface ICheckStoreNameRequest {
  name: string;
}

export interface ICheckDomainRequest {
  domain: string;
}

export interface IVoucherMerchantResponse {
  id: number;
  code: string;
  discount_nominal: number;
  expired_at: string;
  min_order_nominal: number;
}

export interface IShippingOption {
  courier_name: string;
  courier_code: string;
  is_checked: boolean;
}

export interface IDeliveryOptionsResponse {
  merchant_domain: string;
  merchant_name: string;
  delivery_options: IShippingOption[];
  total: number;
}

export type IGetShippingOptionsResponse = IShippingOption[];

export interface IGetMerchantShippingOptionsResponse {
  delivery_options: IShippingOption[];
  total: number;
  merchant_domain: string;
  merchant_name: string;
}

export type IPutShippingOptionsRequest = IShippingOption[];

export interface IMerchantProductOverview {
  avg_rating: number;
  id: number;
  max_real_price: number;
  min_real_price: number;
  num_of_sale: number;
  slug: string;
  thumbnail_img: string;
  title: string;
  total_stock: number;
  is_archived: boolean;
}

export interface IGetMerchantProductListResponse {
  total_data: number;
  total_page: number;
  current_page: number;
  products: IMerchantProductOverview[];
}

export interface IGetMerchantProductListRequest {
  page?: number;
  limit?: number;
  q?: string;
}

export interface IGetMerchantActivitiesRequest {
  page: number;
  limit: number;
}

export interface IFundActivity {
  amount: number;
  id: number;
  issued_at: Date;
  note: string;
  type: string;
}

export interface IGetMerchantActivitiesResponse {
  total_data: number;
  total_page: number;
  current_page: number;
  fund_activities: IFundActivity[];
}
