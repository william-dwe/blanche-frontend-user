import React from 'react';
import { Carousel } from 'antd';
import CardBanner from './CardBanner';
import style from './index.module.scss';
import './override.scss';
import classNames from 'classnames';
import { IParams } from '../../../helpers/types';
import { useGetPromotionsQuery } from '../../../app/features/marketplace/promotionApiSlice';

const PromotionBanner: React.FC = () => {
  const paramPromotion: IParams = {
    limit: 5,
  };

  const { data, isSuccess } = useGetPromotionsQuery(paramPromotion);

  return (
    <Carousel
      className={classNames(style.promotion__banner, 'promotion__banner')}
      autoplay
      swipeToSlide
      draggable
    >
      {isSuccess &&
        data?.promotion_banners?.map((banner) => (
          <CardBanner key={banner.id} banner={banner} />
        ))}
    </Carousel>
  );
};

export default PromotionBanner;
