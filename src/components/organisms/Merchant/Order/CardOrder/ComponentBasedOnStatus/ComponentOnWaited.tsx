import { message } from 'antd';
import React, { useState } from 'react';
import { useUpdateMerchantOrderStatusMutation } from '../../../../../../app/features/merchant/merchantOrderApiSlice';
import { Button, FormLabel, TextArea } from '../../../../../atoms';
import style from '../index.module.scss';
import { UpdateStatus } from '../utils';
import { Form, ModalConfirm } from '../../../../..';
import { capitalizeFirstLetter } from '../../../../../../helpers/capitalizeFirstLetter';
import { IErrorResponse } from '../../../../../../helpers/types/response.interface';
import { ComponentBasedOnStatusProps } from './ComponentOnProcessed';

const ComponentOnWaited: React.FC<ComponentBasedOnStatusProps> = ({
  transaction,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeclineOpen, setIsModalDeclineOpen] = useState(false);
  const [updateOrderStatus, { isLoading }] =
    useUpdateMerchantOrderStatusMutation();
  const [reason, setReason] = useState<string>('');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleOpenModalDecline = () => {
    setIsModalDeclineOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
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
        status: UpdateStatus.TransactionStatusProcessed,
        invoice_code: transaction.invoice_code,
      }).unwrap();
      message.success(
        'Order has been processed. You can see the detail in the Processed Order tab.',
      );
      handleCloseModal();
    } catch (e) {
      const err = e as IErrorResponse;

      message.error(capitalizeFirstLetter(err.message));
    }
  };

  const handleDecline = async () => {
    try {
      await updateOrderStatus({
        status: UpdateStatus.TransactionStatusOnCancel,
        invoice_code: transaction.invoice_code,
        cancellation_notes: reason,
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
    <>
      <div className={style.card__order__actions__btn}>
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
      </div>
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
      >
        <Form layout="vertical">
          <FormLabel label="Please provide reason why you decline this order? ">
            <TextArea value={reason} onChange={handleChange} />
          </FormLabel>
        </Form>
      </ModalConfirm>
    </>
  );
};

export default ComponentOnWaited;
