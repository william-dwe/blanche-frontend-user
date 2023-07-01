import React from 'react';
import { ProfilePage, SEO } from '../../components';
import style from './index.module.scss';

const Profile: React.FC = () => {
  return (
    <>
      <SEO title="Profile" description="Profile page" />
      <div className={style.profile__page}>
        <ProfilePage />
      </div>
    </>
  );
};

export default Profile;
