import {
  ICheckEmailResponse,
  ICheckUsernameResponse,
  ICheckUsernameRequest,
  ILoginRequest,
  ILoginResponse,
  RegisterFirstStepProps,
  IRegisterResponse,
  IRegisterRequest,
  IRefreshResponse,
  IVerifyCodeRequest,
  IVerifyCodeResponse,
  IResetPasswordResponse,
  ISetNewPasswordRequest,
  IForgetPasswordResponse,
  IForgetPasswordRequest,
  IVerifyForgetPasswordRequest,
  IResetForgetPasswordRequest,
  ILoginGoogleResponse,
} from '../../../helpers/types';
import { apiSlice } from '../../api/apiSlice';

const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<ILoginResponse, ILoginRequest>({
      query: (body) => ({ url: '/login', method: 'POST', body }),
      transformResponse: (response: { data: ILoginResponse }) => response.data,
      transformErrorResponse: (response) => response.data,
    }),
    checkEmail: build.mutation<ICheckEmailResponse, RegisterFirstStepProps>({
      query: (body) => ({ url: '/register/check-email', method: 'POST', body }),
      transformResponse: (response: { data: ICheckEmailResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
    checkUsername: build.mutation<
      ICheckUsernameResponse,
      ICheckUsernameRequest
    >({
      query: (body) => ({
        url: '/register/check-username',
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: ICheckUsernameResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
    register: build.mutation<IRegisterResponse, IRegisterRequest>({
      query: (body) => ({
        url: '/register',
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: IRegisterResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
    logout: build.mutation<void, void>({
      query: () => ({ url: '/logout', method: 'POST' }),
      transformResponse: (response: { data: void }) => response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['User'],
    }),
    refresh: build.query<IRefreshResponse, void>({
      query: () => ({ url: '/refresh', method: 'GET' }),
      transformResponse: (response: { data: IRefreshResponse }) => {
        return response.data;
      },
      transformErrorResponse: (response) => response.data,
    }),
    requestResetPassword: build.mutation<IResetPasswordResponse, void>({
      query: () => ({
        url: '/users/password/change-password/send-code',
        method: 'POST',
      }),
      transformResponse: (response: { data: IResetPasswordResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ['User'],
    }),
    verifyResetPassword: build.mutation<
      IVerifyCodeResponse,
      IVerifyCodeRequest
    >({
      query: (body) => ({
        url: '/users/password/change-password/verify-code',
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: IVerifyCodeResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
    setNewPassword: build.mutation<null, ISetNewPasswordRequest>({
      query: (body) => ({
        url: '/users/password/reset',
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: null }) => response.data,
      transformErrorResponse: (response) => response.data,
    }),
    forgetPasswordSendCode: build.mutation<
      IForgetPasswordResponse,
      IForgetPasswordRequest
    >({
      query: (body) => ({
        url: '/users/password/forget-password/send-code',
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: IForgetPasswordResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
    forgetPasswordVerifyCode: build.mutation<
      null,
      IVerifyForgetPasswordRequest
    >({
      query: (body) => ({
        url: '/users/password/forget-password/verify-code',
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: null }) => response.data,
      transformErrorResponse: (response) => response.data,
    }),
    resetForgetPassword: build.mutation<null, IResetForgetPasswordRequest>({
      query: (body) => ({
        url: '/users/password/reset',
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: null }) => response.data,
      transformErrorResponse: (response) => response.data,
    }),
    requestLoginGoogle: build.mutation<ILoginGoogleResponse, void>({
      query: () => ({
        url: '/google/request-login',
        method: 'GET',
      }),
      transformResponse: (response: { data: ILoginGoogleResponse }) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
  }),
});

export const {
  useLoginMutation,
  useCheckEmailMutation,
  useCheckUsernameMutation,
  useRegisterMutation,
  useLogoutMutation,
  useLazyRefreshQuery,
  useRefreshQuery,
  useRequestResetPasswordMutation,
  useVerifyResetPasswordMutation,
  useSetNewPasswordMutation,
  useForgetPasswordSendCodeMutation,
  useForgetPasswordVerifyCodeMutation,
  useResetForgetPasswordMutation,
  useRequestLoginGoogleMutation,
} = authApi;
