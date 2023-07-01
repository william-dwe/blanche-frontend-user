import { Divider } from 'antd';
import React from 'react';
import { AddPromotionPage, SEO } from '../../../../components';
import style from './index.module.scss';

const AddPromotion: React.FC = () => {
  return (
    <>
      <SEO title="Add Promotion" description="Add Promotion page" />
      <div className={style.add__voucher__page}>
        <div className={style.add__voucher__page__header}>
          <h3 className={style.add__voucher__page__header__title}>
            Create Promotion
          </h3>
          <p className={style.add__voucher__page__header__subtitle}>
            Create a promotion for your products
          </p>
        </div>
        <Divider />
        <AddPromotionPage />
      </div>
    </>
  );
};

export default AddPromotion;
