import React from 'react';
import { textTruncate } from '../../../../helpers/textTruncate';
import { toRupiah } from '../../../../helpers/toRupiah';
import { IGetProductReviewByInvCodeResponse } from '../../../../helpers/types/review.interface';
import { Image } from '../../../atoms';
import style from './index.module.scss';

interface ProductItemProps {
  item: IGetProductReviewByInvCodeResponse;
}

const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
  return (
    <div className={style.product__item}>
      <Image
        src={item.product_img_url}
        alt={item.product_name}
        className={style.product__item__image}
      />
      <div className={style.product__item__details}>
        <p className={style.product__item__title}>
          {textTruncate(item.product_name, 31)}
        </p>
      </div>
      <p className={style.product__item__price}>
        {toRupiah(item.product_price)}
      </p>
    </div>
  );
};

export default ProductItem;
