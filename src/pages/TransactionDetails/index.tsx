import React from 'react';
import { SEO, TransactionDetailsPage } from '../../components';
import style from './index.module.scss';

const TransactionDetails: React.FC = () => {
  return (
    <>
      <SEO title="Transaction Details" description="Transaction Details page" />
      <div className={style.td}>
        <TransactionDetailsPage />
      </div>
    </>
  );
};

export default TransactionDetails;
