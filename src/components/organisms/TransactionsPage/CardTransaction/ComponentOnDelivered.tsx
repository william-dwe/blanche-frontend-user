import { message } from 'antd';
import React, { useState } from 'react';
import { ModalConfirm, ModalRequestRefund } from '../../..';
import { useUpdateTransactionStatusMutation } from '../../../../app/features/transactions/transactionsApiSlice';
import { capitalizeFirstLetter } from '../../../../helpers/capitalizeFirstLetter';
import { ITransaction } from '../../../../helpers/types';
import { IErrorResponse } from '../../../../helpers/types/response.interface';
import { Button } from '../../../atoms';
import { UpdateStatus } from '../../Merchant/Order/CardOrder/utils';
import style from './index.module.scss';

interface ComponentOnDeliveredProps {
  transaction: ITransaction;
}

const ComponentOnDelivered: React.FC<ComponentOnDeliveredProps> = ({
  transaction,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalRefundOpen, setIsModalRefundOpen] = useState(false);
  const [updateOrderStatus, { isLoading }] =
    useUpdateTransactionStatusMutation();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleOpenModalRequestRefund = () => {
    setIsModalRefundOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseModalRefund = () => {
    setIsModalRefundOpen(false);
  };

  const handleProcess = async () => {
    try {
      await updateOrderStatus({
        status: UpdateStatus.TransactionStatusOnCompleted,
        invoice_code: transaction.invoice_code,
      }).unwrap();
      message.success(
        'Order has been completed. You can see the detail in the Completed tab.',
      );
      handleCloseModalRefund();
    } catch (e) {
      const err = e as IErrorResponse;

      message.error(capitalizeFirstLetter(err.message));
    }
  };

  return (
    <div className={style.ct__more__actions__details__btn}>
      <Button type="primary" size="small" onClick={handleOpenModal}>
        Confirm Received
      </Button>
      <Button
        type="primary"
        ghost
        danger
        size="small"
        onClick={handleOpenModalRequestRefund}
      >
        Request Refund
      </Button>
      <ModalConfirm
        isModalOpen={isModalOpen}
        handleCancel={handleCloseModal}
        handleOk={handleProcess}
        title="Confirm Received Order"
        info=" Are you sure to confirm this order as received? This action cannot be undone."
        confirmButtonText="confirm"
        cancelButton={true}
        confirmButtonProps={{ loading: isLoading }}
      />
      <ModalRequestRefund
        isModalOpen={isModalRefundOpen}
        handleCancel={handleCloseModalRefund}
        invoice_code={transaction.invoice_code}
      />
    </div>
  );
};

export default ComponentOnDelivered;
