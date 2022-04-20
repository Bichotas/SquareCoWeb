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
function register_create_store(props) {
  return (
    <ChakraProvider>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Text>[[Datos]]</Text>
        </Stack>

        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Form method="post">
            <VStack gap={1}>
              <FormControl>
                <FormLabel></FormLabel>
                <Input />
              </FormControl>
              <FormControl>
                <FormLabel></FormLabel>
                <Textarea />
              </FormControl>
              <FormControl>
                <FormLabel></FormLabel>
                <Select>
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
