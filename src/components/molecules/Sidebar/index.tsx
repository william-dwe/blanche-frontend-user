import {
  HomeOutlined,
  PercentageOutlined,
  ReloadOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingOutlined,
  TagOutlined,
  UserOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import React from 'react';
import { Menu } from '../..';
import style from './index.module.scss';
import { Logo, LogoIcon } from '../../atoms';
import { Layout, MenuProps } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { MenuDividerType } from 'antd/es/menu/hooks/useItems';

interface SidebarProps {
  collapsed: boolean;
}

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items = [
  getItem('Home', '', <HomeOutlined />),
  getItem('Profile', 'profile', <UserOutlined />),
  { type: 'divider' } as MenuDividerType,
  getItem('Fund', 'wallet', <WalletOutlined />),
  { type: 'divider' } as MenuDividerType,
  getItem('Products', 'sub1', <ShopOutlined />, [
    getItem('Product List', 'products'),
    getItem('Create Product', 'products/create'),
  ]),
  getItem('Orders', 'orders', <ShoppingOutlined />),
  getItem('Refund', 'refunds', <ReloadOutlined />),
  { type: 'divider' } as MenuDividerType,
  getItem('Promotions', 'sub2', <PercentageOutlined />, [
    getItem('Promotion List', 'promotions'),
    getItem('Create Promotion', 'promotions/create'),
  ]),
  getItem('Vouchers', 'sub3', <TagOutlined />, [
    getItem('Voucher List', 'vouchers'),
    getItem('Create Voucher', 'vouchers/create'),
  ]),
  { type: 'divider' } as MenuDividerType,
  getItem('Settings', 'sub4', <SettingOutlined />, [
    getItem('Address', 'address'),
    getItem('Shipping', 'shipping'),
  ]),
];

const { Sider } = Layout;

const defaultOpenKeys = ['sub1', 'sub2', 'sub3', 'sub4'];

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const lastPath = location.pathname.split('/').slice(2).join('/');

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(`/merchant/${e.key}`);
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className={style.sidebar}
      width={300}
    >
      {collapsed ? (
        <LogoIcon className={style.sidebar__logo} size="small" />
      ) : (
        <Logo className={style.sidebar__logo} size="extrasmall" />
      )}
      <Menu
        theme="light"
        className={style.sidebar__menu}
        items={items}
        onClick={onClick}
        mode="inline"
        defaultOpenKeys={defaultOpenKeys}
        defaultSelectedKeys={[lastPath || '']}
      />
    </Sider>
  );
};

export default Sidebar;
