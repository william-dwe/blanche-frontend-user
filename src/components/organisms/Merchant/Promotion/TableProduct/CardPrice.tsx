import React from 'react';
import { IMerchantProductOverview } from '../../../../../helpers/types';
import { IProductPromotion } from '../../../../../helpers/types/merchant/promotion.merchant.inteface';
import style from './index.module.scss';

interface CardPriceProps {
  product: IMerchantProductOverview | IProductPromotion;
}

const CardPrice: React.FC<CardPriceProps> = ({ product }) => {
  return (
    <div className={style.card__price}>
      {product.min_real_price === product.max_real_price ? (
        <p className={style.card__price__price}>{product.min_real_price}</p>
      ) : (
        <p className={style.card__price__price}>
          {product.min_real_price} - {product.max_real_price}
        </p>
      )}
    </div>
  );
};

export default CardPrice;
