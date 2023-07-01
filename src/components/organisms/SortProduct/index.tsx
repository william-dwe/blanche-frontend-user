import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Select } from '../../../components';
import style from './index.module.scss';
import { sortOptions } from './options';

const SortProduct: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onChange = (value: string) => {
    searchParams.delete('page');
    searchParams.set('ob', value);
    setSearchParams(searchParams);
  };
  return (
    <div className={style.sort}>
      <p className={style.sort__text}>Sort: </p>
      <Select
        value={
          !searchParams.get('ob')
            ? sortOptions[0].value
            : Number(searchParams.get('ob')) <= sortOptions.length
            ? searchParams.get('ob')
            : sortOptions[0].value
        }
        options={sortOptions}
        onChange={onChange}
        className={style.sort__select}
        size="middle"
      />
    </div>
  );
};

export default SortProduct;
