import classNames from 'classnames';
import React from 'react';
import style from './index.module.scss';

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  const classProps = classNames(style.container, className);
  return <div className={classProps}>{children}</div>;
};

export default Container;
