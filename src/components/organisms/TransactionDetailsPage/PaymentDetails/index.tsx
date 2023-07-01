import { Divider } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { capitalizeFirstLetter } from '../../../../helpers/capitalizeFirstLetter';
import { toRupiah } from '../../../../helpers/toRupiah';
import { IPaymentDetails } from '../../../../helpers/types';
import style from './index.module.scss';

interface PaymentDetailsProps {
  paymentDetails: IPaymentDetails;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ paymentDetails }) => {
  return (
    <div className={style.pd}>
      <h3 className={style.pd__title}>Payment Details</h3>
      <div>
        <div className={style.pd__flex}>
          <p className={style.pd__flex__label}>Payment Method</p>
          <p>{capitalizeFirstLetter(paymentDetails.method.name)}</p>
        </div>
      </div>
      <Divider className={style.pd__divider} dashed />
      <div className={style.pd__details}>
        <div className={style.pd__flex}>
          <p className={style.pd__flex__label}>Subtotal</p>
          <p>{toRupiah(paymentDetails.summary.subtotal)}</p>
        </div>
        <div className={style.pd__flex}>
          <p className={style.pd__flex__label}>Delivery Fee</p>
          <p>{toRupiah(paymentDetails.summary.delivery_fee)}</p>
        </div>
        <div className={style.pd__flex}>
          <p className={style.pd__flex__label}>Merchant Voucher</p>
          <p>
            -
            {Boolean(paymentDetails.summary.merchant_voucher_nominal) &&
              toRupiah(paymentDetails.summary.merchant_voucher_nominal)}
          </p>
        </div>
        <div className={style.pd__flex}>
          <p className={style.pd__flex__label}>Marketplace Voucher</p>
          <p>
            -
            {Boolean(paymentDetails.summary.marketplace_voucher_nominal) &&
              toRupiah(paymentDetails.summary.marketplace_voucher_nominal)}
          </p>
        </div>
      </div>
      <Divider className={style.pd__divider} dashed />
      <div>
        <div className={classNames(style.pd__flex, style.pd__total)}>
          <p className={style.pd__flex__label}>Total Payment</p>
          <p>{toRupiah(paymentDetails.summary.total)}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
