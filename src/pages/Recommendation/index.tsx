import React from 'react';
import { useGetRecommendationsQuery } from '../../app/features/home/homeApiSlice';
import { useAppSelector } from '../../app/hooks';
import { ListCardProduct, Pagination, SEO } from '../../components';
import style from './index.module.scss';

const limit = 30;

const Recommendation: React.FC = () => {
  const params = useAppSelector((state) => state.params);
  const { data, isLoading } = useGetRecommendationsQuery({
    limit,
    page: params.search.page || 1,
  });

  return (
    <>
      <SEO
        title="Check our recommendation for you"
        description="Recommendation page"
      />
      <div className={style.recommendation}>
        <h1 className={style.recommendation__title}>Our Recommendation</h1>

        <ListCardProduct data={data} isLoading={isLoading} />
        {data?.total_data && data?.total_data > limit && (
          <div className={style.recommendation__pagination}>
            <Pagination
              total={data.total_data}
              pageSize={limit}
              className={style.recommendation__pagination__pagination}
              showSizeChanger={false}
              size="default"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Recommendation;
