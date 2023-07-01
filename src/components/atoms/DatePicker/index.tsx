import { DatePickerProps, DatePicker as ADatePicker } from 'antd';
import classNames from 'classnames';
import React from 'react';
import style from './index.module.scss';

const DatePicker: React.FC<DatePickerProps> = ({
  size = 'middle',
  className,
  ...props
}) => {
  const getSize = (size: string) => {
    if (size === 'small') {
      return {
        className: style.smallSize,
      };
    } else if (size === 'large') {
      return {
        className: style.largeSize,
      };
    } else if (size === 'middle') {
      return {
        className: style.middleSize,
      };
    }
  };

  const classProps = classNames(
    className,
    style.datepicker,
    getSize(size as string)?.className,
  );

  return <ADatePicker className={classProps} {...props} />;
};

export default DatePicker;
