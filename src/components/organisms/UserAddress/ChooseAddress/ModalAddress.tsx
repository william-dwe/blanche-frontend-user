import React, { useState } from 'react';
import Modal from '../../../molecules/Modal';
import CardAddress from './CardAddress';
import {
  IGetUserAddressResponse,
  IUserAddress,
} from '../../../../helpers/types';
import style from './index.module.scss';
import { ModalHeader } from '../../..';
import { Radio, RadioChangeEvent } from 'antd';

interface ModalAddressPageProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  data: IGetUserAddressResponse;
  defaultAddress: IUserAddress;
  handleSetAddress: (data: IUserAddress) => void;
}

const ModalAddress: React.FC<ModalAddressPageProps> = ({
  isModalOpen,
  handleCancel,
  data,
  defaultAddress,
  handleSetAddress,
}) => {
  const [address, setAddress] = useState<IUserAddress>(defaultAddress);

  const handleChange = (e: RadioChangeEvent) => {
    setAddress(e.target.value);
  };

  return (
    <Modal
      open={isModalOpen}
      centered
      onCancel={handleCancel}
      onOk={() => handleSetAddress(address)}
      className={style.choose__address__modal}
      width={600}
    >
      <ModalHeader title="Choose Address" />

      <Radio.Group
        className={style.choose__address__modal__radio}
        onChange={handleChange}
        value={address}
      >
        {data &&
          data
            .filter((item: IUserAddress) => item.is_default)
            .map((item: IUserAddress) => (
              <Radio
                key={item.id}
                value={item}
                className={style.choose__address__radio__item}
              >
                <CardAddress data={item} address={address} />
              </Radio>
            ))
            .concat(
              data
                ?.filter((item: IUserAddress) => !item.is_default)
                .map((item: IUserAddress) => (
                  <Radio key={item.id} value={item}>
                    <CardAddress data={item} address={address} />
                  </Radio>
                )),
            )}
      </Radio.Group>
    </Modal>
  );
};

export default ModalAddress;
