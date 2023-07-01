import React, { useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import Sidebar from '../../molecules/Sidebar';
import style from './index.module.scss';
import { Outlet, useSearchParams } from 'react-router-dom';
import './override.scss';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { parseSearchParams } from '../../../helpers/parseSearchParams';
import { setParams } from '../../../app/features/home/paramsSlice';
import { useGetProfileQuery } from '../../../app/features/profile/profileApiSlice';
import { useGetMerchantProfileQuery } from '../../../app/features/merchant/merchantApiSlice';
import { setMerchant, setUser } from '../../../app/features/auth/authSlice';
import { Loader } from '../..';

const { Header, Content } = Layout;

const MerchantLayout: React.FC = () => {
  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState(false);

  const { isLoggedIn, user, merchant } = useAppSelector((state) => state.auth);

  const { data: result, isLoading } = useGetProfileQuery(undefined, {
    skip: !isLoggedIn || (!isLoggedIn && !user),
  });

  const { data: resultMerchant, isLoading: isLoadingMerchant } =
    useGetMerchantProfileQuery(undefined, {
      skip: user?.role !== 'merchant',
    });

  useEffect(() => {
    if (!result) return;
    dispatch(setUser(result));
    if (result.role === 'merchant') {
      dispatch(setMerchant(resultMerchant));
    }
  }, [result, isLoggedIn, user, merchant]);

  useEffect(() => {
    if (!resultMerchant || user?.role !== 'merchant') return;
    dispatch(setMerchant(resultMerchant));
  }, [resultMerchant, isLoggedIn, user, merchant]);

  useEffect(() => {
    dispatch(setParams(parseSearchParams(searchParams)));
  }, [searchParams]);

  if (isLoading || isLoadingMerchant) {
    return <Loader />;
  }

  return (
    <Layout className={style.merchant__layout}>
      <Sidebar collapsed={collapsed} />
      <Layout
        className={classNames(
          'merchant__layout',
          style.merchant__layout__container,
        )}
      >
        <Header className={style.merchant__layout__header}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            },
          )}
        </Header>
        <Content className={style.merchant__layout__content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MerchantLayout;
