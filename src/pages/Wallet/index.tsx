import React from 'react';
import { SEO, WalletPage } from '../../components';
import style from './index.module.scss';

const Wallet: React.FC = () => {
  return (
    <>
      <SEO title="Wallet" description="Wallet page" />
      <div className={style.wallet__page}>
        <WalletPage />
      </div>
    </>
  );
};

export default Wallet;
