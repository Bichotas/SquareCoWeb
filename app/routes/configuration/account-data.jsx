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
import { Form, useLoaderData } from "@remix-run/react";
import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { adminAuth } from "../../utils/db.server";

export const loader = async ({ request }) => {
  const currentUser = getAuth().currentUser;
  // Destructuramos los valores
  const { uid, displayName, email, photoURL } = currentUser;
  const customClaim = (await adminAuth.getUser(uid)).customClaims;
  const vendedor = customClaim.vendedor;
  const accountData = { uid, displayName, email, photoURL, vendedor };
  console.log(accountData);
  return accountData;
};

export const action = async ({request}) =

function account_data() {
    const { uid, displayName, email, photoURL, vendedor } = useLoaderData();
  const [typeA, setTypeAccount] = useState(vendedor);
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
                    <Input variant={"filled"} bg={"gray.500"} />
                  </FormControl>
                  <FormControl my={2} px={4}>
                    <FormLabel fontSize={"2xl"}>Correo electronico</FormLabel>
                    <Input variant={"filled"} bg={"gray.500"} />
                  </FormControl>
                  <FormControl my={2} px={4}>
                    <FormLabel fontSize={"2xl"}>Tipo de cuenta</FormLabel>
                    <HStack>
                      <Button
                        onClick={() => {
                          if (typeA == true) {
                            setTypeAccount(false);
                          } else if (typeA == false) {
                            setTypeAccount(true);
                          }
                        }}
                      >
                        Cambiar
                      </Button>
                      <Badge
                        colorScheme={typeA == true ? "red" : "green"}
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
