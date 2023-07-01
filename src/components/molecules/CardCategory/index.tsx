import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ICategory } from '../../../helpers/types';
import { Card, Image } from '../../atoms';
import style from './index.module.scss';

export interface CardCategoryProps {
  category: ICategory;
}

const CardCategory: React.FC<CardCategoryProps> = ({ category }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/c/${category.slug}`);
  };

  return (
    <Card className={style.cc} onClick={handleClick}>
      <Image
        src={category.image_url}
        alt={category.name}
        className={style.cc__image}
      />
      <p className={style.cc__name}>{category.name}</p>
    </Card>
  );
};

export default CardCategory;
