import React from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useLoaderData } from "@remix-run/react";
import { adminAuth } from "../utils/db.server";

export const loader = async ({ request }) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const user = adminAuth.getUser(currentUser.uid);
  let displayName = currentUser.displayName;
  return displayName;
};

function register_create_store(props) {
  // const auth = getAuth();
  // console.log(auth.currentUser.displayName);
  const data = useLoaderData();

  console.log(data);
  return <div>{data}</div>;
}

export default register_create_store;