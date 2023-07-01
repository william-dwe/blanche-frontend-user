import { IFavoriteProduct, IGetFavoriteProductRequest, IGetFavoriteProductResponse } from '../../../helpers/types/favoriteproduct.interface';
import { apiSlice } from '../../api/apiSlice';

export const favoriteProductApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getFavoriteProducts: build.query<IGetFavoriteProductResponse, IGetFavoriteProductRequest>({
      query: (params) => ({
        url: '/users/favorite-products',
        method: 'GET',
        params,
      }),
      transformResponse: (response: { data: IGetFavoriteProductResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['User Favorite Products'],
    }),
    updateFavoriteProduct: build.mutation<IFavoriteProduct, IFavoriteProduct>({
      query: (body) => ({
        url: '/users/favorite-products',
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: IFavoriteProduct }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['User Favorite Products'],
    }),
  }),
});

export const {
  useGetFavoriteProductsQuery,
  useLazyGetFavoriteProductsQuery,
  useUpdateFavoriteProductMutation,
} = favoriteProductApi;
