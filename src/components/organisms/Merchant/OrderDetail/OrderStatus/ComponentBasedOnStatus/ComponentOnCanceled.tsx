import classNames from 'classnames';
import React from 'react';
import { IMerchantDetailTransactionResponse } from '../../../../../../helpers/types/merchant/merchant-order.interface';
import { Button } from '../../../../../atoms';
import style from '../index.module.scss';

export interface ComponentBasedOnStatusProps {
  transaction: IMerchantDetailTransactionResponse;
}

const ComponentOnCanceled: React.FC<ComponentBasedOnStatusProps> = () => {
  const classProps = classNames(style.os__status, style.os__status__canceled);

  return (
    <div className={classProps}>
      <div className={style.os__status__item}>
        <p className={style.os__status__item__text}>Order has been canceled</p>
      </div>
      <Button type="primary" size="large" danger disabled>
        Canceled
      </Button>
    </div>
  );
};

export default ComponentOnCanceled;
