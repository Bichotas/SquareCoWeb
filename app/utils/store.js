import { db } from "./db.server";

export async function getStore(id) {
  const docSnapshot = await db.collection("stores").doc(id).get();
  if (!docSnapshot.exists) {
    throw Error("No such a document exists");
  } else {
    const store = docSnapshot.data();
    return store;
  }
}
