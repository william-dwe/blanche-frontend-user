import React, { useState } from 'react';
import { Alert, Button, Card } from '../../../atoms';
import style from './index.module.scss';
import { Divider } from 'antd';
import VoucherMarketplace from '../VoucherMarkeplace';
import Summary from './Summary';
import useMediaQuery from '../../../../hooks/useMediaQuery';
import SummaryMobile from './SummaryMobile';
import { ModalPayment } from '../../Payment';
import {
  ICheckoutResponse,
  ICheckoutSummaryMerchant,
  IUserAddress,
  IVoucherMarketplaceResponse,
} from '../../../../helpers/types';
import { toRupiah } from '../../../../helpers/toRupiah';

interface OrderSummaryProps {
  order: ICheckoutResponse;
  handleChangeMpVoucher: (
    value: IVoucherMarketplaceResponse | undefined,
  ) => void;
  mpVoucher: IVoucherMarketplaceResponse | undefined;
  handleMakeTx: () => boolean;
  errorAddress: string;
  errorDeliveryOption: string;
  merchant: ICheckoutSummaryMerchant[];
  address: IUserAddress;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  order,
  handleChangeMpVoucher,
  mpVoucher,
  handleMakeTx,
  errorAddress,
  errorDeliveryOption,
  merchant,
  address,
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    const isValid = handleMakeTx();
    if (isValid) {
      setIsModalOpen(true);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <Card className={style.order__summary}>
      <VoucherMarketplace
        handleChangeMpVoucher={handleChangeMpVoucher}
        mpVoucher={mpVoucher}
      />
      {!order.is_voucher_valid && (
        <Alert
          message="Voucher is not available, please select another voucher"
          showIcon
          type="warning"
          closable
        />
      )}
      <Divider style={{ margin: 0 }} />

      {isMobile ? (
        <SummaryMobile order={order} />
      ) : (
        <>
          <h5>Order Summary</h5>
          <Summary order={order} />
        </>
      )}

      <div className={style.order__summary__content__total}>
        <span>Total</span>
        <span>{toRupiah(order.total)}</span>
      </div>
      <Divider style={{ margin: 0 }} />
      <Button
        size={isMobile ? 'small' : 'large'}
        type="primary"
        onClick={showModal}
      >
        Choose Payment Method
      </Button>
      {errorAddress && (
        <Alert message={errorAddress} type="error" showIcon closable />
      )}

      {errorDeliveryOption && (
        <Alert message={errorDeliveryOption} type="error" showIcon closable />
      )}
      <ModalPayment
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        order={order}
        mpVoucher={mpVoucher}
        address={address}
        merchant={merchant}
      />
    </Card>
  );
};

export default OrderSummary;
