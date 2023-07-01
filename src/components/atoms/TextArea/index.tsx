import { Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import React from 'react';

const TextArea: React.FC<TextAreaProps> = (props) => {
  const { TextArea: ATextArea } = Input;

  return <ATextArea {...props} />;
};

export default TextArea;
