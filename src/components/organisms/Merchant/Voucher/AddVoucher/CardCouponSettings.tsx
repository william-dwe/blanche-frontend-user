import { RadioChangeEvent } from 'antd';
import React from 'react';
import { RadioButtonGroup } from '../../../..';
import { Card, FormLabel, InputNumber } from '../../../../atoms';
import style from './index.module.scss';
import { rules } from './validation';

const values = ['Fixed Amount'];

const CardCouponSettings: React.FC = () => {
  const [discountType, setDiscountType] = React.useState<string>(values[0]);

  const handleChange = (e: RadioChangeEvent) => {
    setDiscountType(e.target.value);
  };

  return (
    <Card className={style.form__voucher__item}>
      <div className={style.form__voucher__item__header}>
        <h3 className={style.form__voucher__item__header__title}>
          Voucher Settings
        </h3>
      </div>
      <div className={style.form}>
        <FormLabel className={style.form__item} label="Discount Type">
          <RadioButtonGroup values={values} onChange={handleChange} />
        </FormLabel>
        <FormLabel
          className={style.form__item}
          label="Discount Amount"
          name="discount_nominal"
          rules={rules.discount_nominal}
        >
          <InputNumber className={style.form__item__input} addonBefore={'Rp'} />
        </FormLabel>
        <FormLabel
          className={style.form__item}
          label="Minimum Purchase"
          name="min_order_nominal"
          rules={rules.min_order_nominal}
        >
          <InputNumber className={style.form__item__input} addonBefore={'Rp'} />
        </FormLabel>
        <div className={style.form__item}>
          <FormLabel
            className={style.form__item}
            label="Quota"
            name="quota"
            rules={rules.quota}
          >
            <InputNumber size="large" className={style.form__item__input} />
          </FormLabel>
        </div>
      </div>
    </Card>
  );
};

export default CardCouponSettings;
