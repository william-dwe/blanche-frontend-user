import React, { useEffect } from 'react';
import { Alert, FormLabel, Input, Select } from '../../../atoms';
import { Form, ModalHeader } from '../../../molecules';
import Modal from '../../../molecules/Modal';
import style from './index.module.scss';
import { rules } from './validation';
import useForms from './useForm';
import TextArea from 'antd/es/input/TextArea';
import { message, Space } from 'antd';
import {
  useGetCitiesByProvinceIdQuery,
  useGetDistrictByCityIdQuery,
  useGetProvincesQuery,
  useGetSubDistrictByDistrictIdQuery,
} from '../../../../app/features/address/addressApiSlice';
import { Form as AForm } from 'antd';
import { capitalizeFirstLetter } from '../../../../helpers/capitalizeFirstLetter';

interface AddAddressPageProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

const { useForm } = AForm;
const AddAddress: React.FC<AddAddressPageProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
}) => {
  const {
    handleSubmit,
    selectedInput,
    handleChangeCity,
    handleChangeDistrict,
    handleChangeProvince,
    handleChangeSubDistrict,
    setOption,
    option,
    isLoading,
    isError,
    error,
  } = useForms(handleOk);

  const [form] = useForm();

  const { data: provinces, isLoading: isLoadingProvinces } =
    useGetProvincesQuery();

  const { data: cities, isLoading: isLoadingCities } =
    useGetCitiesByProvinceIdQuery(Number(selectedInput.province), {
      skip: !selectedInput.province,
    });

  const { data: districts, isLoading: isLoadingDistricts } =
    useGetDistrictByCityIdQuery(Number(selectedInput.city), {
      skip: !selectedInput.city,
    });

  const { data: subdistrict, isLoading: isLoadingSubdstricts } =
    useGetSubDistrictByDistrictIdQuery(Number(selectedInput.district), {
      skip: !selectedInput.district,
    });

  useEffect(() => {
    if (provinces) {
      const data = provinces.provinces.map((item) => {
        return { value: item.id, label: item.name };
      });
      setOption((prevValue) => ({ ...prevValue, provinces: data }));
    }
  }, [provinces]);

  useEffect(() => {
    if (cities) {
      const data = cities.cities.map((item) => {
        return { value: item.id, label: item.name };
      });
      setOption((prevValue) => ({ ...prevValue, cities: data }));
    }
  }, [cities]);

  useEffect(() => {
    if (districts) {
      const data = districts.districts.map((item) => {
        return { value: item.id, label: item.name };
      });
      setOption((prevValue) => ({ ...prevValue, districts: data }));
    }
  }, [districts]);

  useEffect(() => {
    if (subdistrict) {
      const data = subdistrict.sub_districts.map((item) => {
        return { value: item.id, label: item.name };
      });
      setOption((prevValue) => ({ ...prevValue, subDistrict: data }));
    }
  }, [subdistrict]);

  const reset = (key: string) => {
    form.setFieldsValue({ [key]: null });
  };

  const onSelectProvince = () => {
    reset('city');
    reset('district');
    reset('subDistrict');
  };

  const onSelectCity = () => {
    reset('district');
    reset('subDistrict');
  };

  const onSelectDistrict = () => {
    reset('subDistrict');
  };

  return (
    <Modal
      open={isModalOpen}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            handleSubmit(values);
            form.resetFields();
          })
          .catch((err) => {
            const error = err as Error;
            message.error(error.message);
          });
      }}
      centered
      onCancel={handleCancel}
      width={600}
      okButtonProps={{ loading: isLoading, disabled: isLoading }}
    >
      <ModalHeader
        title="Add user address"
        info="Add address to manage where your product will delivered to."
      />
      <div className={style.edit__profile}>
        <Form name="basic" layout="vertical" onFinish={handleOk} form={form}>
          <Space>
            <FormLabel label="Name " name="name" rules={rules.name}>
              <Input placeholder="Name" />
            </FormLabel>
            <FormLabel label="Phone" name="phone" rules={rules.phone}>
              <Input placeholder="Phone" maxLength={15} />
            </FormLabel>
          </Space>
          <FormLabel label="Label Address" name="label" rules={rules.label}>
            <Input placeholder="Label Address" />
          </FormLabel>
          <FormLabel label="Province" name="province" rules={rules.province}>
            <Select
              showSearch
              placeholder="Select Province"
              optionFilterProp="children"
              filterOption={(input, option) => {
                return (option?.label ?? '')
                  .toString()
                  .toLowerCase()
                  .includes(input.toLowerCase());
              }}
              onChange={(value) => {
                handleChangeProvince(value);
              }}
              onSelect={onSelectProvince}
              loading={isLoadingProvinces}
              value={selectedInput.province}
              options={option.provinces ? option.provinces : []}
            />
          </FormLabel>
          <FormLabel label="City" name="city" rules={rules.city}>
            <Select
              showSearch
              placeholder="Select City"
              filterOption={(input, option) => {
                return (option?.label ?? '')
                  .toString()
                  .toLowerCase()
                  .includes(input.toLowerCase());
              }}
              loading={isLoadingCities}
              value={selectedInput.city}
              onChange={(value) => {
                handleChangeCity(value);
              }}
              onSelect={onSelectCity}
              disabled={!selectedInput.province}
              options={option.cities ? option.cities : []}
            />
          </FormLabel>
          <FormLabel label="District" name="district" rules={rules.district}>
            <Select
              showSearch
              placeholder="Select district"
              optionFilterProp="children"
              filterOption={(input, option) => {
                return (option?.label ?? '')
                  .toString()
                  .toLowerCase()
                  .includes(input.toLowerCase());
              }}
              value={selectedInput.district}
              loading={isLoadingDistricts}
              onChange={(value) => {
                handleChangeDistrict(value);
              }}
              onSelect={onSelectDistrict}
              disabled={!selectedInput.city}
              options={option.districts ? option.districts : []}
            />
          </FormLabel>
          <FormLabel
            label="Sub District"
            name="subDistrict"
            rules={rules.subDistrict}
          >
            <Select
              showSearch
              placeholder="Select Sub District"
              optionFilterProp="children"
              filterOption={(input, option) => {
                return (option?.label ?? '')
                  .toString()
                  .toLowerCase()
                  .includes(input.toLowerCase());
              }}
              value={selectedInput.subDistrict}
              loading={isLoadingSubdstricts}
              onChange={(value) => {
                handleChangeSubDistrict(value);
              }}
              disabled={!selectedInput.district}
              options={option.subDistrict ? option.subDistrict : []}
            />
          </FormLabel>
          <FormLabel label="More Details" name="details" rules={rules.details}>
            <TextArea placeholder="Street name etc." />
          </FormLabel>
          {isError && (
            <Alert
              message={capitalizeFirstLetter(error?.message)}
              type="error"
              showIcon
              closable
              className={style.card__login__alert}
            />
          )}
        </Form>
      </div>
    </Modal>
  );
};

export default AddAddress;
