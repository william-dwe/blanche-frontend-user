import React from 'react';

import {
  IMerchantProductDetails,
  IMerchantShippingDetails,
} from '../../../../../helpers/types/merchant/merchant-order.interface';
import { Card } from '../../../../atoms';
import DetailProduct from '../../../TransactionDetailsPage/DetailProduct';
import CardUser from './CardUser';
import style from './index.module.scss';

interface OrderDetailProps {
  productDetails: IMerchantProductDetails;
  shippingDetails: IMerchantShippingDetails;
}

const OrderDetail: React.FC<OrderDetailProps> = ({
  productDetails,
  shippingDetails,
}) => {
  return (
    <Card className={style.od}>
      <h3 className={style.od__title}>Order Details</h3>
      <div className={style.od__address}>
        <h4 className={style.od__sub}>Address</h4>
        <div className={style.od__address__contact}>
          <p className={style.od__address__contact__name}>
            {shippingDetails.address.name}
          </p>
          <p className={style.od__address__contact__phone}>
            {shippingDetails.address.phone}
          </p>
        </div>
        <div className={style.od__address__details}>
          <p className={style.od__address__details__street}>
            {shippingDetails.address.details}
          </p>
          <p className={style.od__address__details__city}>
            {shippingDetails.address.subdistrict_name},{' '}
            {shippingDetails.address.district_name}{' '}
            {shippingDetails.address.province_name}{' '}
            {shippingDetails.address.city_name}{' '}
            {shippingDetails.address.zip_code}
          </p>
        </div>
      </div>
      <div className={style.od__user}>
        <h4 className={style.od__sub}>User</h4>
        <CardUser user={productDetails.user} />
      </div>
      <div className={style.od__product}>
        <h4 className={style.od__sub}>Product</h4>
        {productDetails.products.map((product) => (
          <DetailProduct product={product} key={product.product_slug} />
        ))}
      </div>
    </Card>
  );
};

export default OrderDetail;
