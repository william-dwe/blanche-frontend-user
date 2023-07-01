import React from 'react';
import { Input as AInput, InputProps } from 'antd';
import style from './index.module.scss';
import classNames from 'classnames';

type SearchProps = {
  onSearch: (value: string) => void;
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
} & InputProps;

const { Search: ASearch } = AInput;

const Search: React.FC<SearchProps> = ({
  onSearch,
  className,
  placeholder = '',
  defaultValue = '',
  value = '',
  ...props
}) => {
  const classProps = classNames(style.search, className);

  return (
    <ASearch
      placeholder={placeholder}
      onSearch={onSearch}
      size="middle"
      className={classProps}
      enterButton
      defaultValue={defaultValue}
      value={value}
      {...props}
    />
  );
};

export default Search;
