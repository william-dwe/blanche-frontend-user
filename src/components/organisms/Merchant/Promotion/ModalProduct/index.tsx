import { debounce } from 'lodash';
import React from 'react';
import { IGetMerchantProductListResponse } from '../../../../../helpers/types';
import { Input } from '../../../../atoms';
import { Modal, ModalHeader } from '../../../../molecules';
import TableProduct, { TableProductDataType } from '../TableProduct';
import style from './index.module.scss';

interface ModalProductProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
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
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ModalProduct: React.FC<ModalProductProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  rowSelection,
  data,
  onChange,
  isLoading,
  selectedProducts,
  page,
  productKeys,
  handleChange,
}) => {
  return (
    <Modal
      open={isModalOpen}
      centered
      className={style.modal__product}
      width={700}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <ModalHeader
        className={style.modal__product__header}
        title="Choose Products"
      />
      <Input
        placeholder="Search product name"
        onChange={debounce(handleChange, 500)}
        className={style.plp__header__input}
        size="middle"
      />
      <TableProduct
        rowSelection={rowSelection}
        data={data}
        isLoading={isLoading}
        onChange={onChange}
        page={page}
        selectedProducts={selectedProducts}
        productKeys={productKeys}
      />
    </Modal>
  );
};

export default ModalProduct;
