import React from 'react';
import { TableItemProps } from './CardPromotion';
import style from './index.module.scss';

const CardQuota: React.FC<TableItemProps> = ({ promotion }) => {
  return (
    <div className={style.table__promotions__qu__info}>
      <p className={style.table__promotions__qu__info__name}>Used</p>
      <p className={style.table__promotions__qu__info__desc}>
        {promotion.used_quota} /{promotion.quota}
      </p>
    </div>
  );
};

export default CardQuota;
