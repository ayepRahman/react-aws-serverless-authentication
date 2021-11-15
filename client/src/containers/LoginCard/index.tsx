import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  useToast,
  Box,
  Link,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpValidationSchema } from "./validation";
import { LoginFieldNames, LoginFormData, LoginProps } from "./definitions";
import { awsSignIn } from "services";

const LoginCard: React.FC<LoginProps> = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(signUpValidationSchema),
  });

  const clearState = () => {
    setIsLoading(false);
  };

  React.useEffect(() => {
    return () => {
      clearState();
    };
  }, []);

  const handleOnSubmit = async (values: LoginFormData) => {
    try {
      setIsLoading(true);
      const res = await awsSignIn({
        username: values.username,
        password: values.password,
      });

      console.log(res);
      setIsLoading(false);
      toast({
        title: "Success.",
        description: "You've succesfully logged in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: "Error Message",
        description: error?.message || "Woops something wrong!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box padding="2rem" border="1px solid" borderRadius="1rem">
      <Text fontSize="xl">Login</Text>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <FormControl mt="1rem" id={LoginFieldNames.USERNAME}>
          <FormLabel>Username</FormLabel>
          <Input
            colorScheme="pink"
            focusBorderColor="pink.500"
            {...register(LoginFieldNames.USERNAME)}
          />
          {!!errors?.[LoginFieldNames.USERNAME] && (
            <FormHelperText mt="0.25rem" color="pink.500">
              {errors[LoginFieldNames.USERNAME]?.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl mt="1rem" id={LoginFieldNames.PASSWORD}>
          <FormLabel>Password</FormLabel>
          <Input
            colorScheme="pink"
            focusBorderColor="pink.500"
            type="password"
            {...register(LoginFieldNames.PASSWORD)}
          />
          {!!errors?.[LoginFieldNames.PASSWORD] && (
            <FormHelperText mt="0.25rem" color="pink.500">
              {errors[LoginFieldNames.PASSWORD]?.message}
            </FormHelperText>
          )}
        </FormControl>

        <Box mt="1rem">
          <Link onClick={() => navigate("/signup")}>
            Not a user? Sign up in instead.
          </Link>
        </Box>
        <Button
          isLoading={!!isLoading}
          disabled={!!isLoading}
          colorScheme="pink"
          background="pink.500"
          isFullWidth
          mt="2rem"
          type="submit"
          color="white"
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginCard;
