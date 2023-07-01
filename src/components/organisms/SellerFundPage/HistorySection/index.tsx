import { Divider, Pagination, Skeleton } from 'antd';
import { PaginationProps } from 'rc-pagination';
import React, { Fragment, useState } from 'react';
import { useGetMerchantFundActivitiesQuery } from '../../../../app/features/merchant/merchantApiSlice';
import style from './index.module.scss';
import TransactionItem from './Activity';

const limit = 10;

const HistorySection: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetMerchantFundActivitiesQuery({
    limit,
    page,
  });

  const onChange: PaginationProps['onChange'] = (page) => {
    setPage(page);
  };

  return (
    <Skeleton loading={isLoading}>
      <div className={style.hs}>
        {data?.fund_activities.map((activity, index) => (
          <Fragment key={activity.id}>
            <TransactionItem activity={activity} />
            {index < data?.fund_activities.length - 1 && (
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
      </div>
    </Skeleton>
  );
};

export default HistorySection;
