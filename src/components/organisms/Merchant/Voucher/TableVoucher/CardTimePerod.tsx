import React, { useEffect, useState } from 'react';
import { capitalizeFirstLetter } from '../../../../../helpers/capitalizeFirstLetter';
import { dateToMinuteHourMonthStringDayYear } from '../../../../../helpers/parseDate';
import { Tag } from '../../../../atoms';
import { CardVoucherProps } from './CardQuota';
import style from './index.module.scss';

const mapStatusToColor = {
  incoming: 'green',
  ongoing: 'blue',
  expired: 'red',
};

const CardTimePeriod: React.FC<CardVoucherProps> = ({ voucher }) => {
  const [status, setStatus] = useState('waiting');

  useEffect(() => {
    if (
      voucher.start_date > new Date().toISOString() &&
      voucher.expired_at > new Date().toISOString()
    ) {
      setStatus('incoming');
      return;
    }

    if (
      voucher.start_date < new Date().toISOString() &&
      voucher.expired_at > new Date().toISOString()
    ) {
      setStatus('ongoing');
      return;
    }

    if (
      voucher.start_date < new Date().toISOString() &&
      voucher.expired_at < new Date().toISOString()
    ) {
      setStatus('expired');
      return;
    }
  }, [voucher]);
  return (
    <div className={style.table__voucher__tp}>
      <ul className={style.table__voucher__tp}>
        <li className={style.table__voucher__tp__item}>
          <p className={style.table__voucher__tp__item__desc}>
            {dateToMinuteHourMonthStringDayYear(new Date(voucher.start_date))}
          </p>
          <p className={style.table__voucher__tp__item__desc}>
            {dateToMinuteHourMonthStringDayYear(new Date(voucher.expired_at))}
          </p>
        </li>
      </ul>
      <Tag
        className={style.table__voucher__tp__header__tag}
        color={mapStatusToColor[status as keyof typeof mapStatusToColor]}
      >
        {capitalizeFirstLetter(status)}
      </Tag>
    </div>
  );
};

export default CardTimePeriod;
