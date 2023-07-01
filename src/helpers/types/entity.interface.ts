import { IMerchantInfo } from './merchant.interface';

export interface IUser {
  id?: number;
  fullname?: string;
  email?: string;
  password: string;
  address?: string;
  photo?: string;
  role?: string;
}

export interface IMerchant {
  name: string;
  domain: string;
  image_url: string;
  avg_rating: number;
}

export interface ICategory {
  name: string;
  url: string;
}

export interface ICategoryItem {
  id: number;
  name: string;
  slug: string;
  image_url: string;
  children: ICategoryItem[] | null;
}

export interface IImage {
  image_url: string;
}

export interface IRating {
  avg_rating: number;
  count: number;
}

export interface IDimension {
  width: number;
  length: number;
  height: number;
}

export interface IVariantOption {
  name: string;
  type: string[];
}

export interface IVariantItem {
  id: number;
  is_archived: boolean;
  image: string;
  key: string;
  discount_price: number;
  price: number;
  stock: number;
}

export interface IVariant {
  variant_options: IVariantOption[];
  variant_items: IVariantItem[];
}

export interface IProduct {
  id: number;
  merchant_id: number;
  category_id: number;
  category: ICategory;
  title: string;
  description: string;
  min_real_price: number;
  max_real_price: number;
  is_my_product: boolean;
  min_discount_price: number;
  max_discount_price: number;
  num_of_sale: number;
  avg_rating: number;
  thumbnail_img: string;
  slug: string;
  seller_city: string;
}

export interface ICategory {
  id: number;
  name: string;
  slug: string;
  image_url: string;
  children: ICategory[] | null;
  unit_sold: number;
  images: IImage[];
  weight: number;
  dimension: IDimension;
  SKU: string;
  favorite_count: number;
  total_stock: number;
  status: string;
  rating: IRating;
  merchant: IMerchant;
}

export interface ICategoryProduct {
  name: string;
  url: string;
}

export interface IProductDetail {
  id: number;
  merchant_id: number;
  category_id: number;
  title: string;
  min_real_price: number;
  max_real_price: number;
  min_discount_price: number;
  is_my_product: boolean;
  max_discount_price: number;
  category: ICategoryProduct;
  images: string[];
  is_used: boolean;
  SKU: string;
  description: string;
  favorite_count: number;
  is_favorited: boolean;
  unit_sold: number;
  total_stock: number;
  is_archived: boolean;
  rating: IRating;
  weight: number;
  dimension: IDimension;
  variants: IVariant;
  merchant: IMerchantInfo;
}

export interface IProduct {
  id: number;
  title: string;
  min_real_price: number;
  max_real_price: number;
  min_discount_price: number;
  max_discount_price: number;
  num_of_sale: number;
  avg_rating: number;
  thumbnail_img: string;
  slug: string;
  seller_city: string;
}

export interface IAddress {
  province: string;
  city: string;
}

export interface IRating {
  avg_rating: number;
  count: number;
}

export interface IDimension {
  width: number;
  length: number;
  height: number;
}

export interface IVariantOption {
  name: string;
  type: string[];
}

export interface IVariantItem {
  id: number;
  is_archived: boolean;
  image: string;
  price: number;
  stock: number;
}

export interface IVariant {
  variant_options: IVariantOption[];
  variant_items: IVariantItem[];
}

export interface IProductDetail {
  id: number;
  title: string;
  min_real_price: number;
  max_real_price: number;
  min_discount_price: number;
  max_discount_price: number;
  category: ICategoryProduct;
  images: string[];
  is_used: boolean;
  SKU: string;
  description: string;
  favorite_count: number;
  is_favorited: boolean;
  unit_sold: number;
  total_stock: number;
  is_archived: boolean;
  avg_rating: number;
  weight: number;
  dimension: IDimension;
  variants: IVariant;
  merchant: IMerchantInfo;
}

export interface ICity {
  id: number;
  ro_id: number;
  name: string;
}

export interface ISealabsPayAccounts {
  id: number;
  card_number: string;
  name_on_card: string;
  active_date: string;
  is_default: boolean;
}

export interface IDetails {
  name: string;
  phone: string;
  birthdate: Date;
  gender: string;
}

export interface IAccount {
  email: string;
}

export interface IDetails {
  name: string;
  phone: string;
  birthdate: Date;
  gender: string;
}

export interface IAccount {
  email: string;
}

export interface ITransactionStatus {
  on_waited_at: Date;
  on_processed_at: Date | null;
  on_delivered_at: Date | null;
  on_completed_at: Date | null;
  on_canceled_at: Date | null;
  on_request_refund_at: Date | null;
  on_refunded_at: Date | null;
}

export interface ITransaction {
  invoice_code: string;
  merchant: {
    name: string;
    domain: string;
    city: string;
  };
  product_overview: {
    product: {
      discount_price: number;
      image: string;
      name: string;
      product_slug: string;
      real_price: number;
      variant_name: string;
      quantity: number;
    };
    total_product: number;
  };
  transaction_status: ITransactionStatus;
  total_price: number;
  shipping_details: {
    transaction_delivery_status: {
      on_delivered_at: Date | null;
      on_delivery_at: Date | null;
    };
  };
}

export interface IProductOverview {
  name: string;
  image: string;
  real_price: number;
  variant_name: string;
  quantity: number;
  discount_price: number;
  product_slug: string;
  notes: string;
}

export interface IPaymentDetails {
  method: {
    account_related_number: number;
    name: string;
  };
  summary: {
    delivery_fee: number;
    marketplace_voucher_nominal: number;
    merchant_voucher_nominal: number;
    subtotal: number;
    total: number;
  };
}

export interface IProductDetails {
  merchant: {
    domain: string;
    name: string;
  };
  products: IProductOverview[];
}

export interface IShippingDetails {
  address: {
    city_name: string;
    details: string;
    district_name: string;
    label: string;
    name: string;
    phone: string;
    province_name: string;
    subdistrict_name: string;
    zip_code: string;
  };
  delivery_option: {
    courier_name: string;
    receipt_number?: string;
  };
  transaction_delivery_status: {
    on_delivered_at: Date | null;
    on_delivery_at: Date | null;
  };
}

export interface ITransactionStatus {
  on_canceled_at: Date | null;
  on_completed_at: Date | null;
  on_delivered_at: Date | null;
  on_processed_at: Date | null;
  on_waited_at: Date;
}

export interface IUpdateTransactionStatus {
  invoice_code: string;
  status: number;
}
