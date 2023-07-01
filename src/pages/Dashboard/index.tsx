import React from 'react';
import { DashboardPage, SEO } from '../../components';
import style from './index.module.scss';

const Dashboard: React.FC = () => {
  return (
    <>
      <SEO title="Dashboard" description="Dashboard page" />
      <div className={style.dashboard}>
        <div className={style.dashboard__header}>
          <h3 className={style.dashboard__header__title}>Dashboard</h3>
        </div>
        <DashboardPage />
      </div>
    </>
  );
};

export default Dashboard;
