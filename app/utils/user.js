import { redirect } from "@remix-run/node";
import { getAuth, updateProfile } from "firebase/auth";
import { adminAuth } from "./db.server";

// Función para obtener el custoim claim del usuario

export async function getProperty(uid) {
  const user = await adminAuth.getUser(uid);
  let property = user.customClaims;
  // console.log(property);
  return property;
}

// Se uso el siguiente formulario para la referencia del filter y de esta funcion de abajo
// https://www.delftstack.com/es/howto/javascript/javascript-filter-object/

Object.filter = function (mainObject, filterFunction) {
  return Object.keys(mainObject)
    .filter(function (ObjectKey) {
      return filterFunction(mainObject[ObjectKey]);
    })
    .reduce(function (result, ObjectKey) {
      result[ObjectKey] = mainObject[ObjectKey];
      return result;
    }, {});
};
export async function checkPropertiesForm(objetoForm) {
  let objetoFiltrado = Object.filter(objetoForm, function (propiedad) {
    return propiedad[0] != undefined;
  });
  return objetoFiltrado;
}
// Función para otorgar un role de vendedor al usuario
//  -- Se va a otorgar el rol según el segundo parametro que se le pase
//    .. Esta función va a estar en la función "updateDataProfile", exactamente en la condición de si aux es diferente a undefined y si tambíen
//      los valores de vendedor son diferentes, tanto del formulario como la de los datos de la cuenta, este último hablando del custom claim.
export async function grantRoleVendedor(uid, role) {
  // Guardamos el valor del usuario actual con el admin auth
  const user = await adminAuth.getUser(uid);
  // Pasamos y modificamos el customcalim con el valor del parametro
  adminAuth.setCustomUserClaims(user.uid, { vendedor: role });
}

// Funcioon para convetir el valor de string a booleano

// Esta función prácticamente retornar el valor pero booleano
export const cadenaABooleano = (cadena) => cadena === "true";

// Función para actualizar el usuario pero primero se va a tener quitar del objeto la propiedad vendedor

export async function updateDataProfile(objetoForm, dataAccount) {
  // Función de comparación de los datos de los objteos, porque si es el mismo entonces no vamos a actualizar los datos

  // Podemos hacer ahí mismo en la configuración de filter, que si el valor de la llave en el ciclo es igual a la que se tiene en el dataAccount
  // Esto porque el dataAccount va a ser siempre el mismo, entonces lo vamos a tener de referencia para comparar

  // Articulo que se uso
  // https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Working_with_Objects

  // El objeto que se tiene comoo parametro se dsetructura en otro objeto para modificarlo
  // -- Aunque también se puede modificar el parametro, se prefirio la solución de abajo para que sea más sencillo identificar las propiedades y en donde se guarda
  let newFormObject = { ...objetoForm };

  // En esta parte se debe de checar si existe la propiedad es la misma en la parte de dataAccount
  // Se destructura la propiedad vendedor para guardarlo en uux
  let aux = undefined;

  // Checamos que el objeto que contiene los datos del formulario tenga la propiedad "vendedor"
  //
  // Esto para saber que esta y separarlo del objeto principal
  if (newFormObject.hasOwnProperty("vendedor")) {
    // Destructuramos la propiead vendedor para tenerla a lado
    let { vendedor } = newFormObject;
    // La ponemos en una variable auxiliar para luego utilizarla
    aux = { vendedor };
    // Eliminamos la propiedad para mantener el objeto solo y se puede utilizar
    // como objeto solo
    delete newFormObject.vendedor;
  }

  // Creamos un objeto vacio para los objetos que estan en el objeto, esto es un
  // filtrado sencillo comparando con el otro objeto
  let formulario = {};
  // Condición
  //
  // Iteramos en cada una de las llaves
  for (let i in newFormObject) {
    // Checamos que el objet dataAccount que sería los datos de la cuenta de ese
    // momento. Los cuales van a servir de comparació para la adición de
    // propiedades al objeto formulario
    //
    if (dataAccount.hasOwnProperty(i)) {
      // Checar si los valores son iguales
      // @todo
      if (newFormObject[i] !== dataAccount[i]) {
        let valor = newFormObject[i];
        formulario[i] = valor;
      }
    }
  }

  // Actualizar el perfil de la cuenta
  let currentUser = getAuth().currentUser;
  await updateProfile(currentUser, formulario);

  // Hasta aquí se va a modificar porque entraría lo del customclaim
  // Actualización de los roles
  // Funcion https://parzibyte.me/blog/2020/02/19/javascript-convertir-cadena-false-true-booleano/

  // if (
  //   aux != undefined &&
  //   cadenaABooleano(aux["vendedor"]) !== dataAccount["vendedor"]
  // ) {
  //   let valorVenta = cadenaABooleano(aux["vendedor"]);
  //   const user = await adminAuth.getUserByEmail(currentUser.email);
  //   adminAuth.setCustomUserClaims(user.uid, { vendedor: valorVenta });
  //   //console.log(cadenaABooleano(aux["vendedor"]), dataAccount["vendedor"]);
  // }
  // Si es que aux es diferente a undefined
  // Entonces vamos a actualizar el custom claim de este usuario y según lo que sea el aux y se tenga, vamos a
  // console.log(formulario, aux);

  // Si es que hay algo en el formulario entonces vamos a cambiar el custom claim, pero tenemos que checar que no sean iguales
  if (aux != undefined) {
    // Convertirmos el valor de string para booleano para usarlo luego en la comparación
    const vendedorForm = cadenaABooleano(aux["vendedor"]);

    // Se recibe la condición, esto para que un true y un true sea igual a un true
    // Prácticamente checamos que no sean iguales tanto el booleano del formulario como el de los datos de la cuenta
    if (!vendedorForm == dataAccount["vendedor"]) {
      console.log("No son iguales");
      // Otorgamos el rol a la cuenta con el tipo de cuenta que se selecciono en el formulario
      // Prácticamente vamos a hacer esto si es que los datos son diferentes
      await grantRoleVendedor(dataAccount.uid, vendedorForm);

      // Podremos retornar si vendedorForm es igual "true", entonces a una ruta para crear la cuenta o a la ruta de /register/create-store
      // return redirect("register/create-store/")
      // O podemos crear otra ruta pero que sea paraecida a la anterior
      return null;
    }
  }

  // Si no se cambia el tipo de cuenta, podemos quedarnos en la misma ruta
  return null;
}
