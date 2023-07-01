import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { LogoProps } from '../interface';
import style from './index.module.scss';

const Logo: React.FC<LogoProps> = ({ size = 'small', type = 'primary' }) => {
  const classProps = classNames(style.logo, style[size], style[type]);

  return (
    <Link to="/" className={classProps}>
      <img src="/assets/png/logo-full.png" alt="" />
    </Link>
  );
};

export default Logo;
