import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  VStack,
  Select,
} from "@chakra-ui/react";
import { redirect } from "@remix-run/node";
import { Link as LinkaD } from "@remix-run/react";

import { Form } from "@remix-run/react";
import { getAuth, updateProfile } from "firebase/auth";
import { adminAuth, createDocumentUser, userReturn } from "../utils/db.server";
import { grantSellRole } from "../utils/db.server";
export let action = async ({ request }) => {
  // Checar la documentación de firebase para los customclaims
  // Podemos poner como en la parte del rol, que sea tipoDeCuenta: "comprador" || "vendedor "

  let formData = await request.formData();
  // Se obtiene los datos del formulario
  let name = formData.get("name");
  let cuenta = formData.get("cuenta");

  const auth = getAuth();
  updateProfile(auth.currentUser, {
    displayName: name,
  });

  // new Response((time)=>{})

  if (cuenta == "vendedor") {
    await grantSellRole(auth.currentUser.email).then(() => {
      console.log("Success");
    });
    const userObject = await userReturn(auth.currentUser.email);
    console.log(userObject);
    await createDocumentUser(userObject);
    return redirect("/register/create-store");
  } else {
    // Si no es vendedor, devolver a la página principal.
    return redirect("/");
  }

  return null;
};

export default function SplitScreen() {
  return (
    <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
      <Stack align={"center"}>
        <Text
          fontSize={"lg"}
          color={"gray.600"}
          textAlign={{ sm: "center", base: "center" }}
        >
          Coloca los datos de tu cuenta
        </Text>
      </Stack>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <Form method="post">
          <VStack spacing={4} align="flex-start">
            <FormControl isRequired>
              <FormLabel>Nombre de la cuenta </FormLabel>
              <Input
                as={Input}
                id={"name"}
                name={"name"}
                type={"text"}
                variant={"outline"}
              />
            </FormControl>
            <FormControl isRequired id="cuenta">
              <FormLabel>Tipo de cuenta</FormLabel>
              <Select
                placeholder="Elige el tipo de cuenta"
                id="cuenta"
                name="cuenta"
              >
                <option value={"comprador"}>Comprador</option>
                <option value={"vendedor"}>Vendedor</option>
              </Select>
            </FormControl>
            <Button
              type="submit"
              color={"white"}
              bg={"purple.400"}
              isFullWidth
              loadingText="Submitting"
              size={"lg"}
              _hover={{ bg: "purple.500" }}
            >
              Registrarse
            </Button>
            <Text textAlign={"center"}>
              Already a user?{" "}
              <LinkaD to={"/login"}>
                <Link color={"blue.400"}>Login</Link>
              </LinkaD>
            </Text>
          </VStack>
        </Form>
      </Box>
    </Stack>
  );
}
