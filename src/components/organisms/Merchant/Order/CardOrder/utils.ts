import { IMerchantTransaction } from '../../../../../helpers/types/merchant/merchant-order.interface';

export enum OrderStatus {
  TransactionStatusWaited = 1,
  TransactionStatusProcessed = 2,
  TransactionStatusOnDelivery = 3,
  TransactionStatusDelivered = 4,
  TransactionStatusOnCompleted = 5,
  TransactionStatusCanceled = 6,
  TransactionStatusRequestRefund = 7,
  TransactionStatusOnRefund = 8,
}

export interface CardOrderProps {
  transaction: IMerchantTransaction;
}

export enum UpdateStatus {
  TransactionStatusWaited = 1,
  TransactionStatusProcessed = 2,
  TransactionStatusOnCancel = 3,
  TransactionStatusOnDelivery = 4,
  TransactionStatusDelivered = 5,
  TransactionStatusOnRequestRefund = 6,
  TransactionStatusOnCompleted = 7,
  TransactionStatusOnRefund = 8,
}

export const mapStatusToColor: {
  [key: number]: string;
} = {
  [OrderStatus.TransactionStatusWaited]: 'orange',
  [OrderStatus.TransactionStatusProcessed]: 'blue',
  [OrderStatus.TransactionStatusCanceled]: 'red',
  [OrderStatus.TransactionStatusOnDelivery]: 'blue',
  [OrderStatus.TransactionStatusDelivered]: 'green',
  [OrderStatus.TransactionStatusRequestRefund]: 'yellow',
  [OrderStatus.TransactionStatusOnCompleted]: 'green',
  [OrderStatus.TransactionStatusOnRefund]: 'blue',
};
