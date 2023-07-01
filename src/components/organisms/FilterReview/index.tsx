import React from 'react';
import style from './index.module.scss';
import { CheckboxGroup } from '../..';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { IOption } from '../../molecules/CheckboxGroup';

const options: IOption[] = [
  {
    value: '1',
    children: (
      <div className={style.rating__item}>
        <span className={style.rating__item__count}>Review with image</span>
      </div>
    ),
  },
  {
    value: '2',
    children: (
      <div className={style.rating__item}>
        <span className={style.rating__item__count}>Review with Comments</span>
      </div>
    ),
  },
];

const Review: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useAppSelector((state) => state.params);

  const onChange = (checkedValues: CheckboxValueType[]) => {
    searchParams.delete('page');
    if (!checkedValues.length) {
      searchParams.delete('filter_by');
      setSearchParams(searchParams);
      return;
    }

    const lastValue = checkedValues[checkedValues.length - 1];
    searchParams.set('filter_by', lastValue.toString());
    setSearchParams(searchParams);
  };

  return (
    <CheckboxGroup
      options={options}
      onChange={onChange}
      value={[(params.search.filter_by || '').toString()]}
      className={style.rating}
    />
  );
};

export default Review;
