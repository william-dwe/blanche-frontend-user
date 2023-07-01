import { Divider, message, Skeleton } from 'antd';
import { valueType } from 'antd/es/statistic/utils';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateCartsMutation } from '../../../../app/features/cart/cartApiSlice';
import { useCheckoutMutation } from '../../../../app/features/checkout/checkoutApiSlice';
import { capitalizeFirstLetter } from '../../../../helpers/capitalizeFirstLetter';
import { toRupiah } from '../../../../helpers/toRupiah';
import { ICheckoutRequest } from '../../../../helpers/types';
import { IErrorResponse } from '../../../../helpers/types/response.interface';
import useProduct from '../../../../hooks/useProduct';
import { Alert, Button, Card } from '../../../atoms';
import { InputQuantity, ModalConfirm } from '../../../molecules';
import CartItem from './CartItem';
import style from './index.module.scss';

const CardSummary: React.FC = () => {
  const { product, stock, discountPrice, isLoading, variant, isHaveVariant } =
    useProduct();

  const [checkout, { isLoading: isLoadingCheckout }] = useCheckoutMutation();
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addToCart, { isLoading: isLoadingAddToCart, isError }] =
    useCreateCartsMutation();

  const [error, setError] = useState('');
  const [errorAddToCart, setErrorAddToCart] = useState<
    IErrorResponse | Error
  >();
  const navigate = useNavigate();

  const [totalPrice, setTotalPrice] = useState(product?.max_discount_price);

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
  const handleChange = (value: valueType | null) => {
    setQuantity(value as number);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < (stock as number)) {
      setQuantity(quantity + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const body = {
        product_id: product?.id ? product.id : 0,
        quantity: quantity ? quantity : 0,
        variant_item_id: variant?.id ? variant.id : undefined,
      };
      await addToCart(body).unwrap();
      message.success('Product added to cart');
    } catch (err) {
      const error = err as IErrorResponse;
      setErrorAddToCart(error);

      if (error.message === 'Unauthorized') {
        navigate('/login');

        message.error('Please login first');
      }
    }
  };
  useEffect(() => {
    setTotalPrice(quantity * Number(discountPrice));
    setErrorAddToCart(undefined);
    setError('');
  }, [quantity, discountPrice]);

  const handleBuyNow = async () => {
    const body: ICheckoutRequest[] = [
      {
        product_id: product?.id ? product.id : 0,
        quantity: quantity ? quantity : 0,
        variant_item_id: variant?.id ? variant.id : null,
        notes: null,
      },
    ];

    try {
      const data = await checkout(body).unwrap();
      message.success('Buy Now success');
      navigate('/checkout?data=' + data.order_code);
    } catch (err) {
      const error = err as IErrorResponse;

      if (error.code === 'ORDER_ADDRESS_NOT_FOUND') {
        showModal();
        return;
      }

      if (error.message === 'Unauthorized') {
        navigate('/login');

        message.error('Please login first');
      }

      message.error(capitalizeFirstLetter(error.message));
    }
  };

  return (
    <Card className={style.card__summary}>
      <Skeleton loading={isLoading}>
        <h6>Order Summary</h6>
        <CartItem quantity={quantity} />
        <div className={style.card__summary__quantity}>
          <InputQuantity
            value={quantity}
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
            handleChange={handleChange}
            size="middle"
            disabledIncrement={quantity >= Number(stock)}
            disableDecrement={quantity <= 1}
            min={1}
          />
          <p>
            Stock: <span>{stock}</span>
          </p>
        </div>
        {stock === 0 && (
          <Alert
            message="Out of stock please select another variant"
            type="error"
            showIcon
            closable
          />
        )}
        {isHaveVariant && !variant && (
          <Alert
            message="Please select variant before add to cart"
            type="info"
            showIcon
            closable
          />
        )}
        {quantity > Number(stock) && (
          <Alert
            message="Quantity is more than stock, please reduce the quantity"
            type="warning"
            showIcon
            closable
          />
        )}
        {error && <Alert message={error} type="error" showIcon closable />}
        {errorAddToCart && variant && (
          <Alert
            message={errorAddToCart.message}
            type="warning"
            showIcon
            closable
          />
        )}

        {errorAddToCart && isError && (
          <Alert
            message={errorAddToCart.message}
            type="error"
            showIcon
            closable
          />
        )}

        <>
          <Divider />
          <div className={style.card__summary__total}>
            <span>Total</span>
            <p>{toRupiah(totalPrice)}</p>
          </div>
        </>
      </Skeleton>

      <div className={style.card__summary__button}>
        {isLoading ? (
          <>
            <Skeleton.Button block />
            <Skeleton.Button block />
          </>
        ) : (
          <>
            <Button
              type="primary"
              size="large"
              block
              onClick={handleSubmit}
              disabled={
                (!variant && isHaveVariant) ||
                stock === 0 ||
                quantity > Number(stock)
              }
              loading={isLoadingAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              type="primary"
              size="large"
              ghost
              disabled={
                (!variant && isHaveVariant) ||
                stock === 0 ||
                quantity > Number(stock)
              }
              onClick={handleBuyNow}
              block
              loading={isLoadingCheckout}
            >
              Buy Now
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
    </Card>
  );
};

export default CardSummary;
