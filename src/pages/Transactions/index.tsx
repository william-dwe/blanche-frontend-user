import React from 'react';
import { SEO, TransactionsPage } from '../../components';
import style from './index.module.scss';

const Transactions: React.FC = () => {
  return (
    <>
      <SEO title="Transaction List" description="Transactions page" />
      <div className={style.transactions}>
        <TransactionsPage />
      </div>
    </>
  );
};

export default Transactions;
