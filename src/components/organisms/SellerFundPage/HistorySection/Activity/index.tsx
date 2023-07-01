import React from 'react';
import { Link } from 'react-router-dom';
import { dateToMinuteHourMonthStringDayYear } from '../../../../../helpers/parseDate';
import { toRupiah } from '../../../../../helpers/toRupiah';
import { IFundActivity } from '../../../../../helpers/types';
import style from './index.module.scss';

interface ActivityProps {
  activity: IFundActivity;
}

const Activity: React.FC<ActivityProps> = ({ activity }) => {
  const invoices = activity.note.match(/\[(.*?)\]/);

  return (
    <div className={style.ti}>
      <div className={style.ti__header}>
        <p className={style.ti__header__title}>
          {activity.type === 'CR' ? 'Credit' : 'Debit'}
        </p>
        <p className={style.ti__header__date}>
          {dateToMinuteHourMonthStringDayYear(
            new Date(activity.issued_at),
            ' ',
          )}
        </p>
      </div>
      <p className={style.ti__notes}>
        {invoices ? (
          <>
            Pay Transaction for{' '}
            {invoices[1].split(',').map((invoice, index) => (
              <Link
                key={invoice}
                className={style.ti__invoice}
                to={`/transactions/${invoice}`}
              >
                {invoice}
                {index < invoices[1].split(',').length - 1 && ', '}
              </Link>
            ))}
          </>
        ) : (
          activity.note
        )}
      </p>
      <p
        className={`${style.ti__amount} ${
          activity.type === 'DR'
            ? style.ti__amount__red
            : style.ti__amount__green
        }`}
      >
        {activity.type !== 'CR' && '-'}
        {toRupiah(activity.amount)}
      </p>
    </div>
  );
};

export default Activity;
