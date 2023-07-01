export interface IRequestRefund {
  reason: string;
  image: File;
}

export interface IGetRefundResponse {
  total_data: number;
  total_page: number;
  current_page: number;
  refund_requests: IRefundRequest[];
}

export interface IRefundRequest {
  id: number;
  transaction_id: number;
  invoice_code: string;
  username: string;
  merchant_domain: string;
  reason: string;
  image_url: string;
  created_at: string;
  refund_request_statuses: IRefundStatus[];
}

export interface IRefundStatus {
  canceled_by_buyer_at?: string;
  accepted_by_buyer_at: any;
  rejected_by_buyer_at?: string;
  accepted_by_seller_at?: string;
  rejected_by_seller_at?: string;
  accepted_by_admin_at?: string;
  rejected_by_admin_at?: string;
}

export interface IRefundMessageDetails {
  buyer_username: string;
  invoice_code: string;
  merchant_domain: string;
  closed_at: Date | null;
}

export interface IMessage {
  id: number;
  role: {
    id: number;
    name: string;
  };
  sender_name: string;
  message: string;
  image: string | null;
  created_at: Date;
}

export interface IRefundMessageResponse {
  messages: IMessage[];
  details: IRefundMessageDetails;
  refund_request_status: IRefundStatus[];
}

export interface IPostRefundMessageRequest {
  id: number;
  message: string;
}

export interface IActionRefundResponse {
  id: number;
  invoice_code: string;
}

export interface IRefundMessageDetails {
  buyer_username: string;
  invoice_code: string;
  merchant_domain: string;
  closed_at: Date | null;
}
