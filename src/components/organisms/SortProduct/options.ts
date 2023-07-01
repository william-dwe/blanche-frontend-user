export const sortOptions = [
  {
    value: '1',
    label: 'Recommended',
  },
  {
    value: '2',
    label: 'Newest',
  },
  {
    value: '3',
    label: 'Most Buy',
  },
  {
    value: '4',
    label: 'Lowest Price',
  },
  {
    value: '5',
    label: 'Highest Price',
  },
];

interface IMappedSortOptions {
  [key: string]: {
    sort_dir: string;
    sort_by: string;
  };
}

export const mappedSortOptions: IMappedSortOptions = {
  '1': {
    sort_dir: 'desc',
    sort_by: 'avg_rating',
  },
  '2': {
    sort_dir: 'desc',
    sort_by: 'created_at',
  },
  '3': {
    sort_dir: 'desc',
    sort_by: 'num_of_sale',
  },
  '4': {
    sort_dir: 'asc',
    sort_by: 'min_discount_price',
  },
  '5': {
    sort_dir: 'desc',
    sort_by: 'min_discount_price',
  },
};
