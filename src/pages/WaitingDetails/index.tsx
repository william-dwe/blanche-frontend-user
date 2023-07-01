import React from 'react';
import { SEO, WaitingDetailsPage } from '../../components';
import style from './index.module.scss';

const TransactionDetails: React.FC = () => {
  return (
    <>
      <SEO
        title="Waiting Payment Details"
        description="Waiting Payment Details page"
      />
      <div className={style.wd}>
        <WaitingDetailsPage />
      </div>
    </>
  );
};

export default TransactionDetails;
