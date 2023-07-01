import React from 'react';
import { MerchantProfile, SEO } from '../../../components';
import style from './index.module.scss';

const Profile: React.FC = () => {
  return (
    <>
      <SEO title="Merchant Profile" description="Merchant Profile page" />
      <div className={style.profile}>
        <MerchantProfile />
      </div>
    </>
  );
};

export default Profile;
