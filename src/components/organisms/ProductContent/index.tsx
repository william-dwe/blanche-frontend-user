import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import {
  Alert,
  ListCardProduct,
  Pagination,
  SortProduct,
} from '../../../components';
import ItemNotFound from '../../../components/molecules/ItemNotFound';
import { capitalizeFirstLetter } from '../../../helpers/capitalizeFirstLetter';
import { IGetProductListResponse } from '../../../helpers/types';
import ListCardProductSkeleton from '../../molecules/ListCardProduct/ListCardProductSkeleton';
import style from './index.module.scss';

interface ContentProps {
  isError: boolean;
  isLoading: boolean;
  error: Error;
  data: IGetProductListResponse | undefined;
  limit: number;
}

const Content: React.FC<ContentProps> = ({
  isError,
  isLoading,
  error,
  data,
  limit,
}) => {
  const params = useAppSelector((state) => state.params);

  return (
    <div className={style.content}>
      {isError && error && (
        <Alert
          message={capitalizeFirstLetter((error as Error)?.message)}
          type="error"
          showIcon
          className={style.alert}
        />
      )}
      {Boolean(data?.products.length) && (
        <div className={style.content__header}>
          <p className={style.content__header__result}>
            {isLoading ? (
              <>Loading, please wait...</>
            ) : (
              <>
                Showing {data?.total_data} results for{' '}
                <span>{params.search.q || 'all'}</span>
              </>
            )}
          </p>
          <SortProduct />
        </div>
      )}

      {isLoading && (
        <ListCardProductSkeleton
          grid={{
            xs: 24,
            md: 12,
            lg: 8,
            xl: 6,
          }}
        />
      )}
      {!isError && data?.total_data && Boolean(data?.products.length) ? (
        <>
          <ListCardProduct
            isLoading={isLoading}
            data={data}
            grid={{
              xs: 24,
              md: 12,
              lg: 8,
              xl: 6,
            }}
          />

          {data.total_data > limit && (
            <div className={style.content__pagination}>
              <Pagination
                total={data.total_data}
                pageSize={limit}
                className={style.content__pagination__pagination}
                showSizeChanger={false}
              />
            </div>
          )}
        </>
      ) : (
        <ItemNotFound
          title="Sorry, your product is not found"
          body="Try to change your search keyword or remove some filters."
        />
      )}
    </div>
  );
};

export default Content;
