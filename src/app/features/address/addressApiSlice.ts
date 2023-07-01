import { IGetCitiesResponse } from '../../../helpers/types';
import {
  IGetDistrictsByCityIdResponse,
  IGetProvincesResponse,
  IGetSubdistrictsByDistrictIdResponse,
} from '../../../helpers/types/address.interface';
import { apiSlice } from '../../api/apiSlice';

export const addressApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProvinces: build.query<IGetProvincesResponse, void>({
      query: () => ({
        url: '/provinces',
        method: 'GET',
      }),
      transformResponse: (response: { data: IGetProvincesResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
    getCitiesByProvinceId: build.query<IGetCitiesResponse, number>({
      query: (provinceId) => ({
        url: `/cities/${provinceId}`,
        method: 'GET',
      }),
      transformResponse: (response: { data: IGetCitiesResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
    getDistrictByCityId: build.query<IGetDistrictsByCityIdResponse, number>({
      query: (cityId) => ({
        url: `/districts/${cityId}`,
        method: 'GET',
      }),
      transformResponse: (response: { data: IGetDistrictsByCityIdResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
    getSubDistrictByDistrictId: build.query<
      IGetSubdistrictsByDistrictIdResponse,
      number
    >({
      query: (districtId) => ({
        url: `/subdistricts/${districtId}`,
        method: 'GET',
      }),
      transformResponse: (response: {
        data: IGetSubdistrictsByDistrictIdResponse;
      }) => response.data,
      transformErrorResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetProvincesQuery,
  useGetCitiesByProvinceIdQuery,
  useGetDistrictByCityIdQuery,
  useGetSubDistrictByDistrictIdQuery,
} = addressApi;
