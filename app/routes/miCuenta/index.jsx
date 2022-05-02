// Importar lo que se necesita del codigo
import React from 'react';
import { Heading, Container, Box, Image, Grid, GridItem, Text , extendTheme, Flex, Spacer, Center, Wrap, WrapItem, Button  } from '@chakra-ui/react';

function index(props){
    return(

        <Box>
            <Heading color={'white'} textShadow='3px 3px #000'>Mi cuenta</Heading>

            <Box w={'98%'} bg='#808080' h={'6px'} m='1%'></Box>

            <Box display={'grid'}>
                <Grid templateColumns='repeat(3,1fr)'  templateRows='repeat(2,1fr)'>

                    <GridItem bg={'#EEE'} border='1px solid #A9A9A9' p='2%' borderRadius={'10px'} m='10%' h='65%'>
                        <Box display='flex'>
                            <Box bg={'#00BFFF'} w='50px' h='50px' borderRadius='50px' m={'2%'}></Box>
                            <Text fontSize='120%' p={'5% 2%'}>Datos de la cuenta</Text>
                        </Box>
                        <Button m={'0% 20%'} colorScheme='blue' w={'70%'}>Descripción</Button>
                    </GridItem>

                    <GridItem bg={'#EEE'} border='1px solid #A9A9A9' p='2%' borderRadius={'10px'} m='10%' h='65%'>
                        <Box display='flex'>
                            <Box bg={'#00BFFF'} w='50px' h='50px' borderRadius='50px' m={'2%'}></Box>
                            <Text fontSize='120%' p={'5% 2%'}>Mis pedidos</Text>
                        </Box>
                        <Button m={'0% 20%'} colorScheme='blue' w={'70%'}>Descripción</Button>
                    </GridItem>

                    <GridItem bg={'#EEE'} border='1px solid #A9A9A9' p='2%' borderRadius={'10px'} m='10%' h='65%'>
                        <Box display='flex'>
                            <Box bg={'#00BFFF'} w='50px' h='50px' borderRadius='50px' m={'2%'}></Box>
                            <Text fontSize='120%' p={'5% 2%'}>Cambiar contraseña</Text>
                        </Box>
                        <Button m={'0% 20%'} colorScheme='blue' w={'70%'}>Descripción</Button>
                    </GridItem>

                    <GridItem bg={'#EEE'} border='1px solid #A9A9A9' p='2%' borderRadius={'10px'} m='10%' h='65%'>
                        <Box display='flex'>
                            <Box bg={'#00BFFF'} w='50px' h='50px' borderRadius='50px' m={'2%'}></Box>
                            <Text fontSize='120%' p={'5% 2%'}>Direcciones</Text>
                        </Box>
                        <Button m={'0% 20%'} colorScheme='blue' w={'70%'}>Descripción</Button>
                    </GridItem>

                    <GridItem bg={'#EEE'} border='1px solid #A9A9A9' p='2%' borderRadius={'10px'} m='10%' h='65%'>
                        <Box display='flex'>
                            <Box bg={'#00BFFF'} w='50px' h='50px' borderRadius='50px' m={'2%'}></Box>
                            <Text fontSize='120%' p={'5% 2%'}>Mis pagos</Text>
                        </Box>
                        <Button m={'0% 20%'} colorScheme='blue' w={'70%'}>Descripción</Button>
                    </GridItem>

                    
                </Grid>
            </Box>
        </Box>
    );
}

export default index;