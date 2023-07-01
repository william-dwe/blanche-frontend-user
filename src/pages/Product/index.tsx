import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../app/features/home/homeApiSlice';
import { useGetProductBySlugQuery } from '../../app/features/product/productApiSlice';
import { setProductInfo } from '../../app/features/product/productSlice';
import { useAppDispatch } from '../../app/hooks';
import {
  BreadcrumbProduct,
  Button,
  CardSummary,
  ItemNotFound,
  ProductDetail,
} from '../../components';
import MoreProducts from '../../components/organisms/ProductPage/MoreProducts';
import useProduct from '../../hooks/useProduct';
import style from './index.module.scss';

const Product = (): JSX.Element => {
  const { store, slug } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data, isLoading, isSuccess } = useGetProductBySlugQuery({
    store: store as string,
    slug: slug as string,
  });

  const { variant } = useProduct();

  const handleNavigate = () => {
    navigate('/', { replace: true });
  };

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    dispatch(
      setProductInfo({
        product: data,
        isDiscount: data?.min_real_price !== data?.min_discount_price,
        isRangePrice: data?.min_real_price !== data?.max_real_price,
        price: data?.min_real_price,
        stock: variant === null ? data?.total_stock : variant.stock,
        activeImage: data?.images?.[0],
        isLoading: isLoading,
        variant: null,
        discountPrice:
          data?.min_real_price !== data?.min_discount_price
            ? data?.min_discount_price
            : data?.min_discount_price,
      }),
    );
  }, [data]);

  const { data: sellerProducts, isLoading: isLoadingSeller } =
    useGetProductsQuery(
      {
        limit: 12,
        merchant: store as string,
      },
      {
        skip: !store || !isSuccess,
      },
    );

  const { data: similarProducts, isLoading: isLoadingSimilar } =
    useGetProductsQuery(
      {
        limit: 24,
        cat: data?.category?.url,
      },
      {
        skip: !data?.category?.url || !isSuccess,
      },
    );

  if (!data && !isLoading) {
    return (
      <div className={style.product__page__notfound}>
        <ItemNotFound
          title="Sorry, we cannot found what do you want"
          body="It seems that what you are looking for is not found. You can go back to home page or try to search again."
          className={style.product__page__notfound__item}
          imageClassName={style.product__page__notfound__image}
        />
        <Button type="primary" size="large" onClick={handleNavigate}>
          Back to Home
        </Button>
      </div>
    );
  }
  return (
    <div className={style.product}>
      {isSuccess && (
        <>
          <BreadcrumbProduct />
          <div className={style.product__page}>
            <ProductDetail />
            {data?.is_my_product ? (
              <Button
                size="large"
                type="primary"
                onClick={() => navigate(`/merchant/products/edit/${data.id}`)}
              >
                Edit My Product
              </Button>
            ) : (
              <CardSummary />
            )}
          </div>
          <div className={style.product__page__lists}>
            <MoreProducts
              title="More from this store"
              data={sellerProducts}
              isLoading={isLoadingSeller}
              to={`/${store}`}
            />
            <MoreProducts
              title="Similar Products"
              data={similarProducts}
              isLoading={isLoadingSimilar}
              to={`/c/${data?.category?.url}`}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
