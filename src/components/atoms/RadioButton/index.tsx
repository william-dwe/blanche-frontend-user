import { Radio } from 'antd';
import { RadioButtonProps } from 'antd/es/radio/radioButton';
import React from 'react';

const RadioButton: React.FC<RadioButtonProps> = ({ children, ...props }) => {
  return <Radio.Button {...props}>{children}</Radio.Button>;
};

export default RadioButton;
