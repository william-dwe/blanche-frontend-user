import { Spin } from 'antd';
import React from 'react';
import style from './index.module.scss';

const Loader: React.FC = () => {
  return (
    <div className={style.loader}>
      <Spin size={'large'} />
    </div>
  );
};

export default Loader;
