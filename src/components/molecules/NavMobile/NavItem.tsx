import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './index.module.scss';

export interface MenuItemProps {
  icon?: React.ReactNode;
  path: string;
  label?: string;
}

const NavItem: React.FC<MenuItemProps> = ({ icon, path }) => {
  const classActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? style.navbar__item__isActive : style.navbar__item__link;

  return (
    <div className={style.navbar__item}>
      <NavLink to={path} className={classActive}>
        {icon}
      </NavLink>
    </div>
  );
};

export default NavItem;
