import { Button, message } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { CheckboxGroup, ModalConfirm } from '../../../..';
import {
  useGetShippingOptionsQuery,
  usePutShippingOptionsMutation,
} from '../../../../../app/features/merchant/merchantApiSlice';
import { capitalizeFirstLetter } from '../../../../../helpers/capitalizeFirstLetter';
import { IShippingOption } from '../../../../../helpers/types';
import { IErrorResponse } from '../../../../../helpers/types/response.interface';
import ShippingCard from '../ShippingCard';
import style from './index.module.scss';
import './override.scss';

const ShippingList: React.FC = () => {
  const [values, setValues] = useState<IShippingOption[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetShippingOptionsQuery();
  const [putShippingOptions, { isLoading: isLoadingSave }] =
    usePutShippingOptionsMutation();

  useEffect(() => {
    if (!data) return;
    setValues(data);
  }, [data]);

  const options = data?.map((item) => {
    return {
      value: item.courier_code,
      children: <ShippingCard key={item.courier_code} shipping={item} />,
    };
  });
  const onChange = (checkedValues: CheckboxValueType[]) => {
    setValues((prevValue) =>
      prevValue.map((item) => {
        if (checkedValues.includes(item.courier_code)) {
          return {
            ...item,
            is_checked: true,
          };
        }
        return {
          ...item,
          is_checked: false,
        };
      }),
    );
  };

  const onSave = async () => {
    try {
      await putShippingOptions(values).unwrap();
      message.success('Success updating shipping options');
      setIsModalOpen(false);
    } catch (err) {
      const error = err as IErrorResponse;
      message.error(capitalizeFirstLetter(error.message));
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={classNames(style.sl, 'sl')}>
      {options && (
        <CheckboxGroup
          options={options}
          onChange={onChange}
          value={values
            ?.filter((item) => item.is_checked)
            .map((item) => item.courier_code)}
          className={style.rating}
        />
      )}
      <Button
        type="primary"
        onClick={handleOpenModal}
        className={style.sl__button}
        loading={isLoading}
      >
        Save
      </Button>
      <ModalConfirm
        isModalOpen={isModalOpen}
        title="Edit Shipping Options"
        info="Are you sure you want to change the shipping options?"
        handleOk={onSave}
        handleCancel={handleCloseModal}
        cancelButton={true}
        closable={true}
        confirmButtonProps={{ loading: isLoadingSave }}
      />
    </div>
  );
};

export default ShippingList;
