export interface IGetWalletDetailsResponse {
  id: number;
  balance: number;
}

export interface ICreatePinRequest {
  pin: string;
}

export interface ITopupWalletRequest {
  amount: number;
  slp_card_number: string;
}

export interface ITopupWalletResponse {
  amount: number;
  payment_id: number;
  slp_card_number: string;
  slp_redirect_url: string;
  wallet_id: number;
}

export interface IValidatePinRequest {
  pin: string;
}

export interface IValidateResponse {
  code: string;
  message: string;
}

export interface IMakePaymentWithWalletReq {
  amount: number;
  payment_id: string;
}

export interface IMakePaymentWithWalletRes {
  amount: number;
  payment_id: string;
  status: string;
}
export interface ITransactionOverview {
  amount: number;
  issued_at: Date;
  payment_id: number;
  title: string;
  notes: string;
  wallet_transaction_type: {
    code: string;
    name: string;
  };
}

export interface IGetWalletHistoryResponse {
  current_page: number;
  total_page: number;
  total_data: number;
  transactions: ITransactionOverview[];
}

export interface IConfirmChangePinRequest {
  password: string;
}

export interface ISetNewPinRequest {
  new_pin: string;
}

export interface IGetWalletHistoryRequest {
  page: number;
  limit: number;
  start_date?: string;
  end_date?: string;
}
