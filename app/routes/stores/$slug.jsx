import {
  ChakraProvider,
  Heading,
  Text,
  Badge,
  Hide,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
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
import { Form } from "formik";

// Loader and Action
export const loader = async ({ params }) => {
  const store = await getStore(params.slug);
  let uid = store.uidStore;
  await trent(uid);
  const currentUser = getAuth().currentUser.uid;
  let sameAccount = currentUser == uid;
  if (sameAccount) {
    return { store, property: true };
  } else {
    return { store, property: false };
  }
};
function $storeName(props) {
  const { store, property } = useLoaderData();

  const { isOpen, onOpen, onClose } = useDisclosure();

  // Overlay shit
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  return (
    <ChakraProvider>
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
                <Form>
                  <Input>adsf</Input>
                </Form>
                <Text>Pino con sol</Text>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}

      {property && <Text>{store.uidStore}</Text>}
    </ChakraProvider>
  );
}

export default $storeName;
