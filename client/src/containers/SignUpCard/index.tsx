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
import { SignUpFieldNames, SignUpFormData, SignUpProps } from "./definitions";
import { awsSignUp } from "services";

const SignUpCard: React.FC<SignUpProps> = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
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

  const handleOnSubmit = async (values: SignUpFormData) => {
    try {
      setIsLoading(true);
      await awsSignUp({
        username: values.username,
        email: values.email,
        password: values.password,
      });
      setIsLoading(false);
      toast({
        title: "Email need verification.",
        description: "We've send a verfication code to your email.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate(`/confirm-signup?username=${values.username}`);
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
      <Text fontSize="xl">Sign Up</Text>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <FormControl mt="1rem" id={SignUpFieldNames.USERNAME}>
          <FormLabel>Username</FormLabel>
          <Input
            colorScheme="pink"
            focusBorderColor="pink.500"
            {...register(SignUpFieldNames.USERNAME)}
          />
          {!!errors?.[SignUpFieldNames.USERNAME] && (
            <FormHelperText mt="0.25rem" color="pink.500">
              {errors[SignUpFieldNames.USERNAME]?.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl mt="1rem" id={SignUpFieldNames.EMAIL}>
          <FormLabel>Email</FormLabel>
          <Input
            colorScheme="pink"
            focusBorderColor="pink.500"
            {...register(SignUpFieldNames.EMAIL)}
          />
          {!!errors?.[SignUpFieldNames.EMAIL] && (
            <FormHelperText mt="0.25rem" color="pink.500">
              {errors[SignUpFieldNames.EMAIL]?.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl mt="1rem" id={SignUpFieldNames.PASSWORD}>
          <FormLabel>Password</FormLabel>
          <Input
            colorScheme="pink"
            focusBorderColor="pink.500"
            type="password"
            {...register(SignUpFieldNames.PASSWORD)}
          />
          {!!errors?.[SignUpFieldNames.PASSWORD] && (
            <FormHelperText mt="0.25rem" color="pink.500">
              {errors[SignUpFieldNames.PASSWORD]?.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl mt="1rem" id={SignUpFieldNames.CONFIRM_PASSWORD}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            colorScheme="pink"
            focusBorderColor="pink.500"
            type="password"
            {...register(SignUpFieldNames.CONFIRM_PASSWORD)}
          />
          {!!errors?.[SignUpFieldNames.CONFIRM_PASSWORD] && (
            <FormHelperText mt="0.25rem" color="pink.500">
              {errors[SignUpFieldNames.CONFIRM_PASSWORD]?.message}
            </FormHelperText>
          )}
        </FormControl>

        <Box mt="1rem">
          <Link onClick={() => navigate("/")}>
            Already a user? Log in instead.
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
          Sign up
        </Button>
      </form>
    </Box>
  );
};

export default SignUpCard;
