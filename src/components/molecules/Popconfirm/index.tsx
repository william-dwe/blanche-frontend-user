import React from 'react';
import { Popconfirm as APopconfirm, PopconfirmProps } from 'antd';

const Popconfirm: React.FC<PopconfirmProps> = ({ children, ...props }) => {
  return <APopconfirm {...props}>{children}</APopconfirm>;
};

export default Popconfirm;
