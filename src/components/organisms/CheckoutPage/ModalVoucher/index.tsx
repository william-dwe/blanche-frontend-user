import { Radio, RadioChangeEvent } from 'antd';
import React, { useState } from 'react';
import {
  IVoucherMarketplaceResponse,
  IVoucherMerchantResponse,
} from '../../../../helpers/types';
import { Button } from '../../../atoms';
import { Modal, ModalHeader } from '../../../molecules';
import CardVoucher from './CardVoucher';
import style from './index.module.scss';

interface ModalVoucherProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  data: IVoucherMarketplaceResponse[] | IVoucherMerchantResponse[];
  handleSetVoucher: (
    data: IVoucherMarketplaceResponse | IVoucherMerchantResponse | undefined,
  ) => void;
  handleOk: () => void;
}

const ModalVoucher: React.FC<ModalVoucherProps> = ({
  isModalOpen,
  handleCancel,
  data,
  handleSetVoucher,
  handleOk,
}) => {
  const [voucher, setVoucher] = useState<
    IVoucherMarketplaceResponse | IVoucherMerchantResponse
  >();

  const handleChange = (e: RadioChangeEvent) => {
    setVoucher(e.target.value);
  };

  const handleUncheck = (
    item: IVoucherMarketplaceResponse | IVoucherMerchantResponse,
  ) => {
    if (item === voucher) {
      setVoucher(undefined);
      handleSetVoucher(undefined);
    }
  };

  const handleReset = () => {
    if (!voucher) {
      return;
    }

    setVoucher(undefined);
    handleSetVoucher(undefined);
  };

  const handleSubmit = () => {
    handleSetVoucher(voucher);
    handleOk();
  };

  return (
    <Modal
      open={isModalOpen}
      centered
      onOk={handleSubmit}
      onCancel={handleCancel}
      className={style.voucher__modal}
      width={400}
    >
      <ModalHeader title="Choose Voucher" />

      <Radio.Group
        className={style.voucher__modal__body}
        value={voucher}
        onChange={handleChange}
      >
        {data.length > 0 ? (
          data.map(
            (item: IVoucherMarketplaceResponse | IVoucherMerchantResponse) => (
              <Radio
                value={item}
                key={item.code}
                onClick={() => handleUncheck(item)}
              >
                <CardVoucher item={item} voucher={voucher} />
              </Radio>
            ),
          )
        ) : (
          <div className={style.voucher__modal__empty}>
            <p>There is no voucher available</p>
          </div>
        )}
      </Radio.Group>
      {voucher && (
        <div className={style.voucher__modal__reset}>
          <Button onClick={handleReset} type="primary" danger>
            Reset
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default ModalVoucher;
