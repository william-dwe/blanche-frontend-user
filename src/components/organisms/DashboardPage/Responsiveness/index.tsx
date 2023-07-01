import React from 'react';
import { useGetDashboardResponsivenessQuery } from '../../../../app/features/dashboard/dashboardApiSlice';
import style from '../index.module.scss';
import { Area } from '@ant-design/plots';
import { Empty } from 'antd';

interface ResponsivenessProps {
  date: {
    start_date: string;
    end_date: string;
  };
}

const Responsiveness: React.FC<ResponsivenessProps> = ({ date }) => {
  const { data, isLoading } = useGetDashboardResponsivenessQuery(date);

  return (
    <div className={style.dp}>
      <div className={style.dp__header}>
        <h3 className={style.dp__title}>Responsiveness</h3>
        <p className={style.dp__info}>
          OAD (Average Order Acceptance Delay) is the average time it takes for
          a merchant to accept an order after it has been placed. OSD (Average
          Order Shipment Delay) is the average time it takes for a merchant to
          ship an order after it has been accepted. Both OAD and OSD are
          calculated based on the last 30 days.
        </p>
      </div>
      {data ? (
        <Area
          loading={isLoading}
          data={data}
          xField="date"
          yField="value"
          seriesField="type"
        />
      ) : (
        <Empty description="We are still working on your data. Please comeback later." />
      )}
    </div>
  );
};

export default Responsiveness;
