import { Divider, StepProps, Steps } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { dateToMinuteHourMonthStringDayYear } from '../../../../../helpers/parseDate';
import style from './index.module.scss';
import './override.scss';
import { IMerchantDetailTransactionResponse } from '../../../../../helpers/types/merchant/merchant-order.interface';
import ComponentOnDelivery from './ComponentBasedOnStatus/ComponentOnDelivery';
import ComponentOnCanceled from './ComponentBasedOnStatus/ComponentOnCanceled';
import ComponentOnProcessed from './ComponentBasedOnStatus/ComponentOnProcessed';
import ComponentOnWaited from './ComponentBasedOnStatus/ComponentOnWaited';
import ComponentOnCompleted from './ComponentBasedOnStatus/ComponentOnCompleted';
import ComponentOnRequestRefund from './ComponentBasedOnStatus/ComponentOnRequestRefund';
import ComponentOnDelivered from './ComponentBasedOnStatus/ComponentOnDelivered';

export enum EnumOrderStatus {
  TransactionStatusWaited = 1,
  TransactionStatusProcessed = 2,
  TransactionStatusOnDelivery = 3,
  TransactionStatusDelivered = 4,
  TransactionStatusOnCompleted = 5,
  TransactionStatusCanceled = 6,
  TransactionStatusRequestRefund = 7,
  TransactionStatusOnRefund = 8,
}

export enum EnumUpdateStatus {
  TransactionStatusWaited = 1,
  TransactionStatusProcessed = 2,
  TransactionStatusOnCancel = 3,
  TransactionStatusOnDelivery = 4,
  TransactionStatusDelivered = 5,
  TransactionStatusOnRequestRefund = 6,
  TransactionStatusOnCompleted = 7,
  TransactionStatusOnRefund = 8,
}

interface ShippingDetailsProps {
  transaction: IMerchantDetailTransactionResponse;
}

