import { Divider, Dropdown, MenuProps } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';
import { Avatar, Button } from '../../atoms';
import CardProfile from './CardProfile';
import CardWallet from './CardWallet';
import style from './index.module.scss';

const MenuProfile: React.FC = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <CardProfile />,
    },
    {
      key: '2',
      label: (
        <>
          <CardWallet />
          <Divider style={{ marginBottom: 0 }} />
        </>
      ),
    },
    {
      key: '3',
      label: (
        <Link to="transactions" className={style.menu__profile__item}>
          <p>My Transactions</p>
        </Link>
      ),
    },
    {
      key: '4',
      label: (
        <Link to="favorite-products" className={style.menu__profile__item}>
          <p>My Favorite Products</p>
        </Link>
      ),
    },
    {
      key: '5',
      label: (
        <Link to="refunds" className={style.menu__profile__item}>
          <p>Refunds</p>
        </Link>
      ),
    },
    {
      key: '6',
      label: (
        <Link to="transactions/waiting" className={style.menu__profile__item}>
          <p>Waiting Payment</p>
        </Link>
      ),
    },
  ];
  return (
    <Dropdown
      menu={{ items }}
      className={style.menu__profile}
      overlayClassName={style.menu__profile}
    >
      <Button className={style.menu__profile__btn} type="text">
        <Avatar src={user?.profile_picture} />
        <p> {user?.username}</p>
      </Button>
    </Dropdown>
  );
};

export default MenuProfile;
