import React from 'react';
import style from './index.module.scss';
import { MdAccountBalanceWallet } from 'react-icons/md';
import { toRupiah } from '../../../helpers/toRupiah';
import { useGetWalletDetailsQuery } from '../../../app/features/wallet/walletApiSlice';
import { Link } from 'react-router-dom';

const CardWallet: React.FC = () => {
  const { data: wallet } = useGetWalletDetailsQuery();

  return (
    <Link to="/wallet" className={style.menu__profile__card__wallet}>
      <div className={style.menu__profile__card__wallet__icon}>
        <MdAccountBalanceWallet />
      </div>
      <div className={style.menu__profile__card__wallet__content}>
        <h6>Wallet</h6>
        <p className={style.menu__profile__card__wallet__content__amount}>
          {wallet
            ? toRupiah(wallet.balance)
            : 'You havent activate your wallet!'}
        </p>
      </div>
    </Link>
  );
};

export default CardWallet;
