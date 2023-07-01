import React from 'react';
import { useGetCategoriesQuery } from '../../../app/features/home/homeApiSlice';
import { Carousel } from '../../molecules';
import CardCategory from '../../molecules/CardCategory';
import style from './index.module.scss';

const CategoryCarousel: React.FC = () => {
  const { data: categories } = useGetCategoriesQuery({ level: 1 });
  return (
    <div className={style.cc}>
      <h2 className={style.cc__header}>Categories</h2>
      {categories && (
        <Carousel>
          {categories.map((category, index) => (
            <CardCategory
              category={category}
              key={`${index} ${categories[index].name}`}
            />
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default CategoryCarousel;
