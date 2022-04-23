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

// Loader and Action
export const loader = async ({ params }) => {
  const store = await getStore(params.slug);
  let nameStore = store.uidStore;
  await trent(nameStore);
  return store;
};
function $storeName(props) {
  const store = useLoaderData();
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
    </ChakraProvider>
  );
}

export default $storeName;
