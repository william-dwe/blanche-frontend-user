import { Skeleton } from 'antd';
import React from 'react';
import { textTruncate } from '../../../../../helpers/textTruncate';
import { toRupiah } from '../../../../../helpers/toRupiah';
import useProduct from '../../../../../hooks/useProduct';
import { Image } from '../../../../atoms';
import style from './index.module.scss';

interface CartItemProps {
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ quantity }) => {
  const { product, isLoading, discountPrice } = useProduct();

  if (!product) {
    return <></>;
  }
  return (
    <Skeleton loading={isLoading}>
      <div className={style.cart__item}>
        <Image
          src={product.images[0]}
          alt={product.title}
          className={style.cart__item__image}
        />
        <div className={style.cart__item__details}>
          <p className={style.cart__item__title}>
            {textTruncate(product.title, 31)}
          </p>
          <span className={style.cart__item__quantity}>{quantity} items</span>
        </div>
        <p className={style.cart__item__price}>
          {toRupiah(discountPrice ? discountPrice : product.max_discount_price)}
        </p>
      </div>
    </Skeleton>
  );
};

export default CartItem;
