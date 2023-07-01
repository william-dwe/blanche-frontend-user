import { IVoucherMarketplaceResponse } from '../../../helpers/types';
import { apiSlice } from '../../api/apiSlice';

export const voucherApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getVoucher: build.query<IVoucherMarketplaceResponse[], void>({
      query: () => ({
        url: '/marketplace/vouchers',
        method: 'GET',
      }),
      transformResponse: (response: { data: IVoucherMarketplaceResponse[] }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
  }),
});

export const { useGetVoucherQuery } = voucherApiSlice;
