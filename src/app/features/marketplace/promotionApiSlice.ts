import { IGetPromotionBannerResponse, IParams } from '../../../helpers/types';
import { apiSlice } from '../../api/apiSlice';

export const promotionApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getPromotions: build.query<IGetPromotionBannerResponse, IParams | void >({
      query: () => ({
        url: '/marketplace/promotion-banners',
        method: 'GET',
      }),
      transformResponse: (response: { data: IGetPromotionBannerResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
  }),
});

export const { useGetPromotionsQuery } = promotionApi;
