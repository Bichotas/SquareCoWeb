// Se importan todas las cosas que se necesitaran en el codigo
import React from 'react';
import { Heading, Container, Box, Image, Grid, GridItem,SimpleGrid, Text , extendTheme, Flex, Spacer, Center, Wrap, WrapItem  } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { GiClothes } from "react-icons/gi";



function index(props) {
    return (

        <Box>
            <Box className='header'>
                <Heading textAlign={'center'} fontSize='6xl'>
                    Tiendas 
                </Heading>
            </Box>

{/* La pequeña seccion que dice "¿Que categoria estas buscando?" */}
            <Center>
            <Box bg='#44b' width={['40% 90%']} borderRadius='10px' margin={'1%'} p='1%'>
                <Text color={'#fff'} fontSize={'2xl'} textAlign='center'>¿Qué categoría estás buscando?</Text>
            </Box>
            </Center>

{/* Aqui empiezan todas las secciones y categorias , hice todo con grid por que se me hacia mas facil asi*/}
            <Box display='grid'>
                {/* Esto hace que sea grid */}
                <SimpleGrid columns={[null,1,2,3]}  rows={[1,2]}>

                    {/*Ropa*/}
                    {/*Aqui pude exportar el icono gracias a la ayuda de cesar, hice una box para la imagen y un heading para el texto*/}
                    <GridItem  margin='2%' bg='rgba(106, 75, 216, 0.4)' borderRadius='20px'>
                        <Flex>
                            <Box  w='100px' h='100px' p='2%' m='5%' borderRadius='10%' bg='#ff6a6a'>
                                <Icon as={GiClothes} w={20} h={20} />
                            </Box>
                            <Center>
                                <Heading fontSize={'3xl'} color='white' fontFamily='monospace'>Ropa</Heading>
                            </Center>
                        </Flex>
                    </GridItem>

                    {/*Comida y Postres*/}
                    {/*Este lo hice diferente, de aqui en adelante no me dejo exportar iconos asi que copie imagenes de iconos de un sitio web llamado flaticon*/}
                    <GridItem  margin='2%' bg='rgba(106, 75, 216, 0.4)' borderRadius='20px' rowSpan={2} colSpan={1}>
                        <Grid templateColumns='repeat(2,1fr)' templateRows='repeat(2,1fr)'>
                            <GridItem gridArea={1} w='100px' h='100px' p='2%' m='7%' borderRadius='10%' bg='#fa8c47'>
                                <Center>
                                    <Image src='https://cdn-icons-png.flaticon.com/128/857/857681.png' w={'90%'} ></Image>
                                </Center>
                            </GridItem>

                            <GridItem>
                                <Heading fontSize={'3xl'} color='white' fontFamily='monospace' padding={'25% 0%'}>Comida</Heading>
                            </GridItem>
                            
                            <GridItem gridArea={1} w='100px' h='100px' p='2%' m='7%' borderRadius='10%' bg='#8eee6d'>
                                <Center>
                                    <Image src='https://cdn-icons-png.flaticon.com/128/702/702547.png' w={'90%'} ></Image>
                                </Center>
                            </GridItem>

                            <GridItem>
                                <Heading fontSize={'3xl'} color='white' fontFamily='monospace' padding={'25% 0%'}>Postres</Heading>
                            </GridItem>
                            
                        </Grid>
                    </GridItem>

                    {/*Joyeria y accesorios*/}
                    <GridItem  margin='2%' bg='rgba(106, 75, 216, 0.4)' borderRadius='20px'>
                        <Flex>
                            <Box  w='100px' h='100px' p='2%' m='5%' borderRadius='10%' bg='#ff6a6a'>
                                <Image src='https://cdn-icons-png.flaticon.com/128/496/496912.png'></Image>
                            </Box>
                            <Center>
                                <Heading fontSize={'2xl'} color='white' fontFamily='monospace'>Joyeria y <br></br>Accesorios</Heading>
                            </Center>
                        </Flex>
                    </GridItem>

                    {/*Zapatos*/}
                    <GridItem  margin='2%' bg='rgba(106, 75, 216, 0.4)' borderRadius='20px'>
                        <Flex>
                            <Box  w='100px' h='100px' p='2%' m='5%' borderRadius='10%' bg='#6315b0'>
                                <Center>
                                    <Image src='https://cdn-icons-png.flaticon.com/128/1077/1077995.png' w={'90%'}></Image>
                                </Center>
                            </Box>
                            <Center>
                                <Text fontSize='300%' color='white' fontFamily='monospace'>Zapatos</Text>
                            </Center>
                        </Flex>
                    </GridItem>

                    {/*Servicios*/}
                    <GridItem  margin='2%' bg='rgba(106, 75, 216, 0.4)' borderRadius='20px'>
                        <Flex>
                            <Box  w='100px' h='100px' p='2%' m='5%' borderRadius='10%' bg='#33aaff'>
                                <Center>
                                <Image src='https://cdn-icons-png.flaticon.com/128/686/686317.png' w={'90%'}></Image>
                                </Center>

                            </Box>
                            <Center>
                                <Heading fontSize={'3xl'} color='white' fontFamily='monospace'>Servicios</Heading>
                            </Center>
                        </Flex>
                    </GridItem>

                    {/*Belleza*/}
                    <GridItem  margin='2%' bg='rgba(106, 75, 216, 0.4)' borderRadius='20px'>
                        <Flex>
                            <Box  w='100px' h='100px' p='2%' m='5%' borderRadius='10%' bg='#ef79c7'>
                                <Center>
                                <Image src='https://cdn-icons-png.flaticon.com/128/3163/3163173.png' w={'90%'}></Image>
                                </Center>
                                
                            </Box>
                            <Center>
                                <Heading fontSize={'3xl'} color='white' fontFamily='monospace'>Belleza</Heading>
                            </Center>
                        </Flex>
                    </GridItem>

                    {/*Todo*/}
                    <GridItem  margin='2%' bg='#fa8c47' borderRadius='20px'>
                            <Center>
                                <Heading fontSize={'3xl'} color='white' fontFamily='monospace' padding={'15% 0%'}>Todo</Heading>
                            </Center>
                    </GridItem>

                    {/*Otros*/}
                    <GridItem  margin='2%' bg='rgba(106, 75, 216, 0.4)' borderRadius='20px'>
                        <Flex>
                            <Box  w='100px' h='100px' p='2%' m='5%' borderRadius='10%' bg='#919191'>
                                <Center>
                                <Image src='https://cdn-icons-png.flaticon.com/128/570/570223.png' w={'90%'}></Image>
                                </Center>
                                
                            </Box>
                            <Center>
                                <Heading fontSize={'3xl'} color='white' fontFamily='monospace'>Otros...</Heading>
                            </Center>
                        </Flex>
                    </GridItem>




                    </SimpleGrid>
            </Box>
            
        </Box>
        
    );
}

export default index;