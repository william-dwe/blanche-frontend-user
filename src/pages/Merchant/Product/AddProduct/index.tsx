import React from 'react';
import { useParams } from 'react-router';
import { ProductPage, SEO } from '../../../../components';
import style from './index.module.scss';

const AddProduct: React.FC = () => {
  const params = useParams();

  return (
    <>
      <SEO
        title={`Merchant ${params.id ? `Edit` : 'Add'} Product`}
        description={`Merchant ${params.id ? `Edit` : 'Add'}  product page`}
      />
      <div className={style.product}>
        <h1 className={style.product__title}>
          {params.id ? 'Edit' : 'Add'} Product
        </h1>
        <ProductPage />
      </div>
    </>
  );
};

export default AddProduct;
