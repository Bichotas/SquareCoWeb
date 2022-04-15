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
  return (
    <ChakraProvider>
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
        <Box padding={"5"} bg={"dodgerblue"}>
          CAJA
        </Box>

        <Form method="post">
          <Button
            type="submit"
            bg={"teal.200"}
            m={"2"}
            _hover={{ bg: "teal.400", color: "whiteO" }}
          >
            Sign Out
          </Button>
        </Form>
      </div>
    </ChakraProvider>
  );
}
