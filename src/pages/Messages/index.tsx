import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetMessageRefundRequestQuery } from '../../app/features/refund/refundApiSlice';
import { Chat, ItemNotFound, SEO } from '../../components';
import style from './index.module.scss';

const Messages: React.FC = () => {
  const params = useParams();
  const { data, isLoading } = useGetMessageRefundRequestQuery(
    Number(params.id) || 0,
    {
      pollingInterval: 60000,
    },
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
      <SEO title={`Refund Messages`} description="Refund Messages page" />
      <div className={style.messages}>
        {data && (
          <Chat
            sender_id={3}
            data={data}
            isAction={
              data.refund_request_status[0].rejected_by_admin_at &&
              data.refund_request_status[0].accepted_by_buyer_at &&
              data.refund_request_status[0].rejected_by_buyer_at
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
