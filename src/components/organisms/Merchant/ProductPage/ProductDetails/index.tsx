import React from 'react';
import { Card, FormLabel, TextArea } from '../../../../atoms';
import style from './index.module.scss';
import { rules } from '../validation';
import { Radio } from 'antd';

const conditions = ['New', 'Used'];

const ProductDetails: React.FC = () => {
  return (
    <Card className={style.pd}>
      <div className={style.pd__header}>
        <h2 className={style.pd__title}>Product Details</h2>
        <p className={style.pd__info}>
          Describe your product correctly so that the customer can understand
          your product easily.
        </p>
      </div>
      <FormLabel
        label="Product Condition"
        name="condition"
        rules={rules.condition}
      >
        <Radio.Group>
          {conditions.map((condition) => (
            <Radio key={condition} value={condition.toLowerCase()}>
              {condition}
            </Radio>
          ))}
        </Radio.Group>
      </FormLabel>
      <FormLabel
        label="Product Description"
        name="description"
        rules={rules.description}
      >
        <TextArea
          placeholder="Apple iPhone 12 Pro Max 256GB"
          showCount
          maxLength={500}
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </FormLabel>
    </Card>
  );
};

export default ProductDetails;
