import {
  Avatar,
  ChakraProvider,
  Divider,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  IconButton,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import { BsFillBellFill } from "react-icons/bs";
import { signOut } from "../../../utils/session.server";
import { Form } from "@remix-run/react";

export async function action({ request }) {
  await signOut();
}

function MenuStack(props) {
  return (
    <ChakraProvider>
      <HStack spacing={{ base: "2", md: "5" }}>
        <IconButton
          size={"sm"}
          color={"dark"}
          aria-label={"open menu"}
          icon={<BsFillBellFill />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition={"all 0.3s"}
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  borderColor={"white"}
                  borderWidth={"3px"}
                  size={"sm"}
                  spacing={{ base: "2", md: "2" }}
                />
              </HStack>
            </MenuButton>
            <MenuList bg={"white"} borderColor={"gray.200"} borderWidth={"2px"}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <Divider />
              {/* Implementar bien el metodo signOut y direccionar a la página principal */}
              <Form method="post">
                <MenuItem>Sign Out</MenuItem>
              </Form>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </ChakraProvider>
  );
}

export default MenuStack;
