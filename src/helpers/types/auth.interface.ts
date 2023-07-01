import { IErrorResponse } from './response.interface';

export interface LoginProps {
  email: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ErrorLogin {
  email: string;
  password: string;
}

export interface FormReturnAuth<T> {
  handleSubmit: (values: T) => void;
  isLoading?: boolean;
  isError?: boolean;
  error?: Error;
  values?: T;
  handleClick?: () => void;
}

export interface RegisterFirstStepProps {
  email: string;
}

export interface RegisterSecondStepProps {
  username: string;
  fullname: string;
  password: string;
  confirmPassword: string;
}

export interface IRegisterRequest {
  email: string;
  username: string;
  fullname: string;
  password: string;
}

export interface IRegisterResponse {
  access_token: string;
}

export interface ErrorRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ICheckEmailResponse {
  is_available: boolean;
  email: string;
}

export interface ICheckUsernameResponse {
  is_available: boolean;
  username: string;
}

export interface ICheckUsernameRequest {
  username: string;
}

export interface RegisterMerchantFirstStepProps {
  store: string;
  domain: string;
}

export interface RegisterMerchantSecondStepProps {
  address_id: number;
}

export interface IRefreshResponse {
  access_token: string;
}

export interface IVerifyCodeRequest {
  verification_code: string;
}

export interface IVerifyCodeResponse {
  access_token: string;
  username: string;
}

export interface IResetPasswordResponse {
  is_email_sent: boolean;
  email: string;
  retry_in: number;
}

export interface ISetNewPasswordRequest {
  password: string;
}

export interface FormReturnPassword {
  handleSubmit: (values: ISetNewPasswordRequest) => void;
  isLoading?: boolean;
  isError?: boolean;
  error?: IErrorResponse;
  values?: ISetNewPasswordRequest;
}

export interface IForgetPasswordResponse {
  is_email_sent: boolean;
  retry_in: number;
}

export interface IForgetPasswordRequest {
  email: string;
}

export interface IVerifyForgetPasswordRequest {
  verification_code: string;
}

export interface IResetForgetPasswordRequest {
  password: string;
}

export interface ILoginGoogleResponse {
  url: string;
}
