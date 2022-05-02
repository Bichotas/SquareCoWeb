import { Button } from "@chakra-ui/react";
import { Form } from "@remix-run/react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { unstable_parseMultipartFormData } from "@remix-run/node";
export const action = async ({ request }) => {
  function uploadFirebaseStorage(stream) {
    const storage = getStorage();
    const storageRef = ref(storage, "users");
    return new Promise((resolve, reject) => {
      const uploader = uploadBytes(storageRef, stream);
      stream.pipe(uploader);
    });
  }

  const uploadHandler = async ({ name, stream }) => {
    // we only care about the file form field called "avatar"
    // so we'll ignore anything else
    // NOTE: the way our form is set up, we shouldn't get any other fields,
    // but this is good defensive programming in case someone tries to hit our
    // action directly via curl or something weird like that.
    if (name !== "avatar") {
      stream.resume();
      return;
    }

    const uploadedImage = await uploadFirebaseStorage(stream);

    return uploadedImage;
  };

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  const imageUrl = formData.get("avatar");
  console.log(imageUrl);
  // because our uploadHandler returns a string, that's what the imageUrl will be.
  // ... etc
  return null;
};
export default function AvatarUploadRoute() {
  return (
    <Form method="post" encType="multipart/form-data">
      <label htmlFor="avatar-input">Avatar</label>
      <input id="avatar-input" type="file" name="avatar" />
      <Button bg={"dodgerblue"} color={"white"} m={4} type={"submit"}>
        Upload
      </Button>
    </Form>
  );
}
