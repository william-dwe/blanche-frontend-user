import { IProduct } from "./entity.interface";

export interface IFavoriteProduct {
  product_id: number;
  is_favorited: boolean;
}

export interface IGetFavoriteProductResponse {
  total_data: number;
  total_page: number;
  current_page: number;
  products: IProduct[];
}

export interface IGetFavoriteProductRequest {
  page? : number;
  limit? : number;
  q?: string;
  productId?: number;
}