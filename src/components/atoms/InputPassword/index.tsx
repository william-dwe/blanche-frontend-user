import React from 'react';
import { Input as AInput, InputProps } from 'antd';
import classNames from 'classnames';
import style from './index.module.scss';

const InputPassword: React.FC<InputProps> = ({ className, ...props }) => {
  const classProps = classNames(style.input, className);
  return <AInput.Password size="large" className={classProps} {...props} />;
};

export default InputPassword;
