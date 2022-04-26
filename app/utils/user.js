import { updateProfile } from "firebase/auth";
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
  console.log(property);
  return property;
}
