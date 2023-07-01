import React from 'react';
import {
  ICheckoutResponse,
  ICheckoutSummaryMerchant,
} from '../../../../../helpers/types';

import ProductStoreItem from '../ProductStoreItem';
import style from './index.module.scss';

interface ListProductStoreProps {
  order: ICheckoutResponse;
  handleChangeMerchant: (
    merchant_id: number,
    voucher_merchant: string,
    delivery_option: string,
  ) => void;

  merchant: ICheckoutSummaryMerchant[];
  errorDeliveryOption: string;
}

const ListProductStore: React.FC<ListProductStoreProps> = ({
  order,
  handleChangeMerchant,
  merchant,
  errorDeliveryOption,
}) => {
  return (
    <div className={style.list__product__store__item}>
      {order.orders.map((order) => (
        <ProductStoreItem
          order={order}
          handleChangeMerchant={handleChangeMerchant}
          merchant={merchant}
          key={order.merchant.merchant_name}
          errorDeliveryOption={errorDeliveryOption}
        />
      ))}
    </div>
  );
};

export default ListProductStore;
