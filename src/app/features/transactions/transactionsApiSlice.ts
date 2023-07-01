import {
  IGetTransactionListRequest,
  IGetTransactionListResponse,
  IGetTransactionDetailsResponse,
  IUpdateTransactionStatus,
  IGetWaitingForPaymentResponse,
  IGetWaitingForPaymentDetailsReponse,
} from '../../../helpers/types';
import { apiSlice } from '../../api/apiSlice';

export const transactionsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getTransactions: build.query<
      IGetTransactionListResponse,
      IGetTransactionListRequest
    >({
      query: (params) => ({
        url: '/users/transactions',
        method: 'GET',
        params,
      }),
      transformResponse: (response: { data: IGetTransactionListResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Transaction'],
    }),
    getTransactionDetails: build.query<IGetTransactionDetailsResponse, string>({
      query: (slug) => ({
        url: `/users/transactions/${slug}`,
        method: 'GET',
      }),
      transformResponse: (response: { data: IGetTransactionDetailsResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Transaction Details'],
    }),
    UpdateTransactionStatus: build.mutation<null, IUpdateTransactionStatus>({
      query: (body) => ({
        url: `/users/transactions/${body.invoice_code}/status`,
        method: 'PUT',
        body,
      }),
      transformResponse: (response: { data: null }) => response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Transaction', 'Transaction Details'],
    }),
    getWaitingForPayment: build.query<IGetWaitingForPaymentResponse, void>({
      query: () => ({
        url: '/orders/waiting-for-payment',
        method: 'GET',
      }),
      transformResponse: (response: { data: IGetWaitingForPaymentResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Transaction'],
    }),
    getWaitingForPaymentDetails: build.query<
      IGetWaitingForPaymentDetailsReponse,
      string
    >({
      query: (id) => ({
        url: `/orders/waiting-for-payment/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: {
        data: IGetWaitingForPaymentDetailsReponse;
      }) => response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Transaction Details'],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useGetTransactionDetailsQuery,
  useUpdateTransactionStatusMutation,
  useGetWaitingForPaymentDetailsQuery,
  useGetWaitingForPaymentQuery,
} = transactionsApi;
