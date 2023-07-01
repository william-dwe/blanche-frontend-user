import React from 'react';
import { Button as AButton, ButtonProps } from 'antd';
import classNames from 'classnames';
import style from './index.module.scss';

const Button: React.FC<ButtonProps> = ({
  className,
  size = 'middle',
  shape = 'default',
  children,
  onClick,
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

  const getShape = (shape: string) => {
    if (shape === 'circle') {
      if (size === 'small') {
        return {
          className: style.smallCircle,
        };
      } else if (size === 'large') {
        return {
          className: style.largeCircle,
        };
      } else if (size === 'middle') {
        return {
          className: style.middleCircle,
        };
      }
    }
  };

  const classProps = classNames(
    getSize(size)?.className,
    className,
    getShape(shape)?.className,
  );

  return (
    <AButton onClick={onClick} className={classProps} {...props}>
      {children}
    </AButton>
  );
};

export default Button;
