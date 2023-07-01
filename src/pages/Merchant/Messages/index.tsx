import React from 'react';
import { useParams } from 'react-router-dom';
import { useMerchantGetMessageRefundRequestQuery } from '../../../app/features/merchant/refundApiSlice';
import { Chat, ItemNotFound, SEO } from '../../../components';
import style from './index.module.scss';

const Messages: React.FC = () => {
  const params = useParams();
  const { data, isLoading } = useMerchantGetMessageRefundRequestQuery(
    Number(params.id) || 0,
    { pollingInterval: 60000, refetchOnFocus: true },
  );

  if (!data && !isLoading) {
    return (
      <div className={style.messages__nf}>
        <ItemNotFound
          title="Chat Room is Not Found"
          body="Please make sure the url is correct or try again later."
        />
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`Merchant Refund Messages`}
        description="Merchant Refund Messages page"
      />
      <div className={style.messages}>
        {data && (
          <Chat
            sender_id={2}
            data={data}
            isAction={
              !data.refund_request_status[0].accepted_by_seller_at &&
              !data.refund_request_status[0].rejected_by_seller_at
                ? true
                : false
            }
          />
        )}
      </div>
    </>
  );
};

export default Messages;
