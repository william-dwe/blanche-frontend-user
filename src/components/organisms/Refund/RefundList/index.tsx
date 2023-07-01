import React from 'react';
import { useGetRefundListQuery } from '../../../../app/features/refund/refundApiSlice';
import { useAppSelector } from '../../../../app/hooks';
import FilterStatus from '../../TransactionsPage/FilterStatus';
import RefundItem from './RefundItem';
import style from './index.module.scss';
import { Card } from '../../../atoms';
import { ItemNotFound } from '../../..';

const limit = 10;

const values = [
  'All',
  'Waiting Merchant Approval',
  'Waiting Admin Approval',
  'Closed',
  'Canceled',
  'Rejected',
  'Refunded',
  'Need Approval',
];

const RefundList: React.FC = () => {
  const params = useAppSelector((state) => state.params);

  const { data } = useGetRefundListQuery({
    ...params.search,
    limit,
  });

  if (data?.refund_requests.length === 0) {
    return (
      <ItemNotFound
        title="Refund Not Found"
        body="You don't have any refund request"
      />
    );
  }

  return (
    <Card className={style.refund__list}>
      <FilterStatus values={values} />
      <div className={style.refund__list__body}>
        {data?.refund_requests.length === 0 ? (
          <ItemNotFound
            title="You don't have any refund request"
            body="Refund will appear here when you have a refund"
          />
        ) : (
          data?.refund_requests.map((item, index) => (
            <RefundItem refund={item} key={index} />
          ))
        )}
      </div>
    </Card>
  );
};

export default RefundList;
