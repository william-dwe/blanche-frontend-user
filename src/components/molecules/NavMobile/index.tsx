/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Header } from 'antd/es/layout/layout';
import React from 'react';
import { FaCalendarTimes, FaFileExcel, FaHome, FaUser } from 'react-icons/fa';
import { MdFavorite, MdShoppingBag } from 'react-icons/md';
import { useAppSelector } from '../../../app/hooks';
import style from './index.module.scss';
import NavItem from './NavItem';

const NavMobile = (): JSX.Element => {
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);

  return (
    <Header className={style.navbar__wrapper} id="navbar">
      <NavItem path="/" icon={<FaHome />} />
      {!isLoggedIn && <NavItem path="/login" icon={<FaUser />} />}
      {isLoggedIn && (
        <>
          <NavItem path="/profile" icon={<FaUser />} />
          <NavItem path="/cart" icon={<MdShoppingBag />} />
          <NavItem path="/favorite-products" icon={<MdFavorite />} />
          <NavItem path="/transactions" icon={<FaCalendarTimes />} />
          {user?.role === 'merchant' && (
            <NavItem path="/merchant" icon={<FaFileExcel />} />
          )}
        </>
      )}
    </Header>
  );
};

export default NavMobile;
