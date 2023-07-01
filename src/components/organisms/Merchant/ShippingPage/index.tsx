import React from 'react';
import { Card } from '../../../atoms';
import style from './index.module.scss';
import ShippingList from './ShippingList';

const ShippingPage: React.FC = () => {
  return (
    <Card className={style.sp}>
      <ShippingList />
    </Card>
  );
};

export default ShippingPage;
