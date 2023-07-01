import { message } from 'antd';
import { useState } from 'react';
import { useUpdateUserAddressMutation } from '../../../../app/features/address/userAddressApiSlice';
import {
  AddAddressProps,
  FormReturnAddress,
  IUpdateUserAddressRequest,
  OptionType,
  SelectedInput,
} from '../../../../helpers/types';
import { initialValueType } from '../CardAddress';

function useForm(
  handleOk: () => void,
  data: initialValueType,
): FormReturnAddress<AddAddressProps> {
  const [error, setError] = useState<Error>();
  const [updateUserAddress, { isLoading, isError }] =
    useUpdateUserAddressMutation();
  const [option, setOption] = useState<OptionType>({
    provinces: undefined,
    cities: undefined,
    districts: undefined,
    subDistrict: undefined,
  });

  const [selectedInput, setSelectedInput] = useState<SelectedInput>({
    province: data.province_id.toString(),
    city: data.city_id.toString(),
    district: data.district_id.toString(),
    subDistrict: data.subdistrict_id.toString(),
  });

  const handleChangeProvince = (province: string) => {
    setSelectedInput({
      province,
      city: undefined,
      district: undefined,
      subDistrict: undefined,
    });
  };

  const handleChangeCity = (city: string) => {
    setSelectedInput((prevValue) => ({
      ...prevValue,
      city,
      district: undefined,
      subDistrict: undefined,
    }));
  };

  const handleChangeDistrict = (district: string) => {
    setSelectedInput((prevValue) => ({
      ...prevValue,
      district,
      subDistrict: undefined,
    }));
  };

  const handleChangeSubDistrict = (subDistrict: string) => {
    setSelectedInput((prevValue) => ({
      ...prevValue,
      subDistrict,
    }));
  };

  const handleSubmit = async (values: AddAddressProps) => {
    const body: IUpdateUserAddressRequest = {
      id: Number(data.id),
      phone: values.phone,
      name: values.name,
      label: values.label,
      province_id: Number(selectedInput.province),
      city_id: Number(selectedInput.city),
      district_id: Number(selectedInput.district),
      subdistrict_id: Number(selectedInput.subDistrict),
      details: values.details,
    };
    try {
      await updateUserAddress(body).unwrap();
      message.success('Address successfully updated');
      handleOk();
    } catch (error) {
      setError(error as Error);
    }
  };

  return {
    handleSubmit,
    error,
    handleChangeCity,
    handleChangeDistrict,
    handleChangeProvince,
    handleChangeSubDistrict,
    selectedInput,
    setOption,
    option,
    isLoading,
    isError,
    setSelectedInput,
  };
}

export default useForm;
