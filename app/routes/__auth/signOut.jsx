import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import { redirect } from "@remix-run/node";
import {
  Form,
  useActionData,
  useNavigate,
  useTransition,
} from "@remix-run/react";
import { signOut } from "../../utils/session.server";
export const action = async ({ request }) => {
  // Here we can update our dabatase with the new invoice
  // This is just so we can see the transition
  return signOut(request);
};

export default function Add() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const actionData = useActionData();
  const transition = useTransition();
  const cancelRef = React.useRef();
  function onDismiss() {
    navigate("/");
  }

  const disabled =
    transition.state === "submitting" || transition.state === "loading";

  return (
    <AlertDialog
      isOpen={true}
      onClose={onDismiss}
      leastDestructiveRef={cancelRef}
      motionPreset="slideInBottom"
      closeOnOverlayClick={false}
    >
      {transition.state === "submitting" ? <div>Saving...</div> : null}
      <AlertDialogOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      >
        <AlertDialogContent>
          <AlertDialogHeader>Add Invoice</AlertDialogHeader>
          <AlertDialogBody>Date</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onDismiss}>
              Cancel
            </Button>
            <Form method="post">
              <Button colorScheme={"red"} ml={3} type="submit">
                SignOut
              </Button>
            </Form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
