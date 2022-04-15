import { ChakraProvider, Flex } from "@chakra-ui/react";
import { Outlet } from "@remix-run/react";

export default function PostLayout() {
  return (
    <ChakraProvider>
      <main>
        <article>
          <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={"facebook.100"}
          >
            <Outlet />
          </Flex>
        </article>
      </main>
    </ChakraProvider>
  );
}
