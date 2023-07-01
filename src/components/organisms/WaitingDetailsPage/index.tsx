import { Divider } from 'antd';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ItemNotFound, PaymentIframe } from '../..';
import { useGetWaitingForPaymentDetailsQuery } from '../../../app/features/transactions/transactionsApiSlice';
import { dateToMinuteHourMonthStringDayYear } from '../../../helpers/parseDate';
import { toRupiah } from '../../../helpers/toRupiah';
import { Button, Card } from '../../atoms';
import CardWaitingDetails from './CardWaitingDetails';
import style from './index.module.scss';

const WaitingDetailsPage: React.FC = () => {
  const params = useParams();
  const [isIFrameOpen, setIsIFrameOpen] = useState(false);
  const { data, isLoading } = useGetWaitingForPaymentDetailsQuery(
    params.id || '',
  );

  const onClick = () => {
    setIsIFrameOpen(true);
  };

  if (!data && !isLoading) {
    return (
      <ItemNotFound
        title="Transaction is Not Found"
        body="Please check again your invoice code and try again."
      />
    );
  }

  return (
    <>
      <Card className={style.wdp}>
        <div className={style.wdp__header}>
          <h1 className={style.wdp__title}>Transaction Details</h1>
          <h2 className={style.wdp__code}>{data?.order_code}</h2>
          {data && (
            <p className={style.wdp__expired}>
              Pay Before:{' '}
              {dateToMinuteHourMonthStringDayYear(
                new Date(data.pay_before),
                ' ',
              )}
            </p>
          )}
        </div>
        <h3 className={style.wdp__sub}>Payment Details</h3>
        <div className={style.wdp__payment}>
          <div className={style.wdp__top}>
            <div className={style.wdp__flex}>
              <p className={style.wdp__flex__left}>Issued At</p>
              {data && (
                <p className={style.wdp__flex__right}>
                  {dateToMinuteHourMonthStringDayYear(
                    new Date(data.created_at),
                    ' ',
                  )}
                </p>
              )}
            </div>
            <div className={style.wdp__flex}>
              <p className={style.wdp__flex__left}>Payment Method</p>
              <p className={style.wdp__flex__right}>{data?.payment_method}</p>
            </div>
          </div>
          <Divider className={style.wdp__divider} dashed />
          <div className={style.wdp__flex}>
            <p className={style.wdp__flex__total}>Total Payment</p>
            <p className={style.wdp__flex__right}>{toRupiah(data?.amount)}</p>
          </div>
        </div>
        <Divider />
        <h3 className={style.wdp__sub}>Product Details</h3>
        {data?.transactions.map((transaction, index) => (
          <CardWaitingDetails transaction={transaction} key={index} />
        ))}
        <div className={style.wdp__footer}>
          <Button
            className={style.wdp__footer__button}
            type="primary"
            size="large"
            onClick={onClick}
          >
            Pay Now
          </Button>
        </div>
      </Card>
      {data && (
        <PaymentIframe src={data.redirect_url} isIFrameOpen={isIFrameOpen} />
      )}
    </>
  );
};

export default WaitingDetailsPage;
