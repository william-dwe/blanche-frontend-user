import { message, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';
import {
  useDeletePromotionMutation,
  useGetPromotionsMerchantQuery,
} from '../../../../../app/features/merchant/promotionApiSlice';
import { useAppSelector } from '../../../../../app/hooks';
import { Button } from '../../../../atoms';
import CardQuota from './CardQuota';
import CardTimePeriod from './CardTimePerod';
import CardPromotion from './CardPromotion';
import { ModalConfirm, Pagination } from '../../../..';
import style from './index.module.scss';
import {
  IProductPromotion,
  IPromotion,
} from '../../../../../helpers/types/merchant/promotion.merchant.inteface';
import { useNavigate } from 'react-router-dom';
import { textTruncate } from '../../../../../helpers/textTruncate';

interface DataType {
  key: number;
  name: React.ReactNode;
  maxQty: number;
  quota: React.ReactNode;
  period: React.ReactNode;
  products: React.ReactNode;
}

const limit = 10;

const TablePromotion: React.FC = () => {
  const params = useAppSelector((state) => state.params);
  const { data: promotions, isLoading: isLoadingGetPromotions } =
    useGetPromotionsMerchantQuery({
      ...params.search,
      limit,
    });

  const navigate = useNavigate();

  const dataSource: DataType[] | undefined = promotions?.promotions?.map(
    (item) => ({
      key: item.id,
      name: <CardPromotion promotion={item} />,
      maxQty: item.max_discounted_quantity,
      quota: <CardQuota promotion={item} />,
      period: <CardTimePeriod promotion={item} />,
      products: (
        <ul className={style.list}>
          {item.products.map((product: IProductPromotion) => (
            <li key={product.title}>{textTruncate(product.title, 30)}</li>
          ))}
        </ul>
      ),
    }),
  );
  const [promotionToDelete, setPromotionToDelete] =
    React.useState<IPromotion | null>();
  const [deletePromotion, { isLoading: isLoadingDeletePromotion }] =
    useDeletePromotionMutation();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOpenModal = (promotion: IPromotion) => {
    setIsModalOpen(true);
    setPromotionToDelete(promotion);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeletePromotionByKey = async (id: number) => {
    const promotion = promotions?.promotions?.find(
      (item: IPromotion) => item.id === id,
    );
    if (promotion) {
      handleOpenModal(promotion);
    }
  };

  const handleNavigateEdit = (id: number) => {
    navigate(`/merchant/promotions/edit/${id}`);
  };
  const handleNavigateDuplicate = (id: number) => {
    navigate(`/merchant/promotions/copy/${id}`);
  };

  const handleDeletePromotion = async () => {
    if (!promotionToDelete) return;

    try {
      await deletePromotion(promotionToDelete.id).unwrap();
      handleCloseModal();
      message.success('Delete Promotion success');
    } catch (e) {
      const err = e as Error;
      message.error(err.message);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Voucher Info',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <div>{text}</div>,
      width: 350,
    },
    {
      title: 'Products',
      dataIndex: 'products',
      key: 'products',
      render: (text) => <div>{text}</div>,
      width: 350,
    },
    {
      title: 'Max Quantity',
      dataIndex: 'maxQty',
      key: 'maxQty',
      width: 100,
    },
    {
      title: 'Quota Usage',
      dataIndex: 'quota',
      key: 'quota',
      width: 150,
    },
    {
      title: 'Time Period',
      dataIndex: 'period',
      key: 'period',
      width: 250,
    },

    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      render: (
        _,
        record: {
          key: React.Key;
        },
      ) => (
        <div>
          <Space size="middle" direction="vertical">
            <Button
              danger
              block
              onClick={() => handleDeletePromotionByKey(Number(record.key))}
            >
              Delete
            </Button>
            <Button
              type="primary"
              block
              onClick={() => handleNavigateDuplicate(Number(record.key))}
            >
              Duplicate
            </Button>
            <Button
              type="primary"
              ghost
              block
              onClick={() => handleNavigateEdit(Number(record.key))}
            >
              Edit
            </Button>
          </Space>
        </div>
      ),
    },
  ];

  const isLoading: boolean = isLoadingGetPromotions || isLoadingDeletePromotion;

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{ x: 800 }}
        className={style.table__promotions}
        loading={isLoading}
      />
      {promotions &&
        promotions.total_data > limit &&
        Boolean(promotions.promotions.length) && (
          <div className={style.table__promotions__pagination}>
            <Pagination
              total={promotions.total_data}
              pageSize={limit}
              showSizeChanger={false}
            />
          </div>
        )}
      <ModalConfirm
        isModalOpen={isModalOpen}
        handleCancel={handleCloseModal}
        closable={true}
        cancelButton={true}
        handleOk={() => handleDeletePromotion()}
        title="Delete Voucher"
        confirmButtonProps={{
          danger: true,
          loading: isLoadingDeletePromotion,
        }}
        info="Are you sure want to delete this Promotion?"
      />
    </>
  );
};

export default TablePromotion;
