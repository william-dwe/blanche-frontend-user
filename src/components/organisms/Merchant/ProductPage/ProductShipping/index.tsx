import React from 'react';
import { Card, FormLabel, InputNumber } from '../../../../atoms';
import { rules } from '../validation';
import style from './index.module.scss';

const ProductShipping: React.FC = () => {
  return (
    <Card className={style.ps}>
      <div className={style.ps__header}>
        <h2 className={style.ps__title}>Product Shipping</h2>
        <p className={style.ps__info}>
          Measure the weight and dimension of the product for shipping purposes.
        </p>
      </div>
      <div className={style.ps__weight}>
        <FormLabel
          label="Weight"
          name="weight"
          rules={rules.weight}
          preserve={false}
        >
          <InputNumber
            className={style.ps__input}
            min={0}
            placeholder="ex: 100"
            addonAfter="g"
          />
        </FormLabel>
      </div>
      <div className={style.ps__dimension}>
        <FormLabel
          label="Length"
          name={['dimension', 'length']}
          rules={rules.stock}
          preserve={false}
        >
          <InputNumber
            className={style.ps__input}
            min={0}
            placeholder="ex: 100"
            addonAfter="cm"
          />
        </FormLabel>
        <FormLabel
          label="Width"
          name={['dimension', 'width']}
          rules={rules.stock}
          preserve={false}
        >
          <InputNumber
            className={style.ps__input}
            min={0}
            placeholder="ex: 100"
            addonAfter="cm"
          />
        </FormLabel>
        <FormLabel
          label="Height"
          name={['dimension', 'height']}
          rules={rules.stock}
          preserve={false}
        >
          <InputNumber
            className={style.ps__input}
            min={0}
            placeholder="ex: 100"
            addonAfter="cm"
          />
        </FormLabel>
      </div>
    </Card>
  );
};

export default ProductShipping;
