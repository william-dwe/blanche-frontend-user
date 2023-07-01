import { message, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCancelPaymentMutation } from '../../app/features/wallet/walletApiSlice';
import {
  Button,
  CardPaymentWallet,
  LogoIcon,
  ModalConfirm,
  SEO,
} from '../../components';
import { capitalizeFirstLetter } from '../../helpers/capitalizeFirstLetter';
import { IErrorResponse } from '../../helpers/types/response.interface';
import style from './index.module.scss';

const WalletPayment: React.FC = () => {
  const [cancelPayment, { isLoading }] = useCancelPaymentMutation();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isPageLoading, setIsPageLoading] = React.useState(true);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const [searchParams] = useSearchParams();
  const amount = searchParams.get('amount');
  const payment_id = searchParams.get('payment_id');
  const status = searchParams.get('status');

  useEffect(() => {
    if (status === 'TXN_PAID') {
      message.success('Payment Success');
      return;
    }

    if (status === 'TXN_FAILED') {
      message.error('Payment Failed');
      return;
    }

    setIsPageLoading(false);
  }, []);

  const handleCancel = async () => {
    try {
      const res = await cancelPayment({
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
    <>
      <SEO title="Wallet Payment" description="Wallet payment page" />
      <Spin spinning={isPageLoading}>
        <div className={style.wallet__payment}>
          <div className={style.wallet__payment__header}>
            <LogoIcon size="large" />
            <h1>Wallet Payment</h1>
          </div>
          <CardPaymentWallet />
          <Button danger type="link" onClick={handleModalOpen}>
            Cancel Payment
          </Button>
          <ModalConfirm
            title="Cancel Payment"
            info="Are you sure to cancel this payment?"
            isModalOpen={isModalOpen}
            handleOk={handleCancel}
            cancelButton={true}
            handleCancel={() => setIsModalOpen(false)}
            confirmButtonText="Yes"
            confirmButtonProps={{ danger: true, loading: isLoading }}
          />
        </div>
      </Spin>
    </>
  );
};

export default WalletPayment;
