import classNames from 'classnames';
import React from 'react';
import style from './index.module.scss';

type CardProps = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
  const classProps = classNames(style.card, className);
  return (
    <div className={classProps} {...props}>
      {children}
    </div>
  );
};

export default Card;
