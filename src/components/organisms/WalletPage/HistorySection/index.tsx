import { Divider, Pagination, Skeleton } from 'antd';
import { PaginationProps } from 'rc-pagination';
import React, { Fragment, useState } from 'react';
import { ItemNotFound } from '../../..';
import { useGetWalletHistoryQuery } from '../../../../app/features/wallet/walletApiSlice';
import style from './index.module.scss';
import TransactionItem from './TransactionItem';
import { DatePicker } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const limit = 10;

interface HistorySectionProps {
  isSuccess: boolean;
}

interface IState {
  start_date: string | undefined;
  end_date: string | undefined;
}

const initialState = {
  start_date: undefined,
  end_date: undefined,
};

const HistorySection: React.FC<HistorySectionProps> = ({ isSuccess }) => {
  const [date, setDate] = useState<IState>(initialState);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetWalletHistoryQuery(
    { limit, page, start_date: date.start_date, end_date: date.end_date },
    { skip: !isSuccess },
  );

  const onChange: PaginationProps['onChange'] = (page) => {
    setPage(page);
  };

  const onChangeDate: RangePickerProps['onChange'] = (date, dateString) => {
    if (!date) {
      setDate(initialState);
      return;
    }
    const newDate = {
      start_date: dayjs(dateString[0]).toISOString(),
      end_date: dayjs(dateString[1]).toISOString(),
    };
    setDate(newDate);
  };

  return (
    <Skeleton loading={isLoading}>
      <div className={style.hs__picker}>
        <p className={style.hs__date}>Filter Date</p>
        <RangePicker onChange={onChangeDate} showTime={{ format: 'HH:mm' }} />
      </div>
      <div className={style.hs}>
        {data?.transactions.map((transaction, index) => (
          <Fragment key={transaction.payment_id}>
            <TransactionItem
              key={transaction.payment_id}
              transaction={transaction}
            />
            {index < data?.transactions.length - 1 && (
              <Divider className={style.hs__divider} />
            )}
          </Fragment>
        ))}
        {data && data.total_data > limit && (
          <div className={style.hs__pagination}>
            <Pagination
              total={data?.total_data}
              pageSize={limit}
              showSizeChanger={false}
              onChange={onChange}
              current={page}
            />
          </div>
        )}
        {!Boolean(data?.total_data) && (
          <ItemNotFound
            title="You dont have any wallet history."
            body="You can start making transactions."
          />
        )}
      </div>
    </Skeleton>
  );
};

export default HistorySection;
