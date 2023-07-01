import React, { ChangeEvent, useEffect, useState } from 'react';
import style from './index.module.scss';
import { Space } from 'antd';
import { Input } from '../../atoms';
import { toRupiahWithoutSymbol } from '../../../helpers/toRupiah';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';

interface IInputState {
  value: number | undefined;
  formattedValue: string | undefined;
  focus: boolean;
}

interface IMaxmin_price {
  min_price: IInputState;
  max_price: IInputState;
}

const initialInputState: IMaxmin_price = {
  min_price: {
    value: undefined,
    formattedValue: undefined,
    focus: false,
  },
  max_price: {
    value: undefined,
    formattedValue: undefined,
    focus: false,
  },
};

const FilterPrice: React.FC = () => {
  const [inputState, setInputState] = useState(initialInputState);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useAppSelector((state) => state.params);

  useEffect(() => {
    const keys: ('min_price' | 'max_price')[] = ['min_price', 'max_price'];
    keys.forEach((key) => {
      setInputState((prevValue) => ({
        ...prevValue,
        [key]: {
          ...prevValue[key],
          value: params.search[key],
          formattedValue: params.search[key]
            ? toRupiahWithoutSymbol(params.search[key])
            : undefined,
        },
      }));
    });
  }, [params.search.min_price, params.search.max_price]);

  const onBlurOrEnter = (
    key: 'min_price' | 'max_price',
    type: 'blur' | 'enter',
  ) => {
    searchParams.delete('page');
    const val = inputState[key].value;
    if (!val) {
      searchParams.delete(key);
      setSearchParams(searchParams);
      return;
    }
    searchParams.set(key, val.toString());
    setSearchParams(searchParams);
    setInputState((prevValue) => ({
      ...prevValue,
      [key]: {
        ...prevValue[key],
        formattedValue: toRupiahWithoutSymbol(inputState[key].value),
      },
    }));
    if (type === 'enter') return;
    setInputState((prevValue) => ({
      ...prevValue,
      [key]: {
        ...prevValue[key],
        focus: false,
      },
    }));
  };

  const onChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: 'min_price' | 'max_price',
  ) => {
    let str = e.target.value;
    str = str.replace(/[^0-9]/g, '');
    const amount = str !== '' ? parseInt(str) : undefined;
    setInputState((prevValue) => ({
      ...prevValue,
      [key]: {
        ...prevValue[key],
        value: amount,
        formattedValue: amount ? toRupiahWithoutSymbol(amount) : '',
      },
    }));
  };

  const onFocus = (key: 'min_price' | 'max_price') => {
    setInputState((prevValue) => ({
      ...prevValue,
      [key]: {
        ...prevValue[key],
        focus: true,
      },
    }));
  };

  return (
    <Space direction="vertical" className={style.price}>
      <Input
        addonBefore="Rp"
        placeholder="Minimum Price"
        onBlur={() => {
          onBlurOrEnter('min_price', 'blur');
        }}
        onPressEnter={() => {
          onBlurOrEnter('min_price', 'enter');
        }}
        onChange={(e) => {
          onChange(e, 'min_price');
        }}
        value={
          inputState.min_price.focus
            ? inputState.min_price.value
            : inputState.min_price.formattedValue
        }
        onFocus={() => onFocus('min_price')}
        type="text"
        size="middle"
      />
      <Input
        addonBefore="Rp"
        placeholder="Maximum Price"
        onBlur={() => {
          onBlurOrEnter('max_price', 'blur');
        }}
        onPressEnter={() => {
          onBlurOrEnter('max_price', 'enter');
        }}
        onChange={(e) => {
          onChange(e, 'max_price');
        }}
        value={
          inputState.max_price.focus
            ? inputState.max_price.value
            : inputState.max_price.formattedValue
        }
        onFocus={() => onFocus('max_price')}
        type="text"
        size="middle"
      />
    </Space>
  );
};

export default FilterPrice;
