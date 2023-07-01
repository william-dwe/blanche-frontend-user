import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toRupiah } from '../../../helpers/toRupiah';
import { IProduct } from '../../../helpers/types';
import { Card, Image, StrikethroughText } from '../../atoms';
import style from './index.module.scss';
import { StarFilled } from '@ant-design/icons';
import { textTruncate } from '../../../helpers/textTruncate';
import { Skeleton } from 'antd';

interface CardProductProps {
  product: IProduct;
  isLoading: boolean;
}

const CardProduct: React.FC<CardProductProps> = ({ product, isLoading }) => {
  const [isDiscountPrice, setIsDiscountPrice] = useState(false);
  const [isRangePrice, setIsRangePrice] = useState(false);

  useEffect(() => {
    const isDiscount = !(
      product.min_real_price === product.min_discount_price &&
      product.max_real_price === product.max_discount_price
    );
    const isRange =
      product.min_real_price !== product.max_real_price &&
      product.min_discount_price !== product.max_discount_price;
    setIsDiscountPrice(isDiscount);
    setIsRangePrice(isRange);
  }, [product]);
  return (
    <Card className={style.card__product}>
      <Link to={`/${product.slug}`}>
        <Image
          src={product.thumbnail_img}
          alt={product.title}
          className={style.card__product__image}
          imageClassName={style.card__product__image__img}
        />

        <Skeleton loading={isLoading}>
          <div className={style.card__product__link}>
            <h3 className={style.card__product__title}>
              {textTruncate(product.title, 40)}
            </h3>
            <div className={style.card__product__price}>
              {isDiscountPrice ? (
                <div className={style.card__product__price__real}>
                  {isRangePrice ? (
                    <>
                      <span>{`${toRupiah(product.min_discount_price)}`}</span> -{' '}
                      <span>{`${toRupiah(product.max_discount_price)}`}</span>
                    </>
                  ) : (
                    <span>{`${toRupiah(
                      Number(product.min_discount_price),
                    )}`}</span>
                  )}
                </div>
              ) : (
                <div className={style.card__product__price__real}>
                  {isRangePrice ? (
                    <>
                      <span>{`${toRupiah(product.min_real_price)}`}</span> -{' '}
                      <span>{`${toRupiah(product.max_real_price)}`}</span>
                    </>
                  ) : (
                    <span>{`${toRupiah(Number(product.min_real_price))}`}</span>
                  )}
                </div>
              )}
              {isDiscountPrice && (
                <div className={style.card__product__price__disc}>
                  {isRangePrice ? (
                    <>
                      <StrikethroughText
                        text={`${toRupiah(product.min_real_price)} ${toRupiah(
                          product.max_real_price,
                        )}`}
                      />
                    </>
                  ) : (
                    <StrikethroughText
                      text={`${toRupiah(product?.max_real_price)}`}
                    />
                  )}
                </div>
              )}
            </div>
            <p className={style.card__product__location}>
              {product.seller_city}
            </p>
            <div className={style.card__product__details}>
              <div className={style.card__product__rating}>
                <StarFilled className={style.card__product__rating__star} />
                <span className={style.card__product__rating__avg}>
                  {product.avg_rating.toFixed(2)}
                </span>
              </div>
              |
              <p className={style.card__product__sale}>
                {product.num_of_sale} sold
              </p>
            </div>
          </div>
        </Skeleton>
      </Link>
    </Card>
  );
};

export default CardProduct;
