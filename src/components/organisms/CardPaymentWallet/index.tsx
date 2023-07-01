import { message } from 'antd';
import React, { useState } from 'react';
import { PinInput } from 'react-input-pin-code';
import { useSearchParams } from 'react-router-dom';
import { Form } from '../..';
import {
  useMakePaymentMutation,
  useValidatePinMutation,
} from '../../../app/features/wallet/walletApiSlice';
import { capitalizeFirstLetter } from '../../../helpers/capitalizeFirstLetter';
import { toRupiah } from '../../../helpers/toRupiah';
import { IErrorResponse } from '../../../helpers/types/response.interface';
import { Button, Card, Image } from '../../atoms';
import style from './index.module.scss';

const initialPin = ['', '', '', '', '', ''];

const CardPaymentWallet: React.FC = () => {
  const [pin, setPin] = useState(initialPin);

  const [validatePIN, { isLoading }] = useValidatePinMutation();
  const [makePayment, { isLoading: isLoadingPayment }] =
    useMakePaymentMutation();

  const [searchParams] = useSearchParams();
  const amount = searchParams.get('amount');
  const payment_id = searchParams.get('payment_id');

  const handlePay = async () => {
    try {
      await validatePIN({ pin: pin.join('') }).unwrap();
      const res = await makePayment({
        amount: Number(amount),
        payment_id: payment_id ? payment_id : '',
      }).unwrap();

      window.location.replace(
        `/payment/wallet?payment_id=${res.payment_id}&amount=${res.amount}&status=${res.status}`,
      );
    } catch (error) {
      const err = error as IErrorResponse;

      message.error(capitalizeFirstLetter(err.message));
    }
  };

  return (
    <Card className={style.card__payment__wallet}>
      <div className={style.card__payment__wallet__header}>
        <h1>Input PIN</h1>
      </div>
      <Image
        src="/assets/png/pay.png"
        alt="icon-pay"
        imageClassName={style.card__payment__wallet__image}
      />
      <div className={style.card__payment__wallet__body}>
        <p className={style.card__payment__wallet__body__item}>
          Payment ID : {payment_id}
        </p>
        <p className={style.card__payment__wallet__body__total}>
          {toRupiah(Number(amount))}
        </p>
        <Form
          onFinish={handlePay}
          className={style.card__payment__wallet__body__form}
        >
          <div className={style.card__payment__wallet__body__pin}>
            <p>Enter your wallet pin </p>
            <PinInput
              values={pin}
              onChange={(value, index, values) => setPin(values)}
              inputClassName={style.aw__code}
              containerClassName={style.aw__container}
              mask
              showState={false}
              placeholder=""
            />
          </div>
          <Button
            type="primary"
            className={style.card__payment__wallet__body__button}
            block
            htmlType="submit"
            size="large"
            shape="round"
            loading={isLoading || isLoadingPayment}
            disabled={isLoading || isLoadingPayment}
          >
            Pay Now
          </Button>
        </Form>
      </div>
    </Card>
  );
};

export default CardPaymentWallet;
