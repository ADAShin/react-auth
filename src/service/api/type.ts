export type LoginData = {
  id: number;
  secret?: string;
  otpauth_url?: string;
};

export type TwoFactorAuthBody = Omit<LoginData, 'otpauth_url'> & {
  code: string;
};

export type LoginFormBody = {
  email: string;
  password: string;
};

export type UserInfo = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

export type RegistFormResponse = {
  message: string;
};

export type RegistFormBody = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirm: string;
};
