import React from 'react';
import { textTruncate } from '../../../../../helpers/textTruncate';
import { IMerchantProductOverview } from '../../../../../helpers/types';
import { IProductPromotion } from '../../../../../helpers/types/merchant/promotion.merchant.inteface';
import { Image } from '../../../../atoms';
import style from './index.module.scss';

interface CardProductProps {
  product: IMerchantProductOverview | IProductPromotion;
}

const CardProduct: React.FC<CardProductProps> = ({ product }) => {
  return (
    <div className={style.card__product}>
      <Image
        src={product.thumbnail_img}
        alt={product.title}
        className={style.card__product__image}
      />
      <div className={style.card__product__details}>
        <p className={style.card__product__title}>
          {textTruncate(product.title, 31)}
        </p>
      </div>
    </div>
  );
};

export default CardProduct;
