import React from 'react';
import { Rate as ARate, RateProps } from 'antd';

const Rate: React.FC<RateProps> = ({ ...props }) => {
  return <ARate {...props}/>;
};

export default Rate;
