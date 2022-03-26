import {
  Box,
  ChakraProps,
  ChakraProvider,
  Flex,
  Text,
  Image,
  OmitCommonProps,
} from "@chakra-ui/react";
import { FiMenu, FiSearch, FiChevronDown } from "react-icons/fi";
import { HiCode, HiCollection } from "react-icons/hi";
import { MdHome, MdKeyboardArrowRight } from "react-icons/md";
import React from "react";
import NavItem from "./NavItem";
import { FaClipboardCheck, FaRss } from "react-icons/fa";
import theme from "~/src/theme";
function SideBarContent(
  props: JSX.IntrinsicAttributes &
    OmitCommonProps<
      React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >,
      keyof ChakraProps
    > &
    ChakraProps & { as?: "div" | undefined }
) {
  return (
    <ChakraProvider theme={theme}>
      <Box
        as="nav"
        pos="fixed"
        top="0"
        left="0"
        zIndex="sticky"
        h="full"
        pb="10"
        overflowX="hidden"
        overflowY="auto"
        // borderColor={useColorModeValue("inherit", "gray.700")}
        // borderRightWidth="1px"
        w="60"
        {...props}
      >
        <Flex px="4" py="5" align="center">
          <Image></Image>
          <Text></Text>
        </Flex>
        <Flex
          direction="column"
          as="nav"
          fontSize="sm"
          color="gray.600"
          aria-label="Main Navigation"
        >
          <NavItem icon={MdHome} color={"white"}>
            Home
          </NavItem>
          <NavItem icon={FaRss} color={"white"}>
            Articles
          </NavItem>
          <NavItem icon={HiCollection} color={"white"}>
            Collections
          </NavItem>
          <NavItem icon={FaClipboardCheck} color={"white"}>
            Checklists
          </NavItem>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default SideBarContent;
