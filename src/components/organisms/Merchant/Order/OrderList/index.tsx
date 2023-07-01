import { Skeleton } from 'antd';
import React, { ChangeEvent, useState } from 'react';
import { ItemNotFound, Pagination } from '../../../..';
import { useGetMerchantOrdersQuery } from '../../../../../app/features/merchant/merchantOrderApiSlice';
import { useAppSelector } from '../../../../../app/hooks';
import { Card } from '../../../../';
import FilterStatus from '../../../TransactionsPage/FilterStatus';
import CardOrder from '../CardOrder';
import style from './index.module.scss';
import SortSearch from './SortSearch';
import { debounce } from 'lodash';

const limit = 10;
export enum OrderStatus {
  TransactionStatusWaited = 1,
  TransactionStatusProcessed = 2,
  TransactionStatusOnDelivery = 3,
  TransactionStatusDelivered = 4,
  TransactionStatusOnCompleted = 5,
  TransactionStatusCanceled = 6,
  TransactionStatusRequestRefund = 7,
  TransactionStatusOnRefund = 8,
}

const values = [
  'All',
  'New Order',
  'Ready to Ship',
  'On Delivery',
  'Delivered',
  'Completed',
  'Canceled',
  'Request Refund',
  'Refunded',
];

const OrderList: React.FC = () => {
  const params = useAppSelector((state) => state.params);
  const [searchValue, setSearchValue] = useState('');
  const [selectValue, setSelectValue] = useState(1);

  const { data, isLoading } = useGetMerchantOrdersQuery(
    {
      ...params.search,
      limit,
      sort: selectValue,
      q: searchValue,
    },
    { refetchOnMountOrArgChange: true },
  );

  const handleSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  }, 500);

  const handleSelect = (value: number) => {
    setSelectValue(value);
  };

  return (
    <Skeleton loading={isLoading} active>
      <Card className={style.tl}>
        <SortSearch
          handleSearch={handleSearch}
          handleSelect={handleSelect}
          selectValue={selectValue}
        />
        <FilterStatus values={values} />
        {data && data.transactions.length ? (
          <div className={style.tl__list}>
            {data.transactions.map((item) => (
              <CardOrder transaction={item} key={item.invoice_code} />
            ))}
          </div>
        ) : (
          <ItemNotFound
            className={style.tl__notfound}
            title=" You don't have any order yet."
            body="
            Your order will appear here once customer has purchased your product
            ."
          />
        )}
        {data &&
          data.total_data > limit &&
          Boolean(data.transactions.length) && (
            <div className={style.tl__pagination}>
              <Pagination
                total={data.total_data}
                pageSize={limit}
                showSizeChanger={false}
              />
            </div>
          )}
      </Card>
    </Skeleton>
  );
};

export default OrderList;
