import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { IGetMerchantProductListResponse } from '../../../../../helpers/types';
import { Button, Card } from '../../../../atoms';
import ModalProduct from '../ModalProduct';
import { TableProductDataType } from '../TableProduct';
import style from './index.module.scss';

interface CardPromotionProductProps {
  products: TableProductDataType[] | undefined;
  rowSelection:
    | {
        onChange: (
          selectedRowKeys: React.Key[],
          selectedRows: TableProductDataType[],
        ) => void;
      }
    | undefined;
  handleCloseModal: () => void;
  data: IGetMerchantProductListResponse | undefined;
  onChange: ((page: number, pageSize: number) => void) | undefined;
  isLoading: boolean;
  page: number;
  selectedProducts: {
    [key: string]: TableProductDataType[];
  };
  productKeys: React.Key[];
  isEdit: boolean | undefined;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const columns: ColumnsType<TableProductDataType> = [
  {
    title: 'Product',
    dataIndex: 'product',
  },
  {
    title: 'Sold',
    dataIndex: 'sold',
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
  },
];

const CardPromotionProduct: React.FC<CardPromotionProductProps> = ({
  products,
  rowSelection,
  handleCloseModal,
  data,
  onChange,
  isLoading,
  page,
  selectedProducts,
  productKeys,
  handleChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    handleCloseModal();
    setIsModalOpen(false);
  };

  return (
    <Card className={style.form__promotion__item}>
      <div className={style.form__promotion__item__header}>
        <h3 className={style.form__promotion__item__header__title}>
          Promotion Information
        </h3>

        <Button type="primary" size="large" onClick={showModal}>
          Add Product
        </Button>
      </div>
      <div className={style.form}>
        <Table dataSource={products} rowKey="id" columns={columns} />
      </div>
      <ModalProduct
        data={data}
        isLoading={isLoading}
        onChange={onChange}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        rowSelection={rowSelection}
        page={page}
        selectedProducts={selectedProducts}
        productKeys={productKeys}
        handleChange={handleChange}
      />
    </Card>
  );
};

export default CardPromotionProduct;
