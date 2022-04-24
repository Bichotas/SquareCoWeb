import {
  ChakraProvider,
  Heading,
  Text,
  Badge,
  Hide,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";

// Remix things
import { useLoaderData, useParams } from "@remix-run/react";
import { checkPropertyStore, getStore, trent } from "../../utils/store";
import { getAuth } from "firebase/auth";

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
      {property && <Text>{store.uidStore}</Text>}
    </ChakraProvider>
  );
}

export default $storeName;
