import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Text,
  ModalOverlay,
} from "@chakra-ui/react";

import { redirect } from "@remix-run/node";
import {
  Form,
  useActionData,
  useNavigate,
  useTransition,
} from "@remix-run/react";
export const action = async ({ request }) => {
  // Here we can update our dabatase with the new invoice

  // This is just so we can see the transition
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(redirect(`/invoices/`));
    }, 2000)
  );
};

export default function Add() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const actionData = useActionData();
  const transition = useTransition();
  const cancelRef = React.useRef();
  function onDismiss() {
    navigate("/invoices");
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
            <Button colorScheme={"red"} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

{
  /* <AlertDialog
isOpen={true}
onClose={onDismiss}
leastDestructiveRef={cancelRef}
motionPreset="slideInBottom"
closeOnOverlayClick={false}
>
{transition.state === "submitting" ? <div>Saving...</div> : null}
<AlertDialogOverlay>
  <AlertDialogContent>
    <AlertDialogHeader>Add Invoice</AlertDialogHeader>
    <AlertDialogBody>Date</AlertDialogBody>
    <AlertDialogFooter>
      <Button ref={cancelRef} onClick={onDismiss}>
        Cancel
      </Button>
      <Button colorScheme={"red"} ml={3}>
        Delete
      </Button>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialogOverlay>
</AlertDialog> */
}

// <Modal isCentered isOpen={true}>
// <ModalOverlay
//   bg="none"
//   backdropFilter="auto"
//   backdropInvert="80%"
//   backdropBlur="2px"
// />
// <ModalContent>
//   <ModalHeader>ModalTItle</ModalHeader>
//   <ModalCloseButton />
//   <ModalBody>
//     <Text>TExto</Text>
//   </ModalBody>
//   <ModalFooter>
//     <Button>Close</Button>
//   </ModalFooter>
// </ModalContent>
// </Modal>
