import React from 'react';
import { IGetReviewsResponse } from '../../../../../helpers/types/review.interface';
import CardReview from './CardReview';
import style from './index.module.scss';

interface ListReviewsProps {
  data: IGetReviewsResponse | undefined;
}

const ListReviews: React.FC<ListReviewsProps> = ({ data }) => {
  if (data?.reviews.length === 0) {
    return (
      <p className={style.no__review}>
        This product doesnt have any review yet
      </p>
    );
  }

  return (
    <div className={style.list__reviews}>
      {data?.reviews.map((review, index) => (
        <CardReview key={review.product_name + index} data={review} />
      ))}
    </div>
  );
};

export default ListReviews;
