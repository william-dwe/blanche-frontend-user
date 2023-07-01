import { TabsProps } from 'antd';
import React from 'react';
import { Card } from '../../../atoms';
import { Tabs } from '../../../molecules';
import AddressSection from '../AddressSection';
import ProfileSection from '../ProfileSection';
import SealabsPaySection from '../SealabsPaySection';
import style from './index.module.scss';

const CardProfileDetails: React.FC = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Profile`,
      children: <ProfileSection />,
    },
    {
      key: '2',
      label: `Address`,
      children: <AddressSection />,
    },
    {
      key: '3',
      label: `Sealabs Pay`,
      children: <SealabsPaySection />,
    },
  ];

  return (
    <Card className={style.card__profile__details}>
      <Tabs
        defaultActiveKey="1"
        items={items}
        className={style.card__profile__details__tab}
        size="large"
      />
    </Card>
  );
};

export default CardProfileDetails;
