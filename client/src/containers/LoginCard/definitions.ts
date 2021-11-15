export interface LoginProps {}

export enum LoginFieldNames {
  USERNAME = "username",
  EMAIL = "email",
  PASSWORD = "password",
  CONFIRM_PASSWORD = "confirmPassword",
}

export type LoginFormData = {
  [LoginFieldNames.USERNAME]: string;
  // [LoginFieldNames.EMAIL]: string;
  [LoginFieldNames.PASSWORD]: string;
};
