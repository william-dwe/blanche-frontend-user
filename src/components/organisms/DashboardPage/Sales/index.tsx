import React from 'react';
import { useGetDashboardSalesQuery } from '../../../../app/features/dashboard/dashboardApiSlice';
import style from '../index.module.scss';
import { DualAxes } from '@ant-design/plots';
import { Empty } from 'antd';

interface SalesProps {
  date: {
    start_date: string;
    end_date: string;
  };
}

const Sales: React.FC<SalesProps> = ({ date }) => {
  const { data, isLoading } = useGetDashboardSalesQuery(date);

  const config = {
    xField: 'date',
    yField: ['rev', 'trx'],
    meta: {
      rev: {
        min: 0,
        alias: 'Revenue',
      },
      trx: {
        min: 0,
        alias: 'Number of Transactions',
      },
    },
    geometryOptions: [
      {
        geometry: 'column',
      },
      {
        geometry: 'line',
        lineStyle: {
          lineWidth: 2,
        },
      },
    ],
  };

  return (
    <div className={style.dp}>
      <div className={style.dp__header}>
        <h3 className={style.dp__title}>Sales</h3>
        <p className={style.dp__info}>
          Revenue is the total amount of money that a business has received for
          the last 30 days. Transaction is the number of order that a business
          has received for the last 30 days.
        </p>
      </div>
      {data ? (
        <DualAxes loading={isLoading} data={[data, data]} {...config} />
      ) : (
        <Empty description="We are still working on your data. Please comeback later." />
      )}
    </div>
  );
};

export default Sales;
