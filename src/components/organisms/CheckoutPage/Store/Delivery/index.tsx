import { Dropdown, MenuProps, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { Button } from '../../../../atoms';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import style from './index.module.scss';
import DeliveryItem from './DeliveryItem';
import {
  ICheckoutSummaryMerchant,
  IOrder,
  IShippingOption,
} from '../../../../../helpers/types';
import { useGetDeliveryOptionsQuery } from '../../../../../app/features/merchant/merchantApiSlice';

interface DeliveryProps {
  order: IOrder;
  merchant: ICheckoutSummaryMerchant[];
  handleSetDelivery: (delivery: IShippingOption) => void;
}
const Delivery: React.FC<DeliveryProps> = ({
  order,
  merchant,
  handleSetDelivery,
}) => {
  const { data, isLoading } = useGetDeliveryOptionsQuery(
    order.merchant.merchant_domain,
  );
  const [items, setItems] = useState<MenuProps['items']>([]);
  const [merchantItem, setMerchantItem] = useState<ICheckoutSummaryMerchant>();

  useEffect(() => {
    if (!merchant) return;

    const voucher = merchant.find(
      (merchant) => merchant.merchant_id === order.merchant.merchant_id,
    );

    setMerchantItem(voucher);
  }, [merchant]);

  useEffect(() => {
    if (!data || !data.delivery_options) return;

    const items: MenuProps['items'] = data.delivery_options.map((item) => {
      return {
        label: <DeliveryItem delivery={item} />,
        key: item.courier_code,
        onClick: () => {
          handleSetDelivery(item);
        },
      };
    });

    setItems(items);
  }, [data?.delivery_options]);

  if (isLoading) {
    return <Skeleton.Button />;
  }

  if (!items) return null;

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        disabled: !items,
      }}
    >
      <Button
        size="large"
        className={style.delivery__button}
        type="primary"
        ghost
      >
        {merchantItem?.delivery_option ? (
          merchantItem.delivery_option.toUpperCase()
        ) : (
         "Choose Delivery Services"
        )}
        <MdOutlineKeyboardArrowDown />
      </Button>
    </Dropdown>
  );
};

export default Delivery;
