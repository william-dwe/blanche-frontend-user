import { Radio } from 'antd';
import { RadioGroupProps } from 'antd/es/radio';
import React from 'react';
import { RadioButton } from '../../atoms';

type RadioButtonCompoProps = RadioGroupProps & {
  values: string[];
};

const RadioButtonGroup: React.FC<RadioButtonCompoProps> = ({
  values,
  ...props
}) => {
  return (
    <Radio.Group {...props}>
      {values.map((item) => (
        <RadioButton key={item} value={item}>
          {item}
        </RadioButton>
      ))}
    </Radio.Group>
  );
};

export default RadioButtonGroup;
