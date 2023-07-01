export interface IGetMerchantProfileResponse {
  id: number;
  domain: string;
  name: string;
  address: {
    province: string;
    city: string;
  };
  join_date: string;
  image: string;
}

export interface EditMerchantProfileProps {
  name: string;
}
