import { Divider } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { capitalizeFirstLetter } from '../../../../../helpers/capitalizeFirstLetter';
import { toRupiah } from '../../../../../helpers/toRupiah';
import { IMerchantPaymentDetails } from '../../../../../helpers/types/merchant/merchant-order.interface';
import { Card } from '../../../../atoms';
import style from './index.module.scss';

interface PaymentDetailProps {
  paymentDetail: IMerchantPaymentDetails;
}

const PaymentDetail: React.FC<PaymentDetailProps> = ({ paymentDetail }) => {
  return (
    <Card className={style.pd}>
      <h3 className={style.pd__title}>Payment Details</h3>
      <div>
        <div className={style.pd__flex}>
          <p className={style.pd__flex__label}>Payment Method</p>
          <p>{capitalizeFirstLetter(paymentDetail.method.name)}</p>
        </div>
      </div>
      <Divider className={style.pd__divider} dashed />
      <div className={style.pd__details}>
        <div className={style.pd__flex}>
          <p className={style.pd__flex__label}>Subtotal</p>
          <p>{toRupiah(paymentDetail.summary.subtotal)}</p>
        </div>
        <div className={style.pd__flex}>
          <p className={style.pd__flex__label}>Delivery Fee</p>
          <p>{toRupiah(paymentDetail.summary.delivery_fee)}</p>
        </div>
        <div className={style.pd__flex}>
          <p className={style.pd__flex__label}>Merchant Voucher</p>
          <p>
            -
            {Boolean(paymentDetail.summary.merchant_voucher_nominal) &&
              toRupiah(paymentDetail.summary.merchant_voucher_nominal)}
          </p>
        </div>
      </div>
      <Divider className={style.pd__divider} dashed />
      <div>
        <div className={classNames(style.pd__flex, style.pd__total)}>
          <p className={style.pd__flex__label}>Total Payment</p>
          <p>{toRupiah(paymentDetail.summary.total)}</p>
        </div>
      </div>
    </Card>
  );
};

export default PaymentDetail;
