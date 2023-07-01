import { message } from 'antd';
import { useState } from 'react';
import { useAddUserAddressMutation } from '../../../../app/features/address/userAddressApiSlice';
import {
  AddAddressProps,
  FormReturnAddress,
  ICreateUserAddressRequest,
  OptionType,
  SelectedInput,
} from '../../../../helpers/types';

function useForm(handleOk: () => void): FormReturnAddress<AddAddressProps> {
  const [error, setError] = useState<Error>();
  const [createAddress, { isLoading, isError }] = useAddUserAddressMutation();
  const [option, setOption] = useState<OptionType>({
    provinces: undefined,
    cities: undefined,
    districts: undefined,
    subDistrict: undefined,
  });

  const [selectedInput, setSelectedInput] = useState<SelectedInput>({
    province: undefined,
    city: undefined,
    district: undefined,
    subDistrict: undefined,
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
    const body: ICreateUserAddressRequest = {
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
      await createAddress(body).unwrap();
      message.success('Address has been added');
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
