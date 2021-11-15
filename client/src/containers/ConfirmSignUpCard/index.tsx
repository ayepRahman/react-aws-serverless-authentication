import React from "react";
import { css, cx } from "@emotion/css";
import { Button, useToast, Text, Divider, Box } from "@chakra-ui/react";
import OtpInput from "react-otp-input";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { confirmSignUpValidationSchema } from "./validation";
import {
  ConfirmSignUpFieldNames,
  ConfirmSignUpFormData,
  ConfirmSignUpFormProps,
} from "./definitions";
import { awsConfirmSignup, awsResendConfirmationCode } from "services";
import { useNavigate, useSearchParams } from "react-router-dom";

const ConfirmSignUpForm: React.FC<ConfirmSignUpFormProps> = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const username = searchParams.get("username") || "";
  const toast = useToast();
  const [isVeryfyingAccount, setIsVeryfyingAccount] =
    React.useState<boolean>(false);
  const [isResendingCode, setIsResendingCode] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ConfirmSignUpFormData>({
    resolver: yupResolver(confirmSignUpValidationSchema),
  });

  const codeValue = watch(`${ConfirmSignUpFieldNames.CODE}`) as string;

  const clearState = () => {
    setIsVeryfyingAccount(false);
  };

  React.useEffect(() => {
    return () => {
      clearState();
    };
  }, []);

  const handleOnSubmit = async (values: ConfirmSignUpFormData) => {
    try {
      setIsVeryfyingAccount(true);
      await awsConfirmSignup({
        username: username,
        code: values.code,
      });
      toast({
        title: "Success",
        description:
          "We've verify you're account, start logging to your account!.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setIsVeryfyingAccount(false);
      navigate("/");
    } catch (error: any) {
      setIsVeryfyingAccount(false);
      toast({
        title: "Error Message",
        description: error?.message || "Woops something wrong!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleResendCode = async () => {
    try {
      setIsResendingCode(true);
      await awsResendConfirmationCode(username);
      toast({
        title: "Success",
        description: `We've successfully send a verification code to ${username} email.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setIsResendingCode(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Woops something wrong!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsResendingCode(false);
    }
  };

  return (
    <Box padding="2rem" border="1px solid" borderRadius="1rem">
      <Text fontSize="xl">Verify Account</Text>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Text>We've send a verification code to {username} email.</Text>
        <Controller
          control={control}
          name={ConfirmSignUpFieldNames.CODE}
          render={({ field: { onChange, value } }) => (
            <OtpInput
              isInputNum
              containerStyle={css`
                display: flex;
                justify-content: space-between;
              `}
              inputStyle={cx(
                css`
                  margin-top: 1rem;
                  width: 40px !important;
                  height: 52px;
                  border: 1px solid #e9e9e9;
                  border-radius: 3.14286px;
                  background: #ffffff;
                  font-style: normal;
                  font-weight: 600;
                  font-size: 28px;
                  line-height: 34px;
                  color: #2d2d2d;
                `,
                {
                  [css`
                    border: 2px solid #d53f8c;
                  `]: codeValue?.length >= 6,
                }
              )}
              focusStyle={css`
                border: 2px solid #d53f8c !important;
              `}
              onChange={onChange}
              value={value}
              numInputs={6}
            />
          )}
        />

        {!!errors?.[ConfirmSignUpFieldNames.CODE] && (
          <Text mt="0.5rem" color="pink.500">
            {errors[ConfirmSignUpFieldNames.CODE]?.message}
          </Text>
        )}

        <Button
          isLoading={!!isVeryfyingAccount}
          disabled={!!isVeryfyingAccount}
          colorScheme="pink"
          background="pink.500"
          isFullWidth
          mt="2rem"
          type="submit"
          color="white"
        >
          Verify Account
        </Button>
      </form>
      <Divider color="white" bg="white" mt="2rem" />
      <Button
        variant="outline"
        isLoading={!!isResendingCode}
        disabled={!!isResendingCode}
        colorScheme="pink"
        isFullWidth
        mt="2rem"
        type="submit"
        color="white"
        onClick={() => handleResendCode()}
      >
        Resend Verification Code
      </Button>
    </Box>
  );
};

export default ConfirmSignUpForm;
