import { InputNumberProps } from 'antd';
import { valueType } from 'antd/es/statistic/utils';
import React from 'react';
import { InputNumber } from '../../atoms';
import style from './index.module.scss';
import './override.scss';
import classNames from 'classnames';

interface InputQuantityProps extends InputNumberProps {
  value: number;
  handleChange: (value: valueType | null) => void;
  handleDecrement: () => void;
  handleIncrement: () => void;
  disabledIncrement?: boolean;
  disableDecrement?: boolean;
}

const InputQuantity: React.FC<InputQuantityProps> = ({
  value,
  handleChange,
  handleDecrement,
  handleIncrement,
  disabledIncrement,
  disableDecrement,
  ...props
}) => {
  const addonIncrement = (
    <button
      className={style.input__quantity__button}
      style={{ borderRadius: 0 }}
      onClick={handleIncrement}
      disabled={disabledIncrement}
    >
      +
    </button>
  );
  const addonDecrement = (
    <button
      className={style.input__quantity__button}
      style={{ borderRadius: 0 }}
      onClick={handleDecrement}
      disabled={disableDecrement}
    >
      -
    </button>
  );

  return (
    <InputNumber
      addonAfter={addonIncrement}
      addonBefore={addonDecrement}
      onChange={handleChange}
      defaultValue={100}
      className={classNames(style.input__quantity, 'input-qty')}
      value={value}
      {...props}
    />
  );
};

export default InputQuantity;
