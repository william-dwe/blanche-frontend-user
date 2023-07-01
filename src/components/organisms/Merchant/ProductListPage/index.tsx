import { PlusOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../../../atoms';
import style from './index.module.scss';
import ProductTable from './ProductTable';

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const redirectToProduct = () => {
    navigate('create');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className={style.plp}>
      <div className={style.plp__header}>
        <h1 className={style.plp__header__title}>Product List</h1>
        <div className={style.plp__header__right}>
          <Input
            placeholder="Search product name"
            onChange={debounce(handleChange, 500)}
            className={style.plp__header__input}
            size="middle"
          />
          <Button
            className={style.plp__header__button}
            type="primary"
            onClick={redirectToProduct}
            icon={<PlusOutlined />}
          >
            Add Product
          </Button>
        </div>
      </div>
      <ProductTable search={search} />
    </div>
  );
};

export default ProductList;
