import React from 'react';
import { Input as AInput, InputProps } from 'antd';
import classNames from 'classnames';
import style from './index.module.scss';

const Input: React.FC<InputProps> = ({
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

  const classProps = classNames(getSize(size as string)?.className, className);

  return <AInput className={classProps} {...props} />;
};

export default Input;
