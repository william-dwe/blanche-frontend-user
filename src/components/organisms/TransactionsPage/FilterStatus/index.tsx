import { RadioChangeEvent } from 'antd';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../../../app/hooks';
import RadioChip from '../../../molecules/RadioChip';
import style from './index.module.scss';

interface FilterStatusProps {
  values: string[];
}

const FilterStatus: React.FC<FilterStatusProps> = ({ values }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useAppSelector((state) => state.params);
  const onChange = (e: RadioChangeEvent) => {
    const idx =
      values.indexOf(e.target.value) > -1 ? values.indexOf(e.target.value) : 0;
    searchParams.set('status', idx.toString());
    searchParams.delete('page');
    setSearchParams(searchParams);
  };
  return (
    <div className={style.fs}>
      <p className={style.fs__text}>Status</p>
      <RadioChip
        values={values}
        onChange={onChange}
        value={
          params.search.status
            ? values[Number(params.search.status)]
            : values[0]
        }
      />
    </div>
  );
};

export default FilterStatus;
