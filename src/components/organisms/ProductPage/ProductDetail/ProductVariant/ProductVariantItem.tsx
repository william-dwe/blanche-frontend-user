import { RadioChangeEvent } from 'antd';
import React, { useState } from 'react';
import { RadioButtonGroup } from '../../../../molecules';
import style from './index.module.scss';
import { IVariantOption } from '../../../../../helpers/types';

interface ProductVariantItemProps {
  item: IVariantOption;
  handleChange: (index: number, value: number) => void;
  value?: string;
  index: number;
}

const ProductVariantItem: React.FC<ProductVariantItemProps> = ({
  index,
  item,
  handleChange,
}) => {
  const [value, setValue] = useState('');

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    const value = item.type.findIndex((item) => item === e.target.value);
    handleChange(index, value);
  };

  return (
    <div className={style.product__variant__item}>
      <p>
        {item.name}: {value}{' '}
      </p>
      <RadioButtonGroup
        className={style.product__variant__item__radio}
        values={item.type}
        onChange={onChange}
        size="large"
      />
    </div>
  );
};

export default ProductVariantItem;
