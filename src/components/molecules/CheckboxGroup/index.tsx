import React from 'react';
import { Checkbox as ACheckbox, Space } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

const { Group } = ACheckbox;

export interface IOption {
  value: string;
  children: React.ReactNode;
}

type CheckboxGroupProps = {
  options: IOption[];
  onChange: (checkedValues: CheckboxValueType[]) => void;
  value?: CheckboxValueType[];
  defaultValue?: CheckboxValueType[];
  className?: string;
};

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  onChange,
  options,
  value,
  defaultValue = [],
  className,
}) => {
  return (
    <Group
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
      className={className}
    >
      <Space direction="vertical">
        {options.map((option) => (
          <ACheckbox
            value={option.value}
            key={option.value}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {option.children}
          </ACheckbox>
        ))}
      </Space>
    </Group>
  );
};

export default CheckboxGroup;
