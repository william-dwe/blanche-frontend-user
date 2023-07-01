import { Skeleton } from 'antd';
import React from 'react';
import useProduct from '../../../../../hooks/useProduct';
import { Rate } from '../../../../atoms';
import style from './index.module.scss';
import ProductPrice from './ProductPrice';

const ProductInfo: React.FC = () => {
  const { product, variant, isLoading } = useProduct();

  return (
    <div className={style.product__info}>
      <Skeleton loading={isLoading}>
        <h3>
          {product?.title}
          {variant ? ` - ${variant?.key.split(',').join(', ')}` : ''}
        </h3>
        <div className={style.product__info__rating}>
          {product?.unit_sold !== 0 && <span>Sold : {product?.unit_sold}</span>}
          {product?.rating?.avg_rating !== 0 && (
            <Rate value={product?.rating?.avg_rating} disabled />
          )}
          {product?.rating.count !== 0 && product?.rating?.count}
        </div>
        <ProductPrice />
      </Skeleton>
    </div>
  );
};

export default ProductInfo;
