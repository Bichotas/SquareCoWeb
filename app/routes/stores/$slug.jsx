import {
  ChakraProvider,
  Heading,
  Text,
  Badge,
  Hide,
  Button,
  VStack,
  Textarea,
  Select,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  HStack,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React from "react";

// Remix things
import { useLoaderData } from "@remix-run/react";
import { getStore, updateStore } from "../../utils/store";
import { getAuth } from "firebase/auth";
import { Form } from "@remix-run/react";
import theme from "../../src/theme";
import { redirect } from "@remix-run/node";
// Loader and Action
//
// Loader para los datos y condicion
export const loader = async ({ params }) => {
  // Se obtienen los datos de la función asincrona y se guardan sus valores.
  //  -- Este lo que va a guardar va a ser un objeto que tiene las propiedades
  const store = await getStore(params.slug);

  // Identificador de la tienda
  //    -- Este se guarda para comparar si es el mismo con el usuario que con el
  //    usuario actual.
  let uid = store.uidStore;

  // Condicion de retorno
  //
  //    -- Primero se va a checar si el usuario actual o el usuario que devuelve
  //    la funcion getAuth().currentUser es igual a null: Esto significa que no
  //    hay un usuario logeado actualmente, entonces este lo que hace es lo
  //    siguiente.
  if (getAuth().currentUser == null) {
    // Retornamos un objeto con un subobjeto adentro de el y una propiedad
    // llamada property.
    //
    // El objeto store es el que se guarda anteriormente en una constante
    // La propiedad "property" tiene como valor un valor booleano. Este nos
    // ayuda a mostrar ciertos elementos que solo queremos mostrar a cierto tipo
    // de eventos.
    return { store, property: false };
  } else {
    // Si es que el valor de getAuth().currentUser tiene algun valor diferente
    // al de null, entonces vamos a hacer lo siguiente:

    // Guardamos el uid del usuario actual para usuarlo después
    let currentUser = getAuth().currentUser.uid;
    // Checamos que el usuario current user y el uid del objeto de la tienda
    // sean iguales, este va a devovler un valor booleano el cual va a ser
    // utilizado en la condicion
    let sameAccount = currentUser == uid;

    // La condicion para mostrar si hay un usuario registrado y ver si es el
    // mismo usuario que la cuenta de la tienda
    // Para esto se usa la condicion de sameAccount que es un valor booleano
    if (sameAccount) {
      // Si es true, entonces este va a devovler un objeto con store y una
      // propiedad de property true que va a ser usado para mostrar las cosas de
      // la tienda para modificar.
      return { store, property: true };
    } else {
      // Si este e false entonces vamos a devolver un objeto igual al anterior
      // pero solo con la diferencia de que la propiedad de property false.
      return { store, property: false };
    }
  }
};

// Action para los fornmularios de cambio y de varias cosas
export const action = async ({ request }) => {
  // Del parametro request, vamos a mandar a pedir el metodo de formData para
  // obtener los datos del formulario
  let formData = await request.formData();

  // Mandamos a llamar los valores del formulario del store y guardamos sus
  // datos en una variable llamada store. Este va a ser el nombre de la tienda
  let store = formData.get("store");
  // Valor de la descripcion
  let description = formData.get("description");

  // Descripcion del formularios
  let categoria = formData.get("category");
  // Action que se va a usuar con los valores

  // Funcion para actualizar los datos del documento store
  //    -- Primero se va a iniciar con los datos tipo string y luego se va agregar la funcionalidad de las imagenes para
  //        la foto de perfil y su foto de portada de la tienda.
  const dataObject = {
    nameStore: store,
    description: description,
    category: categoria,
  };

  const uidCurrentUser = getAuth().currentUser.uid;
  const update = await updateStore(dataObject, uidCurrentUser);
  console.log(update);
  // Retornamos un valor nulo ya que por el momento no se devuleve nada
  return null;
};

// Componente de la tienda
function $storeName() {
  // Destructuramos los valores de la funcion usuLoaderData()
  const { store, property } = useLoaderData();

  // Destructuramos los metodos para usuarlos en el modal, este se destructuran
  // dessde la funcion useDisclosure()
  //
  // @todo -- Poner el link del moodle y useDisclosure()
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Devolvemos un componente
  return (
    <ChakraProvider theme={theme}>
      <Heading>
        {store.nameStore}
        <Badge
          ml="1"
          fontSize="0.8em"
          colorScheme="green"
          borderRadius={12}
          padding={"2"}
        >
          {store.category}
        </Badge>
      </Heading>
      <Text>{store.description}</Text>
      <Text color={"gray.500"}>{store.email}</Text>
      {/* Ponerlo en un componente si es que se puede */}
      {/* Modal para el formulario */}

      {/* La propiedad destructurada se usa para mostrar lo siguiente */}
      {property && (
        <>
          {/* Se tiene un boton que muestra que un modal */}
          <Button
            bg={"lightcoral"}
            onClick={() => {
              onOpen();
            }}
          >
            Modificar
          </Button>
          <Modal isCentered isOpen={isOpen} onClose={onClose}>
            {/* Se envuelve en un componente form el contenido de modal */}

            <Form method="post">
              <ModalOverlay
                bg="none"
                backdropFilter="auto"
                backdropInvert="80%"
                backdropBlur="2px"
              />
              <ModalContent>
                <ModalHeader>Modificar tienda</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <VStack gap={1}>
                    {/* Form input */}
                    <FormControl isRequired>
                      <FormLabel>Nombre de la tienda</FormLabel>
                      <Input
                        as={Input}
                        id={"store"}
                        name={"store"}
                        type={"text"}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Descripción de la tienda</FormLabel>
                      <Textarea
                        placeholder="Es recomendable poner una descripción a tu tienda"
                        id="description"
                        name="description"
                      />
                    </FormControl>
                    <FormControl isRequired id={"category"}>
                      <FormLabel>Categoría de la tienda</FormLabel>
                      <Select id={"category"} name={"category"}>
                        {/* En esta parte podemos hacer map a un array y así no tener varias cosas */}
                        <option value={"cremeria"}>Cremeria</option>
                        <option value={"ropa"}>Ropa</option>
                        <option value={"nuevo"}>Nuevo</option>
                      </Select>
                    </FormControl>
                  </VStack>
                </ModalBody>
                <ModalFooter>
                  <HStack>
                    <Button onClick={onClose}>Close</Button>

                    {/* Boton para mandar a que los datos se actualizen*/}
                    <Button
                      type="submit"
                      color={"white"}
                      bg={"orange.400"}
                      loadingText="Submitting"
                      _hover={{ bg: "orange.600" }}
                    >
                      Modificar
                    </Button>
                  </HStack>
                </ModalFooter>
              </ModalContent>
            </Form>
          </Modal>
        </>
      )}
    </ChakraProvider>
  );
}

export default $storeName;
