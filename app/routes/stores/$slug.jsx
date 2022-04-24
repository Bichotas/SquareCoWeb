import {
  ChakraProvider,
  Heading,
  Text,
  Badge,
  Hide,
  Button,
  VStack,
  Textarea,
  Select,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  HStack,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";

// Remix things
import { useLoaderData, useParams } from "@remix-run/react";
import { checkPropertyStore, getStore, trent } from "../../utils/store";
import { getAuth } from "firebase/auth";
import { Form } from "@remix-run/react";
import theme from "../../src/theme";
// Loader and Action
export const loader = async ({ params }) => {
  const store = await getStore(params.slug);
  let uid = store.uidStore;
  if (getAuth().currentUser == null) {
    let currentUser = null;
    return { store, property: false };
  } else {
    let currentUser = getAuth().currentUser.uid;
    let sameAccount = currentUser == uid;
    if (sameAccount) {
      return { store, property: true };
    } else {
      return { store, property: false };
    }
  }
};
function $storeName(props) {
  const { store, property } = useLoaderData();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider theme={theme}>
      <Heading>
        {store.nameStore}
        <Badge
          ml="1"
          fontSize="0.8em"
          colorScheme="green"
          borderRadius={12}
          padding={"2"}
        >
          {store.category}
        </Badge>
      </Heading>
      <Text>{store.description}</Text>
      <Text color={"gray.500"}>{store.email}</Text>
      {/* Ponerlo en un componente si es que se puede */}
      {/* Modal para el formulario */}
      {property && (
        <>
          <Button
            bg={"lightcoral"}
            onClick={() => {
              onOpen();
            }}
          >
            Modificar
          </Button>
          <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay
              bg="none"
              backdropFilter="auto"
              backdropInvert="80%"
              backdropBlur="2px"
            />
            <ModalContent>
              <ModalHeader>Modificar tienda</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Form method="post">
                  <VStack gap={1}>
                    <FormControl isRequired>
                      <FormLabel>Nombre de la tienda</FormLabel>
                      <Input
                        as={Input}
                        id={"store"}
                        name={"store"}
                        type={"text"}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Descripción de la tienda</FormLabel>
                      <Textarea
                        placeholder="Es recomendable poner una descripción a tu tienda"
                        id="description"
                        name="description"
                      />
                    </FormControl>
                    <FormControl isRequired id={"category"}>
                      <FormLabel>Categoría de la tienda</FormLabel>
                      <Select id={"category"} name={"category"}>
                        {/* En esta parte podemos hacer map a un array y así no tener varias cosas */}
                        <option value={"cremeria"}>Cremeria</option>
                        <option value={"ropa"}>Ropa</option>
                      </Select>
                    </FormControl>
                  </VStack>
                </Form>
              </ModalBody>
              <ModalFooter>
                <HStack>
                  <Button onClick={onClose}>Close</Button>
                  <Button
                    type="submit"
                    color={"white"}
                    bg={"orange.400"}
                    loadingText="Submitting"
                    _hover={{ bg: "orange.600" }}
                  >
                    Modificar
                  </Button>
                </HStack>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </ChakraProvider>
  );
}

export default $storeName;
