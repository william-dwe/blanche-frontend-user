import React from 'react';
import { Pagination as APagination, PaginationProps } from 'antd';
import { useAppSelector } from '../../../app/hooks';
import { useSearchParams } from 'react-router-dom';

const Pagination: React.FC<PaginationProps> = (props) => {
  const params = useAppSelector((state) => state.params);
  const [searchParams, setSearchParams] = useSearchParams();

  const onChange: PaginationProps['onChange'] = (page) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };
  return (
    <APagination
      defaultCurrent={Number(params.search.page) || 1}
      current={Number(params.search.page) || 1}
      onChange={onChange}
      {...props}
    />
  );
};

export default Pagination;
