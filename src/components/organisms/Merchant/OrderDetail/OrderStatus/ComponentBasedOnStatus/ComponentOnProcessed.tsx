import { message } from 'antd';
import React, { useRef, useState } from 'react';
import {
  Form,
  ModalConfirm,
  ModalHeader,
  ShippingLabel,
  Modal,
} from '../../../../..';
import { useUpdateMerchantOrderStatusMutation } from '../../../../../../app/features/merchant/merchantOrderApiSlice';
import { Button, FormLabel, Input, TextArea } from '../../../../../atoms';
import { ComponentBasedOnStatusProps } from './ComponentOnCanceled';
import style from '../index.module.scss';
import { EnumUpdateStatus } from '..';
import { useReactToPrint } from 'react-to-print';
import { capitalizeFirstLetter } from '../../../../../../helpers/capitalizeFirstLetter';
import { IErrorResponse } from '../../../../../../helpers/types/response.interface';

const ComponentOnProcessed: React.FC<ComponentBasedOnStatusProps> = ({
  transaction,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receiptCode, setReceiptCode] = useState<string | undefined>(undefined);
  const [updateOrderStatus, { isLoading }] =
    useUpdateMerchantOrderStatusMutation();

  const [isLabelVisible, setIsLabelVisible] = useState(false);
  const [isModalCancelOpen, setIsModalCancelOpen] = useState(false);
  const [reason, setReason] = useState<string>('');

  const handleOpenModalCancel = () => {
    setIsModalCancelOpen(true);
  };

  const handleCloseModalCancel = () => {
    setIsModalCancelOpen(false);
  };

  const componentRef = useRef(null);

  const handlePrintLabel = () => {
    setIsLabelVisible(true);
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChangeReceiptCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReceiptCode(e.target.value);
  };
  const handleCancel = async () => {
    try {
      await updateOrderStatus({
        status: EnumUpdateStatus.TransactionStatusOnCancel,
        invoice_code: transaction.invoice_code,
        cancellation_notes: reason,
      }).unwrap();

      message.success(
        'Order has been canceled. You can see the detail in the Canceled Order tab.',
      );

      handleCloseModalCancel();
    } catch (e) {
      const err = e as IErrorResponse;

      message.error(capitalizeFirstLetter(err.message));
    }
  };

  const handleSubmit = async () => {
    try {
      if (!receiptCode) {
        message.error('Receipt code is required');
        return;
      }
      await updateOrderStatus({
        status: EnumUpdateStatus.TransactionStatusOnDelivery,
        invoice_code: transaction.invoice_code,
        receipt_number: receiptCode,
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
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
  };
  return (
    <div className={style.os__status}>
      <div className={style.os__status__item}>
        <p className={style.os__status__item__text}>
          Order Need to be delivered
        </p>
        <p>
          Please make sure you have printed the label and delivered the order to
          the customer.
        </p>
      </div>
      <div className={style.os__status__action}>
        <Button type="primary" size="large" ghost onClick={handlePrintLabel}>
          Print Label
        </Button>
        <Button type="primary" size="large" onClick={handleOpenModal}>
          Deliver Order
        </Button>
        <Button
          type="primary"
          size="large"
          danger
          ghost
          onClick={handleOpenModalCancel}
        >
          Cancel
        </Button>
        <ModalConfirm
          isModalOpen={isModalOpen}
          handleCancel={handleCloseModal}
          handleOk={handleSubmit}
          title="Deliver Order"
          info="Are you sure to deliver this order? please make sure you have printed the label."
          confirmButtonText="Deliver"
          cancelButton={true}
          confirmButtonProps={{ loading: isLoading }}
        >
          <Form className={style.card__order__form} preserve={false}>
            <FormLabel
              label="Receipt Code"
              className={style.card__order__form__label}
              rules={[
                {
                  required: true,
                },
              ]}
            />
            <Input
              size="middle"
              value={receiptCode}
              onChange={handleChangeReceiptCode}
              className={style.card__order__form__input}
              placeholder="Input receipt code"
            />
          </Form>
        </ModalConfirm>
        <Modal
          open={isLabelVisible}
          onOk={handlePrint}
          width={600}
          onCancel={() => setIsLabelVisible(false)}
          okText="Print"
        >
          <ModalHeader
            title="Print Label"
            info='Print the label and paste it on the package. Then, click "Deliver Order" button to deliver the order.'
          />
          <div ref={componentRef}>
            <ShippingLabel transaction={transaction} />
          </div>
        </Modal>
        <ModalConfirm
          isModalOpen={isModalCancelOpen}
          handleCancel={handleCloseModalCancel}
          handleOk={handleCancel}
          title="Cancel Order"
          info="Are you sure to cancel this order? This action cannot be undone."
          confirmButtonText="Cancel Order"
          cancelButton={true}
          confirmButtonProps={{ loading: isLoading, danger: true }}
        >
          <Form layout="vertical">
            <FormLabel label="Please provide reason why you cancel this order? ">
              <TextArea value={reason} onChange={handleChange} />
            </FormLabel>
          </Form>
        </ModalConfirm>
      </div>
    </div>
  );
};

export default ComponentOnProcessed;
