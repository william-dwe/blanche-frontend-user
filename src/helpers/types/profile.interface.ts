import { ISealabsPayAccounts } from './entity.interface';

export interface EditDetailsProps {
  fullname: string;
  birth_date: string;
  gender: string;
  phone: string;
}

export interface EditAccountProps {
  email: string;
}

export interface IEditDetailsRequest {
  name?: string;
  birthdate?: string;
  gender?: string;
  phone_number?: string;
}

export interface IEditAccountRequest {
  email?: string;
}

export interface ErrorEditDetails {
  name: string;
  birthdate: string;
  gender: string;
  phone_number: string;
}

export interface IGetProfileResponse {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  birth_date: Date;
  gender: string;
  profile_picture: string;
  username: string;
  role: string;
}

export type IGetSealabsPayAccountsResponse = ISealabsPayAccounts[];

export interface IAddSealabsPayAccountRequest {
  card_number: string;
  name_on_card: string;
  active_date: Date;
}

export type IAddSealabsPayAccountResponse = {
  id: number;
} & IAddSealabsPayAccountRequest;
