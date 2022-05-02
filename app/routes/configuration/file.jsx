import { Button } from "@chakra-ui/react";
import { Form } from "@remix-run/react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import {
  unstable_parseMultipartFormData,
  unstable_createFileUploadHandler,
} from "@remix-run/node";
export const action = async ({ request }) => {
  const uploadHandler = async ({ name, stream, filename }) => {
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    console.log(typeof buffer);
    console.log(buffer);
    console.log("Llaves", Object.keys(buffer));
    console.log("Valores, ", Object.values(buffer));

    return buffer;
  };
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  // the returned value for the file field is whatever our uploadHandler returns.
  // Let's imagine we're uploading the avatar to s3,
  // so our uploadHandler returns the URL.
  const avatarUrl = formData.get("avatar");

  // success! Redirect to account page
  return null;
};

export default function AvatarUploadRoute() {
  return (
    <Form method="post" encType="multipart/form-data">
      <label htmlFor="avatar-input">Avatar</label>
      <input id="avatar-input" type="file" name="avatar" />
      <Button m={4} bg={"dodgerblue"} color={"white"} type={"submit"}>
        Upload
      </Button>
    </Form>
  );
}
