import React from 'react';
import { ProductListPage, SEO } from '../../../../components';
import style from './index.module.scss';

const ProductList: React.FC = () => {
  return (
    <>
      <SEO
        title="Merchant Product List"
        description="Merchant Product List page"
      />
      <div className={style.pl}>
        <ProductListPage />
      </div>
    </>
  );
};

export default ProductList;
