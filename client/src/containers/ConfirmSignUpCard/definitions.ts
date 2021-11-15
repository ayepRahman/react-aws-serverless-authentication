export interface ConfirmSignUpFormProps {}

export enum ConfirmSignUpFieldNames {
  CODE = "code",
}

export type ConfirmSignUpFormData = {
  [ConfirmSignUpFieldNames.CODE]: string;
};
