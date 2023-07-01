import React from 'react';
import style from './index.module.scss';
import { Avatar, Button } from '../../atoms';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';

const CardMerchant: React.FC = () => {
  const { merchant } = useAppSelector((state: RootState) => state.auth);

  if (!merchant) {
    return (
      <Link to="/merchant-register" className={style.menu__merchant__register}>
        <p>
          Register your store now <br />
          and start selling your products
        </p>
        <Button type="primary">Register</Button>
      </Link>
    );
  }

  return (
    <Link
      to="/merchant/profile"
      className={style.menu__merchant__card__profile}
    >
      <div className={style.menu__merchant__card__profile__icon}>
        <Avatar size={50} src={merchant?.image} />
      </div>
      <div className={style.menu__merchant__card__profile__content}>
        <h6>{merchant?.name}</h6>
        <p>Go to store profile &gt;</p>
      </div>
    </Link>
  );
};

export default CardMerchant;
