import { Dropdown, MenuProps } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { Avatar, Button } from '../../atoms';
import CardMerchant from './CardMerchant';
import style from './index.module.scss';

const MenuMerchant: React.FC = () => {
  const { merchant } = useAppSelector((state) => state.auth);

  const items: MenuProps['items'] = merchant
    ? [
        {
          key: '1',
          label: <CardMerchant />,
        },
        {
          key: '2',
          label: (
            <Link to="/merchant" className={style.menu__merchant__item}>
              <p>Go to Store</p>
            </Link>
          ),
        },
        {
          key: '3',
          label: (
            <Link to="/merchant/orders" className={style.menu__merchant__item}>
              <p>My Orders</p>
            </Link>
          ),
        },
      ]
    : [
        {
          key: '1',
          label: <CardMerchant />,
        },
      ];

  if (!merchant) {
    return (
      <Dropdown menu={{ items }} className={style.menu__merchant}>
        <Button className={style.menu__merchant__btn} type="text">
          <Avatar />
          Store
        </Button>
      </Dropdown>
    );
  }

  return (
    <Dropdown menu={{ items }} className={style.menu__merchant}>
      <Button className={style.menu__merchant__btn} type="text">
        <Avatar src={merchant?.image} />
        <p>{merchant?.name}</p>
      </Button>
    </Dropdown>
  );
};

export default MenuMerchant;
