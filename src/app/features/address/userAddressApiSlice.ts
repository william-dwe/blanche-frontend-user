import {
  ICreateUserAddressRequest,
  IGetUserAddressResponse,
  IUpdateUserAddressRequest,
} from '../../../helpers/types';
import { apiSlice } from '../../api/apiSlice';

export const userAddressApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUserAddress: build.query<IGetUserAddressResponse, void>({
      query: () => ({
        url: '/users/addresses',
        method: 'GET',
      }),
      transformResponse: (response: { data: IGetUserAddressResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Address'],
    }),
    addUserAddress: build.mutation<
      IGetUserAddressResponse,
      ICreateUserAddressRequest
    >({
      query: (body) => ({
        url: '/users/addresses',
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: IGetUserAddressResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Address'],
    }),
    updateUserAddress: build.mutation<void, IUpdateUserAddressRequest>({
      query: (body) => ({
        url: `/users/addresses/${body.id}`,
        method: 'PUT',
        body,
      }),
      transformResponse: (response: { data: void }) => response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Address'],
    }),
    setDefaultAddress: build.mutation<void, number>({
      query: (id) => ({
        url: `/users/addresses/${id}/default`,
        method: 'PATCH',
      }),
      transformResponse: (response: { data: void }) => response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Address'],
    }),
    setDefaultMerchantAddress: build.mutation<void, number>({
      query: (id) => ({
        url: `/merchants/addresses/${id}`,
        method: 'PATCH',
      }),
      transformResponse: (response: { data: void }) => response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Address'],
    }),
    deleteUserAddress: build.mutation<void, number>({
      query: (id) => ({
        url: `/users/addresses/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: { data: void }) => response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Address'],
    }),
  }),
});

export const {
  useGetUserAddressQuery,
  useSetDefaultMerchantAddressMutation,
  useAddUserAddressMutation,
  useUpdateUserAddressMutation,
  useSetDefaultAddressMutation,
  useDeleteUserAddressMutation,
} = userAddressApi;
