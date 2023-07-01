import React from 'react';
import { SEO } from '../../../components';
import AuthLayoutPage from '../../../components/layouts/Auth';
import CardRegister from '../../../components/organisms/Auth/CardRegister';

const Register: React.FC = () => {
  return (
    <AuthLayoutPage>
      <SEO title="Register" description="Register page" />
      <CardRegister />
    </AuthLayoutPage>
  );
};

export default Register;
