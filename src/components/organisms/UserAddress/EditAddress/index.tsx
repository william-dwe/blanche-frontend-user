import React, { useEffect } from 'react';
import { Alert, FormLabel, Input, Select } from '../../../atoms';
import { Form, ModalHeader } from '../../../molecules';
import Modal from '../../../molecules/Modal';
import style from './index.module.scss';
import { rules } from './validation';
import useForms from './useForm';
import TextArea from 'antd/es/input/TextArea';
import { Space } from 'antd';
import {
  useGetCitiesByProvinceIdQuery,
  useGetDistrictByCityIdQuery,
  useGetProvincesQuery,
  useGetSubDistrictByDistrictIdQuery,
} from '../../../../app/features/address/addressApiSlice';
import { Form as AForm } from 'antd';
import { initialValueType } from '../CardAddress';
import { capitalizeFirstLetter } from '../../../../helpers/capitalizeFirstLetter';

interface EditAddressPageProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  data: initialValueType;
}

const { useForm } = AForm;
const EditAddress: React.FC<EditAddressPageProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  data,
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
    isError,
    isLoading,
    error,
    setSelectedInput,
  } = useForms(handleOk, data);

  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue(data);
    setSelectedInput({
      province: data.province_id.toString(),
      city: data.city_id.toString(),
      district: data.district_id.toString(),
      subDistrict: data.subdistrict_id.toString(),
    });
  }, [data, form]);

  const { data: provinces, isLoading: isLoadingProvinces } =
    useGetProvincesQuery();

  const { data: cities, isLoading: isLoadingCities } =
    useGetCitiesByProvinceIdQuery(Number(selectedInput.province), {
      skip: !selectedInput.province || selectedInput.province === '0',
    });

  const { data: districts, isLoading: isLoadingDistricts } =
    useGetDistrictByCityIdQuery(Number(selectedInput.city), {
      skip: !selectedInput.city || selectedInput.city === '0',
    });

  const { data: subdistrict, isLoading: isLoadingSubdstricts } =
    useGetSubDistrictByDistrictIdQuery(Number(selectedInput.district), {
      skip: !selectedInput.district || selectedInput.district === '0',
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
        form.validateFields().then((values) => {
          handleSubmit(values);

          form.resetFields();
        });
      }}
      centered
      onCancel={handleCancel}
      width={600}
      okButtonProps={{ loading: isLoading, disabled: isLoading }}
    >
      <ModalHeader title="Edit user address" />
      <div className={style.edit__profile}>
        <Form layout="vertical" onFinish={handleOk} form={form}>
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
              options={option.subDistrict ? option.subDistrict : []}
            />
          </FormLabel>
          <FormLabel label="More Details" name="details" rules={rules.details}>
            <TextArea />
          </FormLabel>
          {isError && (
            <Alert
              message={capitalizeFirstLetter(error?.message)}
              type="error"
              showIcon
              className={style.card__login__alert}
            />
          )}
        </Form>
      </div>
    </Modal>
  );
};

export default EditAddress;
