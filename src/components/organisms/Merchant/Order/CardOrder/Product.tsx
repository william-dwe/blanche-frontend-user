import React from 'react';
import { textTruncate } from '../../../../../helpers/textTruncate';
import { toRupiah } from '../../../../../helpers/toRupiah';
import { IMerchantProductOverview } from '../../../../../helpers/types/merchant/merchant-order.interface';
import { Image } from '../../../../atoms';
import style from './index.module.scss';

interface ProductProps {
  productOverview: IMerchantProductOverview;
}

const Product: React.FC<ProductProps> = ({ productOverview }) => {
  return (
    <div>
      <div className={style.card__order__product}>
        <Image
          src={productOverview.product.image}
          alt="product"
          className={style.card__order__product__image}
        />
        <div className={style.card__order__product__desc}>
          <p className={style.card__order__product__desc__name}>
            {textTruncate(productOverview.product.name, 40)}
          </p>
          <p className={style.card__order__product__details__quantity}>
            {toRupiah(productOverview.product.real_price)} x{' '}
            {productOverview.product.quantity}
          </p>
        </div>
      </div>
      {productOverview.total_product > 1 && (
        <p className={style.card__order__product__more}>
          + {productOverview.total_product - 1} more
        </p>
      )}
    </div>
  );
};

export default Product;
