import React, { useEffect, useState } from 'react';
import { capitalizeFirstLetter } from '../../../../../helpers/capitalizeFirstLetter';
import { dateToMinuteHourMonthStringDayYear } from '../../../../../helpers/parseDate';
import { Tag } from '../../../../atoms';
import { TableItemProps } from './CardPromotion';
import style from './index.module.scss';

const mapStatusToColor = {
  incoming: 'green',
  ongoing: 'blue',
  expired: 'red',
};

const CardTimePeriod: React.FC<TableItemProps> = ({ promotion }) => {
  const [status, setStatus] = useState('waiting');

  useEffect(() => {
    if (
      promotion.start_date > new Date().toISOString() &&
      promotion.end_date > new Date().toISOString()
    ) {
      setStatus('incoming');
      return;
    }

    if (
      promotion.start_date < new Date().toISOString() &&
      promotion.end_date > new Date().toISOString()
    ) {
      setStatus('ongoing');
      return;
    }

    if (
      promotion.start_date < new Date().toISOString() &&
      promotion.end_date < new Date().toISOString()
    ) {
      setStatus('expired');
      return;
    }
  }, [promotion]);
  return (
    <div className={style.table__promotions__tp}>
      <ul className={style.table__promotions__tp}>
        <li className={style.table__promotions__tp__item}>
          <p className={style.table__promotions__tp__item__desc}>
            {dateToMinuteHourMonthStringDayYear(new Date(promotion.start_date))}
          </p>
          <p className={style.table__promotions__tp__item__desc}>
            {dateToMinuteHourMonthStringDayYear(new Date(promotion.end_date))}
          </p>
        </li>
      </ul>
      <Tag
        className={style.table__promotions__tp__header__tag}
        color={mapStatusToColor[status as keyof typeof mapStatusToColor]}
      >
        {capitalizeFirstLetter(status)}
      </Tag>
    </div>
  );
};

export default CardTimePeriod;
