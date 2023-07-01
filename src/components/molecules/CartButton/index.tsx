import React, { useEffect, useState } from 'react';
import { ShoppingFilled } from '@ant-design/icons';
import style from './index.module.scss';
import CartMenu from './CartMenu';
import { Badge } from '../../atoms';
import { useGetCartHomeQuery } from '../../../app/features/cart/cartApiSlice';
import { ICartHomeResponse } from '../../../helpers/types';
import { useAppSelector } from '../../../app/hooks';

interface CartButtonProps {
  onClick: () => void;
}

const CartButton: React.FC<CartButtonProps> = ({ onClick }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const [carts, setCarts] = useState<ICartHomeResponse>();

  const { data } = useGetCartHomeQuery(undefined, { skip: !user });

  useEffect(() => {
    if (!data) return;
    setCarts(data);
  }, [data]);

  return (
    <button
      onMouseEnter={() => {
        setShowDetails(true);
      }}
      onMouseLeave={() => {
        setShowDetails(false);
      }}
      onClick={onClick}
      className={style.cart}
    >
      <div className={style.cart__button}>
        <div className={style.cart__button__container}>
          <Badge className={style.cart__button__total} count={carts?.quantity}>
            <ShoppingFilled className={style.cart__button__icon} />
          </Badge>
        </div>
      </div>
      {showDetails && (
        <CartMenu items={carts?.carts?.slice(0, 3)} total={carts?.quantity} />
      )}
    </button>
  );
};

export default CartButton;
