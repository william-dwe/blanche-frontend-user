import classNames from 'classnames';
import React from 'react';
import { Filter } from '../../molecules';
import style from './index.module.scss';
import FilterCategory from '../FilterCategory';
import { IPanel } from '../../molecules/Filter';
import { Key } from 'antd/es/table/interface';
import { useGetMerchantCategoriesQuery } from '../../../app/features/merchant/merchantApiSlice';
import { useParams } from 'react-router-dom';

interface FilterSellerProductProps {
  onSelectCategory: (selectedKeysValue: Key[]) => void;
  selectedCategory: string | undefined;
}

const FilterSellerProduct: React.FC<FilterSellerProductProps> = ({
  onSelectCategory,
  selectedCategory,
}) => {
  const params = useParams();
  const { store } = params;
  const categories = useGetMerchantCategoriesQuery(store || '', {
    skip: !store,
  });
  const panels: IPanel[] = [
    {
      header: 'Categories',
      children: (
        <FilterCategory
          onSelectCategory={onSelectCategory}
          selectedCategory={selectedCategory}
          categoriesData={categories.data}
          skipFetch
        />
      ),
      key: 'category',
    },
  ];

  const classProps = classNames(style.filter, 'filter');
  return (
    <Filter
      panels={panels}
      defaultActiveKey={panels.map((panel) => panel.key)}
      className={classProps}
      ghost
    />
  );
};

export default FilterSellerProduct;
