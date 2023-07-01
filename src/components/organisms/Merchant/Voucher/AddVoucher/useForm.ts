import { message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useCreateVoucherMutation,
  useUpdateMerchantVoucherMutation,
} from '../../../../../app/features/merchant/voucherApiSlice';
import { useAppSelector } from '../../../../../app/hooks';
import {
  FormReturn,
  ICreateFormValues,
  ICreateVoucherRequest,
} from '../../../../../helpers/types/merchant/voucher.interface';

function useForms(isEdit: boolean): FormReturn<ICreateFormValues> {
  const navigate = useNavigate();

  const [createVoucher, { isError, isLoading }] = useCreateVoucherMutation();
  const [editVoucher, { isError: isEditError, isLoading: isEditLoading }] =
    useUpdateMerchantVoucherMutation();
  const [error, setError] = useState<Error>();
  const { merchant } = useAppSelector((state) => state.auth);

  const handleCreate = async (values: ICreateFormValues) => {
    try {
      const body: ICreateVoucherRequest = {
        code: (merchant?.domain.toUpperCase() + values.code).toUpperCase(),
        discount_nominal: values.discount_nominal,
        min_order_nominal: values.min_order_nominal,
        start_date: values.period[0].toDate(),
        end_date: values.period[1].toDate(),
        quota: values.quota,
      };

      await createVoucher(body).unwrap();
      message.success(
        'Voucher successfully created. You will be redirected to voucher list page.',
      );
      navigate('/merchant/vouchers');
    } catch (error) {
      setError(error as Error);
    }
  };

  const handleEdit = async (values: ICreateFormValues) => {
    try {
      const body: ICreateVoucherRequest = {
        code: ('PENAKJAYA' + values.code).toUpperCase(),
        discount_nominal: values.discount_nominal,
        min_order_nominal: values.min_order_nominal,
        start_date: values.period[0].toDate(),
        end_date: values.period[1].toDate(),
        quota: values.quota,
      };

      await editVoucher(body).unwrap();
      message.success(
        'Voucher successfully updated. You will be redirected to voucher list page.',
      );
      navigate('/merchant/vouchers');
    } catch (error) {
      setError(error as Error);
    }
  };

  const handleSubmit = (values: ICreateFormValues) => {
    if (isEdit) {
      return handleEdit(values);
    }

    return handleCreate(values);
  };

  return {
    handleSubmit,
    isError: isError || isEditError,
    isLoading: isLoading || isEditLoading,
    error,
  };
}

export default useForms;
