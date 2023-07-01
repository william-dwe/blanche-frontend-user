import { RadioChangeEvent, RadioGroupProps } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { RadioButtonGroup } from '../..';
import style from './index.module.scss';
import './override.scss';

type RadioChipProps = {
  values: string[];
  onChange: (e: RadioChangeEvent) => void;
} & RadioGroupProps;

const RadioChip: React.FC<RadioChipProps> = ({ values, onChange, value }) => {
  return (
    <div className={style.rc}>
      <RadioButtonGroup
        className={classNames(style.rc__radio, 'radio')}
        values={values}
        onChange={onChange}
        size="large"
        value={value}
      />
    </div>
  );
};

export default RadioChip;
