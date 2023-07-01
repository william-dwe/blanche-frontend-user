import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Alert, ItemNotFound } from '../../../..';
import { useGetMerchantVoucherByCodeQuery } from '../../../../../app/features/merchant/voucherApiSlice';
import CardCouponInfo from './CardCouponInfo';
import CardCouponSettings from './CardCouponSettings';
import CardCouponType from './CardCouponType';
import style from './index.module.scss';
import useForms from './useForm';
import { Form as AForm } from 'antd';
import dayjs from 'dayjs';

interface AddVoucherProps {
  isEdit?: boolean;
  isDuplicate?: boolean;
}

const { useForm } = AForm;
const AddVoucher: React.FC<AddVoucherProps> = ({
  isEdit = false,
  isDuplicate = false,
}) => {
  const { handleSubmit, isError, isLoading, error } = useForms(isEdit);

  const { code } = useParams();

  const [form] = useForm();

  const { data: voucher, isLoading: isLoadingFetch } =
    useGetMerchantVoucherByCodeQuery(
      { code: code as string },
      {
        skip: !code,
      },
    );
  useEffect(() => {
    if (!voucher) return;
    form.setFieldsValue({
      code: isDuplicate ? '' : voucher.code_suffix,
      period: [dayjs(voucher.start_date), dayjs(voucher.expired_at)],
      discount_nominal: voucher.discount_nominal,
      min_order_nominal: voucher.min_order_nominal,
      quota: voucher.quota,
    });
  }, [voucher]);

  if (!voucher && !isLoadingFetch && code) {
    return (
      <ItemNotFound
        title="Voucher Not Found"
        body="Check again your voucher name."
      />
    );
  }

  return (
    <Form className={style.form__voucher} onFinish={handleSubmit} form={form}>
      <CardCouponType />
      <CardCouponInfo isEdit={isEdit} />
      <CardCouponSettings />
      {isError && (
        <Alert message={error?.message} type="error" showIcon closable />
      )}
      <div className={style.form__voucher__actions}>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={isLoading}
          disabled={isLoading}
        >
          {isEdit ? 'Edit Voucher' : 'Create Voucher'}
        </Button>
      </div>
    </Form>
  );
};

export default AddVoucher;
