export interface IGetDashboardRequest {
  start_date?: string;
  end_date?: string;
}

export interface IDashboardResponsiveness {
  type: string;
  date: string;
  value: number;
}

export type IGetDashboardResponsivenessResponse = IDashboardResponsiveness[];

export interface IDashboardSales {
  date: Date;
  rev: number;
  trx: number;
}

export type IGetDashboardSalesResponse = IDashboardSales[];

export interface IDashboardCustomerSatisfactions {
  date: Date;
  review: number;
  count: number;
}

export type IGetDashboardCustomerSatisfactionsResponse =
  IDashboardCustomerSatisfactions[];
