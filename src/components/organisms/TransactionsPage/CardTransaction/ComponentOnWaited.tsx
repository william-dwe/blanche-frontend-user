import { message } from 'antd';
import React, { useState } from 'react';
import { ModalConfirm } from '../../..';
import { useUpdateTransactionStatusMutation } from '../../../../app/features/transactions/transactionsApiSlice';
import { capitalizeFirstLetter } from '../../../../helpers/capitalizeFirstLetter';
import { ITransaction } from '../../../../helpers/types';
import { IErrorResponse } from '../../../../helpers/types/response.interface';
import { Button } from '../../../atoms';
import { UpdateStatus } from '../../Merchant/Order/CardOrder/utils';
import style from './index.module.scss';

interface ComponentOnWaitedProps {
  transaction: ITransaction;
}

const ComponentOnWaited: React.FC<ComponentOnWaitedProps> = ({
  transaction,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateOrderStatus, { isLoading }] =
    useUpdateTransactionStatusMutation();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleProcess = async () => {
    try {
      await updateOrderStatus({
        status: UpdateStatus.TransactionStatusOnCancel,
        invoice_code: transaction.invoice_code,
      }).unwrap();
      message.success(
        'Order has been canceled. You can see the detail in the Canceled tab',
      );
      handleCloseModal();
    } catch (e) {
      const err = e as IErrorResponse;

      message.error(capitalizeFirstLetter(err.message));
    }
  };

  return (
    <div className={style.ct__more__actions__details__btn}>
      <Button type="primary" size="small" onClick={handleOpenModal}>
        Cancel
      </Button>

      <ModalConfirm
        isModalOpen={isModalOpen}
        handleCancel={handleCloseModal}
        handleOk={handleProcess}
        title="Cancel Order"
        info=" Are you sure you want to cancel this order?"
        confirmButtonText="confirm"
        cancelButton={true}
        confirmButtonProps={{ loading: isLoading }}
      />
    </div>
  );
};

export default ComponentOnWaited;
