import { StepProps, Steps } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { dateToMinuteHourMonthStringDayYear } from '../../../../helpers/parseDate';
import { IShippingDetails } from '../../../../helpers/types';
import style from './index.module.scss';
import './override.scss';  
interface ShippingDetailsProps {
  shippingDetails: IShippingDetails;
}

const ShippingDetails: React.FC<ShippingDetailsProps> = ({
  shippingDetails,
}) => {
  const [current, setCurrent] = useState(-1);

  useEffect(() => {
    if (shippingDetails.transaction_delivery_status.on_delivered_at) {
      setCurrent(1);
      return;
    }
    if (shippingDetails.transaction_delivery_status.on_delivery_at) {
      setCurrent(0);
      return;
    }
  }, []);

  const items: StepProps[] = [
    {
      title: 'Package Shipped',
      description: shippingDetails.transaction_delivery_status.on_delivery_at
        ? dateToMinuteHourMonthStringDayYear(
            new Date(
              shippingDetails.transaction_delivery_status.on_delivery_at,
            ),
            ' ',
          )
        : '-',
    },
    {
      title: 'Package Delivered',
      description: shippingDetails.transaction_delivery_status.on_delivered_at
        ? dateToMinuteHourMonthStringDayYear(
            new Date(
              shippingDetails.transaction_delivery_status.on_delivered_at,
            ),
            ' ',
          )
        : '-',
    },
  ];

  return (
    <div className={style.sd}>
      <h3 className={style.sd__title}>Shipping Details</h3>
      <div className={style.sd__address}>
        <h4 className={style.sd__sub}>Address</h4>
        <div className={style.sd__address__contact}>
          <p className={style.sd__address__contact__name}>
            {shippingDetails.address.name}
          </p>
          <p className={style.sd__address__contact__phone}>
            {shippingDetails.address.phone}
          </p>
        </div>
        <div className={style.sd__address__details}>
          <p className={style.sd__address__details__street}>
            {shippingDetails.address.details}
          </p>
          <p className={style.sd__address__details__city}>
            {shippingDetails.address.subdistrict_name},{' '}
            {shippingDetails.address.province_name}{' '}
            {shippingDetails.address.zip_code}
          </p>
        </div>
      </div>
      <div className={style.sd__tracking}>
        <div className={style.sd__tracking__sub}>
          <h4 className={style.sd__tracking__title}>Tracking</h4>
          <p className={style.sd__tracking__code}>
            {shippingDetails.delivery_option.courier_name.toUpperCase()}
            {shippingDetails.delivery_option.receipt_number &&
              ` - ${shippingDetails.delivery_option.receipt_number}`}
          </p>
        </div>
        <div className={classNames(style.sd__tracking__status, 'delivery')}>
          <Steps
            current={current}
            items={items}
            labelPlacement="vertical"
            progressDot
            className={style.sd__tracking__steps}
            responsive
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;
