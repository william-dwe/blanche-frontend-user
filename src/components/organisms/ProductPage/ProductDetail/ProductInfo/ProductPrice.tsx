import React from 'react';
import { toRupiah } from '../../../../../helpers/toRupiah';
import useProduct from '../../../../../hooks/useProduct';
import { StrikethroughText } from '../../../../atoms';
import style from './index.module.scss';

const ProductPrice: React.FC = () => {
  const { product, isDiscount, isRangePrice, price, discountPrice } =
    useProduct();

  return (
    <div className={style.product__info__price}>
      {isDiscount ? (
        <div className={style.product__info__price__real}>
          {isRangePrice ? (
            <>
              <span>{`${toRupiah(product?.min_discount_price)}`}</span> -{' '}
              <span>{`${toRupiah(product?.max_discount_price)}`}</span>
            </>
          ) : (
            <span>{`${toRupiah(Number(discountPrice))}`}</span>
          )}
        </div>
      ) : (
        <div className={style.product__info__price__real}>
          {isRangePrice ? (
            <>
              <span>{`${toRupiah(product?.min_real_price)}`}</span> -{' '}
              <span>{`${toRupiah(product?.max_real_price)}`}</span>
            </>
          ) : (
            <span>{`${toRupiah(Number(price))}`}</span>
          )}
        </div>
      )}
      {isDiscount && (
        <div className={style.product__info__price__disc}>
          {isRangePrice ? (
            <>
              <StrikethroughText
                text={`${toRupiah(product?.min_real_price)}`}
              />
              -
              <StrikethroughText
                text={`${toRupiah(product?.max_real_price)}`}
              />
            </>
          ) : (
            <StrikethroughText text={`${toRupiah(Number(price))}`} />
          )}
        </div>
      )}
    </div>
  );
};

export default ProductPrice;
