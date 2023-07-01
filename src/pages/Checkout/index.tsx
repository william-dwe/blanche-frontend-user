import { message, Skeleton, Spin } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCheckoutSummaryMutation } from '../../app/features/checkout/checkoutApiSlice';
import {
  AddressCheckout,
  ItemNotFound,
  ListProductStore,
  ModalWarning,
  OrderSummary,
  SEO,
} from '../../components';
import { capitalizeFirstLetter } from '../../helpers/capitalizeFirstLetter';
import {
  ICheckoutResponse,
  ICheckoutSummaryMerchant,
  IUserAddress,
  IVoucherMarketplaceResponse,
} from '../../helpers/types';
import { IErrorResponse } from '../../helpers/types/response.interface';
import style from './index.module.scss';

const Checkout: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const data = searchParams.get('data');
  const [orderSummary, setOrderSummary] = useState<ICheckoutResponse>();
  const [address, setAddress] = useState<IUserAddress>();
  const [errorAddress, setErrorAddress] = useState<string>('');
  const [mpVoucher, setMpVoucher] = useState<IVoucherMarketplaceResponse>();
  const [merchant, setMerchant] = useState<ICheckoutSummaryMerchant[]>([]);
  const [errorDeliveryOption, setErrorDeliveryOption] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkoutSummary, { isLoading }] = useCheckoutSummaryMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    navigate('/cart');
  };

  const fetchData = useCallback(async () => {
    try {
      const order = await checkoutSummary({
        order_code: data || '',
        address_id: address?.id || 0,
        merchants: merchant,
        voucher_marketplace: mpVoucher?.code || '',
      }).unwrap();

      setOrderSummary(order);
    } catch (e) {
      const err = e as IErrorResponse;
      message.error(capitalizeFirstLetter(err.message));
    }
  }, [checkoutSummary, address, merchant, mpVoucher]);

  const handleChangeAddress = (address: IUserAddress) => {
    setAddress(address);
  };

  const handleChangeMpVoucher = (
    voucher: IVoucherMarketplaceResponse | undefined,
  ) => {
    setMpVoucher(voucher);
  };

  const handleChangeMerchant = (
    merchant_id: number,
    voucher_merchant: string,
    delivery_option: string,
  ) => {
    const merchantIndex = merchant.findIndex(
      (item) => item.merchant_id === merchant_id,
    );

    if (merchantIndex === -1) {
      const newMerchant: ICheckoutSummaryMerchant = {
        merchant_id,
        voucher_merchant,
        delivery_option,
      };
      setMerchant([...merchant, newMerchant]);
    } else {
      const newMerchant = [...merchant];
      newMerchant[merchantIndex] = {
        ...newMerchant[merchantIndex],
        voucher_merchant,
        delivery_option,
      };
      setMerchant(newMerchant);
    }
  };

  useEffect(() => {
    if (!data) {
      return;
    }

    if (orderSummary) {
      if (!orderSummary.is_order_eligible) {
        showModal();
      }
    }

    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (
      (merchant.filter((item) => item.delivery_option).length > 0 &&
        merchant.length > 0) ||
      merchant.length !== 0
    ) {
      setErrorDeliveryOption('');
    }
  }, [merchant]);

  if (!orderSummary) {
    if (isLoading) {
      return <Skeleton />;
    }

    return (
      <ItemNotFound
        className={style.checkout__page__itn}
        title="Order not found"
      />
    );
  }

  const handleMakeTx = (): boolean => {
    if (!address) {
      setErrorAddress('Please select address');
    }

    const isMerchantDeliveryOptionEmpty =
      merchant.filter((item) => !item.delivery_option).length > 0 ||
      merchant.length !== orderSummary.orders.length;

    if (isMerchantDeliveryOptionEmpty) {
      setErrorDeliveryOption('Please select delivery option');
    }

    return errorDeliveryOption === '' && !isMerchantDeliveryOptionEmpty;
  };

  return (
    <>
      <SEO title="Checkout" description="Checkout page" />
      <Spin spinning={isLoading}>
        <div className={style.checkout__page}>
          <div className={style.checkout__page__info}>
            <AddressCheckout
              handleChangeAddress={handleChangeAddress}
              errorAddress={errorAddress}
            />
            <ListProductStore
              order={orderSummary}
              merchant={merchant}
              handleChangeMerchant={handleChangeMerchant}
              errorDeliveryOption={errorDeliveryOption}
            />
          </div>
          <div className={style.checkout__page__summary}>
            <OrderSummary
              handleChangeMpVoucher={handleChangeMpVoucher}
              mpVoucher={mpVoucher}
              address={address as IUserAddress}
              merchant={merchant}
              order={orderSummary}
              handleMakeTx={handleMakeTx}
              errorAddress={errorAddress}
              errorDeliveryOption={errorDeliveryOption}
            />
          </div>
        </div>
        <ModalWarning isModalOpen={isModalOpen} handleOk={handleOk} />
      </Spin>
    </>
  );
};

export default Checkout;
