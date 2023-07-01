import React from 'react';
import { Tag as ATag, TagProps } from 'antd';
import style from './index.module.scss';
import classNames from 'classnames';

const Tag: React.FC<TagProps> = ({ color, children, className, ...props }) => {
  const classProps = classNames(className, style.tag);
  return (
    <ATag className={classProps} color={color} {...props}>
      {children}
    </ATag>
  );
};

export default Tag;
