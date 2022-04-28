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
// Función para otorgar un role de vendedor al usuario
//  -- Se va a otorgar el rol según el segundo parametro que se le pase
//    .. Esta función va a estar en la función "updateDataProfile", exactamente en la condición de si aux es diferente a undefined y si tambíen
//      los valores de vendedor son diferentes, tanto del formulario como la de los datos de la cuenta, este último hablando del custom claim.
export async function grantRoleVendedor(email, role) {
  const user = await adminAuth.getUserByEmail(email);
  adminAuth.setCustomUserClaims(user.uid, { vendedor: role });
}

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
  if (newFormObject.hasOwnProperty("vendedor")) {
    let { vendedor } = newFormObject;
    aux = { vendedor };
    delete newFormObject.vendedor;
  }
  let formulario = {};
  // Condición
  for (let i in newFormObject) {
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
  const currentUser = getAuth().currentUser;
  await updateProfile(currentUser, formulario);

  // Actualización de los roles
  // Funcion https://parzibyte.me/blog/2020/02/19/javascript-convertir-cadena-false-true-booleano/
  const cadenaABooleano = (cadena) => cadena === "true";
  if (
    aux != undefined &&
    cadenaABooleano(aux["vendedor"]) !== dataAccount["vendedor"]
  ) {
    grantRoleVendedor(dataAccount.email, cadenaABooleano(aux["vendedor"]));
    console.log("ROle de tienda");
    //console.log(cadenaABooleano(aux["vendedor"]), dataAccount["vendedor"]);
  }
  // Si es que aux es diferente a undefined
  // Entonces vamos a actualizar el custom claim de este usuario y según lo que sea el aux y se tenga, vamos a
  // console.log(formulario, aux);
  return null;
}
