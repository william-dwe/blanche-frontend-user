import React from 'react';
import { Badge as ABadge, BadgeProps } from 'antd';

const Badge: React.FC<BadgeProps> = ({ ...props }) => {
  return <ABadge {...props} />;
};

export default Badge;
