import { Col, message, Row } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import React, { useEffect, useState } from 'react';
import {
  useDeleteSelectedCartMutation,
  useGetCartsQuery,
  useUpdateCartsMutation,
} from '../../app/features/cart/cartApiSlice';
import {
  Button,
  CartSummary,
  CartSummaryMobile,
  Checkbox,
  ItemNotFound,
  ListCartStoreItem,
  SEO,
} from '../../components';
import { capitalizeFirstLetter } from '../../helpers/capitalizeFirstLetter';
import { ICart, IUpdateCartRequest } from '../../helpers/types';
import { IErrorResponse } from '../../helpers/types/response.interface';
import useMediaQuery from '../../hooks/useMediaQuery';
import style from './index.module.scss';

const Cart: React.FC = () => {
  const { data: carts, isLoading } = useGetCartsQuery();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>();
  const [updateCarts, { isLoading: isLoadingUpdateCarts }] =
    useUpdateCartsMutation();

  const [deleteCarts] = useDeleteSelectedCartMutation();

  useEffect(() => {
    if (carts?.carts) {
      setIsCheckedAll(
        carts?.carts?.every((cart) =>
          cart.items.every((item) => item.is_checked),
        ),
      );
    }
  }, [carts?.carts]);

  const onCheckAllChange = async (e: CheckboxChangeEvent) => {
    const req: IUpdateCartRequest[] = [];
    carts?.carts?.map((cart: ICart) =>
      cart.items.map((item) => {
        const r = {
          cart_item_id: item.cart_item_id,
          is_checked: e.target.checked,
          product_id: item.product_id,
          quantity: item.quantity,
        };
        req.push(r);
      }),
    );

    try {
      await updateCarts(req).unwrap();
    } catch (e) {
      const err = e as IErrorResponse;
      message.error(capitalizeFirstLetter(err.message));
    }
  };

  const handleDeleteCarts = async () => {
    try {
      await deleteCarts().unwrap();
      message.success('Delete all carts successfully');
    } catch (e) {
      const err = e as IErrorResponse;
      message.error(capitalizeFirstLetter(err.message));
    }
  };

  if (!carts && !isLoading) {
    return (
      <ItemNotFound
        className={style.cart__page__empty}
        imageClassName={style.cart__page__empty__image}
        src="/assets/svg/Empty.svg"
        title="Your cart is empty"
        body={"Looks like you haven't added any item to your cart yet."}
      />
    );
  }

  return (
    <>
      <SEO title="Cart" description="Cart page" />
      <div className={style.cart__page}>
        <h5>Cart</h5>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={16} xl={17}>
            <div className={style.cart__page__header}>
              <Checkbox onChange={onCheckAllChange} checked={isCheckedAll}>
                <p>Check all</p>
              </Checkbox>{' '}
              {carts?.quantity !== 0 && (
                <Button
                  type="link"
                  className={style.cart__page__header__button}
                  onClick={handleDeleteCarts}
                >
                  Delete All
                </Button>
              )}
            </div>

            <ListCartStoreItem
              carts={carts?.carts}
              isLoading={isLoading || isLoadingUpdateCarts}
            />
          </Col>
          {!isMobile ? (
            <Col lg={8} xl={7}>
              <CartSummary
                carts={carts?.carts ? carts?.carts : []}
                quantity={carts?.quantity ? carts?.quantity : 0}
                total={carts?.total || 0}
              />
            </Col>
          ) : (
            <CartSummaryMobile
              carts={carts?.carts ? carts?.carts : []}
              quantity={carts?.quantity ? carts?.quantity : 0}
              total={carts?.total || 0}
            />
          )}
        </Row>
      </div>
    </>
  );
};

export default Cart;
