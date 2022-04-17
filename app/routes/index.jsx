import { Box, ChakraProvider, Button } from "@chakra-ui/react";
import { Form, Outlet } from "@remix-run/react";
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
  return (
    <>
      <ChakraProvider>
        <Box width={"500px"} height={"500px"} bg={"dodgerblue"}>
          Calle
        </Box>
      </ChakraProvider>
    </>
  );
}
