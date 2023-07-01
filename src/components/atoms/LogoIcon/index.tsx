import classNames from 'classnames';
import React from 'react';
import { LogoProps } from '../interface';
import style from './index.module.scss';

const LogoIcon: React.FC<LogoProps> = ({
  size = 'medium',
  type = 'primary',
}) => {
  const classProps = classNames(style.logo, style[size], style[type]);

  return (
    <div className={classProps}>
      <img src="/assets/png/logo.png" alt="" />
    </div>
  );
};

export default LogoIcon;
