import { Button } from "@chakra-ui/react";
import { Form } from "@remix-run/react";
import { useActionData } from "@remix-run/react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { unstable_parseMultipartFormData } from "@remix-run/node";
/**
 *
 * @param {*} param0
 * @returns
 */
export const action = async ({ request }) => {
  try {
    /**
     *
     * @param {*} param0
     * @returns
     */
    let uploadHandler = async ({ name, stream, filename }) => {
      console.log("in uploadHandler");

      if (name !== "my-file") {
        stream.resume();
        return;
      } else {
        console.log("====================================");
        console.log(name, stream, filename);
        console.log("====================================");
        const storage = getStorage();
        const storageRef = ref(storage, "users");
        uploadBytes(storage, stream);
      }
      return filename;
    };

    // get file info back after image upload
    const form = await unstable_parseMultipartFormData(request, uploadHandler);

    //convert it to an object to padd back as actionData
    const fileInfo = JSON.parse(form.get("my-file"));

    // this is response from upload handler
    console.log("the form", form.get("my-file"));
    return fileInfo;
  } catch (e) {
    console.log("action error", e);
    return { error: e };
  }
};

// https://remix.run/api/conventions#meta
export let meta = () => {
  return {
    title: "Remix Supabase Starter",
    description: "Welcome to remix! Login Page",
  };
};

// https://remix.run/guides/routing#index-routes
export default function UploadPage() {
  const actionData = useActionData();

  return (
    <div className="remix__page">
      <main>
        <h2 className="font-bold text-2xl">
          Welcome to Supabase Remix - File Upload
        </h2>
        <Form method="post" encType="multipart/form-data">
          <input type="file" id="my-file" name="my-file" />
          <button type="submit">UPLOAD</button>
        </Form>
      </main>
      <div>{actionData?.error ? actionData?.error?.message : null}</div>
      <div>
        {actionData?.data ? `File Uploaded: ${actionData?.data?.Key}` : null}
      </div>
    </div>
  );
}
