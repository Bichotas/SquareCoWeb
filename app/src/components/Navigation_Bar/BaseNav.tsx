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

function BaseNav(props: any) {
  return <div></div>;
}

export default BaseNav;
