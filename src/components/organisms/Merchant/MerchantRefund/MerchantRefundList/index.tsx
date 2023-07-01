import React from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import FilterStatus from '../../../TransactionsPage/FilterStatus';
import RefundItem from './MerchantRefundItem';
import style from './index.module.scss';
import { Card } from '../../../../atoms';
import { useGetRefundMerchantListQuery } from '../../../../../app/features/merchant/refundApiSlice';
import { ItemNotFound } from '../../../..';

const limit = 10;

const values = [
  'All',
  'Need Approval',
  'Waiting Admin Approval',
  'Closed',
  'Canceled',
  'Rejected',
  'Refunded',
  'Waiting Buyer Approval',
];

const MerchantRefundList: React.FC = () => {
  const params = useAppSelector((state) => state.params);

  const { data } = useGetRefundMerchantListQuery({
    ...params.search,
    limit,
  });

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

export default MerchantRefundList;
