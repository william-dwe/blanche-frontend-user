import {
  IGetDashboardRequest,
  IGetDashboardCustomerSatisfactionsResponse,
  IGetDashboardResponsivenessResponse,
  IGetDashboardSalesResponse,
} from '../../../helpers/types';

import { apiSlice } from '../../api/apiSlice';

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getDashboardResponsiveness: build.query<
      IGetDashboardResponsivenessResponse,
      IGetDashboardRequest
    >({
      query: (params) => ({
        url: 'merchants/dashboards/responsiveness',
        method: 'GET',
        params,
      }),
      transformResponse: (response: {
        data: IGetDashboardResponsivenessResponse;
      }) => response.data,
      transformErrorResponse: (response) => response.data,
    }),
    getDashboardSales: build.query<
      IGetDashboardSalesResponse,
      IGetDashboardRequest
    >({
      query: (params) => ({
        url: 'merchants/dashboards/sales',
        method: 'GET',
        params,
      }),
      transformResponse: (response: { data: IGetDashboardSalesResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
    getDashboardCustomerSatisfactions: build.query<
      IGetDashboardCustomerSatisfactionsResponse,
      IGetDashboardRequest
    >({
      query: (params) => ({
        url: 'merchants/dashboards/customer-satisfactions',
        method: 'GET',
        params,
      }),
      transformResponse: (response: {
        data: IGetDashboardCustomerSatisfactionsResponse;
      }) => response.data,
      transformErrorResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetDashboardResponsivenessQuery,
  useGetDashboardSalesQuery,
  useGetDashboardCustomerSatisfactionsQuery,
} = dashboardApi;
