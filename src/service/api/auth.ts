import { AxiosResponse } from 'axios';
import apiClient from './apiClient';
import type {
  LoginData,
  LoginFormBody,
  ResetPasswordBody,
  TwoFactorAuthBody,
  UserInfo,
} from './type';

export const login = async (body: LoginFormBody) => {
  const { data } = await apiClient.post<
    LoginData,
    AxiosResponse<LoginData, any>,
    LoginFormBody
  >('login', body);
  return data;
};

export const twoFactorAuth = async (body: TwoFactorAuthBody) => {
  const { data } = await apiClient.post<{ token: string }>('two-factor', body);
  return data.token;
};

export const fetchAuthUser = async () => {
  const res = await apiClient.get<UserInfo>('user');
  return res.data;
};

export const logout = async () => {
  await apiClient.post<{ message: string }>('logout');
};

export const resetPassword = async (body: ResetPasswordBody) => {
  await apiClient.post<any, any, ResetPasswordBody>('reset', body);
};
