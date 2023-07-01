import React from 'react';
import { useGetProductsQuery } from '../../../../app/features/home/homeApiSlice';
import { ListCardProduct } from '../../../molecules';
import style from './index.module.scss';

const SellerProducts: React.FC = () => {
  const { data, isLoading } = useGetProductsQuery({ limit: 6 });

  return (
    <div className={style.seller__products}>
      <h2 className={style.seller__products__header}>More from the store </h2>
      {data && <ListCardProduct isLoading={isLoading} data={data} />}
    </div>
  );
};

export default SellerProducts;
