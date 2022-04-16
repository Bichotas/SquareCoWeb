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
  Button,
} from "@chakra-ui/react";
import React from "react";
import { BsFillBellFill } from "react-icons/bs";
import { Form } from "@remix-run/react";
import { secondSignOut } from "../../../utils/db.server";
import { redirect } from "@remix-run/node";
import { getAuth } from "firebase/auth";

export let action = ({ request }) => {
  getAuth().signOut();
  return redirect("/post");
};

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
              <Form method="POST">
                <Button
                  type="submit"
                  bg={"teal.200"}
                  m={"2"}
                  _hover={{ bg: "teal.400", color: "whiteO" }}
                >
                  Sign Out
                </Button>
              </Form>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </ChakraProvider>
  );
}

export default MenuStack;
