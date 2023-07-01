import classNames from 'classnames';
import React from 'react';
import style from './index.module.scss';

type ArrowProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
} & React.HTMLAttributes<HTMLButtonElement>;

const Arrow: React.FC<ArrowProps> = ({ children, className, onClick }) => {
  const classProps = classNames(style.arrow, className);
  return (
    <button className={classProps} onClick={onClick}>
      {children}
    </button>
  );
};

export default Arrow;
