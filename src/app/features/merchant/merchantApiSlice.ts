import {
  ICheckDomainRequest,
  ICheckDomainResponse,
  ICheckStoreNameRequest,
  ICheckStoreNameResponse,
  ICreateMerchantRequest,
  IDeliveryOptionsResponse,
  IGetShippingOptionsResponse,
  IMerchantInfoResponse,
  IVoucherMerchantResponse,
  IPutShippingOptionsRequest,
  IGetMerchantProductListResponse,
  IGetMerchantProductListRequest,
  ICreateProductRequest,
  IGetMerchantActivitiesResponse,
  IGetMerchantActivitiesRequest,
} from '../../../helpers/types';
import { IGetMerchantCategoriesResponse } from '../../../helpers/types';
import {
  ICheckProductNameResponse,
  IUploadProductImageResponse,
  ICheckProductNameRequest,
  IGetProductByIDResponse,
  IGetVariantsByIDResponse,
  IUpdateProductStatusRequest,
} from '../../../helpers/types/merchant/product.interface';
import { IWithdrawFundRequest } from '../../../helpers/types/merchant/wallet.interface';
import { apiSlice } from '../../api/apiSlice';

export const merchantApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getMerchantInfo: build.query<IMerchantInfoResponse, string>({
      query: (domain) => ({
        url: `/merchants/${domain}/profile`,
        method: 'GET',
      }),
      transformResponse: (response: { data: IMerchantInfoResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Merchant'],
    }),
    getMerchantProfile: build.query<IMerchantInfoResponse, void>({
      query: () => ({
        url: '/merchants/profile',
        method: 'GET',
      }),
      transformResponse: (response: { data: IMerchantInfoResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Merchant Profile'],
    }),
    createMerchant: build.mutation<void, ICreateMerchantRequest>({
      query: (body) => ({
        url: '/merchants/register',
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: void }) => response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Merchant'],
    }),
    getMerchantCategories: build.query<IGetMerchantCategoriesResponse, string>({
      query: (domain) => ({
        url: `/merchants/${domain}/categories`,
        method: 'GET',
      }),
      transformResponse: (response: { data: IGetMerchantCategoriesResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Merchant'],
    }),
    checkStoreName: build.mutation<
      ICheckStoreNameResponse,
      ICheckStoreNameRequest
    >({
      query: (body) => ({
        url: '/merchants/register/check-name',
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: ICheckStoreNameResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
    checkDomain: build.mutation<ICheckDomainResponse, ICheckDomainRequest>({
      query: (body) => ({
        url: '/merchants/register/check-domain',
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: ICheckDomainResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
    getVoucherMerchant: build.query<IVoucherMerchantResponse[], string>({
      query: (domain) => ({
        url: `merchants/${domain}/vouchers`,
        method: 'GET',
      }),
      transformResponse: (response: { data: IVoucherMerchantResponse[] }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
    getDeliveryOptions: build.query<IDeliveryOptionsResponse, string>({
      query: (domain) => ({
        url: `merchants/${domain}/deliveries`,
        method: 'GET',
      }),
      transformResponse: (response: { data: IDeliveryOptionsResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
    getShippingOptions: build.query<IGetShippingOptionsResponse, void>({
      query: () => ({
        url: '/merchants/deliveries',
        method: 'GET',
      }),
      transformResponse: (response: { data: IGetShippingOptionsResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Shipping'],
    }),
    putShippingOptions: build.mutation<null, IPutShippingOptionsRequest>({
      query: (body) => ({
        url: '/merchants/deliveries',
        method: 'PUT',
        body,
      }),
      transformResponse: (response: { data: null }) => response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Shipping'],
    }),
    getProductList: build.query<
      IGetMerchantProductListResponse,
      IGetMerchantProductListRequest
    >({
      query: (params) => ({
        url: '/merchants/products',
        method: 'GET',
        params,
      }),
      transformResponse: (response: {
        data: IGetMerchantProductListResponse;
      }) => response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Product'],
    }),
    createProduct: build.mutation<null, ICreateProductRequest>({
      query: (body) => ({
        url: '/merchants/products',
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: null }) => response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Product'],
    }),
    uploadProductImage: build.mutation<IUploadProductImageResponse, FormData>({
      query: (body) => ({
        url: '/merchants/products/images',
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: IUploadProductImageResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
    checkProductName: build.mutation<
      ICheckProductNameResponse,
      ICheckProductNameRequest
    >({
      query: (body) => ({
        url: '/merchants/products/check-name',
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: ICheckProductNameResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
    deleteProduct: build.mutation<null, string>({
      query: (id) => ({
        url: `/merchants/products/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: { data: null }) => response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Product'],
    }),
    getProductByID: build.query<IGetProductByIDResponse, string>({
      query: (id) => ({
        url: `/merchants/products/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: { data: IGetProductByIDResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Product'],
    }),
    getVariantsByID: build.query<IGetVariantsByIDResponse, number>({
      query: (id) => ({
        url: `/merchants/products/${id}/variants`,
        method: 'GET',
      }),
      transformResponse: (response: { data: IGetVariantsByIDResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Product'],
    }),
    updateProduct: build.mutation<null, ICreateProductRequest>({
      query: ({ id, ...body }) => ({
        url: `/merchants/products/${id}`,
        method: 'PUT',
        body,
      }),
      transformResponse: (response: { data: null }) => response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Product'],
    }),
    getMerchantFundActivities: build.query<
      IGetMerchantActivitiesResponse,
      IGetMerchantActivitiesRequest
    >({
      query: (params) => ({
        url: '/merchants/funds/activities',
        method: 'GET',
        params,
      }),
      transformResponse: (response: { data: IGetMerchantActivitiesResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Wallet'],
    }),
    getMerchantFundBalance: build.query<null, void>({
      query: () => ({
        url: '/merchants/funds/balance',
        method: 'GET',
      }),
      transformResponse: (response: { data: null }) => response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Wallet'],
    }),
    updateProductStatus: build.mutation<null, IUpdateProductStatusRequest>({
      query: ({ id, ...body }) => ({
        url: `/merchants/products/${id}/status`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: { data: null }) => response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Product'],
    }),
    withdrawFund: build.mutation<null, IWithdrawFundRequest>({
      query: (body) => ({
        url: '/merchants/funds/withdraw',
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: null }) => response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Wallet'],
    }),
    updateMerchantProfile: build.mutation<null, FormData>({
      query: (body) => ({
        url: '/merchants/profile',
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: { data: null }) => response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Merchant Profile'],
    }),
  }),
});

export const {
  useGetMerchantInfoQuery,
  useGetMerchantCategoriesQuery,
  useCreateMerchantMutation,
  useCheckStoreNameMutation,
  useCheckDomainMutation,
  useGetVoucherMerchantQuery,
  useGetDeliveryOptionsQuery,
  useGetShippingOptionsQuery,
  usePutShippingOptionsMutation,
  useGetProductListQuery,
  useCreateProductMutation,
  useUploadProductImageMutation,
  useCheckProductNameMutation,
  useDeleteProductMutation,
  useGetProductByIDQuery,
  useGetVariantsByIDQuery,
  useUpdateProductMutation,
  useGetMerchantFundActivitiesQuery,
  useGetMerchantFundBalanceQuery,
  useGetMerchantProfileQuery,
  useLazyGetMerchantProfileQuery,
  useUpdateProductStatusMutation,
  useWithdrawFundMutation,
  useUpdateMerchantProfileMutation,
} = merchantApi;
