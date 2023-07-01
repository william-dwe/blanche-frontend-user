import { TabsProps } from 'antd';
import React from 'react';
import { Card, Tabs } from '../../..';
import HistorySection from '../HistorySection';
import style from './index.module.scss';

const CardWalletDetails: React.FC = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `History`,
      children: <HistorySection />,
    },
  ];

  return (
    <Card className={style.card__wallet__details}>
      <Tabs
        defaultActiveKey="1"
        items={items}
        className={style.card__wallet__details__tab}
        size="large"
      />
    </Card>
  );
};

export default CardWalletDetails;
