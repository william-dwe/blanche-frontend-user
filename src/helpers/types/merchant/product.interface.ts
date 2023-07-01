import { UploadFile } from 'antd/es/upload';

export interface IProductForm {
  category_id: string[];
  condition: string;
  description: string;
  dimension: {
    width: number;
    height: number;
    length: number;
  };
  images: UploadFile[];
  title: string;
  price: number | null;
  status: boolean;
  stock?: number;
  weight: number;
  firstSelect?: string[];
  firstVariant?: string;
  secondSelect?: string[];
  secondVariant?: string;
  variantItems?: IProductVariant[];
}

export interface IProductVariant {
  image: any;
  price: number;
  stock: number;
}

export interface IUploadProductImageResponse {
  image_url: string;
}

export interface ICheckProductNameRequest {
  product_name: string;
}

export interface ICheckProductNameResponse {
  is_available: boolean;
}

export interface IGetProductByIDResponse {
  id: number;
  categories: number[];
  description: string;
  dimension: {
    width: number;
    height: number;
    length: number;
  };
  images: string[];
  is_archived: boolean;
  is_used: boolean;
  price: number;
  title: string;
  total_stock: number;
  weight: number;
}

export interface IGetVariantsByIDResponse {
  variant_items: {
    id: number;
    price: number;
    stock: number;
    key: string;
    image: string;
  }[];
  variant_options: {
    name: string;
    type: string[];
  }[];
}

export interface IUpdateProductStatusRequest {
  is_archived: boolean;
  id: string;
}
