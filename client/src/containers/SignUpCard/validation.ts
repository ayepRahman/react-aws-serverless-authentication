import * as yup from "yup";
import yupPassword from "yup-password";
import { SignUpFieldNames } from "./definitions";
yupPassword(yup);

export const signUpValidationSchema = yup.object().shape({
  [SignUpFieldNames.USERNAME]: yup
    .string()
    .min(4)
    .max(20)
    .required()
    .label("Username"),
  [SignUpFieldNames.EMAIL]: yup.string().email().required().label("Email"),
  [SignUpFieldNames.PASSWORD]: yup
    .string()
    .min(4)
    .max(30)
    .minUppercase(1, "Password must be at least min one uppercase")
    .minLowercase(1, "Password must be at least min one lowercase")
    .minSymbols(1, "Password must be at least min one symbol")
    .minNumbers(1, "Password must be at least min one number")
    .required()
    .label("Password"),
  [SignUpFieldNames.CONFIRM_PASSWORD]: yup
    .string()
    .min(4)
    .max(30)
    .minUppercase(1, "Password must be at least min one uppercase")
    .minLowercase(1, "Password must be at least min one lowercase")
    .minSymbols(1, "Password must be at least min one symbol")
    .minNumbers(1, "Password must be at least min one number")
    .required()
    .oneOf([yup.ref("password"), null], "Passwords don't match")
    .label("Confirm Password"),
});
