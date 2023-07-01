import { message, PaginationProps, RadioChangeEvent } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import React, { Key, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, ItemNotFound } from '../../../..';
import { useGetProductListQuery } from '../../../../../app/features/merchant/merchantApiSlice';
import { useGetPromotionByIdQuery } from '../../../../../app/features/merchant/promotionApiSlice';
import { IProductPromotion } from '../../../../../helpers/types/merchant/promotion.merchant.inteface';
import { TableProductDataType } from '../TableProduct';
import CardPrice from '../TableProduct/CardPrice';
import CardProduct from '../TableProduct/CardProduct';
import CardPromotionInfo from './CardPromotionInfo';
import CardPromotionProduct from './CardPromotionProduct';
import CardPromotionSettings from './CardPromotionSettings';
import CardPromotionType from './CardPromotionType';
import style from './index.module.scss';
import useForms from './useForm';

interface AddPromotionProps {
  isEdit?: boolean;
  isDuplicate?: boolean;
}
const limit = 5;

const AddPromotion: React.FC<AddPromotionProps> = ({ isEdit, isDuplicate }) => {
  const [products, setProducts] = useState<TableProductDataType[]>([]);
  const [productKeys, setProductKeys] = useState<Key[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [discountType, setDiscountType] = useState<
    'Fixed Amount' | 'Percentage'
  >('Fixed Amount');

  const [form] = useForm();

  const handleChange = (e: RadioChangeEvent) => {
    form.setFieldsValue({
      nominal: '',
    });
    setDiscountType(e.target.value);
  };

  const handleChangePage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const { data, isLoading } = useGetProductListQuery({
    page,
    limit,
    q: search,
  });

  const navigate = useNavigate();

  const onChange: PaginationProps['onChange'] = (page) => {
    setPage(page);
  };

  const handleSetProducts = (selectedProducts: TableProductDataType[]) => {
    setProducts(
      selectedProducts.filter(
        (product, index, self) =>
          index === self.findIndex((t) => t.key === product.key),
      ),
    );
  };

  const handleSetProductKeys = (selectedProductKeys: Key[]) => {
    setProductKeys(selectedProductKeys);
  };

  const { id } = useParams();

  const { data: promotion, isLoading: isLoadingPromotion } =
    useGetPromotionByIdQuery(Number(id), {
      skip: !id,
    });

  const { handleCloseModal, rowSelection, handleSubmit, selectedProducts } =
    useForms(
      isEdit,
      handleSetProducts,
      page,
      productKeys,
      products,
      handleSetProductKeys,
      discountType,
      Number(id),
    );

  useEffect(() => {
    if (!promotion) return;
    if (dayjs(promotion.end_date).isBefore(dayjs())) {
      message.error('Promotion has expired');
      navigate('/merchant/promotions');
      return;
    }

    setDiscountType(
      promotion.promotion_type_id === 1 ? 'Fixed Amount' : 'Percentage',
    );

    form.setFieldsValue({
      title: promotion.title,
      period: [dayjs(promotion.start_date), dayjs(promotion.end_date)],
      nominal: promotion.nominal,
      max_discounted_quantity: promotion.max_discounted_quantity,
      promotion_type_id: promotion.promotion_type_id,
      quota: promotion.quota,
    });

    if (promotion.products.length === 0) {
      return;
    }

    const result: TableProductDataType[] = [];
    promotion.products.forEach((product: IProductPromotion) => {
      result.push({
        key: product.id,
        product: <CardProduct product={product} />,
        price: <CardPrice product={product} />,
        stock: product.total_stock,
        sold: product.num_of_sale,
      });
    });

    setProducts([...result]);

    const newProductKeys = [...promotion.product_ids];
    setProductKeys(newProductKeys);
  }, [promotion]);
  if (!promotion && id && !isLoadingPromotion) {
    return (
      <ItemNotFound
        title="Promotion is Not Found"
        body="Please check again your promotion name"
      />
    );
  }

  return (
    <Form className={style.form__promotion} onFinish={handleSubmit} form={form}>
      <CardPromotionType />
      <CardPromotionInfo />
      <CardPromotionSettings
        discountType={discountType}
        handleChange={handleChange}
      />
      <CardPromotionProduct
        selectedProducts={selectedProducts}
        data={data}
        isLoading={isLoading}
        onChange={onChange}
        handleCloseModal={handleCloseModal}
        products={products}
        rowSelection={rowSelection}
        page={page}
        productKeys={productKeys}
        isEdit={isEdit || isDuplicate}
        handleChange={handleChangePage}
      />

      <div className={style.form__promotion__actions}>
        <Button type="primary" htmlType="submit" size="large">
          {isEdit ? 'Update ' : 'Create '}
          Promotion
        </Button>
      </div>
    </Form>
  );
};

export default AddPromotion;
