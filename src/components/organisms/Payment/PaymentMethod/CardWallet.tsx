import React from 'react';
import style from './index.module.scss';
import { MdAccountBalanceWallet } from 'react-icons/md';
import { Button } from '../../../atoms';
import {
  ICheckoutResponse,
  IGetWalletDetailsResponse,
  ISealabsPayAccounts,
} from '../../../../helpers/types';
import { toRupiah } from '../../../../helpers/toRupiah';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

interface CardWalletProps {
  wallet: IGetWalletDetailsResponse | undefined;
  defaultPayment?: IGetWalletDetailsResponse | ISealabsPayAccounts;
  order: ICheckoutResponse;
}

const CardWallet: React.FC<CardWalletProps> = ({
  wallet,
  defaultPayment,
  order,
}) => {
  const classProps = classNames(
    style.card__payment,
    defaultPayment === wallet ? style.card__payment__active : '',
  );

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/wallet/topup', {
      state: {
        from: location,
        search: order.order_code,
      },
      replace: true,
    });
  };

  const handleNavigateActivate = () => {
    navigate('/wallet', {
      state: {
        from: location,
        search: order.order_code,
      },
      replace: true,
    });
  };

  return (
    <div className={classProps}>
      <div className={style.card__payment__icon}>
        <MdAccountBalanceWallet />
      </div>
      <div className={style.card__payment__content}>
        <h6>Wallet</h6>
        <p>
          {wallet
            ? toRupiah(wallet.balance)
            : 'You havent activate your wallet!'}
        </p>
      </div>
      <div className={style.card__payment__wallet}>
        {wallet && wallet.balance < order.total && (
          <Button type="primary" onClick={handleNavigate}>
            Topup
          </Button>
        )}

        {!wallet && (
          <Button type="primary" onClick={handleNavigateActivate}>
            Activate Wallet
          </Button>
        )}
      </div>
    </div>
  );
};

export default CardWallet;
