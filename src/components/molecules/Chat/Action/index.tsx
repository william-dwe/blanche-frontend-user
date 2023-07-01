import { message } from 'antd';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useMerchantAcceptRequestMutation,
  useMerchantRejectRequestMutation,
} from '../../../../app/features/merchant/refundApiSlice';
import {
  useUserApproveResultMutation,
  useUserRejectResultMutation,
} from '../../../../app/features/refund/refundApiSlice';
import { capitalizeFirstLetter } from '../../../../helpers/capitalizeFirstLetter';
import { IErrorResponse } from '../../../../helpers/types/response.interface';
import { Button } from '../../../atoms';
import style from './index.module.scss';

interface ActionProps {
  sender_id: number;
}

const Action: React.FC<ActionProps> = ({ sender_id }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [accept, { isLoading: isLoadingAccept }] =
    useUserApproveResultMutation();
  const [reject, { isLoading: isLoadingReject }] =
    useUserRejectResultMutation();
  const [acceptMerchant, { isLoading: isLoadingAcceptMerchant }] =
    useMerchantAcceptRequestMutation();
  const [rejectMerchant, { isLoading: isLoadingRejectMerchant }] =
    useMerchantRejectRequestMutation();

  const handleAccept = async () => {
    try {
      let data;
      switch (sender_id) {
        case 2:
          data = await acceptMerchant(Number(params.id) || 0).unwrap();
          break;
        case 3:
          data = await accept(Number(params.id) || 0).unwrap();
          break;
        default:
          data = await accept(Number(params.id) || 0).unwrap();
          break;
      }
      navigate('/refunds');
      message.success(`Refund request ${data.invoice_code} was accepted`);
    } catch (err) {
      const error = err as IErrorResponse;
      message.error(capitalizeFirstLetter(error.message));
    }
  };

  const handleReject = async () => {
    try {
      let data;
      switch (sender_id) {
        case 1:
          data = await rejectMerchant(Number(params.id) || 0).unwrap();
          break;
        case 2:
          data = await reject(Number(params.id) || 0).unwrap();
          break;
        default:
          data = await reject(Number(params.id) || 0).unwrap();
          break;
      }
      navigate('/refunds');
      message.success(`Refund request ${data.invoice_code} was rejected`);
    } catch (err) {
      const error = err as IErrorResponse;
      message.error(capitalizeFirstLetter(error.message));
    }
  };

  return (
    <div className={style.action}>
      <p>Do you want to accept this request?</p>
      <div className={style.action__group}>
        <Button
          type="primary"
          onClick={handleAccept}
          loading={isLoadingAccept || isLoadingAcceptMerchant}
          ghost
        >
          Accept
        </Button>
        <Button
          type="primary"
          onClick={handleReject}
          loading={isLoadingReject || isLoadingRejectMerchant}
          ghost
          danger
        >
          Reject
        </Button>
      </div>
    </div>
  );
};

export default Action;
