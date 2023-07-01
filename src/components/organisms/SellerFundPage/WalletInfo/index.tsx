import React from 'react';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toRupiah } from '../../../../helpers/toRupiah';
import { IGetMerchantFundBalanceResponse } from '../../../../helpers/types/merchant/wallet.interface';
import { Button } from '../../../atoms';
import style from './index.module.scss';

interface WalletInfoProps {
  data: IGetMerchantFundBalanceResponse;
}

const WalletInfo: React.FC<WalletInfoProps> = ({ data }) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('withdraw');
  };

  return (
    <div className={style.wi__flex}>
      <div>
        <div className={style.wi__info}>
          <MdOutlineAccountBalanceWallet
            className={style.wi__info__icon}
            size={24}
          />
          <div className={style.wi__info__details}>
            <p className={style.wi__info__title}>Merchant Balance</p>
            <p className={style.wi__info__value}>
              {toRupiah(data.total_balance)}
            </p>
          </div>
        </div>
      </div>
      <Button type="primary" onClick={onClick}>
        Withdraw
      </Button>
    </div>
  );
};

export default WalletInfo;
