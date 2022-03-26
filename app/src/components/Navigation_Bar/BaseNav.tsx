import React from "react";
import {
  Avatar,
  Box,
  ChakraProps,
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
  OmitCommonProps,
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
} from "@chakra-ui/react";
import { FaBell, FaClipboardCheck, FaRss } from "react-icons/fa";
import { AiFillGift } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { FiMenu, FiSearch, FiChevronDown } from "react-icons/fi";
import { HiCode, HiCollection } from "react-icons/hi";
import { MdHome, MdKeyboardArrowRight } from "react-icons/md";
import theme from "~/src/theme";
import { ChakraProvider } from "@chakra-ui/provider";

// Componentes
import SideBarContent from "./SideBarContent";
import NavItem from "./NavItem";
export default function Base(props: any) {
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
      <Box>
        {/* Parte lateral de la página */}
        <SideBarContent />
        <Drawer>
          <DrawerOverlay />
          <DrawerContent>
            <SideBarContent />
          </DrawerContent>
        </Drawer>
        <Box>
          <Flex>
            <IconButton />
            <InputGroup>
              <InputLeftElement>
                <FiSearch />
              </InputLeftElement>
            </InputGroup>
            {/* Fotografía e Icono de Notificación */}
            <HStack>
              <IconButton />
              <Flex>
                <Menu>
                  <MenuButton>
                    <HStack>
                      <Avatar />
                    </HStack>
                  </MenuButton>
                  <MenuList>
                    <MenuItem></MenuItem>
                    <MenuItem></MenuItem>
                    <MenuItem></MenuItem>
                    <MenuDivider />
                    <MenuItem></MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </HStack>

            {/* Fin de Fotografía e Icon de notificación */}
          </Flex>

          <Box>{children}</Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
}
