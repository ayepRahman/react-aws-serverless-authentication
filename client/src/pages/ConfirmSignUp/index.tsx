import React from "react";
import { Center, Box } from "@chakra-ui/react";
import { ConfirmSignUpCard } from "containers";

const ConfirmSignUp = () => {
  return (
    <Center h="100vh" w="100%">
      <Box minWidth="30rem">
        <ConfirmSignUpCard />
      </Box>
    </Center>
  );
};

export default ConfirmSignUp;
