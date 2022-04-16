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
