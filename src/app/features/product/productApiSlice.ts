import {
  IGetCategoriesRequest,
  IGetCategoriesResponse,
  IGetCategoryAncestorsResponse,
  IGetProductListRequest,
  IGetProductListResponse,
} from '../../../helpers/types';
import {
  IProductRequest,
  IProductResponse,
  IVariantProductResponse,
} from '../../../helpers/types/response.interface';
import { apiSlice } from '../../api/apiSlice';

export const productApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProductBySlug: build.query<IProductResponse, IProductRequest>({
      query: ({ store, slug }) => ({
        url: `/products/${store}/${slug}/details`,
        method: 'GET',
      }),
      transformResponse: (response: { data: IProductResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Product'],
    }),
    getProductVariantBySlug: build.query<
      IVariantProductResponse,
      IProductRequest
    >({
      query: ({ store, slug }) => ({
        url: `/products/${store}/${slug}/variants`,
        method: 'GET',
      }),
      transformResponse: (response: { data: IVariantProductResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Product Variant'],
    }),
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
    getCategoryAncestorsBySlug: build.query<
      IGetCategoryAncestorsResponse,
      string
    >({
      query: (slug) => {
        return { url: `categories/${slug}/ancestors`, method: 'GET' };
      },
      transformResponse: (response: { data: IGetCategoryAncestorsResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetProductBySlugQuery,
  useGetProductVariantBySlugQuery,
  useGetCategoryAncestorsBySlugQuery,
} = productApi;
