import { Divider } from 'antd';
import React from 'react';
import { dateToYearMonth } from '../../../helpers/parseDate';
import { Badge, Button } from '../../atoms';
import style from './index.module.scss';

interface UserSealabsPayProps {
  cardNumber: string;
  nameOnCard: string;
  activeDate: string;
  onDelete: () => void;
  onSetDefault: () => void;
  isDefault: boolean;
}

const UserSealabsPay: React.FC<UserSealabsPayProps> = ({
  cardNumber,
  nameOnCard,
  activeDate,
  onDelete,
  onSetDefault,
  isDefault,
}) => {
  return (
    <div className={style.usp}>
      <div className={style.usp__info}>
        <div className={style.usp__info__top}>
          <p className={style.usp__info__number}>
            {nameOnCard}
            <span> - </span>
            {cardNumber.match(/.{1,4}/g)?.join(' ')}
          </p>
          {isDefault && (
            <Badge
              className={style.card__address__badge}
              count="Default"
              color={'gray'}
            />
          )}
        </div>
        <p className={style.usp__info__active}>
          Active until <span>{dateToYearMonth(new Date(activeDate), '/')}</span>
        </p>
      </div>
      <Button
        onClick={onDelete}
        className={style.usp__info__delete}
        type="ghost"
        danger
      >
        Delete
      </Button>
      {!isDefault && (
        <>
          <Divider type="vertical" />
          <Button
            type="ghost"
            onClick={onSetDefault}
            className={style.usp__info__default}
          >
            Set as Default
          </Button>
        </>
      )}
    </div>
  );
};

export default UserSealabsPay;
