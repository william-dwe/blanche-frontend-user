import React from 'react';
import { ChangePasswordPage, SEO } from '../../components';
import style from './index.module.scss';

const ChangePassword: React.FC = () => {
  return (
    <>
      <SEO title="Change Password" description="Change password page" />
      <div className={style.cp}>
        <ChangePasswordPage />
      </div>
    </>
  );
};

export default ChangePassword;
