import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout } from '../features/auth/authSlice';
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  credentials: 'include',
});
import Cookies from 'universal-cookie';

const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions);

  const cookie = new Cookies();

  if (result.error) {
    const { status } = result.error;
    if (status === 403) {
      window.location.href = '/';
    } else if (status === 401) {
      const is_logged_in = cookie.get('is_user_logged_in');

      if (!is_logged_in) {
        api.dispatch(logout());
        return result;
      }

      const refreshResult = await baseQuery('/refresh', api, extraOptions);
      result = await baseQuery(args, api, extraOptions);
      if (refreshResult.error) {
        api.dispatch(logout());
      }
      return result;
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Product',
    'Product Variant',
    'Merchant',
    'Cart',
    'User',
    'User Favorite Products',
    'Address',
    'SLP',
    'Transaction',
    'Wallet',
    'Cart Home',
    'Delivery',
    'Merchant Transaction',
    'Merchant Transaction Detail',
    'Shipping',
    'Transaction Details',
    'Reviews',
    'Review',
    'Merchant Vouchers',
    'Merchant Promotions',
    'Refunds',
    'Merchant Profile',
    'Message',
  ],
  endpoints: () => ({}),
});
