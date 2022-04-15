// Navigation Bar simple

import React from "react";
import {
  Avatar,
  Box,
  Collapse,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  Image,
  InputLeftElement,
  Text,
  useColorModeValue,
  useDisclosure,
  HStack,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  MenuItem,
  Link,
  Button,
  Show,
  Hide,
} from "@chakra-ui/react";
import { FaBell, FaClipboardCheck, FaRss } from "react-icons/fa";
import { AiFillGift } from "react-icons/ai";
import { BsGearFill, BsFillBellFill } from "react-icons/bs";
import { FiMenu, FiSearch, FiChevronDown, FiBell } from "react-icons/fi";
import { HiCode, HiCollection } from "react-icons/hi";
import { MdHome, MdKeyboardArrowRight } from "react-icons/md";
import theme from "~/src/theme";
import { ChakraProvider } from "@chakra-ui/provider";

import { Link as LinkaD } from "@remix-run/react";
// Componentes
import SideBarContent from "./SideBarContent";
import NavItem from "./NavItem";
import TitleSideBar from "./TitleSideBar";
import { ChangeColor } from "../ColorMode";
import { Footer } from "../Footer";
import ButtonStack from "./ButtonStack";
import MenuStack from "./MenuStack";

export default function Version(props) {
  // useDisclosure es usado para los siguientes escenarios:
  // - open - close - toggle
  const sideBar = useDisclosure();
  const integrations = useDisclosure();

  const { children } = props;
  // useColorModeValue
  // https://chakra-ui.com/docs/styled-system/features/color-mode#usecolormodevalue

  // Se definen los dos colores, el primero para light mode, y el otro para el dark mode
  const color = useColorModeValue("gray.600", "gray.300");

  return (
    <ChakraProvider theme={theme}>
      {/* Contenedor principañ */}
      <Box
        as="section"
        bg={useColorModeValue("gray.100", "gray.700")}
        minH={"100vh"}
      >
        {/* Parte lateral de la página */}
        <SideBarContent display={{ base: "none", md: "none" }} />
        <Drawer
          isOpen={sideBar.isOpen}
          onClose={sideBar.onClose}
          placement="left"
          closeOnOverlayClick
        >
          <DrawerOverlay />
          <DrawerContent>
            <SideBarContent w={"full"} borderRight="none" />
          </DrawerContent>
        </Drawer>
        {/* Antes {{base: 0, md: 60}} */}
        <Box ml={{ base: 0, md: 0 }} transition={".4s ease"}>
          <Flex
            // Background
            align={"center"}
            as={"header"}
            bg={"brand.primary"}
            borderBottomWidth={"2px"}
            borderColor={"inherit"}
            h={"16"}
            justify={"space-between"}
            px={"4"}
            w={"full"}
          >
            <HStack gap={"5"}>
              <IconButton
                ml={"4"}
                aria-label="Menu"
                display={{ base: "inline-flex", md: "inline-flex" }}
                onClick={sideBar.onOpen}
                icon={<FiMenu />}
                size={"sm"}
              />
              <InputGroup
                w={"96"}
                display={{ base: "none", md: "flex" }}
                ml={"5"}
              >
                <InputLeftElement color={"white"}>
                  <FiSearch color={"white"} />
                </InputLeftElement>
                <Input
                  mr={{ base: "0", md: "5" }}
                  placeholder="Buscar productos"
                  color={"white"}
                  _placeholder={{ color: "gray.300" }}
                />
              </InputGroup>
            </HStack>
            <HStack>
              <Text
                fontWeight={"bold"}
                fontFamily={"Inter"}
                display={{ base: "inline", md: "none" }}
                fontSize={{ md: "1.8rem", base: "1.5rem" }}
                color={"white"}
              >
                SquareCo
              </Text>
            </HStack>
            {/* <ButtonStack /> */}
            <MenuStack />
          </Flex>
          {/* Contenedor main */}
          <Box
            bg={useColorModeValue("gray.100", "gray.900")}
            py={"2.5rem"}
            as="main"
            px={{
              xl: "12rem",
              lg: "8rem",
              md: "7rem",
              sm: "4rem",
              base: "0.5rem",
            }}
          >
            {children}
          </Box>
        </Box>
        <Footer />
      </Box>
    </ChakraProvider>
  );
}
