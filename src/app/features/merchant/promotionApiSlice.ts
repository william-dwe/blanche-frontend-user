import { IParams } from '../../../helpers/types';
import {
  ICreatePromotionRequest,
  IGetPromotionResponse,
  IPromotion,
} from '../../../helpers/types/merchant/promotion.merchant.inteface';
import { apiSlice } from '../../api/apiSlice';

export const promotionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPromotionsMerchant: builder.query<IGetPromotionResponse, IParams>({
      query: (params) => ({
        url: `/merchants/promotions`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: { data: IGetPromotionResponse }) => {
        return response.data;
      },
      transformErrorResponse: (response) => response.data,
      providesTags: ['Merchant Promotions'],
    }),
    getPromotionById: builder.query<IPromotion, number>({
      query: (id) => ({
        url: `/merchants/promotions/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: { data: IPromotion }) => {
        return response.data;
      },
      transformErrorResponse: (response) => response.data,
      providesTags: ['Merchant Promotions'],
    }),
    createPromotion: builder.mutation<void, ICreatePromotionRequest>({
      query: (body) => ({
        url: `/merchants/promotions`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: void) => response,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Merchant Promotions'],
    }),
    updatePromotion: builder.mutation<void, ICreatePromotionRequest>({
      query: (body) => ({
        url: `/merchants/promotions/${body.id}`,
        method: 'PUT',
        body,
      }),
      transformResponse: (response: void) => response,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Merchant Promotions'],
    }),
    deletePromotion: builder.mutation<void, number>({
      query: (id) => ({
        url: `/merchants/promotions/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: void) => response,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Merchant Promotions'],
    }),
  }),
});

export const {
  useGetPromotionsMerchantQuery,
  useGetPromotionByIdQuery,
  useLazyGetPromotionByIdQuery,
  useCreatePromotionMutation,
  useUpdatePromotionMutation,
  useDeletePromotionMutation,
} = promotionApi;
