import { getAuth, updateProfile } from "firebase/auth";
import { adminAuth } from "./db.server";

export async function editUser(formData, currentUser) {
  // Para este método lo que vamos a hacer es recibir un numero de datos pero en un objeto
  // Debemos de que existan estos objetos, porque si no pone naada el usuario, este va a ser devuelto un nulo
  // y podrá hacer que algunas cosas las ponga nulaas

  const { nameAccount, emailForm } = formData;

  const { uid, displayName, email, photoURL } = currentUser;
  updateProfile(uid, { displayName: nameAccount });
  // Luego llamar el metodo para cambiar el custom claim
  // Puede ser un metodo reutilizable si es que no existe, el cual tome como parametro el uid y de ahi se mande otro paremtro el cual le ponga el valor al que se qiere poner

  // Algo como granSellRole
  // Una forma para checar si se agregaron datos en la parte de string por lo menos
  // Es checar el objeto y con el index, checar si hay algo en el [0], si es que hay, entonce podremos modificar el objeto con esa propiedad que se modifico
  console.log("LLAMADA DESDE METODO" + nameAccount, emailForm);

  return null;
}

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

// Función para actualizar el usuario pero primero se va a tener quitar del objeto la propiedad vendedor

export async function updateDataProfile(objetoForm, dataAccount) {
  // Función de comparación de los datos de los objteos, porque si es el mismo entonces no vamos a actualizar los datos

  // Podemos hacer ahí mismo en la configuración de filter, que si el valor de la llave en el ciclo es igual a la que se tiene en el dataAccount
  // Esto porque el dataAccount va a ser siempre el mismo, entonces lo vamos a tener de referencia para comparar
  for (let i in objetoForm) {
    if (dataAccount.hasOwnProperty(i)) {
      console.log("Data Account " + dataAccount[i], "FOrm " + objetoForm[i]);
    }
  }
  return null;
}
