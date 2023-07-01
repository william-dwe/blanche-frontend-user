import React, { useState } from 'react';
import { Button } from '../../../../../atoms';
import style from '../index.module.scss';
import { useUpdateMerchantOrderStatusMutation } from '../../../../../../app/features/merchant/merchantOrderApiSlice';
import { ModalConfirm } from '../../../../..';
import { UpdateStatus } from '../utils';
import { message } from 'antd';
import { capitalizeFirstLetter } from '../../../../../../helpers/capitalizeFirstLetter';
import { IErrorResponse } from '../../../../../../helpers/types/response.interface';
import { ComponentBasedOnStatusProps } from './ComponentOnProcessed';

const ComponentOnDelivery: React.FC<ComponentBasedOnStatusProps> = ({
  transaction,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateOrderStatus, { isLoading }] =
    useUpdateMerchantOrderStatusMutation();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleProcess = async () => {
    try {
      await updateOrderStatus({
        status: UpdateStatus.TransactionStatusDelivered,
        invoice_code: transaction.invoice_code,
      }).unwrap();
      message.success(
        'Order has been delivered. You can see the detail in the Delivered Order tab.',
      );
      handleCloseModal();
    } catch (e) {
      const err = e as IErrorResponse;

      message.error(capitalizeFirstLetter(err.message));
    }
  };

  return (
    <div className={style.card__order__actions__btn}>
      <Button type="primary" size="large" ghost onClick={handleOpenModal}>
        Delivered
      </Button>

      <ModalConfirm
        isModalOpen={isModalOpen}
        handleCancel={handleCloseModal}
        handleOk={handleProcess}
        title="Order Delivered"
        info="Are you sure this order has been delivered?"
        confirmButtonText="Yes, I'm sure"
        cancelButton={true}
        confirmButtonProps={{ loading: isLoading }}
      />
    </div>
  );
};

export default ComponentOnDelivery;
