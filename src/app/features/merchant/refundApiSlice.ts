import { IParams } from '../../../helpers/types';
import {
  IActionRefundResponse,
  IGetRefundResponse,
  IPostRefundMessageRequest,
  IRefundMessageResponse,
} from '../../../helpers/types/refund.interface';
import { apiSlice } from '../../api/apiSlice';

export const refundApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getRefundMerchantList: build.query<IGetRefundResponse, IParams>({
      query: (params) => ({
        url: '/merchants/refund-requests',
        method: 'GET',
        params,
      }),
      transformResponse: (response: { data: IGetRefundResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Refunds'],
    }),
    merchantAcceptRequest: build.mutation<IActionRefundResponse, number>({
      query: (id) => ({
        url: `/merchants/refund-requests/${id}/accept`,
        method: 'POST',
      }),
      transformResponse: (response: { data: IActionRefundResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Refunds', 'Message'],
    }),
    merchantRejectRequest: build.mutation<IActionRefundResponse, number>({
      query: (id) => ({
        url: `/merchants/refund-requests/${id}/reject`,
        method: 'POST',
      }),
      transformResponse: (response: { data: IActionRefundResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Refunds', 'Message'],
    }),
    merchantGetMessageRefundRequest: build.query<
      IRefundMessageResponse,
      number
    >({
      query: (id) => ({
        url: `/merchants/refund-requests/${id}/messages`,
        method: 'GET',
      }),
      transformResponse: (response: { data: IRefundMessageResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Message'],
    }),
    merchantPostMessageRefundRequest: build.mutation<
      null,
      IPostRefundMessageRequest
    >({
      query: ({ id, ...body }) => ({
        url: `/merchants/refund-requests/${id}/messages`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: null }) => response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Message'],
    }),
  }),
});

export const {
  useGetRefundMerchantListQuery,
  useMerchantAcceptRequestMutation,
  useMerchantRejectRequestMutation,
  useMerchantGetMessageRefundRequestQuery,
  useLazyMerchantGetMessageRefundRequestQuery,
  useMerchantPostMessageRefundRequestMutation,
} = refundApiSlice;
