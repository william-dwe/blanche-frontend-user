import { message } from 'antd';
import React, { useState } from 'react';
import { ModalConfirm, Button } from '../../../../../..';
import {
  useMerchantAcceptRequestMutation,
  useMerchantRejectRequestMutation,
} from '../../../../../../../app/features/merchant/refundApiSlice';
import { capitalizeFirstLetter } from '../../../../../../../helpers/capitalizeFirstLetter';
import { IRefundRequest } from '../../../../../../../helpers/types/refund.interface';
import { IErrorResponse } from '../../../../../../../helpers/types/response.interface';


interface ActionProps {
  refund: IRefundRequest;
}

const ActionOnNeedApprovalMerchant: React.FC<ActionProps> = ({ refund }) => {
  const [isModalAcceptOpen, setIsModalAcceptOpen] = useState(false);
  const [isModalRejectOpen, setIsModalRejectOpen] = useState(false);
  const [acceptRequest, { isLoading: isAcceptLoading }] =
    useMerchantAcceptRequestMutation();
  const [rejectRequest, { isLoading: isRejectLoading }] =
    useMerchantRejectRequestMutation();

  const handleOpenModalAccept = () => {
    setIsModalAcceptOpen(true);
  };

  const handleCloseModalAccept = () => {
    setIsModalAcceptOpen(false);
  };

  const handleOpenModalReject = () => {
    setIsModalRejectOpen(true);
  };

  const handleCloseModalReject = () => {
    setIsModalRejectOpen(false);
  };
  const handleAccept = async () => {
    try {
      await acceptRequest(refund.id).unwrap();
      message.success(
        'Accept refund request successfully, next action is to wait for admin approval',
      );
      handleCloseModalAccept();
    } catch (error) {
      const err = error as IErrorResponse;
      message.error(capitalizeFirstLetter(err.message));
    }
  };

  const handleReject = async () => {
    try {
      await rejectRequest(refund.id).unwrap();
      message.success('Reject refund request successfully');
      handleCloseModalReject();
    } catch (error) {
      const err = error as IErrorResponse;
      message.error(capitalizeFirstLetter(err.message));
    }
  };
  return (
    <>
      <Button type="primary" ghost onClick={handleOpenModalAccept}>
        Accept
      </Button>
      <Button type="primary" ghost danger onClick={handleOpenModalReject}>
        Reject
      </Button>

      <ModalConfirm
        isModalOpen={isModalRejectOpen}
        title="Reject Refund"
        info="Are you sure you want to reject this refund request?"
        handleOk={handleReject}
        handleCancel={handleCloseModalReject}
        confirmButtonProps={{ danger: true, loading: isRejectLoading }}
        cancelButton={true}
        closable={true}
      />

      <ModalConfirm
        isModalOpen={isModalAcceptOpen}
        title="Accept Refund"
        info="Are you sure you want to accept this refund request?"
        handleOk={handleAccept}
        handleCancel={handleCloseModalAccept}
        cancelButton={true}
        closable={true}
        confirmButtonProps={{ loading: isAcceptLoading }}
      />
    </>
  );
};

export default ActionOnNeedApprovalMerchant;
