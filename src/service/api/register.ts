import apiClient from './apiClient';
import type { RegistFormBody, RegistFormResponse } from './type';

export const registerUser = async (body: RegistFormBody) => {
  await apiClient.post<RegistFormResponse, any, RegistFormBody>(
    'register',
    body
  );
};
