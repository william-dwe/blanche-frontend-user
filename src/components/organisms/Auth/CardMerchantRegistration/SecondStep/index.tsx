import { Modal, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../../..';
import { useGetUserAddressQuery } from '../../../../../app/features/address/userAddressApiSlice';
import { capitalizeFirstLetter } from '../../../../../helpers/capitalizeFirstLetter';
import { IUserAddress } from '../../../../../helpers/types';
import { Alert, Button } from '../../../../atoms';
import AddAddress from '../../../UserAddress/AddAddress';
import ChooseAddress from '../../../UserAddress/ChooseAddress';
import style from './index.module.scss';
import useForm from './useForm';

interface SecondStepProps {
  step: number;
  store: string;
  domain: string;
  handleBack: () => void;
}

const SecondStep: React.FC<SecondStepProps> = ({
  step,
  handleBack,
  store,
  domain,
}) => {
  const { data } = useGetUserAddressQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal, contextHolder] = Modal.useModal();
  const navigate = useNavigate();
  const countDown = () => {
    let secondsToGo = 5;

    const instance = modal.success({
      title: 'You are successfully registered as a merchant',
      content: 'Now you can start selling your products',
    });

    const timer = setInterval(() => {
      secondsToGo -= 1;
      instance.update({
        content: `You will be redirected to your dashboard!.`,
      });
      navigate('/merchant');
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      instance.destroy();
    }, secondsToGo * 1000);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [defaultAddress, setDefaultAddress] = useState<IUserAddress>();
  const [addresses, setAddresses] = useState<IUserAddress[]>([]);

  useEffect(() => {
    if (!data) return;

    setDefaultAddress(
      data?.filter((item: IUserAddress) => item.is_default)[0] || data?.[0],
    );
    setAddresses(data);
  }, [data]);

  const handleSetAddress = (value: IUserAddress | undefined) => {
    setDefaultAddress(value);
    setIsModalOpen(false);
  };

  const { handleSubmit, isLoading, isError, error } = useForm({
    store,
    domain,
    address: defaultAddress,
    countDown,
  });

  return (
    <Form className={style.card__second__step} onFinish={handleSubmit}>
      {(data ? data : []).length > 0 ? (
        defaultAddress && (
          <ChooseAddress
            data={addresses}
            handleSetAddress={handleSetAddress}
            address={defaultAddress}
            showModal={showModal}
            handleCancel={handleCancel}
            isModalOpen={isModalOpen}
            disabled={step !== 1}
          />
        )
      ) : (
        <div className={style.card__second__step__add}>
          <Alert type="warning" message="You don't have any address yet" />
          <Button
            type="primary"
            size="middle"
            htmlType="submit"
            block
            onClick={showModal}
          >
            Add Address{' '}
          </Button>
          <AddAddress
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
          />
        </div>
      )}
      {isError && (
        <Alert
          message={capitalizeFirstLetter(error?.message)}
          type="error"
          showIcon
          closable
          className={style.card__second__step__alert}
        />
      )}
      <Space className="card__second__step__button">
        {contextHolder}
        <Button
          type="primary"
          size="middle"
          htmlType="submit"
          block
          disabled={step !== 1}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          type="primary"
          size="middle"
          htmlType="submit"
          ghost
          block
          disabled={step !== 1}
          loading={isLoading}
        >
          Register Merchant
        </Button>
      </Space>
    </Form>
  );
};

export default SecondStep;
