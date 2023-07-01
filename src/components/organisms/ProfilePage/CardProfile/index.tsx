import { Divider, Skeleton } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CardWallet } from '../../..';
import { useLogoutMutation } from '../../../../app/features/auth/authApiSlice';
import { logout } from '../../../../app/features/auth/authSlice';
import { useGetProfileQuery } from '../../../../app/features/profile/profileApiSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { Avatar, Card, Button } from '../../../atoms';
import style from './index.module.scss';

const CardProfile: React.FC = () => {
  const { data, isLoading } = useGetProfileQuery();
  const [logOut, { isLoading: isLoadingLogout }] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    await logOut().unwrap();
    dispatch(logout());
    navigate(0);
  };
  return (
    <Card className={style.card__profile}>
      <Skeleton loading={isLoading}>
        <div className={style.card__profile__header}>
          <Avatar size={60} src={data?.profile_picture} />
          <div className={style.card__profile__header__details}>
            <h3 className={style.card__profile__header__details__name}>
              {data?.fullname}
            </h3>
            <p className={style.card__profile__header__details__member}>
              Member
            </p>
          </div>
        </div>
        <Divider />
        <CardWallet />
        <Divider />
        <div className={style.nav_profile}>
          <Link to="/transactions" className={style.nav__profile__item}>
            <p>My Transactions</p>
          </Link>
          <Link to="/favorite-products" className={style.nav__profile__item}>
            <p>My Favorite Products</p>
          </Link>
          <Link to="/refunds" className={style.nav__profile__item}>
            <p>Refunds</p>
          </Link>
          <Link to="/transactions/waiting" className={style.nav__profile__item}>
            <p>Waiting Payment</p>
          </Link>
          {user?.role === 'merchant' && (
            <Link to="/merchant" className={style.nav__profile__item}>
              <p>Merchant</p>
            </Link>
          )}
          <Button
            type="primary"
            block
            loading={isLoadingLogout}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </Skeleton>
    </Card>
  );
};

export default CardProfile;
