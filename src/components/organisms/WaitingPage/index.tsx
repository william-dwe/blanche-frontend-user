import React from 'react';
import style from './index.module.scss';
import WaitingList from './WaitingList';

const WaitingPage: React.FC = () => {
  return (
    <div className={style.wp}>
      <h1 className={style.wp__title}>Waiting for Payment List</h1>
      <WaitingList />
    </div>
  );
};

export default WaitingPage;
