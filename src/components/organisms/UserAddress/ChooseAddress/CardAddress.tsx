import classNames from 'classnames';
import React from 'react';
import { Badge, Card } from '../../../atoms';
import style from './index.module.scss';
import { IUserAddress } from '../../../../helpers/types';

interface CardAddressProps {
  data: IUserAddress;
  address: IUserAddress;
}

const CardAddress: React.FC<CardAddressProps> = ({ data, address }) => {
  const classProps = classNames(
    style.card__address,
    data?.id === address?.id ? style.card__address__active : '',
  );

  return (
    <Card className={classProps}>
      <div className={style.card__address__title}>
        <p>{data.label}</p>
        {data?.is_default && (
          <Badge
            className={style.card__address__badge}
            count="Default"
            color={'gray'}
          />
        )}
      </div>
      <ul className={style.card__address__content}>
        <li>
          {data?.name} ({data?.phone})
        </li>
        <li>{data?.details}</li>
        <li>
          {data?.subdistrict_name}, {data?.district_name} {data?.zip_code}
        </li>
        <li>
          {data?.city_name}, {data?.province_name}
        </li>
      </ul>
    </Card>
  );
};

export default CardAddress;
