import { ChakraProvider, Heading, Text, Badge } from "@chakra-ui/react";
import React from "react";

// Remix things
import { useLoaderData, useParams } from "@remix-run/react";
import { getStore } from "../../utils/store";

import invariant from "invariant";
// Loader and Action
export const loader = ({ params }) => {
  invariant(params.slug, "Expected params.slug");
  return getStore(params.slug);
};
function $storeName(props) {
  const valor = useLoaderData();
  return (
    <ChakraProvider>
      <Heading>
        {valor.nameStore}
        <Badge ml="1" fontSize="0.8em" colorScheme="green">
          {valor.category}
        </Badge>
      </Heading>
      <Text>{valor.nameStore}</Text>
    </ChakraProvider>
  );
}

export default $storeName;
