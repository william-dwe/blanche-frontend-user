import React from 'react';
import style from './index.module.scss';
import { MdAccountBalanceWallet } from 'react-icons/md';
import { Tag } from '../../../atoms';
import {
  IGetWalletDetailsResponse,
  ISealabsPayAccounts,
} from '../../../../helpers/types';
import { dateToYearMonth } from '../../../../helpers/parseDate';
import classNames from 'classnames';

interface CardSealabsProps {
  slp: ISealabsPayAccounts;
  defaultPayment?: IGetWalletDetailsResponse | ISealabsPayAccounts;
}

const CardSealabs: React.FC<CardSealabsProps> = ({ slp, defaultPayment }) => {
  const classProps = classNames(
    style.card__payment,
    defaultPayment === slp ? style.card__payment__active : '',
  );
  return (
    <div className={classProps}>
      <div className={style.card__payment__icon}>
        <MdAccountBalanceWallet />
      </div>
      <div className={style.card__payment__content}>
        <h6>{slp.name_on_card}</h6>
        <p>{slp.card_number.match(/.{1,4}/g)?.join(' ')}</p>
        Active until <span>{dateToYearMonth(new Date(slp.active_date))}</span>
      </div>
      {slp.is_default && (
        <div className={style.card__payment__wallet}>
          <Tag color="gray">Default</Tag>
        </div>
      )}
    </div>
  );
};

export default CardSealabs;
