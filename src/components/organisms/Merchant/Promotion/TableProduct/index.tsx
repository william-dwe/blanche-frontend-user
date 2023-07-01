import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import CardProduct from './CardProduct';
import CardPrice from './CardPrice';
import { Pagination } from '../../../..';
import style from './index.module.scss';
import { IGetMerchantProductListResponse } from '../../../../../helpers/types';

export interface TableProductDataType {
  key: React.Key;
  product: React.ReactNode;
  sold: number;
  price: React.ReactNode;
  stock: number;
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

interface TableProductProps {
  rowSelection:
    | {
        onChange: (
          selectedRowKeys: React.Key[],
          selectedRows: TableProductDataType[],
        ) => void;
      }
    | undefined;

  data: IGetMerchantProductListResponse | undefined;
  onChange: ((page: number, pageSize: number) => void) | undefined;
  isLoading: boolean;
  page: number;
  selectedProducts: {
    [key: string]: TableProductDataType[];
  };
  productKeys: React.Key[];
}

const limit = 5;

const TableProduct: React.FC<TableProductProps> = ({
  rowSelection,
  data,
  onChange,
  isLoading,
  page,
  selectedProducts,
}) => {
  const dataSource: TableProductDataType[] | undefined = data?.products.map(
    (item) => ({
      key: item.id,
      product: <CardProduct product={item}  />,
      sold: item.num_of_sale || 0,
      price: <CardPrice product={item} />,
      stock: item.total_stock,
    }),
  );
  return (
    <>
      <Table
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: selectedProducts[page.toString()]?.map(
            (item: any) => item.key,
          ),
          ...rowSelection,
        }}
        columns={columns}
        loading={isLoading}
        dataSource={dataSource}
        pagination={false}
      />
      {data && data.total_data > limit && Boolean(data.products.length) && (
        <div className={style.table__product__pagination}>
          <Pagination
            total={data?.total_data}
            pageSize={limit}
            onChange={onChange}
            current={page}
            showSizeChanger={false}
          />
        </div>
      )}
    </>
  );
};

export default TableProduct;
