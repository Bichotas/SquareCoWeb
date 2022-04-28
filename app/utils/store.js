import { getAuth } from "firebase/auth";
import { db } from "./db.server";
import { getSession } from "./session.server";

export async function getStore(id) {
  const docRef = db.doc(`stores/${id}`);
  const docSnap = docRef.get();
  const store = (await docSnap).data();
  return store;
}

export async function updateStore(dataObject, uidCurrentUser) {
  // El parametro debe de ser un objeto que tenga los siguientes datos por el momento
  // {
  //   backgroundPicture: type|URL,
  //   profilePicture: type|URL,
  //   category: type|String,
  //   description: type|String,
  //   email: type|String,
  //   nameStore: type|String,
  //   uidStore: type|String&Int
  // }
  // -- Los datos que no van a ser modificados van a ser los siguientes:
  //      - uidStore
  //      - email
  //
  //    -- Datos que pueden ser modificados en esta funcion pero van a ser
  //    dejados para otra ocasión:
  //
  //      - backgroundPicture
  //      - profilePicture
  //

  // --------------------------------------------------------------------------
  //
  // Destructuramos el objeto para usarlos y modificarlos --> Estos vienen del
  // formulario
  const { nameStore, description, category } = dataObject;

  // Referencia del objeto

  const docRef = db.doc(`stores/${uidCurrentUser}`);

  // Actualizamos el documento con los nuevos datos
  await docRef.update({
    nameStore: nameStore,
    description: description,
    category: category,
  });
  return "Actulizado";
}

export async function grantRole(email, role) {
  return null;
}
