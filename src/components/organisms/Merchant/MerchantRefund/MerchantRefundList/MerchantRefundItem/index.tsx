import { Divider, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { MdChatBubbleOutline } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../../../../../helpers/capitalizeFirstLetter';
import { dateToMinuteHourMonthStringDayYear } from '../../../../../../helpers/parseDate';
import { IRefundRequest } from '../../../../../../helpers/types/refund.interface';
import { Button, Card, Tag } from '../../../../../atoms';
import ActionOnNeedApprovalMerchant from './ActionBasedOnStatus/ActionOnNeedApprovalMerchant';
import ActionOnNeedRejected from './ActionBasedOnStatus/ActionOnRejected';
import ActionOnNeedApprovalAdmin from './ActionBasedOnStatus/ActionOnWaitingAdminApproval';
import style from './index.module.scss';

interface MerchantRefundItemProps {
  refund: IRefundRequest;
}

const mapStatusToColor = {
  'need approval': 'orange',
  'waiting for admin approval': 'orange',
  refunded: 'green',
  'rejected by seller': 'red',
  'rejected by admin': 'red',
  'cancelled by buyer': 'blue',
  rejected: 'red',
};

enum RefundStatus {
  All = 1,
  WaitingMerchantAproval = 2,
  WaitingAdminAproval = 3,
  Closed = 4,
  Canceled = 5,
  Rejected = 6,
  Refunded = 7,
}

const MerchantRefundItem: React.FC<MerchantRefundItemProps> = ({ refund }) => {
  const navigate = useNavigate();
  const MapComponent: {
    [key: number]: React.ReactNode;
  } = {
    [0]: <></>,
    [RefundStatus.WaitingMerchantAproval]: (
      <ActionOnNeedApprovalMerchant refund={refund} />
    ),
    [RefundStatus.WaitingAdminAproval]: <ActionOnNeedApprovalAdmin />,
    [RefundStatus.Rejected]: <ActionOnNeedRejected />,
  };

  const [status, setStatus] = useState('waiting');
  const [statusIdx, setStatusIdx] = useState(0);

  const renderComponent = () => {
    return MapComponent[statusIdx];
  };

  const onNavigate = () => {
    navigate(`/merchant/refund/${refund.id}/messages`);
  };

  useEffect(() => {
    if (!refund.refund_request_statuses) {
      return;
    }

    if (refund.refund_request_statuses[0].canceled_by_buyer_at) {
      setStatus('cancelled by buyer');
      setStatusIdx(0);
      return;
    }
    if (refund.refund_request_statuses[0].rejected_by_admin_at) {
      setStatus('rejected by admin');
      setStatusIdx(RefundStatus.Rejected);
      return;
    }
    if (refund.refund_request_statuses[0].rejected_by_seller_at) {
      setStatus('rejected by seller');
      setStatusIdx(RefundStatus.Rejected);
      return;
    }

    if (
      refund.refund_request_statuses[0].rejected_by_admin_at &&
      refund.refund_request_statuses[0].rejected_by_seller_at
    ) {
      setStatus('rejected');
      setStatusIdx(RefundStatus.Refunded);
      return;
    }
    if (refund.refund_request_statuses[0].accepted_by_admin_at) {
      setStatus('refunded');
      return;
    }

    if (
      !refund.refund_request_statuses[0].accepted_by_admin_at &&
      !refund.refund_request_statuses[0].rejected_by_admin_at &&
      refund.refund_request_statuses[0].accepted_by_seller_at
    ) {
      setStatus('waiting for admin approval');
      setStatusIdx(RefundStatus.WaitingAdminAproval);
      return;
    }
    if (
      !refund.refund_request_statuses[0].accepted_by_seller_at &&
      !refund.refund_request_statuses[0].rejected_by_seller_at
    ) {
      setStatus('need approval');
      setStatusIdx(RefundStatus.WaitingMerchantAproval);
      return;
    }
  }, [status, refund, statusIdx]);

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
        {renderComponent()}
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

export default MerchantRefundItem;
