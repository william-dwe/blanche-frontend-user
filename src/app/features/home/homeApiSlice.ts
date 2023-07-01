import {
  IGetCategoriesRequest,
  IGetCategoriesResponse,
  IGetCitiesResponse,
  IGetProductListRequest,
  IGetProductListResponse,
  IGetRecommendedProductsRequest,
} from '../../../helpers/types';
import { apiSlice } from '../../api/apiSlice';

const homeApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<IGetProductListResponse, IGetProductListRequest>({
      query: (params) => {
        return { url: 'products', method: 'GET', params };
      },
      transformResponse: (response: { data: IGetProductListResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
    getCategories: build.query<IGetCategoriesResponse, IGetCategoriesRequest>({
      query: (params) => {
        return { url: 'categories', method: 'GET', params };
      },
      transformResponse: (response: { data: IGetCategoriesResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
    getCities: build.query<IGetCitiesResponse, void>({
      query: () => {
        return { url: 'cities', method: 'GET' };
      },
      transformResponse: (response: { data: IGetCitiesResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
    getRecommendations: build.query<
      IGetProductListResponse,
      IGetRecommendedProductsRequest
    >({
      query: (params) => {
        return { url: 'products/recommendations', method: 'GET', params };
      },
      transformResponse: (response: { data: IGetProductListResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetCitiesQuery,
  useGetRecommendationsQuery,
} = homeApiSlice;