const OrderStatus: React.FC<ShippingDetailsProps> = ({ transaction }) => {
  const [current, setCurrent] = useState(-1);
  const [isCanceled, setIsCanceled] = useState(false);
  const [isRefund, setIsRefund] = useState(false);

  const MapComponent: {
    [key: number]: React.ReactNode;
  } = {
    [EnumOrderStatus.TransactionStatusWaited]: (
      <ComponentOnWaited transaction={transaction} />
    ),
    [EnumOrderStatus.TransactionStatusProcessed]: (
      <ComponentOnProcessed transaction={transaction} />
    ),
    [EnumOrderStatus.TransactionStatusCanceled]: (
      <ComponentOnCanceled transaction={transaction} />
    ),

    [EnumOrderStatus.TransactionStatusOnDelivery]: (
      <ComponentOnDelivery transaction={transaction} />
    ),
    [EnumOrderStatus.TransactionStatusDelivered]: <ComponentOnDelivered />,
    [EnumOrderStatus.TransactionStatusRequestRefund]: (
      <ComponentOnRequestRefund transaction={transaction} />
    ),
    [EnumOrderStatus.TransactionStatusOnCompleted]: <ComponentOnCompleted />,
    [EnumOrderStatus.TransactionStatusOnRefund]: (
      <ComponentOnRequestRefund transaction={transaction} />
    ),
  };
  const [statusIdx, setStatusIdx] = useState(0);

  const renderComponent = () => {
    return MapComponent[statusIdx];
  };
  useEffect(() => {
    if (transaction.transaction_status.on_canceled_at) {
      setCurrent(1);
      setIsCanceled(true);
      setStatusIdx(EnumOrderStatus.TransactionStatusCanceled);
      return;
    }

    if (transaction.transaction_status.on_completed_at) {
      setCurrent(4);
      setStatusIdx(EnumOrderStatus.TransactionStatusOnCompleted);
      return;
    }
    if (transaction.transaction_status.on_refunded_at) {
      setCurrent(4);
      setIsRefund(true);
      setStatusIdx(EnumOrderStatus.TransactionStatusOnRefund);
      return;
    }

    if (transaction.transaction_status.on_request_refund_at) {
      setCurrent(3);
      setIsRefund(true);
      setStatusIdx(EnumOrderStatus.TransactionStatusRequestRefund);
      return;
    }

    if (
      transaction.shipping_details.transaction_delivery_status.on_delivered_at
    ) {
      setCurrent(3);
      setStatusIdx(EnumOrderStatus.TransactionStatusDelivered);
      return;
    }

    if (
      transaction.shipping_details.transaction_delivery_status.on_delivery_at
    ) {
      setCurrent(2);
      setStatusIdx(EnumOrderStatus.TransactionStatusOnDelivery);
      return;
    }

    if (transaction.transaction_status.on_processed_at) {
      setCurrent(1);
      setStatusIdx(EnumOrderStatus.TransactionStatusProcessed);
      return;
    }
    if (transaction.transaction_status.on_waited_at) {
      setCurrent(0);
      setStatusIdx(EnumOrderStatus.TransactionStatusWaited);
      return;
    }
  }, [transaction]);

  const items: StepProps[] = [
    {
      title: 'Order Created',
      description: transaction.transaction_status.on_waited_at
        ? dateToMinuteHourMonthStringDayYear(
            new Date(transaction.transaction_status.on_waited_at),
            ' ',
          )
        : '-',
    },
    {
      title: 'Order Processed',
      description: transaction.transaction_status.on_processed_at
        ? dateToMinuteHourMonthStringDayYear(
            new Date(transaction.transaction_status.on_processed_at),
            ' ',
          )
        : '-',
    },

    {
      title: 'Order On Delivery',
      description: transaction.shipping_details.transaction_delivery_status
        .on_delivery_at
        ? dateToMinuteHourMonthStringDayYear(
            new Date(
              transaction.shipping_details.transaction_delivery_status.on_delivery_at,
            ),
            ' ',
          )
        : '-',
    },

    {
      title: 'Order Delivered',
      description: transaction.shipping_details.transaction_delivery_status
        .on_delivered_at
        ? dateToMinuteHourMonthStringDayYear(
            new Date(
              transaction.shipping_details.transaction_delivery_status.on_delivered_at,
            ),
            ' ',
          )
        : '-',
    },
    {
      title: 'Order Completed',
      description: transaction.transaction_status.on_completed_at
        ? dateToMinuteHourMonthStringDayYear(
            new Date(transaction.transaction_status.on_completed_at),
            ' ',
          )
        : '-',
    },
  ];

  const itemsRefund: StepProps[] = [
    {
      title: 'Order Created',
      description: transaction.transaction_status.on_waited_at
        ? dateToMinuteHourMonthStringDayYear(
            new Date(transaction.transaction_status.on_waited_at),
            ' ',
          )
        : '-',
    },
    {
      title: 'Order Processed',
      description: transaction.transaction_status.on_processed_at
        ? dateToMinuteHourMonthStringDayYear(
            new Date(transaction.transaction_status.on_processed_at),
            ' ',
          )
        : '-',
    },

    {
      title: 'Order On Delivery',
      description: transaction.shipping_details.transaction_delivery_status
        .on_delivery_at
        ? dateToMinuteHourMonthStringDayYear(
            new Date(
              transaction.shipping_details.transaction_delivery_status.on_delivery_at,
            ),
            ' ',
          )
        : '-',
    },

    {
      title: 'Buyer Request Refund',
      description: transaction.transaction_status.on_request_refund_at
        ? dateToMinuteHourMonthStringDayYear(
            new Date(transaction.transaction_status.on_request_refund_at),
            ' ',
          )
        : '-',
    },
    {
      title: 'Order Refunded',
      description: transaction.transaction_status.on_refunded_at
        ? dateToMinuteHourMonthStringDayYear(
            new Date(transaction.transaction_status.on_refunded_at),
            ' ',
          )
        : '-',
    },
  ];

  const itemsCanceled: StepProps[] = [
    {
      title: 'Order Created',
      description: transaction.transaction_status.on_waited_at
        ? dateToMinuteHourMonthStringDayYear(
            new Date(transaction.transaction_status.on_waited_at),
            ' ',
          )
        : '-',
    },
    {
      title: 'Order Canceled',
      description: transaction.transaction_status.on_canceled_at
        ? dateToMinuteHourMonthStringDayYear(
            new Date(transaction.transaction_status.on_canceled_at),
            ' ',
          )
        : '-',
    },
  ];

  return (
    <div className={style.os}>
      <div className={style.os__tracking}>
        <div className={style.os__tracking__sub}>
          <h4 className={style.os__tracking__title}>Order History</h4>
          <p className={style.os__tracking__code}>
            {transaction.shipping_details.delivery_option.courier_name.toUpperCase()}
            {transaction.shipping_details.delivery_option.receipt_number &&
              ` - ${transaction.shipping_details.delivery_option.receipt_number}`}
          </p>
        </div>
        <div className={classNames(style.os__tracking__status, 'delivery')}>
          <Steps
            current={current}
            items={isCanceled ? itemsCanceled : isRefund ? itemsRefund : items}
            labelPlacement="vertical"
            progressDot
            className={style.os__tracking__steps}
            responsive
          />
        </div>
      </div>

      {renderComponent()}
      <Divider />
    </div>
  );
};

export default OrderStatus;
