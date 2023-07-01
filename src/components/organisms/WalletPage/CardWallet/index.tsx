import React from 'react';
import { Card } from '../../../atoms';
import style from './index.module.scss';
import ActiveWallet from '../ActivateWallet';
import WalletInfo from '../WalletInfo';
import { IGetWalletDetailsResponse } from '../../../../helpers/types';

interface CardWalletProps {
  data: IGetWalletDetailsResponse | undefined;
  isError: boolean;
  isLoading: boolean;
}

const CardWallet: React.FC<CardWalletProps> = ({ data, isError }) => {
  return (
    <Card className={style.card__wallet}>
      {isError && <ActiveWallet />}
      {data && <WalletInfo data={data} />}
    </Card>
  );
};

export default CardWallet;
