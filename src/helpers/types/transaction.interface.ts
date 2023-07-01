export interface IWaitingPayment {
  payment_id: string;
  order_code: string;
  amount: number;
  redirect_url: string;
  created_at: string;
  pay_before: Date;
  payment_method: string;
  payment_related_account: string;
}

export type IGetWaitingForPaymentResponse = IWaitingPayment[];

export interface ITransactionWaiting {
  merchant: {
    domain: string;
    name: string;
  };
  products: {
    product_id: string;
    name: string;
    image: string;
    notes: string;
    real_price: number;
    discount_price: number;
    product_slug: string;
    product_variant_id: string;
    variant_name: string;
    quantity: number;
  }[];
  payment_details: {
    subtotal: number;
    delivery_fee: number;
    marketplace_voucher_nominal: number;
    merchant_voucher_nominal: number;
    total: number;
  };
}

export interface IGetWaitingForPaymentDetailsReponse {
  payment_id: string;
  order_code: string;
  amount: number;
  redirect_url: string;
  transactions: ITransactionWaiting[];
  pay_before: Date;
  created_at: Date;
  payment_method: string;
}
