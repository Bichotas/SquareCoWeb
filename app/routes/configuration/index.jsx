import React from "react";
import { Box, ChakraProvider, Divider, Heading, Stack } from "@chakra-ui/react";
function Configuration(props) {
  return (
    <ChakraProvider>
      <Stack>
        <Heading fontSize={["2xl", "3xl", "5xl", "6xl"]} letterSpacing={"2px"}>
          Mi cuenta
        </Heading>
        <Box width={"100%"} bg={"gray.300"} height={"4px"} />
      </Stack>
    </ChakraProvider>
  );
}

export default Configuration;
