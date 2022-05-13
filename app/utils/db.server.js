import { redirect } from "@remix-run/node";
import admin from "firebase-admin";
import {
  applicationDefault,
  initializeApp as initializeAdminApp,
} from "firebase-admin/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
import { destroySession } from "./session.server";
require("dotenv").config();
import { initializeApp } from "firebase/app";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaDEf0OPmBueLPBB32ybpdQOxiNEn4J68",
  authDomain: "squareco-c2597.firebaseapp.com",
  projectId: "squareco-c2597",
  storageBucket: "squareco-c2597.appspot.com",
  messagingSenderId: "1086510223912",
  appId: "1:1086510223912:web:c38694244bed15e61e1b1d",
};

const serviceAccount = require("../../keyService.json");

if (!admin.apps.length) {
  initializeAdminApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://squareco-c2597.firebaseio.com", //

    storageBucket: "squareco-c2597.appspot.com",
  });
}

export const db = admin.firestore();
export const adminAuth = admin.auth();
export const bucket = admin.storage().bucket();

let Firebase;

if (!Firebase?.apps?.length) {
  Firebase = initializeApp(firebaseConfig);
}

export async function signIn(email, password) {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signUp(email, password) {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function getSessionToken(idToken) {
  const decodedToken = await adminAuth.verifyIdToken(idToken);
  if (new Date().getTime() / 1000 - decodedToken.auth_time > 5 * 60) {
    throw new Error("Recent sign in required");
  }
  const twoWeeks = 60 * 60 * 24 * 14 * 1000;
  return adminAuth.createSessionCookie(idToken, { expiresIn: twoWeeks });
}

export async function signOutFirebase() {
  await signOut(getAuth());
}

// Nuevo
export async function getCurrentUser() {
  const currentUser = getAuth().currentUser;

  if (currentUser == null) {
    return null;
  } else {
    return currentUser.uid;
  }
}

export async function secondSignOut() {
  const currentUser = getAuth().signOut();
  await destroySession();
}

// Custom claims

//--Funcion para otorgar el rol de vendedor al usuario.--
export async function grantSellRole(email) {
  // Mandamos a llamar a la clase admin con sus metodos para así que nos devuelva el objeto usuaria segun el email
  const user = await admin.auth().getUserByEmail(email);

  // Condición para cuando se le otorgue el rol de vendedor
  // -- Se checca si el usuario ya tiene las dos condiciones, que tenga customClaims y que tenga el rol de vendedor
  //    __ Si tiene los dos, entonces se va a devolver un valor nulo, ya que ya tiene el rol de "Vendedor"

  if (user.customClaims && user.customClaims.vendedor === true) {
    return null;
  }
  // No tienen ni uno de los dos, este se le va a poner el siguuiente rol

  //  -- Se modifica los CustomUserClaims, y se pone los siguiente roles
  //      __ "vendedor: true" ya que es el proposito de esta funcion
  //      __ "comprador: fasle" -- #Esta parte se puede omitir, ya que si detecta que el custom claim de vendedor esta en false, entonces podemos deducir que el tipo de cuenta es "Comprador"
  return admin.auth().setCustomUserClaims(user.uid, {
    vendedor: true,
  });
}

// --Funcion para otorgar el role de comprador al usuario -- Refactorizar en una función

export async function grantBuyerRole(email) {
  // Mandamos a llamar a la clase admin con sus metodos para así que nos devuelva el objeto usuaria segun el email
  const user = await admin.auth().getUserByEmail(email);
  if (user.customClaims && user.customClaims.vendedor === false) {
    return null;
  }
  return admin.auth().setCustomUserClaims(user.uid, {
    vendedor: false,
  });
}

// --Funcion para checar el rol que tiene el usuario actual--

// Esta función es bastante sencilla, se busca devolver los custom claims en un objeto, aunque tambíen podemos devolver varias cosas
// ## Definir que cosas va a devolver
export async function checkRole(email) {
  // Mandamos a llamar a la clase admin con sus metodos para así que nos devuelva el objeto usuaria segun el email
  const user = await admin.auth().getUserByEmail(email);

  // Extraemos la propiedades del objeto user.CustomClaims. Es aqui donde van a estar nuestra propiedades customizadas
  const { vendedor, comprador } = user.customClaims;

  // ## Debugging
  const { displayName } = user;
  console.log(
    "Nombre de autenticacion admin " + vendedor,
    comprador,
    displayName
  );

  // Retorno de un objeto con las propiedades

  // ## Definir que cosas se van a devolver
  return {
    vendedor,
    comprador,
    displayName,
  };
}

// Funcion para retornar datos
export async function userReturn(email) {
  // Mandamos a llamar a la clase admin con sus metodos para así que nos devuelva el objeto usuaria segun el email
  const user = await admin.auth().getUserByEmail(email);
  // Extraemos el custom claim de vendedor
  const { vendedor } = user.customClaims;

  // Objeto con propiedades importantes

  //  -- El objeto consta con dos propiedades importantes.
  //     __ El primero sería la propiedad llamada objeto, este contiene el objeto que devuelve a la hora de ser llamada la funcion de getUserByMail()
  //        ## Este puede ser irrelevante para la extracción de datos

  //     __ El segundo seria la propiedad de propsImporantes (Encontrar un nombre mejor)
  //        - Este tiene como valor un objeto anidado en su propiedad, adentro de este objeto anidado vienen las siguientes propiedades.
  //          ## Quitar el objeto anidado y devolver el objeto solo si no es neceasario la propiedad "objeto"

  //        -/- uid: Este es el identificador del usuario que se tiene en la parte de autenticación
  //          # Este va a ser necesario para varias cosas en la cuestión de interacción de objetos y colecciones
  //        -/- displayName: el nombre de la cuenta
  //        -/- email
  //        -/- photoURL: la url de la fotografía de la cuenta -- Este se va a poner en storage
  //        ./. vendedor: este va a ser un valor booleano el cual va a indicar si el tipo de cuenta del usuario es del tipo de cuenta "vendedor"
  const usuario = {
    objeto: user,
    propsImportantes: {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      vendedor: vendedor,
    },
  };
  // Opcion de retorno para la funcion
  const usuarioObjeto = {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    vendedor: vendedor,
  };

  // Se devuelve el objeto usuario
  return usuarioObjeto;
}

// Firestore -- creacion, lectura y actualizacion de documentos // Tambien de subcollecciones

// Funcion para creacion del documento del usuario
export async function createDocumentUser(objetoDatos) {
  // Destructuración de propiedades
  const { uid, displayName, email, photoURL, vendedor } = objetoDatos;

  // Referencia del documento
  const docRef = db.doc(`users/${uid}`);

  // Creación del documento
  docRef.set({
    displayName: displayName,
    email: email,
    photoURL: photoURL == undefined ? null : photoURL,
    vendedor: vendedor,
  });
}

// Función para la creación de tienda

export async function createDocumentStore(objetoDatos, formularioObjeto) {
  // Destructuración de propiedades
  // Usuario
  const { uid, email } = objetoDatos;

  // Formulario
  const { store, description, categoria } = formularioObjeto;

  // Referencia del docuemento
  // Se va usar el mismo id del usuario que se crea -- Esto puede cambiar
  const docRef = db.doc(`stores/${uid}`);

  // En dado caso de generar un documento con un id aleatorio, deberíamos de usar el siguiente referencia en vez de "docRef"
  // const collectRef = db.collection(`stores`);

  // -- Condición
  // Checar si ya existe un documento en la colección stores con el uid de usuario.
  const docSnap = docRef.get();
  if (!(await docSnap).exists) {
    // Mandar los datos
    docRef.set({
      // Identificación
      uidStore: uid,

      // Propiedades comunes
      nameStore: store,
      description: description,
      category: categoria,

      // Estas dos aun faltarían por definir.
      profilePicture: null,
      backgroundPicture: null,

      // Email
      email: email,
    });
    // Ruta dinámica
    // Ya después de que se crea la tienda, este va a devolver al perfil de la tienda

    // -- Se va a usar la opcion de remix de rutas dinmaicas y anticipación a lo que ya esta
    return redirect(`/store/${store}`);

    // De momento se va a devolver a la ruta principal. Faltaría hacer la pantalla dinamica
  }

  // Podemos devolver una excepcion y retornar a una página que sea de errores.
  // Pero esto con un throwError

  // Por momento vamos a devolver una alerta de que esta cuenta ya tiene una tienda
  return redirect("/");
}
