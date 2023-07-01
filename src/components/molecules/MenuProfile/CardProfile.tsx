import React from 'react';
import style from './index.module.scss';
import { Avatar } from '../../atoms';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';

const CardProfile: React.FC = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  return (
    <Link to="/profile" className={style.menu__profile__card__profile}>
      <div className={style.menu__profile__card__profile__icon}>
        <Avatar size={50} src={user?.profile_picture} />
      </div>
      <div className={style.menu__profile__card__profile__content}>
        <h6>{user?.fullname}</h6>
        <p>Go to my profile &gt;</p>
      </div>
    </Link>
  );
};

export default CardProfile;
