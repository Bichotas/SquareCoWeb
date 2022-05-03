// Página hecha por Iris A.P.R 03/05/22
// Importar lo que se necesita del codigo
import React from 'react';
import { Heading,SimpleGrid, Container, Box, Image, Grid, GridItem, Text , extendTheme, Flex, Spacer, Center, Wrap, WrapItem, Button  } from '@chakra-ui/react';

function index(props){
    return(

        // Box contenedora de todo
        <Box>
            {/* Titulo  */}
            <Heading color={'white'} textShadow='3px 3px #000'>Mi cuenta</Heading>
            {/* Rallita Gris */}
            <Box w={'98%'} bg='#808080' h={'6px'} m='1%'></Box>

            {/* Box contenedora de todos los elementos grid */}
            <Box display={'grid'}>
                {/* Esto es lo que hace la pagina responsive */}
                <SimpleGrid columns={[null,1, 2, 3]} row={[1,2]}>

                    {/* Todos los elementos son GridItems */}
                    <GridItem bg={'#EEE'} border='1px solid #A9A9A9' p='2%' borderRadius={'10px'} m='10%'>
                        <Box display='flex'>
                            {/* Bolita azul */}
                            <Box bg={'#00BFFF'} w='50px' h='50px' borderRadius='50px' m={'2%'}></Box>
                            {/* Texto */}
                            <Text fontSize='120%' p={'5% 2%'}>Datos de la cuenta</Text>
                        </Box>
                        {/* Boton */}
                        <Button m={'0% 20%'} colorScheme='blue' w={'70%'}>Descripción</Button>
                    </GridItem>

                    <GridItem bg={'#EEE'} border='1px solid #A9A9A9' p='2%' borderRadius={'10px'} m='10%'>
                        <Box display='flex'>
                            <Box bg={'#00BFFF'} w='50px' h='50px' borderRadius='50px' m={'2%'}></Box>
                            <Text fontSize='120%' p={'5% 2%'}>Mis pedidos</Text>
                        </Box>
                        <Button m={'0% 20%'} colorScheme='blue' w={'70%'}>Descripción</Button>
                    </GridItem>

                    <GridItem bg={'#EEE'} border='1px solid #A9A9A9' p='2%' borderRadius={'10px'} m='10%'>
                        <Box display='flex'>
                            <Box bg={'#00BFFF'} w='50px' h='50px' borderRadius='50px' m={'2%'}></Box>
                            <Text fontSize='120%' p={'5% 2%'}>Cambiar contraseña</Text>
                        </Box>
                        <Button m={'0% 20%'} colorScheme='blue' w={'70%'}>Descripción</Button>
                    </GridItem>

                    <GridItem bg={'#EEE'} border='1px solid #A9A9A9' p='2%' borderRadius={'10px'} m='10%'>
                        <Box display='flex'>
                            <Box bg={'#00BFFF'} w='50px' h='50px' borderRadius='50px' m={'2%'}></Box>
                            <Text fontSize='120%' p={'5% 2%'}>Direcciones</Text>
                        </Box>
                        <Button m={'0% 20%'} colorScheme='blue' w={'70%'}>Descripción</Button>
                    </GridItem>

                    <GridItem bg={'#EEE'} border='1px solid #A9A9A9' p='2%' borderRadius={'10px'} m='10%'>
                        <Box display='flex'>
                            <Box bg={'#00BFFF'} w='50px' h='50px' borderRadius='50px' m={'2%'}></Box>
                            <Text fontSize='120%' p={'5% 2%'}>Mis pagos</Text>
                        </Box>
                        <Button m={'0% 20%'} colorScheme='blue' w={'70%'}>Descripción</Button>
                    </GridItem>

                </SimpleGrid>
            </Box>
        </Box>
    );
}

export default index;