import { message, Spin } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUpdateCartsMutation } from '../../../../app/features/cart/cartApiSlice';
import { capitalizeFirstLetter } from '../../../../helpers/capitalizeFirstLetter';
import { ICart, ICartItem } from '../../../../helpers/types';
import { IErrorResponse } from '../../../../helpers/types/response.interface';
import useMediaQuery from '../../../../hooks/useMediaQuery';
import { Avatar, Card } from '../../../atoms';
import { Checkbox } from '../../../molecules';
import CartItemPage from '../CartItemPage';
import style from './index.module.scss';

interface CartStoreItemProps {
  cart: ICart;
  isLoading: boolean;
}

const CartStoreItem: React.FC<CartStoreItemProps> = ({ cart, isLoading }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [updateCarts, { isLoading: isLoadingUpdateCarts }] =
    useUpdateCartsMutation();

  const [checkAll, setCheckAll] = useState<boolean>();

  useEffect(() => {
    setCheckAll(
      cart.items.filter((item) => item.is_checked).length === cart.items.length,
    );
  }, [cart.items]);

  const options = cart.items.map((item) => {
    return {
      value: item.cart_item_id?.toString() || '0',
      children: (
        <CartItemPage item={item} key={item.name} isLoading={isLoading} />
      ),
    };
  });

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    const cartIds = options.map((o) => o.value);

    const body = cartIds.map((id) => {
      return {
        cart_item_id: Number(id),
        is_checked: e.target.checked,
      };
    });

    try {
      updateCarts(body).unwrap();
    } catch (err) {
      const e = err as IErrorResponse;

      message.error(capitalizeFirstLetter(e.message));
    }
  };

  useEffect(() => {
    setCheckAll(
      cart.items.filter((item) => item.is_checked).length === cart.items.length,
    );
  }, [cart.items]);

  return (
    <Spin spinning={isLoadingUpdateCarts}>
      <Card className={style.cart__store__item}>
        <div className={style.cart__store__item__header}>
          <Checkbox onChange={onCheckAllChange} checked={checkAll} />
          <Avatar src={cart.merchant_image} size={isMobile ? 30 : 60} />
          <Link to={`/${cart.merchant_domain}`}>
            <h6>{cart.merchant_name}</h6>
          </Link>
        </div>
        <div className={style.cart__store__item__body}>
          {cart?.items?.map((item: ICartItem) => {
            return (
              <CartItemPage item={item} key={item.name} isLoading={isLoading} />
            );
          })}
        </div>
      </Card>
    </Spin>
  );
};

export default CartStoreItem;
