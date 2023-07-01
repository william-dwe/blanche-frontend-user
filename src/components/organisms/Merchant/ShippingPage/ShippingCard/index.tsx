import React from 'react';
import { Image } from '../../../../atoms';
import style from './index.module.scss';

interface ShippingCardProps {
  shipping: any;
}

const ShippingCard: React.FC<ShippingCardProps> = ({ shipping }) => {
  return (
    <div className={style.sc}>
      <div className={style.sc__flex}>
        <Image
          className={style.sc__img}
          src={shipping.courier_logo}
          alt={shipping.courier_name}
        />
        <div>
          <p className={style.sc__name}>{shipping.courier_name}</p>
          <p className={style.sc__type}>Reguler</p>
        </div>
      </div>
    </div>
  );
};

export default ShippingCard;
