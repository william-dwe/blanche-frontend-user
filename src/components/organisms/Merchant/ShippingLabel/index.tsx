import React, { useEffect, useState } from 'react';
import Barcode from 'react-barcode';
import { useGetUserAddressQuery } from '../../../../app/features/address/userAddressApiSlice';
import { useGetMerchantOrderDetailsQuery } from '../../../../app/features/merchant/merchantOrderApiSlice';
import { IUserAddress } from '../../../../helpers/types';
import {
  IMerchantDetailTransactionResponse,
  IMerchantTransaction,
  IMerchantProduct,
} from '../../../../helpers/types/merchant/merchant-order.interface';
import { Logo } from '../../../atoms';
import style from './index.module.scss';

interface ShippingLabelProps {
  transaction: IMerchantTransaction | IMerchantDetailTransactionResponse;
}

const ShippingLabel: React.FC<ShippingLabelProps> = ({ transaction }) => {
  const [merchantAddress, setMerchantAddress] = useState<IUserAddress>();
  const { data } = useGetMerchantOrderDetailsQuery(
    transaction.invoice_code || '',
    {
      skip: !transaction.invoice_code,
    },
  );

  const { data: address } = useGetUserAddressQuery();

  useEffect(() => {
    if (!address) {
      return;
    }

    setMerchantAddress(address.filter((item) => item.is_merchant_address)[0]);
  }, [address]);

  if (!data) {
    return <></>;
  }
  return (
    <div className={style.shipping__label}>
      <div className={style.shipping__label__title}>
        <Logo size="extrasmall" />
        <span>Shipping Label</span>
      </div>
      <div className={style.shipping__label__barcode}>
        <Barcode value={data.invoice_code} />
      </div>
      <div className={style.shipping__label__delivery}>
        <p>{data.shipping_details.delivery_option.courier_name}</p>
      </div>
      <div className={style.shipping__label__content}>
        <div className={style.shipping__label__content__item}>
          <div className={style.shipping__label__content__item__title}>
            <span>From</span>
          </div>

          <div className={style.shipping__label__content__item__content}>
            <div
              className={style.shipping__label__content__item__content__user}
            >
              <span>{merchantAddress?.name} </span>
              <span>({merchantAddress?.phone})</span>
            </div>
            <div
              className={style.shipping__label__content__item__content__address}
            >
              <span>{merchantAddress?.details} </span>{' '}
              <span>{merchantAddress?.city_name}</span>
              {', '}
              <span>{merchantAddress?.province_name}</span>{' '}
              <span>{merchantAddress?.district_name}</span>
              {', '}
              <span>{merchantAddress?.subdistrict_name}</span>
              {', '}
              <span>{merchantAddress?.zip_code}</span>{' '}
            </div>
          </div>
        </div>
        <div className={style.shipping__label__content__item}>
          <div className={style.shipping__label__content__item__title}>
            <span>To</span>
          </div>

          <div className={style.shipping__label__content__item__content}>
            <div
              className={style.shipping__label__content__item__content__user}
            >
              <span>{data.shipping_details.address.name} </span>
              <span>({data.shipping_details.address.phone})</span>
            </div>
            <div
              className={style.shipping__label__content__item__content__address}
            >
              <span>{data.shipping_details.address.details} </span>{' '}
              <span>{data.shipping_details.address.city_name}</span>
              {', '}
              <span>{data.shipping_details.address.province_name}</span>{' '}
              <span>{data.shipping_details.address.district_name}</span>
              {', '}
              <span>{data.shipping_details.address.subdistrict_name}</span>
              {', '}
              <span>{data.shipping_details.address.zip_code}</span>{' '}
            </div>
          </div>
        </div>
      </div>
      <div className={style.shipping__label__product}>
        <h6>Product</h6>
        <ul className={style.shipping__label__product__content}>
          {data.product_details.products.map((product: IMerchantProduct) => (
            <li
              className={style.shipping__label__product__content__item}
              key={product.name}
            >
              <div
                className={style.shipping__label__product__content__item__name}
              >
                <span>{product.quantity}</span>pcs <span>{product.name}</span>
              </div>
              <p>{product.variant_name}</p>
              <p>{product.notes}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShippingLabel;
