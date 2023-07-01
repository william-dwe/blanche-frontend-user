import React from 'react';
import { ICart } from '../../../../helpers/types';
import CartStoreItem from '../CartStoreItem';
import style from './index.module.scss';

interface ListCartStoreItemProps {
  carts: ICart[] | undefined;
  isLoading: boolean;
}

const ListCartStoreItem: React.FC<ListCartStoreItemProps> = ({
  carts,
  isLoading,
}) => {
  return (
    <div className={style.list__cart__store__item}>
      {carts?.map((cart: ICart) => {
        return (
          <CartStoreItem
            key={cart.merchant_id}
            cart={cart}
            isLoading={isLoading}
          />
        );
      })}
    </div>
  );
};

export default ListCartStoreItem;
