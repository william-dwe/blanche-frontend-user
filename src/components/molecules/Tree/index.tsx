import React from 'react';
import { Tree as ATree, TreeProps } from 'antd';

const Tree: React.FC<TreeProps> = ({ ...props }) => {
  return <ATree {...props} />;
};

export default Tree;
