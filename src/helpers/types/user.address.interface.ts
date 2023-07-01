export interface IAddUserAddressRequest {
  phone: string;
  name: string;
  province_id: number;
  city_id: number;
  district_id: number;
  subdistrict_id: number;
  label: string;
}

export interface IUserAddress {
  id: number;
  phone: string;
  name: string;
  is_merchant_address: boolean;
  province_name: string;
  province_id: number;
  city_name: string;
  city_id: number;
  district_name: string;
  district_id: number;
  subdistrict_name: string;
  subdistrict_id: number;
  zip_code: string;
  label: string;
  is_default: boolean;
  details: string;
}

export type IGetUserAddressResponse = IUserAddress[];
export interface ICreateUserAddressRequest {
  phone: string | undefined;
  name: string | undefined;
  province_id: number;
  city_id: number;
  district_id: number;
  subdistrict_id: number;
  label: string | undefined;
  details: string | undefined;
}

export interface IUpdateUserAddressRequest {
  id: number;
  phone: string | undefined;
  name: string | undefined;
  province_id: number;
  city_id: number;
  district_id: number;
  subdistrict_id: number;
  label: string | undefined;
  details: string | undefined;
}

export interface AddAddressProps {
  province?: string;
  city?: string;
  district?: string;
  subDistrict?: string;
  address?: string;
  label?: string;
  name?: string;
  details?: string;
  phone?: string;
}
