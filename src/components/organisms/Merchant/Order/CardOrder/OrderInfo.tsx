import React from 'react';
import { IMerchantTransaction } from '../../../../../helpers/types/merchant/merchant-order.interface';
import style from './index.module.scss';

interface OrderInfoProps {
  transaction: IMerchantTransaction;
}

const OrderInfo: React.FC<OrderInfoProps> = ({ transaction }) => {
  return (
    <div className={style.card__order__body__info}>
      <div className={style.card__order__body__info__item}>
        <p className={style.card__order__body__info__item__title}>Kurir</p>
        <p className={style.card__order__body__info__item__text}>
          {transaction.shipping_details.delivery_option.courier_name}
        </p>
      </div>
      <div className={style.card__order__body__info__item}>
        <p className={style.card__order__body__info__item__title}>No.</p>
        <p className={style.card__order__body__info__item__text}>
          {transaction.shipping_details.delivery_option.receipt_number
            ? transaction.shipping_details.delivery_option.receipt_number
            : '-'}
        </p>
      </div>
    </div>
  );
};

export default OrderInfo;
