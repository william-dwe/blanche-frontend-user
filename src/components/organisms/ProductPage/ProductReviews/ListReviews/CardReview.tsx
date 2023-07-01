import React from 'react';
import { dateToMinuteHourMonthStringDayYear } from '../../../../../helpers/parseDate';
import { IReview } from '../../../../../helpers/types/review.interface';
import { Avatar, Card, Image, Rate } from '../../../../atoms';
import style from './index.module.scss';

interface CardReviewProps {
  data: IReview;
}

const CardReview: React.FC<CardReviewProps> = ({ data }) => {
  return (
    <Card className={style.card__review}>
      <div className={style.card__review__rating}>
        <Rate disabled value={data.rating} />
        <p>{dateToMinuteHourMonthStringDayYear(new Date(data.reviewed_at))}</p>
      </div>
      <div className={style.card__review__body}>
        <div className={style.card__review__body__user}>
          <Avatar />
          <p>{data.username}</p>
        </div>
        {data.image_url && (
          <Image
            src={data.image_url || ''}
            alt=""
            className={style.card__review__body__img}
          />
        )}
        {data.description && (
          <p className={style.card__review__body__text}>
            {data.description || ''}
          </p>
        )}
      </div>
    </Card>
  );
};

export default CardReview;
