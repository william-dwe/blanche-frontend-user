import React from 'react';
import { FormLabel, InputNumber } from '../../../../atoms';
import { rules } from '../validation';
import style from './index.module.scss';

const ProductAttribute: React.FC = () => {
  return (
    <div className={style.pa}>
      <FormLabel
        label="Price"
        name="price"
        rules={rules.price}
        preserve={false}
      >
        <InputNumber
          className={style.pa__input}
          min={100}
          placeholder="ex: 1000000"
          addonBefore="Rp"
        />
      </FormLabel>
      <FormLabel
        label="Stock"
        name="stock"
        rules={rules.stock}
        preserve={false}
      >
        <InputNumber
          className={style.pa__input}
          min={0}
          placeholder="ex: 100"
        />
      </FormLabel>
    </div>
  );
};

export default ProductAttribute;
