import { getAuth } from "firebase/auth";
import { db } from "./db.server";
import { getSession } from "./session.server";

export async function getStore(id) {
  const docRef = db.doc(`stores/${id}`);
  const docSnap = docRef.get();
  const store = (await docSnap).data();
  return store;
}

export async function checkPropertyStore(storeProfile) {
  const currentUser = getAuth().currentUser;

  if (currentUser.uid == storeProfileUid) {
    return "Es el mismo";
  } else {
    return "No es el mismo";
  }
}

export async function trent(cosa) {
  console.log(typeof cosa);
  console.log(cosa);
}
