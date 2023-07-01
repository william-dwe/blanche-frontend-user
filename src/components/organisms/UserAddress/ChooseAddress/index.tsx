import React from 'react';
import {
  IGetUserAddressResponse,
  IUserAddress,
} from '../../../../helpers/types';
import { Button } from '../../../atoms';
import style from './index.module.scss';
import ModalAddress from './ModalAddress';

interface ChooseAddessProps {
  data: IGetUserAddressResponse;
  handleSetAddress: (data: IUserAddress) => void;
  address: IUserAddress;
  showModal: () => void;
  handleCancel: () => void;
  isModalOpen: boolean;
  disabled?: boolean;
}

const ChooseAddress: React.FC<ChooseAddessProps> = ({
  data,
  handleCancel,
  showModal,
  handleSetAddress,
  isModalOpen,
  address,
  disabled,
}) => {
  return (
    <>
      <div className={style.choose__address}>
        <p className={style.choose__address__title}>Address</p>
        <div className={style.choose__address__info}>
          <div className={style.choose__address__info__content}>
            <h6>
              {address.label} - {address.name}({address.phone})
            </h6>
            <p>
              {address.province_name}, {address.city_name},{' '}
              {address.district_name}
            </p>
          </div>

          <Button
            type="primary"
            onClick={showModal}
            disabled={disabled}
            size="large"
          >
            Change Address
          </Button>
        </div>
      </div>
      <ModalAddress
        handleCancel={handleCancel}
        isModalOpen={isModalOpen}
        data={data}
        defaultAddress={address}
        handleSetAddress={handleSetAddress}
      />
    </>
  );
};

export default ChooseAddress;
