import React from 'react';
import { Heading, Container, Box, Image, Grid, GridItem, Text , extendTheme, Flex, Spacer, Center, Wrap, WrapItem  } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { GiClothes } from "react-icons/gi";

function index(props) {
    return (

        <Box>
            <Box className='header'>
                <Heading>
                    Tiendas 
                </Heading>
            </Box>

            <Box>
                <Text>¿Qué categoría estás buscando?</Text>
            </Box>

            <Box display='grid'>
                <Grid templateColumns='repeat(3,1fr)'  templateRows='repeat(3,1fr)'>

                    {/*Ropa*/}
                    <GridItem  margin='2%' bg='rgba(106, 75, 216, 0.4)' borderRadius='20px'>
                        <Flex>
                            <Box  w='100px' h='100px' p='1%' m='5%' borderRadius='10%' bg='#ff6a6a'>
                                <Icon as={GiClothes} w={20} h={20} />
                            </Box>
                            <Center>
                                <Text fontSize='300%' color='white' fontFamily='monospace'>Ropa</Text>
                            </Center>
                            
                        </Flex>
                    </GridItem>

                    {/*Comida y Postres*/}
                    <GridItem  margin='2%' bg='rgba(106, 75, 216, 0.4)' borderRadius='20px' rowSpan={2} colSpan={1}>
                        
                        <Grid templateColumns='repeat(2,1fr)' templateRows='repeat(2,1fr)'>
                        
                            <GridItem gridArea={1} w='100px' h='100px' p='1%' m='5%' borderRadius='10%' bg='#fa8c47'>
                                    <Icon as={GiClothes} w={20} h={20} />
                            </GridItem>

                            <GridItem>
                                <Text fontSize='300%' color='white' fontFamily='monospace' paddingTop={'15%'}>Comida</Text>
                            </GridItem>
                            
                            <GridItem gridArea={1} w='100px' h='100px' p='1%' m='5%' borderRadius='10%' bg='#8eee6d'>
                                    <Icon as={GiClothes} w={20} h={20} />
                            </GridItem>

                            <GridItem>
                                <Text fontSize='300%' color='white' fontFamily='monospace' paddingTop={'15%'}>Postres</Text>
                            </GridItem>
                            
                        </Grid>
                    </GridItem>

                    <GridItem  margin='2%' bg='rgba(106, 75, 216, 0.4)' borderRadius='20px'>
                        <Flex>
                            
                            <Box  w='100px' h='100px' p='1%' m='5%' borderRadius='10%' bg='#ff6a6a'>
                                <Icon as={GiClothes} w={20} h={20} />
                            </Box>
                            <Center>
                                <Text fontSize='300%' color='white' fontFamily='monospace'>Ropa</Text>
                            </Center>
                            
                        </Flex>
                    </GridItem>

                    <GridItem  margin='2%' bg='rgba(106, 75, 216, 0.4)' borderRadius='20px'>
                        <Flex>
                            
                            <Box  w='100px' h='100px' p='1%' m='5%' borderRadius='10%' bg='#ff6a6a'>
                                <Icon as={GiClothes} w={20} h={20} />
                            </Box>
                            <Center>
                                <Text fontSize='300%' color='white' fontFamily='monospace'>Ropa</Text>
                            </Center>
                            
                        </Flex>
                    </GridItem>

                    <GridItem  margin='2%' bg='rgba(106, 75, 216, 0.4)' borderRadius='20px'>
                        <Flex>
                            
                            <Box  w='100px' h='100px' p='1%' m='5%' borderRadius='10%' bg='#ff6a6a'>
                                <Icon as={GiClothes} w={20} h={20} />
                            </Box>
                            <Center>
                                <Text fontSize='300%' color='white' fontFamily='monospace'>Ropa</Text>
                            </Center>
                            
                        </Flex>
                    </GridItem>

                    <GridItem  margin='2%' bg='rgba(106, 75, 216, 0.4)' borderRadius='20px'>
                        <Flex>
                            
                            <Box  w='100px' h='100px' p='1%' m='5%' borderRadius='10%' bg='#ff6a6a'>
                                <Icon as={GiClothes} w={20} h={20} />
                            </Box>
                            <Center>
                                <Text fontSize='300%' color='white' fontFamily='monospace'>Ropa</Text>
                            </Center>
                            
                        </Flex>
                    </GridItem>

                    <GridItem  margin='2%' bg='rgba(106, 75, 216, 0.4)' borderRadius='20px'>
                        <Flex>
                            
                            <Box  w='100px' h='100px' p='1%' m='5%' borderRadius='10%' bg='#ff6a6a'>
                                <Icon as={GiClothes} w={20} h={20} />
                            </Box>
                            <Center>
                                <Text fontSize='300%' color='white' fontFamily='monospace'>Ropa</Text>
                            </Center>
                            
                        </Flex>
                    </GridItem>

                    <GridItem  margin='2%' bg='rgba(106, 75, 216, 0.4)' borderRadius='20px'>
                        <Flex>
                            
                            <Box  w='100px' h='100px' p='1%' m='5%' borderRadius='10%' bg='#ff6a6a'>
                                <Icon as={GiClothes} w={20} h={20} />
                            </Box>
                            <Center>
                                <Text fontSize='300%' color='white' fontFamily='monospace'>Ropa</Text>
                            </Center>
                            
                        </Flex>
                    </GridItem>

                    </Grid>
            </Box>
            
        </Box>
        
    );
}

export default index;