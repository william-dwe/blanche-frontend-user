import {
  ICreateVoucherRequest,
  IGetVoucherRequest,
  IGetVoucherResponse,
  IVoucher,
} from '../../../helpers/types/merchant/voucher.interface';
import { apiSlice } from '../../api/apiSlice';

export const voucherApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createVoucher: build.mutation<void, ICreateVoucherRequest>({
      query: (body) => ({
        url: '/merchants/vouchers',
        method: 'POST',
        body,
      }),
      transformResponse: (response: void) => response,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Merchant Vouchers'],
    }),
    getMerchantVouchers: build.query<IGetVoucherResponse, IGetVoucherRequest>({
      query: (params) => ({
        url: '/merchants/vouchers',
        method: 'GET',
        params,
      }),
      transformResponse: (response: { data: IGetVoucherResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Merchant Vouchers'],
    }),
    deleteVoucher: build.mutation<void, { code: string }>({
      query: (body) => ({
        url: `/merchants/vouchers/${body.code}`,
        method: 'DELETE',
      }),
      transformResponse: (response: void) => response,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Merchant Vouchers'],
    }),
    getMerchantVoucherByCode: build.query<IVoucher, { code: string }>({
      query: (params) => ({
        url: `/merchants/vouchers/${params.code}`,
      }),
      transformResponse: (response: { data: IVoucher }) => response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Merchant Vouchers'],
    }),
    updateMerchantVoucher: build.mutation<void, ICreateVoucherRequest>({
      query: (body) => ({
        url: `/merchants/vouchers/${body.code}`,
        method: 'PUT',
        body,
      }),
      transformResponse: (response: void) => response,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Merchant Vouchers'],
    }),
  }),
});

export const {
  useCreateVoucherMutation,
  useGetMerchantVouchersQuery,
  useDeleteVoucherMutation,
  useGetMerchantVoucherByCodeQuery,
  useLazyGetMerchantVoucherByCodeQuery,
  useUpdateMerchantVoucherMutation,
} = voucherApi;
