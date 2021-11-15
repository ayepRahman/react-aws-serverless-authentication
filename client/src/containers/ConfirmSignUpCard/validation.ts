import * as yup from "yup";
import yupPassword from "yup-password";
import { ConfirmSignUpFieldNames } from "./definitions";
yupPassword(yup);

export const confirmSignUpValidationSchema = yup.object().shape({
  [ConfirmSignUpFieldNames.CODE]: yup
    .string()
    .min(6)
    .max(6)
    .required()
    .label("Code"),
});
