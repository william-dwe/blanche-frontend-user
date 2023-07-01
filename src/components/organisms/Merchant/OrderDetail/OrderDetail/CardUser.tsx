import React from 'react';
import { Avatar } from '../../../../atoms';
import style from './index.module.scss';
import { IMerchantOrderUser } from '../../../../../helpers/types/merchant/merchant-order.interface';

interface CardUserProps {
  user: IMerchantOrderUser;
}

const CardUser: React.FC<CardUserProps> = ({ user }) => {
  return (
    <div className={style.od__card__profile}>
      <Avatar size={40} src={user.profile_picture} />
      <div className={style.od__card__profile__details}>
        <h3 className={style.od__card__profile__details__name}>
          {user.username}
        </h3>
      </div>
    </div>
  );
};

export default CardUser;
