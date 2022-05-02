import { Button } from "@chakra-ui/react";
import { Form } from "@remix-run/react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { unstable_parseMultipartFormData } from "@remix-run/node";
import { bucket } from "../../utils/db.server";
export const action = async ({ request }) => {
  const storage = getStorage();
  const refStorage = ref(storage, "users");

  // Upload handle de la imagen
  const uploadHandler = async ({ encoding, stream, mimetype, filename }) => {
    if (filename.length > 0) {
      let chunks = [];
      for await (const chunk of stream) {
        chunks.push(chunk);
      }

      const buffer = Buffer.concat(chunks);
      const rand = Math.random().toString().substring(2, 8);
      const extension = filename.split(".").pop();
      const fName = `${rand}.${extension}`;
      const instance = bucket.file(`users/${fName}`);
      await instance.save(buffer);

      await instance.setMetadata({
        "Content-Type": mimetype,
        "Content-Encoding": encoding,
      });
      await instance.makePublic();
      return instance.publicUrl();
    }
  };

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  const avatarUrl = formData.get("avatar");
  console.log(avatarUrl);
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
