import { message, Switch, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import classNames from 'classnames';
import { PaginationProps } from 'rc-pagination';
import React, { useCallback, useEffect, useState } from 'react';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { Pagination } from '../../../..';
import {
  useDeleteProductMutation,
  useGetProductListQuery,
  useUpdateProductStatusMutation,
} from '../../../../../app/features/merchant/merchantApiSlice';
import { capitalizeFirstLetter } from '../../../../../helpers/capitalizeFirstLetter';
import { toRupiah } from '../../../../../helpers/toRupiah';
import { IMerchantProductOverview } from '../../../../../helpers/types';
import { IErrorResponse } from '../../../../../helpers/types/response.interface';
import { Button, Card, Image } from '../../../../atoms';
import style from './index.module.scss';
import './override.scss';

interface ProductTableProps {
  search: string;
}

interface Row {
  key: string;
  price: React.ReactNode;
  stock: React.ReactNode;
  statistic: React.ReactNode;
  product: React.ReactNode;
  status: React.ReactNode;
  action: React.ReactNode;
}

const limit = 10;

const columns: ColumnsType<Row> = [
  {
    title: 'Product Info',
    dataIndex: 'product',
    key: 'product',
  },
  {
    title: 'Statistic',
    dataIndex: 'statistic',
    key: 'statistic',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
    key: 'stock',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  },
];

const ProductTable: React.FC<ProductTableProps> = ({ search }) => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data, isLoading: isLoadingGetProducts } = useGetProductListQuery({
    page,
    limit,
    q: search,
  });
  const [updateStatus, { isLoading: isLoadingUpdate }] =
    useUpdateProductStatusMutation();
  const [deleteProduct, { isLoading: isLoadingDelete }] =
    useDeleteProductMutation();
  const [dataSource, setDataSource] = useState<Row[]>();
  const [selectedProducts, setSelectedProducts] = useState<{
    [key: string]: string[];
  }>();

  const isLoading = isLoadingGetProducts || isLoadingUpdate || isLoadingDelete;

  useEffect(() => {
    if (!data) return;
    const res: Row[] = data.products.map((item) => {
      return {
        key: item.id.toString(),
        stock: <p key={item.id}>{item.total_stock}</p>,
        price:
          item.max_real_price === item.min_real_price ? (
            <p key={item.id}>{toRupiah(item.max_real_price)}</p>
          ) : (
            <p key={item.id}>
              {toRupiah(item.min_real_price)} - {toRupiah(item.max_real_price)}
            </p>
          ),
        status: (
          <Switch
            checked={!item.is_archived}
            onClick={(checked: boolean) => {
              onUpdateStatus(item, checked);
            }}
          />
        ),
        product: (
          <div className={style.pt__row__product} key={item.id}>
            <Image
              className={style.pt__row__product__img}
              src={item.thumbnail_img}
              alt={item.title}
            />
            <Link
              to={`/${item.slug}`}
              className={style.pt__row__product__title}
            >
              {item.title}
            </Link>
          </div>
        ),
        statistic: (
          <div className={style.pt__row__statistic} key={item.id}>
            <div className={style.pt__row__statistic__item}>
              <MdOutlineShoppingBag size={16} />
              <span className={style.pt__row__statistic__item__value}>
                {item.num_of_sale}
              </span>
            </div>
          </div>
        ),
        action: (
          <div className={style.pt__row__action} key={item.id}>
            <Button
              type="primary"
              onClick={() => {
                onEdit(item);
              }}
              ghost
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                onDelete(item);
              }}
              danger
            >
              Delete
            </Button>
          </div>
        ),
      };
    });
    setDataSource(res);
  }, [data]);

  const onChange: PaginationProps['onChange'] = (page) => {
    setPage(page);
  };

  const onDelete = async (item: IMerchantProductOverview) => {
    try {
      await deleteProduct(item.id.toString()).unwrap();
      message.success(`Product ${item.title} is deleted`);
    } catch (err) {
      const error = err as IErrorResponse;
      message.error(capitalizeFirstLetter(error.message));
    }
  };

  const onEdit = (item: IMerchantProductOverview) => {
    navigate(`/merchant/products/edit/${item.id}`);
  };

  const onUpdateStatus = async (
    item: IMerchantProductOverview,
    checked: boolean,
  ) => {
    try {
      await updateStatus({
        id: item.id.toString(),
        is_archived: !checked,
      }).unwrap();
      message.success(
        `Product ${item.title} is ${
          item.is_archived ? 'unarchived' : 'archived'
        }`,
      );
    } catch (err) {
      const error = err as IErrorResponse;
      message.error(capitalizeFirstLetter(error.message));
    }
  };

  const onBulkUpdateStatus = async (is_archived: boolean) => {
    try {
      if (!selectedProducts) return;
      const keys = Object.keys(selectedProducts);
      const res = keys.map((key) => {
        return selectedProducts[key].join(',');
      });
      const ids = res.join(',');
      await updateStatus({
        id: ids,
        is_archived,
      }).unwrap();
      message.success('Products are archived');
      setSelectedProducts({});
    } catch (err) {
      const error = err as IErrorResponse;
      message.error(capitalizeFirstLetter(error.message));
    }
  };

  const onBulkDelete = async () => {
    try {
      if (!selectedProducts) return;
      const keys = Object.keys(selectedProducts);
      const res = keys.map((key) => {
        return selectedProducts[key].join(',');
      });
      const ids = res.join(',');
      await deleteProduct(ids).unwrap();
      message.success('Products are deleted');
      setSelectedProducts({});
    } catch (err) {
      const error = err as IErrorResponse;
      message.error(capitalizeFirstLetter(error.message));
    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedProducts((prevValue) => ({
        ...prevValue,
        [page]: selectedRowKeys,
      }));
    },
  };

  const countSelectedLength = useCallback(() => {
    if (!selectedProducts) return 0;
    const keys = Object.keys(selectedProducts);
    let total = 0;
    keys.forEach((key) => {
      total += selectedProducts[key].length;
    });
    return total;
  }, [selectedProducts]);

  return (
    <>
      <Card className={classNames(style.pt, 'pt')}>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          scroll={{ x: 800 }}
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
            selectedRowKeys: selectedProducts?.[page]?.filter((item) =>
              selectedProducts?.[page].includes(item),
            ),
          }}
          loading={isLoading}
        />
        <div className={style.pt__pagination}>
          <Pagination
            total={data?.total_data}
            pageSize={limit}
            onChange={onChange}
            current={page}
            showSizeChanger={false}
          />
        </div>
      </Card>
      {countSelectedLength() ? (
        <div className={style.pt__bulk}>
          <p className={style.pt__bulk__count}>
            {countSelectedLength()} / {data?.total_data} products selected
          </p>
          <Button
            type="primary"
            className={style.pt__bulk__active}
            onClick={() => {
              onBulkUpdateStatus(false);
            }}
          >
            Activate
          </Button>
          <Button
            type="primary"
            ghost
            className={style.pt__bulk__active}
            onClick={() => {
              onBulkUpdateStatus(true);
            }}
          >
            Archive
          </Button>
          <Button
            type="primary"
            danger
            ghost
            className={style.pt__bulk__delete}
            onClick={onBulkDelete}
          >
            Delete
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default ProductTable;
