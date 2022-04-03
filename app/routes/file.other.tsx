import { Box, ChakraProvider } from "@chakra-ui/react";
import React from "react";

function file(props: any) {
  return (
    <ChakraProvider>
      <Box>Hola</Box>
    </ChakraProvider>
  );
}

export default file;
