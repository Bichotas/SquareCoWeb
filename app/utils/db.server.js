import admin from "firebase-admin";
import {
  applicationDefault,
  initializeApp as initializeAdminApp,
} from "firebase-admin/app";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
import { destroySession } from "./session.server";

require("dotenv").config();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXdDz9w-w7U8if76N5siMDGcbiOk2ePZk",
  authDomain: "jojigod-fb3ea.firebaseapp.com",
  projectId: "jojigod-fb3ea",
  storageBucket: "jojigod-fb3ea.appspot.com",
  messagingSenderId: "125013908426",
  appId: "1:125013908426:web:0bf6b22b61e5e203ab4d33",
};

const serviceAccount = require("../../keyService.json");

if (!admin.apps.length) {
  initializeAdminApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "",
  });
}

export const db = admin.firestore();
export const adminAuth = admin.auth();

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
    comprador: false,
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
  return usuario;
}
