import React from 'react';
import { IShippingOption } from '../../../../../helpers/types';
import style from './index.module.scss';

interface DeliveryItemProps {
  delivery: IShippingOption;
}

const DeliveryItem: React.FC<DeliveryItemProps> = ({ delivery }) => {
  return (
    <div className={style.delivery__item}>
      <div className={style.delivery__item__title}>
        <p>{delivery.courier_code.toUpperCase()}</p>
      </div>
      <div className={style.delivery__item__body}>
        <p>{delivery.courier_name} </p>
      </div>
    </div>
  );
};

export default DeliveryItem;
