import React from 'react';
import { IRefundMessageDetails } from '../../../../helpers/types';
import style from './index.module.scss';

interface HeaderProps {
  details: IRefundMessageDetails;
  sender_id: number;
}

const Header: React.FC<HeaderProps> = ({ details, sender_id }) => {
  return (
    <div className={style.header}>
      <p className={style.header__title}>Chat Room</p>
      <div className={style.header__part}>
        {details.buyer_username && (
          <p className={style.header__title}>
            {details.buyer_username} (Buyer)
          </p>
        )}

        {sender_id === 1 && '\u2013'}
        {details.merchant_domain && (
          <p className={style.header__title}>
            {details.merchant_domain} (Seller)
          </p>
        )}
      </div>
      <p className={style.header__title}>{details.invoice_code}</p>
    </div>
  );
};

export default Header;
