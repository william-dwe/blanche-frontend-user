import { debounce } from 'lodash';
import React, { ChangeEvent, useState } from 'react';
import { ItemNotFound, Pagination } from '../../..';
import { useGetTransactionsQuery } from '../../../../app/features/transactions/transactionsApiSlice';
import { useAppSelector } from '../../../../app/hooks';
import { Card } from '../../../atoms';
import CardTransaction from '../CardTransaction';
import FilterStatus from '../FilterStatus';
import SortSearch from '../SortSearch';
import style from './index.module.scss';

const limit = 10;

const values = [
  'All',
  'Waiting',
  'Processed',
  'On Delivery',
  'Delivered',
  'Completed',
  'Canceled',
  'Request Refund',
  'Refunded',
];
const TransactionList: React.FC = () => {
  const params = useAppSelector((state) => state.params);
  const [searchValue, setSearchValue] = useState('');
  const [selectValue, setSelectValue] = useState(1);

  const { data } = useGetTransactionsQuery(
    { ...params.search, limit, sort: selectValue, q: searchValue },
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
    <Card className={style.tl}>
      <SortSearch
        selectValue={selectValue}
        handleSearch={handleSearch}
        handleSelect={handleSelect}
      />
      <FilterStatus values={values} />
      {data && data.transactions.length ? (
        <div className={style.tl__list}>
          {data.transactions.map((item, index) => (
            <CardTransaction transaction={item} key={index} />
          ))}
        </div>
      ) : (
        <ItemNotFound
          className={style.tl__notfound}
          title="Sorry, your transaction is not found"
          body="Try to change the filter or make new transaction."
        />
      )}
      {data && data.total_data > limit && Boolean(data.transactions.length) && (
        <div className={style.tl__pagination}>
          <Pagination
            total={data.total_data}
            pageSize={limit}
            showSizeChanger={false}
          />
        </div>
      )}
    </Card>
  );
};

export default TransactionList;
