import React from "react";
import { ChakraProvider } from "@chakra-ui/provider";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
  Button,
} from "@chakra-ui/react";
import { Form } from "@remix-run/react";

import theme from "../src/theme";

export let action = async ({ request }) => {
  let formData = await request.formData();
  let store = formData.get("store");
};

function register_create_store(props) {
  return (
    <ChakraProvider theme={theme}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={2} px={6}>
        <Stack align={"center"}>
          <Text
            fontSize={"lg"}
            color={"gray.600"}
            textAlign={{ sm: "center", base: "center" }}
          >
            Crea tu tienda
          </Text>
        </Stack>

        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Form method="post">
            <VStack gap={1}>
              <FormControl isRequired>
                <FormLabel>Nombre de la tienda</FormLabel>
                <Input as={Input} id={"store"} name={"store"} type={"text"} />
              </FormControl>
              <FormControl>
                <FormLabel>Descripción de la tienda</FormLabel>
                <Textarea
                  placeholder="Es recomendable poner una descripción a tu tienda"
                  id="description"
                  name="description"
                />
              </FormControl>
              <FormControl isRequired id={"categoryia"}>
                <FormLabel>Categoría de la tienda</FormLabel>
                <Select>
                  {/* En esta parte podemos hacer map a un array y así no tener varias cosas */}
                  <option value={"cremeria"}>Cremeria</option>
                  <option value={"ropa"}>Ropa</option>
                </Select>
              </FormControl>
              <Button
                type="submit"
                color={"white"}
                bg={"brand.ascend"}
                isFullWidth
                loadingText="Submitting"
                size={"lg"}
                _hover={{ bg: "orange.500" }}
              >
                Finalizar
              </Button>
            </VStack>
          </Form>
        </Box>
      </Stack>
    </ChakraProvider>
  );
}

export default register_create_store;
