import React from 'react';
import { OrderList, SEO } from '../../../components';
import './override.scss';
import style from './index.module.scss';

const Order: React.FC = () => {
  return (
    <>
      <SEO title="Merchant Order" description="Merchant Order page" />
      <div className={style.order__page}>
        <h2 className={style.order__page__title}>Order List</h2>
        <OrderList />
      </div>
    </>
  );
};

export default Order;
