import { MenuProps, Menu as AMenu } from 'antd';
import React from 'react';

const Menu: React.FC<MenuProps> = (props) => {
  return <AMenu {...props} />;
};

export default Menu;
