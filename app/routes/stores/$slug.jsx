import { ChakraProvider, Text } from "@chakra-ui/react";
import React from "react";

// Remix things
import { useLoaderData, useParams } from "@remix-run/react";

// Loader and Action
export const loader = ({ params }) => {
  const { slug } = params;
  // GetPost
  return { slug };
};
function $storeName(props) {
  const { slug } = useLoaderData();
  return (
    <ChakraProvider>
      <Text>{slug}</Text>
    </ChakraProvider>
  );
}

export default $storeName;
