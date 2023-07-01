import { Skeleton, TabsProps } from 'antd';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tabs } from '../../..';
import ListProducts from '../ListProducts';
import MostPurchased from '../MostPurchased';

const items: TabsProps['items'] = [
  {
    key: '',
    label: `Home`,
    children: <MostPurchased />,
  },
  {
    key: 'products',
    label: `Products`,
    children: <ListProducts />,
  },
];

const SellerProducts: React.FC = () => {
  const navigate = useNavigate();
  const { store } = useParams();

  const onChange = (key: string) => {
    navigate(`/${store}/${key}`);
  };
  return (
    <Skeleton loading={false}>
      <Tabs onChange={onChange} size="large" items={items} />
    </Skeleton>
  );
};

export default SellerProducts;
