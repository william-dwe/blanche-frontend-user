import React from 'react';
import { IVoucher } from '../../../../../helpers/types/merchant/voucher.interface';
import style from './index.module.scss';

export interface CardVoucherProps {
  voucher: IVoucher;
}

const CardQuota: React.FC<CardVoucherProps> = ({ voucher }) => {
  return (
    <div className={style.table__voucher__qu}>
      <div className={style.table__voucher__qu__info}>
        <p className={style.table__voucher__qu__info__name}>Used</p>
        <p className={style.table__voucher__qu__info__desc}>
          {voucher.used_quota} /{voucher.quota}
        </p>
      </div>
    </div>
  );
};

export default CardQuota;
