import * as yup from "yup";
import yupPassword from "yup-password";
import { LoginFieldNames } from "./definitions";
yupPassword(yup);

export const signUpValidationSchema = yup.object().shape({
  [LoginFieldNames.USERNAME]: yup
    .string()
    .min(4)
    .max(20)
    .required()
    .label("Username"),
  // [SignUpFieldNames.EMAIL]: yup.string().email().required().label("Email"),
  [LoginFieldNames.PASSWORD]: yup
    .string()
    .min(4)
    .max(30)
    .minUppercase(1, "Password must be at least min one uppercase")
    .minLowercase(1, "Password must be at least min one lowercase")
    .minSymbols(1, "Password must be at least min one symbol")
    .minNumbers(1, "Password must be at least min one number")
    .required()
    .label("Password"),
});
