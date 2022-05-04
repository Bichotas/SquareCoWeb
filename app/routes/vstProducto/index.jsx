// Se importan todas las cosas que se necesitaran en el codigo
import React from 'react';
import { Heading, Container, Box, Image, Grid, GridItem,SimpleGrid, Text , extendTheme, Flex, Spacer, Center, Wrap, WrapItem, Button  } from '@chakra-ui/react';

function index(props){
    return(
        <Box>

            <Box className='container' display={'flex'}>
                
                <Box className='texto' w='50%'>
                    <Box className='Nombre del producto' bg={'#999'}  m={'1%'}>
                        <Heading size={'1x1'}>Nombre del Producto</Heading>
                    </Box>

                    <Box className='Descripcion del producto' bg={'#999'} m='1%'>
                        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio maiores qui omnis officia itaque, quo quas eos eligendi odio officiis magni fugiat? Expedita provident dolor doloribus praesentium quibusdam, placeat nam magni distinctio possimus excepturi est, maxime repudiandae velit totam aperiam nemo accusamus illo cupiditate animi illum alias ad suscipit ut.</Text>
                    </Box>

                    <Box className='Botones'>
                        <Button bg={'#33aaff;'} m='1%'>Boton</Button>
                        <Button bg={'#33aaff;'} m='1%'>Boton2</Button>
                    </Box>
                </Box>

                <Box className='Foto' w={'50%'}>
                    <Image src='https://i.pinimg.com/236x/90/bf/d7/90bfd76d28caae8c9029a3be80c6d7d3.jpg'  ></Image>
                </Box>
            </Box>

        </Box>
    );
}

export default index;