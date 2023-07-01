import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetCitiesQuery } from '../../../app/features/home/homeApiSlice';
import { useAppSelector } from '../../../app/hooks';
import { Select } from '../../atoms';
import style from './index.module.scss';

interface IOption {
  value: string;
  label: string;
}

const SellerLocation: React.FC = () => {
  const { data } = useGetCitiesQuery();
  const [options, setOptions] = useState<IOption[]>([]);
  const [selectedValues, setSelectedValues] = useState<string[] | undefined>(
    [],
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useAppSelector((state) => state.params);

  useEffect(() => {
    if (!data) return;
    const newOptions = data.cities.map((city) => ({
      value: city.id.toString(),
      label: city.name,
    }));
    setOptions(newOptions);
  }, [data]);

  const onChange = (values: string[]) => {
    searchParams.delete('page');
    if (!values.length) {
      searchParams.delete('seller_city_id');
      setSearchParams(searchParams);
      return;
    }
    const locations = values.join(',');
    searchParams.set('seller_city_id', locations);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const locations = params.search.seller_city_id?.split(',');
    setSelectedValues(locations);
  }, [params.search.seller_city_id]);

  return (
    <>
      {options && (
        <Select
          mode="multiple"
          placeholder="Select seller location"
          className={style.location}
          options={options}
          value={selectedValues}
          onChange={onChange}
          filterOption={(input, option) => {
            return (option?.label ?? '')
              .toString()
              .toLowerCase()
              .includes(input.toLowerCase());
          }}
          allowClear
          size="middle"
        />
      )}
    </>
  );
};

export default SellerLocation;
