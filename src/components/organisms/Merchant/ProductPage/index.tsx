import React, { useEffect, useState } from 'react';
import style from './index.module.scss';
import { Button, Form, ItemNotFound } from '../../..';
import ProductInfo from './ProductInfo';
import ProductMedia from './ProductMedia';
import ProductDetails from './ProductDetails';
import { useForm } from 'antd/es/form/Form';
import ProductType from './ProductType';
import ProductShipping from './ProductShipping';
import {
  useCreateProductMutation,
  useGetProductByIDQuery,
  useGetVariantsByIDQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../../../app/features/merchant/merchantApiSlice';
import { IProductForm } from '../../../../helpers/types/merchant/product.interface';
import { message } from 'antd';
import { UploadFile } from 'antd/es/upload';
import { IErrorResponse } from '../../../../helpers/types/response.interface';
import {
  ICreateProductRequest,
  IVariantVariantItems,
} from '../../../../helpers/types/product.interface';
import { useNavigate, useParams } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../../../helpers/capitalizeFirstLetter';

const ProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const [isVariant, setIsVariant] = useState(false);
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isLoadingUpdate }] =
    useUpdateProductMutation();
  const [upload, { isLoading: isLoadingPhoto }] =
    useUploadProductImageMutation();
  const params = useParams();
  const {
    data,
    isError,
    isLoading: isLoadingFetch,
  } = useGetProductByIDQuery(params.id || '', { skip: !params.id });

  const { data: variants } = useGetVariantsByIDQuery(
    params.id ? parseInt(params.id) : 0,
    { skip: isError || !params.id },
  );

  const handleSetVariant = (value: boolean) => {
    setIsVariant(value);
  };

  useEffect(() => {
    if (!data || !variants) return;
    setIsVariant(variants.variant_items.length > 0);
  }, [data, variants]);

  const onFinishForm = async (values: IProductForm) => {
    try {
      const variantOptions = [];

      if (values.firstVariant && values.firstSelect) {
        variantOptions.push({
          name: values.firstVariant,
          type: values.firstSelect,
        });
      }
      if (values.secondVariant && values.secondSelect) {
        variantOptions.push({
          name: values.secondVariant,
          type: values.secondSelect,
        });
      }

      const variantItems: IVariantVariantItems[] = [];
      if (
        (values.firstVariant || values.secondVariant) &&
        values.variantItems
      ) {
        await Promise.all(
          values.variantItems.map(async (item) => {
            try {
              if (item.image[0].url === '' || item.image[0].url) {
                const id =
                  variants?.variant_items
                    .map((item) => item.image)
                    .indexOf(item.image[0].url) || 0;
                variantItems.unshift({
                  image: item.image[0].url,
                  price: item.price,
                  stock: item.stock,
                  id: variants?.variant_items[id].id || 0,
                });
                return;
              }
              const fileObj = item.image[0].originFileObj;
              const formData = new FormData();
              formData.append('file', fileObj as File);
              const data = await upload(formData).unwrap();
              variantItems.push({
                image: data.image_url,
                price: item.price,
                stock: item.stock,
              });
            } catch (err) {
              const error = err as IErrorResponse;
              message.error(capitalizeFirstLetter(error.message));
            }
          }),
        );
      }

      const images: string[] = [];
      await Promise.all(
        values.images.map(async (file) => {
          try {
            if (file.url) {
              images.push(file.url);
              return;
            }
            const fileObj = file.originFileObj;
            const formData = new FormData();
            formData.append('file', fileObj as File);
            const data = await upload(formData).unwrap();
            images.push(data.image_url);
          } catch (err) {
            const error = err as IErrorResponse;
            message.error(capitalizeFirstLetter(error.message));
          }
        }),
      );

      const body: ICreateProductRequest = {
        title: values.title,
        price: values.price || null,
        category_id: parseInt(
          values.category_id[values.category_id.length - 1],
        ),
        description: values.description,
        total_stock: values.stock || null,
        is_archived: !values.status,
        weight: values.weight,
        dimension: values.dimension,
        variant: {
          variant_items: variantItems,
          variant_options: variantOptions,
        },
        is_used: values.condition === 'new' ? false : true,
        images,
      };

      params.id
        ? await updateProduct({ id: params.id, ...body })
        : await createProduct(body).unwrap();
      navigate('/merchant/products');
      message.success(
        `Product ${params.id ? 'updated' : 'created'} successfully`,
      );
    } catch (err) {
      const error = err as IErrorResponse;
      message.error(capitalizeFirstLetter(error.message));
    }
  };

  const categories = data?.categories
    .filter((category) => Boolean(category))
    .map((category) => category.toString());

  const fileList: UploadFile[] | undefined = data?.images.map(
    (image, index) => {
      return {
        uid: index.toString(),
        name: `Image`,
        url: image,
        status: 'done',
      };
    },
  );

  const initialValues: Partial<IProductForm> = {
    title: data?.title,
    dimension: data?.dimension,
    weight: data?.weight,
    description: data?.description,
    stock: data?.total_stock,
    images: fileList,
    condition: data?.is_used ? 'used' : 'new',
    price: data?.price,
    category_id: categories,
  };

  if (variants && variants.variant_options.length > 0) {
    initialValues.firstSelect = variants.variant_options[0].type;
    initialValues.firstVariant = variants.variant_options[0].name;
    initialValues.variantItems = variants.variant_items.map((item, index) => {
      const fileList: UploadFile[] = [
        {
          uid: index.toString(),
          name: `${index + 1}`,
          url: item.image,
          status: 'done',
        },
      ];
      return {
        image: fileList,
        price: item.price,
        stock: item.stock,
      };
    });
  }
  if (variants?.variant_options.length == 2) {
    initialValues.secondSelect = variants.variant_options[1].type;
    initialValues.secondVariant = variants.variant_options[1].name;
  }
  const renderForm = !params.id || (data && variants);

  useEffect(() => {
    form.resetFields();
  }, [params.id]);

  if (!data && !isLoadingFetch && params.id) {
    return (
      <ItemNotFound title="Product not found" body="Something went wrong." />
    );
  }

  return (
    <div className={style.pp}>
      {renderForm && (
        <Form
          name="basic"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinishForm}
          form={form}
          className={style.pp__form}
          initialValues={initialValues}
        >
          <ProductMedia />
          <ProductInfo title={data?.title} />
          <ProductDetails />
          <ProductType
            isVariant={isVariant}
            handleSetVariant={handleSetVariant}
          />
          <ProductShipping />
          <div className={style.pp__action}>
            <Button
              loading={isLoading || isLoadingPhoto || isLoadingUpdate}
              htmlType="submit"
              type="primary"
            >
              Submit
            </Button>
            <Button htmlType="reset">Reset</Button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default ProductPage;
