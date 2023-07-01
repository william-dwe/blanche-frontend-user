import React from 'react';
import style from './index.module.scss';
import { Image, StrikethroughText } from '../../../../atoms';
import { textTruncate } from '../../../../../helpers/textTruncate';
import { toRupiah } from '../../../../../helpers/toRupiah';
import { IOrderItem } from '../../../../../helpers/types';

interface ProductItemProps {
  item: IOrderItem;
  handleChangeMerchant: (
    merchant_id: number,
    voucher_merchant: string,
    delivery_option: string,
  ) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
  return (
    <div className={style.product__item}>
      <div className={style.product__item__details__item}>
        <div className={style.product__item__details__item__desc}>
          <Image
            src={item.image}
            alt="cart-img"
            className={style.product__item__img}
          />
          <div className={style.product__item__desc}>
            <p className={style.product__item__desc__name}>
              {textTruncate(item.name, 60)}
            </p>
            {item.variant_name && (
              <p>
                Variant : <span>{item.variant_name}</span>
              </p>
            )}
            <div className={style.product__item__details__item__qty}>
              <p>{item.quantity} pcs</p>
            </div>
          </div>
        </div>
      </div>

      <div className={style.product__item__details__info}>
        <div className={style.product__item__details__info__price}>
          <p className={style.product__item__price}>
            {item.discount_price !== 0 &&
            item.discount_price !== item.real_price
              ? toRupiah(Number(item.discount_price))
              : toRupiah(Number(item.real_price))}
          </p>
          {item.discount_price !== 0 &&
            item.discount_price !== item.real_price && (
              <StrikethroughText
                className={style.product__item__disc__price}
                text={toRupiah(Number(item.real_price))}
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
