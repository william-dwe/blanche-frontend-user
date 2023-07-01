import React, { useEffect, useState } from 'react';
import { capitalizeFirstLetter } from '../../../../helpers/capitalizeFirstLetter';
import { dateToMinuteHourMonthStringDayYear } from '../../../../helpers/parseDate';
import { Card, Image, Tag } from '../../../atoms';
import style from './index.module.scss';
import { MdOutlineStorefront } from 'react-icons/md';
import { Divider } from 'antd';
import { toRupiah } from '../../../../helpers/toRupiah';
import { Link } from 'react-router-dom';
import { textTruncate } from '../../../../helpers/textTruncate';
import { ITransaction } from '../../../../helpers/types';
import { OrderStatus } from '../../Merchant/Order/OrderList';
import ComponentOnDelivered from './ComponentOnDelivered';
import ComponentOnCompleted from './ComponentOnCompleted';
import ComponentOnWaited from './ComponentOnWaited';

interface CardTransactionProps {
  transaction: ITransaction;
}

const mapStatusToColor = {
  completed: 'green',
  waiting: 'warning',
  processed: 'blue',
  canceled: 'red',
  'on delivery': 'blue',
  delivered: 'blue',
  'request refund': 'warning',
  refunded: 'green',
};

const CardTransaction: React.FC<CardTransactionProps> = ({ transaction }) => {
  const [status, setStatus] = useState('waiting');
  const [statusIdx, setStatusIdx] = useState(0);

  const MapComponent: {
    [key: number]: React.ReactNode;
  } = {
    [0]: <></>,
    [OrderStatus.TransactionStatusDelivered]: (
      <ComponentOnDelivered transaction={transaction} />
    ),
    [OrderStatus.TransactionStatusOnCompleted]: (
      <ComponentOnCompleted transaction={transaction} />
    ),
    [OrderStatus.TransactionStatusWaited]: (
      <ComponentOnWaited transaction={transaction} />
    ),
  };

  const renderComponent = () => {
    return MapComponent[statusIdx];
  };

  useEffect(() => {
    if (transaction.transaction_status.on_refunded_at) {
      setStatus('refunded');
      setStatusIdx(0);
      return;
    }

    if (transaction.transaction_status.on_completed_at) {
      setStatus('completed');
      setStatusIdx(OrderStatus.TransactionStatusOnCompleted);
      return;
    }
    if (transaction.transaction_status.on_request_refund_at) {
      setStatus('request refund');
      setStatusIdx(0);
      return;
    }
    if (transaction.transaction_status.on_canceled_at) {
      setStatus('canceled');
      setStatusIdx(0);
      return;
    }

    if (transaction.transaction_status.on_delivered_at) {
      setStatus('delivered');
      setStatusIdx(OrderStatus.TransactionStatusDelivered);
      return;
    }
    if (
      transaction.shipping_details.transaction_delivery_status.on_delivery_at
    ) {
      setStatus('on delivery');
      setStatusIdx(OrderStatus.TransactionStatusOnDelivery);
      return;
    }
    if (transaction.transaction_status.on_processed_at) {
      setStatus('processed');
      setStatusIdx(0);
      return;
    }
    if (transaction.transaction_status.on_waited_at) {
      setStatus('waiting');
      setStatusIdx(OrderStatus.TransactionStatusWaited);
      return;
    }
  }, [transaction, status, statusIdx]);

  return (
    <Card className={style.ct}>
      <div className={style.ct__header}>
        <div className={style.ct__header__flex}>
          <Link
            to={`/${transaction.merchant.domain}`}
            className={style.ct__header__store}
          >
            <MdOutlineStorefront
              size={20}
              className={style.ct__header__store__icon}
            />
            <p className={style.ct__header__store__name}>
              {transaction.merchant.name}
            </p>
          </Link>
          <p>
            {dateToMinuteHourMonthStringDayYear(
              new Date(transaction.transaction_status.on_waited_at),
              ' ',
            )}
          </p>
        </div>
        <div className={style.ct__header__flex}>
          <p className={style.ct__header__invoice}>
            {transaction.invoice_code}
          </p>
          <Tag
            className={style.ct__header__tag}
            color={mapStatusToColor[status as keyof typeof mapStatusToColor]}
          >
            {capitalizeFirstLetter(status)}
          </Tag>
        </div>
      </div>
      <Divider className={style.ct__divider} />
      <div className={style.ct__product}>
        <Image
          src={transaction.product_overview.product.image}
          alt="product"
          className={style.ct__product__image}
          imageClassName={style.ct__product__image__img}
        />
        <div className={style.ct__product__details}>
          <p className={style.ct__product__details__name}>
            {textTruncate(transaction.product_overview.product.name, 100)}
          </p>
          <p className={style.ct__product__details__quantity}>
            {`${transaction.product_overview.product.quantity} item(s)`} x{' '}
            {toRupiah(transaction.product_overview.product.discount_price)}
          </p>
          {transaction.product_overview.total_product > 1 && (
            <p className={style.ct__product__details__others}>
              +
              {transaction.product_overview.total_product -
                transaction.product_overview.product.quantity}{' '}
              other item(s)
            </p>
          )}
          {transaction.product_overview.product.variant_name && (
            <p className={style.ct__product__details__others}>
              {transaction.product_overview.product.variant_name}
            </p>
          )}
        </div>
      </div>
      <Divider className={style.ct__divider} />
      <div className={style.ct__more}>
        <div className={style.ct__more__price}>
          <p className={style.ct__more__price__text}>Total Price</p>
          <p className={style.ct__more__price__value}>
            {toRupiah(transaction.total_price)}
          </p>
        </div>
        <div className={style.ct__more__actions}>
          <Link
            to={`${transaction.invoice_code}`}
            className={style.ct__more__actions__details}
          >
            Go to Transaction Details
          </Link>
          {renderComponent()}
        </div>
      </div>
    </Card>
  );
};

export default CardTransaction;
