import React from 'react';
import { Card } from '../../../atoms';
import CartItem from '../CartItem';
import style from './index.module.scss';
import { Link } from 'react-router-dom';
import { ICartItem } from '../../../../helpers/types';
import ItemNotFound from '../../ItemNotFound';

type CardMenuProps = {
  items: ICartItem[] | undefined;
  total: number | undefined;
} & React.HTMLAttributes<HTMLDivElement>;

const CardMenu: React.FC<CardMenuProps> = ({ items, total, ...props }) => {
  return (
    <Card className={style.cart__menu} {...props}>
      <div className={style.cart__menu__list}>
        {items?.map((item, index) => (
          <CartItem item={item && item} key={`product-${index}`} />
        ))}

        {!items && (
          <ItemNotFound
            title="There is no product on you cart"
            src="/assets/svg/Empty.svg"
            className={style.cart__menu__notfound}
          />
        )}
      </div>
      <div className={style.cart__menu__action}>
        <p className={style.cart__menu__action__total}>
          Total:{' '}
          <span className={style.cart__menu__action__number}>
            {total || 0} items
          </span>
        </p>
        <Link to="/cart" className={style.cart__menu__action__button}>
          Go to cart page
        </Link>
      </div>
    </Card>
  );
};

export default CardMenu;
