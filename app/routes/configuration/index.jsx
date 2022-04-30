import React from "react";
import { Box, ChakraProvider, Divider, Heading, Stack } from "@chakra-ui/react";
function Configuration(props) {
  return (
    <ChakraProvider>
      <Stack>
        <Heading
          fontSize={["2xl", "3xl", "5xl", "6xl"]}
          letterSpacing={"2px"}
          textShadow={"4px 4px 2px rgba(0, 0, 0, 0.6)"}
          color={"white"}
        >
          Mi cuenta
        </Heading>
        <Box width={"100%"} bg={"gray.300"} height={"4px"} />
        <Stack gap={10} direction={"row"} justify={"left"}>
          <Box
            width={"sm"}
            bg={"beige"}
            height={"7em"}
            borderRadius={"15px"}
            textAlign={"center"}
          >
            Tarjeta
          </Box>
        </Stack>
      </Stack>
    </ChakraProvider>
  );
}

export default Configuration;
