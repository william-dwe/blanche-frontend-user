import classNames from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IMerchantDetailTransactionResponse } from '../../../../../../helpers/types/merchant/merchant-order.interface';
import { Button } from '../../../../../atoms';
import style from '../index.module.scss';

export interface ComponentBasedOnStatusProps {
  transaction: IMerchantDetailTransactionResponse;
}

const ComponentOnRequestRefund: React.FC<ComponentBasedOnStatusProps> = () => {
  const classProps = classNames(style.os__status, style.os__status__canceled);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/merchant/refunds');
  };

  return (
    <div className={classProps}>
      <div className={style.os__status__item}>
        <p className={style.os__status__item__text}>Buyer request to refund</p>
      </div>
      <Button size="large" danger onClick={handleNavigate} type="link">
        Go to refund list
      </Button>
    </div>
  );
};

export default ComponentOnRequestRefund;
