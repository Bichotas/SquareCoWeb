import {
  VStack,
  Center,
  ChakraProvider,
  Divider,
  Heading,
  Stack,
  HStack,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  FormHelperText,
  Badge,
} from "@chakra-ui/react";
import {
  json,
  redirect,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { getAuth, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { adminAuth } from "../../utils/db.server";
import {
  checkPropertiesForm,
  getProperty,
  updateDataProfile,
} from "../../utils/user";
import { bucket } from "../../utils/db.server";

export let loader = async ({ params }) => {
  // Datos del usuario actual
  let { uid, displayName, email } = getAuth().currentUser;
  // const property = await getProperty(uid);
  const vendedor = (await adminAuth.getUser(uid)).customClaims;
  let objeto = { uid, displayName, email, vendedor: vendedor["vendedor"] };
  return json(objeto);
};
/**
 *
 * @param {*} param0
 * @returns
 */

export let action = async ({ request }) => {
  // Se obtiene el uid del usuario para luego usarlo en 
  // la imagen del usuario 
  let uidPhoto = getAuth().currentUser.uid;

  // Funcion para obtener y subir los datos a la hora qje se pida el campo de la fotografia
  //
  //    -- Los parametros que se toman son los que van 
  //    ser usados por las cosas de nuestra funciin
  //    -- Esta funcion es asincrona
  let uploadHandler = async ({ encoding, stream, mimetype, filename }) => {
    // Array de chunks
    //
    // Checamos que haya un archivo, en este caso se checa que exista con lo largo del nombre de usuario. Practicamente con esto se checa que exista una imagen


    if (filename.length > 0) {
      // Inicializamos un array para guardar los chunks de la imagen  
      let chunks = []
      // Iteramos en el objecto stream de la imagen y ua
      // guardamos en el Array
      for await (const chunk of stream) {
        chunks.push(chunk);
      // En un buffer concatenamos los chunks que tiequ
        // la imagen. 
      const buffer = Buffer.concat(chunks);
      // Sacamos la exteexten del archivi para poder 
        // guardarlo con esta extension
      const extension = filename.split(".extension");
        // Este sera el nombre para el archivo
        // -- Lo integra el uid del usuario actual y la 
        // extension del archivo
      const fName = `${uidPhoto}.${extension}`;
      // Inicializamos una instancia del nombre
        // --Esto seria como una refencia a la imagen
      const instance = bucket.file(`users/${fName}`);
      // Metodo asincrono
        // Este metodo nos podra ayudar a checar si ya existe una instancia con estestembre. Si es que existe, eentonces debemos de actualizae con la nueva instancia. ,
      console.log(await instance.exists());
      // Guardamos el buffer de chunks en la instancia del buckets
      if(await instance.exists()){
        coconse.log('Existe')

      } else {
        console.log("No existe")
      }
      await instance.save(buffer);

      // Ponemos metadata a la instancia con el metodo
      // Lo que tiene corresponde a "A MIME type is a label used to identify a type of data. It is used so software can know how to handle the data. It serves the same purpose on the Internet that file extensions do on Microsoft Windows."
      // O sea el tipo de archivo
      await instance.setMetadata({
        "Content-Type": mimetype,
        "Content-Encoding": encoding,
      });

      // Hacemos publica
      await instance.makePublic();

      // Devolvemos la URL pública
      return instance.publicUrl();
    }
  };

  // Pedimos los datos del formulario
  // -- Nuevo form data
  // Este se pasa como parametro la funcion uploadHanlder para la súbida del archivo
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );
  // Antiguo formData
  // let formData = await request.formData();
    //
  // Datos del formulario
  let nameForm = formData.get("name");
  let emailForm = formData.get("email");
  let typeAccountForm = formData.get("typeAccount");
  let photoForm = formData.get("photo");
  console.log(photoForm);
  const objetoForm = {
    displayName: nameForm,
    email: emailForm,
    vendedor: typeAccountForm,
  };
  // Mandar a llamar una funcion la cual devuelva un objeto con los objetos que si haya
  const newObject = await checkPropertiesForm(objetoForm);
  // Mandar a la función para actualizar el usuario con los datos que se agregaron
  const { uid, displayName, email, photoURL } = getAuth().currentUser;
  let vendedor = (await adminAuth.getUserByEmail(email)).customClaims;
  let dataAccount = {
    uid,
    displayName,
    email,
    photoURL,
    // Custom claim vendedor
    vendedor: vendedor["vendedor"],
  };

  // Devolver un objet y checar si se cambio el typeAccount es diferente, si este es así, entonces vamoss a redireccionar a la creación de la tienda. si no entonces vamos a mostrar un mensaje
  return await updateDataProfile(newObject, dataAccount);
};

function account_data() {
  // Por el momento nada más se define el vendedor como falso de forma local para los ejemplos
  const { displayName, email, vendedor } = useLoaderData();
  return (
    <ChakraProvider>
    {/* Encerramos en un componente Form de remix para el envio de varios datos del lado del cliente*/}
      <Form method="POST" encType="multipart/forclientea">
    <Center>  
    <Heading size={"2xl"} as={"i"} letterSpacing={"2px"}>
            Datos de la cuenta
          </Heading>
        </Center>
        <Divider my={7} />

        <Center>
          {/* Definir aun el gap entre dos stacks y las cosas */}
          <Stack
            direction={{
              base: "column",
              md: "column",
              lg: "row",
              sm: "column",
            }}
            gap={"6vw"}
          >
            <Stack direction={"column"}>
              <Box
                w={"30vh"}
                h={"30vh"}
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                alignSelf={"center"}
                borderRadius={"2vh"}
                marginBottom={"5"}
              />
              <FormControl>
                <label htmlFor="photo-input"></label>
                <Input type={"file"} name={"photo"} id={"photo-input"} />
              </FormControl>
            </Stack>
            <Stack direction={"column"} gap={4}>
              <FormControl id="name">
                <FormLabel>
                  Nombre de la cuenta:{" "}
                  {
                    <Badge
                      colorScheme={"cyan"}
                      textTransform={"revert"}
                      p={2}
                      borderRadius={7}
                    >
                      {displayName}
                    </Badge>
                  }
                </FormLabel>
                <Input
                  placeholder="Nuevo nombre de la cuenta"
                  id="name"
                  as={Input}
                  name={"name"}
                  type={"text"}
                />
                <FormHelperText>
                  Ingrese el nuevo nombre de la cuenta
                </FormHelperText>
              </FormControl>
              <FormControl id="email">
                <FormLabel>
                  Correo electronico:{" "}
                  {
                    <Badge colorScheme={"telegram"} p={2} borderRadius={7}>
                      {email}
                    </Badge>
                  }
                </FormLabel>
                <Input
                  placeholder="Nuevo correo de la cuenta"
                  id="email"
                  as={Input}
                  name={"email"}
                  type={"email"}
                />
                <FormHelperText>
                  Ingrese el nuevo correo de la cuenta
                </FormHelperText>
                <FormControl id={"typeAccount"} my={3}>
                  <FormLabel>
                    Tipo de cuenta:
                    <Badge
                      p={2}
                      borderRadius={7}
                      colorScheme={vendedor == true ? "green" : "red"}
                      ml={2}
                    >
                      {vendedor == true ? "vendedor" : "comprador"}
                    </Badge>
                  </FormLabel>

                  {/* Con el placeholder no se tiene un valor antes como se tenia */}
                  <Select
                    id={"typeAccount"}
                    name={"typeAccount"}
                    placeholder="Select option"
                  >
                    {/* En esta parte podemos hacer map a un array y así no tener varias cosas */}
                    <option value={false}>Comprador</option>
                    <option value={true}>Vendedor</option>
                  </Select>
                </FormControl>
              </FormControl>
              {/* <FormControl>
                <FormLabel>
                  Tipo de cuenta:{" "}
                  {vendedor == "true" ? "vendedor" : "comprador"}
                </FormLabel>
                <Button>Cambiar tipo de cuenta</Button>
              </FormControl> */}
              <Divider />
              <Button
                as={Button}
                type={"submit"}
                marginY={10}
                bg={"orange.500"}
                color="white"
                _hover={{ bg: "orange.600" }}
              >
                Guardar cambios
              </Button>
            </Stack>
          </Stack>
        </Center>
      </Form>
    </ChakraProvider>
  );
}

export default account_data;
