import React, { useEffect, useState } from 'react';
import { useGetUserAddressQuery } from '../../../../app/features/address/userAddressApiSlice';
import { IUserAddress } from '../../../../helpers/types';
import { Alert, Card } from '../../../atoms';
import { ChooseAddress } from '../../UserAddress';
import style from './index.module.scss';
import { IoLocationSharp } from 'react-icons/io5';

interface AddressCheckoutProps {
  handleChangeAddress: (address: IUserAddress) => void;
  errorAddress: string;
}

const AddressCheckout: React.FC<AddressCheckoutProps> = ({
  handleChangeAddress,
  errorAddress,
}) => {
  const { data } = useGetUserAddressQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [defaultAddress, setDefaultAddress] = useState<IUserAddress>();
  const [addresses, setAddresses] = useState<IUserAddress[]>([]);

  useEffect(() => {
    if (!data) return;

    const defaultAddress =
      data.filter((item: IUserAddress) => item.is_default)[0] || data[0];
    handleChangeAddress(defaultAddress);
    setDefaultAddress(defaultAddress);

    setAddresses(data);
  }, [data]);

  const handleSetAddress = async (value: IUserAddress) => {
    setDefaultAddress(value);
    handleChangeAddress(value);
    setIsModalOpen(false);
  };

  return (
    <Card className={style.address__checkout}>
      <h5>
        <IoLocationSharp />
        Delivery Address
      </h5>{' '}
      {defaultAddress && (
        <ChooseAddress
          data={addresses}
          handleSetAddress={handleSetAddress}
          address={defaultAddress}
          showModal={showModal}
          handleCancel={handleCancel}
          isModalOpen={isModalOpen}
        />
      )}
      {errorAddress && (
        <Alert message={errorAddress} type="error" showIcon closable />
      )}
    </Card>
  );
};

export default AddressCheckout;
