import { Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { TbDiscount } from 'react-icons/tb';
import { useGetVoucherMerchantQuery } from '../../../../../app/features/merchant/merchantApiSlice';
import {
  ICheckoutSummaryMerchant,
  IOrder,
  IVoucherMarketplaceResponse,
  IVoucherMerchantResponse,
} from '../../../../../helpers/types';
import { Button } from '../../../../atoms';
import ModalVoucher from '../../ModalVoucher';
import style from './index.module.scss';

interface VoucherStoreProps {
  order: IOrder;
  merchant: ICheckoutSummaryMerchant[];
  handleSetVoucher: (voucher: IVoucherMerchantResponse | undefined) => void;
}

const VoucherStore: React.FC<VoucherStoreProps> = ({
  order,
  merchant,
  handleSetVoucher,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const [merchantItem, setMerchantItem] = useState<ICheckoutSummaryMerchant>();

  const handleSetVoucherMerchant = (
    voucher: IVoucherMerchantResponse | IVoucherMarketplaceResponse | undefined,
  ) => {
    if (!voucher) {
      handleSetVoucher(undefined);
      return;
    }

    handleSetVoucher(voucher as IVoucherMerchantResponse);
  };
  const { data, isLoading } = useGetVoucherMerchantQuery(
    order.merchant.merchant_domain,
  );

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!merchant) return;

    const voucher = merchant.find(
      (merchant) => merchant.merchant_id === order.merchant.merchant_id,
    );

    setMerchantItem(voucher);
  }, [merchant]);

  if (!data) {
    if (isLoading) {
      return <Skeleton.Button />;
    }

    return <></>;
  }

  return (
    <div>
      <Button
        onClick={showModal}
        size="large"
        className={style.voucher__marketplace}
        type="primary"
        block
        ghost={!merchantItem?.voucher_merchant}
      >
        <TbDiscount />
        {merchantItem?.voucher_merchant
          ? `${merchantItem?.voucher_merchant}`
          : 'Choose Voucher'}
      </Button>
      <ModalVoucher
        data={data}
        handleSetVoucher={handleSetVoucherMerchant}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
    </div>
  );
};

export default VoucherStore;
