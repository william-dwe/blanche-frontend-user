import classNames from 'classnames';
import React from 'react';
import { Filter } from '../../molecules';
import style from './index.module.scss';
import FilterCategory from '../FilterCategory';
import FilterPrice from '../FilterPrice';
import FilterRating from '../FilterRating';
import FilterSellerLocation from '../FilterSellerLocation';
import { IPanel } from '../../molecules/Filter';
import { Key } from 'antd/es/table/interface';
import './override.scss';
import { ResetFilterProduct } from '../..';
import { Drawer } from 'antd';

interface FilterProductProps {
  onSelectCategory: (selectedKeysValue: Key[]) => void;
  selectedCategory: string | undefined;
  onClose: () => void;
  open: boolean;
}

const FilterProductMobile: React.FC<FilterProductProps> = ({
  onSelectCategory,
  selectedCategory,
  onClose,
  open,
}) => {
  const panels: IPanel[] = [
    {
      header: 'Categories',
      children: (
        <FilterCategory
          onSelectCategory={onSelectCategory}
          selectedCategory={selectedCategory}
        />
      ),
      key: 'category',
    },
    {
      header: 'Seller Location',
      children: <FilterSellerLocation />,
      key: 'location',
    },
    {
      header: 'Price',
      children: <FilterPrice />,
      key: 'price',
    },
    {
      header: 'Minimum Rating',
      children: <FilterRating />,
      key: 'rating',
    },
  ];

  const classProps = classNames(style.filter, 'filter');
  return (
    <Drawer
      placement={'left'}
      closable={true}
      onClose={onClose}
      open={open}
      width={280}
    >
      <Filter
        panels={panels}
        defaultActiveKey={panels.map((panel) => panel.key)}
        className={classProps}
        ghost
        resetChildren={<ResetFilterProduct />}
      />
    </Drawer>
  );
};

export default FilterProductMobile;
