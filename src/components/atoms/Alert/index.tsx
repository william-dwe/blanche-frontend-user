import React from 'react';
import { Alert as AAlert, AlertProps as AAlertProps } from 'antd';
import style from './index.module.scss';
import classNames from 'classnames';

type AlertProps = {
  className?: string;
} & AAlertProps;

const Alert: React.FC<AlertProps> = ({ className, ...props }) => {
  const classProps = classNames(className, style.alert);
  return <AAlert className={classProps} {...props} />;
};

export default Alert;
