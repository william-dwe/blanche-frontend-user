import { Skeleton, TabsProps } from 'antd';
import React from 'react';
import useProduct from '../../../../../hooks/useProduct';
import { Tabs } from '../../../../molecules';
import style from './index.module.scss';
import ProductDescriptionItem from './ProductDescriptionItem';
import ProductSpecification from './ProductSpesification';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: `Description`,
    children: <ProductDescriptionItem />,
  },
  {
    key: '2',
    label: `Specification`,
    children: <ProductSpecification />,
  },
];

const ProductDescription: React.FC = () => {
  const { isLoading } = useProduct();

  return (
    <Skeleton loading={isLoading}>
      <Tabs
        defaultActiveKey="1"
        items={items}
        className={style.product__description}
        size="middle"
      />
    </Skeleton>
  );
};

export default ProductDescription;
