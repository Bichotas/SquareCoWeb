import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { Formik, Field } from "formik";
import FormFormik from "~/src/components/Forms/Form";
export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} mt={"-16"}>
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
          {/* Inicio de formik */}

          <FormFormik initialValues={{ name: "", email: "", password: "" }}>
            <Stack spacing={4}>
              <FormControl id="firstName" isRequired>
                <FormLabel>Nombre de la cuenta</FormLabel>
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  type="text"
                  variant="outline"
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  variant="outline"
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? "text" : "password"} />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    ></Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user? <Link color={"blue.400"}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </FormFormik>
        </Box>
      </Stack>
    </Flex>
  );
}
