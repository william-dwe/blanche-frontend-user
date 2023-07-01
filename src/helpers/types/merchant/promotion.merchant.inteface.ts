import { Dayjs } from 'dayjs';
import { Key } from 'react';
import { TableProductDataType } from '../../../components/organisms/Merchant/Promotion/TableProduct';

export interface IGetPromotionResponse {
  total_data: number;
  total_page: number;
  current_page: number;
  promotions: IPromotion[];
}

export interface IPromotion {
  id: number;
  promotion_type: string;
  title: string;
  max_discounted_quantity: number;
  nominal?: number;
  quota: number;
  used_quota: number;
  start_date: string;
  end_date: string;
  products: IProductPromotion[];
  discount_percentage?: number;
  product_ids: Key[];
  promotion_type_id: number;
  discount_nominal?: number;
}

export interface IProductPromotion {
  id: number;
  title: string;
  slug: string;
  total_stock: number;
  num_of_sale: number;
  max_real_price: number;
  min_real_price: number;
  thumbnail_img: string;
}

export interface ICreatePromotionRequest {
  id?: number;
  title: string;
  max_discounted_quantity: number;
  promotion_type_id: number;
  nominal: number;
  quota: number;
  start_date: Date;
  end_date: Date;
  product_ids: Key[];
}

export interface ICreatePromotionValues {
  title: string;
  max_discounted_quantity: number;
  promotion_type_id: string;
  nominal: number;
  quota: number;
  period: Dayjs[];
  product_ids: number[];
}

export interface FormReturnPromotion<T> {
  handleSubmit: (values: T) => void;
  isLoading?: boolean;
  isError?: boolean;
  error?: Error;
  values?: T;
  handleClick?: () => void;
  selectedProducts: {
    [key: string]: TableProductDataType[];
  };
  rowSelection?: {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: TableProductDataType[],
    ) => void;
  };
  handleCloseModal: () => void;
}
