import React from 'react';
import { MdOutlineStorefront } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { IProductDetails } from '../../../../helpers/types';
import DetailProduct from '../DetailProduct';
import style from './index.module.scss';

interface ProductDetailsProps {
  productDetails: IProductDetails;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productDetails }) => {
  return (
    <div className={style.pd}>
      <div className={style.pd__header}>
        <h3 className={style.pd__header__title}>Product Details</h3>
        <div className={style.pd__header__store}>
          <MdOutlineStorefront
            size={20}
            className={style.ct__header__store__icon}
          />
          <Link
            to={`/${productDetails.merchant.domain}`}
            className={style.pd__header__store__name}
          >
            {productDetails.merchant.name}
          </Link>
        </div>
      </div>
      <div className={style.pd__list}>
        {productDetails.products.map((product) => (
          <DetailProduct product={product} key={product.product_slug} />
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
