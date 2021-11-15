import React from "react";
import { Center, Box, Text } from "@chakra-ui/react";
import { LoginCard } from "containers";

const Home = () => {
  return (
    <Center h="100vh" w="100%">
      <Box minWidth="30rem">
        <Text fontSize="3xl" mb="2rem" textAlign="center">
          React AWS Serverless Authentication
        </Text>
        <LoginCard />
      </Box>
    </Center>
  );
};

export default Home;
