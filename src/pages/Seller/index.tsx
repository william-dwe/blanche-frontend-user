import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetMerchantInfoQuery } from '../../app/features/merchant/merchantApiSlice';
import { useAppSelector } from '../../app/hooks';
import {
  Button,
  CardSellerProfile,
  ItemNotFound,
  SellerProducts,
  SEO,
} from '../../components';
import style from './index.module.scss';

const Seller: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const param = useAppSelector((state) => state.params);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [param.search.page]);

  const handleNavigate = () => {
    navigate('/', { replace: true });
  };
  const { data, isLoading, isSuccess } = useGetMerchantInfoQuery(
    params.store || '',
    {
      skip: !params.store,
    },
  );

  if (!data) {
    if (!isLoading) {
      return (
        <div className={style.seller__page__notfound}>
          <ItemNotFound
            title="Store is Not Found"
            body="Sorry, the store you are looking for is not found."
            className={style.seller__page__notfound__item}
            imageClassName={style.seller__page__notfound__image}
          />
          <Button type="primary" size="large" onClick={handleNavigate}>
            Back to Home
          </Button>
        </div>
      );
    }
  }
  return (
    <>
      <SEO title="Store" description="Store page" />
      <div className={style.seller__page}>
        <CardSellerProfile data={data} isLoading={isLoading} />
        {isSuccess && <SellerProducts />}
      </div>
    </>
  );
};

export default Seller;
