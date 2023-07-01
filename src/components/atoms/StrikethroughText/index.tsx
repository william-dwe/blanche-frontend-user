import classNames from 'classnames';
import React from 'react';
import style from './index.module.scss';

interface TextProps {
  text: string;
  className?: string;
}

const StrikethroughText: React.FC<TextProps> = ({ text, className }) => {
  const classProps = classNames(style.st, className);
  return <p className={classProps}>{text}</p>;
};

export default StrikethroughText;
