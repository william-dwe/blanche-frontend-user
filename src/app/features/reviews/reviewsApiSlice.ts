import {
  IAddProductReviewRequest,
  IGetProductReviewByInvCodeRequest,
  IGetProductReviewByInvCodeResponse,
  IGetReviewsRequest,
  IGetReviewsResponse,
} from '../../../helpers/types/review.interface';
import { apiSlice } from '../../api/apiSlice';

export const reviewApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProductReviewByInvCode: build.query<
      IGetProductReviewByInvCodeResponse[],
      IGetProductReviewByInvCodeRequest
    >({
      query: (body) => ({
        url: `/users/transactions/${body.invoice_code}/review`,
        method: 'GET',
      }),
      transformResponse: (response: {
        data: IGetProductReviewByInvCodeResponse[];
      }) => response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Review'],
    }),
    addProductReviewByInvCode: build.mutation<void, IAddProductReviewRequest>({
      query: (body) => ({
        url: `/users/transactions/${body.invoice_code}/review`,
        method: 'POST',
        body: body.form_data,
      }),
      transformResponse: (response: { data: void }) => response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['Review', 'Transaction Details'],
    }),
    getReviews: build.query<IGetReviewsResponse, IGetReviewsRequest>({
      query: (body) => ({
        url: `/products/${body.domain}/${body.slug}/reviews`,
        method: 'GET',
        params: {
          page: body.page,
          limit: body.limit,
          rating: body.rating,
          filter_by: body.filter_by,
        },
      }),
      transformResponse: (response: { data: IGetReviewsResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      providesTags: ['Reviews'],
    }),
  }),
});

export const {
  useGetProductReviewByInvCodeQuery,
  useAddProductReviewByInvCodeMutation,
  useGetReviewsQuery,
} = reviewApiSlice;
