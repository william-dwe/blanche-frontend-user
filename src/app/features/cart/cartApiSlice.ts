import {
  ICartHomeResponse,
  ICartResponse,
  ICreateCartRequest,
  IUpdateCartItemRequest,
  IUpdateCartRequest,
} from '../../../helpers/types';
import { apiSlice } from '../../api/apiSlice';

const cartApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCarts: build.query<ICartResponse, void>({
      query: () => ({
        url: '/carts',
        method: 'GET',
      }),
      transformResponse: (response: { data: ICartResponse }) => response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Cart'],
    }),
    createCarts: build.mutation<ICartResponse, ICreateCartRequest>({
      query: (body) => ({
        url: '/carts',
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: ICartResponse }) => response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Cart', 'Cart Home'],
    }),
    updateCarts: build.mutation<ICartResponse, IUpdateCartRequest[]>({
      query: (body) => ({
        url: '/carts',
        method: 'PUT',
        body,
      }),
      transformResponse: (response: { data: ICartResponse }) => response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Cart', 'Cart Home'],
    }),
    updateCartItem: build.mutation<ICartResponse, IUpdateCartItemRequest>({
      query: (body) => ({
        url: `/carts/${body.cart_item_id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: { data: ICartResponse }) => response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Cart', 'Cart Home'],
    }),
    deleteCartItem: build.mutation<ICartResponse, number>({
      query: (cart_item_id) => ({
        url: `/carts/${cart_item_id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: { data: ICartResponse }) => response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Cart', 'Cart Home'],
    }),
    deleteSelectedCart: build.mutation<ICartResponse, void>({
      query: () => ({
        url: `/carts`,
        method: 'DELETE',
      }),
      transformResponse: (response: { data: ICartResponse }) => response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Cart', 'Cart Home'],
    }),
    getCartHome: build.query<ICartHomeResponse, void>({
      query: () => ({
        url: '/carts/home',
        method: 'GET',
      }),
      transformResponse: (response: { data: ICartHomeResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Cart Home'],
    }),
  }),
});

export const {
  useGetCartsQuery,
  useCreateCartsMutation,
  useUpdateCartsMutation,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
  useDeleteSelectedCartMutation,
  useGetCartHomeQuery,
} = cartApi;
