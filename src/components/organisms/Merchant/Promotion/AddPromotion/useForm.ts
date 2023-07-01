import { message } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useCreatePromotionMutation,
  useUpdatePromotionMutation,
} from '../../../../../app/features/merchant/promotionApiSlice';
import {
  FormReturnPromotion,
  ICreatePromotionRequest,
  ICreatePromotionValues,
} from '../../../../../helpers/types/merchant/promotion.merchant.inteface';
import { TableProductDataType } from '../TableProduct';

export interface selectedProductProps {
  [key: string]: TableProductDataType[];
}

function useForms(
  isEdit: boolean | undefined,
  handleSetProducts: (product: TableProductDataType[]) => void,
  page: number,
  productKey: React.Key[],
  products: TableProductDataType[],
  handleSetProductKeys: (productKey: React.Key[]) => void,
  discountType: 'Fixed Amount' | 'Percentage',
  id?: number,
): FormReturnPromotion<ICreatePromotionValues> {
  const navigate = useNavigate();

  const [selectedProducts, setSelectedProducts] =
    useState<selectedProductProps>({});
  const [selectedKey, setSelectedKey] = useState<React.Key[]>(
    isEdit ? productKey : [],
  );
  const [createPromotion, { isError, isLoading }] =
    useCreatePromotionMutation();
  const [editPromotion, { isError: isEditError, isLoading: isEditLoading }] =
    useUpdatePromotionMutation();
  const [error, setError] = useState<Error>();

  const rowSelection = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: TableProductDataType[],
    ) => {
      setSelectedProducts((prev: any) => ({
        ...prev,
        [page.toString()]: selectedRows,
      }));

      setSelectedKey([...new Set([...selectedRowKeys, ...productKey])]);

      setSelectedKey(
        isEdit
          ? [...new Set([...selectedRowKeys, ...productKey])]
          : selectedRowKeys,
      );
    },
    getCheckboxProps: (record: TableProductDataType) => ({
      disabled: record.key === productKey.find((key) => key === record.key),
    }),
  };

  const handleCloseModal = () => {
    const result: TableProductDataType[] = [];

    Object.keys(selectedProducts).forEach((key) => {
      result.push(...selectedProducts[key]);
    });

    const filteredEditResult = [...result, ...products].filter((item) =>
      selectedKey.includes(item.key),
    );

    handleSetProducts(isEdit ? filteredEditResult : result);
  };

  const handleCreate = async (values: ICreatePromotionValues) => {
    if (selectedKey.length === 0) {
      message.error('Please select at least one product');
      return;
    }

    try {
      const body: ICreatePromotionRequest = {
        title: values.title,
        max_discounted_quantity: values.max_discounted_quantity,
        promotion_type_id: discountType === 'Fixed Amount' ? 1 : 2,
        nominal: values.nominal,
        quota: values.quota,
        start_date: values.period[0].toDate(),
        end_date: values.period[1].toDate(),
        product_ids: selectedKey,
      };

      await createPromotion(body).unwrap();
      message.success(
        'Promotion successfully created. You will be redirected to promotion list page.',
      );
      navigate('/merchant/promotions');
    } catch (error) {
      const err = error as Error;
      setError(err);
      message.error(err.message);
    }
  };

  const handleEdit = async (values: ICreatePromotionValues) => {
    if (selectedKey.length === 0 && products.length === 0) {
      message.error('Please select at least one product');
      return;
    }

    try {
      const body: ICreatePromotionRequest = {
        id: id,
        title: values.title,
        max_discounted_quantity: values.max_discounted_quantity,
        promotion_type_id: discountType === 'Fixed Amount' ? 1 : 2,
        nominal: values.nominal,
        quota: values.quota,
        start_date: values.period[0].toDate(),
        end_date: values.period[1].toDate(),
        product_ids:
          selectedKey.length === 0
            ? [...new Set([...productKey])]
            : [...new Set([...selectedKey])],
      };
      await editPromotion(body).unwrap();
      message.success(
        'Promotion successfully updated. You will be redirected to promotion list page.',
      );
      navigate('/merchant/promotions');
    } catch (error) {
      const err = error as Error;
      setError(err);
      message.error(err.message);
    }
  };

  const handleSubmit = (values: ICreatePromotionValues) => {
    if (isEdit) {
      return handleEdit(values);
    }
    return handleCreate(values);
  };

  return {
    rowSelection,
    isError: isError || isEditError,
    isLoading: isLoading || isEditLoading,
    error,
    selectedProducts,
    handleSubmit,
    handleCloseModal,
  };
}

export default useForms;
