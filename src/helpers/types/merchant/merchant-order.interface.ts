export interface IMerchantTransactionListResponse {
  total_data: number;
  total_page: number;
  current_page: number;
  transactions: IMerchantTransaction[];
}

export interface IMerchantTransactionListRequest {
  q?: string;
  start_date?: string;
  end_date?: string;
  page?: number;
  limit?: number;
  sort?: number;
}

export interface IUpdateMerchantOrderStatusRequest {
  status: number;
  receipt_number?: string;
  invoice_code: string;
  cancellation_notes?: string;
}

export interface IMerchantTransaction {
  invoice_code: string;
  total_price: number;
  buyer_username: string;
  transaction_date: Date;
  product_overview: IMerchantProductOverview;
  transaction_status: IMerchantTransactionStatus;
  shipping_details: IMerchantShippingDetails;
}

export interface IMerchantOrderUser {
  username: string;
  profile_picture: string;
}

export interface IMerchantProductDetails {
  user: IMerchantOrderUser;
  products: IMerchantProduct[];
}

export interface IMerchantDetailTransactionResponse {
  invoice_code: string;
  transaction_status: IMerchantTransactionStatus;
  product_details: IMerchantProductDetails;
  shipping_details: IMerchantShippingDetails;
  payment_details: IMerchantPaymentDetails;
}

export interface IMerchantProductOverview {
  product: IMerchantProduct;
  total_product: number;
}

export interface IMerchantProduct {
  product_id: number;
  name: string;
  image: string;
  notes: string;
  real_price: number;
  discount_price: number;
  product_slug: string;
  product_variant_id: number;
  variant_name: string;
  quantity: number;
}

export interface IMerchantShippingDetails {
  address: IMerchantAddress;
  delivery_option: IMerchantDeliveryOption;
  transaction_delivery_status: IMerchantTransactionDeliveryStatus;
}

export interface IMerchantAddress {
  name: string;
  phone: string;
  label: string;
  details: string;
  zip_code: string;
  city_name: string;
  district_name: string;
  province_name: string;
  subdistrict_name: string;
}

export interface IMerchantDeliveryOption {
  courier_name: string;
  receipt_number: string;
}

export interface IMerchantTransactionDeliveryStatus {
  on_delivery_at: Date | null;
  on_delivered_at: Date | null;
}

export interface IMerchantTransactionStatus {
  on_waited_at: Date;
  on_processed_at: Date;
  on_delivered_at: Date | null;
  on_completed_at: Date | null;
  on_canceled_at: Date | null;
  on_request_refund_at: Date | null;
  on_refunded_at: Date | null;
}

export interface IMerchantPaymentDetails {
  method: IMerchantMethod;
  summary: IMerchantSummary;
}

export interface IMerchantMethod {
  id: number;
  name: string;
  code: string;
  account_related_number: string;
}

export interface IMerchantSummary {
  subtotal: number;
  delivery_fee: number;
  marketplace_voucher_nominal: number;
  merchant_voucher_nominal: number;
  total: number;
}
