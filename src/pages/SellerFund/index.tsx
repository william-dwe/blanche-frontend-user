import React from 'react';
import { SellerFundPage, SEO } from '../../components';
import style from './index.module.scss';

const SellerFund: React.FC = () => {
  return (
    <>
      <SEO title="Merchant Fund" description="Merchant Fund page" />
      <div className={style.sf}>
        <SellerFundPage />
      </div>
    </>
  );
};

export default SellerFund;
