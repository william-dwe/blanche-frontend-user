import React, { ChangeEvent } from 'react';
import { Input, Select } from '../../../atoms';
import style from './index.module.scss';

interface SortSearchProps {
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  selectValue: number | undefined;
  handleSelect: (value: number) => void;
}

const sortOptions = [
  { value: 1, label: 'Newest' },
  { value: 2, label: 'Oldest' },
];

const SortSearch: React.FC<SortSearchProps> = ({
  handleSearch,
  handleSelect,
  selectValue,
}) => {
  return (
    <div className={style.ss}>
      <div className={style.ss__search}>
        <p className={style.ss__search__title}>Search</p>
        <Input onChange={handleSearch} />
      </div>
      <div className={style.ss__sort}>
        <p className={style.ss__sort__title}>Sort by</p>
        <div className={style.ss__sort__select}>
          <Select
            value={selectValue}
            options={sortOptions}
            onChange={handleSelect}
            className={style.ss__select}
            size="middle"
          />
        </div>
      </div>
    </div>
  );
};

export default SortSearch;
