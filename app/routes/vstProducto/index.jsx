// Iris Alina Perez Rivera 06/05/22
// Se importan todas las cosas que se necesitaran en el codigo
import React from 'react';
import { Heading, Container, Box, Image, Grid, GridItem,SimpleGrid, Text , extendTheme, Flex, Spacer, Center, Wrap, WrapItem, Button  } from '@chakra-ui/react';

function index(props){
    return(
        // Box Contenedora de todo
        <Box>

            {/* Box contenedora de todos los elementos por encima de la rallita azul */}
            <Box className='container' display={'flex'} >

                <Box display={'grid'}>

                    {/* Esto hace que la parte de arriba sea responsive, se divide en dos partes con los griditem */}
                    <SimpleGrid columns={[null,1, 2]}>

                        <GridItem>
                            {/* Nombre del producto */}
                            <Heading size={'1x1'} p='2%' m={'2%'} bg={'rgba(214, 214, 214, 0.582)'} borderRadius='10px'>
                                Nombre del Producto: Ejemplo Gomitas de sapito vegetarianas 100% libres de gluten, grasas trans, calorias, azucar</Heading>

                            {/* Descripcion del producto */}
                            <Text p={'2%'} m='2%' bg={'rgba(214, 214, 214, 0.582)' } borderRadius='10px'>
                                Hola , somos una fabrica de gomitas , damos felicidad garantizada a todos nuestros clientes, las gomitas tienen ingrediantes especiales que te haran sentirte como en las nubes, 100% exportados de colombia</Text>

                            {/* Botones */}
                            <Center>
                                <Button bg={'#33aaff;'} m='1% 3% 3%' p={'5%'} w='35%' borderRadius={'10px'}>Boton</Button>
                                <Button bg={'#33aaff;'} m='1% 3% 3%' p={'5%'} w='35%' borderRadius={'10px'}>Boton2</Button>
                            </Center>

                        </GridItem>

                        {/* Box de alrededor de la imagen */}
                        <GridItem bg={'rgba(214, 214, 214, 0.582)'} borderRadius='70px' m={'1% 5%'}>
                            <Center>
                                {/* Imagen */}
                                <Image src='https://i.pinimg.com/236x/90/bf/d7/90bfd76d28caae8c9029a3be80c6d7d3.jpg' p={'8%'} borderRadius='80px'></Image>
                            </Center>
                        </GridItem>

                    </SimpleGrid>

                    {/* Rallita azul */}
                    <Center>
                        <Box bg={'#33aaff'} w='96%' h={'10px'} m='3%'></Box>
                    </Center>
                    
                </Box>

            </Box>

            {/* Parte de abajo que contiene todos los productos */}
            <Box display={'grid'}>
                    {/* Esto hace que la pagina sea responsive */}
                    <SimpleGrid columns={[null,1, 2,3 ,4]}>

                        {/* Cada producto */}
                        <GridItem>
                            <Box bg={'#44ccff'} p={'5%'} m='3%' borderRadius={'23px'}>
                                <Box bg={'#33aaff'} borderRadius='20px'>
                                    <Center>
                                        <Image src='https://i.pinimg.com/236x/de/14/ab/de14abc5989c790c9172c90c152ae14b.jpg' w={'60%'} borderRadius='20px'></Image>
                                    </Center>
                                </Box>
                                <Center><Text bg={'#3388ff'} w='30%' h={'10px'} m='3%' borderRadius={'10px'}>Texto</Text></Center>
                                <Center><Text bg={'#2266ff'} w='65%' h={'30px'} m='2%' borderRadius={'10px'}>Texto</Text></Center>
                                <Center><Text bg={'#445c7e'} w='31%' h='13px' m={'2%'} borderRadius='10px'>Texto</Text></Center>
                                
                                <Text bg={'#99eeff'} w={'30%'} h='25px' borderRadius='10px'>Texto</Text>
                            </Box>
                        </GridItem>

                        <GridItem>
                            <Box bg={'#44ccff'} p={'5%'} m='3%' borderRadius={'23px'}>
                                <Box bg={'#33aaff'} borderRadius='20px'>
                                    <Center>
                                        <Image src='https://i.pinimg.com/236x/de/14/ab/de14abc5989c790c9172c90c152ae14b.jpg' w={'60%'} borderRadius='20px'></Image>
                                    </Center>
                                </Box>
                                <Center><Text bg={'#3388ff'} w='30%' h={'10px'} m='3%' borderRadius={'10px'}></Text></Center>
                                <Center><Text bg={'#2266ff'} w='65%' h={'30px'} m='2%' borderRadius={'10px'}></Text></Center>
                                <Center><Text bg={'#445c7e'} w='31%' h='13px' m={'2%'} borderRadius='10px'></Text></Center>
                                
                                <Text bg={'#99eeff'} w={'30%'} h='25px' borderRadius='10px'></Text>
                            </Box>
                        </GridItem>

                        <GridItem>
                            <Box bg={'#44ccff'} p={'5%'} m='3%' borderRadius={'23px'}>
                                <Box bg={'#33aaff'} borderRadius='20px'>
                                    <Center>
                                        <Image src='https://i.pinimg.com/236x/de/14/ab/de14abc5989c790c9172c90c152ae14b.jpg' w={'60%'} borderRadius='20px'></Image>
                                    </Center>
                                </Box>
                                <Center><Text bg={'#3388ff'} w='30%' h={'10px'} m='3%' borderRadius={'10px'}></Text></Center>
                                <Center><Text bg={'#2266ff'} w='65%' h={'30px'} m='2%' borderRadius={'10px'}></Text></Center>
                                <Center><Text bg={'#445c7e'} w='31%' h='13px' m={'2%'} borderRadius='10px'></Text></Center>
                                
                                <Text bg={'#99eeff'} w={'30%'} h='25px' borderRadius='10px'></Text>
                            </Box>
                        </GridItem>

                        <GridItem>
                            <Box bg={'#44ccff'} p={'5%'} m='3%' borderRadius={'23px'}>
                                <Box bg={'#33aaff'} borderRadius='20px'>
                                    <Center>
                                        <Image src='https://i.pinimg.com/236x/de/14/ab/de14abc5989c790c9172c90c152ae14b.jpg' w={'60%'} borderRadius='20px'></Image>
                                    </Center>
                                </Box>
                                <Center><Text bg={'#3388ff'} w='30%' h={'10px'} m='3%' borderRadius={'10px'}></Text></Center>
                                <Center><Text bg={'#2266ff'} w='65%' h={'30px'} m='2%' borderRadius={'10px'}></Text></Center>
                                <Center><Text bg={'#445c7e'} w='31%' h='13px' m={'2%'} borderRadius='10px'></Text></Center>
                                
                                <Text bg={'#99eeff'} w={'30%'} h='25px' borderRadius='10px'></Text>
                            </Box>
                        </GridItem>

                        <GridItem>
                            <Box bg={'#44ccff'} p={'5%'} m='3%' borderRadius={'23px'}>
                                <Box bg={'#33aaff'} borderRadius='20px'>
                                    <Center>
                                        <Image src='https://i.pinimg.com/236x/de/14/ab/de14abc5989c790c9172c90c152ae14b.jpg' w={'60%'} borderRadius='20px'></Image>
                                    </Center>
                                </Box>
                                <Center><Text bg={'#3388ff'} w='30%' h={'10px'} m='3%' borderRadius={'10px'}></Text></Center>
                                <Center><Text bg={'#2266ff'} w='65%' h={'30px'} m='2%' borderRadius={'10px'}></Text></Center>
                                <Center><Text bg={'#445c7e'} w='31%' h='13px' m={'2%'} borderRadius='10px'></Text></Center>
                                
                                <Text bg={'#99eeff'} w={'30%'} h='25px' borderRadius='10px'></Text>
                            </Box>
                        </GridItem>

                        <GridItem>
                            <Box bg={'#44ccff'} p={'5%'} m='3%' borderRadius={'23px'}>
                                <Box bg={'#33aaff'} borderRadius='20px'>
                                    <Center>
                                        <Image src='https://i.pinimg.com/236x/de/14/ab/de14abc5989c790c9172c90c152ae14b.jpg' w={'60%'} borderRadius='20px'></Image>
                                    </Center>
                                </Box>
                                <Center><Text bg={'#3388ff'} w='30%' h={'10px'} m='3%' borderRadius={'10px'}></Text></Center>
                                <Center><Text bg={'#2266ff'} w='65%' h={'30px'} m='2%' borderRadius={'10px'}></Text></Center>
                                <Center><Text bg={'#445c7e'} w='31%' h='13px' m={'2%'} borderRadius='10px'></Text></Center>
                                
                                <Text bg={'#99eeff'} w={'30%'} h='25px' borderRadius='10px'></Text>
                            </Box>
                        </GridItem>

                        <GridItem>
                            <Box bg={'#44ccff'} p={'5%'} m='3%' borderRadius={'23px'}>
                                <Box bg={'#33aaff'} borderRadius='20px'>
                                    <Center>
                                        <Image src='https://i.pinimg.com/236x/de/14/ab/de14abc5989c790c9172c90c152ae14b.jpg' w={'60%'} borderRadius='20px'></Image>
                                    </Center>
                                </Box>
                                <Center><Text bg={'#3388ff'} w='30%' h={'10px'} m='3%' borderRadius={'10px'}></Text></Center>
                                <Center><Text bg={'#2266ff'} w='65%' h={'30px'} m='2%' borderRadius={'10px'}></Text></Center>
                                <Center><Text bg={'#445c7e'} w='31%' h='13px' m={'2%'} borderRadius='10px'></Text></Center>
                                
                                <Text bg={'#99eeff'} w={'30%'} h='25px' borderRadius='10px'></Text>
                            </Box>
                        </GridItem>

                        <GridItem>
                            <Box bg={'#44ccff'} p={'5%'} m='3%' borderRadius={'23px'}>
                                <Box bg={'#33aaff'} borderRadius='20px'>
                                    <Center>
                                        <Image src='https://i.pinimg.com/236x/de/14/ab/de14abc5989c790c9172c90c152ae14b.jpg' w={'60%'} borderRadius='20px'></Image>
                                    </Center>
                                </Box>
                                <Center><Text bg={'#3388ff'} w='30%' h={'10px'} m='3%' borderRadius={'10px'}></Text></Center>
                                <Center><Text bg={'#2266ff'} w='65%' h={'30px'} m='2%' borderRadius={'10px'}></Text></Center>
                                <Center><Text bg={'#445c7e'} w='31%' h='13px' m={'2%'} borderRadius='10px'></Text></Center>
                                
                                <Text bg={'#99eeff'} w={'30%'} h='25px' borderRadius='10px'></Text>
                            </Box>
                        </GridItem>

                    </SimpleGrid>
                </Box>

        </Box>
    );
}

export default index;