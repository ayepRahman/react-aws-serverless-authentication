export interface SignUpProps {}

export enum SignUpFieldNames {
  USERNAME = "username",
  EMAIL = "email",
  PASSWORD = "password",
  CONFIRM_PASSWORD = "confirmPassword",
}

export type SignUpFormData = {
  [SignUpFieldNames.USERNAME]: string;
  [SignUpFieldNames.EMAIL]: string;
  [SignUpFieldNames.PASSWORD]: string;
  [SignUpFieldNames.CONFIRM_PASSWORD]: string;
};
