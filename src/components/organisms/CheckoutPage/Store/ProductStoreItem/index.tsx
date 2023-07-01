import { Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import { toRupiah } from '../../../../../helpers/toRupiah';
import {
  ICheckoutSummaryMerchant,
  IOrder,
  IShippingOption,
  IVoucherMerchantResponse,
} from '../../../../../helpers/types';
import { Alert, Avatar, Card } from '../../../../atoms';
import Delivery from '../Delivery';
import ProductItem from '../ProductItem';
import VoucherStore from '../VoucherStore';
import style from './index.module.scss';

interface ProductStoreProps {
  order: IOrder;
  handleChangeMerchant: (
    merchant_id: number,
    voucher_merchant: string,
    delivery_option: string,
  ) => void;
  merchant: ICheckoutSummaryMerchant[];
  errorDeliveryOption: string;
}
const ProductStoreItem: React.FC<ProductStoreProps> = ({
  order,
  handleChangeMerchant,
  merchant,
  errorDeliveryOption,
}) => {
  const [voucher, setVoucher] = useState<IVoucherMerchantResponse>();
  const [delivery, setDelivery] = useState<IShippingOption>();

  useEffect(() => {
    handleChangeMerchant(
      order.merchant.merchant_id,
      voucher?.code ? voucher.code : '',
      delivery?.courier_code ? delivery?.courier_code : '',
    );
  }, [voucher, delivery]);

  const handleSetVoucher = (voucher: IVoucherMerchantResponse | undefined) => {
    setVoucher(voucher);
  };

  const handleSetDelivery = (delivery: IShippingOption) => {
    setDelivery(delivery);
  };

  return (
    <Card className={style.product__store__item}>
      <div className={style.product__store__item__header}>
        <Avatar src={order.merchant.merchant_image} size={40} />
        <h6>{order.merchant.merchant_name} </h6>
      </div>
      <div className={style.product__store__item__body}>
        {order.items.map((item) => (
          <ProductItem
            item={item}
            key={item.product_id}
            handleChangeMerchant={handleChangeMerchant}
          />
        ))}
      </div>
      <div className={style.product__store__item__button}>
        <VoucherStore
          handleSetVoucher={handleSetVoucher}
          order={order}
          merchant={merchant}
        />

        <Delivery
          handleSetDelivery={handleSetDelivery}
          order={order}
          merchant={merchant}
        />
      </div>
      <div className={style.product__store__item__alert}>
        {voucher && order.is_voucher_invalid && (
          <Alert
            message="
            Voucher is not valid, please select another voucher.
          "
            type="warning"
            showIcon
            closable
          />
        )}
        {errorDeliveryOption && (
          <Alert
            message={errorDeliveryOption}
            type="error"
            showIcon
            closable
            className={style.product__store__item__alert}
          />
        )}
      </div>
      {delivery && (
        <>
          <div className={style.product__store__item__desc}>
            <ul className={style.product__store__item__desc__list}>
              <li className={style.product__store__item__desc__items}>
                <p className={style.product__store__item__desc__items__bold}>
                  {order.delivery_service.merchant_city}
                </p>
                <RiArrowRightLine />
                <p className={style.product__store__item__desc__items__bold}>
                  {order.delivery_service.user_city}
                </p>
              </li>
              <li className={style.product__store__item__desc__items}>
                <p className={style.product__store__item__desc__items__gray}>
                  Courier
                </p>
                <p className={style.product__store__item__desc__items__bold}>
                  {order.delivery_service.description}
                  {' - '}
                  {order.delivery_service.delivery_option.toUpperCase()}{' '}
                  {order.delivery_service.service}
                </p>
              </li>
              <li className={style.product__store__item__desc__item}>
                <p className={style.product__store__item__desc__items__gray}>
                  Estimated Delivery Time
                </p>
                <p className={style.product__store__item__desc__items__bold}>
                  {order.delivery_service.etd} Days
                </p>
              </li>
            </ul>
          </div>
          <Divider className={style.product__store__item__border} />
        </>
      )}
      <div className={style.product__store__item__desc}>
        <ul className={style.product__store__item__desc__list}>
          <li className={style.product__store__item__desc__item}>
            <p className={style.product__store__item__desc__item__label}>
              Subtotal
            </p>
            <p>{toRupiah(order.sub_total)}</p>
          </li>
          <li className={style.product__store__item__desc__item}>
            <p className={style.product__store__item__desc__item__label}>
              Shipping
            </p>
            <p>+{toRupiah(order.delivery_cost)}</p>
          </li>
          <li className={style.product__store__item__desc__item}>
            <p className={style.product__store__item__desc__item__label}>
              Discount
            </p>
            <p>-{toRupiah(order.discount)}</p>
          </li>
        </ul>
      </div>
      <Divider style={{ margin: 0 }} />
      <div className={style.product__store__item__subtotal}>
        <p>Total</p>
        <p>{delivery ? toRupiah(order.total) : '-'}</p>
      </div>
    </Card>
  );
};

export default ProductStoreItem;
