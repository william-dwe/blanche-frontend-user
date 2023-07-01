import { Skeleton } from 'antd';
import { Key } from 'antd/es/table/interface';
import { DataNode } from 'antd/es/tree';
import React, { useEffect } from 'react';
import { useGetCategoriesQuery } from '../../../app/features/home/homeApiSlice';
import { Tree } from '../..';
import style from './index.module.scss';
import { ICategory } from '../../../helpers/types';

interface FilterCategoryProps {
  onSelectCategory: (selectedKeysValue: Key[]) => void;
  selectedCategory: string | undefined;
  categoriesData?: ICategory[];
  skipFetch?: boolean;
}

const FilterCategory: React.FC<FilterCategoryProps> = ({
  onSelectCategory,
  selectedCategory,
  categoriesData,
  skipFetch,
}) => {
  const { data, isLoading } = useGetCategoriesQuery({}, { skip: skipFetch });
  const [categories, setCategories] = React.useState<DataNode[]>([]);

  useEffect(() => {
    const newData = categoriesData || data;
    if (newData) {
      const newCategories = newData.map((category) => ({
        title: category.name,
        key: category.slug,
        children: category.children?.map((subCategory) => ({
          title: subCategory.name,
          key: subCategory.slug,
          children: subCategory.children?.map((subSubCategory) => ({
            title: subSubCategory.name,
            key: subSubCategory.slug,
          })),
        })),
      }));
      setCategories(newCategories);
    }
  }, [data, categoriesData]);

  return (
    <Skeleton loading={isLoading}>
      {categories.length && (
        <Tree
          treeData={categories}
          onSelect={onSelectCategory}
          selectedKeys={[selectedCategory || '']}
          defaultExpandedKeys={[selectedCategory || '']}
          className={style.category}
        />
      )}
    </Skeleton>
  );
};

export default FilterCategory;
