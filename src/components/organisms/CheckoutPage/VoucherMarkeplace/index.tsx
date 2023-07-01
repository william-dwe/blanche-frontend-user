import React, { useState } from 'react';
import { Button } from '../../../atoms';
import { TbDiscount } from 'react-icons/tb';
import ModalVoucher from '../ModalVoucher';
import style from './index.module.scss';
import {
  IVoucherMarketplaceResponse,
  IVoucherMerchantResponse,
} from '../../../../helpers/types';
import { useGetVoucherQuery } from '../../../../app/features/marketplace/voucherApiSlice';
import useMediaQuery from '../../../../hooks/useMediaQuery';

interface VoucherMarketplaceProps {
  handleChangeMpVoucher: (
    voucher: IVoucherMarketplaceResponse | undefined,
  ) => void;
  mpVoucher: IVoucherMarketplaceResponse | undefined;
}

const VoucherMarketplace: React.FC<VoucherMarketplaceProps> = ({
  handleChangeMpVoucher,
  mpVoucher,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const handleSetVoucher = (
    voucher: IVoucherMarketplaceResponse | IVoucherMerchantResponse | undefined,
  ) => {
    if (!voucher) {
      handleChangeMpVoucher(undefined);
      return;
    }

    handleChangeMpVoucher(voucher as IVoucherMarketplaceResponse);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const { data } = useGetVoucherQuery();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (!data) {
    return <></>;
  }

  return (
    <div>
      <Button
        onClick={showModal}
        size={isMobile ? 'large' : 'small'}
        className={style.voucher__marketplace}
        type="primary"
        block
        ghost={!mpVoucher}
      >
        <TbDiscount />
        {mpVoucher ? `${mpVoucher.code}` : 'Choose Voucher'}
      </Button>
      <ModalVoucher
        data={data ?? []}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleSetVoucher={handleSetVoucher}
        handleOk={handleOk}
      />
    </div>
  );
};

export default VoucherMarketplace;
