import { Divider, Image, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { MdChatBubbleOutline } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { ModalConfirm } from '../../../..';
import {
  useUserApproveResultMutation,
  useUserCancelRefundMutation,
  useUserRejectResultMutation,
} from '../../../../../app/features/refund/refundApiSlice';
import { capitalizeFirstLetter } from '../../../../../helpers/capitalizeFirstLetter';
import { dateToMinuteHourMonthStringDayYear } from '../../../../../helpers/parseDate';
import { IRefundRequest } from '../../../../../helpers/types/refund.interface';
import { IErrorResponse } from '../../../../../helpers/types/response.interface';
import { Button, Card, Tag } from '../../../../atoms';
import style from './index.module.scss';

interface RefundItemProps {
  refund: IRefundRequest;
}

const mapStatusToColor = {
  'waiting for seller approval': 'orange',
  'waiting for admin approval': 'orange',
  refunded: 'green',
  'rejected by seller': 'red',
  'rejected by admin': 'red',
  'cancelled by buyer': 'blue',
  'need approval': 'orange',
};

const RefundItem: React.FC<RefundItemProps> = ({ refund }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('waiting');
  const [isModalAcceptOpen, setIsModalAcceptOpen] = useState(false);
  const [isModalRejectOpen, setIsModalRejectOpen] = useState(false);
  const [isModalCancelOpen, setIsModalCancelOpen] = useState(false);
  const [approveResult, { isLoading: isAcceptLoading }] =
    useUserApproveResultMutation();
  const [rejectResult, { isLoading: isRejectLoading }] =
    useUserRejectResultMutation();
  const [cancelRefund, { isLoading: isCancelLoading }] =
    useUserCancelRefundMutation();

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

  const handleOpenModalCancel = () => {
    setIsModalCancelOpen(true);
  };

  const handleCloseModalCancel = () => {
    setIsModalCancelOpen(false);
  };
  const handleAccept = async () => {
    try {
      await approveResult(refund.id).unwrap();
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
      await rejectResult(refund.id).unwrap();
      message.success('Reject refund request successfully');
      handleCloseModalReject();
    } catch (error) {
      const err = error as IErrorResponse;
      message.error(capitalizeFirstLetter(err.message));
    }
  };

  const handleCancel = async () => {
    try {
      await cancelRefund(refund.id).unwrap();
      message.success('Cancel refund request successfully');
      handleCloseModalCancel();
    } catch (error) {
      const err = error as IErrorResponse;
      message.error(capitalizeFirstLetter(err.message));
    }
  };

  const onNavigate = () => {
    navigate(`/refund/${refund.id}/messages`);
  };

  useEffect(() => {
    if (!refund.refund_request_statuses) {
      return;
    }
    if (refund.refund_request_statuses[0].canceled_by_buyer_at) {
      setStatus('cancelled by buyer');
      return;
    }
    if (refund.refund_request_statuses[0].rejected_by_seller_at) {
      setStatus('rejected by seller');
      return;
    }
    if (refund.refund_request_statuses[0].rejected_by_buyer_at) {
      setStatus('rejected by buyer');
      return;
    }
    if (refund.refund_request_statuses[0].rejected_by_admin_at) {
      setStatus('rejected by admin');
      return;
    }
    if (refund.refund_request_statuses[0].accepted_by_admin_at) {
      setStatus('refunded');
      return;
    }
    if (
      refund.refund_request_statuses[0].rejected_by_admin_at &&
      !refund.refund_request_statuses[0].accepted_by_buyer_at &&
      !refund.refund_request_statuses[0].rejected_by_buyer_at
    ) {
      setStatus('need approval');
      return;
    }

    if (
      refund.refund_request_statuses[0].accepted_by_admin_at &&
      !refund.refund_request_statuses[0].rejected_by_admin_at
    ) {
      setStatus('waiting for admin approval');
      return;
    }

    if (
      !refund.refund_request_statuses[0].accepted_by_seller_at &&
      !refund.refund_request_statuses[0].rejected_by_seller_at
    ) {
      setStatus('waiting for seller approval');
      return;
    }
  }, [status, refund]);

  return (
    <Card className={style.ti}>
      <div className={style.ti__header}>
        <p className={style.ti__header__title}>Request Refund</p>

        <div className={style.ti__header__date}>
          <Tag
            className={style.ct__header__tag}
            color={mapStatusToColor[status as keyof typeof mapStatusToColor]}
          >
            {capitalizeFirstLetter(status)}
          </Tag>
          <p>
            {dateToMinuteHourMonthStringDayYear(
              new Date(refund.created_at),
              ' ',
            )}
          </p>
        </div>
      </div>
      <div className={style.ti__notes}>
        <p>
          Refund request for invoice{' '}
          <Link
            to={`/merchant/orders/${refund.invoice_code}`}
            className={style.ti__invoice}
          >
            {refund.invoice_code}
          </Link>
        </p>
      </div>
      <div className={style.ti__flex}>
        <div className={style.ti__body}>
          <Image
            src={refund.image_url}
            alt="refund"
            width={75}
            height={75}
            className={style.ti__body__img}
          />
          <div>
            <p className={style.ti__body__text}>Reason</p>
            <p className={style.ti__body__reason}>{refund.reason}</p>
          </div>
        </div>
        <div className={style.ti__right}>
          <div className={style.ti__right__item}>
            <p className={style.ti__right__text}>User</p>
            <p className={style.ti__right__value}>{refund.username}</p>
          </div>
          <div className={style.ti__right__item}>
            <p className={style.ti__right__text}>Merchant</p>
            <p className={style.ti__right__value}>{refund.merchant_domain}</p>
          </div>
        </div>
      </div>
      <Divider className={style.ti__divider} />
      <div className={style.ti__footer}>
        {refund.refund_request_statuses[0].rejected_by_admin_at &&
          !refund.refund_request_statuses[0].accepted_by_buyer_at &&
          !refund.refund_request_statuses[0].rejected_by_buyer_at && (
            <>
              <Button type="primary" ghost onClick={handleOpenModalAccept}>
                Accept
              </Button>
              <Button
                type="primary"
                ghost
                danger
                onClick={handleOpenModalReject}
              >
                Reject
              </Button>{' '}
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
          )}
        {!refund.refund_request_statuses[0].rejected_by_admin_at &&
          !refund.refund_request_statuses[0].accepted_by_admin_at &&
          !refund.refund_request_statuses[0].canceled_by_buyer_at && (
            <>
              <Button type="primary" ghost onClick={handleOpenModalCancel}>
                Cancel
              </Button>
              <ModalConfirm
                isModalOpen={isModalCancelOpen}
                title="Cancel Refund"
                info="Are you sure you want to cancel this refund request?"
                handleOk={handleCancel}
                handleCancel={handleCloseModalCancel}
                cancelButton={true}
                closable={true}
                confirmButtonProps={{ loading: isCancelLoading }}
              />
            </>
          )}
        <Button
          onClick={onNavigate}
          type="primary"
          className={style.ti__footer__chat}
        >
          <MdChatBubbleOutline />
          <span>Chat</span>
        </Button>
      </div>
    </Card>
  );
};

export default RefundItem;
