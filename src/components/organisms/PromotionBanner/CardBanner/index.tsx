import React from 'react';
import style from './index.module.scss';
import { IPromotionBanner } from '../../../../helpers/types';
import classNames from 'classnames';

interface CardBannerProps {
  banner: IPromotionBanner
}

const CardBanner: React.FC<CardBannerProps> = ({banner}) => {
  return (
    <div  className={style.card__banner}>
      <div style={{backgroundImage: `url(${banner.image_url})`}} 
        className={classNames(style.card__banner__img)}>
      </div>
      <div className={style.card__banner__content}>
        <h4>{banner.name}</h4>
        <p>
          {banner.description}
        </p>
      </div>
    </div>
  );
};

export default CardBanner;
