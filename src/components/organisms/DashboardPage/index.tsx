import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import style from './index.module.scss';
import { DatePicker } from 'antd';
import Sales from './Sales';
import CustomerSatisfactions from './CustomerSatisfactions';
import Responsiveness from './Responsiveness';

const initialState = {
  start_date: dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
  end_date: dayjs().format('YYYY-MM-DD'),
};

const { RangePicker } = DatePicker;

const DashboardPage: React.FC = () => {
  const [date, setDate] = useState(initialState);
  const [isOpen, setIsOpen] = useState(false);

  const onChange: RangePickerProps['onChange'] = (date, dateString) => {
    if (!isOpen) return;
    const newDate = {
      start_date: dayjs(dateString[0]).toISOString(),
      end_date: dayjs(dateString[1]).toISOString(),
    };
    setDate(newDate);
  };
  return (
    <div className={style.dashboard}>
      <div className={style.dp__picker}>
        <p className={style.dp__date}>Filter Date</p>
        <RangePicker
          onChange={onChange}
          onOpenChange={(open) => {
            setIsOpen(open);
          }}
        />
      </div>
      <Responsiveness date={date} />
      <Sales date={date} />
      <CustomerSatisfactions date={date} />
    </div>
  );
};

export default DashboardPage;
