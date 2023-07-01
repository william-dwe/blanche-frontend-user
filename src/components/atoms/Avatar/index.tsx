import React from 'react';
import { Avatar as AAvatar, AvatarProps } from 'antd';
import classNames from 'classnames';
import style from './index.module.scss';

const Avatar: React.FC<AvatarProps> = ({ className, ...props }) => {
  const classProps = classNames(className, style.avatar);

  return <AAvatar className={classProps} {...props} />;
};

export default Avatar;
