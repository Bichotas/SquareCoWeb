import { Button } from "@chakra-ui/react";
import { Form } from "@remix-run/react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { unstable_parseMultipartFormData } from "@remix-run/node";
export const action = async ({ request }) => {
  const storage = getStorage();
  const refStorage = ref(storage, "users");
  const uploadHandler = async ({ name, stream, filename }) => {
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);
    const instance = file;
    let bytes = new Uint8Array(buffer);
    console.log(bytes);
    let valor = await uploadBytes(refStorage, bytes);

    return valor;
  };
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  // the returned value for the file field is whatever our uploadHandler returns.
  // Let's imagine we're uploading the avatar to s3,
  // so our uploadHandler returns the URL.
  const avatarUrl = formData.get("avatar");
  console.log(avatarUrl);
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
