export interface ICheckoutRequest {
  product_id: number;
  variant_item_id?: number | null;
  quantity: number;
  notes?: string | null;
}

export interface IOrderMerchant {
  merchant_id: number;
  merchant_name: string;
  merchant_image: string;
  merchant_domain: string;
}

export interface IOrderItem {
  cart_item_id: string;
  product_id: string;
  product_slug: string;
  variant_item_id: string;
  variant_name: string;
  merchant_id: string;
  merchant_domain: string;
  merchant_name: string;
  merchant_image: string;
  merchant_city_id: string;
  image: string;
  name: string;
  weight: number;
  real_price: number;
  discount_price: number;
  quantity: number;
  stock: number;
  notes: string;
  is_valid: boolean;
}

export interface IOrderDeliveryService {
  delivery_option: string;
  name: string;
  service: string;
  description: string;
  merchant_city: string;
  user_city: string;
  etd: string;
  note: string;
}

export interface IOrder {
  merchant: IOrderMerchant;
  items: IOrderItem[];
  delivery_service: IOrderDeliveryService;
  sub_total: number;
  delivery_cost: number;
  discount: number;
  total: number;
  is_voucher_invalid: boolean;
}

export interface ICheckoutResponse {
  order_code: string;
  orders: IOrder[];
  sub_total: number;
  delivery_cost: number;
  discount_merchant: number;
  discount_marketplace: number;
  total: number;
  is_order_eligible: boolean;
  is_voucher_valid: boolean;
  is_order_valid: boolean;
}

export interface ICheckoutSummaryMerchant {
  merchant_id: number;
  voucher_merchant: string;
  delivery_option: string;
}

export interface ICheckoutSummaryRequest {
  order_code: string;
  address_id: number;
  merchants: ICheckoutSummaryMerchant[];
  voucher_marketplace: string;
}

export interface IPayRequest {
  order_code: string;
  address_id: number;
  merchants: ICheckoutSummaryMerchant[];
  voucher_marketplace: string;
  payment_total: number;
  payment_method_code: string;
  payment_account_number: string;
}

export interface IPayResponse {
  amount: number;
  payment_id: number;
  order_code: string;
  payment_redirect_url: string;
}
