import React, { useState } from 'react';
import { Button } from '../../../../../atoms';
import { ComponentBasedOnStatusProps } from './ComponentOnCanceled';
import style from '../index.module.scss';
import { ModalConfirm } from '../../../../..';
import { useUpdateMerchantOrderStatusMutation } from '../../../../../../app/features/merchant/merchantOrderApiSlice';
import { message } from 'antd';
import { EnumUpdateStatus } from '..';
import { capitalizeFirstLetter } from '../../../../../../helpers/capitalizeFirstLetter';
import { IErrorResponse } from '../../../../../../helpers/types/response.interface';

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
        status: EnumUpdateStatus.TransactionStatusDelivered,
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
    <div className={style.os__status}>
      <div className={style.os__status__item}>
        <p className={style.os__status__item__text}>Order is on delivery</p>
        <p className={style.os__status__item__desc}>
          Update the status to delivered once the order has been delivered to
          the customer.
        </p>{' '}
      </div>
      <div className={style.os__status__action}>
        <Button type="primary" size="large" ghost onClick={handleOpenModal}>
          Order Delivered
        </Button>
      </div>
      <ModalConfirm
        isModalOpen={isModalOpen}
        handleCancel={handleCloseModal}
        handleOk={handleProcess}
        title="Update Order to Delivered"
        info="Are you sure this order has been delivered?"
        confirmButtonText="Yes, I'm sure"
        cancelButton={true}
        confirmButtonProps={{ loading: isLoading }}
      />
    </div>
  );
};

export default ComponentOnDelivery;
