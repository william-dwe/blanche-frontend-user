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
    makeRequestRefund: build.mutation<void, FormData>({
      query: (formData) => ({
        url: '/users/refund-requests',
        method: 'POST',
        body: formData,
      }),
      transformResponse: (response: { data: void }) => response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Refunds', 'Transaction'],
    }),
    getRefundList: build.query<IGetRefundResponse, IParams>({
      query: (params) => ({
        url: '/users/refund-requests',
        method: 'GET',
        params,
      }),
      transformResponse: (response: { data: IGetRefundResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Refunds'],
    }),
    userApproveResult: build.mutation<IActionRefundResponse, number>({
      query: (id) => ({
        url: `/users/refund-requests/${id}/accept`,
        method: 'POST',
      }),
      transformResponse: (response: { data: IActionRefundResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Refunds', 'Message'],
    }),
    userRejectResult: build.mutation<IActionRefundResponse, number>({
      query: (id) => ({
        url: `/users/refund-requests/${id}/reject`,
        method: 'POST',
      }),
      transformResponse: (response: { data: IActionRefundResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Refunds', 'Message'],
    }),
    userCancelRefund: build.mutation<void, number>({
      query: (id) => ({
        url: `/users/refund-requests/${id}/cancel`,
        method: 'POST',
      }),
      transformResponse: (response: { data: void }) => response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Refunds', 'Message'],
    }),
    getMessageRefundRequest: build.query<IRefundMessageResponse, number>({
      query: (id) => ({
        url: `/users/refund-requests/${id}/messages`,
        method: 'GET',
      }),
      transformResponse: (response: { data: IRefundMessageResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Message'],
    }),
    postMessageRefundRequest: build.mutation<null, IPostRefundMessageRequest>({
      query: ({ id, ...body }) => ({
        url: `/users/refund-requests/${id}/messages`,
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
  useMakeRequestRefundMutation,
  useGetRefundListQuery,
  useUserApproveResultMutation,
  useUserRejectResultMutation,
  useUserCancelRefundMutation,
  useLazyGetMessageRefundRequestQuery,
  usePostMessageRefundRequestMutation,
  useGetMessageRefundRequestQuery,
} = refundApiSlice;
