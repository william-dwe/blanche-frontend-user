import { Key } from 'rc-tree-select/lib/interface';
import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../app/features/home/homeApiSlice';
import { useAppSelector } from '../../app/hooks';
import {
  Button,
  FilterProduct,
  FilterProductMobile,
  ProductContent,
  SEO,
} from '../../components';
import { capitalizeFirstLetter } from '../../helpers/capitalizeFirstLetter';
import useMediaQuery from '../../hooks/useMediaQuery';
import style from './index.module.scss';

const limit = 28;

const Category: React.FC = () => {
  const param = useParams();
  const location = useLocation();
  const params = useAppSelector((state) => state.params);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const lasturl = location.pathname.split('/').slice(-1)[0];
  const { data, isLoading, isError, error } = useGetProductsQuery(
    { ...params.search, limit, cat: lasturl },
    {
      skip: !param.category,
    },
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const onSelectCategory = (selectedKeysValue: Key[]) => {
    searchParams.delete('page');
    setSearchParams(searchParams);
    if (!selectedKeysValue.length) return;
    const cat = selectedKeysValue[0].toString();
    const url = location.pathname.split('/').slice(0, -1).join('/');
    navigate(`${url}/${cat}`);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <SEO
        title={`Get the best and newest ${capitalizeFirstLetter(
          param.category,
        )} items here`}
        description="Category Page"
      />
      <div className={style.category}>
        <div className={style.category__left}>
          {isMobile ? (
            <>
              <Button onClick={showDrawer}>Filter</Button>
              <FilterProductMobile
                onSelectCategory={onSelectCategory}
                selectedCategory={param.category}
                open={open}
                onClose={onClose}
              />
            </>
          ) : (
            <>
              <p className={style.category__title}>Filter</p>
              <FilterProduct
                onSelectCategory={onSelectCategory}
                selectedCategory={param.category}
              />
            </>
          )}
        </div>
        <ProductContent
          data={data}
          isLoading={isLoading}
          isError={isError}
          error={error as Error}
          limit={limit}
        />
      </div>
    </>
  );
};

export default Category;
