import { Divider } from 'antd';
import React from 'react';
import {
  MdOutlineAccountBalance,
  MdOutlineAccountBalanceWallet,
} from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { toRupiah } from '../../../../helpers/toRupiah';
import { IGetWalletDetailsResponse } from '../../../../helpers/types';
import { Button } from '../../../atoms';
import style from './index.module.scss';

interface WalletInfoProps {
  data: IGetWalletDetailsResponse;
}

const WalletInfo: React.FC<WalletInfoProps> = ({ data }) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('topup');
  };

  return (
    <>
      <div className={style.wi__flex}>
        <div>
          <div className={style.wi__info}>
            <MdOutlineAccountBalance
              className={style.wi__info__icon}
              size={24}
            />
            <div className={style.wi__info__details}>
              <p className={style.wi__info__title}>Wallet Number</p>
              <p className={style.wi__info__value}>{data.id}</p>
            </div>
          </div>
          <div className={style.wi__info}>
            <MdOutlineAccountBalanceWallet
              className={style.wi__info__icon}
              size={24}
            />
            <div className={style.wi__info__details}>
              <p className={style.wi__info__title}>Total Balance</p>
              <p className={style.wi__info__value}>{toRupiah(data.balance)}</p>
            </div>
          </div>
        </div>
        <Button type="primary" onClick={onClick}>
          Top Up
        </Button>
      </div>
      <Divider />
      <p className={style.wi__pin}>
        Want to change your pin? Click{' '}
        <Link to="change-pin" className={style.wi__pin__button}>
          here
        </Link>
      </p>
    </>
  );
};

export default WalletInfo;
