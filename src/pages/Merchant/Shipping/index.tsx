import React from 'react';
import { SEO, ShippingPage } from '../../../components';
import style from './index.module.scss';

const Shipping: React.FC = () => {
  return (
    <>
      <SEO title="Shipping" description="Shipping page" />
      <div className={style.shipping}>
        <h1 className={style.shipping__title}>Shipping</h1>
        <p className={style.shipping__info}>
          Decide which shipping courier is available for the buyer.
        </p>
        <ShippingPage />
      </div>
    </>
  );
};

export default Shipping;
