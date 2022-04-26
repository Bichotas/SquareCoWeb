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
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { getAuth, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { adminAuth } from "../../utils/db.server";
import { editUser, getProperty } from "../../utils/user";

export let loader = async ({ params }) => {
  let { uid, displayName, email } = getAuth().currentUser;
  await getProperty(uid);
  let objeto = { uid, displayName, email };
  return json(objeto);
};

export let action = async ({ request }) => {
  let formData = await request.formData();

  let nameForm = formData.get("name");
  let emailForm = formData.get("email");

  await updateProfile(getAuth().currentUser, { displayName: nameForm });

  const { uid, displayName, email } = getAuth().currentUser;
  let objeto = { uid, displayName, email };
  return json(objeto);
};

function account_data() {
  const { displayName, email } = useLoaderData();

  console.log(useLoaderData());
  return (
    <ChakraProvider>
      <Form method="POST">
        <Center>
          <Heading size={"2xl"} as={"i"} letterSpacing={"2px"}>
            Datos de la cuenta
          </Heading>
        </Center>
        <Divider my={7} />

        <Center>
          {/* Definir aun el gap entre dos stacks y las cosas */}
          <Stack
            direction={{
              base: "column",
              md: "column",
              lg: "row",
              sm: "column",
            }}
            gap={"6vw"}
          >
            <Stack direction={"column"}>
              <Box
                w={"30vh"}
                h={"30vh"}
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                alignSelf={"center"}
                borderRadius={"2vh"}
                marginBottom={"5"}
              />
              <Button
                bg={"darkblue"}
                color={"white"}
                width={"60%"}
                alignSelf={"center"}
              >
                Fotografia
              </Button>
            </Stack>
            <Stack direction={"column"} gap={4}>
              <FormControl id="name">
                <FormLabel>Nombre de la cuenta: {displayName}</FormLabel>
                <Input
                  placeholder="Nuevo nombre de la cuenta"
                  id="name"
                  as={Input}
                  name={"name"}
                  type={"text"}
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Correo electronico: {email}</FormLabel>
                <Input
                  placeholder="Nuevo correo de la cuenta"
                  id="email"
                  as={Input}
                  name={"email"}
                  type={"email"}
                />
              </FormControl>
              {/* <FormControl>
                <FormLabel>
                  Tipo de cuenta:{" "}
                  {vendedor == "true" ? "vendedor" : "comprador"}
                </FormLabel>
                <Button>Cambiar tipo de cuenta</Button>
              </FormControl> */}
              <Divider />
              <Button
                as={Button}
                type={"submit"}
                marginY={10}
                bg={"orange.500"}
                color="white"
                _hover={{ bg: "orange.600" }}
              >
                Guardar cambios
              </Button>
            </Stack>
          </Stack>
        </Center>
      </Form>
    </ChakraProvider>
  );
}

export default account_data;
