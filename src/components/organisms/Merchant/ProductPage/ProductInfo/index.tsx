import { Cascader } from 'antd';
import { Rule } from 'antd/es/form';
import debounce from 'debounce-promise';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useGetCategoriesQuery } from '../../../../../app/features/home/homeApiSlice';
import { useCheckProductNameMutation } from '../../../../../app/features/merchant/merchantApiSlice';
import { capitalizeFirstLetter } from '../../../../../helpers/capitalizeFirstLetter';
import { IErrorResponse } from '../../../../../helpers/types/response.interface';
import { Card, FormLabel, Input } from '../../../../atoms';
import { rules } from '../validation';
import style from './index.module.scss';

interface Option {
  label: string;
  value: string;
  children?: Option[];
}

interface ProductInfoProps {
  title: string | undefined;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ title }) => {
  const { data } = useGetCategoriesQuery({});
  const [categories, setCategories] = useState<Option[]>([]);
  const [checkName] = useCheckProductNameMutation();
  const params = useParams();
  const isEdit = Boolean(params.id);

  const additionalNameRule = {
    validator: debounce((_: Rule, value: string): Promise<void> => {
      if (!value || value.length < 3) {
        return Promise.reject();
      }

      return new Promise(async (resolve, reject) => {
        const body = {
          product_name: value,
        };
        try {
          const data = await checkName(body).unwrap();
          if (isEdit && value === title) {
            resolve();
          }
          if (!data.is_available) {
            reject(
              new Error(
                'Product name is already used. Please try another name.',
              ),
            );
          }
          resolve();
        } catch (err) {
          const error = err as IErrorResponse;
          reject(new Error(capitalizeFirstLetter(error.message)));
        }
      });
    }, 500),
  };

  useEffect(() => {
    if (!data) return;
    const newCategories = data.map((category) => ({
      label: category.name,
      value: category.id.toString(),
      children: category.children?.map((subCategory) => ({
        label: subCategory.name,
        value: subCategory.id.toString(),
        children: subCategory.children?.map((subSubCategory) => ({
          label: subSubCategory.name,
          value: subSubCategory.id.toString(),
        })),
      })),
    }));
    setCategories(newCategories);
  }, [data]);

  return (
    <Card className={style.pi}>
      <div className={style.pi__header}>
        <h2 className={style.pi__title}>Product Information</h2>
        <p className={style.pi__info}>
          Choose the right name and category for your product to make it easy
          for the customers.
        </p>
      </div>
      <FormLabel
        label="Product Name"
        name="title"
        rules={[...rules.name, additionalNameRule]}
        hasFeedback
      >
        <Input
          placeholder="ex: Apple iPhone 12 Pro Max 256GB"
          showCount
          maxLength={70}
          size="small"
        />
      </FormLabel>
      <FormLabel
        label="Product Category"
        name="category_id"
        rules={rules.category}
      >
        <Cascader placeholder="Choose category" options={categories} />
      </FormLabel>
    </Card>
  );
};

export default ProductInfo;
