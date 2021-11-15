import React from "react";
import { Center, Box } from "@chakra-ui/react";
import { SignUpCard } from "containers";

const SignUp = () => {
  return (
    <Center h="100vh" w="100%">
      <Box minWidth="30rem">
        <SignUpCard />
      </Box>
    </Center>
  );
};

export default SignUp;
