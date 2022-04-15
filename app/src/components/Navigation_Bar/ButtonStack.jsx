import { ChakraProvider, HStack, Hide, Button } from "@chakra-ui/react";
import React from "react";

// Remix things
import { Link } from "@remix-run/react";

function ButtonStack(props) {
  return (
    <ChakraProvider>
      <HStack spacing={{ base: "2", md: "2" }}>
        <Link to={"/login"}>
          <Button>Login</Button>
        </Link>
        <Hide breakpoint="(max-width: 768px)">
          <Link to={"/register"}>
            <Button>Register</Button>
          </Link>
        </Hide>
      </HStack>
    </ChakraProvider>
  );
}

export default ButtonStack;
