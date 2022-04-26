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
} from "@chakra-ui/react";
import { Form, useLoaderData } from "@remix-run/react";
import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { adminAuth } from "../../utils/db.server";
import { editUser } from "../../utils/user";

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

export const action = async ({ request }) => {
  let formData = await request.formData();

  // Pedimos los datos -- Por el momento naada más vamos a modificar el nombre y el correo
  let nameAccount = formData.get("name");
  let email = formData.get("email");

  editUser();
  return null;
};

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
                  bgGradient="linear(to-l, #7928CA, #FF0080)"
                  borderRadius={"2vh"}
                />
                <Button bg={"darkblue"} color={"white"}>
                  Fotografia
                </Button>
              </VStack>
              <HStack>
                <Form method="post">
                  <FormControl my={2} px={4}>
                    <FormLabel fontSize={"2xl"} px={4}>
                      Nombre de la cuenta: {displayName}
                    </FormLabel>
                    <Input
                      variant={"filled"}
                      bg={"gray.500"}
                      as={Input}
                      id={"name"}
                      name={"name"}
                      type={"text"}
                    />
                  </FormControl>
                  <FormControl my={2} px={4}>
                    <FormLabel fontSize={"2xl"}>
                      Correo electronico {email}
                    </FormLabel>
                    <Input
                      variant={"filled"}
                      bg={"gray.500"}
                      id={"email"}
                      type={"email  "}
                      name={"email"}
                    />
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
