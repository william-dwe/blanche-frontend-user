import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dateToMinuteHourMonthStringDayYear } from '../../../../../helpers/parseDate';
import { toRupiah } from '../../../../../helpers/toRupiah';
import { ITransactionOverview } from '../../../../../helpers/types';
import style from './index.module.scss';

interface TransactionItemProps {
  transaction: ITransactionOverview;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const [newNotes, setNewNotes] = React.useState<string>(transaction.notes);

  useEffect(() => {
    const invoices = transaction.notes.match(/\[(.*?)\]/);
    // if (!invoices) {

    if (invoices) {
      setNewNotes(transaction.notes.replace(invoices[0], ''));
    }
  }, [newNotes]);

  const invoices = transaction.notes.match(/\[(.*?)\]/);

  return (
    <div className={style.ti}>
      <div className={style.ti__header}>
        <p className={style.ti__header__title}>{transaction.title}</p>
        <p className={style.ti__header__date}>
          {dateToMinuteHourMonthStringDayYear(
            new Date(transaction.issued_at),
            ' ',
          )}
        </p>
      </div>
      <p className={style.ti__notes}>
        {invoices ? (
          <>
            {newNotes}{' '}
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
            `{' '}
          </>
        ) : (
          transaction.notes
        )}
      </p>
      <p
        className={`${style.ti__amount} ${
          transaction.wallet_transaction_type.code === 'DR'
            ? style.ti__amount__red
            : style.ti__amount__green
        }`}
      >
        {toRupiah(transaction.amount)}
      </p>
    </div>
  );
};

export default TransactionItem;
