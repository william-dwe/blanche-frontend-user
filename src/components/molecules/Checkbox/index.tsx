import { Checkbox as ACheckbox, CheckboxProps } from 'antd';
import React from 'react';

const CheckboxGroup: React.FC<CheckboxProps> = (props) => {
  return <ACheckbox {...props} />;
};

export default CheckboxGroup;
