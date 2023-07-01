import { PlusCircleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { AddAddress, UserAddress } from '../../..';
import { Button } from '../../../atoms';
import style from './index.module.scss';

const AddressSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={style.address__section}>
      <div className={style.address__section__header}>
        <div className={style.address__section__header__left}>
          <h1 className={style.address__section__header__left__title}>
            User Address
          </h1>
          <p className={style.address__section__header__left__info}>
            See all of your address here.
          </p>
        </div>
        <Button
          size="large"
          type="primary"
          ghost
          style={{ marginBottom: 12 }}
          onClick={showModal}
        >
          <PlusCircleOutlined />
          Add New Address
        </Button>
      </div>
      <UserAddress />
      <AddAddress
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default AddressSection;
