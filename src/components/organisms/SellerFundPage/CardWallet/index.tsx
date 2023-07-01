import React from 'react';
import { Card } from '../../../atoms';
import style from './index.module.scss';
import WalletInfo from '../WalletInfo';
import { useGetMerchantFundBalanceQuery } from '../../../../app/features/merchant/merchantApiSlice';

const CardWallet: React.FC = () => {
  const { data } = useGetMerchantFundBalanceQuery();

  return (
    <Card className={style.card__wallet}>
      {data && <WalletInfo data={data} />}
    </Card>
  );
};

export default CardWallet;
