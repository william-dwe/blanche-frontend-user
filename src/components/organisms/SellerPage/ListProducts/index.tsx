import { Key } from 'antd/es/table/interface';
import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { FilterSellerProduct, ProductContent } from '../../..';
import { useGetProductsQuery } from '../../../../app/features/home/homeApiSlice';
import { useAppSelector } from '../../../../app/hooks';
import style from './index.module.scss';

const limit = 20;

const ListProducts: React.FC = () => {
  const { store } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useAppSelector((state) => state.params);
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetProductsQuery({
    sort_by: params.search.sort_by,
    sort_dir: params.search.sort_dir,
    cat: params.search.cat,
    page: params.search.page,
    merchant: store,
    limit: 30,
  });

  const onSelectCategory = (selectedKeysValue: Key[]) => {
    searchParams.delete('page');
    if (!selectedKeysValue.length) {
      searchParams.delete('cat');
      setSearchParams(searchParams);
      return;
    }
    const cat = selectedKeysValue[0].toString();
    searchParams.set('cat', cat);
    setSearchParams(searchParams);
  };

  return (
    <div className={style.product__lists}>
      <div className={style.product__lists__all}>
        <h3 className={style.product__lists__all__title}>All Products</h3>
        <div className={style.product__lists__all__results}>
          <div className={style.product__lists__all__results__left}>
            <FilterSellerProduct
              onSelectCategory={onSelectCategory}
              selectedCategory={params.search.cat}
            />
          </div>
          <ProductContent
            data={products}
            isLoading={isLoading}
            isError={isError}
            error={error as Error}
            limit={limit}
          />
        </div>
      </div>
    </div>
  );
};

export default ListProducts;
