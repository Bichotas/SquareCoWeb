import React from "react";
import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";
import { Box, ChakraProvider, Text, Heading, Stack } from "@chakra-ui/react";
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
            width={"xs"}
            bg={"white"}
            height={"7.6em"}
            borderRadius={"15px"}
            textAlign={"center"}
            border={"4px"}
            borderColor={"gray.300"}
          >
            {/* Aqui iria los datos */}
            <Stack direction={"row"}>
              <Stack direction={"column"} margin={4}>
                <AddIcon
                  w={12}
                  h={12}
                  bg={"blue.300"}
                  borderRadius={25}
                  p={6}
                />
              </Stack>
              <Stack direction={"column"}>
                <Text visibility={"hidden"}>Datos de la cuenta</Text>
                <Text>Datos de la cuenta</Text>

                <Box>Descripcion</Box>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </ChakraProvider>
  );
}

export default Configuration;
