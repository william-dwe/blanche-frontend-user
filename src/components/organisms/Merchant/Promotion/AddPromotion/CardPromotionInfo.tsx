import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { Card, FormLabel, Input } from '../../../../atoms';
import style from './index.module.scss';
import { rules } from './validation';

const CardPromotionInfo: React.FC = () => {
  const { RangePicker } = DatePicker;

  const rangePresets: {
    label: string;
    value: [Dayjs, Dayjs];
  }[] = [
    { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
    { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
  ];

  return (
    <Card className={style.form__promotion__item}>
      <div className={style.form__promotion__item__header}>
        <h3 className={style.form__promotion__item__header__title}>
          Promotion Information
        </h3>
      </div>
      <div className={style.form}>
        <FormLabel
          name="title"
          label="Promotion Name"
          rules={rules.title}
          className={style.form__item}
        >
          <Input type="text" className={style.form__item__input} />
        </FormLabel>
        <FormLabel
          className={style.form__item}
          name="period"
          rules={rules.period}
          label="
            Promotion Period Time"
        >
          <RangePicker
            presets={rangePresets}
            showTime
            className={style.form__item__input}
            format="YYYY/MM/DD HH:mm:ss"
            size="large"
          />
        </FormLabel>
      </div>
    </Card>
  );
};

export default CardPromotionInfo;
