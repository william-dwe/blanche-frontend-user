import React from 'react';
import { ForgetPasswordPage, SEO } from '../../components';
import style from './index.module.scss';

const ForgetPassword: React.FC = () => {
  return (
    <>
      <SEO title="Forget Password" description="Forget password page" />
      <div className={style.fp}>
        <ForgetPasswordPage />
      </div>
    </>
  );
};

export default ForgetPassword;
