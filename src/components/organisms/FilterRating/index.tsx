import { StarFilled } from '@ant-design/icons';
import React from 'react';
import style from './index.module.scss';
import { CheckboxGroup } from '../../../components';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';

const options = [...Array(4)].map((val, index) => {
  const value = 5 - index;
  return {
    value: value.toString(),
    children: (
      <div className={style.rating__item}>
        <span className={style.rating__item__count}>{value}</span>
        <StarFilled className={style.rating__item__star} />
      </div>
    ),
  };
});

interface RatingProps {
  paramsQuery?: string;
}

const Rating: React.FC<RatingProps> = ({ paramsQuery = 'min_rating' }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useAppSelector((state) => state.params);

  const onChange = (checkedValues: CheckboxValueType[]) => {
    searchParams.delete('page');
    if (!checkedValues.length) {
      searchParams.delete(paramsQuery);
      setSearchParams(searchParams);
      return;
    }
    const lastValue = checkedValues[checkedValues.length - 1];
    searchParams.set(paramsQuery, lastValue.toString());
    setSearchParams(searchParams);
  };
  return (
    <CheckboxGroup
      options={options}
      onChange={onChange}
      value={[
        (params.search.min_rating || params.search.rating || '').toString(),
      ]}
      defaultValue={[
        (params.search.min_rating || params.search.rating || '').toString(),
      ]}
      className={style.rating}
    />
  );
};

export default Rating;
