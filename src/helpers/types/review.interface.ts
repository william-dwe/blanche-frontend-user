export interface IGetProductReviewByInvCodeResponse {
  product_id: number;
  variant_item_id: number;
  product_name: string;
  product_variant_name: string;
  product_img_url: string;
  product_price: number;
  rating: number;
  description: string;
  image_url: string;
  reviewed_at?: any;
}

export interface IGetProductReviewByInvCodeRequest {
  invoice_code: string;
}

export interface IAddProductReviewRequest {
  invoice_code: string;
  form_data: FormData;
}

export interface IGetReviewsResponse {
  total_data: number;
  total_page: number;
  current_page: number;
  reviews: IReview[];
}

export interface IGetReviewsRequest {
  domain: string;
  slug: string;
  page?: number;
  limit?: number;
  rating?: number;
  filter_by?: string;
}

export interface IReview {
  username: string;
  product_id: number;
  variant_item_id: number;
  product_name: string;
  product_variant_name: string;
  rating: number;
  description: string;
  image_url: string;
  reviewed_at: string;
}
