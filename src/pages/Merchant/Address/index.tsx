import React from 'react';
import { AddressSection, Card, SEO } from '../../../components';
import style from './index.module.scss';

const Address: React.FC = () => {
  return (
    <>
      <SEO title="Merchant Address" description="Merchant Address page" />
      <Card className={style.address}>
        <AddressSection />
      </Card>
    </>
  );
};

export default Address;
