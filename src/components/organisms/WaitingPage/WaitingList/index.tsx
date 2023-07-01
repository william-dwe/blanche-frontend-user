import React from 'react';
import style from './index.module.scss';
import { useGetWaitingForPaymentQuery } from '../../../../app/features/transactions/transactionsApiSlice';
import { Card } from '../../../atoms';
import { ItemNotFound } from '../../..';
import CardWaiting from '../CardWaiting';

const WaitingList: React.FC = () => {
  const { data } = useGetWaitingForPaymentQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <Card className={style.wl}>
      {data && data.length ? (
        <div className={style.wl__list}>
          {data.map((item) => (
            <CardWaiting item={item} key={item.payment_id} />
          ))}
        </div>
      ) : (
        <ItemNotFound
          className={style.wl__notfound}
          title="You dont have any waiting transactions."
        />
      )}
    </Card>
  );
};

export default WaitingList;
