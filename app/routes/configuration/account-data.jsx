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
  Select,
  FormHelperText,
  Badge,
} from "@chakra-ui/react";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { getAuth, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { adminAuth } from "../../utils/db.server";
import {
  checkPropertiesForm,
  editUser,
  getProperty,
  updateDataProfile,
} from "../../utils/user";

export let loader = async ({ params }) => {
  let { uid, displayName, email } = getAuth().currentUser;
  const property = await getProperty(uid);
  console.log("propiedad", property);
  let objeto = { uid, displayName, email };
  return json(objeto);
};

export let action = async ({ request }) => {
  // Pedimos los datos del formulario
  let formData = await request.formData();
  let nameForm = formData.get("name");
  let emailForm = formData.get("email");
  let typeAccountForm = formData.get("typeAccount");
  const objetoForm = {
    displayName: nameForm,
    email: emailForm,
    vendedor: typeAccountForm,
  };
  // Mandar a llamar una funcion la cual devuelva un objeto con los objetos que si haya
  const newObject = await checkPropertiesForm(objetoForm);

  // Función para actualizar el usuario y subir todo
  console.log("====================================");
  console.log(newObject);
  console.log("====================================");
  // await updateProfile(getAuth().currentUser, { displayName: nameForm });

  // Mandar a la función para actualizar el usuario con los datos que se agregaron
  const { uid, displayName, email, photoURL } = getAuth().currentUser;
  let vendedor = (await adminAuth.getUserByEmail(email)).customClaims;
  let dataAccount = {
    uid,
    displayName,
    email,
    photoURL,
    // Custom claim vendedor
    vendedor: vendedor["vendedor"],
  };
  console.log(dataAccount);
  await updateDataProfile(newObject, dataAccount);
  // Mejorar la condición de usuario

  return null;
};

function account_data() {
  // Por el momento nada más se define el vendedor como falso de forma local para los ejemplos
  let vendedor = false;
  const { displayName, email } = useLoaderData();

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
                <FormLabel>
                  Nombre de la cuenta:{" "}
                  {
                    <Badge
                      colorScheme={"cyan"}
                      textTransform={"revert"}
                      p={2}
                      borderRadius={7}
                    >
                      {displayName}
                    </Badge>
                  }
                </FormLabel>
                <Input
                  placeholder="Nuevo nombre de la cuenta"
                  id="name"
                  as={Input}
                  name={"name"}
                  type={"text"}
                />
                <FormHelperText>
                  Ingrese el nuevo nombre de la cuenta
                </FormHelperText>
              </FormControl>
              <FormControl id="email">
                <FormLabel>
                  Correo electronico:{" "}
                  {
                    <Badge colorScheme={"telegram"} p={2} borderRadius={7}>
                      {email}
                    </Badge>
                  }
                </FormLabel>
                <Input
                  placeholder="Nuevo correo de la cuenta"
                  id="email"
                  as={Input}
                  name={"email"}
                  type={"email"}
                />
                <FormHelperText>
                  Ingrese el nuevo correo de la cuenta
                </FormHelperText>
                <FormControl id={"typeAccount"} my={3}>
                  <FormLabel>
                    Tipo de cuenta:
                    <Badge
                      p={2}
                      borderRadius={7}
                      colorScheme={vendedor == true ? "green" : "red"}
                      ml={2}
                    >
                      {vendedor == true ? "vendedor" : "comprador"}
                    </Badge>
                  </FormLabel>

                  {/* Con el placeholder no se tiene un valor antes como se tenia */}
                  <Select
                    id={"typeAccount"}
                    name={"typeAccount"}
                    placeholder="Select option"
                  >
                    {/* En esta parte podemos hacer map a un array y así no tener varias cosas */}
                    <option value={false}>Comprador</option>
                    <option value={true}>Vendedor</option>
                  </Select>
                </FormControl>
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
