import {
  VStack,
  Center,
  ChakraProvider,
  Divider,
  Heading,
  Stack,
  HStack,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Badge,
  Text,
} from "@chakra-ui/react";
import { Form } from "@remix-run/react";
import React, { useState } from "react";

function account_data() {
  const [typeA, setTypeAccount] = useState("vendedor");
  return (
    <ChakraProvider>
      <Stack gap={6} padding={"2"} align={"center"}>
        <VStack>
          <Center p={2}>
            <Heading size={"2xl"} as={"i"} letterSpacing={"2px"}>
              Datos de la cuenta
            </Heading>
          </Center>

          {/* Hacer un divider o simplemente hacer más grueso el divider*/}
          <Divider size={"2xl"} p={2} variant={"solid"} />
          <Center>
            <HStack gap={5}>
              <VStack gap={4}>
                <Box
                  w={"30vh"}
                  h={"30vh"}
                  bg={"blackAlpha.600"}
                  borderRadius={"2vh"}
                />
                <Button bg={"darkblue"} color={"white"}>
                  Fotografia
                </Button>
              </VStack>
              <HStack>
                <Form>
                  <FormControl my={2} px={4}>
                    <FormLabel fontSize={"2xl"} px={4}>
                      Nombre de la cuenta
                    </FormLabel>
                    <Input />
                  </FormControl>
                  <FormControl my={2} px={4}>
                    <FormLabel fontSize={"2xl"}>Correo electronico</FormLabel>
                    <Input />
                  </FormControl>
                  <FormControl my={2} px={4}>
                    <FormLabel fontSize={"2xl"}>Tipo de cuenta</FormLabel>
                    <HStack>
                      <Button
                        onClick={() => {
                          if (typeA === "vendedor") {
                            setTypeAccount("comprador");
                          } else if (typeA === "comprador") {
                            setTypeAccount("vendedor");
                          }
                        }}
                      >
                        Cambiar
                      </Button>
                      <Badge
                        colorScheme={typeA === "vendedor" ? "red" : "green"}
                      >
                        {typeA}
                      </Badge>
                    </HStack>
                  </FormControl>
                </Form>
              </HStack>
            </HStack>
          </Center>
        </VStack>
        <Box>
          <Button bg={"orange.300"}>Guardar cambios</Button>
        </Box>
      </Stack>
    </ChakraProvider>
  );
}

export default account_data;
