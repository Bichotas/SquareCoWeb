import {
  Box,
  ChakraProvider,
  Flex,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Outlet } from "@remix-run/react";
import React from "react";

function auth(props) {
  return (
    <ChakraProvider>
      <Flex minH={"80vh"} align={"center"} justify={"center"} mt={"-16"}>
        <Outlet />
      </Flex>
    </ChakraProvider>
  );
}

export default auth;
