import { Divider } from 'antd';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { deleteAllSearchParams } from '../../../helpers/parseSearchParams';
import { Button } from '../../atoms';
import style from './index.module.scss';

const ResetFilterProduct: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onResetFilterHandler = () => {
    setSearchParams(deleteAllSearchParams(searchParams));
  };

  return (
    <>
      <Divider className={style.divider} />
      <div className={style.rfp}>
        <Button type="primary" onClick={onResetFilterHandler} block>
          Clear
        </Button>
      </div>
    </>
  );
};

export default ResetFilterProduct;
