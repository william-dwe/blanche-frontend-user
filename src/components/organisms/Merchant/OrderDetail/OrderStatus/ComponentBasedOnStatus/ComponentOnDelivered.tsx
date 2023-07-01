import React from 'react';
import { Button } from '../../../../../atoms';
import style from '../index.module.scss';

const ComponentOnDelivered: React.FC = () => {
  return (
    <div className={style.os__status}>
      <div className={style.os__status__item}>
        <p className={style.os__status__item__text}>Order is delivered</p>
        <p className={style.os__status__item__desc}>
          The order has been delivered to the customer. Customer will confirm
          the order or request a refund if the order is not as expected.
        </p>{' '}
      </div>
      <div className={style.os__status__action}>
        <Button type="primary" size="large" ghost disabled>
          Order Delivered
        </Button>
      </div>
    </div>
  );
};

export default ComponentOnDelivered;
