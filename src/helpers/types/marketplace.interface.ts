export interface IVoucherMarketplaceResponse {
  id: number;
  code: string;
  discount_percentage: number;
  expired_at: string;
  max_discount_nominal: number;
  min_order_nominal: number;
  quota: number;
}

export interface IGetPromotionBannerResponse {
  total_data: number;
  total_page: number;
  current_page: number;
  promotion_banners: IPromotionBanner[];
}

export interface IPromotionBanner {
  id: number;
  name: string;
  description: string;
  image_url: string;
}
