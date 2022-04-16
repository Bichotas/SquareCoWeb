import { Box, ChakraProvider, Button } from "@chakra-ui/react";
import { Form } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { signOut, getUserSession } from "../utils/session.server";

export let action = ({ request }) => {
  return signOut(request);
};

export let loader = async ({ request }) => {
  const sessionUser = await getUserSession(request);
  if (!sessionUser) {
    return redirect("/login");
  }

  return null;
};

export default function Index() {
  return <div>log</div>;
}
