import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

function profile(props) {
  return (
    <ChakraProvider>
      <Outlet />
    </ChakraProvider>
  );
}

export default profile;
