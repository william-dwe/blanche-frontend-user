import React from 'react';
import { SEO, WaitingPage } from '../../components';
import style from './index.module.scss';

const Wallet: React.FC = () => {
  return (
    <>
      <SEO title="Waiting Payment" description="Waiting payment page" />
      <div className={style.waiting}>
        <WaitingPage />
      </div>
    </>
  );
};

export default Wallet;
