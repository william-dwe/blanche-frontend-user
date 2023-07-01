import React from 'react';
import { Card, Image } from '../../../../atoms';
import style from './index.module.scss';

const CardPromotionType: React.FC = () => {
  return (
    <Card className={style.form__promotion__item}>
      <div className={style.form__promotion__item__header}>
        <h3 className={style.form__promotion__item__header__title}>
          Promotion Type
        </h3>
      </div>
      <div className={style.form__promotion__item__type}>
        <Image
          className={style.form__promotion__item__type__image}
          src="/assets/png/promotion.png"
          alt=""
          imageClassName={style.form__promotion__item__type__img}
        />
        <div className={style.form__promotion__item__type__desc}>
          <p>Promotion</p>
          <p>Promotion for selected products</p>
        </div>
      </div>
    </Card>
  );
};

export default CardPromotionType;
