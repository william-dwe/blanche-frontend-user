import React from 'react';
import { ChangePinPage, SEO } from '../../components';
import style from './index.module.scss';

const ChangePin: React.FC = () => {
  return (
    <>
      <SEO title="Change Pin" description="Change pin page" />
      <div className={style.cp}>
        <ChangePinPage />
      </div>
    </>
  );
};

export default ChangePin;
