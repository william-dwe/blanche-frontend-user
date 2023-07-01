import { message } from 'antd';
import React, { useState } from 'react';
import { useUpdateMerchantOrderStatusMutation } from '../../../../../../app/features/merchant/merchantOrderApiSlice';
import { Button } from '../../../../../atoms';
import { ComponentBasedOnStatusProps } from './ComponentOnCanceled';
import style from '../index.module.scss';
import { ModalConfirm } from '../../../../..';
import { EnumUpdateStatus } from '..';
import { capitalizeFirstLetter } from '../../../../../../helpers/capitalizeFirstLetter';
import { IErrorResponse } from '../../../../../../helpers/types/response.interface';

const ComponentOnWaited: React.FC<ComponentBasedOnStatusProps> = ({
  transaction,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeclineOpen, setIsModalDeclineOpen] = useState(false);
  const [updateOrderStatus, { isLoading }] =
    useUpdateMerchantOrderStatusMutation();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleOpenModalDecline = () => {
    setIsModalDeclineOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseModalDecline = () => {
    setIsModalDeclineOpen(false);
  };

  const handleProcess = async () => {
    try {
      await updateOrderStatus({
        status: EnumUpdateStatus.TransactionStatusProcessed,
        invoice_code: transaction.invoice_code,
      }).unwrap();
      message.success(
        'Order has been processed. You can see the detail in the Processed Order tab.',
      );
      handleCloseModal();
    } catch (e) {
      const err = e as Error;

      message.error(capitalizeFirstLetter(err.message));
    }
  };

  const handleDecline = async () => {
    try {
      await updateOrderStatus({
        status: EnumUpdateStatus.TransactionStatusOnCancel,
        invoice_code: transaction.invoice_code,
      }).unwrap();

      message.success(
        'Order has been declined. You can see the detail in the Canceled Order tab.',
      );

      handleCloseModalDecline();
    } catch (e) {
      const err = e as IErrorResponse;

      message.error(capitalizeFirstLetter(err.message));
    }
  };
  return (
    <div className={style.os__status}>
      <div className={style.os__status__item}>
        <p className={style.os__status__item__text}>Order Need to be process</p>
        <p className={style.os__status__item__desc}>
          Please process this order as soon as possible, or decline this order.
          If you decline this order, the customer will be notified and the order
          will be canceled. This action cannot be undone. Please be careful.
          Thank you. :){' '}
        </p>
      </div>
      <div className={style.os__status__action}>
        <Button
          type="primary"
          size="large"
          danger
          onClick={handleOpenModalDecline}
        >
          Decline Order
        </Button>
        <Button type="primary" size="large" onClick={handleOpenModal}>
          Process Order
        </Button>
        <ModalConfirm
          isModalOpen={isModalOpen}
          handleCancel={handleCloseModal}
          handleOk={handleProcess}
          title="Process Order"
          info="Are you sure to process this order?"
          confirmButtonText="Process"
          cancelButton={true}
          confirmButtonProps={{ loading: isLoading }}
        />
        <ModalConfirm
          isModalOpen={isModalDeclineOpen}
          handleCancel={handleCloseModalDecline}
          handleOk={handleDecline}
          title="Decline Order"
          info="Are you sure to decline this order? This action cannot be undone."
          confirmButtonText="Decline Order"
          cancelButton={true}
          confirmButtonProps={{ loading: isLoading, danger: true }}
        />
      </div>
    </div>
  );
};

export default ComponentOnWaited;
