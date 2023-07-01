import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { LogoIcon, Search } from '../../atoms';
import style from './index.module.scss';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';

const { Header } = Layout;

const SearchBarMobile: React.FC = () => {
  const navigate = useNavigate();
  const params = useAppSelector((state) => state.params);
  const [search, setSearch] = useState('');
  const [searchParams] = useSearchParams();

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

  return (
    <Header className={style.header}>
      <nav className={style.nav}>
        <LogoIcon className={style.nav__logo} size="small" />
        <Search
          onSearch={onSearch}
          placeholder="Search on blanche"
          defaultValue={params.search.q}
          onChange={onChange}
          value={search}
        />
      </nav>
    </Header>
  );
};

export default SearchBarMobile;
