import React from 'react';
import { Row, Col } from 'antd';
import style from './index.module.scss';
import ProductDescription from './ProductDescription';
import MerchantInfo from './MerchantInfo';
import ProductGallery from '../ProductGallery';
import ProductInfo from './ProductInfo';
import ProductVariant from './ProductVariant';
import { SEO } from '../../../atoms';
import useProduct from '../../../../hooks/useProduct';
import ProductReviews from '../ProductReviews';
import ProductAction from './ProductAction';

const ProductDetail: React.FC = () => {
  const { product } = useProduct();
  return (
    <>
      <SEO
        title={`Sell ${product ? product.title : 'Product'}`}
        description={`Sell ${product ? product.title : 'Product'}`}
      />
      <Row className={style.product__detail} gutter={[32, 16]}>
        <Col xs={24} sm={24} md={24} lg={10} xl={10}>
          <ProductGallery />
          <ProductAction product={product || undefined}/>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={14}
          xl={14}
          className={style.product__detail__item}
        >
          <ProductInfo />
          <ProductVariant />
          <ProductDescription />
          <MerchantInfo />
        </Col>

        <ProductReviews />
      </Row>
    </>
  );
};

export default ProductDetail;
