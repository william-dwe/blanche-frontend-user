import { mappedSortOptions } from '../components/organisms/SortProduct/options';
import { IParams } from './types';

const searchParamsKeys = [
  'merchant_id',
  'cat',
  'seller_city_id',
  'q',
  'min_price',
  'max_price',
  'min_rating',
  'limit',
  'page',
  'status',
  'rating',
  'filter_by',
];

export const parseSearchParams = (searchParams: URLSearchParams): IParams => {
  const params: { [key: string]: string } = {};
  const ob = searchParams.get('ob');
  if (ob) {
    params.sort_dir = mappedSortOptions[ob].sort_dir;
    params.sort_by = mappedSortOptions[ob].sort_by;
  }
  searchParamsKeys.forEach((key) => {
    const value = searchParams.get(key);
    if (value) {
      params[key] = value;
    }
  });
  return params;
};

export const deleteAllSearchParams = (
  searchParams: URLSearchParams,
): URLSearchParams => {
  const keys = Array.from(searchParams.keys());
  for (const key of keys) {
    if (key !== 'q') searchParams.delete(key);
  }
  return searchParams;
};

export const parseQueryString = (
  searchParams: URLSearchParams,
): { [key: string]: string } => {
  const params: { [key: string]: string } = {};
  const keys = Array.from(searchParams.keys());
  keys.forEach((key) => {
    const value = searchParams.get(key);
    if (value) {
      params[key] = value;
    }
  });
  return params;
};
