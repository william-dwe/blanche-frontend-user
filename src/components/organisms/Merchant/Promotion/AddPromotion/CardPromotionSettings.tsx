import { RadioChangeEvent } from 'antd';
import React from 'react';
import { RadioButtonGroup } from '../../../..';
import { Card, FormLabel, InputNumber } from '../../../../atoms';
import style from './index.module.scss';
import { rules } from './validation';

const values = ['Fixed Amount', 'Percentage'];

interface CardPromotionSettingsProps {
  discountType: string;
  handleChange: (e: RadioChangeEvent) => void;
}

const CardPromotionSettings: React.FC<CardPromotionSettingsProps> = ({
  discountType,
  handleChange,
}) => {
  return (
    <Card className={style.form__promotion__item}>
      <div className={style.form__promotion__item__header}>
        <h3 className={style.form__promotion__item__header__title}>
          Promotion Settings
        </h3>
      </div>
      <div className={style.form}>
        <FormLabel
          className={style.form__item}
          label="Discount Type"
          rules={rules.promotion_type_id}
        >
          <RadioButtonGroup values={values} onChange={handleChange} />
        </FormLabel>
        {discountType === 'Fixed Amount' ? (
          <FormLabel
            className={style.form__item}
            label="Discount Amount"
            name="nominal"
            rules={rules.nominal}
          >
            <InputNumber
              className={style.form__item__input}
              addonBefore={'Rp'}
            />
          </FormLabel>
        ) : (
          <FormLabel
            className={style.form__item}
            label="Discount Amount"
            name="nominal"
            rules={rules.nominal}
          >
            <InputNumber
              className={style.form__item__input}
              maxLength={2}
              addonAfter={'%'}
            />
          </FormLabel>
        )}
        <FormLabel
          className={style.form__item}
          label="Maximum Discount Quantity"
          name="max_discounted_quantity"
          rules={rules.max_discounted_quantity}
        >
          <InputNumber className={style.form__item__input} />
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

export default CardPromotionSettings;
