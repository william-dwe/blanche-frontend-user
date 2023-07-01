import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetRecommendationsQuery } from '../../../app/features/home/homeApiSlice';
import { Button } from '../../atoms';
import { ListCardProduct } from '../../molecules';
import style from './index.module.scss';

const limit = 18;

const Recommended: React.FC = () => {
  const { data, isLoading } = useGetRecommendationsQuery({ limit });
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/recommendation');
  };

  return (
    <div className={style.recommended}>
      <div className={style.recommended__separator}>
        <h2 className={style.recommended__title}>Recommended For You</h2>
      </div>
      <ListCardProduct data={data} isLoading={isLoading} />
      <div className={style.recommended__wrapper}>
        <Button
          type="primary"
          className={style.recommended__button}
          onClick={onClick}
          ghost
        >
          View all
        </Button>
      </div>
    </div>
  );
};

export default Recommended;
