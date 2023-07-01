import { TabsProps } from 'antd';
import React from 'react';
import { Tabs as ATabs } from 'antd';

const Tabs: React.FC<TabsProps> = ({ ...props }) => {
  return <ATabs {...props} />;
};

export default Tabs;
