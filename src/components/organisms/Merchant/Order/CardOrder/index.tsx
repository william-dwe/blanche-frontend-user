import { Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { MdPerson } from 'react-icons/md';
import { capitalizeFirstLetter } from '../../../../../helpers/capitalizeFirstLetter';
import { dateToDayMonthStringYear } from '../../../../../helpers/parseDate';
import { toRupiah } from '../../../../../helpers/toRupiah';
import { Card, Tag } from '../../../../atoms';
import ComponentOnCanceled from './ComponentBasedOnStatus/ComponentOnCanceled';
import ComponentOnDelivery from './ComponentBasedOnStatus/ComponentOnDelivery';
import ComponentOnProcessed from './ComponentBasedOnStatus//ComponentOnProcessed';
import ComponentOnWaited from './ComponentBasedOnStatus//ComponentOnWaited';
import style from './index.module.scss';
import OrderInfo from './OrderInfo';
import Product from './Product';
import { CardOrderProps, mapStatusToColor, OrderStatus } from './utils';
import { Link } from 'react-router-dom';
import ComponentOnDelivered from './ComponentBasedOnStatus/ComponentOnDelivered';
import ComponentOnCompleted from './ComponentBasedOnStatus/ComponentOnCompleted';
import ComponentOnRequestRefund from './ComponentBasedOnStatus/ComponentOnRequestRefund';

const CardOrder: React.FC<CardOrderProps> = ({ transaction }) => {
  const MapComponent: {
    [key: number]: React.ReactNode;
  } = {
    [OrderStatus.TransactionStatusWaited]: (
      <ComponentOnWaited transaction={transaction} />
    ),
    [OrderStatus.TransactionStatusProcessed]: (
      <ComponentOnProcessed transaction={transaction} />
    ),
    [OrderStatus.TransactionStatusCanceled]: <ComponentOnCanceled />,

    [OrderStatus.TransactionStatusOnDelivery]: (
      <ComponentOnDelivery transaction={transaction} />
    ),
    [OrderStatus.TransactionStatusDelivered]: <ComponentOnDelivered />,
    [OrderStatus.TransactionStatusRequestRefund]: <ComponentOnRequestRefund />,
    [OrderStatus.TransactionStatusOnCompleted]: <ComponentOnCompleted />,
    [OrderStatus.TransactionStatusOnRefund]: (
      <ComponentOnDelivery transaction={transaction} />
    ),
  };
  const [status, setStatus] = useState('need to be processed');
  const [statusIdx, setStatusIdx] = useState(0);

  const renderComponent = () => {
    return MapComponent[statusIdx];
  };

  useEffect(() => {
    if (transaction.transaction_status.on_canceled_at) {
      setStatus('canceled');
      setStatusIdx(OrderStatus.TransactionStatusCanceled);
      return;
    }
    if (transaction.transaction_status.on_completed_at) {
      setStatus('completed');
      setStatusIdx(OrderStatus.TransactionStatusOnCompleted);
      return;
    }
    if (transaction.transaction_status.on_refunded_at) {
      setStatus('refunded');
      setStatusIdx(OrderStatus.TransactionStatusRequestRefund);
      return;
    }
    if (transaction.transaction_status.on_request_refund_at) {
      setStatus('request refund');
      setStatusIdx(OrderStatus.TransactionStatusRequestRefund);
      return;
    }

    if (
      transaction.shipping_details.transaction_delivery_status.on_delivered_at
    ) {
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
    if (
      transaction.transaction_status.on_processed_at &&
      !transaction.transaction_status.on_canceled_at
    ) {
      setStatus('need to be delivered');
      setStatusIdx(OrderStatus.TransactionStatusProcessed);
      return;
    }
    if (transaction.transaction_status.on_waited_at) {
      setStatus('need to be processed');
      setStatusIdx(OrderStatus.TransactionStatusWaited);
      return;
    }
  }, [transaction, statusIdx]);

  return (
    <Card className={style.card__order}>
      <div className={style.card__order__header}>
        <div className={style.card__order__header__flex}>
          <div className={style.card__order__header__store}>
            <MdPerson
              size={20}
              className={style.card__order__header__store__icon}
            />
            <p className={style.card__order__header__user__name}>
              {transaction.buyer_username}
            </p>{' '}
            /
            <p className={style.card__order__header__no_invoice}>
              {transaction.invoice_code}
            </p>
            /<p className={style.card__order__header__date}></p>
          </div>
          {dateToDayMonthStringYear(
            new Date(transaction.transaction_status.on_waited_at),
            ' ',
          )}
        </div>
        <div className={style.card__order__header__flex}>
          <Tag
            className={style.ct__header__tag}
            color={mapStatusToColor[statusIdx]}
          >
            {capitalizeFirstLetter(status)}
          </Tag>
        </div>
      </div>
      <Divider className={style.card__order__divider} />
      <div className={style.card__order__body}>
        <Product productOverview={transaction.product_overview} />

        <div className={style.card__order__body__address}>
          <p className={style.card__order__body__address__title}>Address</p>
          <p className={style.card__order__body__address__text}>
            {transaction.shipping_details.address.label} (
            {transaction.shipping_details.address.phone})
          </p>
          <p className={style.card__order__body__address__text}>
            {transaction.shipping_details.address.details &&
              `${transaction.shipping_details.address.details}, `}
            {transaction.shipping_details.address.subdistrict_name},{' '}
            {transaction.shipping_details.address.district_name},{' '}
            {transaction.shipping_details.address.city_name},{' '}
            {transaction.shipping_details.address.province_name},{' '}
            {transaction.shipping_details.address.zip_code}
          </p>
        </div>
        <OrderInfo transaction={transaction} />
      </div>
      <Divider className={style.card__order__divider} />
      <div className={style.card__order__more}>
        <div className={style.card__order__more__price}>
          <p className={style.card__order__more__price__text}>Total Price</p>
          <p className={style.card__order__more__price__value}>
            {toRupiah(transaction.total_price)}
          </p>
        </div>
      </div>
      <Divider className={style.card__order__divider} />

      <div className={style.card__order__actions}>
        <Link
          className={style.card__order__actions__link}
          to={`/merchant/order/${transaction.invoice_code}`}
        >
          Detail Order
        </Link>

        {renderComponent()}
      </div>
    </Card>
  );
};

export default CardOrder;
