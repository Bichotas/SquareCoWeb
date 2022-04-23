import { db } from "./db.server";

export async function getStore(id) {
  const docRef = db.doc(`stores/${id}`);
  const docSnap = docRef.get();
  const store = (await docSnap).data();
  return store;
}
