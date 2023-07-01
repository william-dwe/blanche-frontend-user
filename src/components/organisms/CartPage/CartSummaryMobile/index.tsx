import { message, Skeleton } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalConfirm } from '../../..';
import { useCheckoutMutation } from '../../../../app/features/checkout/checkoutApiSlice';
import { capitalizeFirstLetter } from '../../../../helpers/capitalizeFirstLetter';
import { toRupiah } from '../../../../helpers/toRupiah';
import { ICheckoutRequest } from '../../../../helpers/types';
import { IErrorResponse } from '../../../../helpers/types/response.interface';
import { Button } from '../../../atoms';
import { CartSummaryProps } from '../CartSummary';
import style from './index.module.scss';

const CartSummaryMobile: React.FC<CartSummaryProps> = ({
  total,
  quantity,
  carts,
}) => {
  const [checkout, { isLoading }] = useCheckoutMutation();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    navigate('/profile');
  };

  const handleCheckout = async () => {
    const body: ICheckoutRequest[] = [];
    carts.forEach((cart) => {
      cart.items
        .filter((item) => item.is_checked)
        .forEach((item) => {
          body.push({
            product_id: item.product_id,
            quantity: item.quantity,
            variant_item_id: item.variant_item_id,
            notes: item.notes,
          });
        });
    });

    try {
      const data = await checkout(body).unwrap();
      message.success('Checkout success');
      navigate('/checkout?data=' + data.order_code);
    } catch (err) {
      const error = err as IErrorResponse;

      if (error.code === 'ORDER_ADDRESS_NOT_FOUND') {
        showModal();
        return;
      }

      message.error(capitalizeFirstLetter(error.message));
    }
  };
  return (
    <div className={style.cart__summary__mobile}>
      <Skeleton loading={false}>
        <div className={style.cart__summary__mobile__description}>
          <div className={style.cart__summary__mobile__description__total}>
            <p>Total Harga {quantity}</p>
            <p>{toRupiah(total)}</p>
          </div>
        </div>
      </Skeleton>
      <div className={style.cart__summary__mobile__button}>
        {isLoading ? (
          <>
            <Skeleton.Button block />
          </>
        ) : (
          <>
            {total === 0 && <p>Please select product to checkout!</p>}
            <Button
              type="primary"
              onClick={handleCheckout}
              size="middle"
              block
              disabled={total === 0}
            >
              Checkout
            </Button>
          </>
        )}
      </div>
      <ModalConfirm
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        title="Address is empty"
        info="Please add your address to continue checkout"
        cancelButton={true}
        closable={true}
      />
    </div>
  );
};

export default CartSummaryMobile;
