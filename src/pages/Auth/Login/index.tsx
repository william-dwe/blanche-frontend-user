import React from 'react';
import { CardLogin, SEO } from '../../../components';
import AuthLayoutPage from '../../../components/layouts/Auth';

const Login: React.FC = () => {
  return (
    <AuthLayoutPage>
      <SEO title="Login" description="Login page" />
      <CardLogin />
    </AuthLayoutPage>
  );
};

export default Login;
