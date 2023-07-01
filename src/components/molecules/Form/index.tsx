import React from 'react';
import { Form as AForm, FormProps as AFormProps } from 'antd';

export type FormProps = AFormProps & {
  children: React.ReactNode;
};

const Form: React.FC<FormProps> = ({ children, ...props }) => {
  return <AForm {...props}>{children}</AForm>;
};

export default Form;
