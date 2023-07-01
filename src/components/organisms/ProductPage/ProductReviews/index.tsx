import { Divider } from 'antd';
import React from 'react';
import style from './index.module.scss';
import ListReviews from './ListReviews';
import Rating from '../../FilterRating';
import { FilterReview, Pagination, Card } from '../../..';
import { useGetReviewsQuery } from '../../../../app/features/reviews/reviewsApiSlice';
import { useAppSelector } from '../../../../app/hooks';
import { useParams } from 'react-router-dom';

const limit = 6;

const ProductReviews: React.FC = () => {
  const { store, slug } = useParams();

  const params = useAppSelector((state) => state.params);

  const { data } = useGetReviewsQuery(
    {
      ...params.search,
      limit,
      domain: store ? store : '',
      slug: slug ? slug : '',
    },
    {
      skip: !slug && !store,
    },
  );

  return (
    <div className={style.product__reviews}>
      <h5>Product Reviews</h5>
      <Divider />
      <div className={style.product__reviews__body}>
        <Card className={style.product__reviews__body__filter}>
          <Rating paramsQuery="rating" />
          <FilterReview />
        </Card>
        <div className={style.product__reviews__body__filter__item}>
          <ListReviews data={data} />{' '}
          {data && data.total_data > limit && Boolean(data.reviews.length) && (
            <div className={style.tl__pagination}>
              <Pagination
                total={data.total_data}
                pageSize={limit}
                showSizeChanger={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
