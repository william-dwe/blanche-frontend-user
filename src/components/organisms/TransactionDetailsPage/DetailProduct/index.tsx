import { Card, Divider } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { textTruncate } from '../../../../helpers/textTruncate';
import { toRupiah } from '../../../../helpers/toRupiah';
import { IProductOverview } from '../../../../helpers/types';
import { Image } from '../../../atoms';
import style from './index.module.scss';

interface DetailProductProps {
  product: IProductOverview;
}

const DetailProduct: React.FC<DetailProductProps> = ({ product }) => {
  return (
    <Card className={style.dp}>
      <div className={style.dp__product}>
        <Image
          src={product.image}
          alt="product"
          className={style.dp__product__image}
          imageClassName={style.dp__product__image__img}
        />
        <div className={style.dp__product__details}>
          <p className={style.dp__product__details__name}>
            {textTruncate(product.name)}
          </p>
          <p className={style.dp__product__details__quantity}>
            {`${product.quantity} items`} x {toRupiah(product.discount_price)}
          </p>
          {product.variant_name && (
            <p className={style.ct__product__details__others}>
              {product.variant_name}
            </p>
          )}
          {product.notes && (
            <p className={style.dp__product__details__notes}>
              Notes: <span>{product.notes}</span>
            </p>
          )}
        </div>
      </div>
      <Divider className={style.dp__divider} />
      <div className={style.dp__more}>
        <div className={style.dp__more__price}>
          <p className={style.dp__more__price__text}>Total Price</p>
          <p className={style.dp__more__price__value}>
            {toRupiah(product.quantity * product.discount_price)}
          </p>
        </div>
        <div className={style.dp__more__actions}>
          <Link
            to={`/${product.product_slug}`}
            className={style.dp__more__actions__details}
          >
            Go to Product Page
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default DetailProduct;
