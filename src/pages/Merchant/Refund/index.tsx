import React from 'react';
import { MerchantRefundList, SEO } from '../../../components';
import style from './index.module.scss';

const Refund: React.FC = () => {
  return (
    <>
      <SEO title="Refund List" description="Refund List page" />
      <div className={style.refund__page}>
        <h2 className={style.refund__page__title}>Refund List</h2>
        <MerchantRefundList />
      </div>
    </>
  );
};

export default Refund;
