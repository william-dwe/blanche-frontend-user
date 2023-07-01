import React from 'react';
import { toRupiah } from '../../../../helpers/toRupiah';
import { ICheckoutResponse } from '../../../../helpers/types';
import style from './index.module.scss';

interface SummaryProps {
  order: ICheckoutResponse;
}

const Summary: React.FC<SummaryProps> = ({ order }) => {
  return (
    <ul className={style.order__summary__content}>
      <li className={style.order__summary__content__item}>
        <span>Subtotal</span>
        <span>{toRupiah(order.sub_total)}</span>
      </li>
      <li className={style.order__summary__content__item}>
        <span>Delivery Fee</span>
        <span>{toRupiah(order.delivery_cost)}</span>
      </li>
      <li className={style.order__summary__content__item}>
        <span>Voucher Discount Store</span>
        <span>-{toRupiah(order.discount_merchant)}</span>
      </li>
      <li className={style.order__summary__content__item}>
        <span>Voucher Discount Makertplace</span>
        <span>-{toRupiah(order.discount_marketplace)}</span>
      </li>
    </ul>
  );
};

export default Summary;
