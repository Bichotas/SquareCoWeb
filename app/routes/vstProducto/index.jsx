// Se importan todas las cosas que se necesitaran en el codigo
import React from 'react';
import { Heading, Container, Box, Image, Grid, GridItem,SimpleGrid, Text , extendTheme, Flex, Spacer, Center, Wrap, WrapItem, Button  } from '@chakra-ui/react';

function index(props){
    return(
        <Box>

            <Box className='container' display={'flex'} >

                <Box display={'grid'}>

                    <SimpleGrid columns={[null,1, 2]}>

                        <GridItem>
                            <Heading size={'1x1'} p='2%' m={'2%'} bg={'rgba(214, 214, 214, 0.582)'} borderRadius='10px'>
                                Nombre del Producto: Ejemplo Gomitas de sapito vegetarianas 100% libres de gluten, grasas trans, calorias, azucar</Heading>

                            <Text p={'2%'} m='2%' bg={'rgba(214, 214, 214, 0.582)' } borderRadius='10px'>
                                Hola , somos una fabrica de gomitas , damos felicidad garantizada a todos nuestros clientes, las gomitas tienen ingrediantes especiales que te haran sentirte como en las nubes, 100% exportados de colombia</Text>

                            <Center>
                                <Button bg={'#33aaff;'} m='1% 3% 3%' p={'5%'} w='35%' borderRadius={'10px'}>Boton</Button>
                                <Button bg={'#33aaff;'} m='1% 3% 3%' p={'5%'} w='35%' borderRadius={'10px'}>Boton2</Button>
                            </Center>

                            
                        </GridItem>

                        <GridItem bg={'rgba(214, 214, 214, 0.582)'} borderRadius='70px' m={'1% 5%'}>
                            <Center>
                                <Image src='https://i.pinimg.com/236x/90/bf/d7/90bfd76d28caae8c9029a3be80c6d7d3.jpg' p={'8%'} borderRadius='80px'></Image>
                            </Center>
                        </GridItem>

                    </SimpleGrid>

                </Box>
                
            </Box>

        </Box>
    );
}

export default index;