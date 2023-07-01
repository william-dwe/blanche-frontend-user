
import React, { useState } from 'react';
import {
  Input,
  ItemNotFound,
  ListCardProduct,
  Pagination,
  SEO,
} from '../../components';
import style from './index.module.scss';
import { useGetFavoriteProductsQuery } from '../../app/features/profile/favoriteProductApiSlice';
import { debounce } from 'lodash';

const limit = 30;

const FavoriteProduct: React.FC = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetFavoriteProductsQuery({
    limit,
    page: page,
    q: search || undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <>
      <SEO title="Favorite Product" description="Favorite Product page" />
      <div className={style.favorite_product}>
        <h2 className={style.favorite_product__title}>Favorite Products</h2>
        <Input
          placeholder="Search Favorite Products Name"
          onChange={debounce(handleChange, 300)}
          className={style.favorite_product__search_bar}
          size="middle"
        />
        <ListCardProduct data={data} isLoading={isLoading} />
        {data?.total_data && data?.total_data > limit && (
          <div className={style.favorite_product__pagination}>
            <Pagination
              total={data.total_data}
              pageSize={limit}
              current={page}
              onChange={(page) => setPage(page)}
              className={style.favorite_product__pagination__pagination}
              showSizeChanger={false}
              size="default"
            />
          </div>
        )}

        {!data?.total_data && search === '' && (
          <ItemNotFound
            title="Product Not Found"
            body="You don't have any favorited products"
          />
        )}
        {!data?.total_data && search !== '' && (
          <ItemNotFound
            title="Product Not Found"
            body="You don't have any favorited products with your search keyword"
          />
        )}
      </div>
    </>
  );
};

export default FavoriteProduct;
