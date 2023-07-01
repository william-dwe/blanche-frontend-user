import React from 'react';
import { useParams } from 'react-router-dom';
import { IGetProductListResponse } from '../../../helpers/types';
import CardProduct from '../CardProduct';
import style from './index.module.scss';

interface ListCardProductProps {
  data: IGetProductListResponse;
  isLoading: boolean;
}

const CarouselProducts: React.FC<ListCardProductProps> = ({
  data,
  isLoading,
}) => {
  const { slug, store } = useParams();

  return (
    <div className={style.list__products}>
      {data.products
        .filter((product) => product.slug !== `${store}/${slug}`)
        .map((product) => (
          <CardProduct
            isLoading={isLoading}
            product={product}
            key={product.id}
          />
        ))}
    </div>
  );
};

export default CarouselProducts;
