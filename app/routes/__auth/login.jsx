import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Form } from "@remix-run/react";

import { signIn } from "../../utils/db.server";
import { createUserSession } from "../../utils/session.server";

export let action = async ({ request }) => {
  let formData = await request.formData();

  let email = formData.get("email");
  let password = formData.get("password");

  const { user } = await signIn(email, password);
  const token = await user.getIdToken();
  return createUserSession(token, "/");
};

export default function SimpleCard() {
  return (
    <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
      <Stack align={"center"}>
        <Heading fontSize={"4xl"} textAlign={"center"}>
          Ingresa en tu cuenta
        </Heading>
        <Text fontSize={"lg"} color={"gray.600"} textAlign={"center"}>
          para disfrutar geniales
          <Link color={"blue.400"}> caracteristicas </Link> ✌️
        </Text>
      </Stack>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <Form method="post">
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel htmlFor="email">Correo electronico</FormLabel>
              <Input
                as={Input}
                id="email"
                name="email"
                type="email"
                variant="outline"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                as={Input}
                id="password"
                name="password"
                variant="outline"
                validate={(value) => {
                  let error;

                  if (value.length < 5) {
                    error = "Password must contain at least 6 characters";
                  }

                  return error;
                }}
              />
            </FormControl>

            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                loadingText="Submitting"
                type="submit"
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Form>
      </Box>
    </Stack>
  );
}
