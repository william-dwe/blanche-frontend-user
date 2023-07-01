import React from 'react';
import style from './index.module.scss';
import TransactionList from './TransactionList';

const TransactionsPage: React.FC = () => {
  return (
    <div className={style.tp}>
      <h1 className={style.tp__title}>Transaction List</h1>
      <TransactionList />
    </div>
  );
};

export default TransactionsPage;
