import React from 'react';
import { SelectProps, Select as ASelect } from 'antd';

const Select: React.FC<SelectProps> = ({ ...props }) => {
  return <ASelect size="large" {...props} />;
};

export default Select;
