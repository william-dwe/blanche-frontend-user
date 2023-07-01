import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Button, Logo, Search } from '../../atoms';
import style from './index.module.scss';
import CartButton from '../CartButton';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useLogoutMutation } from '../../../app/features/auth/authApiSlice';
import { logout } from '../../../app/features/auth/authSlice';
import MenuProfile from '../MenuProfile';
import MenuMerchant from '../MenuMerchant';

const { Header } = Layout;

const Nav: React.FC = () => {
  const navigate = useNavigate();
  const params = useAppSelector((state) => state.params);
  const [search, setSearch] = useState('');
  const [searchParams] = useSearchParams();

  const { isLoggedIn, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [logOut, { isLoading }] = useLogoutMutation();

  useEffect(() => {
    const search = params.search.q;
    setSearch(search || '');
  }, [params.search.q, searchParams]);

  const onSearch = (value: string) => {
    navigate({
      pathname: '/search',
      search: createSearchParams({ q: value }).toString(),
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleLogout = async () => {
    await logOut().unwrap();
    dispatch(logout());
    navigate(0);
  };

  return (
    <Header className={style.header}>
      <nav className={style.nav}>
        <Logo className={style.nav__logo} size="small" />
        <Search
          onSearch={onSearch}
          placeholder="Search on blanche"
          defaultValue={params.search.q}
          onChange={onChange}
          value={search}
        />{' '}
        <CartButton onClick={() => navigate('/cart')} />
        <div
          className={style.header__button}
          style={{ display: 'flex', gap: 10 }}
        >
          {!isLoggedIn && !user ? (
            <>
              <Button
                type="primary"
                size="small"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button
                type="primary"
                size="small"
                ghost
                onClick={() => navigate('/register')}
              >
                Register
              </Button>
            </>
          ) : (
            <>
              <MenuMerchant />
              <MenuProfile />
              <Button onClick={handleLogout} loading={isLoading}>
                Logout
              </Button>
            </>
          )}
        </div>
      </nav>
    </Header>
  );
};

export default Nav;
