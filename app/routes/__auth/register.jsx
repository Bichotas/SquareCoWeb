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
} from "@chakra-ui/react";
import { Form } from "@remix-run/react";
import { signUp } from "../../utils/db.server";
import { createUserSession } from "../../utils/session.server";
import { Link as LinkaD } from "@remix-run/react";

export let action = async ({ request }) => {
  let formData = await request.formData();

  let email = formData.get("email");
  let password = formData.get("password");

  const { user } = await signUp(email, password);
  const token = await user.getIdToken();

  return createUserSession(token, "/register/choose");
};

export default function SignupCard() {
  return (
    <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
      <Stack align={"center"}>
        <Heading fontSize={"4xl"} textAlign={"center"}>
          Registrate
        </Heading>
        <Text
          fontSize={"lg"}
          color={"gray.600"}
          textAlign={{ sm: "center", base: "center" }}
        >
          para disfrutar de todas nuestras funciones geniales✌️
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
            <FormControl id={"firstName"} isRequired></FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="email">Correo Electronico</FormLabel>
              <Input
                as={Input}
                id="email"
                name="email"
                type="email"
                variant="outline"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Contraseña</FormLabel>
              <Input
                as={Input}
                id="password"
                name="password"
                type="password"
                variant="outline"
              />
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
